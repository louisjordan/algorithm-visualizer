import { GraphEdge, SerializedGraphEdge } from './GraphEdge';
import { GraphVertex, SerializedGraphVertex } from './GraphVertex';
import { Serializable } from '../interfaces';

export type SerializedGraph<T> = {
    directed: boolean;
    verticies: SerializedGraphVertex<T>[];
    edges: SerializedGraphEdge[];
};

export class Graph<T> implements Serializable<SerializedGraph<T>> {
    private verticies: { [key: string]: GraphVertex<T> };
    private edges: { [key: string]: GraphEdge<T> };

    readonly directed: boolean;

    constructor(directed = false) {
        this.verticies = {};
        this.edges = {};
        this.directed = directed;
    }

    addVertex(vertex: GraphVertex<T>): this {
        this.verticies[vertex.key] = vertex;
        return this;
    }

    addEdge(edge: GraphEdge<T>): this {
        this.edges[edge.key] = edge;

        let from = this.findVertexByKey(edge.from.key);
        let to = this.findVertexByKey(edge.to.key);

        if (!from) {
            this.addVertex(edge.from);
            from = edge.from;
        }

        if (!to) {
            this.addVertex(edge.to);
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

    getVerticies(): GraphVertex<T>[] {
        return Object.values(this.verticies);
    }

    getEdges(): GraphEdge<T>[] {
        return Object.values(this.edges);
    }

    findVertexByKey(key: string): GraphVertex<T> | void {
        return this.verticies[key];
    }

    findEdgeByKey(key: string): GraphEdge<T> | void {
        return this.edges[key];
    }

    findEdgeByVerticies(
        from: GraphVertex<T>,
        to: GraphVertex<T>
    ): GraphEdge<T> | void {
        const vertex = this.findVertexByKey(from.key);

        if (!vertex) {
            return;
        }

        return vertex.findConnectingEdge(to);
    }

    toJSON() {
        return this.serialize();
    }

    serialize() {
        return {
            directed: this.directed,
            edges: this.getEdges().map((edge) => edge.serialize()),
            verticies: this.getVerticies().map((vertex) => vertex.serialize()),
        };
    }

    static deserialize<T>(serialized: SerializedGraph<T>): Graph<T> {
        const verticies = serialized.verticies.map(
            (vertex) => new GraphVertex(vertex.value, vertex.key)
        );
        const edges = serialized.edges.map((edge) => {
            const from = verticies.find((vertex) => vertex.key === edge.from);
            const to = verticies.find((vertex) => vertex.key === edge.to);

            if (!from || !to) {
                const errors = [];
                if (!from) {
                    errors.push(`Cannot find from vertex ${edge.from}`);
                }
                if (!to) {
                    errors.push(`Cannot find to vertex ${edge.to}`);
                }
                throw new Error(errors.join('\n'));
            }

            return new GraphEdge(from, to, edge.weight, edge.key);
        });

        const graph = new Graph<T>(serialized.directed);

        // adding edges to graph will also add verticies to graph and edge
        edges.forEach((edge) => graph.addEdge(edge));

        return graph;
    }
}
