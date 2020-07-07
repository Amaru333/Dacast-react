import * as React from 'react';
import { TextStyle, RadioButtonContainer, RadioButtonOption, RecurlyElementStyle } from './BillingStyle';
import { Text } from '../../../components/Typography/Text';
import { InputRadio } from '../../../components/FormsComponents/Input/InputRadio';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { useRecurlySubmit } from '../../utils/useRecurlySubmit';
import { Theme } from '../../../styled/themes/dacast-theme';
const CardLogo = require('../../../../public/assets/credit_card_logo.svg');
const PaypalLogo = require('../../../../public/assets/paypal_logo.svg');
import { CardNumberElement, CardCvvElement, CardMonthElement, CardYearElement, useRecurly, ThreeDSecureAction } from '@recurly/react-recurly';
import { useStepperFinalStepAction } from '../../utils/useStepperFinalStepAction';
import { ClassHalfXsFullMd } from '../General/GeneralStyle';
import styled from 'styled-components';
import { BillingPageInfos } from '../../redux-flow/store/Account/Plan/types';
import { Button } from '../../../components/FormsComponents/Button/Button';

export const NewPaymentMethodForm = (props: { callback: Function; actionButton?: Function; handleThreeDSecureFail?: Function; billingInfo?: BillingPageInfos; stepperData?: any }) => {

    const [selectedOption, setSelectedOption] = React.useState<string>('creditCard');
    const [recurlyToken, setRecurlyToken] = React.useState<string>(null)
    const [threeDSecureActionToken, setThreeDSecureActionToken] = React.useState<string>(null)
    const [payPalInstance, setPayPalInstance] = React.useState<any>(null)

    let formRef = React.useRef<HTMLFormElement>(null);

    const recurly = useRecurly()

    React.useEffect(() => {
        if(recurly){
            setPayPalInstance(
                recurly.PayPal(
                    {display: { displayName: ' Dacast ' }}
                )
            )
        }
        
    }, [])

    React.useEffect(() => {
        console.log(recurly)
    }, [recurly])

    
    

    useStepperFinalStepAction('stepperNextButton', () => useRecurlySubmit(formRef.current, selectedOption, props.callback, recurly, props.actionButton, setThreeDSecureActionToken, setRecurlyToken, props.stepperData, payPalInstance))

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('trying to submit form', event.currentTarget.dataset)
    }

    return (
        <form id='paymentMethodForm' ref={formRef} onSubmit={(event) => { event.preventDefault()}} >
            <TextStyle className='mb2'><Text size={14} weight='reg' color='gray-1'>Choose which payment method you want to use</Text></TextStyle>
            <RadioButtonContainer isSelected={selectedOption === 'creditCard'}>
                <InputRadio name='paymentMethodForm' value='creditCard' defaultChecked={true} onChange={() => setSelectedOption('creditCard')} label='Credit Card' />
                <img src={CardLogo} />
            </RadioButtonContainer>
            <RadioButtonOption isOpen={selectedOption === 'creditCard'} className='mb2'>
                <div className='col col-12 pt2 pb25 px2'>
                    <Input
                        data-recurly="first_name"
                        className={ClassHalfXsFullMd + 'pr1 mb2'}
                        label="Account's Holder First Name"
                        type='text'
                        required={false}
                        onChange={(event) => props.callback({...props.billingInfo, creditCard: {...props.billingInfo.creditCard, firstName: event.currentTarget.value}})}
                    />
                    <Input
                        data-recurly="last_name"
                        className={ClassHalfXsFullMd+ 'pl1 mb2'}
                        label="Account's Holder Last Name"
                        type='text'
                        required={false}
                        onChange={(event) => props.callback({...props.billingInfo, creditCard: {...props.billingInfo.creditCard, lastName: event.currentTarget.value}})}
                    />
                    <div className={ClassHalfXsFullMd+ 'pr1 mb2'}>
                        <Text size={14} weight="med">Number</Text>
                        <RecurlyElementStyle>
                            <CardNumberElement style={{ fontColor: Theme.colors["gray-1"], fontFamily: 'Roboto', fontSize: '14px' }} onChange={(state) => props.callback({...props.billingInfo, creditCard: {...props.billingInfo.creditCard, cardNumber: state.lastFour}})} />
                        </RecurlyElementStyle>

                    </div>

                    <div className="col col-6 sm-col-2 sm-pl1 mb2 pr1">
                        <Text size={14} weight="med">CVV</Text>
                        <RecurlyElementStyle>
                            <CardCvvElement style={{ fontColor: Theme.colors["gray-1"], fontFamily: 'Roboto', fontSize: '14px' }} />
                        </RecurlyElementStyle>

                    </div>

                    <div className="col col-3 sm-col-2 pl1 mb2 pr1">
                        <Text size={14} weight="med">Month</Text>
                        <RecurlyElementStyle>
                            <CardMonthElement style={{ fontColor: Theme.colors["gray-1"], fontFamily: 'Roboto', fontSize: '14px' }} />
                        </RecurlyElementStyle>

                    </div>

                    <div className="col col-3 sm-col-2 pl1 mb2">
                        <Text size={14} weight="med">Year</Text>
                        <RecurlyElementStyle>
                            <CardYearElement style={{ fontColor: Theme.colors["gray-1"], fontFamily: 'Roboto', fontSize: '14px' }} />
                        </RecurlyElementStyle>

                    </div>
                    <Input
                        data-recurly="vat_number"
                        className={ClassHalfXsFullMd+'pr1 mb2'}
                        label="VAT Number"
                        type='text'
                        required={false}
                        onChange={(event) => props.callback({...props.billingInfo, creditCard: {...props.billingInfo.creditCard, vatNumber: event.currentTarget.value}})}
                    />
                    <Input
                        data-recurly="country"
                        className={ClassHalfXsFullMd+'pl1 mb2'}
                        label="Country"
                        type='text'
                        required={false}
                        onChange={(event) => props.callback({...props.billingInfo, creditCard: {...props.billingInfo.creditCard, country: event.currentTarget.value}})}
                    />
                    <Input
                        data-recurly="address1"
                        className={ClassHalfXsFullMd+'pr1 mb2'}
                        label="Street Address 1"
                        type='text'
                        required={false}
                        onChange={(event) => props.callback({...props.billingInfo, creditCard: {...props.billingInfo.creditCard, address1: event.currentTarget.value}})}
                    />
                    <Input
                        data-recurly="address2"
                        className={ClassHalfXsFullMd+'pl1 mb2'}
                        label="Street Address 2"
                        indicationLabel='Optional'
                        type='text'
                        required={false}
                        onChange={(event) => props.callback({...props.billingInfo, creditCard: {...props.billingInfo.creditCard, address2: event.currentTarget.value}})}
                    />
                    <Input
                        data-recurly="city"
                        className='col sm-col-4 col-12 xs-no-gutter pr1 xs-mb2'
                        label="Town/City"
                        type='text'
                        required={false}
                        onChange={(event) => props.callback({...props.billingInfo, creditCard: {...props.billingInfo.creditCard, city: event.currentTarget.value}})}
                    />
                    <Input
                        data-recurly="state"
                        className='col sm-col-4 col-6 pr1 sm-pl1 xs-mb2'
                        label="State/Province"
                        type='text'
                        indicationLabel='Optional'
                        required={false}
                        onChange={(event) => props.callback({...props.billingInfo, creditCard: {...props.billingInfo.creditCard, state: event.currentTarget.value}})}
                    />
                    <Input
                        data-recurly="postal_code"
                        className='col sm-col-4 col-6 pl1'
                        label="Zip/Postal Code"
                        type='text'
                        required={false}
                        onChange={(event) => props.callback({...props.billingInfo, creditCard: {...props.billingInfo.creditCard, postCode: event.currentTarget.value}})}
                    />
                </div>
                <input type="hidden" name="recurly-token" data-recurly="token"></input>
            </RadioButtonOption>

            <RadioButtonContainer className='mt2' isSelected={selectedOption === 'paypal'} >
                <InputRadio name='paymentMethodForm' value='paypalForm' onChange={() => setSelectedOption('paypal')} label='PayPal' />
                <img src={PaypalLogo} />
            </RadioButtonContainer>
            <RadioButtonOption isOpen={selectedOption === 'paypal'} className='mb2'>
                <div className='m2'>
                    <Text size={14} weight='reg' color='gray-1'>
                        When you click next, you will be redirected to another website where you may securely enter your banking details. After completing the requested information you will be redirected back to Dacast.
                    </Text>
                    <Button onClick={() => payPalInstance.start()}>Recurly Checkout</Button>
                </div>

            </RadioButtonOption>
            { threeDSecureActionToken &&
            <div >
                <ThreeDSecure
                    style={{height:400}}
                    actionTokenId={threeDSecureActionToken}
                    onToken={(actionToken) => {props.actionButton(recurlyToken, actionToken.id)}}
                    onError={(error) => props.handleThreeDSecureFail()}
                >
                </ThreeDSecure>
            </div>
            }
        </form>
    )
}

const ThreeDSecure = styled(ThreeDSecureAction)`
height: 400px;
`