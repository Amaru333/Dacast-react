import * as React from 'react';
import { RadioButtonContainer, RadioButtonOption } from './BillingStyle';
import { Text } from '../../../components/Typography/Text';
import { InputRadio } from '../../../components/FormsComponents/Input/InputRadio';
import { Input } from '../../../components/FormsComponents/Input/Input';
const CardLogo = require('../../../../public/assets/credit_card_logo.svg');
const PaypalLogo = require('../../../../public/assets/paypal_logo.svg');
import { ThreeDSecureAction } from '@recurly/react-recurly';
import { ClassHalfXsFullMd } from '../General/GeneralStyle';
import styled from 'styled-components';
import { BillingPageInfos, PaymentDetails, DefaultPaymentDetails } from '../../redux-flow/store/Account/Plan/types';
import { Table } from '../../../components/Table/Table';
import {countries} from 'countries-list'
import { StateList, ProvinceList } from '../Common/countryList';
import { Bubble } from '../../../components/Bubble/Bubble';
import { handleValidationForm } from '../../utils/custom-hooks/formValidationHook';
import { useForm } from 'react-hook-form';


export const useStepperFinalStepAction = (buttonId: string, callback: Function) => {
    const doAThing = () => {if(document.getElementById(buttonId).innerText !== 'Next') {
        callback()
    }}
    React.useEffect(() => {
        document.getElementById(buttonId).addEventListener('click', doAThing)

        return () => {
            document.getElementById(buttonId).removeEventListener('click', doAThing)
        }

    }, [callback])
}

export const NewPaymentMethodForm = (props: { recurlyFunction: Function; purchasePlan3Ds: Function, callback: Function; actionButton?: Function; handleThreeDSecureFail?: Function; billingInfo?: BillingPageInfos; stepperData?: any; isUpdate?: boolean; setFormValid?: Function }) => {

    const [selectedOption, setSelectedOption] = React.useState<string>('creditCard')
    const [recurlyToken, setRecurlyToken] = React.useState<string>(null)
    const [threeDSecureActionToken, setThreeDSecureActionToken] = React.useState<string>(null)
    const [hideForm, setHideForm] = React.useState<boolean>(false)
    const [recurlyError, setRecurlyError] = React.useState<string>(null)
    const [formData, setFormData] = React.useState<PaymentDetails>(DefaultPaymentDetails)

    const countriesArray = Object.values(countries).map(country => country.name)

    const compareCountries = (a: string, b: string) => {
        const countryA = a.toUpperCase();
        const countryB = b.toUpperCase();
    
        let comparison = 0
        if (countryA > countryB) {
            comparison = 1;
          } else if (countryA < countryB) {
            comparison = -1;
          }
          return comparison;
    }

    let formRef = React.useRef<HTMLFormElement>(null)

    React.useEffect(() => {
        if(props.setFormValid){
            if((formData.firstName && formData.lastName && formData.address && formData.country && formData.city && formData.postCode) || selectedOption === "paypal"){
                if(((formData.country === "United States" || formData.country === "Canada") && formData.state) || (formData.country !== "United States" && formData.country !== "Canada")) {
                    props.setFormValid(true)
                }
            } else {
                props.setFormValid(false)
            }
        }
    }, [formData, selectedOption])

    const elements = recurly.Elements();

    React.useEffect(() => {
        if (threeDSecureActionToken !== null) {
            setHideForm(true);
        }
        console.log('action token', threeDSecureActionToken)
    }, [threeDSecureActionToken])

    React.useEffect(() => {
        if (props.billingInfo.paymentMethod.type !== "" && !props.isUpdate) {
            setHideForm(true);
        }
    }, [])

    recurly.configure(process.env.RECURLY_TOKEN);

    useStepperFinalStepAction('stepperNextButton', () => {
        if (((props.billingInfo.paymentMethod.type === "" || props.billingInfo.paymentMethod.type === "card") && selectedOption === 'paypal') || (props.billingInfo.paymentMethod.type === "paypal" && !props.isUpdate) ) {
            const paypal = recurly.PayPal(
                { display: { displayName: " Dacast " } }
            )

            paypal.on('token', (token: any) => {
                props.recurlyFunction(token.id, null, (token3Ds: string) => {
                    setThreeDSecureActionToken(token3Ds);
                });
                props.callback()
            })

            paypal.on('error', (error: any) => {
                props.handleThreeDSecureFail();
            })

            paypal.on('cancel', (e: any) => {
                props.handleThreeDSecureFail();
            })

            paypal.on('ready', () => {
            })

            paypal.start();

        } else {
            if (props.billingInfo.paymentMethod.type === "" || props.isUpdate){
                recurly.token(formRef.current, (err: any, token: any) => {
                    if (err) {
                        setRecurlyError(err.message)
                    }
                    else {
                        setRecurlyToken(token.id);
                            props.recurlyFunction(token.id, null, (token3Ds: string) => {
                                if(token3Ds) {
                                    setThreeDSecureActionToken(token3Ds);
                                }
                            });
                        props.callback()
                        setRecurlyError(null)
                    }
                });
            } else {
                setRecurlyToken("");
                    props.recurlyFunction("", null, (token3Ds: string) => {
                        if(token3Ds) {
                            setThreeDSecureActionToken(token3Ds);
                        }
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

    const {register, errors} = useForm({
        reValidateMode: 'onChange',
        mode: 'onBlur'
    })

    return (
        
        <> 
        {(props.billingInfo.paymentMethod.type !== "" && !props.isUpdate)  && 
        <div>
            <Table id="paymentMethodTable" header={paymentMethodTableHeader()} body={paymentMethodTableBody()} headerBackgroundColor="gray-10"></Table>
        </div>
        }
            <form hidden={hideForm} id='paymentMethodForm' ref={formRef} onSubmit={(event) => { event.preventDefault() }} >
                <div className='mb2'>
                    <Text size={14} weight='reg' color='gray-1'>Choose which payment method you want to use</Text>
                </div>
                <RadioButtonContainer isSelected={selectedOption === 'creditCard'}>
                    <InputRadio name='paymentMethodForm' value='creditCard' defaultChecked={true} onChange={() => setSelectedOption('creditCard')} label='Credit Card' />
                    <img src={CardLogo} />
                </RadioButtonContainer>
                <RadioButtonOption isOpen={selectedOption === 'creditCard'} className='mb2'>
                    <div className='col col-12 pt2 pb25 px2'>
                        <Input
                            data-recurly="first_name"
                            id="first_name"
                            className={ClassHalfXsFullMd + 'pr1 mb2'}
                            label="Account's Holder First Name"
                            type='text'
                            onChange={(event) => setFormData({...formData, firstName: event.currentTarget.value})}
                            {...handleValidationForm('first_name', errors)} ref={register({ required: "Required" })}
                            
                        />
                        <Input
                            data-recurly="last_name"
                            id="last_name"
                            className={ClassHalfXsFullMd + 'pl1 mb2'}
                            label="Account's Holder Last Name"
                            type='text'
                            onChange={(event) => setFormData({...formData, lastName: event.currentTarget.value})}
                            {...handleValidationForm('last_name', errors)} ref={register({ required: "Required" })}
                            
                        />
                        <div className='mb2 col col-12' id="recurly-elements"></div>
                        <Input
                            data-recurly="vat_number"
                            className={ClassHalfXsFullMd + 'pr1 mb2'}
                            label="VAT Number"
                            type='text'
                            required={false}
                            indicationLabel='Optional'
                        />
                        <div>
                            <Input
                                data-recurly="country"
                                id='country'
                                className={ClassHalfXsFullMd + 'pr1 mb2'}
                                label="Country"
                                list='countryList'
                                autocomplete='off'
                                onChange={(event) => setFormData({...formData, country: event.currentTarget.value})}
                                {...handleValidationForm('country', errors)} ref={register({ required: "Required" })}
                            />
                            <datalist id='countryList'>
                            {countriesArray.sort(compareCountries).map(country => {
                                return (
                                    <option key={country}>{country}</option>
                                )
                            })}
                            </datalist>
                        </div>

                        <div className="mb2 col col-12">
                        <Input
                            data-recurly="address1"
                            id="address1"
                            className={ClassHalfXsFullMd + 'pr1 mb2'}
                            label="Street Address 1"
                            type='text'
                            onChange={(event) => setFormData({...formData, address: event.currentTarget.value})}
                            {...handleValidationForm('address1', errors)} ref={register({ required: "Required" })}
                            
                        />
                        <Input
                            data-recurly="address2"
                            className={ClassHalfXsFullMd + 'pl1 mb2'}
                            label="Street Address 2"
                            indicationLabel='Optional'
                            type='text'
                            required={false}
                            
                        />
                        </div>
                        
                        <Input
                            data-recurly="city"
                            id="city"
                            className='col sm-col-4 col-12 xs-no-gutter pr1 xs-mb2'
                            label="Town/City"
                            type='text'
                            onChange={(event) => setFormData({...formData, city: event.currentTarget.value})}
                            {...handleValidationForm('city', errors)} ref={register({ required: "Required" })}
                            
                        />
                        {
                            (formData.country === "United States" || formData.country === "Canada") ?
                                <div>
                                <Input
                                    data-recurly="state"
                                    className='col sm-col-4 col-6 pr1 sm-pl1 xs-mb2'
                                    label="State/Province"
                                    id='state'
                                    list='stateList'
                                    autocomplete='off'
                                    required={true}
                                    onChange={(event) => setFormData({...formData, state: event.currentTarget.value})}
                                    {...handleValidationForm('state', errors)} ref={register({ required: "Required" })}
                                />
                                <datalist id='stateList'className="col sm-col-4 col-6 pr1 sm-pl1 xs-mb2">
                                    {(formData.country === "United States" ? StateList : ProvinceList).map(state => {
                                        return (
                                            <option key={state}>{state}</option>
                                        )
                                    })}
                                </datalist>
                                </div>
                                :
                                <Input
                                    data-recurly="state"
                                    className='col sm-col-4 col-6 pr1 sm-pl1 xs-mb2'
                                    label="State/Province"
                                    type='text'
                                    indicationLabel='Optional'
                                    onChange={(event) => setFormData({...formData, state: event.currentTarget.value})}
                                    {...handleValidationForm('state', errors)} ref={register()}
                                />
                        }
                        
                        <Input
                            data-recurly="postal_code"
                            id="postal_code"
                            className='col sm-col-4 col-6 pl1'
                            label="Zip/Postal Code"
                            type='text'
                            onChange={(event) => setFormData({...formData, postCode: event.currentTarget.value})}
                            {...handleValidationForm('postal_code', errors)} ref={register({ required: "Required" })}
                            
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
                            When you click Add, you will be redirected to another website where you may securely enter your banking details. After completing the requested information you will be redirected back to Dacast.
                        </Text>
                    </div>

                </RadioButtonOption>
            </form>
            <Bubble className="mt25" type="error" hidden={!recurlyError}>
                {recurlyError}
            </Bubble>

            {
                (threeDSecureActionToken && hideForm) &&
                <div >
                    <ThreeDSecure
                        style={{ height: 400 }}
                        actionTokenId={threeDSecureActionToken}
                        onToken={(resultToken: any) => { props.purchasePlan3Ds(recurlyToken, resultToken.id); if (props.billingInfo.paymentMethod.type === "" || props.isUpdate) {setHideForm(false)}; setThreeDSecureActionToken(null) }}
                        onError={(error: any) => { props.handleThreeDSecureFail(); if(props.billingInfo.paymentMethod.type === "" || props.isUpdate){setHideForm(false)}; setThreeDSecureActionToken(null); }}
                    />
                </div>
            }
        </>
    )
}

const ThreeDSecure = styled(ThreeDSecureAction)`
    height: 400px;
`