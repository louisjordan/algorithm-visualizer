import React from 'react';
import { GraphDFSTracer } from './types';
import GraphRenderer from 'renderers/graph';
import { notDeepEqual } from 'assert';

type Props = {
    tracer: GraphDFSTracer;
    position: number;
};
const GraphDFSVisualiser: React.FC<Props> = (props) => {
    const { tracer, position } = props;
    const trace = tracer.at(position);

    if (!trace) {
        return null;
    }

    const { graph, activeNode } = trace.state;

    const nodes = graph.nodes.map((node) => ({
        id: node.key,
        active: activeNode ? activeNode.key === node.key : false,
        ...node.value,
    }));

    const links = trace.state.graph.edges.map((edge) => ({
        source: edge.from,
        target: edge.to,
    }));

    return <GraphRenderer nodes={nodes} links={links} />;
};

export default GraphDFSVisualiser;
