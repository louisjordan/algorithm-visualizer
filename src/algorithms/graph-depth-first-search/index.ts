/*eslint import/no-webpack-loader-syntax: "off"*/
import { AlgorithmDefinition, Group } from '../types';
import run from './algorithm';
import visualiser from './visualiser';
import source from './source.json';
import doc from '!raw-loader!./README.md';
import { GraphDFSTracerState, DFSGraph, DFSGraphNode } from './types';
import { Graph, GraphNode, GraphEdge } from 'data-structures/graph';

const graphDepthFirstSearch: AlgorithmDefinition<
    GraphDFSTracerState,
    { graph: DFSGraph; start: DFSGraphNode },
    DFSGraph
> = {
    key: 'graph-depth-first-search',
    name: 'Depth-First Search',
    group: Group.Graph,
    source: source.functions.join('\n\n'),
    doc,
    visualiser,
    run: (tracer, { graph, start }) => run(tracer, graph, start),
    defaultParameters: () => {
        const graph: DFSGraph = new Graph();

        const nodes = Array.from({ length: 8 }).map(
            (_, i) =>
                new GraphNode({
                    label: String.fromCharCode(65 + i),
                    visited: false,
                })
        );

        const edges = [
            new GraphEdge(nodes[0], nodes[1]),
            new GraphEdge(nodes[0], nodes[2]),
            new GraphEdge(nodes[1], nodes[2]),
            new GraphEdge(nodes[1], nodes[4]),
            new GraphEdge(nodes[2], nodes[3]),
            new GraphEdge(nodes[4], nodes[5]),
            new GraphEdge(nodes[4], nodes[6]),
            new GraphEdge(nodes[5], nodes[7]),
            new GraphEdge(nodes[6], nodes[7]),
        ];

        edges.forEach((edge) => graph.addEdge(edge));

        return { graph, start: nodes[0] };
    },
};

export default graphDepthFirstSearch;
