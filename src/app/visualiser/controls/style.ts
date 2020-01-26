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
`;

export const ControlSpeed = styled.ol`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    list-style: none;
    margin: 0.5em 0 0 0;
    padding: 0;
    font-size: 0.8em;
`;

type ControlSpeedOptionProps = {
    active: boolean;
};
export const ControlSpeedOption = styled.li`
    opacity: ${(props: ControlSpeedOptionProps) =>
        props.active ? '1' : '0.6'};
    cursor: pointer;
    transition: 266ms ease-in-out;
    &:hover {
        opacity: ${(props: ControlSpeedOptionProps) =>
            props.active ? '1' : '0.8'};
    }
`;
