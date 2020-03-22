import { GraphEdge, SerializedGraphEdge } from './GraphEdge';
import { GraphNode, SerializedGraphNode } from './GraphNode';
import { Serializable } from '../interfaces';

export type SerializedGraph<T> = {
    directed: boolean;
    nodes: SerializedGraphNode<T>[];
    edges: SerializedGraphEdge[];
};

export class Graph<T> implements Serializable<SerializedGraph<T>> {
    private nodes: { [key: string]: GraphNode<T> };
    private edges: { [key: string]: GraphEdge<T> };

    readonly directed: boolean;

    constructor(directed = false) {
        this.nodes = {};
        this.edges = {};
        this.directed = directed;
    }

    addNode(node: GraphNode<T>): this {
        this.nodes[node.key] = node;
        return this;
    }

    addEdge(edge: GraphEdge<T>): this {
        this.edges[edge.key] = edge;

        let from = this.findNodeByKey(edge.from.key);
        let to = this.findNodeByKey(edge.to.key);

        if (!from) {
            this.addNode(edge.from);
            from = edge.from;
        }

        if (!to) {
            this.addNode(edge.to);
            to = edge.to;
        }

        if (this.directed) {
            from.addEdge(edge);
        } else {
            from.addEdge(edge);
            to.addEdge(edge);
        }

        return this;
    }

    removeEdge(edge: GraphEdge<T>): this {
        delete this.edges[edge.key];

        edge.from.removeEdge(edge);
        edge.to.removeEdge(edge);

        return this;
    }

    getNodes(): GraphNode<T>[] {
        return Object.values(this.nodes);
    }

    getEdges(): GraphEdge<T>[] {
        return Object.values(this.edges);
    }

    findNodeByKey(key: string): GraphNode<T> | void {
        return this.nodes[key];
    }

    findEdgeByKey(key: string): GraphEdge<T> | void {
        return this.edges[key];
    }

    findEdgeByNodes(from: GraphNode<T>, to: GraphNode<T>): GraphEdge<T> | void {
        const node = this.findNodeByKey(from.key);

        if (!node) {
            return;
        }

        return node.findConnectingEdge(to);
    }

    toJSON() {
        return this.serialize();
    }

    serialize() {
        return {
            directed: this.directed,
            edges: this.getEdges().map((edge) => edge.serialize()),
            nodes: this.getNodes().map((node) => node.serialize()),
        };
    }

    static deserialize<T>(serialized: SerializedGraph<T>): Graph<T> {
        const nodes = serialized.nodes.map(
            (node) => new GraphNode(node.value, node.key)
        );
        const edges = serialized.edges.map((edge) => {
            const from = nodes.find((node) => node.key === edge.from);
            const to = nodes.find((node) => node.key === edge.to);

            if (!from || !to) {
                const errors = [];
                if (!from) {
                    errors.push(`Cannot find from node ${edge.from}`);
                }
                if (!to) {
                    errors.push(`Cannot find to node ${edge.to}`);
                }
                throw new Error(errors.join('\n'));
            }

            return new GraphEdge(from, to, edge.weight, edge.key);
        });

        const graph = new Graph<T>(serialized.directed);

        // adding edges to graph will also add nodes to graph and edge
        edges.forEach((edge) => graph.addEdge(edge));

        return graph;
    }
}
