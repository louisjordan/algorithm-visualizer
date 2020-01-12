import React, { createContext, useState, useContext, useEffect } from 'react';
import { Tracer } from '../../tracer';
import algorithms from '../../algorithms';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
type TracerState = {
    key: string;
    setKey: SetState<string>;
    tracer: Tracer<any>;
    setTracer: SetState<Tracer<any>>;
    position: number | null;
    setPosition: SetState<number | null>;
};
const VisualiserContext = createContext<TracerState>({
    key: 'insertion-sort',
    setKey: () => {},
    tracer: new Tracer(),
    setTracer: () => {},
    position: null,
    setPosition: () => {},
});

function newVisualiser(key: string) {
    const algorithm = algorithms[key];
    const tracer = new Tracer<any>(); // TODO: remove any type
    algorithm.run(tracer, algorithm.defaultParameters);
    return { algorithm, tracer };
}

const initial = newVisualiser('insertion-sort');

export const VisualiserContextProvider: React.FC<{ algorithm: string }> = (
    props
) => {
    const [key, setKey] = useState(initial.algorithm.key);
    const [tracer, setTracer] = useState(initial.tracer);
    const [position, setPosition] = useState<number | null>(null);

    useEffect(() => {
        const { algorithm, tracer } = newVisualiser(props.algorithm);
        algorithm.run(tracer, algorithm.defaultParameters);

        setKey(props.algorithm);
        setTracer(tracer);
        setPosition(0);
    }, [props.algorithm]);

    return (
        <VisualiserContext.Provider
            value={{
                key,
                setKey,
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
