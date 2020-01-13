import React from 'react';
import Markdown from 'react-markdown';
import { useVisualiserState } from '../state';
import './style.css';

const Docs: React.FC = () => {
    const { algorithm } = useVisualiserState();

    return (
        <div className="Docs">
            <Markdown source={algorithm.doc} />
        </div>
    );
};

export default Docs;
