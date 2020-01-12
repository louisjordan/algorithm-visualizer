import insertionSort from './algorithm';
import { Tracer } from '../../tracer';
import { InsertionSortTracerState } from './types';

describe('InsertionSort', () => {
    it('should sort an array of integers', () => {
        const tracer = new Tracer<InsertionSortTracerState>();
        expect(insertionSort(tracer, [6, 2, 8, 9, 3])).toEqual([2, 3, 6, 8, 9]);
    });
});
