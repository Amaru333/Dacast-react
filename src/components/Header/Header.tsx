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
import { userToken } from '../../app/utils/token';
import { LiveDetailsState } from '../../app/redux-flow/store/Live/General/types';
import { VodDetailsState } from '../../app/redux-flow/store/VOD/General/types';
import { getVodDetailsAction } from '../../app/redux-flow/store/VOD/General/actions';
import { getLiveDetailsAction } from '../../app/redux-flow/store/Live/General/actions';
import { PlaylistDetailsState } from '../../app/redux-flow/store/Playlists/General/types';
import { getPlaylistDetailsAction } from '../../app/redux-flow/store/Playlists/General/actions';
import { store } from '../../app';

export interface HeaderProps {
    isOpen: boolean;
    setOpen: Function;
    isMobile: boolean;
    title: string;
    logout: Function;
    ProfileInfo: ProfilePageInfos;
    getProfilePageDetails: Function;
    LiveGeneralState: LiveDetailsState;
    VodGeneralState: VodDetailsState;
    getVodDetails: Function;
    getLiveGeneralDetails: Function;
    getPlaylistGeneralDetails: Function;
    PlaylisyGeneralState: PlaylistDetailsState;
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
                if (props.VodGeneralState[realUid]) {
                    return [props.VodGeneralState[realUid].title];
                } else {
                    props.getVodDetails(realUid);
                    return [realUid]
                }
            case 'livestreams':
                if (props.LiveGeneralState[realUid]) {
                    return [props.LiveGeneralState[realUid].title];
                } else {
                    props.getLiveGeneralDetails(realUid);
                    return [realUid]
                }
            case 'playlists':
                if (props.PlaylisyGeneralState[realUid]) {
                    return [props.PlaylisyGeneralState[realUid].title];
                } else {
                    props.getPlaylistGeneralDetails(realUid);
                    return [realUid]
                }
            default: return ["Unknown Asset Type"]
        }
    }

    React.useEffect(() => {
        let pathArray = location.pathname.split('-').join(' ').split('/')
        let breadCrumbString = pathArray.map( path => path.match(UuidRegex) ? handleUid(path, pathArray[1]) : path.split(' ').map(f => f.charAt(0).toUpperCase() + f.slice(1)) )
        let breadcrumbNames = breadCrumbString.map(path => path.join(' '))
        let removedSpace = breadcrumbNames.shift()
        setBreadcrumbItems(breadcrumbNames)
    }, [location, props.VodGeneralState, props.LiveGeneralState, props.PlaylisyGeneralState])

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

    }, [userToken.isLoggedIn()])

    const userOptionsList = ["Personal Profile", "Company Profile", "Log Out"]

    useOutsideAlerter(userOptionsDropdownListRef, () => {
        setUserOptionsDropdownOpen(!userOptionsDropdownOpen)
    });

    const handleLogOut = () => {
        props.logout();
        store.dispatch({type: 'USER_LOGOUT'});
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
                        <HeaderIconStyle ><Icon>account_circle</Icon></HeaderIconStyle>}
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
        VodGeneralState: state.vod.general,
        LiveGeneralState: state.live.general,
        PlaylisyGeneralState: state.playlist.general
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {

    return {
        logout: () => {
            dispatch(LogoutAction());
        },
        getProfilePageDetails: () => {
            dispatch(getProfilePageDetailsAction());
        },
        getVodDetails: (vodId: string) => {
            dispatch(getVodDetailsAction(vodId));
        },
        getLiveGeneralDetails: (liveId: string) => {
            dispatch(getLiveDetailsAction(liveId));
        },
        getPlaylistGeneralDetails: (playlistId: string) => {
            dispatch(getPlaylistDetailsAction(playlistId));
        },
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Header); 