import insertionSort from './insertion-sort';
import selectionSort from './selection-sort';

export default {
    [insertionSort.key]: insertionSort,
    [selectionSort.key]: selectionSort,
};
