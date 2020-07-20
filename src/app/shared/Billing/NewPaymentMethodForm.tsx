import * as React from 'react';
import { TextStyle, RadioButtonContainer, RadioButtonOption, RecurlyElementStyle } from './BillingStyle';
import { Text } from '../../../components/Typography/Text';
import { InputRadio } from '../../../components/FormsComponents/Input/InputRadio';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { Theme } from '../../../styled/themes/dacast-theme';
const CardLogo = require('../../../../public/assets/credit_card_logo.svg');
const PaypalLogo = require('../../../../public/assets/paypal_logo.svg');
import { CardNumberElement, CardCvvElement, CardMonthElement, CardYearElement, useRecurly, ThreeDSecureAction } from '@recurly/react-recurly';
import { useStepperFinalStepAction } from '../../utils/useStepperFinalStepAction';
import { ClassHalfXsFullMd } from '../General/GeneralStyle';
import styled from 'styled-components';
import { BillingPageInfos } from '../../redux-flow/store/Account/Plan/types';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Divider } from '@material-ui/core';
import { Table } from '../../../components/Table/Table';

export const NewPaymentMethodForm = (props: { recurlyFunction: Function; callback: Function; actionButton?: Function; handleThreeDSecureFail?: Function; billingInfo?: BillingPageInfos; stepperData?: any; isUpdate?: boolean }) => {

    const [selectedOption, setSelectedOption] = React.useState<string>('creditCard')
    const [recurlyToken, setRecurlyToken] = React.useState<string>(null)
    const [threeDSecureActionToken, setThreeDSecureActionToken] = React.useState<string>(null)
    const [hideForm, setHideForm] = React.useState<boolean>(false)

    let formRef = React.useRef<HTMLFormElement>(null)

    const elements = recurly.Elements();

    React.useEffect(() => {
        if (threeDSecureActionToken !== null) {
            setHideForm(true);
        }
    }, [threeDSecureActionToken])

    React.useEffect(() => {
        if (props.billingInfo.paymentMethod.type !== "" && !props.isUpdate) {
            setHideForm(true);
        }
    }, [])

    recurly.configure('ewr1-hgy8aq1eSuf8LEKIOzQk6T');

    useStepperFinalStepAction('stepperNextButton', () => {
        if (((props.billingInfo.paymentMethod.type === "" || props.billingInfo.paymentMethod.type === "card") && selectedOption === 'paypal') || props.billingInfo.paymentMethod.type === "paypal" ) {
            const paypal = recurly.PayPal(
                { display: { displayName: " Dacast " } }
            )

            paypal.on('token', token => {
                props.recurlyFunction(token.id, null, (token3Ds: string) => {
                    setThreeDSecureActionToken(token3Ds);
                });
            })

            paypal.on('error', error => {
                props.handleThreeDSecureFail();
            })

            paypal.on('cancel', (e) => {
                props.handleThreeDSecureFail();
            })

            paypal.on('ready', () => {
                console.log('Ready')
            })

            paypal.start();

        } else {
            if (props.billingInfo.paymentMethod.type === "" || props.isUpdate){
                recurly.token(formRef.current, (err: any, token: any) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        setRecurlyToken(token.id);
                        {props.isUpdate ? 
                            props.recurlyFunction(token.id) :
                            props.recurlyFunction(token.id, null, (token3Ds: string) => {
                                setThreeDSecureActionToken(token3Ds);
                            });
                        }
                        props.callback()
                    }
                });
            } else {
                setRecurlyToken("");
                    props.recurlyFunction("", null, (token3Ds: string) => {
                        setThreeDSecureActionToken(token3Ds);
                    });
            }      
        }

    })

    const [isAttached, setIsAttached] = React.useState<boolean>(false)

    React.useEffect(() => {
        if(!isAttached ) {
            const CardElement = elements.CardElement();
            CardElement.attach("#recurly-elements");
            setIsAttached(true)
        }
    });

    const paymentMethodTableHeader = () => {
        return {
            data: [
                { cell: <Text key={"step2PCardTableHeaderText"} size={14} weight="med" color="gray-1">Paying with {props.billingInfo.paymentMethod.type}</Text> },
                { cell: <img key={"step2CardTableHeaderImg"} className='right mr2' src={CardLogo} /> }
            ]
        }
    }

    const paymentMethodTableBody = () => {
        return [{
            data: [
                <Text key={"step2PCreditCardBodyText"} size={14} weight="med" color="gray-1">{props.billingInfo.paymentMethod.type === "card" ? `Card ending with ${props.billingInfo.paymentMethod.lastFour}` : props.billingInfo.paymentMethod.email}</Text>,
                <Text className='right mr2' key={"step2PCreditCardBodyTextExpiry"} size={14} weight="med" color="gray-1">{props.billingInfo.paymentMethod.type === "card" ? props.billingInfo.paymentMethod.expiryMonth +  '/' + props.billingInfo.paymentMethod.expiryYear : props.billingInfo.paymentMethod.billingID}</Text>,

            ]
        }]
    }

    return (
        
        <> 
        {(props.billingInfo.paymentMethod.type !== "" && !props.isUpdate)  && 
        <div>
            <Table id="paymentMethodTable" header={paymentMethodTableHeader()} body={paymentMethodTableBody()} headerBackgroundColor="gray-10"></Table>
        </div>
        }
            <form hidden={hideForm} id='paymentMethodForm' ref={formRef} onSubmit={(event) => { event.preventDefault() }} >
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
                            className={ClassHalfXsFullMd + 'pl1 mb2'}
                            label="Account's Holder Last Name"
                            type='text'
                            required={false}
                            
                        />
                        <div className='mb2 col col-12' id="recurly-elements"></div>
                        <Input
                            data-recurly="vat_number"
                            className={ClassHalfXsFullMd + 'pr1 mb2'}
                            label="VAT Number"
                            type='text'
                            required={false}
                            
                        />
                        <Input
                            data-recurly="country"
                            className={ClassHalfXsFullMd + 'pl1 mb2'}
                            label="Country"
                            type='text'
                            required={false}
                            
                        />
                        <Input
                            data-recurly="address1"
                            className={ClassHalfXsFullMd + 'pr1 mb2'}
                            label="Street Address 1"
                            type='text'
                            required={false}
                            
                        />
                        <Input
                            data-recurly="address2"
                            className={ClassHalfXsFullMd + 'pl1 mb2'}
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
            </form>

            {
                threeDSecureActionToken && hideForm &&
                <div >
                    <ThreeDSecure
                        style={{ height: 400 }}
                        actionTokenId={threeDSecureActionToken}
                        onToken={(actionToken) => { props.actionButton(recurlyToken, actionToken.id); setHideForm(false); setThreeDSecureActionToken(null); }}
                        onError={(error) => { props.handleThreeDSecureFail(); setHideForm(false); setThreeDSecureActionToken(null); }}
                    />
                </div>
            }
        </>
    )
}

const ThreeDSecure = styled(ThreeDSecureAction)`
    height: 400px;
`