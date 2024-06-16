use crate::error_template::{AppError, ErrorTemplate};
use crate::visualizer_page::VisualizerPage;
use leptos::*;
use leptos_meta::*;
use leptos_router::*;
use stylers::style;

#[component]
pub fn App() -> impl IntoView {
    provide_meta_context();

    let styles = style! {
        :deep(body) {
            margin: 0;
            background-color: #2e3440;
        }
    };

    view! { class=styles,
        <Link rel="preconnect" href="https://fonts.googleapis.com"/>
        <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>
        <Link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400;1,9..40,500;1,9..40,700&display=swap"
        />
        <Stylesheet id="leptos" href="/pkg/main.css"/>
        <Title text="Algorithm Visualizer"/>
        <Router fallback=|| {
            let mut outside_errors = Errors::default();
            outside_errors.insert_with_default_key(AppError::NotFound);
            view! { <ErrorTemplate outside_errors/> }.into_view()
        }>
            <main>
                <Routes>
                    <Route path="" view=VisualizerPage/>
                </Routes>
            </main>
        </Router>
    }
}
