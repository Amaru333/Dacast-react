import styled from 'styled-components';

export const TableContainer = styled.div`
    width: 50%;
`

export const ChaptersContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`

export const PlayerSection = styled.div`
    width: 50%;
`


export const PlayerContainer = styled.div`
    background-color: ${props => props.theme.colors['gray-7']};
    width: 100%;
    height: 341px;
    position: relative;
`

export const ButtonsArea = styled.div`

`

export const IconContainer = styled.div`
    float:right;
    display:none;
    .material-icons{
        margin-right:16px;
        color:  ${props => props.theme.colors["gray-1"]};
    }
`