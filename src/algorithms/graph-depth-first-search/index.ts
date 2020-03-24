/*eslint import/no-webpack-loader-syntax: "off"*/
import { AlgorithmDefinition, Group } from '../types';
import run from './algorithm';
import visualiser from './visualiser';
import source from './source.json';
import doc from '!raw-loader!./README.md';
import { GraphDFSTracerState, DFSGraph, DFSGraphVertex } from './types';
import { Graph, GraphVertex, GraphEdge } from 'data-structures/graph';

const graphDepthFirstSearch: AlgorithmDefinition<
    GraphDFSTracerState,
    { graph: DFSGraph; start: DFSGraphVertex },
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

        const verticies = Array.from({ length: 8 }).map(
            (_, i) =>
                new GraphVertex({
                    label: String.fromCharCode(65 + i),
                    visited: false,
                })
        );

        const edges = [
            new GraphEdge(verticies[0], verticies[1]),
            new GraphEdge(verticies[0], verticies[2]),
            new GraphEdge(verticies[1], verticies[2]),
            new GraphEdge(verticies[1], verticies[4]),
            new GraphEdge(verticies[2], verticies[3]),
            new GraphEdge(verticies[4], verticies[5]),
            new GraphEdge(verticies[4], verticies[6]),
            new GraphEdge(verticies[5], verticies[7]),
            new GraphEdge(verticies[6], verticies[7]),
        ];

        edges.forEach((edge) => graph.addEdge(edge));

        return { graph, start: verticies[0] };
    },
};

export default graphDepthFirstSearch;
