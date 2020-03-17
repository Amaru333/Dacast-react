import * as React from "react";
import { Text } from '../../components/Typography/Text';
import { IconStyle } from '../../shared/Common/Icon';
import { Link, useLocation, useHistory } from 'react-router-dom'
import {MainMenuProps, ElementMenuProps, UserAccountPrivileges } from './NavigationTypes'
import { ContainerStyle, ImageStyle, SectionStyle, SectionTitle, ButtonMenuStyle, BreakStyle, ContainerElementStyle, OverlayMobileStyle, SubMenuElement, SubMenu, TextStyle} from './NavigationStyle'
import { DropdownItem, DropdownItemText, DropdownList } from '../../components/FormsComponents/Dropdown/DropdownStyle';
import { AddStreamModal } from "./AddStreamModal"
const logo = require('../../../public/assets/logo.png');
const logoSmall = require('../../../public/assets/logo_small.png');
import { useOutsideAlerter } from '../../utils/utils';
import Scrollbar from "react-scrollbars-custom";

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
    let history = useHistory()

    const firstSelectedItem = (): {main: string; slug: string} => {
        let matchingRoute = {main: '/dashboard', slug: ''};
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
    const [addStreamModalOpen, setAddStreamModalOpen] = React.useState<boolean>(false)
    const addDropdownListRef = React.useRef<HTMLUListElement>(null);

    React.useEffect(() => {
        const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
        if (path) {
            history.replace(path);
        }
        setSelectedElement(firstSelectedItem().main)
        setSelectedSubElement(firstSelectedItem().slug)
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

    const AddItemsList = ["Vod", "Stream", "Playlist"]

    

    //Funtions for Add button dropdown

    useOutsideAlerter(addDropdownListRef, () => {
        setAddDropdownIsOpened(!addDropdownIsOpened)
    });

    const UserAccountPrivileges: UserAccountPrivileges = {
        standard: true,
        compatible: true,
        premium: true,
        rewind: true
    }

    const handleClick = (name: string) => {
        setSelectedAddDropdownItem(name);
        switch (name) {
            case "Vod":
                return props.history.push('/uploader')
            case "Stream":
                setAddDropdownIsOpened(false)
                if (UserAccountPrivileges.premium === false && UserAccountPrivileges.compatible === false && UserAccountPrivileges.rewind === false ) {
                    return location.href="/livestreams"
                } else {
                    return setAddStreamModalOpen(true)
                }
            case "Playlist":
                return location.href="/playlists"
            default:
                return
        }
    }

    const renderAddList = () => {
        return (
            AddItemsList.map((name) => {
                return (
                    <DropdownItem 
                        isSingle
                        key={props.id + '_' + name} 
                        id={props.id + '_' + name} 
                        className="mt1"
                        isSelected={selectedAddDropdownItem === name} 
                        onClick={() => handleClick(name)}> 
                        <DropdownItemText size={14} weight='reg' color={selectedAddDropdownItem === name ? 'dark-violet' : 'gray-1'}>{name}</DropdownItemText>
                    </DropdownItem>
                )                
            })
        )
    }

    const handleMenuItemClick = (route: string, slug: string) => {
        setSelectedElement(route) 
        setSelectedSubElement(slug)
        if(props.isMobile) {
            props.setOpen(false)
        }
    }

    const renderMenu = () => {

        return props.routes.map((element, i) => {
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
                            {element.slug.map((subMenuElement, index) => {
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
                    <Link to={element.path} onClick={() => {handleMenuItemClick(element.name, '')}} key={'MenuElement'+i} >
                        <ElementMenu hasSlugs={false} isMobile={props.isMobile}  isOpen={props.isOpen} active={selectedElement === element.path} icon={element.iconName!}>
                            {element.name} 
                        </ElementMenu>
                    </Link>
                )
            }
        })
    }
    return (
        <>
        {props.isMobile ? <OverlayMobileStyle onClick={() => props.setOpen(false)} className="noTransition" opened={props.isOpen } /> : null }
       
            <ContainerStyle id='scrollbarWrapper' isOpen={props.isOpen} menuLocked={props.menuLocked} {...props} >
                <Scrollbar removeTracksWhenNotUsed removeTrackYWhenNotUsed={false} minimalThumbYSize={6} trackYProps={{style: {backgroundColor: 'inherit'}}}>
                    <ImageStyle onClick={() => props.history.push('/')} className="mx-auto pointer" src={!props.isOpen && !props.isMobile ? logoSmall : logo} />
                    <BreakStyle />
                    <div>
                        <ButtonMenuStyle className="mx-auto" sizeButton="large" onClick={() => setAddDropdownIsOpened(!addDropdownIsOpened)} menuOpen={props.isOpen} typeButton="primary">{props.isOpen ? "Add ": ""}+</ButtonMenuStyle>
                        <DropdownList isSingle isInModal={false} isNavigation={false} displayDropdown={addDropdownIsOpened} ref={addDropdownListRef} hasSearch={true}>
                            {renderAddList()}
                        </DropdownList>
                    </div>
                
           
           
                    <SectionStyle>
                        {renderMenu()}
                    </SectionStyle>
                </Scrollbar>
                <IconStyle onClick={() => {props.setMenuLocked(!props.menuLocked)}} className="ml-auto mt-auto mr2 mb2" >{props.menuLocked? "arrow_back" : 'arrow_forward'}</IconStyle>
                <AddStreamModal toggle={() => setAddStreamModalOpen(false)} opened={addStreamModalOpen === true} privileges={UserAccountPrivileges} />
           
                  
            </ContainerStyle>
        
        </>
    )
}