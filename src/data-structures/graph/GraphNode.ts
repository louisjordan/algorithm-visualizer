import { uuid } from 'utilities';
import GraphEdge from 'data-structures/graph/GraphEdge';

export default class GraphNode<T> {
    readonly key: string;
    value: T;

    private edges: { [key: string]: GraphEdge<T> };

    constructor(value: T) {
        this.key = uuid();
        this.value = value;
        this.edges = {};
    }

    addEdge(edge: GraphEdge<T>): this {
        this.edges[edge.key] = edge;
        return this;
    }

    removeEdge(edge: GraphEdge<T>): this {
        delete this.edges[edge.key];
        return this;
    }

    hasEdge(edge: GraphEdge<T>): boolean {
        return !!this.edges[edge.key];
    }

    findConnectingEdge(node: GraphNode<T>): GraphEdge<T> | void {
        return Object.values(this.edges).find(
            (edge) => edge.from === node || edge.to === node
        );
    }

    neighbours(): GraphNode<T>[] {
        return Object.values(this.edges).map((edge) => {
            if (edge.from === this) {
                return edge.to;
            } else {
                return edge.from;
            }
        });
    }
}
