import * as React from 'react';
import { Text } from '../../../Typography/Text';
import { Input } from '../../../FormsComponents/Input/Input'
import { InputRadio } from '../../../FormsComponents/Input/InputRadio';
import { Button } from '../../../FormsComponents/Button/Button';
const CardLogo = require('../../../../../public/assets/credit_card_logo.svg');
const PaypalLogo = require('../../../../../public/assets/paypal_logo.svg');
import styled, {css} from 'styled-components';

export const PaymentMethodModal = (props: {toggle: Function}) => {

    const [enableSubmit, setEnableSubmit] = React.useState<boolean>(false);
    const [selectedOption, setSelectedOption] = React.useState<string>('creditCard');
    
    const submitForm = (event: React.FormEvent<HTMLFormElement>) =>  {
        event.preventDefault();
    }
    return (

            <form onSubmit={event => submitForm(event)}>
                <TextStyle className='mb2'><Text size={14} weight='reg' color='gray-1'>Choose which payment method you want to use</Text></TextStyle>
                <RadioButtonConainer>
                        <InputRadio name='paymentMethod' value='creditCard' defaultChecked={true} onChange={() => setSelectedOption('creditCard')} label='Credit Card' />
                        <img src={CardLogo} />
                </RadioButtonConainer>
                <RadioButtonOption isOpen={selectedOption === 'creditCard'} className='mb2'>
                    <div className='col col-12 px2'>
                        <Input
                            className='col col-6 pr2'
                            label="Account's Holder First Name"
                            type='text'
                            required={false}
                        />
                        <Input 
                            className='col col-6'
                            label="Account's Holder Last Name"
                            type='text'
                            required={false}
                        />
                    </div>
 
                    <div className='col col-12 px2'>
                        <Input 
                            className='col col-6 pr2'
                            label="Card Number"
                            type='text'
                            required={false}
                        />
                        <Input 
                            className='col col-3 pr2'
                            label="Expiry"
                            type='text'
                            required={false}
                        />
                        <Input 
                            className='col col-3'
                            label="CVV"
                            type='text'
                            required={false}
                        />
                    </div>
                    
                    <div className='col col-12 px2'>
                        <Input 
                            className='col col-6 pr2'
                            label="Country"
                            type='text'
                            required={false}
                        />
                        <Input 
                            className='col col-6'
                            label="VAT Number"
                            type='text'
                            required={false}
                        />
                    </div>
                    <div className='col col-12 px2'>
                        <Input 
                            className='col col-6 pr2'
                            label="Street Address 1"
                            type='text'
                            required={false}
                        />
                        <Input 
                            className='col col-6'
                            label="Street Address 2"
                            type='text'
                            required={false}
                        />
                    </div>

                    <div className='col col-12 px2 pb2'>
                        <Input 
                            className='col col-3 pr2'
                            label="Town/City"
                            type='text'
                            required={false}
                        />
                        <Input 
                            className='col col-3 pr2'
                            label="State/Province"
                            type='text'
                            required={false}
                        />
                        <Input 
                            className='col col-3'
                            label="Zip/Postal Code"
                            type='text'
                            required={false}
                        />
                    </div>

                </RadioButtonOption>
               
                <RadioButtonConainer className='mt2'>
                    <InputRadio name='paymentMethod' value='paypal' onChange={() => setSelectedOption('paypal')} label='PayPal' />
                    <img src={PaypalLogo} />
                </RadioButtonConainer>
                <RadioButtonOption isOpen={selectedOption === 'paypal'} className='mb2'>
                    <div className='col col-12 pb2'>
                        <Input 
                            className='col col-6 pl2'
                            label='PayPal Email'
                            type='email'
                            required={false}
                        />
                    </div>
                </RadioButtonOption>
                <div className='col col-12 py1'>
                    <Button sizeButton="large" disabled={!enableSubmit} typeButton="primary" buttonColor="blue" >Add</Button>
                    <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
                </div>
            </form>
    )
}

const TextStyle = styled.div`

`

const RadioButtonConainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 24px;
    background-color: ${props => props.theme.colors['violet10']};
    border: 1px solid ${props => props.theme.colors['gray-7']};
`

const RadioButtonOption = styled.div<{isOpen: boolean}>`
    display: none;

    ${props => props.isOpen && css`
        display: flex;
        flex-direction: column;
        border: 1px solid ${props.theme.colors['gray-7']};
        position: relative;
    `}


`