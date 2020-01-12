import { Tracer } from '../../tracer';

export type InsertionSortTracerState = {
    list: number[];
    pointer: number | null;
    position: number | null;
};

export type InsertionSortTracer = Tracer<InsertionSortTracerState>;
