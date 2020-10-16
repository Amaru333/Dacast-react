import * as React from 'react'
import Icon from '@material-ui/core/Icon';
import { ContainerStyle, DropdownLabel, TitleContainer, Title, DropdownList, DropdownItem, DropdownIconStyle, DropdownItemText, SearchItem, SearchIconStyle, CloseIconButton, ArrowIconStyle } from './DropdownStyle';
import { DropdownProps, dropdownIcons, DropdownListType, SingleDropdownListItem } from './DropdownTypes';
import { Text } from '../../Typography/Text';
import { useOutsideAlerter } from '../../../utils/utils';
import { Link } from 'react-router-dom';
import { Input } from '../Input/Input';
import { IconStyle } from '../../../shared/Common/Icon'
import { Tooltip } from '../../Tooltip/Tooltip';

export const DropdownSingle: React.FC<DropdownProps> = (props: DropdownProps) => {

    const [isOpened, setOpen] = React.useState<boolean>(false);
    const dropdownListRef = React.useRef<HTMLUListElement>(null);
    const [selectedItem, setSelectedItem] = React.useState<string>(props.defaultSelected ? props.defaultSelected : 'Select');
    const [itemsList, setItemsList] = React.useState<SingleDropdownListItem[]>(props.list);
    const [filteringList, setFilteringList] = React.useState<string>('');

    useOutsideAlerter(dropdownListRef, () => {
        isOpened &&  setOpen(false)
    });

    React.useEffect(() => {
        if (selectedItem === 'x' || props.dropdownDefaultSelect) {
            setSelectedItem(props.dropdownDefaultSelect ? props.dropdownDefaultSelect : "Select")
        }
    }, [props.dropdownDefaultSelect])


    React.useEffect(() => { setOpen(false) }, [selectedItem])

    const handleClick = (name: string) => {
        setSelectedItem(name);
        if (props.callback && name !== "Select") {
            props.callback(name);
        }
    }

    const filterList = (filterString: string) => {
        let test = props.list.filter(item => {
            return item.title.toLowerCase().indexOf(filterString.toLowerCase()) > -1
        })
        if (test.length === 0) {
            test = [{title: "No options macthing your selection"}]
        }
        setItemsList(test);
    }

    React.useEffect(() => filterList(filteringList), [filteringList])

    const renderList = () => {
        
        return (
            itemsList.map((item, key) => {
                return (
                    props.isNavigation ?
                        <Link to={item.title.toLowerCase()} key={props.id + '_' + item.title} >
                            <DropdownItem
                                isSingle
                                id={props.id + '_' + item.title}
                                isSelected={selectedItem === item.title}
                                onClick={() => handleClick(item.title)}>
                                <DropdownItemText size={14} weight='reg' color={selectedItem === item.title ? 'dark-violet' : 'gray-1'}>{item.title}</DropdownItemText> {selectedItem === item.title && <DropdownIconStyle><Icon fontSize="inherit">check</Icon></DropdownIconStyle>}
                            </DropdownItem>
                        </Link>
                        :
                        <DropdownItem
                            isSingle
                            key={props.id + '_' + item.title}
                            id={props.id + '_' + item.title}
                            className={key === 0 ? 'mt1' : ''}
                            isSelected={selectedItem === item.title}
                            onClick={() => handleClick(item.title)}>
                            <DropdownItemText size={14} weight='reg' color={selectedItem === item.title ? 'dark-violet' : 'gray-1'}>{item.title}</DropdownItemText> {selectedItem === item.title && <DropdownIconStyle><Icon fontSize="inherit">check</Icon></DropdownIconStyle>}
                        </DropdownItem>
                )
            })
        )
    }


    return (
        <ContainerStyle className={props.className}>
            {
                props.dropdownTitle !== '' && 
                    <DropdownLabel>
                        <Text size={14} weight="med">{props.dropdownTitle}</Text>
                        {
                            props.tooltip &&
                                <div>
                                    <IconStyle id={props.tooltip}>info_outlined</IconStyle>
                                    <Tooltip target={props.tooltip}>{props.tooltip}</Tooltip>
                                </div>
                        }
                    </DropdownLabel>                
            }
            <TitleContainer isWhiteBackground={props.isWhiteBackground} disabled={props.disabled} isNavigation={props.isNavigation} isOpened={isOpened} onClick={() =>  !isOpened && setOpen(true)}>
                <Title><Text color={props.disabled ? 'gray-5' : 'gray-1'} size={14} weight='reg'>{selectedItem}</Text></Title>
                <ArrowIconStyle disabled={props.disabled}><Icon >{isOpened ? dropdownIcons.opened : dropdownIcons.closed}</Icon></ArrowIconStyle>
            </TitleContainer>
            <div className="relative">
                <DropdownList direction={props.direction} isSingle isInModal={props.isInModal} isNavigation={props.isNavigation} displayDropdown={isOpened} ref={dropdownListRef} hasSearch={props.hasSearch}>
                    {
                        props.hasSearch &&
                            <SearchItem
                                key={props.id + '_search'}
                                id={props.id + '_search'}
                            >
                                <SearchIconStyle>
                                    <Icon>search</Icon>
                                </SearchIconStyle>

                                <Input
                                    style={{ border: 'none', backgroundColor: 'white' }}
                                    required={false}
                                    placeholder='Search'
                                    disabled={false}
                                    className="col-12"
                                    value={filteringList}
                                    onChange={event => setFilteringList(event.currentTarget.value)}
                                />
                                {
                                    filteringList.length > 0 &&
                                        <CloseIconButton onClick={() => setFilteringList('')}><Icon>close</Icon></CloseIconButton>
                                }
                            </SearchItem>
                    }
                    {
                        renderList()
                    }
                </DropdownList>
            </div>

        </ContainerStyle>
    );
}

DropdownSingle.defaultProps = { isInModal: false, direction: 'down' }