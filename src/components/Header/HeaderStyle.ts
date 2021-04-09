import styled from 'styled-components';
import { DropdownList } from '../FormsComponents/Dropdown/DropdownStyle';
import { Button } from '../FormsComponents/Button/Button';
import { Avatar } from '../Avatar/Avatar';
import { ColorsApp } from '../../styled/types';

export const HeaderStyle = styled.div<{userType: 'user' | 'admin' | 'impersonatedUser'}>`
    border-bottom: 1px solid #D1DBE8;
    background-color: ${props => props.userType === 'user' ? props.theme.colors["white"] : props.userType === 'admin' ? props.theme.colors['yellow80'] : props.theme.colors['red10']};
    width: inherit;
    position: fixed;
    transition: none;
    z-index:999;
    height: 55px;
    align-items: center;
    display: flex;
    justify-content: flex-end;
`
export const IconContainerStyle = styled.div<{customColor?: ColorsApp}>`
    display: flex;
    background-color: ${props => props.customColor? props.theme.colors[props.customColor] : props.theme.colors['white']};
    height: 55px;
    align-items: center;
    margin-right: 16px;
`
export const HeaderIconStyle = styled.div`
    color: ${props => props.theme.colors["gray-1"]};
    cursor: pointer;
    height: 24px;
    margin-right: 16px;
`

export const HeaderAvatar = styled(Avatar)`
    margin-right: 16px;
    cursor: pointer;
`

export const VerticalDivider = styled.div<{blackBorder?: boolean}>`
    border-left: 1px solid ${props => props.blackBorder ? props.theme.colors['black'] : props.theme.colors["gray-7"]};
    margin: 4px 14px 4px 0;
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
export const UpgradeButton = styled(Button)`
    padding-top: 0;
    padding-bottom: 0;
    height: 32px;
    font-size: 14px;
`

export const TrialUpgradeButton = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 20px 8px 11px;
    background-color: ${props => props.theme.colors["blue-2"]};
    color: white;
    border-radius: 4px;
    & > span > a {
        cursor: pointer;
        text-decoration: underline;
        &:hover {
            color: ${props => props.theme.colors["gray-8"]};
        }
    }
`
