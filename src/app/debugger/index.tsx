import React from 'react';
import './style.css';

type Props = {
    source: string;
    break: number | null;
};
const Debugger: React.FC<Props> = (props) => {
    return (
        <div className="Debugger">
            <code>
                <pre>{props.source}</pre>
            </code>
        </div>
    );
};

export default Debugger;
