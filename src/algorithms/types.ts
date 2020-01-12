import React from 'react';
import { Tracer } from '../tracer';

export type AlgorithmDefinition<TracerState, Parameters, Output> = {
    key: string;
    source: string;
    run(tracer: Tracer<TracerState>, parameters: Parameters): Output;
    defaultParameters: Parameters;
    visualiser: React.FC<{
        tracer: Tracer<TracerState>;
        position: number;
    }>;
};
