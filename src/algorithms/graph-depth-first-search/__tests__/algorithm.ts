import graphDepthFirstSearch from '../';
import depthFirstSearchRecursive from '../algorithm';
import { Tracer } from 'tracer';
import { GraphDFSTracerState } from '../types';

describe('Graph Depth-First Search', () => {
    it('should visit all verticies in the graph', () => {
        const tracer = new Tracer<GraphDFSTracerState>();
        const { graph, start } = graphDepthFirstSearch.defaultParameters();
        const result = depthFirstSearchRecursive(
            tracer,
            graph,
            start
        ).serialize();
        expect(
            result.verticies.every((vertex) => vertex.value.visited)
        ).toEqual(true);
    });
});
