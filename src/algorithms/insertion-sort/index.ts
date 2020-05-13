/*eslint import/no-webpack-loader-syntax: "off"*/
import { AlgorithmDefinition, Group } from '../types';
import sort from './algorithm';
import visualiser from './visualiser';
import source from './source.json';
import doc from '!raw-loader!./README.md';
import { InsertionSortTracerState } from './types';

const insertionSort: AlgorithmDefinition<
    InsertionSortTracerState,
    { list: number[] },
    number[]
> = {
    key: 'insertion-sort',
    name: 'Insertion Sort',
    group: Group.Array,
    source: source.functions.join('\n\n'),
    doc,
    visualiser,
    run: (tracer, { list }) => sort(tracer, list),
    defaultParameters: () => ({ list: [3, 5, 2, 6, 1, 9, 4, 7] }),
};

export default insertionSort;
