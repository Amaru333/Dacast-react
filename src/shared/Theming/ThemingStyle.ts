import styled from 'styled-components';

export const ThemingContainer = styled.div`
    display: flex;
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

export const IconContainer = styled.div`
    float:right;
    .material-icons{
        margin-right:16px;
        color:  ${props => props.theme.colors["gray-1"]};
    }
`
export const FixedButtonContainer = styled.div`
    position: fixed;
    bottom: 1%;
    background-color: white;
    width: 100%;
    border: 1px solid ${props => props.theme.colors['gray-7']};
    box-shadow: 0px -2px 4px ${props => props.theme.colors.overlay20 };
    padding: 16px;

`