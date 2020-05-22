import styled, { css } from 'styled-components';
import { Card } from '../../../components/Card/Card';

export const ThemingContainer = styled.div`
    width: 100%;
`

export const Heading = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`

export const TitleSection = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`

export const PlayerSection = styled.div`
`


export const PlayerContainer = styled.div`
    background-color: ${props => props.theme.colors['gray-7']};
    height: 341px;
    position: relative;
`

export const BorderStyle = styled.div<{}>`
    border-bottom: 1px solid ${props => props.theme.colors['gray-7']};
    display: flex;
`

export const TextStyle = styled.span<{}>`
    display: block;
`

export const DisabledSection = styled.div<{enabled: boolean}>`
pointer-events: none;
opacity: 0.5;
    ${props => props.enabled && css`
        pointer-events: auto;
        opacity: 1;
    `}
`
export const ControlsCard = styled(Card)`
    height: 765px;
    overflow-y: scroll;
`

export const ControlToggleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
`

export const RadioButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
