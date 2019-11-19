import * as React from 'react'
import Icon from '@material-ui/core/Icon';
import { ContainerStyle, DropdownLabel, TitleContainer, Title, IconStyle, DropdownList, DropdownItem, DropdownIconStyle, DropdownItemText, SearchItem, SearchIconStyle, CloseIconButton} from './DropdownStyle';
import { DropdownProps, dropdownIcons, DropdownListType } from './DropdownTypes';
import { Text } from '../../Typography/Text';
import { useOutsideAlerter } from '../../../utils/utils';
import { Link } from 'react-router-dom';
import { Input } from '../Input/Input';

export const DropdownSingle: React.FC<DropdownProps> = React.forwardRef((props: DropdownProps, ref) => {

    const [isOpened, setOpen] = React.useState<boolean>(false);
    const dropdownListRef = React.useRef<HTMLUListElement>(null);
    const [selectedItem, setSelectedItem] = React.useState<string>('Select');
    const [itemsList, setItemsList] = React.useState<DropdownListType>(props.list);
    const [filteringList, setFilteringList] = React.useState<string>('');

    useOutsideAlerter(dropdownListRef, () => setOpen(!isOpened));

    React.useEffect(() => {
        if(selectedItem === 'Select') {
            setSelectedItem(props.defaultValue ? props.defaultValue.toString() : "Select")
        } 
    }, [props.defaultValue])
    React.useEffect(() => {}, [selectedItem])

    const handleClick = (name: string) => {
        setSelectedItem(name);
        if(props.callback && name !== "Select"){
            props.callback(name);
        }
    }

    const filterList = (filterString: string) => {
        const test = Object.keys(props.list).reduce(
            (reduced: DropdownListType, item: string) => {
                if(item.toLowerCase().includes(filterString.toLowerCase())){
                    return {...reduced, [item]: false}
                } 
                else{
                    return {...reduced, ["No option matching your selection"]: false}
                }
            }, {})
        setItemsList(test);
    }

    React.useEffect(() => filterList(filteringList), [filteringList])

    const renderList = () => {
        return (
            Object.keys(itemsList).map((name, key) => {
                return (
                    props.isNavigation ? 
                        <Link to={name} key={props.id + '_' + name} >
                            <DropdownItem                            
                                id={props.id + '_' + name} 
                                isSelected={selectedItem === name} 
                                onClick={() => handleClick(name)}> 
                                <DropdownItemText size={14} weight='reg' color={selectedItem === name ? 'dark-violet' : 'gray-1'}>{name}</DropdownItemText> {selectedItem === name ? <DropdownIconStyle><Icon fontSize="inherit">check</Icon></DropdownIconStyle> : null}
                            </DropdownItem>
                        </Link>               
                        : 
                        props.hasSearch  && key === 0 ?
                        <SearchItem 
                        key={props.id + '_search'} 
                        id={props.id + '_search'} 
                    > 
                        <SearchIconStyle>
                            <Icon>search</Icon>
                        </SearchIconStyle>

                        <Input
                            style={{border: 'none', backgroundColor:'white'}}
                            required={false}
                            placeholder='Search'
                            disabled={false}
                            className="col-12"
                            value={filteringList}
                            onChange={event => setFilteringList(event.currentTarget.value)}
                        />
                        {
                            filteringList.length > 0 ?
                                <CloseIconButton onClick={() => setFilteringList('')}><Icon>close</Icon></CloseIconButton>
                            : 
                            null
                        }
                    </SearchItem>
                            :
                            <DropdownItem 
                                key={props.id + '_' + name} 
                                id={props.id + '_' + name} 
                                isSelected={selectedItem === name} 
                                onClick={() => handleClick(name)}> 
                                <DropdownItemText size={14} weight='reg' color={selectedItem === name ? 'dark-violet' : 'gray-1'}>{name}</DropdownItemText> {selectedItem === name ? <DropdownIconStyle><Icon fontSize="inherit">check</Icon></DropdownIconStyle> : null}
                            </DropdownItem>
                )                
            })
        )
    }
    
    return (
        <ContainerStyle  {...props} >
            <DropdownLabel><Text size={14} weight="med">{props.dropdownTitle}</Text></DropdownLabel>
            <TitleContainer isNavigation={props.isNavigation} isOpened={isOpened} onClick={() => setOpen(!isOpened)}>
                <Title ref={ref} ><Text  size={14} weight='reg'>{selectedItem}</Text></Title>
                <IconStyle><Icon>{isOpened ? dropdownIcons.opened : dropdownIcons.closed}</Icon></IconStyle>
            </TitleContainer>
            <DropdownList isNavigation={props.isNavigation} displayDropdown={isOpened} ref={dropdownListRef}>
                {renderList()}
            </DropdownList>
        </ContainerStyle>
    );
})