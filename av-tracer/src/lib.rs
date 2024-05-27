use av_common::SupportedLanguage;

pub fn get_tracer(language: &SupportedLanguage) -> &'static str {
    match language {
        SupportedLanguage::EcmaScript(_version) => include_str!("ecmascript/tracer.js"),
    }
}
