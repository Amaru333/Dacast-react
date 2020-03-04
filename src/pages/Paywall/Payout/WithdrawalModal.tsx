import React from 'react';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import styled from 'styled-components';
import { ColorsApp } from '../../../styled/types';
import { WithdrawalRequest } from '../../../redux-flow/store/Paywall/Payout';

export const WithdrawalModal = (props: {action: Function; toggle: Function}) => {
    const [withdrawalRequest, setwithdrawalRequest] = React.useState<WithdrawalRequest>(null)
    return (
        <div>
            <div className='col col-12 my2'>
                <DropdownSingle 
                    className='my2 col col-8 pr1'
                    id='widthdrawalModalPaymentMethodDropdown'
                    dropdownTitle='Choose Method'
                    list={{'Bank Account (US)': false, 'Bank Account (International)': false, 'Check': false, 'PayPal': false}} 
                    callback={(value: string) => {setwithdrawalRequest({...withdrawalRequest, requestType: value})}}
                    dropdownDefaultSelect='Bank Account (US)'
                />
                <Input className='col col-4 pl1 mt1' id='withdrawalModalAmountInput' label='WIthdrawal Amount (USD)' placeholder='100' onChange={(event) => setwithdrawalRequest({...withdrawalRequest, amount: parseInt(event.currentTarget.value)})} />
            </div>
            <div className=' col col-12 flex flex-column'>
                <div className='col col-8 pr1'>
                    <TextContainer className='col col-7' backgroundColor='gray-10'><Text size={14} weight='med'>Minimum Request</Text></TextContainer>
                    <TextContainer className='col col-5' backgroundColor='white'><Text size={14} weight='reg'>$1000 USD</Text></TextContainer>
                </div>
                <div className='col col-8 pr1'>
                    <TextContainer className='col col-7' backgroundColor='gray-10'><Text size={14} weight='med'>Fee</Text></TextContainer>
                    <TextContainer className='col col-5' backgroundColor='white'><Text size={14} weight='reg'>$25 USD</Text></TextContainer>
                </div>
                <div className='col col-8 pr1'>
                    <TextContainer className='col col-7' backgroundColor='gray-10'><Text size={14} weight='med'>Processing Time</Text></TextContainer>
                    <TextContainer className='col col-5 ' backgroundColor='white'><Text size={14} weight='reg'>5 Business Days*</Text></TextContainer>
                </div>
            </div>

            <Text size={12} weight='reg' color='gray-3'>*Your first payment request will be delayed at least 35 days</Text>
            <Input className='col col-12 my2' id='withdrawalModalCommentsInput' label='Comments' indicationLabel='optional' placeholder='Comments' />
            <div className='flex col col-12 my2'>
                <Button onClick={() => {props.action(withdrawalRequest);props.toggle(false)}} className='mr1' typeButton='primary' sizeButton='large' buttonColor='blue'>Request</Button>
                <Button onClick={() => {props.toggle(false)}} className='ml1' typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}

const TextContainer = styled.div<{backgroundColor: ColorsApp}>`
    border: 1px solid ${props => props.theme.colors['gray-8']};
    background-color: ${props => props.theme.colors[props.backgroundColor]};
    padding: 10px;
`