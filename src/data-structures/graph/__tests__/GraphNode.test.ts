import GraphNode from '../GraphNode';
import GraphEdge from 'data-structures/graph/GraphEdge';

describe('GraphNode', () => {
    describe('instance variables', () => {
        it('should expose node key', () => {
            const node = new GraphNode(0);
            expect(typeof node.key).toBe('string');
        });

        it('should expose node value', () => {
            const value = 0;
            const node = new GraphNode(value);
            expect(node.value).toBe(value);
        });
    });

    describe('addEdge', () => {
        it('should add an edge to the node', () => {
            const nodes = [new GraphNode(0), new GraphNode(1)];
            const edge = new GraphEdge(nodes[0], nodes[1]);

            nodes[0].addEdge(edge);

            expect(nodes[0].hasEdge(edge)).toBe(true);
            expect(nodes[1].hasEdge(edge)).toBe(false);

            nodes[1].addEdge(edge);
            expect(nodes[1].hasEdge(edge)).toBe(true);
        });
    });

    describe('removeEdge', () => {
        it('should remove an edge from the node', () => {
            const nodes = [new GraphNode(0), new GraphNode(1)];
            const edge = new GraphEdge(nodes[0], nodes[1]);
            nodes[0].addEdge(edge);
            nodes[1].addEdge(edge);

            nodes[0].removeEdge(edge);

            expect(nodes[0].hasEdge(edge)).toBe(false);
            expect(nodes[1].hasEdge(edge)).toBe(true);

            nodes[1].removeEdge(edge);

            expect(nodes[1].hasEdge(edge)).toBe(false);
        });
    });

    describe('neighbours', () => {
        it("should return all the node's neighbours, regardless of direction", () => {
            const nodes = [
                new GraphNode(0),
                new GraphNode(1),
                new GraphNode(2),
            ];
            const edge0to1 = new GraphEdge(nodes[0], nodes[1]);
            const edge0to2 = new GraphEdge(nodes[0], nodes[2]);
            const edge1to0 = new GraphEdge(nodes[1], nodes[0]);
            const edge1to2 = new GraphEdge(nodes[1], nodes[2]);
            const edge2to1 = new GraphEdge(nodes[2], nodes[1]);

            nodes[0].addEdge(edge0to1);
            nodes[1].addEdge(edge0to1);

            nodes[0].addEdge(edge0to2);
            nodes[2].addEdge(edge0to2);

            nodes[1].addEdge(edge1to0);
            nodes[0].addEdge(edge1to0);

            nodes[1].addEdge(edge1to2);
            nodes[2].addEdge(edge1to2);

            nodes[2].addEdge(edge2to1);
            nodes[1].addEdge(edge2to1);

            const neighbours = nodes.map((node) => node.neighbours());

            expect(neighbours[0].length).toBe(3);
            expect(neighbours[0]).toEqual(
                expect.arrayContaining([nodes[1], nodes[2]])
            );

            expect(neighbours[1].length).toBe(4);
            expect(neighbours[1]).toEqual(
                expect.arrayContaining([nodes[0], nodes[2]])
            );

            expect(neighbours[2].length).toBe(3);
            expect(neighbours[2]).toEqual(
                expect.arrayContaining([nodes[0], nodes[1]])
            );
        });
    });

    describe('serialize', () => {
        it('should convert a GraphNode instance into a plain object', () => {
            const nodes = [new GraphNode(0), new GraphNode(1)];
            const edge = new GraphEdge(nodes[0], nodes[1]);

            nodes[0].addEdge(edge);

            const serialized = {
                key: nodes[0].key,
                value: 0,
                edges: [edge.key],
            };

            expect(nodes[0].serialize()).toEqual(serialized);
        });

        it('should create a stringifyable serialization', () => {
            const nodes = [new GraphNode(0), new GraphNode(1)];
            const edge = new GraphEdge(nodes[0], nodes[1]);
            nodes[0].addEdge(edge);

            expect(() => JSON.stringify(nodes[0].serialize())).not.toThrow();
        });
    });
});
