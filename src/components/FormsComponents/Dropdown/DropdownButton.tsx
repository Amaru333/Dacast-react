import * as React from 'react'
import Icon from '@material-ui/core/Icon';
import { ContainerStyle, DropdownList, DropdownItem, DropdownItemText, ButtonContainer} from './DropdownStyle';
import { dropdownIcons, DropdownButtonProps } from './DropdownTypes';
import { useOutsideAlerter } from '../../../utils/utils';

export const DropdownButton: React.FC<DropdownButtonProps> = (props: DropdownButtonProps) => {

    const [isOpened, setOpen] = React.useState<boolean>(false);
    const dropdownListRef = React.useRef<HTMLUListElement>(null);
    const [selectedItem, setSelectedItem] = React.useState<string>(props.dropdownDefaultSelect ? props.dropdownDefaultSelect : props.list[0]);

    useOutsideAlerter(dropdownListRef, () => {
        setOpen(!isOpened)
    });
  
    React.useEffect(() => {setOpen(false)}, [selectedItem])

    const handleClick = (name: string) => {
        setSelectedItem(name);
        if(props.callback && name !== "Select"){
            props.callback(name);
        }
    }

    const renderList = () => {
        return (
            props.list.map((name, key) => {
                return (
                    <DropdownItem 
                        isSingle
                        key={props.id + '_' + name} 
                        id={props.id + '_' + name} 
                        className={key === 1 ? 'mt1' : ''}
                        isSelected={selectedItem === name} 
                        onClick={() => handleClick(name)}> 
                        <DropdownItemText size={14} weight='reg' color={selectedItem === name ? 'dark-violet' : 'gray-1'}>{name}</DropdownItemText>
                    </DropdownItem>
                )                
            })
        )
    }

    return (
        <ContainerStyle {...props}>
            <ButtonContainer isOpened={isOpened} onClick={() => setOpen(!isOpened)}>
                {selectedItem}
                <Icon>{isOpened ? dropdownIcons.opened : dropdownIcons.closed}</Icon>
            </ButtonContainer>
            <DropdownList style={{position: 'static'}} hasSearch={false} isSingle isInModal isNavigation={false} displayDropdown={isOpened} ref={dropdownListRef}>
                {renderList()}
            </DropdownList>
        </ContainerStyle>
    )
}