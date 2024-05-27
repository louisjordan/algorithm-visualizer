use swc_atoms::Atom;
use swc_common::{BytePos, LineCol};
use swc_ecma_ast::{
    AssignTarget, BlockStmt, CallExpr, Callee, Decl, Expr, ExprOrSpread, ExprStmt, Ident, Lit,
    MemberExpr, MemberProp, Number, ObjectLit, Pat, Prop, PropOrSpread, SimpleAssignTarget, Stmt,
};
use swc_ecma_visit::{VisitMut, VisitMutWith};

pub struct ASTVisitor {
    srcmap: Vec<(BytePos, LineCol)>,
}

impl ASTVisitor {
    pub fn new(srcmap: Vec<(BytePos, LineCol)>) -> Self {
        ASTVisitor { srcmap }
    }

    fn line_count_for_pos(&self, pos: BytePos) -> Option<u32> {
        self.srcmap.iter().find_map(|(byte_pos, linecol)| {
            if *byte_pos == pos {
                Some(linecol.line)
            } else {
                None
            }
        })
    }

    fn handle_expr(&self, expr: &ExprStmt) -> Option<ExprStmt> {
        if let Expr::Assign(assign) = &*expr.expr {
            let left_sym = match &assign.left {
                AssignTarget::Simple(SimpleAssignTarget::Member(target)) => match &*target.obj {
                    Expr::Ident(ident) => Some(ident.sym.to_string()),
                    _ => None,
                },
                AssignTarget::Pat(_) => None, // TODO: handle this to support destructuring
                _ => None,
            };

            if let Some(left_sym) = left_sym {
                return Some(create_tracer_call(
                    "assign",
                    vec![left_sym],
                    self.line_count_for_pos(expr.span.lo).unwrap(), // TODO: handle errors
                ));
            }
        }

        None
    }

    fn handle_decl(&self, decl: &Decl) -> Option<ExprStmt> {
        if let Decl::Var(var) = decl {
            let var = &**var;
            let left_sym = match &var.decls[0].name {
                Pat::Ident(ident) => Some(ident.sym.to_string()),
                _ => None,
            };

            if let Some(left_sym) = left_sym {
                return Some(create_tracer_call(
                    "declaration",
                    vec![left_sym],
                    self.line_count_for_pos(var.span.lo).unwrap(), // TODO: handle errors
                ));
            }
        }

        None
    }
}

impl VisitMut for ASTVisitor {
    fn visit_mut_block_stmt(&mut self, block: &mut BlockStmt) {
        block.visit_mut_children_with(self);

        let mut insert_count = 0;

        for (index, stmt) in block.stmts.clone().into_iter().enumerate() {
            let expr_stmt = match stmt {
                Stmt::Expr(expr) => self.handle_expr(&expr),
                Stmt::Decl(decl) => self.handle_decl(&decl),
                _ => None,
            };

            if let Some(expr_stmt) = expr_stmt {
                block
                    .stmts
                    .insert(index + insert_count + 1, Stmt::Expr(expr_stmt));

                insert_count = insert_count + 1;
            }
        }
    }
}

fn create_tracer_call(func: &str, syms: Vec<String>, line: u32) -> ExprStmt {
    ExprStmt {
        span: Default::default(),
        expr: Box::new(Expr::Call(CallExpr {
            span: Default::default(),
            callee: Callee::Expr(Box::new(Expr::Member(MemberExpr {
                span: Default::default(),
                obj: Box::new(Expr::Ident(Ident {
                    span: Default::default(),
                    sym: Atom::new("Tracer"),
                    optional: false,
                })),
                prop: MemberProp::Ident(Ident {
                    span: Default::default(),
                    sym: Atom::new(func),
                    optional: false,
                }),
            }))),
            args: vec![
                ExprOrSpread {
                    spread: Default::default(),
                    expr: Box::new(Expr::Lit(Lit::Num(Number {
                        span: Default::default(),
                        value: line as f64,
                        raw: None,
                    }))),
                },
                ExprOrSpread {
                    spread: Default::default(),
                    expr: Box::new(Expr::Object(ObjectLit {
                        span: Default::default(),
                        props: syms
                            .iter()
                            .map(|sym| {
                                PropOrSpread::Prop(Box::new(Prop::Shorthand(Ident {
                                    span: Default::default(),
                                    sym: Atom::new(sym.to_owned()),
                                    optional: false,
                                })))
                            })
                            .collect(),
                    })),
                },
            ],
            type_args: Default::default(),
        })),
    }
}

#[cfg(test)]
mod tests {
    use swc_common::{BytePos, LineCol};
    use swc_ecma_transforms_testing::test_inline;
    use swc_ecma_visit::as_folder;

    use super::ASTVisitor;

    test_inline!(
        swc_ecma_parser::Syntax::default(),
        |_| {
            as_folder(ASTVisitor::new(vec![
                (BytePos(36), LineCol { line: 1, col: 0 }),
                (BytePos(58), LineCol { line: 2, col: 0 }),
                (BytePos(124), LineCol { line: 4, col: 0 }),
                (BytePos(246), LineCol { line: 7, col: 0 }),
                (BytePos(323), LineCol { line: 10, col: 0 }),
            ]))
        },
        compile2,
        "function insertionSort(list) {
    let position = 1;
    let pointer = null;

    while (position < list.length) {
        let x = list[position];

        pointer = position - 1;

        while (pointer >= 0 && list[pointer] > x) {
            list[pointer + 1] = list[pointer];
            pointer--;
        }

        list[pointer + 1] = x;

        position++;
    }

    return list;
}

insertionSort([4, 3, 2, 1]);",
        r#"function insertionSort(list) {
    let position = 1;
    Tracer.declaration(1, {
        position
    });
    let pointer = null;
    Tracer.declaration(2, {
        pointer
    });
    while(position < list.length){
        let x = list[position];
        Tracer.declaration(4, {
            x
        });
        pointer = position - 1;
        while(pointer >= 0 && list[pointer] > x){
            list[pointer + 1] = list[pointer];
            Tracer.assign(7, {
                list
            });
            pointer--;
        }
        list[pointer + 1] = x;
        Tracer.assign(10, {
            list
        });
        position++;
    }
    return list;
}
insertionSort([
    4,
    3,
    2,
    1
]);"#
    );
}
