use std::{
    collections::HashMap,
    path::PathBuf,
    process::{Command, ExitStatus},
};

use av_common::SupportedLanguage;

pub fn execute(language: &SupportedLanguage, path: PathBuf) -> ExitStatus {
    // TODO: replace this flaky Command method with something more reliable
    // like a docker container so we don't need to depend on the environment.
    //
    // Probably won't need something more reliable until more languages are supported.

    // TODO: improve error handling
    let trace_dest = path.parent().unwrap().join("trace.json");
    let trace_dest_str = trace_dest.to_str().unwrap();
    let path_str = path.to_str().unwrap();

    let program = match language {
        SupportedLanguage::EcmaScript(_version) => "node",
    };

    let envs = HashMap::from(match language {
        _ => [("TRACE_DEST", trace_dest_str)],
    });

    let args = match language {
        _ => [path_str],
    };

    Command::new(program)
        .envs(envs)
        .args(args)
        .spawn()
        .expect("Failed to spawn process")
        .wait()
        .expect("Failed to wiat for process to finish")
}
