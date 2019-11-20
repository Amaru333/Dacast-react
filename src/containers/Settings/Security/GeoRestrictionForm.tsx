import * as React from 'react';
import { Input } from '../../../components/FormsComponents/Input/Input'
import { GeoRestriction } from './Security';
import { DropdownCountries } from '../../../components/FormsComponents/Dropdown/DropdownCountries';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { Button } from '../../../components/FormsComponents/Button/Button';

export const GeoRestrictionForm = (props: {item?: GeoRestriction; toggle:Function}) => {

    return (
        <form>
            <Input 
                defaultValue={props.item? props.item.name : ''}
                disabled={false}
                required
                id='geoRestrictionName'
                type='text'
                className='col col-12 py1'
                label='Group Name'
                placeholder='Group Name'
            />
            <DropdownCountries 
                className='col col-12 py1'
                id="geoRestrictionCountriesDropdown"
                dropdownTitle="Countries"
                list={  { "Checkbox1":false, "Checkbox2":false, "Checkbox3":false } }
            />
            <InputCheckbox 
                className='col col-12 py1'
                id='geoRestrictionDefautChecked'
                label='Make as Default Group'
                defaultChecked={props.item ? props.item.isDefault : true}
            />
            <div className='col col-12 py1'>
                <Button sizeButton="large" typeButton="primary" buttonColor="blue" >{props.item? "Save" : "Create"}</Button>
                <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
            </div>
        </form>
    )
}