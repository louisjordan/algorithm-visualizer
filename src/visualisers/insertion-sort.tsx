import React from 'react';
import { InsertionSortState } from '../algorithms/insertion-sort';
import ArrayRenderer from '../renderers/array';

type Props = {
    trace: InsertionSortState;
};
const InsertionSortVisualiser: React.FC<Props> = props => {
    const { trace } = props;
    const elements = trace.list.map((item, index) => {
        if (trace.position === index) {
            return null;
        }

        return item;
    });

    return <ArrayRenderer elements={trace.list} pointer={trace.pointer} position={trace.position} />;
};

export default InsertionSortVisualiser;
