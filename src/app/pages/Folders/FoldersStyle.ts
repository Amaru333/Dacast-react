import styled, { css } from 'styled-components';

export const FoldersTreeSection = styled.div<{smallScreen: boolean; foldersTreeHidden: boolean}>`
    display: ${props => props.foldersTreeHidden && !props.smallScreen ? 'none' : 'flex' };
    flex-direction: column;
    overflow-x: hidden;
    ${props => props.smallScreen && css`
        z-index: 999;
        height: 100vh;
        overflow-x: auto;
        top: 75px;
        left:0;
        ${props.foldersTreeHidden && css `
            left: -100vw;
        `}
        width: 100%;
        background: ${props.theme.colors['gray-10']};
    `}

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

export const RowIconContainer = styled.div`
    width: 94px;
    height: 54px;
    text-align: center;
`