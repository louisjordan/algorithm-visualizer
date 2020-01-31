import React from 'react';
import { InsertionSortTracer } from './types';
import ArrayRenderer from '../../renderers/array';

type Props = {
    tracer: InsertionSortTracer;
    position: number;
};
const InsertionSortVisualiser: React.FC<Props> = (props) => {
    const { tracer, position } = props;
    const trace = tracer.at(position);

    if (trace === null) {
        return null;
    }

    const { state } = trace;

    return (
        <ArrayRenderer
            elements={state.list}
            pointer={state.pointer}
            position={state.position}
            positionValue={state.value}
        />
    );
};

export default InsertionSortVisualiser;
