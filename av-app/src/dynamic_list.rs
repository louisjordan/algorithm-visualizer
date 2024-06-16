#![allow(non_snake_case)]

use leptos::*;
use std::collections::HashSet;

pub trait Identity {
    fn id(&self) -> String;
}

pub trait Filterable {
    fn filter(&self, pattern: &str) -> bool;
}

#[derive(Copy, Clone)]
struct VisibleItems(Memo<HashSet<String>>);

#[derive(Copy, Clone)]
struct SearchInput(WriteSignal<String>);

#[component]
pub fn DynamicList<T: 'static + Clone + Identity + Filterable>(
    items: Vec<T>,
    children: Children,
) -> impl IntoView {
    let (search_input, set_search_input) = create_signal("".to_owned());
    let visible_items = create_memo(move |_| {
        HashSet::from_iter(items.clone().into_iter().filter_map(|item| {
            if item.filter(&search_input.get()) {
                Some(item.id())
            } else {
                None
            }
        }))
    });

    provide_context(VisibleItems(visible_items));
    provide_context(SearchInput(set_search_input));

    children()
}

#[component]
pub fn DynamicListItem<T: 'static + Identity>(item: T, children: ChildrenFn) -> impl IntoView {
    let visible_items = use_context::<VisibleItems>().expect("No VisibleItems context found");

    view! { <Show when=move || { visible_items.0.get().contains(&item.id()) }>{children()}</Show> }
}

#[component]
pub fn DynamicListSearch<F, IV>(component: F) -> impl IntoView
where
    F: Fn(WriteSignal<String>) -> IV,
    IV: IntoView,
{
    let on_input = use_context::<SearchInput>().expect("No SearchInput context found");

    component(on_input.0)
}
