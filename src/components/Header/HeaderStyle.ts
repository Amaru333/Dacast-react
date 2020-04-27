import styled from 'styled-components';
import { DropdownList } from '../FormsComponents/Dropdown/DropdownStyle';
import { Avatar } from '../Avatar/Avatar';

export const HeaderStyle = styled.div`
    border-bottom: 1px solid #D1DBE8;
    background-color: ${props => props.theme.colors["white"]};
    width: inherit;
    position: fixed;
    transition: none;
    z-index:999;
    height: 57px;
    align-items: center;
    display: flex;
    justify-content: flex-end;
`
export const IconContainerStyle = styled.div`
    display: flex;
    background-color: ${props => props.theme.colors["white"]};
    height: 56px;
    width: 100px;
    align-items: center;
    justify-content: center;
`
export const HeaderIconStyle = styled.div`
    top: 50%;
    padding: 8px;
    color: ${props => props.theme.colors["gray-1"]};
    cursor: pointer;
`

export const HeaderAvatar = styled(Avatar)`
    margin-bottom: 4px;
    margin-left: 8px;
    cursor: pointer;
`

export const VerticalDivider = styled.div`
    border-left: 1px solid ${props => props.theme.colors["gray-7"]};
    margin: 4px 16px 4px 0;
    height: 80%;
`

export const UserOptionsDropdownList = styled(DropdownList)`
width: 144px;
left: calc(100% - 194px);
& > li {
    padding: 0 0 0 8px;
}
`