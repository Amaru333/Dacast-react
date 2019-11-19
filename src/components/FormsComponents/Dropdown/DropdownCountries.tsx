import * as React from 'react'
import Icon from '@material-ui/core/Icon';
import { InputCheckbox} from '../Input/InputCheckbox';
import { ContainerStyle, DropdownLabel, TitleContainer, Title, IconStyle, DropdownList, DropdownItem, BorderItem, ButtonIconStyle, ContinentContainer, CountryContainer, SearchItem, SearchIconStyle, CloseIconButton } from './DropdownStyle';
import { DropdownProps , dropdownIcons, ContinentListType} from './DropdownTypes';
import { Text } from '../../Typography/Text';
import { useOutsideAlerter } from '../../../utils/utils';
import { Input } from '../Input/Input';

export const DropdownCountries: React.FC<DropdownProps> = (props: DropdownProps) => {

    const ContinentsList: ContinentListType = {
        'Africa': {
            countries: {
                "Morocco": {isChecked: false, isFiltered: false},
                "Tunisia": {isChecked: false, isFiltered: false},
                "South Africa": {isChecked: false, isFiltered: false},
                "Egypt": {isChecked: false, isFiltered: false},
            },
            checked: 'unchecked'
        },
        'Europe': {
            'countries': {
                "France": {isChecked: false, isFiltered: false},
                "United-Kingdom": {isChecked: false, isFiltered: false},
                "Spain": {isChecked: false, isFiltered: false},
                "Italy": {isChecked: false, isFiltered: false},
            },
            checked: 'unchecked'
        },
        'America': {
            countries: {
                "Argentina": {isChecked: false, isFiltered: false},
                "Brazil": {isChecked: false, isFiltered: false},
                "Ecuador": {isChecked: false, isFiltered: false},
                "Chile": {isChecked: false, isFiltered: false},
            },
            checked: 'unchecked'
        },
    }
    /** Commun States/Ref */
    const [isOpened, setOpen] = React.useState<boolean>(false);
    const dropdownListRef = React.useRef<HTMLUListElement>(null);
    const [selectedItem, setSelectedItem] = React.useState<string>("Select");
    const [toggleContinent, setToggleContinent] = React.useState<{[key:string]: boolean}>({...Object.keys(ContinentsList).reduce((reduced, continent) => ({...reduced, [continent]: false}), {})})
    const [checkedContinents, setCheckedContinents] = React.useState<ContinentListType>( ContinentsList );
    const [selectAllState, setSelectAllState] = React.useState<'unchecked' | 'checked' | 'undeterminate'>('unchecked');
    const [filteringList, setFilteringList] = React.useState<string>('')

    useOutsideAlerter(dropdownListRef, () => setOpen(!isOpened));

    const handleTitle = () => {
        let title = '';
        let counter = 0
        Object.keys(checkedContinents).map((continent) => {
            if(checkedContinents[continent].checked === 'checked' && counter < 3) {
                title += counter === 0 ? continent : ', ' + continent;
                counter++
            }
            else if(checkedContinents[continent].checked === 'undeterminate' && counter < 3) {
                Object.keys(checkedContinents[continent].countries).map((country) => {
                    if(checkedContinents[continent].countries[country].isChecked && counter < 3) {
                        title += counter === 0 ? country : ', ' + country;
                        counter++;
                    }
                    else if(counter === 3) {
                        title += ' and 3 more...';
                        counter++;
                        return;
                    }
                    else {
                        return;
                    }
                })
            }
            else if(counter === 3) {
                title += ' and 3 more...';
                counter++;
                return;
            }
            else {
                return;
            }
        })
        title = title.length === 0 ? 'Select' : title;
        setSelectedItem(title);
    }

    const handleSelectAllState = () => {
        if(Object.keys(checkedContinents).filter(continent => checkedContinents[continent].checked === 'unchecked').length === Object.keys(checkedContinents).length) {
            setSelectAllState('unchecked')
        } else if(Object.keys(checkedContinents).filter(continent => checkedContinents[continent].checked === 'checked').length === Object.keys(checkedContinents).length) {
            setSelectAllState('checked')
        }
        else {
            setSelectAllState('undeterminate')  
        }
    }

    const handleContinentState = (continent: string, continents: ContinentListType) => {
        const checkedCountries = Object.keys(continents[continent].countries).filter(country => continents[continent].countries[country].isChecked && !continents[continent].countries[country].isFiltered).length;
        if(checkedCountries === 0) {
            return 'unchecked'
        } else if(checkedCountries === Object.keys(continents[continent].countries).filter(country => !continents[continent].countries[country].isFiltered).length) {
            return 'checked'
        } else {
            return 'undeterminate'
        }

    }
    
    React.useEffect(() => {
        handleTitle();
        handleSelectAllState();
    }, [checkedContinents, selectedItem])


    const handleSelectAllChange = () => {
        if(selectAllState === 'unchecked' || selectAllState === 'undeterminate') {
            let continents = checkedContinents
            Object.keys(continents).forEach((continent) => {
                continents[continent] = {countries: {...Object.keys(continents[continent].countries).reduce((reduced, key) => ({ ...reduced, [key]: {...checkedContinents[continent].countries[key], isChecked: true} }), {})}, checked: 'checked'}
            })
            setCheckedContinents({...continents})
        } else {
            let continents = checkedContinents
            Object.keys(continents).forEach((continent) => {
                continents[continent] = {countries: {...Object.keys(continents[continent].countries).reduce((reduced, key) => ({ ...reduced, [key]: {...checkedContinents[continent].countries[key], isChecked: false} }), {})}, checked: 'unchecked'}
            })
            setCheckedContinents({...continents})
        }
    }

    const filterList = (filteringString: string) => {

        let continents = checkedContinents
        Object.keys(continents).forEach((continent) => {
            continents[continent] = {
                countries: {...Object.keys(continents[continent].countries).reduce((reduced, key) => {
                    if(key.toLowerCase().includes(filteringString.toLowerCase()) && filteringString.toLowerCase() !== continent.toLowerCase()) {
                        return {...reduced, [key]: {...checkedContinents[continent].countries[key], isFiltered: false}}
                    }
                    else if(!key.toLowerCase().includes(filteringString.toLowerCase()) && filteringString.toLowerCase() !== continent.toLowerCase()){
                        return {...reduced, [key]: {...checkedContinents[continent].countries[key], isFiltered: true}}
                    }
                    else if(!key.toLowerCase().includes(filteringString.toLowerCase()) && filteringString.toLowerCase() === continent.toLowerCase()){
                        return {...reduced, [key]: {...checkedContinents[continent].countries[key], isFiltered: false}}
                    } 
                    else {
                        return {...reduced, [key]: {...checkedContinents[continent].countries[key]}}
                    }
                }, {})}
                , checked: checkedContinents[continent].checked
            }
            continents[continent].checked = handleContinentState(continent, continents)

        })
        setCheckedContinents({...continents})

    }

    React.useEffect(() => filterList(filteringList), [filteringList])


    const handleContinentCheckboxChange = (continent: string) => {

        if(checkedContinents[continent].checked === 'unchecked' || checkedContinents[continent].checked === 'undeterminate') { 
            let changingContinent = checkedContinents[continent];
            changingContinent = {countries: {...Object.keys(checkedContinents[continent].countries).reduce((reduced, key) => {
                if(!checkedContinents[continent].countries[key].isFiltered) {
                    return {...reduced, [key]: {...checkedContinents[continent].countries[key], isChecked: true}}
                }
                else {
                    return {...reduced, [key]: {...checkedContinents[continent].countries[key]}} 
                }
                  }, {})}, checked: 'checked'}
            setCheckedContinents( {...checkedContinents, [continent]: changingContinent} )

        } else {
            let changingContinent = checkedContinents[continent];
            changingContinent = {countries: {...Object.keys(checkedContinents[continent].countries).reduce((reduced, key) => {
                if(!checkedContinents[continent].countries[key].isFiltered) {
                    return {...reduced, [key]: {...checkedContinents[continent].countries[key], isChecked: false}}
                }
                else {
                    return {...reduced, [key]: {...checkedContinents[continent].countries[key]}} 
                }
                
                }, {})}, checked: 'unchecked'}
            setCheckedContinents( {...checkedContinents, [continent]: changingContinent} )
        }
    }

    const handleCheckboxCountryChange = (continent: string, country: string) => {
        let changingContinent = checkedContinents;
        changingContinent[continent].countries[country].isChecked = !changingContinent[continent].countries[country].isChecked
        var checkedCountries = Object.keys(changingContinent[continent].countries).filter(country => checkedContinents[continent].countries[country].isChecked && !checkedContinents[continent].countries[country].isFiltered).length;
        if(checkedCountries === 0) {
            changingContinent[continent].checked = 'unchecked'
        }
        else if (checkedCountries === Object.keys(changingContinent[continent].countries).length) {
            changingContinent[continent].checked = 'checked'
        }
        else {
            changingContinent[continent].checked = 'undeterminate'
        }
        setCheckedContinents( {...changingContinent} )
    }


    const renderList = () => {
        return (
            Object.keys(ContinentsList).map((continent, key) => {
                return (
                    <>  
                        {key === 0 ?
                            <>
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
                                <DropdownItem key={key+"selectAllcountries"} isSelected={false}> 
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
                        <DropdownItem style={{paddingLeft: '4px'}} key={props.id + '_' + continent + key.toString()} isSelected={false}  >
                            <ContinentContainer isDisplayed={Object.keys(checkedContinents[continent].countries).filter(country => !checkedContinents[continent].countries[country].isFiltered).length === 0}>
                            <ButtonIconStyle onClick={() => setToggleContinent({...toggleContinent, [continent]: !toggleContinent[continent]})}>
                                <Icon>{toggleContinent[continent] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</Icon>
                            </ButtonIconStyle>
                            <InputCheckbox 
                                id={props.id + '_' + continent} 
                                label={continent}
                                labelWeight="reg"
                                indeterminate={checkedContinents[continent].checked === 'undeterminate'}
                                defaultChecked={checkedContinents[continent].checked === 'checked'}
                                onChange={() => handleContinentCheckboxChange(continent)}/> 
                            </ContinentContainer> 

                        </DropdownItem>
                            {
                                Object.keys(ContinentsList[continent].countries).map((country, key) => {
                                    
                                    return (
                                        <CountryContainer isDisplayed={toggleContinent[continent]}>
                                            { 
                                                !checkedContinents[continent].countries[country].isFiltered ?
                                                <DropdownItem  className='ml3' key={props.id + '_' + continent + '_' + country + key.toString()} isSelected={false}  > 
                                                    <InputCheckbox 
                                                        id={props.id + '_' + continent + '_' + country} 
                                                        label={country}
                                                        labelWeight="reg"
                                                        defaultChecked={checkedContinents[continent].countries[country].isChecked}
                                                        onChange={() => handleCheckboxCountryChange(continent, country)}/> 
                                                </DropdownItem>
                                                : 
                                                null

                                            }

                                        </CountryContainer>

                                    )
                                })
                            }
                    </>
                )                
            })
        )
    }
    
    return (
        <ContainerStyle {...props} >
            <DropdownLabel><Text size={14} weight="med">{props.dropdownTitle}</Text></DropdownLabel>
            <TitleContainer isNavigation={false} {...props} isOpened={isOpened} onClick={() => setOpen(!isOpened)}>
                <Title ref={null}><Text size={14} weight='reg'>{selectedItem}</Text></Title>
                <IconStyle><Icon>{isOpened ? dropdownIcons.opened : dropdownIcons.closed}</Icon></IconStyle>
            </TitleContainer>
            <DropdownList isNavigation={false} displayDropdown={isOpened} ref={dropdownListRef}>
                {renderList()}
            </DropdownList>
        </ContainerStyle>
    );
}