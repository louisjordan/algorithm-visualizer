import { InsertionSortTracer } from './types';

function insertionSort(tracer: InsertionSortTracer, list: number[]) {
    let position = null;
    let pointer = null;
    tracer
        .assign('list', list)
        .assign('position', position)
        .assign('pointer', pointer)
        .break(3);

    position = 1;
    tracer.assign('position', position).break(5);

    while (position < list.length) {
        let x = list[position];
        tracer.assign('value', x);

        pointer = position - 1;
        tracer.assign('pointer', pointer).break(10);

        while (pointer >= 0 && list[pointer] > x) {
            list[pointer + 1] = list[pointer];
            pointer--;
            tracer
                .assign('list', list)
                .assign('pointer', pointer)
                .assign('position', pointer + 1)
                .break(14);
        }

        list[pointer + 1] = x;
        tracer.assign('list', list);

        position++;
        tracer
            .assign('position', position)
            .assign('value', list[position])
            .break(19);
    }

    tracer
        .assign('position', null)
        .assign('pointer', null)
        .break(22);

    return list;
}

export default insertionSort;
