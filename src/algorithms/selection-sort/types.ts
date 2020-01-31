import { Tracer } from '../../tracer';

export type SelectionSortTracerState = {
    list: number[];
    pointer: number | null;
    position: number | null;
    smallest: number | null;
};

export type SelectionSortTracer = Tracer<SelectionSortTracerState>;
