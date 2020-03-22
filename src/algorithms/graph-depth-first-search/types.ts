import { Tracer } from '../../tracer';
import {
    Graph,
    GraphNode,
    SerializedGraph,
    SerializedGraphNode,
} from 'data-structures/graph';

export type GraphDFSTracerState = {
    graph: SerializedGraph<DFSNodeState>;
    activeNode: SerializedGraphNode<DFSNodeState> | null;
};

export type GraphDFSTracer = Tracer<GraphDFSTracerState>;

export type DFSGraph = Graph<DFSNodeState>;
export type DFSGraphNode = GraphNode<DFSNodeState>;
export type DFSNodeState = {
    label: string;
    visited: boolean;
};
