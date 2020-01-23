import React from 'react';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';

export const WithdrawalModal = (props: {toggle: Function}) => {

    return (
        <div>
            <div className='col col-12 my2'>
                <DropdownSingle 
                    className='my2 col col-8 pr1'
                    id='widthdrawalModalPaymentMethodDropdown'
                    dropdownTitle='Choose Method'
                    list={{'Bank Account (US)': false, 'Bank Account (International)': false, 'Check': false, 'PayPal': false}} 
                    callback={(value: string) => {}}
                    dropdownDefaultSelect='Bank Account (US)'
                />
                <Input className='col col-4 pl1 mt1' id='withdrawalModalAmountInput' label='WIthdrawal Amount (USD)' placeholder='100' />
            </div>
            <Text size={12} weight='reg' color='gray-3'>*Your first payment request will be delayed at least 35 days</Text>
            <Input className='col col-12 my2' id='withdrawalModalCommentsInput' label='Comments' placeholder='Comments' />
            <div className='flex col col-12 my2'>
                <Button className='mr1' typeButton='primary' sizeButton='large' buttonColor='blue'>Request</Button>
                <Button onClick={() => {props.toggle(false)}} className='ml1' typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}