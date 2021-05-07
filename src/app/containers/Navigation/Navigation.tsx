import * as React from "react";
import { connect } from "react-redux";
import { Text } from '../../../components/Typography/Text';
import { IconStyle } from '../../../shared/Common/Icon';
import { Link, useLocation, useHistory } from 'react-router-dom'
import {MainMenuProps, ElementMenuProps } from './NavigationTypes'
import { ContainerStyle, ImageStyle, SectionStyle, SectionTitle, ButtonMenuStyle, BreakStyle, ContainerElementStyle, OverlayMobileStyle, SubMenuElement, SubMenu, TextStyle} from './NavigationStyle'
import { DropdownItem, DropdownItemText, DropdownList } from '../../../components/FormsComponents/Dropdown/DropdownStyle';
import { Action, getDashboardDetailsAction } from '../../redux-flow/store/Dashboard';
import { getDashboardGeneralDetailsAction } from '../../redux-flow/store/Dashboard';
const logo = require('../../../../public/assets/logo.png');
const logoSmall = require('../../../../public/assets/logo_small.png');
import { useOutsideAlerter } from '../../../utils/utils';
import { userToken } from '../../utils/services/token/tokenService';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { usePlanLimitsValidator } from '../../utils/custom-hooks/planLimitsHooks';
import PlanLimitReachedModal from '../../containers/Navigation/PlanLimitReachedModal';
import { Modal } from "../../../components/Modal/Modal";
import { MultiUserUpgradeModal } from "../../pages/Account/Users/MultiUserUpgradeModal";
import { ApplicationState } from "../../redux-flow/store";
import { getPlanDetailsAction, UpgradeAction } from "../../redux-flow/store/Account/Upgrade/actions";
import { ThunkDispatch } from "redux-thunk";
import { CustomStepper } from "../../../components/Stepper/Stepper";
import { ChangeSeatsCartStep } from "../../pages/Account/Users/ChangeSeatsCartStep";
import { ChangeSeatsPaymentStep } from "../../pages/Account/Users/ChangeSeatsPaymentStep";
import { getBillingPageInfosAction, PlanSummary } from "../../redux-flow/store/Account/Plan";
import { Label } from "../../../components/FormsComponents/Label/Label";

const ElementMenu: React.FC<ElementMenuProps> = (props: ElementMenuProps) => {

    return (
        <ContainerElementStyle className='my1' {...props} >
            <IconStyle className="noTransition flex pr2">{props.icon}</IconStyle>
            <Text hidden={!props.isOpen && !props.isMobile} size={14} weight="reg" > {props.children} </Text>
            {props.isLocked && <IconStyle style={{right: props.isOpen ? 16 : 2, marginTop: props.isOpen ? 4 : 12}} className="noTransition flex absolute" customsize={16}>lock_outline</IconStyle>}
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
    const [upgradeMultiUserModalOpen, setUpgradeMultiUserModalOpen] = React.useState<boolean>(false)

    //REMOVE ALL MOCK DATA WHEN BACKEND DONE
    const [changeSeatsStepperOpen, setChangeSeatsStepperOpen] = React.useState<boolean>(false)
    const [planDetails, setPlanDetails] = React.useState<PlanSummary>(props.billingInfo.currentPlan)
    const changeSeatsStepList = [{title: "Cart", content: ChangeSeatsCartStep}, {title: "Payment", content: ChangeSeatsPaymentStep}]

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
        planLimitReachedModalType
    } = usePlanLimitsValidator(props.infos, planLimitsValidaorCallbacks)

    React.useEffect(() => {
        props.getPlanDetails()
    }, [])

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

    const handleMenuToggle = (menuName: string) => {
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
    }

    const handleMenuItemClick = (route: string, slug: string) => {
        //setSelectedElement(route)
        //setSelectedSubElement(slug)
        if(props.isMobile) {
            props.setOpen(false)
        }
        if (slug === '/account/upgrade') {
            segmentService.track('Upgrade Form Completed', {
                action: 'Upgrade Source Clicked',
                userId: userToken.getUserInfoItem('user-id'),
                customers: 'all',
                type: 'button',
                location: 'submenu sidebar',
                step: -1
            })
        }
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

    const openBuySeatsStepper = () => {
        setChangeSeatsStepperOpen(true)
        setUpgradeMultiUserModalOpen(false)
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
                const isLocked = element.slug && !element.slug.filter(item => !item.associatePrivilege || userToken.getPrivilege(item.associatePrivilege)).length
                if(element.path === 'break') {
                    return  <BreakStyle key={'breakSection'+i} />
                }
                else if(element.path === 'title') {
                    return props.isOpen ? <SectionTitle key={'SectionTitle'+i} size={14} weight="med" color="gray-3">{element.name}</SectionTitle> : null
                }
                else if(element.slug && element.slug.filter(item => !item.associatePrivilege || userToken.getPrivilege(item.associatePrivilege)).length) {
                    return (
                        <div key={'superkey'+i}>
                            <ElementMenu
                                isMobile={props.isMobile}
                                onClick={() => handleMenuToggle(element.path)}
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
                                    if(subMenuElement.name === "Users" && props.billingInfo && props.billingInfo.currentPlan.nbSeats === 1){
                                        return (
                                            <SubMenuElement onClick={() => setUpgradeMultiUserModalOpen(true)} selected={selectedSubElement === subMenuElement.path}>
                                                <div className='flex'>
                                                    <TextStyle selected={selectedSubElement === subMenuElement.path} size={14} weight='reg'> {subMenuElement.name}</TextStyle>
                                                    <Label backgroundColor='violet20' color='dark-violet' label='BETA' />
                                                </div>

                                            </SubMenuElement>
                                        )
                                    } else {
                                        if(subMenuElement.name === "Users") {
                                            return (
                                                <Link to={subMenuElement.path} key={'submenuElement'+i+index} onClick={() => {handleMenuItemClick(element.path, subMenuElement.path)}}  >
                                                    <SubMenuElement selected={selectedSubElement === subMenuElement.path}>
                                                        <div className='flex items-center'>
                                                            <TextStyle className='pr2' selected={selectedSubElement === subMenuElement.path} size={14} weight='reg'> {subMenuElement.name}</TextStyle>
                                                            <Label backgroundColor='violet20' color='dark-violet' label='BETA' />
                                                        </div>
                                                    </SubMenuElement>
                                                </Link>
                                            )
                                        }
                                    return (
                                        <Link to={subMenuElement.path} key={'submenuElement'+i+index} onClick={() => {handleMenuItemClick(element.path, subMenuElement.path)}}  >
                                            <SubMenuElement selected={selectedSubElement === subMenuElement.path}>
                                                <TextStyle selected={selectedSubElement === subMenuElement.path} size={14} weight='reg'> {subMenuElement.name}</TextStyle>
                                            </SubMenuElement>
                                        </Link>
                                    )
                                    }
                                })

                                }

                            </SubMenu>
                        </div>
                    )
                }

                else{
                    return (
                        <Link to={element.path} onClick={() => {handleMenuItemClick(element.path, '')}} key={'MenuElement'+i} >
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
        {props.isMobile && <OverlayMobileStyle onClick={() => props.setOpen(false)} className="noTransition" opened={props.isOpen } />}

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
            {
                changeSeatsStepperOpen &&
                    <CustomStepper
                    stepperHeader="Change Number of Seats"
                    stepList={changeSeatsStepList}
                    opened={changeSeatsStepperOpen}
                    lastStepButton="Purchase"
                    finalFunction={() => {}}
                    functionCancel={() => setChangeSeatsStepperOpen(false)}
                    stepperData={planDetails}
                    updateStepperData={(plan: PlanSummary) => setPlanDetails(plan)}
                    emptySeats={1}
                    planData={planDetails}
                    billingInfo={props.billingInfo}
                />
            }

            <Modal modalTitle="Upgrade for Multi-User Access?" size="small" hasClose={false} toggle={() => setUpgradeMultiUserModalOpen(false)} opened={upgradeMultiUserModalOpen} >
                <MultiUserUpgradeModal openBuySeatsStepper={openBuySeatsStepper} toggle={setUpgradeMultiUserModalOpen} />
            </Modal>

            <PlanLimitReachedModal type={planLimitReachedModalType} toggle={() => setPlanLimitReachedModalOpen(false)} opened={PlanLimitReachedModalOpen === true} />
        </>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        planDetails: state.account.upgrade,
        billingInfo: state.account.plan,
        infos: state.dashboard.info
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, UpgradeAction>) {
    return {
        getPlanDetails: async () => {
            await dispatch(getPlanDetailsAction(undefined))
        },
        getDashboardDetails: async () => {
            await dispatch(getDashboardGeneralDetailsAction(undefined));
        },
        getBillingPageInfos: async () => {
            await dispatch(getBillingPageInfosAction(undefined));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (MainMenu);
