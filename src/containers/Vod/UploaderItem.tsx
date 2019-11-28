import * as React from 'react';
import styled, { css } from 'styled-components';
import { Text } from '../../components/Typography/Text';
import { readableBytes, updateClipboard } from '../../utils/utils';
import { Icon } from '@material-ui/core';
import { Tooltip } from '../../components/Tooltip/Tooltip';

export type UploaderItemStates = 'completed' | 'queue' | 'progress' | 'paused' | 'failed' | 'veryfing';

export interface UploaderItemProps {
    currentState: UploaderItemStates;
    progress: number;
    timeRemaining: number;
    size: number;
    name: string;
    idItem?: number;
    embedCode?: string;
}

export const UploaderItem = (props: UploaderItemProps) => {

    React.useEffect(() => {
    }, [])

    const renderEndItem = () => {
        switch (props.currentState) {
            case 'completed':
                return (
                    <>
                        <Text className="mr2" weight="reg" size={14} color="dark-violet">
                            <a href={"javascript:;"} onClick={(e) => updateClipboard(props.idItem.toString())}>Copy ID</a>
                            <a> | </a>
                            <a href={"javascript:;"} onClick={(e) => updateClipboard(props.embedCode)}>Copy Embed Code</a>
                        </Text>
                        <Text className="mr2" weight="med" size={14} color="gray-1">
                            Completed
                        </Text>
                    </>
                );
            case 'failed':
                return (
                    <Text className="mr2" weight="med" size={14} color="gray-1">
                        Failed
                    </Text>
                );
            case 'paused':
                return (
                    <Text className="mr2" weight="med" size={14} color="gray-1">
                        Paused
                    </Text>
                );
            case 'progress':
                return (
                    <>
                        <Text className="mr2 nowrap" size={14} weight="reg" color="gray-3" >{props.timeRemaining} minutes remaining</Text>
                        <Text className="mr2" weight="med" size={14} color="gray-1">
                            {props.progress}%
                        </Text>
                    </>
                );
            case 'queue':
                return;
            case 'veryfing':
                return (
                    <Text className="mr2" weight="med" size={14} color="gray-1">
                        Veryfing
                    </Text>
                );;
        }
    }

    const handleTooltipCloseText = () => {
        switch (props.currentState) {
            case 'completed' :
            case 'failed' :
                return 'Clear';
            default:
                return 'Cancel upload';
        }
    }

    return (
        <>
            <UploaderItemStyle {...props} >
                <ProgressItem progress={props.progress} currentState={props.currentState} />
                <UploaderItemLabel> <Text size={14} weight='reg' color='gray-1' >{props.name}</Text> </UploaderItemLabel>
                <Text className="relative ml1 nowrap" size={14} weight="reg" color="gray-3" >{readableBytes(props.size)}</Text>
                <ProgressItemEndInfos>
                    {renderEndItem()}
                    <CloseIcon id={"closeIcon" + props.idItem}>close</CloseIcon>
                    <Tooltip target={"closeIcon" + props.idItem} >{handleTooltipCloseText()}</Tooltip>
                </ProgressItemEndInfos>
            </UploaderItemStyle>
        </>
    );

}

export const ProgressItemEndInfos = styled.div<{}>`
    position: relative;
    display: flex;
    align-items:center;
    justify-content: flex-end;
    flex-grow: 1;
`

export const UploaderItemLabel = styled.div<{}>`
    border: 1px solid ${props => props.theme.colors["gray-7"]};
    width: 40%;
    height: auto;
    background-color: ${props => props.theme.colors["gray-10"]};
    padding: 8px 12px;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const ProgressItem = styled.div<{ progress: number, currentState: UploaderItemStates }>`
    width: ${props => props.progress}%;
    ${props => props.currentState === "completed" && css`
        background-color: ${props => props.theme.colors["green10"]};
        border-bottom: 4px solid ${props => props.theme.colors["green"]};
    `}
    ${props => props.currentState === "queue" && css`
        /** Mmmh nto sure this one is very useful */
        background-color: ${props => props.theme.colors["yellow10"]};
        border-bottom: 4px solid ${props => props.theme.colors["yellow"]};
    `}
    ${props => props.currentState === "progress" && css`
        background-color: ${props => props.theme.colors["violet10"]};
        border-bottom: 4px solid ${props => props.theme.colors["violet"]};
    `}
    ${props => props.currentState === "paused" && css`
        background-color: ${props => props.theme.colors["yellow10"]};
        border-bottom: 4px solid ${props => props.theme.colors["yellow"]};
    `}
    ${props => props.currentState === "veryfing" && css`
        background-color: ${props => props.theme.colors["violet10"]};
        border-bottom: 4px solid ${props => props.theme.colors["violet"]};
    `}
    ${props => props.currentState === "failed" && css`
        background-color: ${props => props.theme.colors["red10"]};
        border-bottom: 4px solid ${props => props.theme.colors["red"]};
    `}
    position: absolute;
    top: 0;
    left:0;
    bottom: 0;
`

export const UploaderItemStyle = styled.div<UploaderItemProps>`
    width: 100%;
    padding:16px;
    position: relative;
    display: flex;
    align-items:center;
    box-sizing: border-box;
    margin-top:16px;
    border: 1px solid ${props => props.theme.colors["gray-7"]};
    flex-wrap: wrap;
    min-width: 260px;
`

export const CloseIcon = styled(Icon)`
    color: ${props => props.theme.colors["gray-3"]};
    cursor: pointer;
`