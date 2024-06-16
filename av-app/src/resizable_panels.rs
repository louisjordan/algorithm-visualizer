use leptos::*;
use stylers::style;

#[component]
pub fn ResizablePanels(split: PanelSplit, children: Children) -> impl IntoView {
    let styles = style! {
        .resizable-panels {
            display: flex;
            width: 100%;
            height: 100%;
        }
        .horizontal-split {
            flex-direction: column;
        }
        .vertical-split {
            flex-direction: row;
        }
        .resizable-panel {
            flex: 1 0 auto;
        }
    };

    let panels = children()
        .nodes
        .into_iter()
        .map(|child| {
            view! { class=styles, <div class="resizable-panel">{child}</div> }
        })
        .collect_view();

    view! { class=styles, <div class="resizable-panels {split}">{panels}</div> }
}

pub enum PanelSplit {
    Horizontal,
    Vertical,
}

impl std::fmt::Display for PanelSplit {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match &self {
                PanelSplit::Horizontal => "horizontal-split",
                PanelSplit::Vertical => "vertical-split",
            }
        )
    }
}
