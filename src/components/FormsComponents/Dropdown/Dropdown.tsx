import * as React from 'react'
import Icon from '@material-ui/core/Icon';
import { InputCheckbox} from '../Input/InputCheckbox';
import { ContainerStyle, DropdownLabel, TitleContainer, Title, IconStyle, DropdownList, DropdownItem, DropdownIconStyle} from './DropdownStyle';
import { DropdownProps } from './DropdownTypes';

export const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
    const [isOpened, setOpen] = React.useState<boolean>(false);
    const dropdownListRef = React.useRef<HTMLUListElement>(null);
    //No, the first item is not pick by default, it's not even checked visually. 
    //We can see "1 item selected" or 'item1' but it should be a props or something else"
    const [selectedItem, setSelectedItem] = React.useState<string>(props.dropdownType !== 'Search' ? props.list[0] : "placeholder");
    const [checkedCheckboxes, setCheckedCheckboxes] = React.useState<Array<string>>([]);
    const [selectAll, setSelectAll] = React.useState<string>("none");

    React.useEffect(() => {
        handleMultiTitle();
    }, [selectAll, checkedCheckboxes, selectedItem])

    const iconDropdownOpened = "arrow_drop_up";
    const iconDropdownClosed = "arrow_drop_down";

    const clickOutside = () => {
        setOpen(false)
    }

    const handleMultiTitle = () => {
       if(props.dropdownType === "Multiple") {
            console.log(checkedCheckboxes);
            const selectedItemLabel = checkedCheckboxes.length === 0 ? selectedItem : checkedCheckboxes.length === 1 ? checkedCheckboxes.length + " item selected" : checkedCheckboxes.length + " items selected";
            setSelectedItem(selectedItemLabel);
        }
    }

    const handleCheckboxChange = (e: React.FormEvent<HTMLInputElement>, item: string) => {
        let tempArray = checkedCheckboxes;
        const propsList = props.list.filter(item => item !== "Select all")
        
        if(e.currentTarget.checked) {
            if(item === "Select all") {
                tempArray = propsList;
            } else { 
                if(!tempArray.includes(item)) {
                    tempArray.push(item);
                }
            }
        }
        else { 
            if(item === "Select all") { 
                tempArray = [] 
            }
            else{
                tempArray = tempArray.filter(checkbox => checkbox !== item) 
            }

        }

        if(tempArray.length === propsList.length) {
            setSelectAll("all")
        }
        else if(tempArray.length === 0) {
            setSelectAll("none")
        }
        else {
            setSelectAll("indeterminate")
        }
        console.log(tempArray);
        setCheckedCheckboxes(tempArray);
    }

    const handleDefaultChecked = (item: string) => {
        if(selectAll === "all") {
            return true;
        }
        else {
            if(checkedCheckboxes.includes(item)) {
                return true
            }
            return false;
        }
    }

    const handleIndeterminate = (item: string) => {
        if(selectAll === "indeterminate" && item === "Select all") {
            return true;
        }
        else {
            return false;
        }
    }


    const renderList = () => {
        let itemsList = props.list;
        if(props.dropdownType === "Multiple" && itemsList.indexOf("Select all") === -1) {
            itemsList.unshift("Select all");
        }
        return (
            itemsList.map((item, i) => {
                return (
                    props.dropdownType === 'Single' ?                 
                    <DropdownItem key={i} id={i.toString()+'Single'} hasBottomBorder={false} isSelected={selectedItem === item} onClick={() => setSelectedItem(item)}> 
                        {item} {selectedItem === item ? <DropdownIconStyle><Icon>check</Icon></DropdownIconStyle> : null}
                    </DropdownItem>
                    : props.dropdownType === 'Multiple' ?
                    <DropdownItem key={i} hasBottomBorder={item === "Select all"} isSelected={false}  > 
                        <InputCheckbox 
                            id={i.toString()} 
                            label={item}
                            indeterminate={handleIndeterminate(item)}
                            defaultChecked={handleDefaultChecked(item)}
                            onChange={(e) => handleCheckboxChange(e, item)}/> 
                    </DropdownItem>
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

const useDetectClickOutside = (ref: React.RefObject<HTMLUListElement>, callback: Function) => {

    const handleClickOutside: any = (event: React.MouseEvent<HTMLElement>) => {
        if (ref.current && !ref.current.contains(event.currentTarget)) {
          callback()
        }
    }
  
    React.useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
}