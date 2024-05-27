mod ecma;
mod error;
mod supported;

use error::TransformError;
pub use supported::{EcmaScriptVersion, SupportedLanguage};

pub fn transform(language: &SupportedLanguage, src: String) -> Result<String, TransformError> {
    match language {
        SupportedLanguage::EcmaScript(version) => ecma::transform(src, version),
        _ => Err(TransformError::NoTransformImplemented),
    }
}
