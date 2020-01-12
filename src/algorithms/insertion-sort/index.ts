import { AlgorithmDefinition } from '../types';
import sort from './algorithm';
import visualiser from './visualiser';
import source from './source.json';
import { InsertionSortTracerState } from './types';

const insertionSort: AlgorithmDefinition<
    InsertionSortTracerState,
    { list: number[] },
    number[]
> = {
    key: 'insertion-sort',
    run: (tracer, { list }) => sort(tracer, list),
    source: source.functions.join('\n\n'),
    visualiser,
    defaultParameters: { list: [3, 5, 2, 6, 7] },
};

export default insertionSort;
