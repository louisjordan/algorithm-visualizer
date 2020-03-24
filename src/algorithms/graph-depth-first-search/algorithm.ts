import { GraphDFSTracer, DFSGraph, DFSGraphVertex } from './types';

function graphDepthFirstSearchRecursive(
    tracer: GraphDFSTracer,
    graph: DFSGraph,
    start: DFSGraphVertex
): DFSGraph {
    start.value.visited = true;
    tracer.assign('graph', graph.serialize()).break(5);

    for (let vertex of start.neighbours()) {
        tracer.assign('activeVertex', vertex.serialize()).break(7);
        if (!vertex.value.visited) {
            tracer.break(8);
            tracer.break(9);
            graphDepthFirstSearchRecursive(tracer, graph, vertex);
        }
    }

    tracer.assign('activeVertex', null).break(13);

    return graph;
}

export default graphDepthFirstSearchRecursive;
