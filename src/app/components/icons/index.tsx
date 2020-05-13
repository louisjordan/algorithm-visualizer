import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Close } from './media/close.svg';
import { ReactComponent as Menu } from './media/menu.svg';
import { ReactComponent as Next } from './media/next.svg';
import { ReactComponent as Pause } from './media/pause.svg';
import { ReactComponent as Play } from './media/play.svg';
import { ReactComponent as Previous } from './media/previous.svg';
import { ReactComponent as SkipBackward } from './media/skip-backward.svg';
import { ReactComponent as SkipForward } from './media/skip-forward.svg';
import { ReactComponent as LogoFull } from './logo/logo-full.svg';
import { ReactComponent as LogoDark } from './logo/logo-dark.svg';
import { ReactComponent as LogoLight } from './logo/logo-light.svg';
import {ReactComponent as GitHub } from './social/github.svg'

type IconProps = {
    clickable?: boolean;
};
const Icon = (
    icon: React.ComponentType<any>,
    style: string = ''
): React.FC<IconProps> => (props) => {
    const IconComponent = styled(icon)`
        cursor: ${props.clickable ? 'pointer' : 'default'};
        ${style}
    `;

    return <IconComponent {...props} />;
};

const MediaIcon = (icon: React.ComponentType<any>): React.FC<IconProps> => (
    props
) => {
    const style = `
        fill: #c5c8c6;
        width: 2em;
        height: 2em;
        transition: 266ms ease-in-out;

        &:hover {
            ${props.clickable ? 'fill: #d5d7d6' : ''};
        }
    `;

    return Icon(icon, style)(props);
};

const LogoIcon = (icon: React.ComponentType<any>): React.FC<IconProps> => (
    props
) => {
    const style = `width: 100%; height: 100%;`;

    return Icon(icon, style)(props);
};

export const MenuIcon = MediaIcon(Menu);
export const CloseIcon = MediaIcon(Close);
export const NextIcon = MediaIcon(Next);
export const PauseIcon = MediaIcon(Pause);
export const PlayIcon = MediaIcon(Play);
export const PreviousIcon = MediaIcon(Previous);
export const SkipForwardIcon = MediaIcon(SkipForward);
export const SkipBackwardIcon = MediaIcon(SkipBackward);
export const LogoFullIcon = LogoIcon(LogoFull);
export const LogoDarkIcon = LogoIcon(LogoDark);
export const LogoLightIcon = LogoIcon(LogoLight);
export const GitHubIcon = Icon(GitHub)
