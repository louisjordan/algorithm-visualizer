use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Eq, PartialEq, Hash)]
pub enum SupportedLanguage {
    EcmaScript(EcmaScriptVersion),
}

#[derive(Serialize, Deserialize, Debug, Eq, PartialEq, Hash)]
pub enum EcmaScriptVersion {
    Es2022,
}
