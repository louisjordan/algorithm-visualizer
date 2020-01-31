import { SelectionSortTracer } from './types';

function selectionSort(tracer: SelectionSortTracer, list: number[]) {
    tracer.assign('list', list).break(1);
    for (let position = 0; position < list.length; position++) {
        tracer.assign('position', position).break(2);
        let smallest = position;
        tracer.assign('smallest', smallest).break(3);

        for (let pointer = position + 1; pointer < list.length; pointer++) {
            tracer.assign('pointer', pointer).break(5);
            if (list[smallest] > list[pointer]) {
                smallest = pointer;
                tracer.assign('smallest', smallest).break(7);
            }
        }

        let x = list[position];
        list[position] = list[smallest];
        list[smallest] = x;
        tracer.assign('list', list).break(13);
    }

    tracer
        .assign('list', list)
        .assign('position', null)
        .assign('pointer', null)
        .break(16);

    return list;
}

export default selectionSort;
