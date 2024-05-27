mod ecma;
mod error;

use av_common::SupportedLanguage;
use error::TransformError;

pub fn transform(language: &SupportedLanguage, src: String) -> Result<String, TransformError> {
    match language {
        SupportedLanguage::EcmaScript(version) => ecma::transform(src, version),
        _ => Err(TransformError::NoTransformImplemented),
    }
}
