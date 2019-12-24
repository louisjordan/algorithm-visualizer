import React from 'react';
import { StateTracer } from '../../tracer';
import InsertionSort from '../../visualisers/insertion-sort';
import { InsertionSortState } from '../../algorithms/insertion-sort';
import './style.css';

type Props = {
    tracer: StateTracer;
    position: number;
};
const Visualiser: React.FC<Props> = props => {
    return (
        <div className="Visualiser">
            <InsertionSort trace={props.tracer.at(props.position).value as InsertionSortState} />
        </div>
    );
};

export default Visualiser;
