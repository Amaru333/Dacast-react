import * as React from 'react';
import { Input } from '../../../components/FormsComponents/Input/Input'
import { DomainControl } from '../../../redux-flow/store/Settings/Security/types';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { InputTags } from '../../../components/FormsComponents/Input/InputTags';

export const DomainControlForm = (props: {item: DomainControl; toggle: Function; submit: Function}) => {

    const [domainControlItem, setDomainControlItem] = React.useState<DomainControl>(null);
    const [enableSubmit, setEnableSubmit] = React.useState<boolean>(props.item.name.length > 0);

    React.useEffect(() => {
        setDomainControlItem(props.item)
    }, [props.item])

    React.useEffect(() => {
        if(domainControlItem) {
            setEnableSubmit(domainControlItem.name.length > 0);
        }
    }, [domainControlItem])
    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.submit(domainControlItem);
        props.toggle(false);
    }
    return (
        domainControlItem ? 
            <form onSubmit={event => submitForm(event)}>
                <Input 
                    value={domainControlItem.name}
                    disabled={false}
                    onChange={(event) => setDomainControlItem({...domainControlItem, name: event.currentTarget.value})}
                    id='domainControlName'
                    required={false}
                    type='text'
                    className='col col-12 py1'
                    label='Group Name'
                    placeholder='Group Name'
                />
                <InputTags 
                    className='col col-12 py1'
                    defaultTags={domainControlItem.domains} 
                    placeholder="Type URL" 
                    label="URLs"
                />

                <InputCheckbox 
                    className='col col-12 py1'
                    id='domainControlDefautGroup'
                    onChange={(event) => setDomainControlItem({...domainControlItem, isDefault: event.currentTarget.checked})}
                    label='Make as Default Group'
                    defaultChecked={domainControlItem.isDefault}
                />
                <div className='col col-12 py1'>
                    <Button sizeButton="large" type="submit" disabled={!enableSubmit} typeButton="primary" buttonColor="blue" >{props.item.name.length > 0 ? "Save" : "Create"}</Button>
                    <Button sizeButton="large" onClick={() => props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
                </div>
            </form>
            : null
    )
}