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

    const elements = state.list.map((item, index) => {
        if (state.position === index) {
            return null;
        }

        return item;
    });

    return (
        <ArrayRenderer
            elements={elements}
            pointer={state.pointer}
            position={state.position}
        />
    );
};

export default InsertionSortVisualiser;
