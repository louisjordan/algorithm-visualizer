import selectionSort from '../algorithm';
import { Tracer } from 'tracer';
import { SelectionSortTracerState } from '../types';

describe('SelectionSort', () => {
    it('should sort an array of integers', () => {
        const tracer = new Tracer<SelectionSortTracerState>();
        expect(selectionSort(tracer, [6, 2, 8, 9, 3])).toEqual([2, 3, 6, 8, 9]);
    });
});
