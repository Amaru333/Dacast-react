import styled, { css } from 'styled-components';

export const FoldersTreeSection = styled.div`
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
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

export const ModalItemFolderRow = styled.div<{selected: boolean}>`
    border-bottom: 1px solid ${props => props.theme.colors['gray-7']};
    ${props => props.selected && css`
        background-color: ${props.theme.colors['violet10']};
    `}
`

export const SeparatorHeader = styled.div<{}>`
    width:1px;
    height: 33px;
    background-color: ${props => props.theme.colors["gray-7"]} ;
`

export const MoveFoldersContainer = styled.div`
    height: 235px;
    overflow-y: auto;
    border: 1px solid ${props => props.theme.colors['gray-7']};
`