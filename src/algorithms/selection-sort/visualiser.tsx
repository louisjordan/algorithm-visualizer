import React from 'react';
import { SelectionSortTracer } from './types';
import ArrayRenderer from '../../renderers/array';

type Props = {
    tracer: SelectionSortTracer;
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
            highlight={state.smallest}
        />
    );
};

export default InsertionSortVisualiser;
