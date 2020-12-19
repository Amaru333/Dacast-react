import * as React from "react";
import { Text } from '../../../components/Typography/Text';
import { IconStyle } from '../../../shared/Common/Icon';
import { Link, useLocation, useHistory } from 'react-router-dom'
import {MainMenuProps, ElementMenuProps } from './NavigationTypes'
import { ContainerStyle, ImageStyle, SectionStyle, SectionTitle, BreakStyle, ContainerElementStyle, OverlayMobileStyle } from './NavigationStyle'
const logo = require('../../../../public/assets/logo.png');
const logoSmall = require('../../../../public/assets/logo_small.png');


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
    const firstSelectedItem = (): string => {
        let matchingRoute = '/accounts';
        const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
        if (path) {
            history.replace(path);
        }
        props.routes.map((route) => {
            if(location.pathname.includes(route.path)) {
                if(matchingRoute === '/accounts') {
                    matchingRoute =  route.path
                }
            }
        })
        return matchingRoute;
    };
    const [selectedElement, setSelectedElement] = React.useState<string>(firstSelectedItem());

    React.useEffect(() => {
        const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
        if (path) {
            history.replace(path);
        }
        setSelectedElement(firstSelectedItem());
    }, [location])

    const renderMenu = () => {
        return props.routes.filter(e => !e.notDisplayedInNavigation).map((element, i) => {

            if(element.path === 'break') {
                return  <BreakStyle key={'breakSection'+i} />
            }

            if(element.path === 'title') {
                return props.isOpen && <SectionTitle key={'SectionTitle'+i} size={14} weight="med" color="gray-3">{element.name}</SectionTitle>
            }

            return (
                <Link to={element.path} onClick={() => {setSelectedElement(element.path)}} key={'MenuElement'+i} >
                    <ElementMenu isMobile={props.isMobile}  isOpen={props.isOpen} active={selectedElement === element.path} icon={element.iconName!}>
                        {element.name} 
                    </ElementMenu>
                </Link>
            )
            
        })
    }
    return (
        <>
        {props.isMobile && <OverlayMobileStyle onClick={() => props.setOpen(false)} className="noTransition" opened={props.isOpen } /> }
            <ContainerStyle id='scrollbarWrapper' isOpen={props.isOpen} menuLocked={props.menuLocked} {...props} >
                    <ImageStyle onClick={() => history.push('/dashboard')} className="mx-auto block pointer" src={!props.isOpen && !props.isMobile ? logoSmall : logo} />
                    <BreakStyle />         
                    <SectionStyle>
                        {renderMenu()}
                    </SectionStyle>
                <IconStyle onClick={() => {props.setMenuLocked(!props.menuLocked)}} className="ml-auto mt-auto mr2 mb2" >{props.menuLocked? "arrow_back" : 'arrow_forward'}</IconStyle>           
            </ContainerStyle>
        </>
    )
}