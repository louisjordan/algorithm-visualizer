use std::io::Write;

mod build;

fn main() {
    env_logger::builder()
        .format(|buf, record| writeln!(buf, "[av-client][{}] {}", record.level(), record.args()))
        .init();

    build::build("algorithms").expect("Failed to compile algorithms");
}
