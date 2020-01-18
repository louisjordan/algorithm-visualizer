import React from 'react';
import styled, { StyledComponentProps } from 'styled-components';

export const DefaultButton = styled.button`
    font-size: 1em;
    text-transform: uppercase;
    letter-spacing: 0.066em;
    border: 0;
    margin: 0;
    padding: 1em 2em;
    cursor: pointer;

    transition: background-color 233ms ease-in-out, outline 70ms ease-in-out;
    color: #bfbfbf;
    background-color: #333;

    &:hover {
        background: #2f2f2f;
    }

    &:active {
        background: #222;
    }

    &:focus {
        outline: 0.125em solid #9c9c9c;
    }
`;

export const IconButton = styled(DefaultButton)`
    padding: 0.5em 0.5em 0.35em 0.5em;
`;

type Props = {
    icon?: React.FC<any>;
} & StyledComponentProps<'button', any, any, any>;
export const Button: React.FC<any> = (props) => {
    const { icon: Icon } = props;

    if (Icon) {
        return (
            <IconButton {...props}>
                <Icon clickable />
            </IconButton>
        );
    }

    return <DefaultButton {...props} />;
};
