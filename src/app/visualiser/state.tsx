import React, { createContext, useState, useContext, useEffect } from 'react';
import { Tracer } from '../../tracer';
import algorithms from 'algorithms';
import { AlgorithmDefinition } from 'algorithms/types';
import { useInterval } from 'app/hooks';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
type TracerState = {
    algorithm: AlgorithmDefinition<any, any, any>;
    setAlgorithm: SetState<AlgorithmDefinition<any, any, any>>;
    tracer: Tracer<any>;
    setTracer: SetState<Tracer<any>>;
    position: number;
    setPosition: SetState<number>;
    stepForward: () => void;
    stepBackward: () => void;
    skipToStart: () => void;
    skipToEnd: () => void;
    playing: boolean;
    play: () => void;
    pause: () => void;
    setSpeed: (speed: PlaybackSpeed) => void;
    speed: PlaybackSpeed;
};
export enum PlaybackSpeed {
    SLOW = 2000,
    NORMAL = 1000,
    FAST = 500,
}

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
    stepForward: () => {},
    stepBackward: () => {},
    skipToStart: () => {},
    skipToEnd: () => {},
    playing: false,
    play: () => {},
    pause: () => {},
    setSpeed: () => {},
    speed: PlaybackSpeed.NORMAL,
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

    const skipToStart = () => setPosition(0);
    const skipToEnd = () => setPosition(tracer.history.length - 1);
    const stepForward = () =>
        setPosition((position) => {
            if (tracer.at(position + 1)) {
                if (!tracer.at(position + 2)) {
                    pause();
                }
                return position + 1;
            }

            return position;
        });
    const stepBackward = () =>
        setPosition((position) => (position > 0 ? position - 1 : position));

    const [speed, setSpeed] = useState(PlaybackSpeed.NORMAL);
    const [delay, setDelay] = useState<number | null>(null);

    useInterval(stepForward, delay);

    const play = () => setDelay(speed);
    const pause = () => setDelay(null);

    return (
        <VisualiserContext.Provider
            value={{
                algorithm,
                setAlgorithm,
                tracer,
                setTracer,
                position,
                setPosition,
                stepForward,
                stepBackward,
                skipToStart,
                skipToEnd,
                playing: delay !== null,
                play,
                pause,
                setSpeed,
                speed,
            }}
        >
            {props.children}
        </VisualiserContext.Provider>
    );
};

export function useVisualiserState() {
    const state = useContext(VisualiserContext);
    const { tracer, setPosition } = state;

    return {
        skipTo: setPosition,
        ...state,
    };
}
