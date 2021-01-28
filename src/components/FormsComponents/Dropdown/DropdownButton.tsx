import * as React from 'react'
import Icon from '@material-ui/core/Icon';
import { ContainerStyle, DropdownList, DropdownItem, DropdownItemText, ButtonContainer} from './DropdownStyle';
import { dropdownIcons, DropdownButtonProps, DropdownSingleListItem } from './DropdownTypes';
import { useOutsideAlerter } from '../../../utils/utils';
import {Text} from '../../Typography/Text'

export const DropdownButton: React.FC<DropdownButtonProps> = (props: DropdownButtonProps) => {

    const [isOpened, setOpen] = React.useState<boolean>(false);
    const dropdownListRef = React.useRef<HTMLUListElement>(null);
    const [selectedItem, setSelectedItem] = React.useState<DropdownSingleListItem>(props.dropdownDefaultSelect || props.list[0]);

    useOutsideAlerter(dropdownListRef, () => {
        setOpen(!isOpened)
    });
  
    const handleClick = (item: DropdownSingleListItem) => {
        setSelectedItem(item);
        if(props.callback && item.title !== "Select"){
            props.callback(item);
        }
        setOpen(false)
    }

    const renderList = () => {
        return (
            props.list.map((item, key) => {
                return (
                    <DropdownItem 
                        isSingle
                        key={props.id + '_' + item.title} 
                        id={props.id + '_' + item.title} 
                        className={key === 1 ? 'mt1' : ''}
                        isSelected={selectedItem.title === item.title} 
                        onClick={() => handleClick(item)}> 
                        {
                            (item.data && item.data.img) &&
                            <img src={item.data.img} alt={item.data.img} />
                        }
                        <DropdownItemText size={12} weight='reg' color={selectedItem.title === item.title ? 'dark-violet' : 'gray-1'}>{item.title}</DropdownItemText>
                    </DropdownItem>
                )
            })
        )
    }

    return (
        <ContainerStyle {...props}>
            <ButtonContainer backgroundColor={props.backgroundColor} disabled={props.disabled} isOpened={isOpened} onClick={() => setOpen(!isOpened)}>
                {
                    (selectedItem.data && selectedItem.data.img) &&
                    <img src={selectedItem.data.img} alt={selectedItem.data.img} />
                }
                <Text size={12}>{selectedItem}</Text>
                { !props.disabled && <Icon>{isOpened ? dropdownIcons.opened : dropdownIcons.closed}</Icon> }
            </ButtonContainer>
            <DropdownList style={{position: 'static'}} hasSearch={false} isSingle isInModal isNavigation={false} displayDropdown={isOpened} ref={dropdownListRef}>
                {renderList()}
            </DropdownList>
        </ContainerStyle>
    )
}