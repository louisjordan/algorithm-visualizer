/*eslint import/no-webpack-loader-syntax: "off"*/
import { AlgorithmDefinition, Group } from '../types';
import sort from './algorithm';
import visualiser from './visualiser';
import source from './source.json';
import doc from '!raw-loader!./README.md';
import { SelectionSortTracerState } from './types';

const selectionSort: AlgorithmDefinition<
    SelectionSortTracerState,
    { list: number[] },
    number[]
> = {
    key: 'selection-sort',
    name: 'Selection Sort',
    group: Group.Sorting,
    source: source.functions.join('\n\n'),
    doc,
    visualiser,
    run: (tracer, { list }) => sort(tracer, list),
    defaultParameters: () => ({ list: [3, 5, 2, 6, 7] }),
};

export default selectionSort;
