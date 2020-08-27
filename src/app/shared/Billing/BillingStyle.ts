import styled, {css} from 'styled-components';

export const RadioButtonContainer = styled.div<{isSelected: boolean}>`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 12px 16px;
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

export const RecurlyElementStyle = styled.div`
    & .recurly-element {
    margin-top: 4px;
    border: 1px solid ${props => props.theme.colors["gray-7"]} ;
    border-radius: 0px;
    background: ${props => props.theme.colors["gray-10"]};
    box-sizing: border-box;
    padding: 8px 12px;
    flex-grow: 1;
    height:40px;
    color: ${props => props.theme.colors["gray-1"]};

    &.recurly-element-focus {
        border: 1px solid ${props => props.theme.colors["violet"]} ;
    }
    
    }   
`