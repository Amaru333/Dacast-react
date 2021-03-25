import * as React from 'react'
import { ContainerStyle, DropdownList, DropdownItem, DropdownItemText, ButtonContainer} from './DropdownStyle';
import { DropdownButtonProps, DropdownSingleListItem } from './DropdownTypes';
import { useOutsideAlerter } from '../../../utils/utils';

export const DropdownCustom: React.FC<DropdownButtonProps> = (props: DropdownButtonProps) => {

    const [isOpened, setOpen] = React.useState<boolean>(false);
    const dropdownListRef = React.useRef<HTMLUListElement>(null);
    const [selectedItem, setSelectedItem] = React.useState<string>(props.dropdownDefaultSelect ? props.dropdownDefaultSelect.title : null);

    useOutsideAlerter(dropdownListRef, () => {
        setOpen(!isOpened)
    });

    const handleClick = (item: DropdownSingleListItem) => {
        setSelectedItem(item.title);
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
                        className={key === 0 ? 'mt1' : ''}
                        isSelected={selectedItem === item.title} 
                        onClick={() => handleClick(item)}> 
                        <DropdownItemText size={14} weight='reg' color={selectedItem === item.title ? 'dark-violet' : 'gray-1'}>{item.title}</DropdownItemText>
                    </DropdownItem>
                )                
            })
        )
    }

    return (
        <ContainerStyle {...props}>
            <ButtonContainer disabled={false} backgroundColor={props.backgroundColor} style={{border: 0}} isOpened={isOpened} onClick={() => setOpen(!isOpened)}>
                {props.children}
            </ButtonContainer>
            <DropdownList hasSearch={false} style={{width: 100, left: -68}} isSingle isInModal isNavigation={false} displayDropdown={isOpened} ref={dropdownListRef}>
                {renderList()}
            </DropdownList>
        </ContainerStyle>
    )
}