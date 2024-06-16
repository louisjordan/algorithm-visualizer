use leptos::*;
use stylers::style;

use crate::dynamic_list::{DynamicList, DynamicListItem, DynamicListSearch, Filterable, Identity};
use crate::icon::{Icon, IconName};

#[component]
pub fn Sidebar() -> impl IntoView {
    let styles = style! {
        .sidebar {
            height: 100%;
            width: 15%;
            min-width: 300px;
            max-width: 400px;
            display: flex;
            flex-direction: column;
            font-family: "DM Sans", sans-serif;
            background: #292e38;
        }

        .sidebar-header {
            padding: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    };

    let items = Vec::from([
        Item {
            id: "item-1".to_owned(),
            label: "Item 1".to_owned(),
        },
        Item {
            id: "item-2".to_owned(),
            label: "Item 2".to_owned(),
        },
        Item {
            id: "item-3".to_owned(),
            label: "Item 3".to_owned(),
        },
    ]);

    // is a clone necessary here?
    let render_items = items
        .clone()
        .into_iter()
        .map(|item| view! { <SearchResult item=item/> });

    view! { class=styles,
        <div class="sidebar">
            <DynamicList items=items.clone()>
                <div class="sidebar-header">
                    <SearchTextInput/>
                </div>
                {render_items.collect_view()}
            </DynamicList>
        </div>
    }
}

#[component]
fn SearchResult(item: Item) -> impl IntoView {
    let styles = style! {
        .container {
            background: #3b4252;
            display: flex;
            align-items: center;
            font-size: 1.1rem;
        }

        .container:hover {
            background: #434c5e;
        }

        a.link {
            display: flex;
            flex: 1;
            padding: 16px 16px;
            color: #d6dae1;
            text-decoration: none;
        }

    };

    let id = item.id();

    view! { class=styles,
        <DynamicListItem item=item.clone()>
            <div class="container">
                <a class="link" href=format!("#{id}")>
                    {item.label.clone()}
                </a>
            </div>
        </DynamicListItem>
    }
}

#[component]
fn SearchTextInput() -> impl IntoView {
    let styles = style! {
        .sidebar-input {
            flex: 1 0 auto;
            border-radius: 16px;
            border: 2px solid transparent;
            background: #434c5e;
            color: #d6dae1;
            font-size: 0.9rem;
            padding: 4px 8px 4px 32px;
            font-family: "DM Sans", sans-serif;
        }

        .sidebar-input:focus {
            outline: 3px solid #4c566a;
        }

        :deep(.sidebar-input-icon) {
            background: #3b4252;
            color: #d6dae1;
            height: 16px;
            width: 16px;
            padding: 4px;
            border-radius: 11px;
            position: absolute;
            left: 20px;
        }
    };

    view! {
        <DynamicListSearch component=|on_input| {
            view! { class=styles,
                <Icon icon=IconName::Search class="sidebar-input-icon"/>
                <input
                    class="sidebar-input"
                    on:input=move |ev| {
                        on_input.set(event_target_value(&ev).to_owned());
                    }
                />
            }
        }/>
    }
}

#[derive(Clone)]
struct Item {
    id: String,
    label: String,
}

impl Identity for Item {
    fn id(&self) -> String {
        self.id.clone()
    }
}

impl Filterable for Item {
    fn filter(&self, pattern: &str) -> bool {
        self.label.to_lowercase().contains(&pattern.to_lowercase())
    }
}
