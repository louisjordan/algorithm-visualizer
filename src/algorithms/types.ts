import React from 'react';
import { Tracer } from '../tracer';

export enum Group {
    Array = 'Array',
    Graph = 'Graph',
}

export type AlgorithmDefinition<TracerState, Parameters, Output> = {
    key: string;
    name: string;
    group: Group;
    source: string;
    doc: string;
    run(tracer: Tracer<TracerState>, parameters: Parameters): Output;
    defaultParameters: () => Parameters;
    visualiser: React.FC<{
        tracer: Tracer<TracerState>;
        position: number;
    }>;
};
