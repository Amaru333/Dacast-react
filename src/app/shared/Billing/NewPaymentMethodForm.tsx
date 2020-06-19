import * as React from 'react';
import { TextStyle, RadioButtonContainer, RadioButtonOption, RecurlyElementStyle } from './BillingStyle';
import { Text } from '../../../components/Typography/Text';
import { InputRadio } from '../../../components/FormsComponents/Input/InputRadio';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { useRecurlySubmit } from '../../utils/useRecurlySubmit';
import { Theme } from '../../../styled/themes/dacast-theme';
const CardLogo = require('../../../../public/assets/credit_card_logo.svg');
const PaypalLogo = require('../../../../public/assets/paypal_logo.svg');
import { CardNumberElement, CardCvvElement, CardMonthElement, CardYearElement, useRecurly } from '@recurly/react-recurly';
import { useStepperFinalStepAction } from '../../utils/useStepperFinalStepAction';
import { ClassHalfXsFullMd } from '../General/GeneralStyle';

export const NewPaymentMethodForm = (props: { callback: Function; actionButton?: Function }) => {

    const [selectedOption, setSelectedOption] = React.useState<string>('creditCard');

    let formRef = React.useRef<HTMLFormElement>(null);

    const recurly = useRecurly()

    useStepperFinalStepAction('stepperNextButton', () => useRecurlySubmit(formRef.current, selectedOption, props.callback, recurly, props.actionButton))

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
                    />
                    <Input
                        data-recurly="last_name"
                        className={ClassHalfXsFullMd+ 'pl1 mb2'}
                        label="Account's Holder Last Name"
                        type='text'
                        required={false}
                    />
                    <div className={ClassHalfXsFullMd+ 'pr1 mb2'}>
                        <Text size={14} weight="med">Number</Text>
                        <RecurlyElementStyle>
                            <CardNumberElement style={{ fontColor: Theme.colors["gray-1"], fontFamily: 'Roboto', fontSize: '14px' }} />
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
                    />
                    <Input
                        data-recurly="country"
                        className={ClassHalfXsFullMd+'pl1 mb2'}
                        label="Country"
                        type='text'
                        required={false}
                    />
                    <Input
                        data-recurly="address1"
                        className={ClassHalfXsFullMd+'pr1 mb2'}
                        label="Street Address 1"
                        type='text'
                        required={false}
                    />
                    <Input
                        data-recurly="address2"
                        className={ClassHalfXsFullMd+'pl1 mb2'}
                        label="Street Address 2"
                        indicationLabel='Optional'
                        type='text'
                        required={false}
                    />
                    <Input
                        data-recurly="city"
                        className='col sm-col-4 col-12 xs-no-gutter pr1 xs-mb2'
                        label="Town/City"
                        type='text'
                        required={false}
                    />
                    <Input
                        data-recurly="state"
                        className='col sm-col-4 col-6 pr1 sm-pl1 xs-mb2'
                        label="State/Province"
                        type='text'
                        indicationLabel='Optional'
                        required={false}
                    />
                    <Input
                        data-recurly="postal_code"
                        className='col sm-col-4 col-6 pl1'
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
                <div className='m2'>
                    <Text size={14} weight='reg' color='gray-1'>
                        When you click next, you will be redirected to another website where you may securely enter your banking details. After completing the requested information you will be redirected back to Dacast.
                    </Text>
                </div>

            </RadioButtonOption>
            <div id='#threeDSecureComponent'></div>
        </form>
    )
}