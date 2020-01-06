import styled, {css} from 'styled-components';

export const ThemingContainer = styled.div`
    display: flex;
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

export const IconContainer = styled.div`
    float:right;
    display:none;
    .material-icons{
        margin-right:16px;
        color:  ${props => props.theme.colors["gray-1"]};
    }
`
