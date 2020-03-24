import { uuid } from 'utilities';
import { GraphVertex } from './GraphVertex';
import { Serializable } from '../interfaces';

export type SerializedGraphEdge = {
    key: string;
    from: string;
    to: string;
    weight: number;
};

export class GraphEdge<T> implements Serializable<SerializedGraphEdge> {
    readonly key: string;
    from: GraphVertex<T>;
    to: GraphVertex<T>;
    weight: number;

    constructor(
        from: GraphVertex<T>,
        to: GraphVertex<T>,
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
