import { uuid } from 'utilities';
import GraphNode from './GraphNode';
import { Serializable } from '../interfaces';

export type SerializedGraphEdge = {
    key: string;
    from: string;
    to: string;
    weight: number;
};

export default class GraphEdge<T> implements Serializable<SerializedGraphEdge> {
    readonly key: string;
    from: GraphNode<T>;
    to: GraphNode<T>;
    weight: number;

    constructor(
        from: GraphNode<T>,
        to: GraphNode<T>,
        weight: number = 1,
        key?: string
    ) {
        this.key = key || uuid();
        this.from = from;
        this.to = to;
        this.weight = weight;
    }

    serialize() {
        return {
            key: this.key,
            from: this.from.key,
            to: this.to.key,
            weight: this.weight,
        };
    }
}
