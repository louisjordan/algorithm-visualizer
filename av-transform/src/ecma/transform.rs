use swc::Compiler;
use swc_common::{
    errors::Handler, sync::Lrc, BytePos, FileName, Globals, LineCol, SourceMap, GLOBALS,
};
use swc_ecma_ast::{EsVersion, Program};
use swc_ecma_codegen::{text_writer::JsWriter, Emitter};
use swc_ecma_parser::Syntax;
use swc_ecma_visit::as_folder;

use crate::{error::TransformError, supported::EcmaScriptVersion};

use super::ast_visitor::ASTVisitor;

pub fn transform(src: String, version: &EcmaScriptVersion) -> Result<String, TransformError> {
    let cm = Lrc::new(SourceMap::default());
    let errors = Box::new(vec![]);
    let handler = Handler::with_emitter_writer(errors.clone(), Some(cm.clone()));
    let src_file = cm.new_source_file(FileName::Anon, src);
    let comp = Compiler::new(cm.clone());
    let program = comp
        .parse_js(
            src_file,
            &handler,
            get_es_version(&version),
            Syntax::Es(Default::default()),
            swc::config::IsModule::Bool(false),
            None,
        )
        .unwrap();

    let srcmap = create_source_map(&cm, &program);
    let globals = Globals::new();
    let transformed_program = GLOBALS.set(&globals, || {
        comp.transform(&handler, program, false, as_folder(ASTVisitor::new(srcmap)))
    });

    if handler.has_errors() {
        return Err(TransformError::CompilationError(
            String::from_utf8(*errors).unwrap(),
        ));
    }

    Ok(create_program_code(&cm, &transformed_program))
}

fn get_es_version(version: &EcmaScriptVersion) -> EsVersion {
    match version {
        EcmaScriptVersion::Es2022 => EsVersion::Es2022,
        _ => Default::default(),
    }
}

fn create_source_map(cm: &Lrc<SourceMap>, program: &Program) -> Vec<(BytePos, LineCol)> {
    let mut srcmap_buf = vec![];

    let mut emitter = Emitter {
        cfg: Default::default(),
        cm: cm.clone(),
        wr: Box::new(JsWriter::new(
            cm.clone(),
            "\n",
            vec![],
            Some(&mut srcmap_buf),
        )),
        comments: None,
    };

    emitter.emit_program(program).unwrap();

    srcmap_buf
}

fn create_program_code(cm: &Lrc<SourceMap>, program: &Program) -> String {
    let mut output_buf = vec![];

    let mut emitter = Emitter {
        cfg: Default::default(),
        cm: cm.clone(),
        wr: Box::new(JsWriter::new(cm.clone(), "\n", &mut output_buf, None)),
        comments: None,
    };

    emitter.emit_program(program).unwrap();

    String::from_utf8_lossy(&output_buf).to_string()
}
