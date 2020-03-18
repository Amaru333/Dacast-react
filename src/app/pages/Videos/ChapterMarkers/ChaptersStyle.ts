import styled, {css} from 'styled-components';

export const TableContainer = styled.div`
`

export const ChaptersContainer = styled.div<{mobile: boolean}>`
    display: flex;
    flex-direction: row;
    ${props => props.mobile && css`
        flex-direction: column;
    `}
`

export const PlayerSection = styled.div`
`


export const PlayerContainer = styled.div`
    background-color: ${props => props.theme.colors['gray-7']};
    height: 341px;
    position: relative;
`

export const ButtonsArea = styled.div`

`