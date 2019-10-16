import * as React from 'react'
import Icon from '@material-ui/core/Icon';
import { ContainerStyle, DropdownLabel, TitleContainer, Title, IconStyle, DropdownList, DropdownItem, DropdownIconStyle} from './DropdownStyle';
import { DropdownProps, dropdownIcons } from './DropdownTypes';
import { Text } from '../../Typography/Text';
import { useOutsideAlerter } from '../../../utils/utils';

export const DropdownSingle: React.FC<DropdownProps> = (props: DropdownProps) => {

    const [isOpened, setOpen] = React.useState<boolean>(false);
    const dropdownListRef = React.useRef<HTMLUListElement>(null);
    const [selectedItem, setSelectedItem] = React.useState<string>("Select");

    useOutsideAlerter(dropdownListRef, () => setOpen(!isOpened));

    React.useEffect(() => {}, [selectedItem])

    const renderList = () => {
        let itemsList = props.list;
        return (
            Object.keys(itemsList).map((name) => {
                return (               
                    <DropdownItem 
                        key={props.id + '_' + name} 
                        id={props.id + '_' + name} 
                        isSelected={selectedItem === name} 
                        onClick={() => setSelectedItem(name)}> 
                        <Text size={14} weight='reg' color={selectedItem === name ? 'dark-violet' : 'gray-1'}>{name}</Text> {selectedItem === name ? <DropdownIconStyle><Icon>check</Icon></DropdownIconStyle> : null}
                    </DropdownItem>
                )                
            })
        )
    }
    
    return (
        <ContainerStyle {...props} >
            <DropdownLabel><Text size={14} weight="med">{props.dropdownTitle}</Text></DropdownLabel>
            <TitleContainer {...props} isOpened={isOpened} onClick={() => setOpen(!isOpened)}>
                <Title><Text size={14} weight='reg'>{selectedItem}</Text></Title>
                <IconStyle><Icon>{isOpened ? dropdownIcons.opened : dropdownIcons.closed}</Icon></IconStyle>
            </TitleContainer>
            <DropdownList displayDropdown={isOpened} ref={dropdownListRef}>
                {renderList()}
            </DropdownList>
        </ContainerStyle>
    );
}