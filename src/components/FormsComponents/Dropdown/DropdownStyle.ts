import styled, { css } from 'styled-components';
import { Text } from "../../Typography/Text";

export const ContainerStyle = styled.div<{}>`
    display: block;
    height:auto;
    position: relative;
`;

export const DropdownLabel = styled.div`
    display: flex;
    margin: 4px 0;
    justify-content: space-between;
`;

export const TitleContainer = styled.div<{isWhiteBackground: boolean; isOpened: boolean; isNavigation: boolean | undefined; disabled: boolean}>`
    display: flex;
    flex-direction: row;
    position: relative;
    height: 38px;
    border: 1px solid ${props => props.theme.colors["gray-7"]};
    background-color: ${props => props.isWhiteBackground ? props.theme.colors["white"] : props.theme.colors["gray-10"] };
    pointer-events: ${props => props.disabled ? "none" : "auto"};
    ${props => props.isNavigation && css`
        background-color: ${props.theme.colors.white};
    `}
    &:hover {
        cursor: pointer;
    }
    &:focus {
        border: 1px solid ${props => props.theme.colors["violet"]};
    }
    ${props => props.isOpened && css`
        border: 1px solid ${props.theme.colors["violet"]};
    `}
`;

export const Title = styled.div`
    padding: 8px 44px 8px 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
    overflow: hidden;
`;

export const ArrowIconStyle = styled.div<{disabled: boolean}>`
    position: absolute;
    right: 19px;
    top: 17%;
    color: ${props => props.disabled ? props.theme.colors['gray-5'] : props.theme.colors['gray-1']};
`;

export const DropdownList = styled.ul<{direction: 'up' | 'down'; displayDropdown: boolean; isNavigation: boolean; isSingle: boolean; isInModal: boolean; hasSearch?: boolean}>`
    display: none;
    position: absolute;
    z-index: 999;
    right: 0;
    left: 0;
    ${props => props.isSingle && props.isInModal && css `
    /* right: .5rem;
    left: .5rem; */
    `}
    ${props => props.isSingle && props.hasSearch && css `
    /* right: .5rem;
    left: .5rem; */
    `}
    ${props => props.direction === 'down' && css `
        top: -240px;
    `}

    background-color: ${props => props.theme.colors.white};
    ${props => (props.displayDropdown) && css `
        display: block;
    `}
    margin-block-start: 0px;
    padding-inline-start: 0px;
    padding-inline-end: 0px;
    padding-block-end: 8px;
    max-height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
    border: 1px solid ${props => props.theme.colors["gray-7"]};
    box-shadow: 0px 1px 4px rgba(34, 47, 62, 0.1);
    box-sizing: border-box;
    ${props => props.isNavigation && css`
        top: 0;
        width: 100%;
    `}
`;

export const DropdownItem = styled.li<{isSelected: boolean; isSingle: boolean}>`
    display: block;
    position: relative;
    min-height: 24px;
    height: 100%;
    margin-left: 8px;
    margin-right: 8px;
    ${props => props.isSingle && css`
        padding: 8px;
    `}
    padding-left: 8px;
    &:hover {
        background-color: ${props => props.theme.colors["gray-10"]};
        cursor: pointer;
    }
    ${props => props.isSelected && css `
        background-color: ${props.theme.colors["violet10"]};
        color: ${props.theme.colors["dark-violet"]};
        transition: none;
    `}
`;

export const BorderItem = styled.div<{}>`
    border-bottom: 1px solid ${props => props.theme.colors["gray-7"]};
    width: 110%;
    margin-left: -5%;
`;

export const DropdownIconStyle = styled.div`
    position: absolute;
    right: 0%;
    top: 25%;
    padding-right: 8px;
    
`;

export const DropdownItemText = styled(Text)`
    position: absolute;
    display: contents;
    width: 80%;
    min-height: 100%;
    padding-top: 4px;
`

export const ContinentContainer = styled.div<{isDisplayed: boolean}>`
    display: flex;
    ${props => props.isDisplayed && css`
        display: none;
    `}
`

export const ButtonIconStyle = styled.div<{}>`
    color: ${props => props.theme.colors['gray-3']};
    width: 8px;
    margin-top: 4px;
    display: table;

`

export const CountryContainer = styled.div<{isDisplayed: boolean}>`
    ${props => props.isDisplayed && css`
        display: none;
    `}
`

export const SearchItem = styled.div`
    z-index: 999;
    position: sticky;
    top: 0;
    display: flex;
    background-color: ${props => props.theme.colors.white};
    border-bottom: 1px solid ${props => props.theme.colors['gray-7']};
`

export const SearchIconStyle = styled.div`
    padding-top: 8px;
    padding-left: 8px;
    width: 24px;
    background-color: ${props => props.theme.colors['white']};
`
export const SelectAllItem = styled(DropdownItem)`
    padding: 4px 8px 4px 0;
`

export const CloseIconButton = styled.div`
    display: flex;
    color: ${props => props.theme.colors['gray-3']};
    width: 10px;
    height: 10px;
    position: absolute;
    top: 8px;
    right: 25px;
    cursor: pointer;
`

export const ButtonContainer = styled.div<{isOpened: boolean; backgroundColor: string}>`
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 4px;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : "white"};
    border: 1px solid ${props => props.theme.colors['gray-7']};
    cursor: pointer;
    height: 22px;
`