import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Button } from '../../../components/FormsComponents/Button/Button'

export const AccountAllowancesPage = () => {

    return (
        <div>
            <Text size={16} weight='med'>Allowances for Account</Text>
            <div className='flex my1'>
                <Text size={14} weight='reg'>Data</Text>
                <Text size={14} weight='reg'>{} GB</Text>
            </div>
            <div className='flex my1'>
                <Text size={14} weight='reg'>Encoding</Text>
                <Text size={14} weight='reg'>{} GB</Text>
            </div>
            <div className='flex my1'>
                <Text size={14} weight='reg'>Storage</Text>
                <Text size={14} weight='reg'>{} GB</Text>
            </div>
            <DropdownSingle className='my1' id='accountAllowancesDropdown' dropdownTitle='Allowance' list={{'Data': false, 'Encoding': false, 'Storage': false}} />
            <Input className='my1' id='accountAllowanceInput' placeholder='Enter Amount' label='Amount (GB)' />
            <Button className='my1' typeButton='primary' sizeButton='large' buttonColor='blue'>Submit</Button>
            <Text size={14}>A positive Amount adds the allowance</Text>
            <Text size={14}>whereas a negative Amount susbtracts from it.</Text>
        </div>
    )
}