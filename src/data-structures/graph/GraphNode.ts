import { uuid } from 'utilities';
import GraphEdge from 'data-structures/graph/GraphEdge';

export default class GraphNode<T> {
    readonly key: string;
    value: T;

    private edges: GraphEdge<T>[];

    constructor(value: T) {
        this.key = uuid();
        this.value = value;
        this.edges = [];
    }

    addEdge(edge: GraphEdge<T>): this {
        this.edges.push(edge);
        return this;
    }

    removeEdge(edge: GraphEdge<T>): this {
        this.edges = this.edges.filter((e) => e.key !== edge.key);
        return this;
    }

    findEdge(edge: GraphEdge<T>): GraphEdge<T> | void {
        return this.edges.find((e) => e.key === edge.key);
    }

    hasEdge(edge: GraphEdge<T>): boolean {
        return !!this.findEdge(edge);
    }

    neighbours(): GraphNode<T>[] {
        return this.edges.map((edge) => {
            if (edge.from === this) {
                return edge.to;
            } else {
                return edge.from;
            }
        });
    }
}
