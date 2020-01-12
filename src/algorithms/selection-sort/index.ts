import { AlgorithmDefinition, Group } from '../types';
import sort from './algorithm';
import visualiser from './visualiser';
import source from './source.json';
import { SelectionSortTracerState } from './types';

const selectionSort: AlgorithmDefinition<
    SelectionSortTracerState,
    { list: number[] },
    number[]
> = {
    key: 'selection-sort',
    name: 'Selection Sort',
    group: Group.Sorting,
    run: (tracer, { list }) => sort(tracer, list),
    source: source.functions.join('\n\n'),
    visualiser,
    defaultParameters: { list: [3, 5, 2, 6, 7] },
};

export default selectionSort;
