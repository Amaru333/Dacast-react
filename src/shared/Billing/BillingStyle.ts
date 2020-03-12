import styled, {css} from 'styled-components';

export const TextStyle = styled.div`

`

export const RadioButtonContainer = styled.div<{isSelected: boolean}>`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 24px;
    ${props => props.isSelected && css`
        background-color: ${props => props.theme.colors['violet10']};   
    `}
    border: 1px solid ${props => props.theme.colors['gray-7']};
`

export const RadioButtonOption = styled.div<{isOpen: boolean}>`
    display: none;

    ${props => props.isOpen && css`
        display: flex;
        flex-direction: column;
        border: 1px solid ${props.theme.colors['gray-7']};
        position: relative;
        border-top: none;
    `}


`