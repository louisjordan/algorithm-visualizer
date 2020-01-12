import { InsertionSortTracer } from './types';

function insertionSort(tracer: InsertionSortTracer, list: number[]) {
    let position = null;
    let pointer = null;
    tracer
        .set('list', list)
        .set('position', position)
        .set('pointer', pointer)
        .update(3);

    position = 1;
    tracer.update(5, 'position', position);

    while (position < list.length) {
        let x = list[position];

        pointer = position - 1;
        tracer.update(10, 'pointer', pointer);

        while (pointer >= 0 && list[pointer] > x) {
            list[pointer + 1] = list[pointer];
            pointer--;
            tracer
                .set('list', list)
                .set('pointer', pointer)
                .update(14);
        }

        list[pointer + 1] = x;
        tracer.update(17, 'list', list);

        position++;
        tracer.update(19, 'position', position);
    }

    return list;
}

export default insertionSort;
