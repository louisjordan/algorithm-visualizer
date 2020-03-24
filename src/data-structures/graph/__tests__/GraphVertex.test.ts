import { GraphVertex } from '../GraphVertex';
import { GraphEdge } from 'data-structures/graph/GraphEdge';

describe('GraphVertex', () => {
    describe('instance variables', () => {
        it('should expose vertex key', () => {
            const vertex = new GraphVertex(0);
            expect(typeof vertex.key).toBe('string');
        });

        it('should expose vertex value', () => {
            const value = 0;
            const vertex = new GraphVertex(value);
            expect(vertex.value).toBe(value);
        });
    });

    describe('addEdge', () => {
        it('should add an edge to the vertex', () => {
            const verticies = [new GraphVertex(0), new GraphVertex(1)];
            const edge = new GraphEdge(verticies[0], verticies[1]);

            verticies[0].addEdge(edge);

            expect(verticies[0].hasEdge(edge)).toBe(true);
            expect(verticies[1].hasEdge(edge)).toBe(false);

            verticies[1].addEdge(edge);
            expect(verticies[1].hasEdge(edge)).toBe(true);
        });
    });

    describe('removeEdge', () => {
        it('should remove an edge from the vertex', () => {
            const verticies = [new GraphVertex(0), new GraphVertex(1)];
            const edge = new GraphEdge(verticies[0], verticies[1]);
            verticies[0].addEdge(edge);
            verticies[1].addEdge(edge);

            verticies[0].removeEdge(edge);

            expect(verticies[0].hasEdge(edge)).toBe(false);
            expect(verticies[1].hasEdge(edge)).toBe(true);

            verticies[1].removeEdge(edge);

            expect(verticies[1].hasEdge(edge)).toBe(false);
        });
    });

    describe('neighbours', () => {
        it("should return all the vertex's neighbours, regardless of direction", () => {
            const verticies = [
                new GraphVertex(0),
                new GraphVertex(1),
                new GraphVertex(2),
            ];
            const edge0to1 = new GraphEdge(verticies[0], verticies[1]);
            const edge0to2 = new GraphEdge(verticies[0], verticies[2]);
            const edge1to0 = new GraphEdge(verticies[1], verticies[0]);
            const edge1to2 = new GraphEdge(verticies[1], verticies[2]);
            const edge2to1 = new GraphEdge(verticies[2], verticies[1]);

            verticies[0].addEdge(edge0to1);
            verticies[1].addEdge(edge0to1);

            verticies[0].addEdge(edge0to2);
            verticies[2].addEdge(edge0to2);

            verticies[1].addEdge(edge1to0);
            verticies[0].addEdge(edge1to0);

            verticies[1].addEdge(edge1to2);
            verticies[2].addEdge(edge1to2);

            verticies[2].addEdge(edge2to1);
            verticies[1].addEdge(edge2to1);

            const neighbours = verticies.map((vertex) => vertex.neighbours());

            expect(neighbours[0].length).toBe(3);
            expect(neighbours[0]).toEqual(
                expect.arrayContaining([verticies[1], verticies[2]])
            );

            expect(neighbours[1].length).toBe(4);
            expect(neighbours[1]).toEqual(
                expect.arrayContaining([verticies[0], verticies[2]])
            );

            expect(neighbours[2].length).toBe(3);
            expect(neighbours[2]).toEqual(
                expect.arrayContaining([verticies[0], verticies[1]])
            );
        });
    });

    describe('serialize', () => {
        it('should convert a GraphVertex instance into a plain object', () => {
            const verticies = [new GraphVertex(0), new GraphVertex(1)];
            const edge = new GraphEdge(verticies[0], verticies[1]);

            verticies[0].addEdge(edge);

            const serialized = {
                key: verticies[0].key,
                value: 0,
                edges: [edge.key],
            };

            expect(verticies[0].serialize()).toEqual(serialized);
        });

        it('should create a stringifyable serialization', () => {
            const verticies = [new GraphVertex(0), new GraphVertex(1)];
            const edge = new GraphEdge(verticies[0], verticies[1]);
            verticies[0].addEdge(edge);

            expect(() =>
                JSON.stringify(verticies[0].serialize())
            ).not.toThrow();
        });
    });
});
