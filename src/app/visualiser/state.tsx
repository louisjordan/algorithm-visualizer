import React, { createContext, useState, useContext, useEffect } from 'react';
import { Tracer } from '../../tracer';
import algorithms from 'algorithms';
import { AlgorithmDefinition } from 'algorithms/types';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
type TracerState = {
    algorithm: AlgorithmDefinition<any, any, any>;
    setAlgorithm: SetState<AlgorithmDefinition<any, any, any>>;
    tracer: Tracer<any>;
    setTracer: SetState<Tracer<any>>;
    position: number;
    setPosition: SetState<number>;
};

function newVisualiser(key: string) {
    const algorithm = algorithms[key];
    const tracer = new Tracer<any>(); // TODO: remove any type
    algorithm.run(tracer, algorithm.defaultParameters());
    return { algorithm, tracer };
}

const initial = newVisualiser('insertion-sort');

const VisualiserContext = createContext<TracerState>({
    algorithm: initial.algorithm,
    setAlgorithm: () => {},
    tracer: initial.tracer,
    setTracer: () => {},
    position: 0,
    setPosition: () => {},
});

export const VisualiserContextProvider: React.FC<{ algorithm: string }> = (
    props
) => {
    const [algorithm, setAlgorithm] = useState(initial.algorithm);
    const [tracer, setTracer] = useState(initial.tracer);
    const [position, setPosition] = useState(0);

    useEffect(() => {
        const { algorithm, tracer } = newVisualiser(props.algorithm);
        setAlgorithm(algorithm);
        setTracer(tracer);
        setPosition(0);
    }, [props.algorithm]);

    return (
        <VisualiserContext.Provider
            value={{
                algorithm,
                setAlgorithm,
                tracer,
                setTracer,
                position,
                setPosition,
            }}
        >
            {props.children}
        </VisualiserContext.Provider>
    );
};

export function useVisualiserState() {
    const state = useContext(VisualiserContext);
    const { tracer, setPosition } = state;

    function next() {
        setPosition((position) => {
            if (typeof position === 'number' && tracer.at(position + 1)) {
                return position + 1;
            } else {
                return position;
            }
        });
    }

    function prev() {
        setPosition((position) => {
            if (typeof position === 'number' && position > 0) {
                return position - 1;
            } else {
                return position;
            }
        });
    }

    return {
        next,
        prev,
        ...state,
    };
}
