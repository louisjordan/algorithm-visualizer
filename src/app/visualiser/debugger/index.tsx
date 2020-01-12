import React from 'react';
import algorithms from 'algorithms';
import { useVisualiserState } from '../state';
import './style.css';

const Debugger: React.FC = () => {
    const { key } = useVisualiserState();

    if (!key) {
        return null;
    }

    const algorithm = algorithms[key];

    return (
        <div className="Debugger">
            <code>
                <pre>{algorithm.source}</pre>
            </code>
        </div>
    );
};

export default Debugger;
