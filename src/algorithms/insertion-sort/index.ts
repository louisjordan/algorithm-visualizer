import { Tracer, StateTracer } from "../../tracer";
/**
 * 
 * @param list 
 * 
 * i ← 1
    while i < length(A)
        x ← A[i]
        j ← i - 1
        while j >= 0 and A[j] > x
            A[j+1] ← A[j]
            j ← j - 1
        end while
        A[j+1] ← x
        i ← i + 1
    end while
 */

export type InsertionSortState = {
  list: number[];
  position: number | null; // index being moved
  pointer: number | null; // index being compared
};

const tracer = new StateTracer();

function insertionSort(tracer: Tracer, list: number[]) {
  let position = null;
  let pointer = null;

  tracer
    .set("list", list)
    .set("position", position)
    .set("pointer", pointer)
    .update();

  position = 1;

  tracer.update("position", position);

  while (position < list.length) {
    let x = list[position];

    pointer = position - 1;
    tracer.update("pointer", pointer);

    while (pointer >= 0 && list[pointer] > x) {
      list[pointer + 1] = list[pointer];
      pointer--;
      tracer
        .set("list", list)
        .set("pointer", pointer)
        .update();
    }

    list[pointer + 1] = x;
    tracer.update("list", list);

    position++;
    tracer.update("position", position);
  }

  return list;
}

export default insertionSort;
