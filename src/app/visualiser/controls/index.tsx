import React from 'react';
import { useVisualiserState } from '../state';
import { Button } from 'app/components';
import { ControlsContainer } from './style';

const Controls: React.FC = () => {
    const { next, prev, position, tracer } = useVisualiserState();

    return (
        <ControlsContainer>
            <Button onClick={prev}>Prev</Button>
            <Button onClick={next}>Next</Button>
            {position + 1}/{tracer.history.length}
        </ControlsContainer>
    );
};

export default Controls;
