import * as React from "react"
import Icon from '@material-ui/core/Icon';
import { HeaderStyle, IconContainerStyle, HeaderIconStyle, UserOptionsDropdownList, VerticalDivider } from './HeaderStyle';
import Burger from '../../containers/Navigation/Burger';
import { Text } from '../../components/Typography/Text';
import { ApplicationState } from '../../redux-flow/store';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { Breadcrumb } from '../../pages/Folders/Breadcrumb';
import { Button } from '../FormsComponents/Button/Button';
import { DropdownItem, DropdownItemText } from '../FormsComponents/Dropdown/DropdownStyle';
import { useOutsideAlerter } from '../../utils/utils';
import { ThunkDispatch } from 'redux-thunk';
import { LogoutAction, Action } from '../../redux-flow/store/Register/Login';

export interface HeaderProps {
    isOpen: boolean;
    setOpen: Function;
    isMobile: boolean;
    title: string;
    logout: Function; 
}



const Header = (props: HeaderProps) => {

    let location = useLocation()
    let history = useHistory()
    const [breadcrumbItems, setBreadcrumbItems] = React.useState<string[]>([])

    React.useEffect(() => {
        setBreadcrumbItems(location.pathname.split('/').filter((f: string )=> f))
    }, [location])

    const [userOptionsDropdownOpen, setUserOptionsDropdownOpen] = React.useState<boolean>(false)
    const userOptionsDropdownListRef = React.useRef<HTMLUListElement>(null);
    const [selectedUserOptionDropdownItem, setSelectedUserOptionDropdownItem] = React.useState<string>('');

    const userOptionsList = ["Personal Profile", "Company Profile", "Log Out"]

    useOutsideAlerter(userOptionsDropdownListRef, () => {
        setUserOptionsDropdownOpen(!userOptionsDropdownOpen)
    });

    const handleLogOut = () => {
        props.logout()
        history.push('/login')
    }

    const handleClick = (name: string) => {
        setSelectedUserOptionDropdownItem(name);
        switch (name) {
            case "Personal Profile":
                 history.push("/account/profile")
                 break
            case "Company Profile":
                 history.push("/account/company")
                 break
            case "Log Out":
                handleLogOut()
                break
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
            {/* <Text className="mr-auto ml2" color="gray-1" size={14} weight="med" >{props.title}</Text> */}
            <div className="mr-auto ml2" >
                <Breadcrumb isNavigation options={location.pathname + '/'} callback={() => {}}/>
            </div>          
            <IconContainerStyle>
                <a href="/help"><HeaderIconStyle><Icon>help</Icon></HeaderIconStyle></a>
                <div>
                    <HeaderIconStyle onClick={() => setUserOptionsDropdownOpen(!userOptionsDropdownOpen)}><Icon>account_circle</Icon></HeaderIconStyle>
                    <UserOptionsDropdownList hasSearch={false} isSingle isInModal={false} isNavigation={false} displayDropdown={userOptionsDropdownOpen} ref={userOptionsDropdownListRef}>
                        {renderAddList()}
                    </UserOptionsDropdownList>   
                </div>
            </IconContainerStyle>
            <VerticalDivider />
            <a href="/account/plans"><Button className="mr2" sizeButton="xs" typeButton="secondary">Upgrade</Button></a>
        </HeaderStyle>
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        title: state.title
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {

    return {
        logout: () => {
            dispatch(LogoutAction());
        },
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Header); 