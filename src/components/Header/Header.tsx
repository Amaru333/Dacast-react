import * as React from "react"
import Icon from '@material-ui/core/Icon';
import { HeaderStyle, IconContainerStyle, HeaderIconStyle, UserOptionsDropdownList, VerticalDivider, HeaderAvatar, BreadcrumbContainer, UpgradeButton, TrialUpgradeButton } from './HeaderStyle';
import { ApplicationState } from '../../app/redux-flow/store';
import { connect } from 'react-redux';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { DropdownItem, DropdownItemText } from '../FormsComponents/Dropdown/DropdownStyle';
import { useOutsideAlerter, capitalizeFirstLetter } from '../../utils/utils';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from '../../app/redux-flow/store/Register/Login';
import Burger from '../../app/containers/Navigation/Burger';
import { Text } from '../Typography/Text';
import { AppRoutes } from '../../app/constants/AppRoutes';
import { getProfilePageDetailsAction } from '../../app/redux-flow/store/Account/Profile/actions';
import { ProfilePageInfos } from '../../app/redux-flow/store/Account/Profile';
import { userToken } from '../../app/utils/services/token/tokenService';
import { ContentDetailsState } from '../../app/redux-flow/store/Content/General/types';
import { getContentDetailsAction } from '../../app/redux-flow/store/Content/General/actions';
import { BillingPageInfos, getBillingPageInfosAction } from '../../app/redux-flow/store/Account/Plan';
import { segmentService } from '../../app/utils/services/segment/segmentService';
import TagManager from 'react-gtm-module'
import { ContentType } from "../../app/redux-flow/store/Common/types";
const logoSmallWhite = require('../../../public/assets/logo_small_white.svg');

export interface HeaderProps {
    isOpen: boolean;
    isMobile: boolean;
    title: string;
    ProfileInfo: ProfilePageInfos;
    billingInfo: BillingPageInfos;
    contentGeneralState: ContentDetailsState;
    setOpen: (b: boolean) => void;
    getBillingInfo: () => Promise<void>;
    getProfilePageDetails: () => Promise<void>;
    getContentDetails: (contentId: string, contentType: ContentType) => Promise<void>;
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
            case 'expos':
                if (props.contentGeneralState['expo'] && props.contentGeneralState['expo'][realUid]) {
                    return [props.contentGeneralState['expo'][realUid].title];
                } else {
                    props.getContentDetails(realUid, 'expo');
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

    React.useEffect(() => {
        segmentService.page('App')
        segmentService.identify({
            userId: userToken.getUserInfoItem('custom:dacast_user_id'),
            firstName: userToken.getUserInfoItem('custom:first_name'),
            lastName: userToken.getUserInfoItem('custom:last_name'),
            company: userToken.getUserInfoItem('companyName'),
            email: userToken.getUserInfoItem('email'),
            label: userToken.getUserInfoItem('planName'),
            value: userToken.getUserInfoItem('planAmount')
        })
    }, [location])

    const [userOptionsDropdownOpen, setUserOptionsDropdownOpen] = React.useState<boolean>(false)
    const userOptionsDropdownListRef = React.useRef<HTMLUListElement>(null);
    const [selectedUserOptionDropdownItem, setSelectedUserOptionDropdownItem] = React.useState<string>('');
    const [avatarFirstName, setAvatarFirstName] = React.useState<string>(null)
    const [avatarLastName, setAvatarLastName] = React.useState<string>(null)

    React.useEffect(() => {
        if(!props.ProfileInfo) {
            props.getProfilePageDetails()
        }

        if(!props.billingInfo) {
            props.getBillingInfo()
        }

        TagManager.initialize(
            {
                gtmId: 'GTM-PHZ3Z7F',
                dataLayer: {
                    'adminUser': userToken.getUserInfoItem('impersonatedUserIdentifier') ? true : false,
                    'accountId': userToken.getUserInfoItem('custom:dacast_user_id'),
                    'companyName': userToken.getUserInfoItem('custom:website'),
                    'plan': userToken.getUserInfoItem('planName') ? userToken.getUserInfoItem('planName') : 'Unknown yet',
                    'signedUp': 'Unknown yet',
                    'userId': userToken.getUserInfoItem('custom:dacast_user_id'),
                    'userFirstName': userToken.getUserInfoItem('custom:first_name'),
                    'userLastName': userToken.getUserInfoItem('custom:last_name'),
                    'userEmail': userToken.getUserInfoItem('email'),
                    'bid': userToken.getUserInfoItem('salesforce-group-id')
                },
                // dataLayerName: 'Uapp'
            });
    }, [])

    React.useEffect(() => {
        if(props.billingInfo) {
            TagManager.dataLayer(
                {
                    dataLayer: {
                        'adminUser': userToken.getUserInfoItem('impersonatedUserIdentifier') ? true : false,
                        'accountId': userToken.getUserInfoItem('custom:dacast_user_id'),
                        'companyName': userToken.getUserInfoItem('custom:website'),
                        'plan': userToken.getUserInfoItem('planName') ? userToken.getUserInfoItem('planName') : 'Unknown yet',
                        'signedUp': 'Unknown yet',
                        'userId': userToken.getUserInfoItem('custom:dacast_user_id'),
                        'userFirstName': userToken.getUserInfoItem('custom:first_name'),
                        'userLastName': userToken.getUserInfoItem('custom:last_name'),
                        'userEmail': userToken.getUserInfoItem('email'),
                        'bid': userToken.getUserInfoItem('salesforce-group-id')
                    },
                    // dataLayerName: 'Uapp'
                });
        }
    }, [props.billingInfo])

    React.useEffect(() => {
        if(props.ProfileInfo) {
            setAvatarFirstName(props.ProfileInfo.firstName)
            setAvatarLastName(props.ProfileInfo.lastName)
            TagManager.dataLayer(
                {
                    dataLayer: {
                        'adminUser': userToken.getUserInfoItem('impersonatedUserIdentifier') ? true : false,
                        'accountId': userToken.getUserInfoItem('custom:dacast_user_id'),
                        'companyName': userToken.getUserInfoItem('custom:website'),
                        'plan': userToken.getUserInfoItem('planName') ? userToken.getUserInfoItem('planName') : 'Unknown yet',
                        'signedUp': 'Unknown yet',
                        'userId': userToken.getUserInfoItem('custom:dacast_user_id'),
                        'userFirstName': userToken.getUserInfoItem('custom:first_name'),
                        'userLastName': userToken.getUserInfoItem('custom:last_name'),
                        'userEmail': userToken.getUserInfoItem('email'),
                        'bid': userToken.getUserInfoItem('salesforce-group-id')
                    },
                    // dataLayerName: 'Uapp'
                });
        }

    }, [props.ProfileInfo])

    const userOptionsList = ["Personal Profile", "Company Profile", "Log Out"]

    useOutsideAlerter(userOptionsDropdownListRef, () => {
        setUserOptionsDropdownOpen(!userOptionsDropdownOpen)
    });

    const handleLogOut = () => {
        userToken.resetUserInfo()
        window.location.href = '/login'
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
                : <Text key={item + index} size={14}>{item === "Livestreams" ? "Live Streams" : item}</Text>
        })
    }

    const renderUpgradeButton = () => {
        if(!props.isMobile && props.billingInfo && props.billingInfo.currentPlan && props.billingInfo.currentPlan.displayName === "30 Day Trial") {
            return (
                <TrialUpgradeButton onClick={() => history.push('/account/upgrade')} className="mr2" typeButton="primary" buttonColor="lightBlue">
                    <img className="mr2" height="24" src={logoSmallWhite} /><span>Gain access to more premium features. <span className="text-decoration-underline">Upgrade Now</span></span>
                </TrialUpgradeButton>
            )
        } else {
            return (
                <UpgradeButton onClick={() => history.push('/account/upgrade')} className="mr2" sizeButton="small" typeButton="primary" buttonColor="lightBlue">
                    Upgrade
                </UpgradeButton>
            )
        }
    }

    return (
        <HeaderStyle userType={userToken.getUserInfoItem('impersonatedUserIdentifier') ? 'impersonatedUser' : 'user'}>
            {props.isMobile && <Burger isOpen={props.isOpen} onClick={() => props.setOpen(!props.isOpen)} />}
            {/* <Text className="mr-auto ml2" color="gray-1" size={14} weight="med" >{props.title}</Text> */}
            <BreadcrumbContainer className="mr-auto flex ml2 sm-show" >
                {renderHeaderBreadcrumb()}
            </BreadcrumbContainer>
            {
                userToken.getUserInfoItem('impersonatedUserIdentifier') &&
                <div>
                    <Text> Impersonating user: {userToken.getUserInfoItem('impersonatedUserIdentifier')}</Text>
                </div>
            }

            {renderUpgradeButton()}
            <VerticalDivider />
            <IconContainerStyle customColor={userToken.getUserInfoItem('impersonatedUserIdentifier') ? 'red10' : null}>
                <div>
                    {avatarFirstName && avatarLastName ?

                        <HeaderAvatar onClick={() => setUserOptionsDropdownOpen(!userOptionsDropdownOpen)} className="" size='small' name={avatarFirstName + ' ' + avatarLastName} />
                        :
                        <HeaderIconStyle onClick={() => setUserOptionsDropdownOpen(!userOptionsDropdownOpen)} ><Icon>account_circle</Icon></HeaderIconStyle>}
                    <UserOptionsDropdownList hasSearch={false} isSingle isInModal={false} isNavigation={false} displayDropdown={userOptionsDropdownOpen} ref={userOptionsDropdownListRef}>
                        {renderAddList()}
                    </UserOptionsDropdownList>
                </div>
                <a href="/help"><HeaderIconStyle><Icon>help</Icon></HeaderIconStyle></a>
            </IconContainerStyle>
        </HeaderStyle>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        title: state.title,
        ProfileInfo: state.account.profile,
        billingInfo: state.account.plan,
        contentGeneralState: state.content.general,
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {

    return {
        getProfilePageDetails: () => {
            dispatch(getProfilePageDetailsAction(undefined));
        },
        getContentDetails: (contentId: string, contentType: ContentType) => {
            dispatch(getContentDetailsAction(contentType)(contentId));
        },
        getBillingInfo: () => {
            dispatch(getBillingPageInfosAction(undefined))
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
