import React from 'react';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { MailCatcher } from '../../../redux-flow/store/Settings/Interactions/types';
import { SettingsInteractionComponentProps } from '../../../containers/Settings/Interactions';

export const MailCatcherModal = (props: SettingsInteractionComponentProps & {toggle: Function; selectedMailCatcher: MailCatcher}) => {

    const [mailCatcherData, setMailCatcherData] = React.useState<MailCatcher>(props.selectedMailCatcher)

    React.useEffect(() => {
        setMailCatcherData(props.selectedMailCatcher)
    }, [props.selectedMailCatcher])

    const defineMailCatcherAction = () => {
        props.selectedMailCatcher.type === "" ?
            props.createMailCatcher(mailCatcherData) : console.log("This will call saveMailCatcher")
    }

    return (
        <div>
            <div className='my1 col col-12'>
                <DropdownSingle 
                    id='mailCatcherDropdown' 
                    dropdownTitle='Type' 
                    list={{'MailChimp': false, 'Google': false}}
                    dropdownDefaultSelect={mailCatcherData.type}
                    callback={(value: string) => {setMailCatcherData({...mailCatcherData, type: value})}}
                />              
            </div>
            <div className="col col-12 flex">
                <DropdownSingle className='mr1 mt1 col col-6' id='mailCatcherPlacementDropdown' dropdownTitle='Ad Placement' callback={(value: string) => setMailCatcherData({...mailCatcherData, placement: value})} list={{'Pre-roll': false, 'Mid-roll': false, 'Post-roll': false}} dropdownDefaultSelect={mailCatcherData.placement} /> 
                {
                    mailCatcherData.placement === 'Mid-roll' ?
                        <Input type='time' className='ml1 mt1 col col-6' id='mailCatcherPosition' label='Position' onChange={(event) => setMailCatcherData({...mailCatcherData, position: event.currentTarget.value})}  />
                        : null
                }   
            </div>
            <InputCheckbox className='mb2 mt25 col col-12' id='defaultGroupCheckbox' label='Make as Default Email Catcher' defaultChecked={mailCatcherData.isDefault} onChange={() => setMailCatcherData({...mailCatcherData, ["isDefault"]: !mailCatcherData.isDefault})} />
            <div className='mt2 col col-12'>
                <Button className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue' onClick={() => {defineMailCatcherAction();props.toggle(false)}}>Add</Button>
                <Button onClick={() => {props.toggle(false);setMailCatcherData(props.selectedMailCatcher)}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}