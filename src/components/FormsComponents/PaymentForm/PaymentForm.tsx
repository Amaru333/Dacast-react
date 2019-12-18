import React from 'react';
import { Text } from '../../Typography/Text';
import { Input } from '../Input/Input'
import { InputRadio } from '../Input/InputRadio';
import { TextStyle, RadioButtonContainer, RadioButtonOption } from './PaymentFormStyle';
const CardLogo = require('../../../../public/assets/credit_card_logo.svg');
const PaypalLogo = require('../../../../public/assets/paypal_logo.svg');

export const PaymentForm = (props: {id: string; paypalText: string}) => {

    const [selectedOption, setSelectedOption] = React.useState<string>(null);
    const [paymentFormValues, setPaymentFormValues] = React.useState<{id: string; paypalText: string}>(null);

    React.useEffect(() => {
        if(props && props.id) {
            setPaymentFormValues(props);
            setSelectedOption(props.id + 'creditCard')
            console.log(props)
        }
    }, [props])

    React.useEffect(() => {}, [paymentFormValues])

    return (
        paymentFormValues ? 
            <div>
                <RadioButtonContainer isSelected={selectedOption === paymentFormValues.id +'creditCard'}>
                    <InputRadio name={paymentFormValues.id+'paymentMethod'} value={paymentFormValues.id +'creditCard'} defaultChecked={true} onChange={() => setSelectedOption(paymentFormValues.id +'creditCard')} label='Credit Card ' />
                    <img src={CardLogo} />
                </RadioButtonContainer>
                <RadioButtonOption isOpen={selectedOption === paymentFormValues.id+'creditCard'} className='mb2'>
                    <div className='col col-12 pt2 px2'>
                        <Input
                            data-recurly="first_name"
                            className='col col-6 pr2 pl1'
                            label="Account's Holder First Name"
                            type='text'
                            required={false}
                        />
                        <Input 
                            data-recurly="last_name"
                            className='col col-6 pr1'
                            label="Account's Holder Last Name"
                            type='text'
                            required={false}
                        />
                    </div>
 
                    <div className='col col-12 pt1 px2'>
                        <Input 
                            data-recurly="number"
                            className='col col-6 pr2 pl1'
                            label="Card Number"
                            type='text'
                            required={false}
                        />
                        <Input 
                            data-recurly="month"
                            className='col col-1 '
                            label="Month"
                            type='text'
                            required={false}
                        />
                        <Input 
                            data-recurly="year"
                            className='col col-1 '
                            label="Year"
                            type='text'
                            required={false}
                        />
                        <Input 
                            data-recurly="cvv"
                            className='col col-3 px2'
                            label="CVV"
                            type='text'
                            required={false}
                        />
                    </div>
                    
                    <div className='col col-12 pt1 px2'>
                        <Input 
                            data-recurly="country"
                            className='col col-6 pr2 pl1'
                            label="Country"
                            type='text'
                            required={false}
                        />
                        <Input 
                            data-recurly="vat_number"
                            className='col col-6 pr2'
                            label="VAT Number"
                            type='text'
                            required={false}
                        />
                    </div>
                    <div className='col col-12 pt1 px2'>
                        <Input 
                            data-recurly="address1"
                            className='col col-6 pr2 pl1'
                            label="Street Address 1"
                            type='text'
                            required={false}
                        />
                        <Input 
                            data-recurly="address2"
                            className='col col-6 pr2'
                            label="Street Address 2"
                            type='text'
                            required={false}
                        />
                    </div>

                    <div className='col col-12 px2 pb2 pt1'>
                        <Input 
                            data-recurly="city"
                            className='col col-3 pr2 pl1'
                            label="Town/City"
                            type='text'
                            required={false}
                        />
                        <Input 
                            data-recurly="state"
                            className='col col-3 pr2'
                            label="State/Province"
                            type='text'
                            required={false}
                        />
                        <Input 
                            data-recurly="postal_code"
                            className='col col-3 pr2'
                            label="Zip/Postal Code"
                            type='text'
                            required={false}
                        />
                    </div>
                    <input type="hidden" name="recurly-token" data-recurly="token"></input>
                </RadioButtonOption>
               
                <RadioButtonContainer className='mt2' isSelected={selectedOption === paymentFormValues.id +'paypal'} >
                    <InputRadio name={paymentFormValues.id +'paymentMethod'} value={paymentFormValues.id +'paypal'} onChange={() => setSelectedOption(paymentFormValues.id +'paypal')} label='PayPal ' />
                    <img src={PaypalLogo} />
                </RadioButtonContainer>

                {    
                    paymentFormValues.paypalText ?
                   
                        <RadioButtonOption isOpen={selectedOption === paymentFormValues.id +'paypal'} className='mb2'>
                            <div className='col col-12 px2 pb2 pt1'>
                                <Text size={14} weight='reg' color='gray-1'>{paymentFormValues.paypalText}</Text>
                            </div>
                        </RadioButtonOption>
                        : null
                }
                <div id='#threeDSecureComponent'></div>
            </div>
            : null
    )
}