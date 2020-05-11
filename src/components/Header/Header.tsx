import * as React from "react"
import Icon from '@material-ui/core/Icon';
import { HeaderStyle, IconContainerStyle, HeaderIconStyle, UserOptionsDropdownList, VerticalDivider, HeaderAvatar } from './HeaderStyle';
import { ApplicationState } from '../../app/redux-flow/store';
import { connect } from 'react-redux';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { Button } from '../FormsComponents/Button/Button';
import { DropdownItem, DropdownItemText } from '../FormsComponents/Dropdown/DropdownStyle';
import { useOutsideAlerter } from '../../utils/utils';
import { ThunkDispatch } from 'redux-thunk';
import { LogoutAction, Action } from '../../app/redux-flow/store/Register/Login';
import Burger from '../../app/containers/Navigation/Burger';
import { Text } from '../Typography/Text';
import { AppRoutes } from '../../app/constants/AppRoutes';
import { getProfilePageDetailsAction } from '../../app/redux-flow/store/Account/Profile/actions';
import { ProfilePageInfos } from '../../app/redux-flow/store/Account/Profile';
import { getUserInfoItem, isLoggedIn } from '../../app/utils/token';

export interface HeaderProps {
    isOpen: boolean;
    setOpen: Function;
    isMobile: boolean;
    title: string;
    logout: Function;
    ProfileInfo: ProfilePageInfos;
    getProfilePageDetails: Function;
}

const Header = (props: HeaderProps) => {

    let location = useLocation()
    let history = useHistory()
    const [breadcrumbItems, setBreadcrumbItems] = React.useState<string[]>([])

    React.useEffect(() => {
        let pathArray = location.pathname.split('-').join(' ').split('/').map(path => path.split(' ').map(f => f.charAt(0).toUpperCase() + f.slice(1)))
        let breadcrumbNames = pathArray.map(path => path.join(' '))
        let removedSpace = breadcrumbNames.shift()
        setBreadcrumbItems(breadcrumbNames)
    }, [location])

    const [userOptionsDropdownOpen, setUserOptionsDropdownOpen] = React.useState<boolean>(false)
    const userOptionsDropdownListRef = React.useRef<HTMLUListElement>(null);
    const [selectedUserOptionDropdownItem, setSelectedUserOptionDropdownItem] = React.useState<string>('');
    const [avatarFirstName, setAvatarFirstName] = React.useState<string>(null)
    const [avatarLastName, setAvatarLastName] = React.useState<string>(null)

    React.useEffect(() => {
        
        setAvatarFirstName(getUserInfoItem('custom:first_name'))
        setAvatarLastName(getUserInfoItem('custom:last_name'))
        
    }, [isLoggedIn()])

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

    const renderHeaderBreadcrumb = () => {
        return breadcrumbItems.map((item, index) => {
            return index !== breadcrumbItems.length - 1 ?
                <Text className='navigation' key={item + index} size={14}>
                    {AppRoutes.some(route => route.path === item.toLowerCase()) ?
                        <Link to={item.toLowerCase()}><Text size={14} color='dark-violet' className='navigation'>{item}</Text></Link>
                        : <Text size={14}>{item}</Text>
                    }
                &nbsp;/&nbsp;</Text>
                : <Text key={item + index} size={14}>{item}</Text>
        })
    }

    return (
        <HeaderStyle>
            {props.isMobile ? <Burger isOpen={props.isOpen} onClick={() => props.setOpen(!props.isOpen)} /> : null}
            {/* <Text className="mr-auto ml2" color="gray-1" size={14} weight="med" >{props.title}</Text> */}
            <div className="mr-auto flex ml2 sm-show" >
                {renderHeaderBreadcrumb()}
            </div>
            <IconContainerStyle>
                <a href="/help"><HeaderIconStyle><Icon>help</Icon></HeaderIconStyle></a>
                <div>
                    {avatarFirstName && avatarLastName ? 
                          
                          <HeaderAvatar onClick={() => setUserOptionsDropdownOpen(!userOptionsDropdownOpen)} className="" size='small' name={avatarFirstName + ' ' + avatarLastName} />
                       :
                       <HeaderIconStyle ><Icon>account_circle</Icon></HeaderIconStyle> } 
                       <UserOptionsDropdownList hasSearch={false} isSingle isInModal={false} isNavigation={false} displayDropdown={userOptionsDropdownOpen} ref={userOptionsDropdownListRef}>
                        {renderAddList()}
                    </UserOptionsDropdownList>
                </div>
            </IconContainerStyle>
            <VerticalDivider />
           <Button onClick={() => history.push('/account/plans')} className="mr2" sizeButton="xs" typeButton="secondary">Upgrade</Button>
        </HeaderStyle>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        title: state.title,
        ProfileInfo: state.account.profile
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {

    return {
        logout: () => {
            dispatch(LogoutAction());
        },
        getProfilePageDetails: () => {
            dispatch(getProfilePageDetailsAction());
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Header); 