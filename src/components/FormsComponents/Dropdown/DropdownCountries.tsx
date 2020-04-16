import * as React from 'react'
import Icon from '@material-ui/core/Icon';
import { InputCheckbox} from '../Input/InputCheckbox';
import { ContainerStyle, DropdownLabel, TitleContainer, Title, IconStyle, DropdownList, DropdownItem, BorderItem, ButtonIconStyle, ContinentContainer, CountryContainer, SearchItem, SearchIconStyle, CloseIconButton, SelectAllItem } from './DropdownStyle';
import { dropdownIcons, ContinentListType, DropdownCountriesProps} from './DropdownTypes';
import { Text } from '../../Typography/Text';
import { useOutsideAlerter } from '../../../utils/utils';
import { Input } from '../Input/Input';
import {countries, continents } from 'countries-list'

export const DropdownCountries: React.FC<DropdownCountriesProps> = (props: DropdownCountriesProps) => {
    /** Commun States/Ref */
    const [isOpened, setOpen] = React.useState<boolean>(false);
    const dropdownListRef = React.useRef<HTMLUListElement>(null);
    const [selectedItem, setSelectedItem] = React.useState<string>("Select");
    const [toggleContinent, setToggleContinent] = React.useState<{[key: string]: boolean}>(null);
    const [checkedContinents, setCheckedContinents] = React.useState<ContinentListType>(null);
    const [selectAllState, setSelectAllState] = React.useState<'unchecked' | 'checked' | 'undeterminate'>('unchecked');
    const [filteringList, setFilteringList] = React.useState<string>('');


    useOutsideAlerter(dropdownListRef, () => {
        setOpen(!isOpened)
        if(props.callback) {
            let returnedString: string[] = []
            Object.keys(checkedContinents).map((continent) => {
                if(checkedContinents[continent].checked === 'checked') {
                    returnedString.push('AU')
                } else if(checkedContinents[continent].checked === 'undeterminate') {
                    Object.keys(checkedContinents[continent].countries).map((country) => {
                        if(checkedContinents[continent].countries[country].isChecked) {
                            returnedString.push(checkedContinents[continent].countries[country].key);
                        }
                    })
                }

            })
            props.callback(returnedString);
        }
    });

    const handleTitle = () => {
        if(checkedContinents) {
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

    }

    const handleSelectAllState = () => {
        if(checkedContinents) {
            if(Object.keys(checkedContinents).filter(continent => checkedContinents[continent].checked === 'unchecked').length === Object.keys(checkedContinents).length) {
                setSelectAllState('unchecked')
            } else if(Object.keys(checkedContinents).filter(continent => checkedContinents[continent].checked === 'checked').length === Object.keys(checkedContinents).length) {
                setSelectAllState('checked')
            }
            else {
                setSelectAllState('undeterminate')  
            }
        }

    }

    const handleContinentState = (continent: string, continents: ContinentListType) => {
        const checkedCountries = Object.keys(continents[continent].countries).filter(country => continents[continent].countries[country].isChecked && !continents[continent].countries[country].isFiltered).length;
        if(checkedCountries === 0) {
            return 'unchecked'
        }else if(checkedCountries === Object.keys(continents[continent].countries).filter(country => !continents[continent].countries[country].isFiltered).length) {
            return 'checked'
        }else {
            return 'undeterminate'
        }

    }

    React.useEffect(() => {

        let initCountriesList: ContinentListType = {...Object.keys(continents).reduce((reduced, continent) => {
            return {...reduced, [continents[continent]]: {countries: {}, checked: 'unchecked', key: continent}}
        }, {})}

        initCountriesList = Object.keys(initCountriesList).reduce((reduced, continent) => {
            if(props.list.includes(continent)) {
                return {
                    ...reduced, 
                    [continent]: {
                        countries: Object.keys(countries).reduce((reduced, country) => {
                            if(continents[countries[country].continent] === continent) {
                                return {        
                                    ...reduced, [countries[country].name]: {isChecked: true, isFiltered: false, key: country}
                                }
                            }
                            return {...reduced}

                        }, {}),
                        checked: 'checked'
                    }
                }
            }
            else {
                let counter = 0
                let currentContinent = {
                    ...reduced, 
                    [continent] : {
                        countries: Object.keys(countries).reduce((reduced, country) => {
                            if(continents[countries[country].continent] === continent) {
                                if(props.list.includes(countries[country].name)) {counter++}
                                return {        
                                    ...reduced, [countries[country].name]: {isChecked: props.list.includes(countries[country].name), isFiltered: false}
                                }
                            }
                            return {...reduced}

                        }, {}),
                        checked: counter === 0 ? 'unchecked' : 'undeterminate'
                    }
                }
                //currentContinent[continent].checked = 
                return currentContinent;
            }
        }, {})
        setCheckedContinents(initCountriesList);
        setToggleContinent({...Object.keys(initCountriesList).reduce((reduced, continent) => ({...reduced, [continent]: false}), {})})
        handleTitle();
        handleSelectAllState();
    }, [props.list])
    
    React.useEffect(() => {
        handleTitle();
        handleSelectAllState();
    }, [checkedContinents])


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
        if(checkedContinents) {
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
        if(checkedContinents) {
            return (
                Object.keys(checkedContinents).map((continent, key) => {
                    return (
                        <React.Fragment key={"countryDropdown"+ key.toString()}>  
                            {key === 0 ?
                                <>
                                <SearchItem 
                                    key={props.id + key.toString() + '_search'} 
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
                                    <SelectAllItem isSingle={false} key={key.toString()+"selectAllcountries"} isSelected={false}> 
                                        <InputCheckbox 
                                            id={props.id + '_SelectAll'} 
                                            label={"Select All"}
                                            labelWeight="med"
                                            indeterminate={selectAllState === 'undeterminate'}
                                            defaultChecked={selectAllState === 'checked'}
                                            onChange={() => handleSelectAllChange()}/> 
                                    </SelectAllItem>
                                    <BorderItem key={key.toString()+"borderItem"} />
                                </>
                                : null}
                            <DropdownItem isSingle={false} style={{paddingLeft: '4px'}} key={props.id + '_' + continent + key.toString()} isSelected={false} className={key === 0 ? 'mt1' : ''} >
                                <ContinentContainer isDisplayed={Object.keys(checkedContinents[continent].countries).filter(country => !checkedContinents[continent].countries[country].isFiltered).length === 0}>
                                    <ButtonIconStyle onClick={() => setToggleContinent({...toggleContinent, [continent]: !toggleContinent[continent]})}>
                                        <Icon>{toggleContinent[continent] ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}</Icon>
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
                                Object.keys(checkedContinents[continent].countries).map((country, key) => {
                                        
                                    return (
                                        <CountryContainer isDisplayed={toggleContinent[continent]} key={props.id + '_' + continent + '_' + country + key.toString()}>
                                            { 
                                                !checkedContinents[continent].countries[country].isFiltered ?
                                                    <DropdownItem  isSingle={false} className='ml3'  isSelected={false}  > 
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
                        </React.Fragment>
                    )                
                })
            )
        }
        else {
            return null
        }
    }
    
    return (
        <ContainerStyle>
            <DropdownLabel><Text size={14} weight="med">{props.dropdownTitle}</Text></DropdownLabel>
            <TitleContainer isNavigation={false} {...props} isOpened={isOpened} onClick={() => setOpen(!isOpened)}>
                <Title><Text size={14} weight='reg'>{selectedItem}</Text></Title>
                <IconStyle><Icon>{isOpened ? dropdownIcons.opened : dropdownIcons.closed}</Icon></IconStyle>
            </TitleContainer>
            <DropdownList isSingle={false} isNavigation={false} displayDropdown={isOpened} ref={dropdownListRef}>
                {renderList()}
            </DropdownList>
        </ContainerStyle>
    );
}