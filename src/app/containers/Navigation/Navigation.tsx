import * as React from "react";
import { Text } from '../../../components/Typography/Text';
import { IconStyle } from '../../../shared/Common/Icon';
import { Link, useLocation, useHistory } from 'react-router-dom'
import {MainMenuProps, ElementMenuProps } from './NavigationTypes'
import { ContainerStyle, ImageStyle, SectionStyle, SectionTitle, ButtonMenuStyle, BreakStyle, ContainerElementStyle, OverlayMobileStyle, SubMenuElement, SubMenu, TextStyle} from './NavigationStyle'
import { DropdownItem, DropdownItemText, DropdownList } from '../../../components/FormsComponents/Dropdown/DropdownStyle';
const logo = require('../../../../public/assets/logo.png');
const logoSmall = require('../../../../public/assets/logo_small.png');
import { useOutsideAlerter } from '../../../utils/utils';
import { userToken } from '../../utils/services/token/tokenService';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { Modal } from "../../../components/Modal/Modal";
import { MultiUserUpgradeModal } from "../../pages/Account/Users/MultiUserUpgradeModal";

const ElementMenu: React.FC<ElementMenuProps> = (props: ElementMenuProps) => {

    return (
        <ContainerElementStyle className='my1' {...props} >
            <IconStyle className="noTransition flex pr2">{props.icon}</IconStyle>
            <Text hidden={!props.isOpen && !props.isMobile} size={14} weight="reg" > {props.children} </Text>
            <IconStyle style={{right:22}} className={"noTransition flex absolute" + (!props.isOpen && !props.isMobile ? ' hide' : '')} coloricon='gray-7'>{props.arrowIcon}</IconStyle>
        </ContainerElementStyle>
    )
}

export const MainMenu: React.FC<MainMenuProps> = (props: MainMenuProps) => {

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

    const addDropdownListRef = React.useRef<HTMLUListElement>(null);

    //GET NUMBER OF SEATS FROM SOMEWHERE ELSE
    const mockUserSeats = 2

    React.useEffect(() => {
        // userToken.getUserInfoItem();
        const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
        if (path) {
            history.replace(path);
        }
        setSelectedElement(firstSelectedItem().main);
        setSelectedSubElement(firstSelectedItem().slug);
    }, [location])

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
                history.push('/uploader')
                break
            case "Live Stream":
                setAddDropdownIsOpened(false)
                props.openAddStream()
                break
            case "Playlist":
                props.openPlaylist()
                break
            case "Expo": 
                props.openExpoCreate()
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

    const handleMenuItemClick = (route: string, slug: string) => {
        //setSelectedElement(route) 
        //setSelectedSubElement(slug)
        if(props.isMobile) {
            props.setOpen(false)
        }
    }

    const renderMenu = () => {

        return props.routes.filter(item => item.associatePrivilege ? userToken.getPrivilege(item.associatePrivilege) : true).map((element, i) => {
            if(!element.notDisplayedInNavigation) {
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
                                onClick={() => handleMenuToggle(element.path)} 
                                key={'MenuElementwithSubsections'+i} 
                                isOpen={props.isOpen}
                                hasSlugs={true} 
                                active={selectedElement === element.path} 
                                icon={element.iconName!}
                                arrowIcon={selectedElement === element.path && !toggleSubMenu ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                            >
                                {element.name} 
                            </ElementMenu>

                            <SubMenu isOpen={element.path === selectedElement && props.isOpen && !toggleSubMenu}>
                                {element.slug.filter(item => item.associatePrivilege ? userToken.getPrivilege(item.associatePrivilege) : true).map((subMenuElement, index) => { 
                                    if(subMenuElement.name === "Users" && mockUserSeats === 1){
                                        return (
                                            <SubMenuElement onClick={() => setUpgradeMultiUserModalOpen(true)} selected={selectedSubElement === subMenuElement.path}>
                                                <TextStyle selected={selectedSubElement === subMenuElement.path} size={14} weight='reg'> {subMenuElement.name}</TextStyle>
                                            </SubMenuElement>
                                        )
                                    } else
                                    return (
                                        <Link to={subMenuElement.path} key={'submenuElement'+i+index} onClick={() => {handleMenuItemClick(element.path, subMenuElement.path)}}  >
                                            <SubMenuElement selected={selectedSubElement === subMenuElement.path}>
                                                <TextStyle selected={selectedSubElement === subMenuElement.path} size={14} weight='reg'> {subMenuElement.name}</TextStyle>
                                            </SubMenuElement>
                                        </Link>
                                    )
                                })

                                }

                            </SubMenu>
                        </div>
                    )
                }
                
                else{
                    return (
                        <Link to={element.path} onClick={() => {handleMenuItemClick(element.path, '')}} key={'MenuElement'+i} >
                            <ElementMenu hasSlugs={false} isMobile={props.isMobile}  isOpen={props.isOpen} active={selectedElement === element.path} icon={element.iconName!}>
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
                        <ButtonMenuStyle className="mx-auto" sizeButton="large" onClick={() => setAddDropdownIsOpened(!addDropdownIsOpened)} menuOpen={props.isOpen} typeButton="primary">{props.isOpen ? "Add ": ""}+{ buttonLoading && <LoadingSpinner className="ml1" color='white' size={'xs'} />}</ButtonMenuStyle>
                        <DropdownList isSingle isInModal={false} isNavigation={false} displayDropdown={addDropdownIsOpened} ref={addDropdownListRef} hasSearch={true}>
                            {renderAddList()}
                        </DropdownList>
                    </div>
                
           
           
                    <SectionStyle>
                        {renderMenu()}
                    </SectionStyle>
                <IconStyle onClick={() => {props.setMenuLocked(!props.menuLocked)}} className="ml-auto mt-auto mr2 mb2" >{props.menuLocked? "arrow_back" : 'arrow_forward'}</IconStyle>
            </ContainerStyle>
            <Modal modalTitle="Upgrade for Multi-User Access?" size="small" hasClose={false} toggle={() => setUpgradeMultiUserModalOpen(false)} opened={upgradeMultiUserModalOpen}>
                <MultiUserUpgradeModal toggle={setUpgradeMultiUserModalOpen} />
            </Modal>

        </>
    )
}