import React, { useState, useRef, useEffect } from 'react';
import { Graph } from 'data-structures/graph';

import { Graph as D3Graph } from 'react-d3-graph';

// graph payload (with minimalist structure)

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used

// graph event callbacks
// const onClickGraph = function() {
//     window.alert(`Clicked the graph background`);
// };

// const onClickNode = function(nodeId) {
//     window.alert(`Clicked node ${nodeId}`);
// };

// const onDoubleClickNode = function(nodeId) {
//     window.alert(`Double clicked node ${nodeId}`);
// };

// const onRightClickNode = function(event, nodeId) {
//     window.alert(`Right clicked node ${nodeId}`);
// };

// const onMouseOverNode = function(nodeId) {
//     window.alert(`Mouse over node ${nodeId}`);
// };

// const onMouseOutNode = function(nodeId) {
//     window.alert(`Mouse out node ${nodeId}`);
// };

// const onClickLink = function(source, target) {
//     window.alert(`Clicked link between ${source} and ${target}`);
// };

// const onRightClickLink = function(event, source, target) {
//     window.alert(`Right clicked link between ${source} and ${target}`);
// };

// const onMouseOverLink = function(source, target) {
//     window.alert(`Mouse over in link between ${source} and ${target}`);
// };

// const onMouseOutLink = function(source, target) {
//     window.alert(`Mouse out link between ${source} and ${target}`);
// };

// const onNodePositionChange = function(nodeId, x, y) {
//     window.alert(
//         `Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`
//     );
// };

const baseConfig = {
    maxZoom: 1,
    minZoom: 1,
    d3: {
        gravity: -1000,
        linkLength: 50,
    },
    node: {
        color: '#404040',
        fontColor: '#bfbfbf',
        fontSize: '1em',
        size: 500,
        strokeColor: '#333333',
        strokeWidth: 3,
    },
    link: {
        color: '#bfbfbf',
        strokeWidth: 2,
    },
};

type Props = {
    // graph: Graph<React.ReactNode>;
};
const GraphRenderer: React.FC<Props> = (props) => {
    const container = useRef<HTMLDivElement | null>(null);
    const [config, setConfig] = useState({
        width: 400,
        height: 400,
    });

    function updateDimensions() {
        if (container.current) {
            const {
                clientHeight: height,
                clientWidth: width,
            } = container.current;

            setConfig((config) => ({
                ...config,
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

    const d3Config = {
        ...baseConfig,
        ...config,
    };

    const data = {
        nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
        links: [
            { source: 'Harry', target: 'Sally' },
            { source: 'Harry', target: 'Alice' },
        ],
    };

    return (
        <div ref={container} style={{ width: '100%', height: '100%' }}>
            <D3Graph
                id="graph-renderer"
                style={{ display: 'block', margin: '0 auto' }}
                data={data}
                config={d3Config}
                // onClickNode={onClickNode}
                // onDoubleClickNode={onDoubleClickNode}
                // onRightClickNode={onRightClickNode}
                // onClickGraph={onClickGraph}
                // onClickLink={onClickLink}
                // onRightClickLink={onRightClickLink}
                // onMouseOverNode={onMouseOverNode}
                // onMouseOutNode={onMouseOutNode}
                // onMouseOverLink={onMouseOverLink}
                // onMouseOutLink={onMouseOutLink}
                // onNodePositionChange={onNodePositionChange}
            />
        </div>
    );
};

export default GraphRenderer;
