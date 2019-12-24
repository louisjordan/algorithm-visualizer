import React from 'react';
import { StateTracer } from '../../tracer';
import './style.css';

type Props = {
    tracer: StateTracer;
    position: number;
    prev: () => void;
    next: () => void;
};
const Visualiser: React.FC<Props> = props => {
    return (
        <div className="Controls">
            <button onClick={props.prev}>Prev</button>
            <button onClick={props.next}>Next</button>
            {props.position + 1}/{props.tracer.history.length}
        </div>
    );
};

export default Visualiser;
