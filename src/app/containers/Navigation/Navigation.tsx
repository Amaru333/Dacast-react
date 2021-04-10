import * as React from "react";
import { connect } from "react-redux";
import { Text } from '../../../components/Typography/Text';
import { IconStyle } from '../../../shared/Common/Icon';
import { Link, useLocation, useHistory } from 'react-router-dom'
import {MainMenuProps, ElementMenuProps } from './NavigationTypes'
import { ContainerStyle, ImageStyle, SectionStyle, SectionTitle, ButtonMenuStyle, BreakStyle, ContainerElementStyle, OverlayMobileStyle, SubMenuElement, SubMenu, TextStyle} from './NavigationStyle'
import { DropdownItem, DropdownItemText, DropdownList } from '../../../components/FormsComponents/Dropdown/DropdownStyle';
import { Action, getDashboardDetailsAction } from '../../redux-flow/store/Dashboard';
const logo = require('../../../../public/assets/logo.png');
const logoSmall = require('../../../../public/assets/logo_small.png');
import { useOutsideAlerter } from '../../../utils/utils';
import Scrollbar from "react-scrollbars-custom";
import { userToken } from '../../utils/services/token/tokenService';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { usePlanLimitsValidator } from '../../utils/custom-hooks/planLimitsHooks';
import PlanLimitReachedModal from '../../containers/Navigation/PlanLimitReachedModal';

const ElementMenu: React.FC<ElementMenuProps> = (props: ElementMenuProps) => {

    return (
        <ContainerElementStyle className='my1' {...props} >
            <IconStyle className="noTransition flex pr2">{props.icon}</IconStyle>
            <Text hidden={!props.isOpen && !props.isMobile} size={14} weight="reg" > {props.children} </Text>
            {props.isLocked && <IconStyle style={{right: props.isOpen ? 48 : 2, marginTop: props.isOpen ? 4 : 12}} className="noTransition flex absolute" customsize={16}>lock_outline</IconStyle>}
            <IconStyle style={{right:16, marginTop: 4}} className={"noTransition flex absolute" + (!props.isOpen && !props.isMobile ? ' hide' : '')} customsize={15} coloricon='gray-7'>{props.arrowIcon}</IconStyle>
        </ContainerElementStyle>
    )
}

const MainMenu: React.FC<MainMenuProps> = (props: MainMenuProps) => {

    let location = useLocation();
    let history = useHistory();
    const firstSelectedItem = (): {main: string; slug: string} => {
        let matchingRoute = {main: '/dashboard', slug: ''};
        const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
        if (path) {
            history.replace(path);
        }
        props.routes.map((route) => {
            if(location.pathname.includes(route.path)) {
                if(matchingRoute.main === '/dashboard') {
                    matchingRoute.main =  route.path
                }
            }
            if(route.slug) {
                route.slug.map(slug => {
                    if(slug.path === location.pathname) {
                        matchingRoute.slug =  slug.path
                    }
                })
            }
        })
        return matchingRoute;
    };
    const [selectedElement, setSelectedElement] = React.useState<string>(firstSelectedItem().main);
    const [selectedSubElement, setSelectedSubElement] = React.useState<string>(firstSelectedItem().slug);
    const [toggleSubMenu, setToggleSubMenu] = React.useState<boolean>(false)
    const [addDropdownIsOpened, setAddDropdownIsOpened] = React.useState<boolean>(false)
    const [selectedAddDropdownItem, setSelectedAddDropdownItem] = React.useState<string>('');
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const addDropdownListRef = React.useRef<HTMLUListElement>(null);
    const [profileDataisFetching, setProfileDataIsFetching] = React.useState<boolean>(true)

    const planLimitsValidaorCallbacks = {
        openAddStream: props.openAddStream,
        openAddVod: () => history.push('/uploader'),
        openExpoCreate: props.openExpoCreate
    }
    const {
        handleCreateStreamClick,
        handleUploadVideoClick,
        handleCreateExpoClick,
        PlanLimitReachedModalOpen,
        setPlanLimitReachedModalOpen,
        planLimitReachedModalType,
        setPlanLimitReachedModalType,
    } = usePlanLimitsValidator(props.infos, planLimitsValidaorCallbacks)

    React.useEffect(() => {
        // userToken.getUserInfoItem();
        const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
        if (path) {
            history.replace(path);
        }
        setSelectedElement(firstSelectedItem().main);
        setSelectedSubElement(firstSelectedItem().slug);
    }, [location])

    React.useEffect(() => {
        props.getDashboardDetails().then(() => setProfileDataIsFetching(false))
    }, [])

    const handleLockedMenu = (route, isLocked) => {
        if(isLocked) {
            if (route === '/paywall' && props.infos && props.infos.currentPlan && props.infos.currentPlan.planName === 'Annual Starter') {
                setPlanLimitReachedModalType('feature_not_included_starter_paywall')
            } else {
                setPlanLimitReachedModalType('feature_not_included')
            }
            setPlanLimitReachedModalOpen(true)
        }
    }

    const handleMenuToggle = (menuName: string, isLocked: boolean) => {
        if(menuName === selectedElement) {
            setToggleSubMenu(!toggleSubMenu)
        }
        else {
            setToggleSubMenu(false)
        }
        setSelectedElement(menuName);
        const menuItem = props.routes.filter((item) => item.path === menuName)[0];
        if(!menuItem.slug) {
            setSelectedSubElement('')
        }
        handleLockedMenu(menuName, isLocked)
    }

    const handleMenuItemClick = (route: string, slug: string, isLocked: boolean) => {
        //setSelectedElement(route)
        //setSelectedSubElement(slug)
        if(props.isMobile) {
            props.setOpen(false)
        }
        handleLockedMenu(route, isLocked)
    }



    const AddItemsList = [{name: "Video", enabled: userToken.getPrivilege('privilege-vod')}, {name: "Live Stream", enabled: userToken.getPrivilege('privilege-live')}, {name: "Expo", enabled: userToken.getPrivilege('privilege-expo')}, {name: "Playlist", enabled: userToken.getPrivilege('privilege-playlists')} ]



    //Funtions for Add button dropdown

    useOutsideAlerter(addDropdownListRef, () => {
        setAddDropdownIsOpened(!addDropdownIsOpened)
    });

    const handleClick = (name: string) => {
        setSelectedAddDropdownItem(name)
        setAddDropdownIsOpened(false)
        switch (name) {
            case "Video":
                handleUploadVideoClick()
                break
            case "Live Stream":
                setAddDropdownIsOpened(false)
                handleCreateStreamClick()
                break
            case "Playlist":
                props.openPlaylist()
                break
            case "Expo":
                handleCreateExpoClick()
                break
            default:
                return
        }
    }

    const renderAddList = () => {
        return (
            AddItemsList.filter(item => item.enabled).map((item) => {
                return (
                    <DropdownItem
                        isSingle
                        key={props.id + '_' + item.name}
                        id={props.id + '_' + item.name}
                        className="mt1"
                        isSelected={selectedAddDropdownItem === item.name}
                        onClick={() => handleClick(item.name)}>
                        <DropdownItemText size={14} weight='reg' color={selectedAddDropdownItem === item.name ? 'dark-violet' : 'gray-1'}>{item.name}</DropdownItemText>
                    </DropdownItem>
                )
            })
        )
    }

    const renderMenu = () => {

        return props.routes.map((element, i) => {
            if(!element.notDisplayedInNavigation) {
                const isLocked = element.associatePrivilege && !userToken.getPrivilege(element.associatePrivilege)
                if(element.path === 'break') {
                    return  <BreakStyle key={'breakSection'+i} />
                }
                else if(element.path === 'title') {
                    return props.isOpen ? <SectionTitle key={'SectionTitle'+i} size={14} weight="med" color="gray-3">{element.name}</SectionTitle> : null
                }
                else if(element.slug) {
                    return (
                        <div key={'superkey'+i}>
                            <ElementMenu
                                isMobile={props.isMobile}
                                onClick={() => handleMenuToggle(element.path, isLocked)}
                                key={'MenuElementwithSubsections'+i}
                                isOpen={props.isOpen}
                                isLocked={isLocked}
                                hasSlugs={true}
                                active={selectedElement === element.path}
                                icon={element.iconName!}
                                arrowIcon={selectedElement === element.path && !toggleSubMenu ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                            >
                                {element.name}
                            </ElementMenu>

                            <SubMenu isOpen={element.path === selectedElement && props.isOpen && !toggleSubMenu}>
                                {element.slug.filter(item => item.associatePrivilege ? userToken.getPrivilege(item.associatePrivilege) : true).map((subMenuElement, index) => {
                                    if(!subMenuElement.notDisplayedInNavigation) {
                                        return (
                                            <Link to={subMenuElement.path} key={'submenuElement'+i+index} onClick={() => {handleMenuItemClick(element.path, subMenuElement.path, isLocked)}}  >
                                                <SubMenuElement selected={selectedSubElement === subMenuElement.path}>
                                                    <TextStyle selected={selectedSubElement === subMenuElement.path} size={14} weight='reg'> {subMenuElement.name}</TextStyle>
                                                </SubMenuElement>
                                            </Link>
                                        )
                                    }
                                    return
                                })

                                }

                            </SubMenu>
                        </div>
                    )
                }

                else{
                    return (
                        <Link to={element.path} onClick={() => {handleMenuItemClick(element.path, '', isLocked)}} key={'MenuElement'+i} >
                            <ElementMenu hasSlugs={false} isMobile={props.isMobile}  isOpen={props.isOpen} active={selectedElement === element.path} icon={element.iconName!} isLocked={isLocked}>
                                {element.name}
                            </ElementMenu>
                        </Link>
                    )
                }
            }
        })
    }
    return (
        <>
        {props.isMobile ? <OverlayMobileStyle onClick={() => props.setOpen(false)} className="noTransition" opened={props.isOpen } /> : null }

            <ContainerStyle id='scrollbarWrapper' isOpen={props.isOpen} menuLocked={props.menuLocked} {...props} >
                    <ImageStyle onClick={() => history.push('/dashboard')} className="mx-auto block pointer" src={!props.isOpen && !props.isMobile ? logoSmall : logo} />
                    <BreakStyle />
                    <div>
                        <ButtonMenuStyle className="mx-auto" sizeButton="large" onClick={() => setAddDropdownIsOpened(!addDropdownIsOpened)} menuOpen={props.isOpen} typeButton="primary" disabled={profileDataisFetching}>{props.isOpen ? "Add ": ""}+{ buttonLoading && <LoadingSpinner className="ml1" color='white' size={'xs'} />}</ButtonMenuStyle>
                        <DropdownList isSingle isInModal={false} isNavigation={false} displayDropdown={addDropdownIsOpened} ref={addDropdownListRef} hasSearch={true}>
                            {renderAddList()}
                        </DropdownList>
                    </div>



                    <SectionStyle>
                        {renderMenu()}
                    </SectionStyle>
                <IconStyle onClick={() => {props.setMenuLocked(!props.menuLocked)}} className="ml-auto mt-auto mr2 mb2" >{props.menuLocked? "arrow_back" : 'arrow_forward'}</IconStyle>


            </ContainerStyle>
            <PlanLimitReachedModal type={planLimitReachedModalType} toggle={() => setPlanLimitReachedModalOpen(false)} opened={PlanLimitReachedModalOpen === true} />
        </>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        infos: state.dashboard.info
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getDashboardDetails: async () => {
            await dispatch(getDashboardDetailsAction(undefined));
        },
        getBillingPageInfos: async () => {
            await dispatch(getBillingPageInfosAction(undefined));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
