use anyhow::Result;
use log::{error, info};
use std::{collections::HashMap, fs, path::PathBuf, time::Instant};

use av_transform::{EcmaScriptVersion, SupportedLanguage};
use serde::{de, Deserialize, Deserializer};

#[derive(Deserialize, Debug)]
struct AlgorithmDefinition {
    #[serde(skip)]
    id: String,
    title: String,
    tags: Vec<AlgorithmTag>,
    #[serde(deserialize_with = "deserialize_entry_table")]
    implementations: HashMap<SupportedLanguage, PathBuf>,
}

fn deserialize_entry_table<'de, D>(
    deserializer: D,
) -> Result<HashMap<SupportedLanguage, PathBuf>, D::Error>
where
    D: Deserializer<'de>,
{
    let entry_map = HashMap::<String, String>::deserialize(deserializer)?;
    let input_length = entry_map.len();
    let data = {
        entry_map
            .into_iter()
            .map(|(key, value)| (key, PathBuf::from(value)))
            .map(|(key, value)| match key.as_str() {
                // TODO: find a better way to do this without manually adding variants
                "ecmascript" => Ok((
                    SupportedLanguage::EcmaScript(EcmaScriptVersion::Es2022),
                    value,
                )),
                _ => Err({
                    de::Error::invalid_value(de::Unexpected::Str(&key), &"an unsupported language")
                }),
            })
            .collect::<Result<HashMap<_, _>, _>>()?
    };

    if data.len() < input_length {
        return Err(de::Error::custom("detected duplicate keys"));
    }

    Ok(data)
}

impl AlgorithmDefinition {
    fn new(id: &str, path: PathBuf) -> Result<Self> {
        let mut definition: AlgorithmDefinition = toml::from_str(&fs::read_to_string(path)?)?;
        definition.id = id.to_owned();

        Ok(definition)
    }
}

#[derive(Deserialize, Debug)]
#[serde(rename_all = "lowercase")]
enum AlgorithmTag {
    Array,
    Sort,
}

pub fn build(output_path: &str) -> Result<()> {
    info!("Building algorithms from /{output_path}");

    for dir in fs::read_dir(output_path)? {
        if let Ok(dir) = dir {
            let id = dir.file_name().to_str().unwrap().to_owned();
            let definition = AlgorithmDefinition::new(&id, dir.path().join("definition.toml"))?;

            info!("[{id}] Successfully read algorithm definition");

            let build_dir = dir.path().join("build");

            for (language, entry) in definition.implementations {
                let output_dir = build_dir.join(entry.parent().unwrap());
                let entry_file = dir.path().join(&entry);

                info!("[{id}] Building {language:?} implementation into {output_dir:?}");

                fs::remove_dir_all(&output_dir).unwrap_or_default();
                fs::create_dir_all(&output_dir).expect("Failed to create output directory");

                info!("[{id}] Cleared {output_dir:?}");

                // copy implementation files to build folder
                for file in fs::read_dir(&entry_file.parent().unwrap()).unwrap() {
                    if let Ok(file) = file {
                        let path = file.path();

                        if path.is_dir() {
                            error!("[{id}] Skipping directory {path:?} - recursive copying not supported yet");
                            continue;
                        }

                        let dest = &output_dir.join(&file.file_name());
                        fs::copy(&path, dest).expect("Failed to copy file");

                        info!("[{id}] Copied {path:?} to {dest:?}");
                    }
                }

                let timer = Instant::now();
                let transformed_src =
                    av_transform::transform(&language, fs::read_to_string(entry_file).unwrap())
                        .unwrap();

                info!(
                    "[{id}] Successfully transformed {language:?} implementation in {}ms",
                    timer.elapsed().as_millis()
                );

                let transform_dest = output_dir.join(&entry.file_name().unwrap());
                fs::write(&transform_dest, transformed_src).unwrap();

                info!(
                    "[{id}] Successfully wrote transformed {language:?} implementation to {transform_dest:?}",
                );
            }
        }
    }

    info!("Finished build algorithms");

    Ok(())
}
