import { Graph } from '../Graph';
import { GraphVertex } from '../GraphVertex';
import { GraphEdge } from 'data-structures/graph/GraphEdge';

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

    describe('addVertex', () => {
        it('should add a vertex to the graph', () => {
            const graph = new Graph<number>();
            const vertex = new GraphVertex(0);

            graph.addVertex(vertex);

            expect(graph.findVertexByKey(vertex.key)).toBe(vertex);
        });
    });

    describe('addEdge', () => {
        it('should add an edge to the graph', () => {
            const graph = new Graph<number>();
            const verticies = [new GraphVertex(0), new GraphVertex(1)];
            const edge = new GraphEdge(verticies[0], verticies[1]);

            graph.addEdge(edge);

            expect(graph.findEdgeByVerticies(verticies[0], verticies[1])).toBe(
                edge
            );
        });

        it('should add verticies connected by edge to the graph', () => {
            const graph = new Graph<number>();
            const verticies = [new GraphVertex(0), new GraphVertex(1)];
            const edge = new GraphEdge(verticies[0], verticies[1]);

            graph.addEdge(edge);

            expect(graph.findVertexByKey(verticies[0].key)).toBe(verticies[0]);
            expect(graph.findVertexByKey(verticies[1].key)).toBe(verticies[1]);
        });

        it('should add edge to both verticies connected by edge in undirected graph', () => {
            const graph = new Graph<number>();
            const verticies = [new GraphVertex(0), new GraphVertex(1)];
            const edge = new GraphEdge(verticies[0], verticies[1]);

            graph.addEdge(edge);

            expect(verticies[0].hasEdge(edge)).toBe(true);
            expect(verticies[1].hasEdge(edge)).toBe(true);
        });

        it('should add edge to from vertex connected by edge in directed graph', () => {
            const graph = new Graph<number>(true);
            const verticies = [new GraphVertex(0), new GraphVertex(1)];
            const edge = new GraphEdge(verticies[0], verticies[1]);

            graph.addEdge(edge);

            expect(verticies[0].hasEdge(edge)).toBe(true);
            expect(verticies[1].hasEdge(edge)).toBe(false);
        });
    });

    describe('removeEdge', () => {
        it('should remove the edge from the graph', () => {
            const graph = new Graph<number>();
            const verticies = [new GraphVertex(0), new GraphVertex(1)];
            const edge = new GraphEdge(verticies[0], verticies[1]);
            graph.addEdge(edge);

            graph.removeEdge(edge);

            expect(graph.findEdgeByVerticies(verticies[0], verticies[1])).toBe(
                undefined
            );
        });

        it('should remove edge from verticies connected by edge', () => {
            const graph = new Graph<number>();
            const verticies = [new GraphVertex(0), new GraphVertex(1)];
            const edge = new GraphEdge(verticies[0], verticies[1]);
            graph.addEdge(edge);

            graph.removeEdge(edge);

            expect(verticies[0].hasEdge(edge)).toBe(false);
            expect(verticies[1].hasEdge(edge)).toBe(false);
        });
    });

    describe('getVerticies', () => {
        it('should return all verticies', () => {
            const graph = new Graph<number>();
            const verticies = [
                new GraphVertex(0),
                new GraphVertex(1),
                new GraphVertex(2),
                new GraphVertex(3),
            ];

            verticies.forEach((vertex) => graph.addVertex(vertex));

            const graphVerticies = graph.getVerticies();

            expect(graphVerticies.length).toBe(verticies.length);
            expect(graphVerticies).toEqual(expect.arrayContaining(verticies));
        });
    });

    describe('getEdges', () => {
        it('should return all edges', () => {
            const graph = new Graph<number>();
            const verticies = [
                new GraphVertex(0),
                new GraphVertex(1),
                new GraphVertex(2),
                new GraphVertex(3),
            ];

            const edges = [
                new GraphEdge(verticies[0], verticies[1]),
                new GraphEdge(verticies[0], verticies[2]),
                new GraphEdge(verticies[0], verticies[3]),
                new GraphEdge(verticies[1], verticies[0]),
                new GraphEdge(verticies[1], verticies[2]),
                new GraphEdge(verticies[1], verticies[3]),
                new GraphEdge(verticies[2], verticies[0]),
                new GraphEdge(verticies[2], verticies[1]),
                new GraphEdge(verticies[2], verticies[2]),
            ];

            edges.forEach((edge) => graph.addEdge(edge));

            const graphEdges = graph.getEdges();

            expect(graphEdges.length).toBe(edges.length);
            expect(graphEdges).toEqual(expect.arrayContaining(edges));
        });
    });

    describe('findVertexByKey', () => {
        it('should return a vertex if it exists in the graph', () => {
            const graph = new Graph<number>();
            const vertex = new GraphVertex(0);

            graph.addVertex(vertex);

            expect(graph.findVertexByKey(vertex.key)).toBe(vertex);
        });

        it('should return undefined if vertex does not exist in the graph', () => {
            const graph = new Graph<number>();

            expect(graph.findVertexByKey('notavertex')).toBe(undefined);
        });
    });

    describe('findEdgeByVerticies', () => {
        it('should find an edge connected by two verticies', () => {
            const graph = new Graph<number>();
            const verticies = [new GraphVertex(0), new GraphVertex(1)];
            const edge = new GraphEdge(verticies[0], verticies[1]);

            graph.addEdge(edge);

            expect(graph.findEdgeByVerticies(verticies[0], verticies[1])).toBe(
                edge
            );
        });

        it('should return undefined if no edge connects the two verticies', () => {
            const graph = new Graph<number>();
            const verticies = [
                new GraphVertex(0),
                new GraphVertex(1),
                new GraphVertex(2),
            ];
            const edges = [
                new GraphEdge(verticies[0], verticies[1]),
                new GraphEdge(verticies[0], verticies[2]),
            ];

            edges.forEach((edge) => graph.addEdge(edge));

            expect(graph.findEdgeByVerticies(verticies[1], verticies[2])).toBe(
                undefined
            );
        });
    });

    describe('serialize', () => {
        it('should convert a Graph instance into a plain object', () => {
            const graph = new Graph<number>();
            const verticies = [
                new GraphVertex(0),
                new GraphVertex(1),
                new GraphVertex(2),
            ];
            const edges = [
                new GraphEdge(verticies[0], verticies[1]),
                new GraphEdge(verticies[0], verticies[2]),
            ];

            edges.forEach((edge) => graph.addEdge(edge));

            const serialized = {
                directed: false,
                verticies: [
                    {
                        key: verticies[0].key,
                        value: verticies[0].value,
                        edges: [edges[0].key, edges[1].key],
                    },
                    {
                        key: verticies[1].key,
                        value: verticies[1].value,
                        edges: [edges[0].key],
                    },
                    {
                        key: verticies[2].key,
                        value: verticies[2].value,
                        edges: [edges[1].key],
                    },
                ],
                edges: [
                    {
                        key: edges[0].key,
                        weight: 1,
                        from: verticies[0].key,
                        to: verticies[1].key,
                    },
                    {
                        key: edges[1].key,
                        weight: 1,
                        from: verticies[0].key,
                        to: verticies[2].key,
                    },
                ],
            };

            expect(graph.serialize()).toEqual(serialized);
        });

        it('should create a stringifyable serialization', () => {
            const graph = new Graph<number>();
            const verticies = [
                new GraphVertex(0),
                new GraphVertex(1),
                new GraphVertex(2),
            ];
            const edges = [
                new GraphEdge(verticies[0], verticies[1]),
                new GraphEdge(verticies[0], verticies[2]),
            ];

            edges.forEach((edge) => graph.addEdge(edge));

            expect(() => JSON.stringify(graph.serialize())).not.toThrow();
        });
    });

    describe('deserialize', () => {
        it('should recreate a seralized graph', () => {
            const graph = new Graph<number>();
            const verticies = [
                new GraphVertex(0),
                new GraphVertex(1),
                new GraphVertex(2),
            ];
            const edges = [
                new GraphEdge(verticies[0], verticies[1]),
                new GraphEdge(verticies[0], verticies[2]),
            ];

            edges.forEach((edge) => graph.addEdge(edge));

            const serialized = graph.serialize();
            const deserialized = Graph.deserialize(serialized);

            // check instance variables
            expect(deserialized.directed).toBe(false);

            // check verticies
            expect(deserialized.getVerticies().length).toBe(3);
            verticies.forEach((vertex) => {
                expect(deserialized.findVertexByKey(vertex.key)).not.toBe(
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
