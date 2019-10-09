import * as React from 'react'
import Icon from '@material-ui/core/Icon';
import { InputCheckbox} from '../Input/InputCheckbox';
import { ContainerStyle, DropdownLabel, TitleContainer, Title, IconStyle, DropdownList, DropdownItem, BorderItem } from './DropdownStyle';
import { DropdownProps, DropdownListType , dropdownIcons} from './DropdownTypes';
import { Text } from '../../Typography/Text';

export const DropdownCheckbox: React.FC<DropdownProps> = (props: DropdownProps) => {

    /** Commun States/Ref */
    const [isOpened, setOpen] = React.useState<boolean>(false);
    const dropdownListRef = React.useRef<HTMLUListElement>(null);
    const [selectedItem, setSelectedItem] = React.useState<string>("Select");
    const [checkedCheckboxes, setCheckedCheckboxes] = React.useState<DropdownListType>( props.list );
    const [selectAllState, setSelectAllState] = React.useState<'unchecked' | 'checked' | 'undeterminate'>('unchecked');

    React.useEffect(() => {
        handleTitle();
        handleSelectAllState();
    }, [checkedCheckboxes, selectedItem])

    const handleTitle = () => {
        const numberChecked = Object.keys(checkedCheckboxes).filter(name => checkedCheckboxes[name]).length;
        if(numberChecked > 1) {
            setSelectedItem(numberChecked+" items selected.")
        } else if (numberChecked == 1) {
            setSelectedItem(Object.keys(checkedCheckboxes).filter(name => checkedCheckboxes[name] )[0] );
        } else {
            setSelectedItem("Select")
        }
    }

    const handleSelectAllState = () => {
        var checkedItems = Object.keys(checkedCheckboxes).filter(name => checkedCheckboxes[name]).length;
        if(checkedItems === 0) {
            setSelectAllState('unchecked')
        } else if(checkedItems === Object.keys(props.list).length) {
            setSelectAllState('checked')
        } else {
            setSelectAllState('undeterminate')
        }
    }

    const handleSelectAllChange = () => {
        if(selectAllState === 'unchecked' || selectAllState === 'undeterminate') { 
            setCheckedCheckboxes({
                ...Object.keys(checkedCheckboxes).reduce((reduced, key) => ({ ...reduced, [key]: true }), {})
              })
        } else {
            setCheckedCheckboxes({
                ...Object.keys(checkedCheckboxes).reduce((reduced, key) => ({ ...reduced, [key]: false }), {})
              })
        }
    }

    const handleCheckboxChange = (item: string) => {
        setCheckedCheckboxes( {...checkedCheckboxes, [item]: !checkedCheckboxes[item]} )
    }

    const renderList = () => {
        let itemsList = props.list;
        return (
            Object.keys(itemsList).map((name, key) => {
                return (
                    <>  
                        {key === 0 ?
                            <>
                                <DropdownItem key={key+"selectAll"} isSelected={false}> 
                                    <InputCheckbox 
                                        id={props.id + '_SelectAll'} 
                                        label={"Select All"}
                                        labelWeight="med"
                                        indeterminate={selectAllState === 'undeterminate'}
                                        defaultChecked={selectAllState === 'checked'}
                                        onChange={() => handleSelectAllChange()}/> 
                                </DropdownItem>
                                <BorderItem />
                            </>
                        : null}
                        <DropdownItem key={props.id + '_' + name} isSelected={false}  > 
                            <InputCheckbox 
                                id={props.id + '_' + name} 
                                label={name}
                                labelWeight="reg"
                                defaultChecked={checkedCheckboxes[name]}
                                onChange={() => handleCheckboxChange(name)}/> 
                        </DropdownItem>
                    </>
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