import styled, { css } from 'styled-components';
import { Icon } from '@material-ui/core';
import { ColorsApp } from '../../styled/types';

export const FoldersTreeSection = styled.div`
    display: flex;
    flex-direction: column;
`
export const FolderRow = styled.div<{isSelected: boolean}>`
    ${props => props.isSelected && css`
        background-color: ${props.theme.colors['violet10']};
        color: ${props.theme.colors['dark-violet']};
    `}
    cursor: pointer;
`

export const ContentSection = styled.div`
    display: flex;
    width: 100%;
`

export const IconStyle = styled(Icon)<{coloricon: ColorsApp}>`
    color: ${props => props.theme.colors[props.coloricon]};
`

export const ModalItemFolderRow = styled.div<{selected: boolean}>`
    border: 1px solid ${props => props.theme.colors['gray-7']};
    ${props => props.selected && css`
        background-color: ${props.theme.colors['violet10']};
    `}
`

export const SeparatorHeader = styled.div<{}>`
    width:1px;
    height: 33px;
    background-color: ${props => props.theme.colors["gray-7"]} ;
`