import * as React from "react";
import { Text } from '../../components/Typography/Text';
import { Icon } from '@material-ui/core';
import { Link } from 'react-router-dom'
import {MainMenuProps, ElementMenuProps, Routes } from './NavigationTypes'
import { ContainerStyle, ImageStyle, SectionStyle, SectionTitle, ButtonMenuStyle, BreakStyle, ContainerElementStyle, IconStyle} from './NavigationStyle'
const logo = require('../../../public/assets/logo.png');

const ElementMenu: React.FC<ElementMenuProps> = (props: ElementMenuProps) => {

    return (
        <ContainerElementStyle {...props} >
            <IconStyle className="noTransition"><Icon className="noTransition">{props.icon}</Icon></IconStyle>
            <Text size={14} weight="reg" > {props.children} </Text>
        </ContainerElementStyle>
    )
}
​
ElementMenu.defaultProps = {active: false}

export const MainMenu: React.FC<MainMenuProps> = (props: MainMenuProps) => {
​
    const [selectedElement, setSelectedElement] = React.useState<string>(props.routes[0].name);
    React.useEffect(() => {}, []);

    const renderMenu = () => {
        return props.routes.map((element, i) => {
            if(element.path === 'break') {
               return  <BreakStyle key={i} />
            }
            else if(element.path === 'title') {
                return <SectionTitle key={i} size={14} weight="med" color="gray-3">{element.name}</SectionTitle>
            }
            else {
                return (
                    <Link to={element.path} onClick={() => setSelectedElement(element.name)} key={i} >
                    <ElementMenu active={selectedElement === element.name} icon={element.iconName!}>
                        {element.name} 
                    </ElementMenu>
                </Link>
                )
            }
        })
    }

​
    return (
        <ContainerStyle {...props} >
            <ImageStyle className="mx-auto" src={logo} />
            <BreakStyle />
            <ButtonMenuStyle className="mx-auto" sizeButton="large" typeButton="primary" >Add +</ButtonMenuStyle>
            <SectionStyle>
                {renderMenu()}
            </SectionStyle>
        </ContainerStyle>
    )
}
MainMenu.defaultProps = {}
