import React from 'react';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Text } from '../../../../components/Typography/Text';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import styled from 'styled-components';
import { ColorsApp } from '../../../../styled/types';
import { WithdrawalRequest, PaymentMethod, PaymentMethodType } from '../../../redux-flow/store/Paywall/Payout';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';

interface WithdrawalModalProps { 
    paymentList: PaymentMethod[]; 
    balance: number;
    action: (wr: WithdrawalRequest) => Promise<void>; 
    toggle: (b: boolean) => void 
}

export const WithdrawalModal = (props: WithdrawalModalProps) => {
    const [withdrawalRequest, setwithdrawalRequest] = React.useState<WithdrawalRequest>({
        paymentMethodId: props.paymentList[0].id,
        currency: 'USD',
        amount: 0,
        requestDate: Math.floor(Date.now() / 1000),
        status: 'Pending',
        transferDate: NaN,
    })
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false) 

    const paymentMethodDropdownList = props.paymentList.map((item: PaymentMethod) => {
        let paymentMethodDropdownItem: DropdownSingleListItem = {title: null, data: null}
        paymentMethodDropdownItem.title = item.paymentMethodName
        paymentMethodDropdownItem.data = item
        return paymentMethodDropdownItem
    })

    const handleMinRequest = (): {minRequest: string, fees: string, nbDays: number} => {
        switch(props.paymentList.find(p => p.id === withdrawalRequest.paymentMethodId).paymentMethodType) {
            case PaymentMethodType.BankAccountUS:
                return {minRequest: '$1,000 USD', fees: '$25 USD', nbDays: 10}
            case PaymentMethodType.BankAccountInternational:
                return {minRequest: '$1,000 USD', fees: '$50 USD', nbDays: 15}
            case PaymentMethodType.Check:
                return {minRequest: '$250 USD', fees: 'Free', nbDays: 10}
            case PaymentMethodType.PayPal:
                return {minRequest: '$100 USD', fees: 'Free', nbDays: 10}
            default:
                return {minRequest: '$1,000 USD', fees: '$25 USD', nbDays: 10}
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
                    list={paymentMethodDropdownList}
                    callback={(item: DropdownSingleListItem) => { setwithdrawalRequest({ ...withdrawalRequest, paymentMethodId: item.data.id}) }}
                    dropdownDefaultSelect={props.paymentList[0].paymentMethodName}
                />
                <div className='flex items-center col xs-no-gutter col-12 mt2 mb1'>
                    <Input isError={withdrawalRequest.amount && props.balance < withdrawalRequest.amount} help={withdrawalRequest.amount && props.balance < withdrawalRequest.amount ? 'Requested Amount cannot be higher than current balance (paywall balance - sum of pending requests)' : null} className='sm-col-5 mr2' id='withdrawalModalAmountInput' label='Withdrawal Amount (USD)' placeholder='1000' onChange={(event) => setwithdrawalRequest({ ...withdrawalRequest, amount: parseFloat(event.currentTarget.value) })} />
                    <Text className={withdrawalRequest.amount && props.balance < withdrawalRequest.amount ? 'pb3' : 'pt25'} size={14} weight='med'>Available: ${props.balance}</Text>
                </div>
            </div>
            <div className=' col col-12 flex flex-column'>
                <div className='col col-12 sm-col-7 pr1'>
                    <TextContainer className='col col-6' backgroundColor='gray-10'><Text size={14} weight='med'>Minimum Request</Text></TextContainer>
                    <TextContainer className='col col-6' backgroundColor='white'><Text size={14} weight='reg'>{handleMinRequest().minRequest}</Text></TextContainer>
                </div>
                <div className='col col-12 sm-col-7 pr1'>
                    <TextContainer className='col col-6' backgroundColor='gray-10'><Text size={14} weight='med'>Fee</Text></TextContainer>
                    <TextContainer className='col col-6' backgroundColor='white'><Text size={14} weight='reg'>{handleMinRequest().fees}</Text></TextContainer>
                </div>
                <div className='col col-12 sm-col-7 pr1 mb2'>
                    <TextContainer className='col col-6' backgroundColor='gray-10'><Text size={14} weight='med'>Processing Time</Text></TextContainer>
                    <TextContainer className='col col-6 ' backgroundColor='white'><Text size={14} weight='reg'>{handleMinRequest().nbDays.toString() + ' Business Days*'}</Text></TextContainer>
                </div>
            </div>

            <Text size={12} weight='reg' color='gray-3'>*Your first payment request will be delayed at least 35 days</Text>
            <Input className='col col-12 my2' type='textarea' id='withdrawalModalCommentsInput' label='Comments' indicationLabel='optional' placeholder='Comments' />
            <div className='flex col col-12 my2'>
                <Button disabled={!withdrawalRequest.amount || props.balance < withdrawalRequest.amount} isLoading={buttonLoading} onClick={() => handleSubmit()} className='mr1' typeButton='primary' sizeButton='large' buttonColor='blue'>Request</Button>
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