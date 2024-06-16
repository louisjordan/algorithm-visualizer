#![allow(non_snake_case)]

use crate::resizable_panels::{PanelSplit, ResizablePanels};
use crate::sidebar::Sidebar;
use leptos::*;
use stylers::style;

#[component]
pub fn VisualizerPage() -> impl IntoView {
    let styler_class = style! {
        .full-page-container {
            height: 100vh;
            display: flex;
            flex-direction: row;
        }
    };

    view! { class=styler_class,
        <div class="full-page-container">
            <Sidebar/>
            <ResizablePanels split=PanelSplit::Vertical>
                <div class="code-panel">
                    <span>Code</span>
                </div>
                <ResizablePanels split=PanelSplit::Horizontal>
                    <div class="panel visualizer-panel">
                        <span>Visualizer</span>
                    </div>
                    <div class="panel documentation-panel">
                        <span>Documentation</span>
                    </div>
                </ResizablePanels>
            </ResizablePanels>
        </div>
    }
}
