import insertionSort from './';
import { MockTracer } from '../../tracer';

describe('InsertionSort', () => {
    it('should sort an array of integers', () => {
        const tracer = new MockTracer();
        expect(insertionSort(tracer, [6, 2, 8, 9, 3])).toEqual([2, 3, 6, 8, 9]);
    });
});
