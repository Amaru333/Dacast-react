import * as React from "react";
import { Text } from '../../components/Typography/Text';
import { Icon } from '@material-ui/core';
import { Link } from 'react-router-dom'
import {MainMenuProps, ElementMenuProps } from './NavigationTypes'
import { ContainerStyle, ImageStyle, SectionStyle, SectionTitle, ButtonMenuStyle, BreakStyle, ContainerElementStyle, IconStyle, OverlayMobileStyle} from './NavigationStyle'
const logo = require('../../../public/assets/logo.png');
const logoSmall = require('../../../public/assets/logo_small.png');


const ElementMenu: React.FC<ElementMenuProps> = (props: ElementMenuProps) => {

    return (
        <ContainerElementStyle {...props} >
            <IconStyle className="noTransition"><Icon className="noTransition">{props.icon}</Icon></IconStyle>
            <Text hidden={!props.isOpen && !props.isMobile} size={14} weight="reg" > {props.children} </Text>
        </ContainerElementStyle>
    )
}

export const MainMenu: React.FC<MainMenuProps> = (props: MainMenuProps) => {
    const firstSelectedItem = () => {
        let item = props.routes.find((element) => {
            return props.history.location.pathname.includes(element.path)
        })
        return item ? item.name : props.routes[0].name;
    };
    const [selectedElement, setSelectedElement] = React.useState<string>(firstSelectedItem());

    const renderMenu = () => {
        return props.routes.map((element, i) => {
            if(element.path === 'break') {
                return  <BreakStyle key={i} />
            }
            else if(element.path === 'title') {
                return props.isOpen ? <SectionTitle key={i} size={14} weight="med" color="gray-3">{element.name}</SectionTitle> : null
            }
            else{
                return (
                    <Link to={element.path} onClick={() => setSelectedElement(element.name)} key={i} >
                        <ElementMenu isMobile={props.isMobile} isOpen={props.isOpen} active={selectedElement === element.name} icon={element.iconName!}>
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
        <ContainerStyle isOpen={props.isOpen} {...props} >
            <ImageStyle className="mx-auto" src={!props.isOpen && !props.isMobile ? logoSmall : logo} />
            <BreakStyle />
            <ButtonMenuStyle className="mx-auto" sizeButton="large" typeButton="primary" >{props.isOpen ? "Add ": ""}+</ButtonMenuStyle>
            <SectionStyle>
                {renderMenu()}
            </SectionStyle>
            <Icon onClick={() => props.setOpen(!props.isOpen)} className="ml-auto mt-auto mr2 mb2" >{props.isOpen? "arrow_back" : 'arrow_forward'}</Icon>
        </ContainerStyle>
        </>
    )
}
MainMenu.defaultProps = {};
