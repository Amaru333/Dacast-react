import * as React from 'react'
import Icon from '@material-ui/core/Icon';
import { ContainerStyle, DropdownLabel, TitleContainer, Title, IconStyle, DropdownList, DropdownItem, DropdownIconStyle, DropdownItemText} from './DropdownStyle';
import { DropdownProps, dropdownIcons } from './DropdownTypes';
import { Text } from '../../Typography/Text';
import { useOutsideAlerter } from '../../../utils/utils';
import { Link } from 'react-router-dom';
import { callbackify } from 'util';

export const DropdownSingle: React.FC<DropdownProps> = React.forwardRef((props: DropdownProps, ref) => {

    const [isOpened, setOpen] = React.useState<boolean>(false);
    const dropdownListRef = React.useRef<HTMLUListElement>(null);
    const [selectedItem, setSelectedItem] = React.useState<string>(props.isNavigation ? props.defaultValue.toString() : "Select");

    useOutsideAlerter(dropdownListRef, () => setOpen(!isOpened));

    React.useEffect(() => {}, [selectedItem])

    const handleClick = (name: string) => {
        setSelectedItem(name);
        if(props.callback && name !== "Select"){
            props.callback(name);
        }
    }

    const renderList = () => {
        let itemsList = props.list;
        return (
            Object.keys(itemsList).map((name) => {
                return (
                    props.isNavigation ? 
                        <Link to={name} key={props.id + '_' + name} >
                            <DropdownItem                            
                                id={props.id + '_' + name} 
                                isSelected={selectedItem === name} 
                                onClick={() => handleClick(name)}> 
                                <DropdownItemText size={14} weight='reg' color={selectedItem === name ? 'dark-violet' : 'gray-1'}>{name}</DropdownItemText> {selectedItem === name ? <DropdownIconStyle><Icon fontSize="inherit">check</Icon></DropdownIconStyle> : null}
                            </DropdownItem>
                        </Link>               
                        : 
                        <DropdownItem 
                            key={props.id + '_' + name} 
                            id={props.id + '_' + name} 
                            isSelected={selectedItem === name} 
                            onClick={() => handleClick(name)}> 
                            <DropdownItemText size={14} weight='reg' color={selectedItem === name ? 'dark-violet' : 'gray-1'}>{name}</DropdownItemText> {selectedItem === name ? <DropdownIconStyle><Icon fontSize="inherit">check</Icon></DropdownIconStyle> : null}
                        </DropdownItem>
                )                
            })
        )
    }
    
    return (
        <ContainerStyle  {...props} >
            <DropdownLabel><Text size={14} weight="med">{props.dropdownTitle}</Text></DropdownLabel>
            <TitleContainer isNavigation={props.isNavigation} isOpened={isOpened} onClick={() => setOpen(!isOpened)}>
                <Title ref={ref} ><Text  size={14} weight='reg'>{selectedItem}</Text></Title>
                <IconStyle><Icon>{isOpened ? dropdownIcons.opened : dropdownIcons.closed}</Icon></IconStyle>
            </TitleContainer>
            <DropdownList isNavigation={props.isNavigation} displayDropdown={isOpened} ref={dropdownListRef}>
                {renderList()}
            </DropdownList>
        </ContainerStyle>
    );
})