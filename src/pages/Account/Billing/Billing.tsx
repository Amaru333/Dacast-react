import React from 'react';
import { Table } from '../../../components/Table/Table';
import { Modal, ModalContent, ModalFooter } from '../../../components/Modal/Modal';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Card } from '../../../components/Card/Card';
import styled from 'styled-components';
import { IconStyle, IconContainer } from '../../../shared/Common/Icon';
import { useMedia } from '../../../utils/utils';
import { PaymentMethodModal } from './PaymentMethodModal';
import { ProtectionModal } from './ProtectionModal';
import { ExtrasStepperFirstStep ,ExtrasStepperSecondStepCreditCard } from './ExtrasModal';
import { CustomStepper } from '../../../components/Stepper/Stepper';
import { BillingPageInfos, Extras } from '../../../redux-flow/store/Account/Billing/types';
import { Label } from '../../../components/FormsComponents/Label/Label';
import { ColorsApp } from '../../../styled/types';

interface BillingComponentProps {
    billingInfos: BillingPageInfos;
    saveBillingPagePaymentMethod: Function;
    addBillingPagePaymenPlaybackProtection: Function;
    editBillingPagePaymenPlaybackProtection: Function;
    deleteBillingPagePaymenPlaybackProtection: Function;
    addBillingPageExtras: Function;
}

export const BillingPage = (props: BillingComponentProps) => {

    const [paymentMethod, setpaymentMethod] = React.useState<string>(null);
    const [paypalModalOpened, setPaypaylModalOpened] = React.useState<boolean>(false);
    const [protectionModalOpened, setProtectionModalOpened] = React.useState<boolean>(false);
    const [playbackProtectionEnabled, setPlaybackProtectionEnabled] = React.useState<boolean>(props.billingInfos.playbackProtection ? props.billingInfos.playbackProtection.enabled : false )
    const [disableProtectionModalOpened, setDisableProtectionModalOpened] = React.useState<boolean>(false)
    const [extrasModalOpened, setExtrasModalOpened] = React.useState<boolean>(false);
    const [stepperExtraItem, setStepperExtraItem] = React.useState<Extras>(null);
    const stepList = [ExtrasStepperFirstStep, ExtrasStepperSecondStepCreditCard];

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

    const submitExtra = () => {
        if(stepperExtraItem) {
            props.addBillingPageExtras(stepperExtraItem);
            setExtrasModalOpened(false);
        }
    }

    React.useEffect(()=> {checkPaymentMethod()}, [props.billingInfos.paypal, props.billingInfos.creditCard])

    let smScreen = useMedia('(max-width: 780px)');

    const paypalTableHeaderElement = () => {
        return {data: [
            {cell: <Text  key={"paypalTablePaymentType"} size={14}  weight="med" color="gray-1">Payment Type</Text>},
            {cell: <Text  key={"paypalTableBillingId"} size={14}  weight="med" color="gray-1">Billing ID</Text>},
            {cell: <Text  key={"paypalTableEmailAddress"} size={14}  weight="med" color="gray-1">Email Address</Text>},
            {cell: <Text  key={"paypalTableActive"} size={14}  weight="med" color="gray-1">Active</Text>},
            {cell: <Button className={"right mr2 "+ (smScreen ? 'hide' : '')} key={"paypalTableActionButton"} type="button" onClick={(event) => {event.preventDefault();setPaypaylModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Update Payment Method</Button>}
        ]}
    }

    const paypalBodyElement= () => {
        if(props.billingInfos.paypal) {
            return [{data:[
                <Text key={'paypalTablePaypalType'} size={14}  weight="reg" color="gray-1">PayPal</Text>,
                <Text key={'paypalTable' + props.billingInfos.paypal.billingId} size={14}  weight="reg" color="gray-1">{props.billingInfos.paypal.billingId}</Text>,
                <Text key={'paypalTable' + props.billingInfos.paypal.emailAddress} size={14}  weight="reg" color="gray-1">{props.billingInfos.paypal.emailAddress}</Text>,
                <IconStyle key={'paypalTableActiveField'} coloricon='green' >checked</IconStyle>,
                <span key={'paypalTableBodyEmptyCell'}></span>
            ]}]
        }
    }

    const creditCardTableHeaderElement = () => {
        return props.billingInfos.creditCard ? {data: [
            {cell: <Text  key={"creditCardTablePaymentType"} size={14}  weight="med" color="gray-1">Payment Type</Text>},
            {cell: <Text  key={"creditCardTableCardHolder"} size={14}  weight="med" color="gray-1">Card Holder</Text>},
            {cell: <Text  key={"creditCardTableCardNumber"} size={14}  weight="med" color="gray-1">Card Number</Text>},
            {cell: <Text  key={"creditCardTableExpiry"} size={14}  weight="med" color="gray-1">Expiry</Text>},
            {cell: <Text  key={"creditCardTableActive"} size={14}  weight="med" color="gray-1">Active</Text>},
            {cell: <Button className={"right mr2 "+ (smScreen ? 'hide' : '')} key={"creditCardTableActionButton"} type="button" onClick={(event) => {event.preventDefault();setPaypaylModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Update Payment Method</Button>}
        ]} 
            : {data: [
                {cell: <Button className={"right mr2 "+ (smScreen ? 'hide' : '')} key={"creditCardTableActionButton"} type="button" onClick={(event) => {event.preventDefault();setPaypaylModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Update Payment Method</Button>}

            ]}
    }

    const creditCardBodyElement= () => {
        if(props.billingInfos.creditCard) {
            return [{data:[
                <Text key={'creditCardTableCreditCard'} size={14}  weight="reg" color="gray-1">Credit Card</Text>,
                <Text key={'creditCardTable' + props.billingInfos.creditCard.firstName} size={14}  weight="reg" color="gray-1">{props.billingInfos.creditCard.firstName + props.billingInfos.creditCard.lastName}</Text>,
                <Text key={'creditCardTable' + props.billingInfos.creditCard.cardNumber} size={14}  weight="reg" color="gray-1">{props.billingInfos.creditCard.cardNumber}</Text>,
                <Text key={'creditCardTable' + props.billingInfos.creditCard.month} size={14}  weight="reg" color="gray-1">{props.billingInfos.creditCard.month + '/' + props.billingInfos.creditCard.year}</Text>,
                <IconStyle key={'creditCardTableActive'} coloricon='green'>checked</IconStyle>,
                <span key={'creditCardTableBodyEmptyCell'}></span>
            ]}
            ]
        }
    }

    const disabledTableHeader = () => {
        return {data: [
            {cell: <span key={'disabledTableHeader'}></span>}
        ]}
    }

    const disabledTableBody = (text: string) => {
        return [{data:[
            <div className='center'>
                <Text key={'disabledTableText' + text} size={14} weight='reg' color='gray-3' >{text}</Text>
            </div> 
        ]}]
    }

    const protectionTableHeaderElement = () => {
        return playbackProtectionEnabled ? {data: [
            {cell: <Text  key={"protectionTableEnabled"} size={14}  weight="med" color="gray-1">Enabled</Text>},
            {cell: <Text  key={"protectionTableAmount"} size={14}  weight="med" color="gray-1">Amount</Text>},
            {cell: <Text  key={"protectionTablePrice"} size={14}  weight="med" color="gray-1">Price</Text>},
            {cell: <Button className={"right mr2 "+ (smScreen ? 'hide' : '')} key={"protectionTableActionButton"} type="button" onClick={(event) => {event.preventDefault();setDisableProtectionModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Disable Protection </Button>}
        ]} : {data: [
            {cell: <Button className={"right mr2 "+ (smScreen ? 'hide' : '')} key={"protectionTableActionButton"} type="button" onClick={(event) => {event.preventDefault();setProtectionModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Enable Protection</Button>}
        ]}
    }

    const protectionBodyElement= () => {
        if(props.billingInfos.playbackProtection) {
            return [{data:[
                <IconStyle key={'playbackProtectionEnabledValue'} coloricon='green'>{props.billingInfos.playbackProtection.enabled ? 'checked' : ''}</IconStyle>,
                <Text key={'playbackProtectionAmountValue'} size={14}  weight="reg" color="gray-1">{props.billingInfos.playbackProtection.amount}</Text>,
                <Text key={'playbackProtectionPriceValue'} size={14}  weight="reg" color="gray-1">{props.billingInfos.playbackProtection.price}</Text>,
                <IconContainer className="iconAction" key={'protectionTableActionButtons'}><IconStyle onClick={(event) => {event.preventDefault();props.deleteBillingPagePaymenPlaybackProtection(props.billingInfos.playbackProtection)}}>delete</IconStyle><IconStyle onClick={(event) => {event.preventDefault();setProtectionModalOpened(true) }}>edit</IconStyle> </IconContainer>
            ]}]
        } else {
            return [{data:[
                <div className='center'>
                    <Text  size={14} weight='reg' color='gray-3'>Enable Playback Protection to ensure your content never stops playing</Text>
                </div>
            ]}]
        }
    }

    const mockPlanDetails = [{
        planType: "event",
        paymentAmount: 890,
        paymentCurrency: "USD",
        recurring: "monthly",
        nextBill: "09/10/2020",
        status: "active",
        paywallBalance: 5604
    }]

    const planDetailsTableHeaderElement = () => {
        return {data:[
            {cell: <Text  key={"protectionTableEnabled"} size={14}  weight="med" color="gray-1">Plan Type</Text>},
            {cell: <Text  key={"protectionTableEnabled"} size={14}  weight="med" color="gray-1">Payment</Text>},
            {cell: <Text  key={"protectionTableEnabled"} size={14}  weight="med" color="gray-1">Reccuring</Text>},
            {cell: <Text  key={"protectionTableEnabled"} size={14}  weight="med" color="gray-1">Next Bill</Text>},
            {cell: <Text  key={"protectionTableEnabled"} size={14}  weight="med" color="gray-1">Status</Text>},
            {cell: <Text  key={"protectionTableEnabled"} size={14}  weight="med" color="gray-1">Paywall Balance</Text>}
        ]}
    }

    const planDetailsTableBodyElement = () => {
        return mockPlanDetails.map((planDetails) => {
            const color = planDetails.status === 'active' ? 'green' : planDetails.status === 'expired' ? 'yellow' : 'red';
            const BackgroundColor: ColorsApp = color + '20' as ColorsApp;
            return {data:[
                <Text key={'planDetailsType'} size={14} weight='reg' color='gray-1'>{planDetails.planType.charAt(0).toUpperCase() + planDetails.planType.slice(1)}</Text>,
                <Text key={'planDetailsPayment'} size={14} weight='reg' color='gray-1'>{planDetails.paymentCurrency === 'gbp' ? "£" : "$" + planDetails.paymentAmount + " " + planDetails.paymentCurrency.toUpperCase()}</Text>,
                <Text key={'planDetailsRecurring'} size={14} weight='reg' color='gray-1'>{planDetails.recurring.charAt(0).toUpperCase() + planDetails.recurring.slice(1)}</Text>,
                <Text key={'planDetailsNextBill'} size={14} weight='reg' color='gray-1'>{planDetails.nextBill}</Text>,
                <Label key={'planDetailsStatus'} backgroundColor={BackgroundColor} color={color} label={planDetails.status.charAt(0).toUpperCase() + planDetails.status.slice(1)} />,
                <Text key={'planDetailsPaywallBalance'} size={14} weight='reg' color='gray-1'>{planDetails.paymentCurrency === 'gbp' ? "£" : "$" + planDetails.paywallBalance + " " + planDetails.paymentCurrency.toUpperCase()}</Text>
            ]}})    
    }

    return (
        <div>   
            <Card>
                <TextStyle className="pb2" ><Text size={20} weight='med' color='gray-1'>Plan Details</Text></TextStyle>
                <Table id="planDetailsTable" headerBackgroundColor="gray-10" className="" header={planDetailsTableHeaderElement()} body={planDetailsTableBodyElement()}></Table>
                <BorderStyle className="py1" />
                <TextStyle className="py2" ><Text size={20} weight='med' color='gray-1'>Payment Method</Text></TextStyle>
                <TextStyle className="pb2" ><Text size={14} weight='reg' color='gray-1'>Your chosen Payment Method will be charged for your Plan, optional Playback Protection, Extras and Overages. Choose from PayPal or Card. If you wish to pay using Check, Wire or Transfer, then please Contact Us.</Text></TextStyle>
                <Button className={"left mb2 "+ (smScreen ? '' : 'hide')} type="button" onClick={(event) => {event.preventDefault();setPaypaylModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Add Payment Method</Button>
                {
                    props.billingInfos.paypal? 
                        <Table className="col-12" headerBackgroundColor="gray-10" id="paypalTable" header={paypalTableHeaderElement()} body={paypalBodyElement()} />

                        : props.billingInfos.creditCard ?                
                            <Table className="col-12" headerBackgroundColor="gray-10" id="creditCardTable" header={creditCardTableHeaderElement()} body={creditCardBodyElement()} />
                            : 
                            <Table className="col-12" headerBackgroundColor="gray-10" id="paymentMethodTable" header={creditCardTableHeaderElement()} body={disabledTableBody('Add a Payment Method so you can purchase Plans, Allowences and Enable Playback Protection')} />


                }

                <BorderStyle className="py1" />
                <TextStyle className="py2" ><Text size={20} weight='med' color='gray-1'>Playback Protection</Text></TextStyle>
                <TextStyle className="pb2" ><Text size={14} weight='reg' color='gray-3'>Automatically buy more Data when you run out to ensure your content never stops playing, even if you use all your data.</Text></TextStyle>
                <Button className={"left mb2 "+ (smScreen ? '' : 'hide')} type="button" onClick={(event) => {event.preventDefault();setProtectionModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Enable protection</Button>
               
                {
                    (props.billingInfos.paypal === null || typeof props.billingInfos.paypal === 'undefined') && (props.billingInfos.creditCard=== null || typeof props.billingInfos.creditCard === 'undefined') && !playbackProtectionEnabled ?
                        <Table className="col-12" headerBackgroundColor="gray-10" id="protectionTableDisabled" header={disabledTableHeader()} body={disabledTableBody('Add Payment Method before Enablind Playback Protection')} />
                        :<Table className="col-12" headerBackgroundColor="gray-10" id="protectionTable" header={protectionTableHeaderElement()} body={protectionBodyElement()} />
                    

                }
                

            
            </Card>
            <Modal hasClose={false} title={(paymentMethod ? 'Edit' : 'Add')  + ' Payment Method'} toggle={() => setPaypaylModalOpened(!paypalModalOpened)} size='large' opened={paypalModalOpened}>
                <PaymentMethodModal actionButton={props.saveBillingPagePaymentMethod} toggle={setPaypaylModalOpened} />
            </Modal>
            <Modal hasClose={false} title='Enable Protection' toggle={() => setProtectionModalOpened(!protectionModalOpened)} size='large' opened={protectionModalOpened}>
                <ProtectionModal actionButton={props.billingInfos.playbackProtection ? props.editBillingPagePaymenPlaybackProtection : props.addBillingPagePaymenPlaybackProtection} toggle={setProtectionModalOpened} setPlaybackProtectionEnabled={setPlaybackProtectionEnabled} />
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
                functionCancel={() => {setExtrasModalOpened(false)}}
                stepperData={stepperExtraItem}
                finalFunction={() => {submitExtra()}}
                updateStepperData={(value: Extras) => {setStepperExtraItem(value)}}
            />
            <Modal icon={{ name: "error_outlined", color: "yellow" }} hasClose={false} title="Disable Protection" toggle={() => setDisableProtectionModalOpened(!disableProtectionModalOpened)} size="small" opened={disableProtectionModalOpened}>
                <ModalContent>
                    <div className="mt1">
                        <Text size={14} weight="reg">This means you won’t have any protection if you run out of data or stuff</Text>
                    </div>
                    
                </ModalContent>
                <ModalFooter>
                    <Button onClick={() => {props.deleteBillingPagePaymenPlaybackProtection(props.billingInfos.playbackProtection);setDisableProtectionModalOpened(false);setPlaybackProtectionEnabled(false)}}>Confirm</Button>
                    <Button typeButton="tertiary" onClick={()=> setDisableProtectionModalOpened(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>

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