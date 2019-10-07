import * as React from 'react'
import Icon from '@material-ui/core/Icon';
import { InputCheckbox} from '../Input/InputCheckbox';
import { ContainerStyle, DropdownLabel, TitleContainer, Title, IconStyle, DropdownList, DropdownItem, DropdownIconStyle} from './DropdownStyle';
import { DropdownProps } from './DropdownTypes';

export const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
    const [isOpened, setOpen] = React.useState<boolean>(false);
    const dropdownListRef = React.useRef<HTMLUListElement>(null);
    const [selectedItem, setSelectedItem] = React.useState<string>(props.dropdownType !== 'Search' ? props.list[0] : "placeholder");
    const [checkedCheckboxes, setCheckedCheckboxes] = React.useState<Array<number>>([]);

    const iconDropdownOpened = "arrow_drop_up";
    const iconDropdownClosed = "arrow_drop_down";

    const clickOutside = () => {
        setOpen(false)
    }

    const handleMultiTitle = () => {
        return checkedCheckboxes.length === 0 ? selectedItem : checkedCheckboxes.length === 1 ? checkedCheckboxes.length + " item selected" : checkedCheckboxes.length + " items selected";
    }

    const handleCheckboxChange = (e: React.FormEvent<HTMLInputElement>, id: number) => {
        let tempArray = checkedCheckboxes;
        if(e.currentTarget.checked) {
            if(id === 0) {
                tempArray = [];
                tempArray = props.list.map((item, i) => {
                    return tempArray.push(i + 1)
                })
                tempArray.pop();
            }
            else {
                tempArray.push(id);
            }
        }
        else {
            if(id === 0) {
                tempArray = []
            }
            tempArray = tempArray.filter(item => item !== id)
        }
        console.log(tempArray);
        setCheckedCheckboxes(tempArray)
    }

    //useDetectClickOutside(dropdownListRef, clickOutside);
    const renderList = () => {
        let itemsList = props.list;
        console.log(itemsList);
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
                            label={item}/> 
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
                <Title>{props.dropdownType === 'Multiple' ? handleMultiTitle() : selectedItem}</Title>
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