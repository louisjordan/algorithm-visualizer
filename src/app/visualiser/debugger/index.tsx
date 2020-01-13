import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { useVisualiserState } from '../state';
import './style.css';

const Debugger: React.FC = () => {
    const { algorithm, tracer, position } = useVisualiserState();

    const trace = tracer.at(position);

    return (
        <div className="Debugger">
            <SyntaxHighlighter
                className="Debugger__code"
                customStyle={{ background: 'none', margin: 0 }}
                language="typescript"
                showLineNumbers
                startingLineNumber={1}
                wrapLines
                lineProps={(line: number) => ({
                    className:
                        trace.line === line ? 'Debugger__line--highlight' : '',
                })}
            >
                {algorithm.source}
            </SyntaxHighlighter>
        </div>
    );
};

export default Debugger;
