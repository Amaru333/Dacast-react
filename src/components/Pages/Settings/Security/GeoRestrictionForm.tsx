import * as React from 'react';
import { Input } from '../../../FormsComponents/Input/Input'
import { GeoRestriction } from '../../../../redux-flow/store/Settings/Security/types';
import { DropdownCountries } from '../../../FormsComponents/Dropdown/DropdownCountries';
import { InputCheckbox } from '../../../FormsComponents/Input/InputCheckbox';
import { Button } from '../../../FormsComponents/Button/Button';

export const GeoRestrictionForm = (props: {item: GeoRestriction; toggle: Function; submit: Function}) => {

    const [geoRestrictionItem, setGeoRestrictionItem] = React.useState<GeoRestriction>(null);
    const [enableSubmit, setEnableSubmit] = React.useState<boolean>(props.item.name.length > 0);

    React.useEffect(() => {
        setGeoRestrictionItem(props.item)
    }, [props.item])

    React.useEffect(() => {
        if(geoRestrictionItem) {
            setEnableSubmit(geoRestrictionItem.name.length > 0)
        }
    }, [geoRestrictionItem])

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.submit(geoRestrictionItem);
        props.toggle(false);
    }
    return (
        geoRestrictionItem ?

            <form onSubmit={event => submitForm(event)}>
                <Input 
                    defaultValue={geoRestrictionItem.name}
                    disabled={false}
                    onChange={(event) => setGeoRestrictionItem({...geoRestrictionItem, name: event.currentTarget.value})}
                    required={false}
                    id='geoRestrictionName'
                    type='text'
                    className='col col-12 pb1'
                    label='Group Name'
                    placeholder='Group Name'
                />
                <div className='col col-12 py1'>
                    <DropdownCountries 
                        id="geoRestrictionCountriesDropdown"
                        dropdownTitle="Countries"
                        list={geoRestrictionItem.countries}
                        callback={(value: string[]) => setGeoRestrictionItem({...geoRestrictionItem, countries: value})}
                    />
                </div>

                <InputCheckbox 
                    className='col col-12 py1'
                    id='geoRestrictionDefautChecked'
                    label='Make as Default Group'
                    onChange={(event) => setGeoRestrictionItem({...geoRestrictionItem, isDefault: event.currentTarget.checked})}
                    defaultChecked={geoRestrictionItem.isDefault}
                />
                <div className='col col-12 py1'>
                    <Button sizeButton="large" disabled={!enableSubmit} typeButton="primary" buttonColor="blue" >{props.item.name.length > 0 ? "Save" : "Create"}</Button>
                    <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
                </div>
            </form>
            : null
    )
}