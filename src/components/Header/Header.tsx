import * as React from "react"
import Icon from '@material-ui/core/Icon';
import { HeaderStyle, IconContainerStyle, HeaderIconStyle, UserOptionsDropdownList } from './HeaderStyle';
import Burger from '../../containers/Navigation/Burger';
import { Text } from '../../components/Typography/Text';
import { ApplicationState } from '../../redux-flow/store';
import { connect } from 'react-redux';
import { DropdownItem, DropdownItemText } from '../FormsComponents/Dropdown/DropdownStyle';
import { useOutsideAlerter } from '../../utils/utils';

export interface HeaderProps {
    isOpen: boolean;
    setOpen: Function;
    isMobile: boolean;
    title: string;
}



const Header = (props: HeaderProps) => {

    const [userOptionsDropdownOpen, setUserOptionsDropdownOpen] = React.useState<boolean>(false)
    const userOptionsDropdownListRef = React.useRef<HTMLUListElement>(null);
    const [selectedUserOptionDropdownItem, setSelectedUserOptionDropdownItem] = React.useState<string>('');

    const userOptionsList = ["Personal Profile", "Company Profile", "Log Out"]

    useOutsideAlerter(userOptionsDropdownListRef, () => {
        setUserOptionsDropdownOpen(!userOptionsDropdownOpen)
    });

    const handleLogOut = () => {
        localStorage.setItem('userToken', "")
    }

    const handleClick = (name: string) => {
        setSelectedUserOptionDropdownItem(name);
        switch (name) {
            case "Personal Profile":
               return location.href="/account/profile"
            case "Company Profile":
                return location.href="/account/company"
            case "Log Out":
                 handleLogOut()
                return location.href="/login"
            default:
               return
        }
    }

    const renderAddList = () => {
        return (
            userOptionsList.map((name) => {
                return (
                            <DropdownItem 
                                isSingle
                                key={name} 
                                id={name} 
                                className="mt1"
                                isSelected={selectedUserOptionDropdownItem === name} 
                                onClick={() => handleClick(name)}> 
                                <DropdownItemText size={14} weight='reg' color={selectedUserOptionDropdownItem === name ? 'dark-violet' : 'gray-1'}>{name}</DropdownItemText>
                            </DropdownItem>
                )                
            })
        )
    }

    return (
        <HeaderStyle>
            {props.isMobile ? <Burger isOpen={props.isOpen} onClick={() => props.setOpen(!props.isOpen)} /> : null}
            <Text className="mr-auto ml2" color="gray-1" size={14} weight="med" >{props.title}</Text>
            <IconContainerStyle>
                <HeaderIconStyle><Icon>help</Icon></HeaderIconStyle>
                <div>
                    <HeaderIconStyle onClick={() => setUserOptionsDropdownOpen(!userOptionsDropdownOpen)}><Icon>account_circle</Icon></HeaderIconStyle>
                    <UserOptionsDropdownList isSingle isInModal={false} isNavigation={false} displayDropdown={userOptionsDropdownOpen} ref={userOptionsDropdownListRef}>
                        {renderAddList()}
                    </UserOptionsDropdownList>   
                </div>
            </IconContainerStyle>
        </HeaderStyle>
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        title: state.title
    };
}



export default connect(mapStateToProps, null)(Header); 