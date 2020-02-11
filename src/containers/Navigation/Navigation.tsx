import * as React from "react";
import { Text } from '../../components/Typography/Text';
import { Icon } from '@material-ui/core';
import { Link } from 'react-router-dom'
import {MainMenuProps, ElementMenuProps, UserAccountPrivileges } from './NavigationTypes'
import { ContainerStyle, ImageStyle, SectionStyle, SectionTitle, ButtonMenuStyle, BreakStyle, ContainerElementStyle, IconStyle, OverlayMobileStyle, SubMenuElement, SubMenu, ArrowIconStyle, TextStyle} from './NavigationStyle'
import { DropdownItem, DropdownItemText, DropdownList } from '../../components/FormsComponents/Dropdown/DropdownStyle';
import { AddStreamModal } from "./AddStreamModal"
const logo = require('../../../public/assets/logo.png');
const logoSmall = require('../../../public/assets/logo_small.png');
import { useOutsideAlerter } from '../../utils/utils';

const ElementMenu: React.FC<ElementMenuProps> = (props: ElementMenuProps) => {

    return (
        <ContainerElementStyle className='my1' {...props} >
            <IconStyle className="noTransition"><Icon className="noTransition">{props.icon}</Icon></IconStyle>
            <Text hidden={!props.isOpen && !props.isMobile} size={14} weight="reg" > {props.children} </Text>
            <ArrowIconStyle hidden={!props.isOpen && !props.isMobile}><Icon className="noTransition">{props.arrowIcon}</Icon></ArrowIconStyle>
        </ContainerElementStyle>
    )
}

export const MainMenu: React.FC<MainMenuProps> = (props: MainMenuProps) => {

    const firstSelectedItem = () => {
        let item = props.routes.find((element) => {
            return props.history.location.pathname.includes(element.path)
        })

        
        return item ?item.name : props.routes[0].name;
    };
    const [selectedElement, setSelectedElement] = React.useState<string>(firstSelectedItem());
    const [selectedSubElement, setSelectedSubElement] = React.useState<string>(firstSelectedItem());
    const [toggleSubMenu, setToggleSubMenu] = React.useState<boolean>(false)
    const [addDropdownIsOpened, setAddDropdownIsOpened] = React.useState<boolean>(false)
    const [selectedAddDropdownItem, setSelectedAddDropdownItem] = React.useState<string>('');
    const [addStreamModalOpen, setAddStreamModalOpen] = React.useState<boolean>(false)
    const addDropdownListRef = React.useRef<HTMLUListElement>(null);

    const handleMenuToggle = (menuName: string) => {
        if(menuName === selectedElement) {
            setToggleSubMenu(!toggleSubMenu)
        }
        else {
            setToggleSubMenu(false)
        }
        setSelectedElement(menuName); 
        const menuItem = props.routes.filter((item) => item.name === menuName)[0];
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
                return location.href="/videos"
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
                            onClick={() => handleMenuToggle(element.name)} 
                            key={'MenuElementwithSubsections'+i} 
                            isOpen={props.isOpen}
                            hasSlugs={true} 
                            active={selectedElement === element.name} 
                            icon={element.iconName!}
                            arrowIcon={selectedElement === element.name && !toggleSubMenu ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                        >
                            {element.name} 
                        </ElementMenu>

                        <SubMenu isOpen={element.name === selectedElement && props.isOpen && !toggleSubMenu}>
                            {element.slug.map((subMenuElement, index) => {
                                return (
                                    <Link to={subMenuElement.path} key={'submenuElement'+i+index} onClick={() => {setSelectedElement(element.name), setSelectedSubElement(subMenuElement.name)}}  >
                                        <SubMenuElement selected={selectedSubElement === subMenuElement.name}>
                                            <TextStyle selected={selectedSubElement === subMenuElement.name} size={14} weight='reg'> {subMenuElement.name}</TextStyle>
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
                    <Link to={element.path} onClick={() => {setSelectedElement(element.name), setSelectedSubElement('')}} key={'MenuElement'+i} >
                        <ElementMenu hasSlugs={false} isMobile={props.isMobile}  isOpen={props.isOpen} active={selectedElement === element.name} icon={element.iconName!}>
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
        <ContainerStyle isOpen={props.isOpen} menuLocked={props.menuLocked} {...props} >
            <ImageStyle className="mx-auto" src={!props.isOpen && !props.isMobile ? logoSmall : logo} />
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
            <Icon onClick={() => {props.setMenuLocked(!props.menuLocked)}} className="ml-auto mt-auto mr2 mb2" >{props.menuLocked? "arrow_back" : 'arrow_forward'}</Icon>
            <AddStreamModal toggle={() => setAddStreamModalOpen(false)} opened={addStreamModalOpen === true} privileges={UserAccountPrivileges} />
        </ContainerStyle>
        </>
    )
}