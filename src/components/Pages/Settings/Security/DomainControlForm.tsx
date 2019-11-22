import * as React from 'react';
import { Input } from '../../../FormsComponents/Input/Input'
import { DomainControl } from '../../../../redux-flow/store/Settings/Security/types';
import { InputCheckbox } from '../../../FormsComponents/Input/InputCheckbox';
import { Button } from '../../../FormsComponents/Button/Button';
import { InputTags } from '../../../FormsComponents/Input/InputTags';

export const DomainControlForm = (props: {item: DomainControl, toggle:Function, submit: Function}) => {

    const [domainControlItem, setDomainControlItem] = React.useState<DomainControl>(props.item);

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.submit(domainControlItem);
        props.toggle(false);
    }
    return (
        <form onSubmit={event => submitForm(event)}>
            <Input 
                defaultValue={props.item.name}
                disabled={false}
                onChange={(event) => setDomainControlItem({...domainControlItem, name: event.currentTarget.value})}

                required
                id='domainControlName'
                type='text'
                className='col col-12 py1'
                label='Group Name'
                placeholder='Group Name'
            />
            <InputTags 
                className='col col-12 py1'
                defaultTags={props.item.domains} 
                placeholder="Type URL" 
                label="URLS"
            />

            <InputCheckbox 
                className='col col-12 py1'
                id='domainControlDefautGroup'
                onChange={(event) => setDomainControlItem({...domainControlItem, isDefault: event.currentTarget.checked})}
                label='Make as Default Group'
                defaultChecked={props.item.isDefault}
            />
            <div className='col col-12 py1'>
                <Button sizeButton="large" type="submit" typeButton="primary" buttonColor="blue" >{props.item? "Save" : "Create"}</Button>
                <Button sizeButton="large" onClick={() => props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
            </div>
        </form>
    )
}