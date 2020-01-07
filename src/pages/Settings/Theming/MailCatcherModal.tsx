import React from 'react';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';

export const MailCatcherModal = () => {

    return (
        <div>
            <div className='my1 col col-12'>
                <DropdownSingle id='mailCatcherDropdown' dropdownTitle='Mail Catcher' list={{'MailChimp': false, 'Google': false}} />              
            </div>
            <div className='my1 col col-12'>
                <DropdownSingle id='askForEmailDropdown' dropdownTitle='Ask For Email' list={{'During Playback': false, 'Before Playback': false}} />               
            </div>
            <Input className='my1 col col-6' id='timeInSecondsInput' label='Time in seconds' placeholder='0' />
            <InputCheckbox className='my1 col col-12' id='defaultGroupCheckbox' label='Make as Default Group' defaultChecked={false} />
            <div className='my2 col col-12'>
                <Button className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Add</Button>
                <Button typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}