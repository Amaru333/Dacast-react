import React from 'react';
import { Table } from '../../../components/Table/Table';
import { Modal } from '../../../components/Modal/Modal';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Card } from '../../../components/Card/Card';
import styled from 'styled-components';
import { Icon } from '@material-ui/core';
import { useMedia } from '../../../utils/utils';
import { PaymentMethodModal } from './PaymentMethodModal';
import { ProtectionModal } from './ProtectionModal';
import { ExtrasStepperFirstStep ,ExtrasStepperSecondStep } from './ExtrasModal';
import { CustomStepper } from '../../../components/Stepper/Stepper';
import { BillingPageInfos } from '../../../redux-flow/store/Account/Billing/types';

interface BillingComponentProps {
    billingInfos: BillingPageInfos;
    saveBillingPagePaymentMethod: Function;
}

export const BillingPage = (props: BillingComponentProps) => {

    const [paymentMethod, setpaymentMethod] = React.useState<string>(null);
    const [paypalModalOpened, setPaypaylModalOpened] = React.useState<boolean>(false);
    const [protectionModalOpened, setProtectionModalOpened] = React.useState<boolean>(false);
    const [extrasModalOpened, setExtrasModalOpened] = React.useState<boolean>(false);
    const stepList = [ExtrasStepperFirstStep, ExtrasStepperSecondStep];

    const checkPaymentMethod = () => {
        if(props.billingInfos.paypal) {
            setpaymentMethod('paypal');
        }
        else if(props.billingInfos.creditCard) {
            setpaymentMethod('creditCard');
        }
        else {
            setpaymentMethod(null);
        }
    }

    React.useEffect(() => {
        recurly.configure('ewr1-hgy8aq1eSuf8LEKIOzQk6T');
        checkPaymentMethod()
        
    }, [])

    React.useEffect(()=> {checkPaymentMethod()}, [props.billingInfos.paypal, props.billingInfos.creditCard])

    let smScreen = useMedia('(max-width: 780px)');

    const paypalTableHeaderElement = () => {
        return [
            <Text  key={"paypalTablePaymentType"} size={14}  weight="med" color="gray-1">Payment Type</Text>,
            <Text  key={"paypalTableBillingId"} size={14}  weight="med" color="gray-1">Billing ID</Text>,
            <Text  key={"paypalTableEmailAddress"} size={14}  weight="med" color="gray-1">Email Address</Text>,
            <Text  key={"paypalTableActive"} size={14}  weight="med" color="gray-1">Active</Text>,
            <Button className={"right mr2 "+ (smScreen ? 'hide' : '')} key={"paypalTableActionButton"} type="button" onClick={(event) => {event.preventDefault();setPaypaylModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Update Payment Method</Button>
        ]
    }

    const paypalBodyElement= () => {
        if(props.billingInfos.paypal) {
            return [[
                <Text key={'paypalTablePaypalType'} size={14}  weight="reg" color="gray-1">PayPal</Text>,
                <Text key={'paypalTable' + props.billingInfos.paypal.billingId} size={14}  weight="reg" color="gray-1">{props.billingInfos.paypal.billingId}</Text>,
                <Text key={'paypalTable' + props.billingInfos.paypal.emailAddress} size={14}  weight="reg" color="gray-1">{props.billingInfos.paypal.emailAddress}</Text>,
                <IconCheck key={'paypalTableActiveField'}><Icon >checked</Icon></IconCheck>,
                <span key={'paypalTableBodyEmptyCell'}></span>
            ]]
        }
    }

    const creditCardTableHeaderElement = () => {
        return [
            <Text  key={"creditCardTablePaymentType"} size={14}  weight="med" color="gray-1">Payment Type</Text>,
            <Text  key={"creditCardTableCardHolder"} size={14}  weight="med" color="gray-1">Card Holder</Text>,
            <Text  key={"creditCardTableCardNumber"} size={14}  weight="med" color="gray-1">Card Number</Text>,
            <Text  key={"creditCardTableExpiry"} size={14}  weight="med" color="gray-1">Expiry</Text>,
            <Text  key={"creditCardTableActive"} size={14}  weight="med" color="gray-1">Active</Text>,
            <Button className={"right mr2 "+ (smScreen ? 'hide' : '')} key={"creditCardTableActionButton"} type="button" onClick={(event) => {event.preventDefault();setPaypaylModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Update Payment Method</Button>
        ]
    }

    const creditCardBodyElement= () => {
        if(props.billingInfos.creditCard) {
            return [[
                <Text key={'creditCardTableCreditCard'} size={14}  weight="reg" color="gray-1">Credit Card</Text>,
                <Text key={'creditCardTable' + props.billingInfos.creditCard.firstName} size={14}  weight="reg" color="gray-1">{props.billingInfos.creditCard.firstName + props.billingInfos.creditCard.lastName}</Text>,
                <Text key={'creditCardTable' + props.billingInfos.creditCard.cardNumber} size={14}  weight="reg" color="gray-1">{props.billingInfos.creditCard.cardNumber}</Text>,
                <Text key={'creditCardTable' + props.billingInfos.creditCard.month} size={14}  weight="reg" color="gray-1">{props.billingInfos.creditCard.month + '/' + props.billingInfos.creditCard.year}</Text>,
                <IconCheck key={'creditCardTableActive'}><Icon >checked</Icon></IconCheck>,
                <span key={'creditCardTableBodyEmptyCell'}></span>
            ]
            ]
        }
    }

    const disabledTableHeader = () => {
        return [
            <span key={'disabledTableHeader'}></span>
        ]
    }

    const disabledTableBody = (text: string) => {
        return [[
            <Text key={'disabledTableText' + text} className='center' size={14} weight='reg' color='gray-3' >{text}</Text>
        ]]
    }

    const protectionTableHeaderElement = () => {
        return [
            <Text  key={"protectionTableEnabled"} size={14}  weight="med" color="gray-1">Enabled</Text>,
            <Text  key={"protectionTableAmount"} size={14}  weight="med" color="gray-1">Amount</Text>,
            <Text  key={"protectionTablePrice"} size={14}  weight="med" color="gray-1">Price</Text>,
            <Button className={"right mr2 "+ (smScreen ? 'hide' : '')} key={"protectionTableActionButton"} type="button" onClick={(event) => {event.preventDefault();setProtectionModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Enable Protection</Button>
        ]
    }

    const protectionBodyElement= () => {
        if(props.billingInfos.playbackProtection) {
            return [[
                <IconCheck key={'playbackProtectionEnabledValue'}><Icon >{props.billingInfos.playbackProtection.enabled ? 'checked' : ''}</Icon></IconCheck>,
                <Text key={'playbackProtectionAmountValue'} size={14}  weight="reg" color="gray-1">{props.billingInfos.playbackProtection.amount}</Text>,
                <Text key={'playbackProtectionPriceValue'} size={14}  weight="reg" color="gray-1">{props.billingInfos.playbackProtection.price}</Text>,
                <span key={'playbackProtectionBodyEmptyCell'}></span>
            ]]
        }
    }


    const extrasTableHeaderElement = () => {
        return [
            <Text  key={"extrasTableType"} size={14}  weight="med" color="gray-1">Type</Text>,
            <Text  key={"extrasTableEnabled"} size={14}  weight="med" color="gray-1">Enabled</Text>,
            <Text  key={"extrasTableAmount"} size={14}  weight="med" color="gray-1">Amount</Text>,
            <Text  key={"extrasTablePrice"} size={14}  weight="med" color="gray-1">Date purchased</Text>,
            <Button className={"right mr2 "+ (smScreen ? 'hide' : '')} key={"extrasTableActionButton"} type="button" onClick={(event) => {event.preventDefault();setExtrasModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Purchase Extras</Button>
        ]
    }

    const extrasBodyElement= () => {
        if(props.billingInfos.extras) {
            return props.billingInfos.extras.map((value, key) => {
                return [
                    <Text key={key.toString() +value.type} size={14}  weight="reg" color="gray-1">{value.type}</Text>,
                    <Text key={key.toString() +value.amount} size={14}  weight="reg" color="gray-1">{value.amount}</Text>,
                    <Text key={key.toString() +value.price} size={14}  weight="reg" color="gray-1">{value.price}</Text>,
                    <Text key={key.toString() +value.datePurchased} size={14}  weight="reg" color="gray-1">{value.datePurchased}</Text>,
                    <span key={'extrasTableBodyElementEmptyCell'}></span>
                ]
            })
        }
    }

    return (
        <div>   
            <Card>
                <TextStyle className="px1 py2" ><Text size={20} weight='med' color='gray-1'>Payment Method</Text></TextStyle>
                <TextStyle className="px1 pb2" ><Text size={14} weight='reg' color='gray-1'>Your chosen Payment Method will be charged for your Plan, optional Playback Protection, Extras and Overages. Choose from PayPal or Card. If you wish to pay using Check, Wire or Transfer, then please Contact Us.</Text></TextStyle>
                <Button className={"left mb2 "+ (smScreen ? '' : 'hide')} type="button" onClick={(event) => {event.preventDefault();setPaypaylModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Add Payment Method</Button>
                {
                    props.billingInfos.paypal? 
                        <Table className="col-12 mx1 mb1" id="paypalTable" header={paypalTableHeaderElement()} body={paypalBodyElement()} />

                        : props.billingInfos.creditCard ?                
                            <Table className="col-12 mx1 mb1" id="creditCardTable" header={creditCardTableHeaderElement()} body={creditCardBodyElement()} />
                            : 
                            <Table className="col-12 mx1 mb1" id="paymentMethodTable" header={creditCardTableHeaderElement()} />


                }
                
                <BorderStyle className="p1 mx1" />
                <TextStyle className="px1 py2" ><Text size={20} weight='med' color='gray-1'>Playback Protection</Text></TextStyle>
                <TextStyle className="px1 pb2" ><Text size={14} weight='reg' color='gray-3'>Automatically buy more Data when you run out to ensure your content never stops playing, even if you use all your data.</Text></TextStyle>
                <Button className={"left mb2 "+ (smScreen ? '' : 'hide')} type="button" onClick={(event) => {event.preventDefault();setProtectionModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Enable protection</Button>
               
                {
                    (props.billingInfos.paypal === null || typeof props.billingInfos.paypal === 'undefined') && (props.billingInfos.creditCard=== null || typeof props.billingInfos.creditCard === 'undefined') ?
                        <Table className="col-12 mx1 mb1" id="protectionTableDisabled" header={disabledTableHeader()} body={disabledTableBody('Add Payment Method before Enablind Playback Protection')} />
                        :<Table className="col-12 mx1 mb1" id="protectionTable" header={protectionTableHeaderElement()} body={protectionBodyElement()} />
                    

                }
                
                <BorderStyle className="p1 mx1" />
                <TextStyle className="px1 py2" ><Text size={20} weight='med' color='gray-1'>Buy Allowances</Text></TextStyle>
                <TextStyle className="px1 pb2" ><Text size={14} weight='reg' color='gray-3'>Buy more Data / Encoding as a one-off purchase or get a recurring Storage add-on.</Text></TextStyle>
                <Button className={"left mb2 "+ (smScreen ? '' : 'hide')} type="button" onClick={(event) => {event.preventDefault();setExtrasModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Purchase extras</Button>
                {
                    (props.billingInfos.paypal === null || typeof props.billingInfos.paypal === 'undefined') && (props.billingInfos.creditCard=== null || typeof props.billingInfos.creditCard === 'undefined') ?
                        <Table className="col-12 mx1 mb1" id="extrasTableDisabled" header={disabledTableHeader()} body={disabledTableBody('Add Payment Method before Purchasing any Allowances')} />
                        :<Table className="col-12 mx1 mb1" id="extrasTable" header={extrasTableHeaderElement()} body={extrasBodyElement()} />
                }
            
            </Card>
            <Modal hasClose={false} title={(paymentMethod ? 'Edit' : 'Add')  + ' Payment Method'} toggle={() => setPaypaylModalOpened(!paypalModalOpened)} size='large' opened={paypalModalOpened}>
                <PaymentMethodModal actionButton={props.saveBillingPagePaymentMethod} toggle={setPaypaylModalOpened} />
            </Modal>
            <Modal hasClose={false} title='Enable protection' toggle={() => setProtectionModalOpened(!protectionModalOpened)} size='large' opened={protectionModalOpened}>
                <ProtectionModal toggle={setProtectionModalOpened} />
            </Modal>
            <CustomStepper 
                opened={extrasModalOpened}
                stepperHeader='Purchase Extras'
                stepList={stepList}
                nextButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Next"}} 
                backButtonProps={{typeButton: "secondary", sizeButton: "large", buttonText: "Back"}} 
                cancelButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Cancel"}}
                stepTitles={['Cart', 'Payment']}
                lastStepButton="Purchase"
                functionCancel={setExtrasModalOpened}
                finalFunction={() => {console.log('yes')}}
            />

        </div>

    )
}

export const ToggleTextInfo = styled.p<{}>`
    margin-top: 0px;
    margin-block-end: 8px;
    display: inline-flex;
`

export const TextStyle = styled.span<{}>`
    display: block;
`

export const BorderStyle = styled.div<{}>`
    border-bottom: 1px solid ${props => props.theme.colors['gray-7']};
    display: flex;
`

export const IconContainer = styled.div`
    float:right;
    display:none;
    .material-icons{
        margin-right:16px;
        color:  ${props => props.theme.colors["gray-1"]};
    }
`

export const IconCheck = styled.span`
    color:  ${props => props.theme.colors["green"]};
`