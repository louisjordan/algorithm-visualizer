import React, { useState } from 'react';
import { StateTracer } from '../../../tracer';
import Visualiser from '../../visualiser';
import Debugger from '../../debugger';
import Controls from '../../controls';

import './style.css';

type Props = {
    source: string;
    tracer: StateTracer;
    position: number;
    next: () => void;
    prev: () => void;
};
const VisualiserLayout: React.FC<Props> = (props) => {
    return (
        <div className="VisualiserLayout">
            <div className="VisualiserLayout__visualiser VisualiserLayout__half-column">
                <Visualiser tracer={props.tracer} position={props.position} />
                <div className="VisualiserLayout__controls">
                    <Controls
                        tracer={props.tracer}
                        position={props.position}
                        next={props.next}
                        prev={props.prev}
                    />
                </div>
            </div>
            <div className="VisualiserLayout__side-panel VisualiserLayout__half-column">
                <div className="VisualiserLayout__code">
                    <Debugger source={props.source} break={null} />
                </div>
                <div className="VisualiserLayout__documentation">Docs</div>
            </div>
        </div>
    );
};

export default VisualiserLayout;
