use leptos::*;

pub enum IconName {
    Search,
}

#[component]
pub fn Icon(
    icon: IconName,
    #[prop(into)]
    #[prop(optional)]
    class: String,
) -> impl IntoView {
    match icon {
        IconName::Search => view! {
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class=class
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                <path d="M21 21l-6 -6"></path>
            </svg>
        },
    }
}
