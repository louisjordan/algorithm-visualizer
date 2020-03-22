import React, { useState, useRef, useEffect } from 'react';
import { Graph as D3Graph } from 'react-d3-graph';
import { baseD3Config, nodeConfig } from './configs';

type GraphRendererNode = {
    id: string;
    label: string;
    visited?: boolean;
    active?: boolean;
};

type GraphRendererLink = {
    source: string;
    target: string;
};

type Props = {
    nodes: GraphRendererNode[];
    links: GraphRendererLink[];
};

const GraphRenderer: React.FC<Props> = (props) => {
    const container = useRef<HTMLDivElement | null>(null);
    const [d3Config, setD3Config] = useState({
        ...baseD3Config,
        width: 400,
        height: 400,
    });

    function updateDimensions() {
        if (container.current) {
            const {
                clientHeight: height,
                clientWidth: width,
            } = container.current;

            setD3Config((d3Config) => ({
                ...d3Config,
                height,
                width,
            }));
        }
    }

    useEffect(() => {
        updateDimensions();

        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, [container.current]);

    const data = {
        nodes: props.nodes.map((n) => {
            const { visited, active, ...nodeValue } = n;

            let node: any = { ...nodeValue }; // TODO: write / source declaration file for react-d3-graph + remove any type

            if (visited) {
                node = { ...node, ...nodeConfig.highlight };
            }

            if (active) {
                node = { ...node, ...nodeConfig.active };
            }

            return node;
        }),
        links: props.links,
    };

    return (
        <div ref={container} style={{ width: '100%', height: '100%' }}>
            <D3Graph
                id="graph-renderer"
                style={{ display: 'block', margin: '0 auto' }}
                data={data}
                config={d3Config}
            />
        </div>
    );
};

export default GraphRenderer;
