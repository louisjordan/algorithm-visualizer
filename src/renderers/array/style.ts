import styled from 'styled-components';

export const Array = styled.ol`
    background: #333;
    display: inline-flex;
    padding: 0.5em;
`;

export const ArrayElement = styled.li`
    font-size: 1em;
    text-transform: uppercase;
    letter-spacing: 0.066em;
    width: 2em;
    height: 2em;
    background: #404040;
    color: #bfbfbf;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.5em;

    &:first-child {
        margin-left: 0;
    }
`;

export const ArrayPointer = styled.span`
    position: absolute;
    text-align: center;
    top: -2em;
    width: 100%;
`;
