import { uuid } from 'utilities';
import GraphNode from './GraphNode';

export default class GraphEdge<T> {
    readonly key: string;
    from: GraphNode<T>;
    to: GraphNode<T>;
    weight: number;

    constructor(from: GraphNode<T>, to: GraphNode<T>, weight: number = 1) {
        this.key = uuid();
        // add edge to from and to here?
        this.from = from;
        this.to = to;
        this.weight = weight;
    }
}
