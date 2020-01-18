import styled from 'styled-components';
import { Button } from 'app/components';

export const ControlsContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    padding: 1em;
`;

export const ControlsGroup = styled.div`
    display: flex;
    flex-flow: row nowrap;
`;

export const ControlSlider = styled.input`
    flex: 1 0 auto;
    margin: 0 0.5em 0 0;
`;

export const ControlPosition = styled.div`
    min-width: 3em;
    text-align: right;
`;

export const ControlButton = styled(Button)`
    margin: 0.5em 0.5em 0 0;

    &:last-of-type {
        margin-right: 0;
    }
`;
