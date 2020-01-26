import React, { useState } from 'react';
import { useVisualiserState, PlaybackSpeed } from '../state';
import {
    NextIcon,
    PreviousIcon,
    SkipBackwardIcon,
    SkipForwardIcon,
    PauseIcon,
    PlayIcon,
} from 'app/components';
import {
    ControlsContainer,
    ControlsGroup,
    ControlSlider,
    ControlButton,
    ControlPosition,
    ControlSpeed,
    ControlSpeedOption,
} from './style';

const Controls: React.FC = () => {
    const {
        skipToStart,
        skipToEnd,
        stepForward,
        stepBackward,
        skipTo,
        position,
        tracer,
        playing,
        play,
        pause,
        setSpeed,
        speed,
    } = useVisualiserState();

    return (
        <ControlsContainer>
            <ControlsGroup>
                <ControlSlider
                    type="range"
                    value={position}
                    min="0"
                    max={tracer.history.length - 1}
                    step="1"
                    onChange={(e) => skipTo(Number(e.currentTarget.value))}
                />
                <ControlPosition>
                    {position + 1}/{tracer.history.length}
                </ControlPosition>
            </ControlsGroup>
            <ControlsGroup>
                <ControlButton icon={SkipBackwardIcon} onClick={skipToStart} />
                <ControlButton icon={PreviousIcon} onClick={stepBackward} />
                <ControlButton
                    icon={playing ? PauseIcon : PlayIcon}
                    onClick={playing ? pause : play}
                />
                <ControlButton icon={NextIcon} onClick={stepForward} />
                <ControlButton icon={SkipForwardIcon} onClick={skipToEnd} />
                <ControlSpeed>
                    <ControlSpeedOption
                        active={speed === PlaybackSpeed.FAST}
                        onClick={() => setSpeed(PlaybackSpeed.FAST)}
                    >
                        2x
                    </ControlSpeedOption>
                    <ControlSpeedOption
                        active={speed === PlaybackSpeed.NORMAL}
                        onClick={() => setSpeed(PlaybackSpeed.NORMAL)}
                    >
                        1x
                    </ControlSpeedOption>
                    <ControlSpeedOption
                        active={speed === PlaybackSpeed.SLOW}
                        onClick={() => setSpeed(PlaybackSpeed.SLOW)}
                    >
                        0.5x
                    </ControlSpeedOption>
                </ControlSpeed>
            </ControlsGroup>
        </ControlsContainer>
    );
};

export default Controls;
