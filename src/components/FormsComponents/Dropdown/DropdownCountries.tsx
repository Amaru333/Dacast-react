import * as React from 'react'
import Icon from '@material-ui/core/Icon';
import { InputCheckbox} from '../Input/InputCheckbox';
import { ContainerStyle, DropdownLabel, TitleContainer, Title, IconStyle, DropdownList, DropdownItem, BorderItem, ButtonIconStyle, ContinentContainer, CountryContainer } from './DropdownStyle';
import { DropdownProps, DropdownListType , dropdownIcons, ContinentListType} from './DropdownTypes';
import { Text } from '../../Typography/Text';
import { useOutsideAlerter } from '../../../utils/utils';

export const DropdownCountries: React.FC<DropdownProps> = (props: DropdownProps) => {

    const ContinentsList: ContinentListType = {
        'Africa': {
            countries: {
                "country1": false,
                "country2": false,
                "country3": false,
                "country4": false,
            },
            checked: 'unchecked'
        },
        'Europe': {
            'countries': {
                "country11": false,
                "country21": false,
                "country31": false,
                "country41": false,
            },
            checked: 'unchecked'
        },
        'America': {
            countries: {
                "country12": false,
                "country22": false,
                "country32": false,
                "country42": false,
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

    useOutsideAlerter(dropdownListRef, () => setOpen(!isOpened));

    const handleTitle = () => {
        const numberChecked = Object.keys(checkedContinents).filter(name => checkedContinents[name]).length;
        if(numberChecked > 1) {
            setSelectedItem(numberChecked+" items selected.")
        } else if (numberChecked == 1) {
            setSelectedItem(Object.keys(checkedContinents).filter(name => checkedContinents[name] )[0] );
        } else {
            setSelectedItem("Select")
        }
    }

    const handleSelectAllState = () => {
        var checkedItems = Object.keys(checkedContinents).filter(name => checkedContinents[name].checked !== 'unchecked').length;
        if(checkedItems === 0) {
            setSelectAllState('unchecked')
        } else if(checkedItems === Object.keys(checkedContinents).length) {
            setSelectAllState('checked')
        } else {
            setSelectAllState('undeterminate')
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
                continents[continent] = {countries: {...Object.keys(continents[continent].countries).reduce((reduced, key) => ({ ...reduced, [key]: true }), {})}, checked: 'checked'}
            })
            setCheckedContinents({...continents})
        } else {
            let continents = checkedContinents
            Object.keys(continents).forEach((continent) => {
                continents[continent] = {countries: {...Object.keys(continents[continent].countries).reduce((reduced, key) => ({ ...reduced, [key]: false }), {})}, checked: 'unchecked'}
            })
            setCheckedContinents({...continents})
        }
    }

    const handleContinentCheckboxChange = (continent: string) => {

        if(checkedContinents[continent].checked === 'unchecked' || checkedContinents[continent].checked === 'undeterminate') { 
            let changingContinent = checkedContinents[continent];
            changingContinent = {countries: {...Object.keys(checkedContinents[continent].countries).reduce((reduced, key) => ({ ...reduced, [key]: true }), {})}, checked: 'checked'}
            setCheckedContinents( {...checkedContinents, [continent]: changingContinent} )

        } else {
            let changingContinent = checkedContinents[continent];
            changingContinent = {countries: {...Object.keys(checkedContinents[continent].countries).reduce((reduced, key) => ({ ...reduced, [key]: false }), {})}, checked: 'unchecked'}
            setCheckedContinents( {...checkedContinents, [continent]: changingContinent} )
        }
    }

    const handleCheckboxCountryChange = (continent: string, country: string) => {
        let changingContinent = checkedContinents;
        changingContinent[continent].countries[country] = !changingContinent[continent].countries[country]
        var checkedCountries = Object.keys(changingContinent[continent].countries).filter(country => checkedContinents[continent].countries[country]).length;
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
                        <DropdownItem key={props.id + '_' + continent + key.toString()} isSelected={false}  >
                            <ContinentContainer>
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
                                            <DropdownItem  className='mx1' key={props.id + '_' + continent + '_' + country + key.toString()} isSelected={false}  > 
                                                <InputCheckbox 
                                                    id={props.id + '_' + continent + '_' + country} 
                                                    label={country}
                                                    labelWeight="reg"
                                                    defaultChecked={checkedContinents[continent].countries[country]}
                                                    onChange={() => handleCheckboxCountryChange(continent, country)}/> 
                                        </DropdownItem>
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