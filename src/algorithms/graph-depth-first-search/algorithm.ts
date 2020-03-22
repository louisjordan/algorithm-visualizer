import { GraphDFSTracer, DFSGraph, DFSGraphNode } from './types';

function graphDepthFirstSearchRecursive(
    tracer: GraphDFSTracer,
    graph: DFSGraph,
    start: DFSGraphNode
): DFSGraph {
    start.value.visited = true;
    tracer.assign('graph', graph.serialize()).break(5);

    for (let node of start.neighbours()) {
        tracer.assign('activeNode', node.serialize()).break(7);
        if (!node.value.visited) {
            tracer.break(8);
            tracer.break(9);
            graphDepthFirstSearchRecursive(tracer, graph, node);
        }
    }

    tracer.assign('activeNode', null).break(13);

    return graph;
}

export default graphDepthFirstSearchRecursive;
