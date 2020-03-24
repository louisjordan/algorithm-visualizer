import { GraphEdge } from '../GraphEdge';
import { GraphVertex } from '../GraphVertex';

describe('GraphEdge', () => {
    describe('instance variables', () => {
        it('should expose edge key', () => {
            const verticies = [new GraphVertex(1), new GraphVertex(2)];
            const edge = new GraphEdge(verticies[0], verticies[1]);
            expect(typeof edge.key).toBe('string');
        });

        it('should expose verticies the edge connects', () => {
            const verticies = [new GraphVertex(1), new GraphVertex(2)];
            const edge = new GraphEdge(verticies[0], verticies[1]);
            expect(edge.from).toBe(verticies[0]);
            expect(edge.to).toBe(verticies[1]);
        });

        it('should expose edge weight', () => {
            const weight = 10;
            const verticies = [new GraphVertex(1), new GraphVertex(2)];
            const edge = new GraphEdge(verticies[0], verticies[1], weight);
            expect(edge.weight).toBe(weight);
        });
    });

    describe('serialize', () => {
        it('should convert a GraphEdge instance into a plain object', () => {
            const verticies = [new GraphVertex(0), new GraphVertex(1)];
            const edge = new GraphEdge(verticies[0], verticies[1]);

            const serialized = {
                key: edge.key,
                weight: 1,
                from: verticies[0].key,
                to: verticies[1].key,
            };

            expect(edge.serialize()).toEqual(serialized);
        });

        it('should create a stringifyable serialization', () => {
            const verticies = [new GraphVertex(0), new GraphVertex(1)];
            const edge = new GraphEdge(verticies[0], verticies[1]);

            expect(() => JSON.stringify(edge.serialize())).not.toThrow();
        });
    });
});
