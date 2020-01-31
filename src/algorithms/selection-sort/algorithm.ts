import { SelectionSortTracer } from './types';

function selectionSort(tracer: SelectionSortTracer, list: number[]) {
    tracer.set('list', list).update(1);
    for (let position = 0; position < list.length; position++) {
        tracer.set('position', position).update(2);
        let smallest = position;
        tracer.set('smallest', smallest).update(3);

        for (let pointer = position + 1; pointer < list.length; pointer++) {
            tracer.set('pointer', pointer).update(5);
            if (list[smallest] > list[pointer]) {
                smallest = pointer;
                tracer.set('smallest', smallest).update(7);
            }
        }

        let x = list[position];
        list[position] = list[smallest];
        list[smallest] = x;
        tracer.set('list', list).update(13);
    }

    tracer
        .set('list', list)
        .set('position', null)
        .set('pointer', null)
        .update(16);

    return list;
}

export default selectionSort;
