import styled, { css } from 'styled-components';

export const ColorPickerHeader = styled.div`
    background-color: ${props => props.theme.colors['gray-10']};
    border: 1px solid ${props => props.theme.colors['gray-7']};
    display: flex;
    padding: 8px;
    width: 170px;
    &:hover {
        cursor: pointer;
    }
`

export const SelectedColor = styled.div<{selectedColor: string}>`
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background-color: ${props => props.selectedColor};
`

export const ColorPickerBlock = styled.div<{opened: boolean}>`
    ${props => !props.opened && css`
        display: none;
    `}
`