import * as React from 'react';
import { Text } from '../../../components/Typography/Text';
import { Input } from '../../../components/FormsComponents/Input/Input'
import { InputRadio } from '../../../components/FormsComponents/Input/InputRadio';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { TextStyle, RadioButtonContainer, RadioButtonOption } from './BillingStyle';
const CardLogo = require('../../../../public/assets/credit_card_logo.svg');
const PaypalLogo = require('../../../../public/assets/paypal_logo.svg');


export const PaymentMethodModal = (props: {toggle: Function; actionButton: Function}) => {

    const [enableSubmit, setEnableSubmit] = React.useState<boolean>(false);
    const [selectedOption, setSelectedOption] = React.useState<string>('creditCard');

    let formRef = React.useRef<HTMLFormElement>(null);

    const submitForm = (event: React.FormEvent<HTMLFormElement>) =>  {
        event.preventDefault();
        props.actionButton();
        props.toggle(false);
        if(selectedOption === 'paypal') {

        }else {
            let form = formRef.current
            recurly.token(form,(err: any, token: any) => {
                if (err) {
                } 
                else {
                    
                    var risk = recurly.Risk();
                    var threeDSecure = risk.ThreeDSecure({
                        actionTokenId: token.id
                    });
                    threeDSecure.on('token', function () {
                    });
                      
                    threeDSecure.on('error', function () {
                    });
                    threeDSecure.attach(document.querySelector('#threeDSecureComponent'))
                    form.submit();
                }
            });
        }
    }

    return (

        <form ref={formRef} onSubmit={event => submitForm(event)}>
            <TextStyle className='mb2'><Text size={14} weight='reg' color='gray-1'>Choose which payment method you want to use</Text></TextStyle>
            <RadioButtonContainer isSelected={selectedOption === 'creditCard'}>
                <InputRadio name='paymentMethodForm' value='creditCard' defaultChecked={true} onChange={() => setSelectedOption('creditCard')} label='Credit Card' />
                <img src={CardLogo} />
            </RadioButtonContainer>
            <RadioButtonOption isOpen={selectedOption === 'creditCard'} className='mb2'>
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
               
            <RadioButtonContainer className='mt2' isSelected={selectedOption === 'paypal'} >
                <InputRadio name='paymentMethodForm' value='paypalForm' onChange={() => setSelectedOption('paypal')} label='PayPal' />
                <img src={PaypalLogo} />
            </RadioButtonContainer>
            <RadioButtonOption isOpen={selectedOption === 'paypal'} className='mb2'>
                <Text size={14} weight='reg' color='gray-1'>
                    When you click next, you will be redirected to another website where you may securely enter your banking details. After completing the requested information you will be redirected back to Dacast.
                </Text>
            </RadioButtonOption>
            <div id='#threeDSecureComponent'></div>
            <div className='col col-12 py2'>
                <Button sizeButton="large" type='submit' typeButton="primary" buttonColor="blue" >Add</Button>
                <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
            </div>
        </form>
    )
}