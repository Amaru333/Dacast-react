import * as React from 'react'
import { ContainerStyle, DropdownList, DropdownItem, DropdownItemText, ButtonContainer} from './DropdownStyle';
import { DropdownButtonProps } from './DropdownTypes';
import { useOutsideAlerter } from '../../../utils/utils';

export const DropdownCustom: React.FC<DropdownButtonProps> = (props: DropdownButtonProps) => {

    const [isOpened, setOpen] = React.useState<boolean>(false);
    const dropdownListRef = React.useRef<HTMLUListElement>(null);
    const [selectedItem, setSelectedItem] = React.useState<string>(null);

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
            <ButtonContainer backgroundColor={props.backgroundColor} style={{border: 0}} isOpened={isOpened} onClick={() => setOpen(!isOpened)}>
                {props.children}
            </ButtonContainer>
            <DropdownList hasSearch={false} style={{width: 100, left: -68}} isSingle isInModal isNavigation={false} displayDropdown={isOpened} ref={dropdownListRef}>
                {renderList()}
            </DropdownList>
        </ContainerStyle>
    )
}