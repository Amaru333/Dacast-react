import styled, {css} from 'styled-components';

export const CardStyle = styled.div<{isMobile: boolean}>`
    box-sizing: border-box;
    padding: 24px;
    ${props => props.isMobile && css`
        padding: 16px !important;
    `};
    border: 1px solid ${props => props.theme.colors["gray-7"]};
    background-color: ${props => props.theme.colors["white"]};
    display: flex;
    flex-direction: column;
`