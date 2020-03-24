import { AlgorithmDefinition } from './types';
import insertionSort from './insertion-sort';
import selectionSort from './selection-sort';
import graphDFS from './graph-depth-first-search';

const algorithms = {
    [insertionSort.key]: insertionSort,
    [selectionSort.key]: selectionSort,
    [graphDFS.key]: graphDFS,
};

export default algorithms;

export const groups = Object.keys(algorithms).reduce(
    (groups: { [key: string]: AlgorithmDefinition<any, any, any>[] }, key) => {
        const { group } = algorithms[key];
        groups[group] = groups[group] || [];
        groups[group].push(algorithms[key]);
        return groups;
    },
    {}
);
