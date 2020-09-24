import * as React from "react"
import Icon from '@material-ui/core/Icon';
import { HeaderStyle, IconContainerStyle, HeaderIconStyle, UserOptionsDropdownList, VerticalDivider, HeaderAvatar, BreadcrumbContainer } from './HeaderStyle';
import { ApplicationState } from '../../app/redux-flow/store';
import { connect } from 'react-redux';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { Button } from '../FormsComponents/Button/Button';
import { DropdownItem, DropdownItemText } from '../FormsComponents/Dropdown/DropdownStyle';
import { useOutsideAlerter, capitalizeFirstLetter } from '../../utils/utils';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from '../../app/redux-flow/store/Register/Login';
import Burger from '../../app/containers/Navigation/Burger';
import { Text } from '../Typography/Text';
import { AppRoutes } from '../../app/constants/AppRoutes';
import { getProfilePageDetailsAction } from '../../app/redux-flow/store/Account/Profile/actions';
import { ProfilePageInfos } from '../../app/redux-flow/store/Account/Profile';
import { userToken } from '../../app/utils/token';
import { ContentDetailsState } from '../../app/redux-flow/store/Content/General/types';
import { getContentDetailsAction } from '../../app/redux-flow/store/Content/General/actions';

export interface HeaderProps {
    isOpen: boolean;
    isMobile: boolean;
    title: string;
    ProfileInfo: ProfilePageInfos;
    contentGeneralState: ContentDetailsState;
    setOpen: (b: boolean) => void;
    getProfilePageDetails: () => Promise<void>;
    getContentDetails: (contentId: string, contentType: string) => Promise<void>;
}

const Header = (props: HeaderProps) => {

    let location = useLocation()
    let history = useHistory()
    const [breadcrumbItems, setBreadcrumbItems] = React.useState<string[]>([])

    let UuidRegex = /^[0-9a-fA-F]{1,12} [0-9a-fA-F]{1,12} [0-9a-fA-F]{1,12} [0-9a-fA-F]{1,12} [0-9a-fA-F]{1,12}/;

    const handleUid = (uid: string, path: string) => {
        var realUid = uid.replace(/\s/g , "-");
        switch (path) {
            case 'videos':
                if (props.contentGeneralState['vod'] && props.contentGeneralState['vod'][realUid]) {
                    return [props.contentGeneralState['vod'][realUid].title];
                } else {
                    props.getContentDetails(realUid, 'vod');
                    return [realUid]
                }
            case 'livestreams':
                if (props.contentGeneralState['live'] && props.contentGeneralState['live'][realUid]) {
                    return [props.contentGeneralState['live'][realUid].title];
                } else {
                    props.getContentDetails(realUid, 'live');
                    return [realUid]
                }
            case 'playlists':
                if (props.contentGeneralState['playlist'] && props.contentGeneralState['playlist'][realUid]) {
                    return [props.contentGeneralState['playlist'][realUid].title];
                } else {
                    props.getContentDetails(realUid, 'playlist');
                    return [realUid]
                }
            default: return ["Unknown Asset Type"]
        }
    }

    React.useEffect(() => {
        let pathArray = location.pathname.split('-').join(' ').split('/')
        let breadCrumbString = pathArray.map( path => path.match(UuidRegex) ? handleUid(path, pathArray[1]) : path.split(' ').map(f => capitalizeFirstLetter(f)) )
        let breadcrumbNames = breadCrumbString.map(path => path.join(' '))
        let removedSpace = breadcrumbNames.shift()
        setBreadcrumbItems(breadcrumbNames)
    }, [location, props.contentGeneralState])

    const [userOptionsDropdownOpen, setUserOptionsDropdownOpen] = React.useState<boolean>(false)
    const userOptionsDropdownListRef = React.useRef<HTMLUListElement>(null);
    const [selectedUserOptionDropdownItem, setSelectedUserOptionDropdownItem] = React.useState<string>('');
    const [avatarFirstName, setAvatarFirstName] = React.useState<string>(null)
    const [avatarLastName, setAvatarLastName] = React.useState<string>(null)

    React.useEffect(() => {
        if(userToken.isLoggedIn()) {
            setAvatarFirstName(userToken.getUserInfoItem('custom:first_name'))
            setAvatarLastName(userToken.getUserInfoItem('custom:last_name'))
        }
        console.log('token has changed')
    }, [userToken])

    const userOptionsList = ["Personal Profile", "Company Profile", "Log Out"]

    useOutsideAlerter(userOptionsDropdownListRef, () => {
        setUserOptionsDropdownOpen(!userOptionsDropdownOpen)
    });

    const handleLogOut = () => {
        userToken.resetUserInfo()
        window.location.href = '/login'
        window.location.reload()
        
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
            <BreadcrumbContainer className="mr-auto flex ml2 sm-show" >
                {renderHeaderBreadcrumb()}
            </BreadcrumbContainer>
            <IconContainerStyle>
                <a href="/help"><HeaderIconStyle><Icon>help</Icon></HeaderIconStyle></a>
                <div>
                    {avatarFirstName && avatarLastName ?

                        <HeaderAvatar onClick={() => setUserOptionsDropdownOpen(!userOptionsDropdownOpen)} className="" size='small' name={avatarFirstName + ' ' + avatarLastName} />
                        :
                        <HeaderIconStyle onClick={() => setUserOptionsDropdownOpen(!userOptionsDropdownOpen)} ><Icon>account_circle</Icon></HeaderIconStyle>}
                    <UserOptionsDropdownList hasSearch={false} isSingle isInModal={false} isNavigation={false} displayDropdown={userOptionsDropdownOpen} ref={userOptionsDropdownListRef}>
                        {renderAddList()}
                    </UserOptionsDropdownList>
                </div>
            </IconContainerStyle>
            <VerticalDivider />
            <Button onClick={() => history.push('/account/upgrade')} className="mr2" sizeButton="xs" typeButton="secondary">Upgrade</Button>
        </HeaderStyle>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        title: state.title,
        ProfileInfo: state.account.profile,
        contentGeneralState: state.content.general,
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {

    return {
        getProfilePageDetails: () => {
            dispatch(getProfilePageDetailsAction());
        },
        getContentDetails: (contentId: string, contentType: string) => {
            dispatch(getContentDetailsAction(contentId, contentType));
        },
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Header); 