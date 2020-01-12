import React from 'react';
import { SelectionSortTracer } from './types';
import ArrayRenderer from '../../renderers/array';

type Props = {
    tracer: SelectionSortTracer;
    position: number;
};
const InsertionSortVisualiser: React.FC<Props> = (props) => {
    const { tracer, position } = props;
    const { state } = tracer.at(position);

    // TODO: implement

    return null;
};

export default InsertionSortVisualiser;
