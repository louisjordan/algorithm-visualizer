import React from 'react';
import { InsertionSortTracer } from './types';
import ArrayRenderer from '../../renderers/array';

type Props = {
    tracer: InsertionSortTracer;
    position: number;
};
const InsertionSortVisualiser: React.FC<Props> = (props) => {
    const { tracer, position } = props;
    const { state } = tracer.at(position);

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
