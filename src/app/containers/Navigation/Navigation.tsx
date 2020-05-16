import * as React from "react";
import { Text } from '../../../components/Typography/Text';
import { IconStyle } from '../../../shared/Common/Icon';
import { Link, useLocation, useHistory } from 'react-router-dom'
import {MainMenuProps, ElementMenuProps } from './NavigationTypes'
import { ContainerStyle, ImageStyle, SectionStyle, SectionTitle, ButtonMenuStyle, BreakStyle, ContainerElementStyle, OverlayMobileStyle, SubMenuElement, SubMenu, TextStyle} from './NavigationStyle'
import { DropdownItem, DropdownItemText, DropdownList } from '../../../components/FormsComponents/Dropdown/DropdownStyle';
import { AddStreamModal } from "./AddStreamModal"
const logo = require('../../../../public/assets/logo.png');
const logoSmall = require('../../../../public/assets/logo_small.png');
import { useOutsideAlerter, getPrivilege } from '../../../utils/utils';
import Scrollbar from "react-scrollbars-custom";
import { initUserInfo, isTokenExpired, addTokenToHeader } from '../../utils/token';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import axios from 'axios'
import { Modal, ModalContent, ModalFooter } from '../../../components/Modal/Modal';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { Button } from '../../../components/FormsComponents/Button/Button';

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
    const addDropdownListRef = React.useRef<HTMLUListElement>(null);
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = React.useState<boolean>(false)
    const [newPlaylistTitle, setNewPlaylistTitle] = React.useState<string>('My Playlist')

    React.useEffect(() => {
        initUserInfo();
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

    const AddItemsList = [{name: "Video", enabled: getPrivilege('privilege-vod')}, {name: "Live Stream", enabled: getPrivilege('privilege-live')}, {name: "Playlist", enabled: getPrivilege('privilege-playlists')}]

    

    //Funtions for Add button dropdown

    useOutsideAlerter(addDropdownListRef, () => {
        setAddDropdownIsOpened(!addDropdownIsOpened)
    });

    const handleCreatePlaylist = async () => {
    
        setButtonLoading(true)
        await isTokenExpired()
        let {token} = addTokenToHeader();
        
        return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/PLAYLIST',
            {
                title: "My Playlist"
            }, 
            {
                headers: {
                    Authorization: token
                }
            }
        ).then((response) => {
            setButtonLoading(false)
            showToastNotification('Live channel created!', 'fixed', 'success')
            history.push(`PLAYLIST/${response.data.data.id}/setup`)
        }).catch((error) => {
            setButtonLoading(false)
            showToastNotification('Ooops, something went wrong...', 'fixed', 'error')
        })
    }

    const handleClick = (name: string) => {
        setSelectedAddDropdownItem(name);
        switch (name) {
            case "Video":
                history.push('/uploader')
                break
            case "Live Stream":
                setAddDropdownIsOpened(false)
                if (!getPrivilege('privilege-china') && !getPrivilege('privilege-unsecure-m3u8') && !getPrivilege('privilege-dvr') ) {
                    history.push("/livestreams")
                } else {
                    props.openAddStream();
                }
                break
            case "Playlist":
                setCreatePlaylistModalOpen(true)
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

        return props.routes.filter(item => item.associatePrivilege ? getPrivilege(item.associatePrivilege) : true).map((element, i) => {
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
                                {element.slug.filter(item => item.associatePrivilege ? getPrivilege(item.associatePrivilege) : true).map((subMenuElement, index) => {
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
        {props.isMobile ? <OverlayMobileStyle onClick={() => props.setOpen(false)} className="noTransition" opened={props.isOpen } /> : null }
       
            <ContainerStyle id='scrollbarWrapper' isOpen={props.isOpen} menuLocked={props.menuLocked} {...props} >
                <Scrollbar removeTracksWhenNotUsed removeTrackYWhenNotUsed={false} minimalThumbYSize={6} trackYProps={{style: {backgroundColor: 'inherit'}}}>
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
                </Scrollbar>
                <IconStyle onClick={() => {props.setMenuLocked(!props.menuLocked)}} className="ml-auto mt-auto mr2 mb2" >{props.menuLocked? "arrow_back" : 'arrow_forward'}</IconStyle>
           
                  
            </ContainerStyle>
            <Modal size="small" modalTitle="Create Playlist" opened={createPlaylistModalOpen} hasClose={false}>
                <ModalContent>
                    <Input id='playlistModalInput' className='col col-12 mb2' defaultValue={newPlaylistTitle} onChange={(event) => {setNewPlaylistTitle(event.currentTarget.value)}} label='Title' />
                </ModalContent>
                <ModalFooter>
                    <Button isLoading={buttonLoading} onClick={() => {handleCreatePlaylist()}} disabled={newPlaylistTitle === ''} typeButton="primary" >Create</Button>
                    <Button typeButton="tertiary" onClick={() => setCreatePlaylistModalOpen(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}