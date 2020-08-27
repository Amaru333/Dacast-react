import React from 'react';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Text } from '../../../../components/Typography/Text';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import styled from 'styled-components';
import { ColorsApp } from '../../../../styled/types';
import { WithdrawalRequest, PaymentMethod } from '../../../redux-flow/store/Paywall/Payout';
import { DropdownListType } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';

export const WithdrawalModal = (props: { paymentList: PaymentMethod[]; action: (wr: WithdrawalRequest) => Promise<void>; toggle: (b: boolean) => void }) => {
    const [withdrawalRequest, setwithdrawalRequest] = React.useState<WithdrawalRequest>({
        paymentMethodId: props.paymentList[0].id,
        currency: 'USD',
        amount: 0,
        requestDate: Math.floor(Date.now() / 1000),
        transferDate: NaN,
        status: 'Pending'
    })
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false) 

    const handleMinRequest = (): {minRequest: string, fees: string, nbDays: number} => {
        switch(props.paymentList.find(p => p.id === withdrawalRequest.paymentMethodId).paymentMethodType) {
            case 'us-transfer' :
                return {minRequest: '$1,000 USD', fees: '$25 USD', nbDays: 5}
            case 'international-transfer':
                return {minRequest: '$1,000 USD', fees: '$1,000 USD', nbDays: 15}
            case 'check':
                return {minRequest: '$1,000 USD', fees: 'Free', nbDays: 5}
            case 'paypal':
                return {minRequest: '$1,000 USD', fees: 'Free', nbDays: 5}
            default:
                return {minRequest: '$1,000 USD', fees: '$25 USD', nbDays: 5}
        }
    }

    const handleSubmit = () => {
        setButtonLoading(true)
        props.action(withdrawalRequest)
        .then(() => {
            setButtonLoading(false)
            props.toggle(false)
        })
        .catch(() => setButtonLoading(false))
    }
    return (
        <div>
            <div className='col col-12 my2'>
                <DropdownSingle
                    className='col xs-no-gutter xs-mb1 col-12 sm-col-8 pr1'
                    id='widthdrawalModalPaymentMethodDropdown'
                    dropdownTitle='Choose Method'
                    list={props.paymentList.reduce((acc: DropdownListType, next) => {return {...acc, [next.paymentMethodName]: false}}, {})}
                    callback={(value: string) => { setwithdrawalRequest({ ...withdrawalRequest, paymentMethodId: props.paymentList.find(p => p.paymentMethodName === value).id }) }}
                    dropdownDefaultSelect={props.paymentList[0].paymentMethodName}
                />
                <Input className='col xs-no-gutter col-12 sm-col-5 pl1 mb1' id='withdrawalModalAmountInput' label='Withdrawal Amount (USD)' placeholder='1000' onChange={(event) => setwithdrawalRequest({ ...withdrawalRequest, amount: parseInt(event.currentTarget.value) })} />
            </div>
            <div className=' col col-12 flex flex-column'>
                <div className='col col-12 sm-col-7 pr1'>
                    <TextContainer className='col col-7' backgroundColor='gray-10'><Text size={14} weight='med'>Minimum Request</Text></TextContainer>
                    <TextContainer className='col col-5' backgroundColor='white'><Text size={14} weight='reg'>{handleMinRequest().minRequest}</Text></TextContainer>
                </div>
                <div className='col col-12 sm-col-7 pr1'>
                    <TextContainer className='col col-7' backgroundColor='gray-10'><Text size={14} weight='med'>Fee</Text></TextContainer>
                    <TextContainer className='col col-5' backgroundColor='white'><Text size={14} weight='reg'>{handleMinRequest().fees}</Text></TextContainer>
                </div>
                <div className='col col-12 sm-col-7 pr1 mb2'>
                    <TextContainer className='col col-7' backgroundColor='gray-10'><Text size={14} weight='med'>Processing Time</Text></TextContainer>
                    <TextContainer className='col col-5 ' backgroundColor='white'><Text size={14} weight='reg'>{handleMinRequest().nbDays.toString() + ' Businees Days*'}</Text></TextContainer>
                </div>
            </div>

            <Text size={12} weight='reg' color='gray-3'>*Your first payment request will be delayed at least 35 days</Text>
            <Input className='col col-12 my2' type='textarea' id='withdrawalModalCommentsInput' label='Comments' indicationLabel='optional' placeholder='Comments' />
            <div className='flex col col-12 my2'>
                <Button isLoading={buttonLoading} onClick={() => handleSubmit()} className='mr1' typeButton='primary' sizeButton='large' buttonColor='blue'>Request</Button>
                <Button onClick={() => props.toggle(false)} className='ml1' typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}

const TextContainer = styled.div<{ backgroundColor: ColorsApp }>`
    border: 1px solid ${props => props.theme.colors['gray-8']};
    background-color: ${props => props.theme.colors[props.backgroundColor]};
    padding: 10px;
`