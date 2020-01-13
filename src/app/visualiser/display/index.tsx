import React from 'react';
import { useVisualiserState } from '../state';
import './style.css';

const VisualiserDisplay: React.FC = () => {
    const { algorithm, tracer, position } = useVisualiserState();

    return (
        <div className="VisualiserDisplay">
            <algorithm.visualiser tracer={tracer} position={position} />
        </div>
    );
};

export default VisualiserDisplay;
