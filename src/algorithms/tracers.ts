import { Tracer } from '../tracer';
import { InsertionSortTracerState } from './insertion-sort/types';

export type TracerStates = InsertionSortTracerState;
export type Tracers = {
    'insertion-sort': Tracer<InsertionSortTracerState>;
};
