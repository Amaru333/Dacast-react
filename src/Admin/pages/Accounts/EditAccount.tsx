import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle'
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox'
import { Flag } from '../../redux-flow/store/Accounts/List/types'
import { Button } from '../../../components/FormsComponents/Button/Button'

const flags: Flag[] = [
    'admin', 'banned', 'cancelled', 'chipped', 'partner', 'paused', 'platinium', 'suspended', 'test'
]

export const EditAccountPage = () => {

    const renderFlags = (flagList: Flag[]) => {
        return flagList.map(flag => {
            return  <InputCheckbox className='my1' key={flag} id={flag} defaultChecked={false} label={flag} />
        })

    }

    return (
        <div className='flex flex-column'> 

            <Text size={20} weight='med'>Editing Account</Text>
            <div className='flex'>
                <Input className='col col-3 pr1 py1' id='companyNameInput' placeholder='Company Name' label='Company' />
                <Input className='col col-3 pl1 py1' id='userNameInput' placeholder='User Name' label='Name' />
            </div>

            <div className='flex'>
                <Input className='col col-3 pr1 py1' id='websiteInput' placeholder='Website' label='Website' />
                <Input className='col col-3 pl1 py1' id='passwordInput' placeholder='Password' label='Change Password' />
            </div>
            <div className='flex'>
                <Input className='col col-3 pr1 py1' id='phoneInput' placeholder='Phone' label='Phone' />
                <Input className='col col-3 pl1 py1' id='emailInput' placeholder='Email' label='Email' />
            </div>

            <div className='flex'>
                <DropdownSingle className='col col-3 pr1 my1' id='playbackProtectionDropdown' list={{'Off': false, 'On': false}} dropdownTitle='Playback Protection' />
                <DropdownSingle className='col col-3 pl1 my1' id='emailVerifiedDropdown' list={{'Yes': false, 'No': false}} dropdownTitle='Email Verified' />
            </div>

            <Text className='py1' size={16} weight='med'>Account Flags</Text>
            <div className='flex flex-column my1'>
                {renderFlags(flags)}
            </div>

            <div className='my1 flex'>
                <Button className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Save</Button>
                <Button typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}