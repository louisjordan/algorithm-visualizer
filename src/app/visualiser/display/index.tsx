import React from 'react';
import algorithms from 'algorithms';
import { useVisualiserState } from '../state';
import './style.css';

const VisualiserDisplay: React.FC = () => {
    const { key, tracer, position } = useVisualiserState();

    if (position === null) {
        return null;
    }

    const AlgorithmVisualiser = algorithms[key].visualiser;

    return (
        <div className="VisualiserDisplay">
            <AlgorithmVisualiser tracer={tracer} position={position} />
        </div>
    );
};

export default VisualiserDisplay;
