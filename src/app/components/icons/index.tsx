import React from 'react';
import { ReactComponent as Close } from './svg/close.svg';
import { ReactComponent as Menu } from './svg/menu.svg';
import { ReactComponent as Next } from './svg/next.svg';
import { ReactComponent as Pause } from './svg/pause.svg';
import { ReactComponent as Play } from './svg/play.svg';
import { ReactComponent as Previous } from './svg/previous.svg';
import { ReactComponent as SkipBackward } from './svg/skip-backward.svg';
import { ReactComponent as SkipForward } from './svg/skip-forward.svg';
import styled from 'styled-components';

type IconProps = {
    clickable?: boolean;
};
const Icon = (icon: React.ComponentType<any>): React.FC<IconProps> => (
    props
) => {
    const Icon = styled(icon)`
        fill: #c5c8c6;
        width: 2em;
        height: 2em;
        cursor: ${props.clickable ? 'pointer' : 'default'};
        transition: 266ms ease-in-out;

        &:hover {
            ${props.clickable ? 'fill: #d5d7d6' : ''};
        }
    `;
    return <Icon {...props} />;
};

export const MenuIcon = Icon(Menu);
export const CloseIcon = Icon(Close);
export const NextIcon = Icon(Next);
export const PauseIcon = Icon(Pause);
export const PlayIcon = Icon(Play);
export const PreviousIcon = Icon(Previous);
export const SkipForwardIcon = Icon(SkipForward);
export const SkipBackwardIcon = Icon(SkipBackward);
