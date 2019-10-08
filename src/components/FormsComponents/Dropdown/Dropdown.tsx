import * as React from 'react'
import Icon from '@material-ui/core/Icon';
import { InputCheckbox} from '../Input/InputCheckbox';
import { ContainerStyle, DropdownLabel, TitleContainer, Title, IconStyle, DropdownList, DropdownItem, DropdownIconStyle} from './DropdownStyle';
import { DropdownProps, DropdownListType } from './DropdownTypes';

export const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {

    /** Commun States/Ref */
    const [isOpened, setOpen] = React.useState<boolean>(false);
    const dropdownListRef = React.useRef<HTMLUListElement>(null);
    const [selectedItem, setSelectedItem] = React.useState<string>("Select");
    const [checkedCheckboxes, setCheckedCheckboxes] = React.useState<DropdownListType>( props.list );
    const [selectAllState, setSelectAllState] = React.useState<0 | 1 | 2>(0);

    React.useEffect(() => {
        props.dropdownType === "Multiple" ?  handleTitle() : null;
        handleSelectAllState();
    }, [checkedCheckboxes, selectedItem])

    const iconDropdownOpened = "arrow_drop_up";
    const iconDropdownClosed = "arrow_drop_down";

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
            setSelectAllState(0)
        } else if(checkedItems === Object.keys(props.list).length) {
            setSelectAllState(1)
        } else {
            setSelectAllState(2)
        }
    }

    const handleSelectAllChange = () => {
        if(selectAllState === 0 || selectAllState === 2) { 
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
                    props.dropdownType === 'Single' ?                 
                        <DropdownItem 
                            key={name} 
                            id={key.toString()+name} 
                            hasBottomBorder={false} 
                            isSelected={selectedItem === name} 
                            onClick={() => setSelectedItem(name)}> 
                            {name} {selectedItem === name ? <DropdownIconStyle><Icon>check</Icon></DropdownIconStyle> : null}
                        </DropdownItem>
                    : props.dropdownType === 'Multiple' ?
                    <>  
                        {key === 0 ?
                            <DropdownItem key={key+"selectAll"} hasBottomBorder={true} isSelected={false}  > 
                                <InputCheckbox 
                                    id={key+"SelectAll"} 
                                    label={"Select All"}
                                    indeterminate={selectAllState === 2}
                                    defaultChecked={selectAllState === 1}
                                    onChange={(e) => handleSelectAllChange()}/> 
                            </DropdownItem>
                        : null}
                        <DropdownItem key={key} hasBottomBorder={false} isSelected={false}  > 
                            <InputCheckbox 
                                id={key.toString()+name} 
                                label={name}
                                defaultChecked={checkedCheckboxes[name]}
                                onChange={(e) => handleCheckboxChange(name)}/> 
                        </DropdownItem>
                    </>
                    : null
                )                
            })
        )
    }
    
    return (
        <ContainerStyle {...props} >
            <DropdownLabel>{props.title}</DropdownLabel>
            <TitleContainer {...props} isOpened={isOpened} onClick={() => setOpen(!isOpened)}>
                <Title>{selectedItem}</Title>
                <IconStyle><Icon>{isOpened ? iconDropdownOpened : iconDropdownClosed}</Icon></IconStyle>
            </TitleContainer>
            <DropdownList displayDropdown={isOpened} ref={dropdownListRef}>
                {renderList()}
            </DropdownList>
        </ContainerStyle>
    );
}