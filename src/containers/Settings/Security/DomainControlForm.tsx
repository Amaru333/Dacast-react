import * as React from 'react';
import { Input } from '../../../components/FormsComponents/Input/Input'
import { DomainControl } from './Security';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { InputTags } from '../../../components/FormsComponents/Input/InputTags';

export const DomainControlForm = (props: {item?: DomainControl, toggle:Function}) => {

    return (
        <form>
            <Input 
                defaultValue={props.item? props.item.name : ''}
                disabled={false}
                required
                id='domainControlName'
                type='text'
                className='col col-12 py1'
                label='Group Name'
                placeholder='Group Name'
            />
            <InputTags 
                className='col col-12 py1'
                defaultTags={props.item ? props.item.domains : []} 
                placeholder="Type URL" 
                label="URLS"
            />

            <InputCheckbox 
                className='col col-12 py1'
                id='domainControlDefautGroup'
                label='Make as Default Group'
                defaultChecked={props.item ? props.item.isDefault : true}
            />
            <div className='col col-12 py1'>
                <Button sizeButton="large" typeButton="primary" buttonColor="blue" >{props.item? "Save" : "Create"}</Button>
                <Button sizeButton="large" onClick={() => props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
            </div>
        </form>
    )
}