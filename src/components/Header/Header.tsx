import * as React from "react"
import Icon from '@material-ui/core/Icon';
import { HeaderStyle, IconContainerStyle, HeaderIconStyle, VerticalDivider } from './HeaderStyle';
import Burger from '../../containers/Navigation/Burger';
import { Text } from '../../components/Typography/Text';
import { ApplicationState } from '../../redux-flow/store';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from '../../pages/Folders/Breadcrumb';
import { Button } from '../FormsComponents/Button/Button';

export interface HeaderProps {
    isOpen: boolean;
    setOpen: Function;
    isMobile: boolean;
    title: string;
}

const Header = (props: HeaderProps) => {
    let location = useLocation()
    const [breadcrumbItems, setBreadcrumbItems] = React.useState<string[]>([])

    React.useEffect(() => {
        setBreadcrumbItems(location.pathname.split('/').filter((f: string )=> f))
    }, [location])
    return (
        <HeaderStyle>
            {props.isMobile ? <Burger isOpen={props.isOpen} onClick={() => props.setOpen(!props.isOpen)} /> : null}
            {/* <Text className="mr-auto ml2" color="gray-1" size={14} weight="med" >{props.title}</Text> */}
            <div className="mr-auto ml2" >
                <Breadcrumb isNavigation options={location.pathname + '/'} callback={() => {}}/>
            </div>          
            <IconContainerStyle>
                <HeaderIconStyle onClick={() => {location.href="/help"}}><Icon>help</Icon></HeaderIconStyle>
                <HeaderIconStyle><Icon>account_circle</Icon></HeaderIconStyle>
            </IconContainerStyle>
            <VerticalDivider />
            <Button className="mr2" sizeButton="xs" typeButton="secondary">Upgrade</Button>
        </HeaderStyle>
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        title: state.title
    };
}



export default connect(mapStateToProps, null)(Header); 