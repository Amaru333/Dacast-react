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

    React.useEffect(() => {
        if(props.dropdownDefaultSelect) {
            setSelectedItem(props.dropdownDefaultSelect)
        }
    }, [props.dropdownDefaultSelect])
    
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
            props.list && props.list.map((item, key) => {
                return (
                    <DropdownItem 
                        isSingle
                        style={{display: 'flex'}}
                        key={props.id + '_' + item.title} 
                        id={props.id + '_' + item.title} 
                        className={(key === 1 ? 'mt1' : '') + ' items-center'}
                        isSelected={selectedItem.title === item.title} 
                        onClick={() => handleClick(item)}> 
                        {
                            (item.data && item.data.img) &&
                            <img className='pr1' height={20} width={20} src={require(`../../../../public/assets/${item.data.img}.png`)} alt={item.data.img} />
                        }
                        <DropdownItemText className='pl2' size={12} weight='reg' color={selectedItem.title === item.title ? 'dark-violet' : 'gray-1'}>{item.title}</DropdownItemText>
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
                    <img className='pr1' height={20} width={20} src={require(`../../../../public/assets/${selectedItem.data.img}.png`)} alt={selectedItem.data.img} />
                }
                <Text size={12}>{selectedItem.title}</Text>
                { !props.disabled && <Icon>{isOpened ? dropdownIcons.opened : dropdownIcons.closed}</Icon> }
            </ButtonContainer>
            <DropdownList style={{position: 'static'}} hasSearch={false} isSingle isInModal isNavigation={false} displayDropdown={isOpened} ref={dropdownListRef}>
                {renderList()}
            </DropdownList>
        </ContainerStyle>
    )
}