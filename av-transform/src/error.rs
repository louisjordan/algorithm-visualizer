#[derive(Debug)]
pub enum TransformError {
    NoTransformImplemented,
    CompilationError(String),
}
