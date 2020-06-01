import * as React from 'react';
import { IconStyle } from '../../shared/Common/Icon';
import styled, { css } from 'styled-components';
import { Text } from '../Typography/Text'

interface BubbleSpecificProps {
    type: 'warning' | 'info' | 'error' | 'success';
}

type BubbleProps = BubbleSpecificProps & React.HTMLAttributes<HTMLDivElement>

export const Bubble = (props: BubbleProps) => {
    if(props.hidden) {
        return <></>
    }
    const renderIcon = () => {
        switch(props.type) {
            case 'info': 
                return 'info_outlined'
            case 'warning':
                return 'warning_outlined'
            case 'error': 
                return 'warning_outined'
            case 'success': 
                return 'check_outlined'
            default:
                return 'info_outlined'
        }
    }
    return (
        <BubbleContainer {...props} >
            <IconStyle>{renderIcon()}</IconStyle>
            <TextStyle>
                <Text color='gray-1' size={16} weight='reg' >
                    {props.children}
                </Text>
            </TextStyle>
        </BubbleContainer>
    )
}

const BubbleContainer = styled.div<BubbleProps>`
    display: flex;
    flex-direction: row;
    padding: 16px;
    background-color: ${props => props.theme.colors['violet10']};
    border: 1px solid ${props => props.theme.colors['violet']};
    border-radius: 4px;
    ${props => props.type == 'warning' && css`
        background-color: ${props.theme.colors['yellow10']};
        border: 1px solid ${props.theme.colors['yellow']};
    `}
    ${props => props.type == 'error' && css`
        background-color: ${props.theme.colors['red10']};
        border: 1px solid ${props.theme.colors['red']};
    `}
    ${props => props.type == 'success' && css`
        background-color: ${props.theme.colors['green10']};
        border: 1px solid ${props.theme.colors['green']};
    `}
`

const TextStyle = styled.div`
    padding-left: 18px;
`