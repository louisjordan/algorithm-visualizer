import Graph from '../Graph';
import GraphNode from '../GraphNode';
import GraphEdge from 'data-structures/graph/GraphEdge';

describe('Graph', () => {
    describe('instance variables', () => {
        it('should expose directed', () => {
            const digraph = new Graph(true);
            const graph = new Graph(false);
            const defaultGraph = new Graph();

            expect(digraph.directed).toBe(true);
            expect(graph.directed).toBe(false);
            expect(defaultGraph.directed).toBe(false);
        });
    });

    describe('addNode', () => {
        it('should add a node to the graph', () => {
            const graph = new Graph();
            const node = new GraphNode(0);

            graph.addNode(node);

            expect(graph.findNodeByKey(node.key)).toBe(node);
        });
    });

    describe('addEdge', () => {
        it('should add an edge to the graph', () => {
            const graph = new Graph();
            const nodes = [new GraphNode(0), new GraphNode(1)];
            const edge = new GraphEdge(nodes[0], nodes[1]);

            graph.addEdge(edge);

            expect(graph.findEdgeByNodes(nodes[0], nodes[1])).toBe(edge);
        });

        it('should add nodes connected by edge to the graph', () => {
            const graph = new Graph();
            const nodes = [new GraphNode(0), new GraphNode(1)];
            const edge = new GraphEdge(nodes[0], nodes[1]);

            graph.addEdge(edge);

            expect(graph.findNodeByKey(nodes[0].key)).toBe(nodes[0]);
            expect(graph.findNodeByKey(nodes[1].key)).toBe(nodes[1]);
        });

        it('should add edge to both nodes connected by edge in undirected graph', () => {
            const graph = new Graph();
            const nodes = [new GraphNode(0), new GraphNode(1)];
            const edge = new GraphEdge(nodes[0], nodes[1]);

            graph.addEdge(edge);

            expect(nodes[0].hasEdge(edge)).toBe(true);
            expect(nodes[1].hasEdge(edge)).toBe(true);
        });

        it('should add edge to from node connected by edge in directed graph', () => {
            const graph = new Graph(true);
            const nodes = [new GraphNode(0), new GraphNode(1)];
            const edge = new GraphEdge(nodes[0], nodes[1]);

            graph.addEdge(edge);

            expect(nodes[0].hasEdge(edge)).toBe(true);
            expect(nodes[1].hasEdge(edge)).toBe(false);
        });
    });

    describe('removeEdge', () => {
        it('should remove the edge from the graph', () => {
            const graph = new Graph();
            const nodes = [new GraphNode(0), new GraphNode(1)];
            const edge = new GraphEdge(nodes[0], nodes[1]);
            graph.addEdge(edge);

            graph.removeEdge(edge);

            expect(graph.findEdgeByNodes(nodes[0], nodes[1])).toBe(undefined);
        });

        it('should remove edge from nodes connected by edge', () => {
            const graph = new Graph();
            const nodes = [new GraphNode(0), new GraphNode(1)];
            const edge = new GraphEdge(nodes[0], nodes[1]);
            graph.addEdge(edge);

            graph.removeEdge(edge);

            expect(nodes[0].hasEdge(edge)).toBe(false);
            expect(nodes[1].hasEdge(edge)).toBe(false);
        });
    });

    describe('getNodes', () => {
        it('should return all nodes', () => {
            const graph = new Graph();
            const nodes = [
                new GraphNode(0),
                new GraphNode(1),
                new GraphNode(2),
                new GraphNode(3),
            ];

            nodes.forEach((node) => graph.addNode(node));

            const graphNodes = graph.getNodes();

            expect(graphNodes.length).toBe(nodes.length);
            expect(graphNodes).toEqual(expect.arrayContaining(nodes));
        });
    });

    describe('getEdges', () => {
        it('should return all edges', () => {
            const graph = new Graph();
            const nodes = [
                new GraphNode(0),
                new GraphNode(1),
                new GraphNode(2),
                new GraphNode(3),
            ];

            const edges = [
                new GraphEdge(nodes[0], nodes[1]),
                new GraphEdge(nodes[0], nodes[2]),
                new GraphEdge(nodes[0], nodes[3]),
                new GraphEdge(nodes[1], nodes[0]),
                new GraphEdge(nodes[1], nodes[2]),
                new GraphEdge(nodes[1], nodes[3]),
                new GraphEdge(nodes[2], nodes[0]),
                new GraphEdge(nodes[2], nodes[1]),
                new GraphEdge(nodes[2], nodes[2]),
            ];

            edges.forEach((edge) => graph.addEdge(edge));

            const graphEdges = graph.getEdges();

            expect(graphEdges.length).toBe(edges.length);
            expect(graphEdges).toEqual(expect.arrayContaining(edges));
        });
    });

    describe('findNodeByKey', () => {
        it('should return a node if it exists in the graph', () => {
            const graph = new Graph();
            const node = new GraphNode(0);

            graph.addNode(node);

            expect(graph.findNodeByKey(node.key)).toBe(node);
        });

        it('should return undefined if node does not exist in the graph', () => {
            const graph = new Graph();

            expect(graph.findNodeByKey('notanode')).toBe(undefined);
        });
    });

    describe('findEdgeByNodes', () => {
        it('should find an edge connected by two nodes', () => {
            const graph = new Graph();
            const nodes = [new GraphNode(0), new GraphNode(1)];
            const edge = new GraphEdge(nodes[0], nodes[1]);

            graph.addEdge(edge);

            expect(graph.findEdgeByNodes(nodes[0], nodes[1])).toBe(edge);
        });

        it('should return undefined if no edge connects the two nodes', () => {
            const graph = new Graph();
            const nodes = [
                new GraphNode(0),
                new GraphNode(1),
                new GraphNode(2),
            ];
            const edges = [
                new GraphEdge(nodes[0], nodes[1]),
                new GraphEdge(nodes[0], nodes[2]),
            ];

            edges.forEach((edge) => graph.addEdge(edge));

            expect(graph.findEdgeByNodes(nodes[1], nodes[2])).toBe(undefined);
        });
    });

    describe('serialize', () => {
        it('should convert a Graph instance into a plain object', () => {
            const graph = new Graph();
            const nodes = [
                new GraphNode(0),
                new GraphNode(1),
                new GraphNode(2),
            ];
            const edges = [
                new GraphEdge(nodes[0], nodes[1]),
                new GraphEdge(nodes[0], nodes[2]),
            ];

            edges.forEach((edge) => graph.addEdge(edge));

            const serialized = {
                directed: false,
                nodes: [
                    {
                        key: nodes[0].key,
                        value: nodes[0].value,
                        edges: [edges[0].key, edges[1].key],
                    },
                    {
                        key: nodes[1].key,
                        value: nodes[1].value,
                        edges: [edges[0].key],
                    },
                    {
                        key: nodes[2].key,
                        value: nodes[2].value,
                        edges: [edges[1].key],
                    },
                ],
                edges: [
                    {
                        key: edges[0].key,
                        weight: 1,
                        from: nodes[0].key,
                        to: nodes[1].key,
                    },
                    {
                        key: edges[1].key,
                        weight: 1,
                        from: nodes[0].key,
                        to: nodes[2].key,
                    },
                ],
            };

            expect(graph.serialize()).toEqual(serialized);
        });

        it('should create a stringifyable serialization', () => {
            const graph = new Graph();
            const nodes = [
                new GraphNode(0),
                new GraphNode(1),
                new GraphNode(2),
            ];
            const edges = [
                new GraphEdge(nodes[0], nodes[1]),
                new GraphEdge(nodes[0], nodes[2]),
            ];

            edges.forEach((edge) => graph.addEdge(edge));

            expect(() => JSON.stringify(graph.serialize())).not.toThrow();
        });
    });

    describe('deserialize', () => {
        it('should recreate a seralized graph', () => {
            const graph = new Graph();
            const nodes = [
                new GraphNode(0),
                new GraphNode(1),
                new GraphNode(2),
            ];
            const edges = [
                new GraphEdge(nodes[0], nodes[1]),
                new GraphEdge(nodes[0], nodes[2]),
            ];

            edges.forEach((edge) => graph.addEdge(edge));

            const serialized = graph.serialize();
            const deserialized = Graph.deserialize(serialized);

            // check instance variables
            expect(deserialized.directed).toBe(false);

            // check nodes
            expect(deserialized.getNodes().length).toBe(3);
            nodes.forEach((node) => {
                expect(deserialized.findNodeByKey(node.key)).not.toBe(
                    undefined
                );
            });

            // check edges
            expect(deserialized.getEdges().length).toBe(2);
            edges.forEach((edge) => {
                expect(deserialized.findEdgeByKey(edge.key)).not.toBe(
                    undefined
                );
            });
        });
    });
});
