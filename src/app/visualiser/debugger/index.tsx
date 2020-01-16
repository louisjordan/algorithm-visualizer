import React, { useRef, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { useVisualiserState } from '../state';
import {
    tomorrow,
    tomorrowNight,
} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './style.css';

const Debugger: React.FC = () => {
    const { algorithm, tracer, position } = useVisualiserState();
    const trace = tracer.at(position);
    const containerRef = useRef<HTMLElement | null>(null);
    const lineRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const line = lineRef.current;
        if (container && line) {
            const height = container.clientHeight; // height of visible code
            const viewTop = container.scrollTop; // visible upper bound
            const viewBottom = viewTop + height; // visible lower bound
            const linePosition = line.offsetTop; // line position from parent

            if (linePosition < viewTop) {
                container.scrollTo({ top: linePosition - 20 });
            } else if (linePosition > viewBottom) {
                container.scrollTo({ top: linePosition + 20 });
            }
        }
    }, [trace.line]);

    return (
        <div className="Debugger">
            <SyntaxHighlighter
                language="typescript"
                PreTag={(props: any) => (
                    <pre
                        className="Debugger__code"
                        ref={containerRef}
                        {...props}
                    />
                )}
                style={tomorrowNight} // tomorrow
                customStyle={{ background: 'none', margin: 0 }}
                showLineNumbers
                startingLineNumber={1}
                wrapLines
                lineNumberContainerProps={{
                    className: 'Debugger__lineContainer',
                }}
                lineNumberProps={{ style: { opacity: 0.3 } }}
                lineProps={(line: number) => ({
                    className: `Debugger__line ${
                        trace.line === line ? 'Debugger__line--highlight' : ''
                    }`,
                    ref: trace.line === line ? lineRef : null,
                })}
            >
                {algorithm.source}
            </SyntaxHighlighter>
        </div>
    );
};

export default Debugger;
