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
    tracer.set('position', position).update(5);

    while (position < list.length) {
        let x = list[position];
        tracer.set('value', x);

        pointer = position - 1;
        tracer.set('pointer', pointer).update(10);

        while (pointer >= 0 && list[pointer] > x) {
            list[pointer + 1] = list[pointer];
            pointer--;
            tracer
                .set('list', list)
                .set('pointer', pointer)
                .set('position', pointer + 1)
                .update(14);
        }

        list[pointer + 1] = x;
        tracer.set('list', list);

        position++;
        tracer
            .set('position', position)
            .set('value', list[position])
            .update(19);
    }

    tracer
        .set('position', null)
        .set('pointer', null)
        .update(22);

    return list;
}

export default insertionSort;
