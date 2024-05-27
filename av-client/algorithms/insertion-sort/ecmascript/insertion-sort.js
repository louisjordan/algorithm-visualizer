function insertionSort(list) {
    let position = 1;
    let pointer = null;

    while (position < list.length) {
        let x = list[position];
        pointer = position - 1;

        while (pointer >= 0 && list[pointer] > x) {
            list[pointer + 1] = list[pointer];
            pointer--;
        }

        list[pointer + 1] = x;
        position++;
    }

    return list;
}

insertionSort([4, 3, 2, 1]);
