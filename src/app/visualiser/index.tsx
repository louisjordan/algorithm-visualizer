import React from 'react';
import { RouteComponentProps } from '@reach/router';
import VisualiserDisplay from './display';
import Debugger from './debugger';
import Controls from './controls';
import { VisualiserContextProvider } from './state';

import './style.css';

type Props = {
    algorithm?: string;
} & RouteComponentProps;
const VisualiserLayout: React.FC<Props> = (props) => {
    if (!props.algorithm) {
        return null;
    }
    return (
        <VisualiserContextProvider algorithm={props.algorithm}>
            <div className="VisualiserLayout">
                <div className="VisualiserLayout__visualiser VisualiserLayout__half-column">
                    <VisualiserDisplay />
                    <div className="VisualiserLayout__controls">
                        <Controls />
                    </div>
                </div>
                <div className="VisualiserLayout__side-panel VisualiserLayout__half-column">
                    <div className="VisualiserLayout__code">
                        <Debugger />
                    </div>
                    <div className="VisualiserLayout__documentation">Docs</div>
                </div>
            </div>
        </VisualiserContextProvider>
    );
};

export default VisualiserLayout;
