import styled from 'styled-components';
import { DropdownList } from '../FormsComponents/Dropdown/DropdownStyle';
import { Avatar } from '../Avatar/Avatar';
import { ColorsApp } from '../../styled/types';

export const HeaderStyle = styled.div<{userType: 'user' | 'admin' | 'impersonatedUser'}>`
    border-bottom: 1px solid #D1DBE8;
    background-color: ${props => props.userType === 'user' ? props.theme.colors["white"] : props.userType === 'admin' ? props.theme.colors['yellow80'] : props.theme.colors['red10']};
    width: inherit;
    position: fixed;
    transition: none;
    z-index:999;
    height: 57px;
    align-items: center;
    display: flex;
    justify-content: flex-end;
`
export const IconContainerStyle = styled.div<{customColor?: ColorsApp}>`
    display: flex;
    background-color: ${props => props.customColor? props.theme.colors[props.customColor] : props.theme.colors['white']};
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

export const VerticalDivider = styled.div<{blackBorder?: boolean}>`
    border-left: 1px solid ${props => props.blackBorder ? props.theme.colors['black'] : props.theme.colors["gray-7"]};
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

export const BreadcrumbContainer = styled.div`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`