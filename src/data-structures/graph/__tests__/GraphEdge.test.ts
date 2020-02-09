import GraphEdge from '../GraphEdge';
import GraphNode from '../GraphNode';

describe('GraphEdge', () => {
    describe('instance variables', () => {
        it('should expose edge key', () => {
            const nodes = [new GraphNode(1), new GraphNode(2)];
            const edge = new GraphEdge(nodes[0], nodes[1]);
            expect(typeof edge.key).toBe('string');
        });

        it('should expose nodes the edge connects', () => {
            const nodes = [new GraphNode(1), new GraphNode(2)];
            const edge = new GraphEdge(nodes[0], nodes[1]);
            expect(edge.from).toBe(nodes[0]);
            expect(edge.to).toBe(nodes[1]);
        });

        it('should expose edge weight', () => {
            const weight = 10;
            const nodes = [new GraphNode(1), new GraphNode(2)];
            const edge = new GraphEdge(nodes[0], nodes[1], weight);
            expect(edge.weight).toBe(weight);
        });
    });
});
