import React from 'react';
import { useVisualiserState } from '../state';
import './style.css';

const Visualiser: React.FC = () => {
    const { next, prev, position, tracer } = useVisualiserState();

    return (
        <div className="Controls">
            <button onClick={prev}>Prev</button>
            <button onClick={next}>Next</button>
            {position + 1}/{tracer.history.length}
        </div>
    );
};

export default Visualiser;
