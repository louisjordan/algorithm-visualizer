import { Tracer } from '../../tracer';
import {
    Graph,
    GraphVertex,
    SerializedGraph,
    SerializedGraphVertex,
} from 'data-structures/graph';

export type GraphDFSTracerState = {
    graph: SerializedGraph<DFSVertexState>;
    activeVertex: SerializedGraphVertex<DFSVertexState> | null;
};

export type GraphDFSTracer = Tracer<GraphDFSTracerState>;

export type DFSGraph = Graph<DFSVertexState>;
export type DFSGraphVertex = GraphVertex<DFSVertexState>;
export type DFSVertexState = {
    label: string;
    visited: boolean;
};
