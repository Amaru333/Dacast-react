import React from 'react';
import { Table } from '../../../../components/Table/Table';
import { Modal, ModalContent, ModalFooter } from '../../../../components/Modal/Modal';
import { Text } from '../../../../components/Typography/Text';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Card } from '../../../../components/Card/Card';
import styled from 'styled-components';
import { IconStyle, IconContainer } from '../../../../shared/Common/Icon';
import { useMedia, readableBytes, getPercentage, tsToLocaleDate } from '../../../../utils/utils';
import { PaymentMethodModal } from './PaymentMethodModal';
import { ProtectionModal } from './ProtectionModal';
import { ExtrasStepperFirstStep ,ExtrasStepperSecondStepCreditCard } from './ExtrasModal';
import { CustomStepper } from '../../../../components/Stepper/Stepper';
import { BillingPageInfos, Extras } from '../../../redux-flow/store/Account/Plan/types';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { ColorsApp } from '../../../../styled/types';
import { RecurlyProvider, Elements } from '@recurly/react-recurly';
import { WidgetElement } from '../../../containers/Dashboard/WidgetElement';
import { WidgetHeader, classContainer, classItemThirdWidthContainer } from '../../../containers/Dashboard/DashboardStyles';
import { ProgressBarDashboard } from '../../../containers/Dashboard/GeneralDashboard';
import { handleButtonToPurchase } from '../../../shared/Widgets/Widgets';
import { DashboardTrial, DashboardPayingPlan, DashboardInfos } from '../../../redux-flow/store/Dashboard/types';
import { PurchaseStepperCartStep } from '../../../containers/Dashboard/PurchaseStepper';
import { PurchaseDataCartStep, PurchaseDataPaymentStep } from './PurchaseDataStepper';

interface PlanComponentProps {
    billingInfos: BillingPageInfos;
    widgetData: DashboardInfos;
    saveBillingPagePaymentMethod: Function;
    addBillingPagePaymenPlaybackProtection: Function;
    editBillingPagePaymenPlaybackProtection: Function;
    deleteBillingPagePaymenPlaybackProtection: Function;
    addBillingPageExtras: Function;
}

export const PlanPage = (props: PlanComponentProps & {plan: DashboardPayingPlan}) => {

    const [paymentMethod, setpaymentMethod] = React.useState<string>(null);
    const [paypalModalOpened, setPaypaylModalOpened] = React.useState<boolean>(false);
    const [protectionModalOpened, setProtectionModalOpened] = React.useState<boolean>(false);
    const [playbackProtectionEnabled, setPlaybackProtectionEnabled] = React.useState<boolean>(props.billingInfos.playbackProtection ? props.billingInfos.playbackProtection.enabled : false )
    const [disableProtectionModalOpened, setDisableProtectionModalOpened] = React.useState<boolean>(false)
    const [extrasModalOpened, setExtrasModalOpened] = React.useState<boolean>(false);
    const [stepperExtraItem, setStepperExtraItem] = React.useState<Extras>(null);
    const [purchaseDataOpen, setPurchaseDataOpen] = React.useState<boolean>(false)
    const stepList = [ExtrasStepperFirstStep, ExtrasStepperSecondStepCreditCard];

    React.useEffect(() => {
    }, [props.billingInfos.playbackProtection])

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

    const storage = {
        percentage: getPercentage(props.widgetData.generalInfos.storage.limit-props.widgetData.generalInfos.storage.consumed, props.widgetData.generalInfos.storage.limit),
        left: props.widgetData.generalInfos.storage.limit-props.widgetData.generalInfos.storage.consumed,
        limit: props.widgetData.generalInfos.storage.limit,
    } 
    const bandwidth = {
        percentage: getPercentage(props.widgetData.generalInfos.bandwidth.limit-props.widgetData.generalInfos.bandwidth.consumed, props.widgetData.generalInfos.bandwidth.limit),
        left: props.widgetData.generalInfos.bandwidth.limit-props.widgetData.generalInfos.bandwidth.consumed,
        limit: props.widgetData.generalInfos.bandwidth.limit,
    } 

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
        if(props.billingInfos.playbackProtection && props.billingInfos.playbackProtection.enabled !== null) {
            return [{data:[
                <IconStyle key={'playbackProtectionEnabledValue'} coloricon='green'>{props.billingInfos.playbackProtection.enabled ? 'checked' : ''}</IconStyle>,
                <Text key={'playbackProtectionAmountValue'} size={14}  weight="reg" color="gray-1">{props.billingInfos.playbackProtection.amount}</Text>,
                <Text key={'playbackProtectionPriceValue'} size={14}  weight="reg" color="gray-1">{props.billingInfos.playbackProtection.price}</Text>,
                <IconContainer className="iconAction" key={'protectionTableActionButtons'}><IconStyle onClick={(event) => {event.preventDefault();setProtectionModalOpened(true) }}>edit</IconStyle> </IconContainer>
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

    const onSubmitFunctions = () => {
        props.saveBillingPagePaymentMethod();
        setPaypaylModalOpened(false)
    }

    return (
        <div>
            <div className={classContainer}>
                <WidgetElement className={classItemThirdWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Data Remaining </Text>
                        {handleButtonToPurchase(bandwidth.percentage, "Data", () => {})}
                    </WidgetHeader>
                    <div className="flex flex-wrap items-baseline mb1">
                        <Text size={32} weight="reg" color="gray-1"> {(bandwidth.left < 0 ? '-' : '') + readableBytes(Math.abs(bandwidth.left) )}</Text><Text size={16} weight="reg" color="gray-4" >/{readableBytes(bandwidth.limit)}</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >{bandwidth.percentage}%</Text>
                    </div>
                    <ProgressBarDashboard overage={props.widgetData.generalInfos.overage} percentage={bandwidth.percentage} widget="bandwidth" />
                </WidgetElement>

                <WidgetElement className={classItemThirdWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Storage Remaining </Text>
                        {handleButtonToPurchase(storage.percentage, "Storage", () => {})}
                    </WidgetHeader>
                    <div className="flex flex-wrap items-baseline mb1">
                        <Text size={32} weight="reg" color="gray-1"> { (storage.left < 0 ? '-' : '') + readableBytes(Math.abs(storage.left))}</Text><Text size={16} weight="reg" color="gray-4" >/{readableBytes(storage.limit)}</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >{storage.percentage}%</Text>
                    </div>
                    <ProgressBarDashboard percentage={storage.percentage} widget="storage" />
                </WidgetElement>


                {
                    (props.plan as DashboardTrial).daysLeft  ?
                        <WidgetElement className={classItemThirdWidthContainer}>
                            <WidgetHeader className="flex">
                                <Text size={16} weight="med" color="gray-3"> 30 Day Trial </Text>
                                <Button className="ml-auto" typeButton='secondary' sizeButton="xs" onClick={() => history.push('/account/plans')}>Upgrade </Button>
                            </WidgetHeader>
                            <div className="flex flex-wrap items-baseline mb1">
                                <Text className="mr1" size={32} weight="reg" color="gray-1">{(props.plan as DashboardTrial).daysLeft}  </Text><Text size={16} weight="reg" color="gray-4" > Days remaining</Text>
                            </div>
                            <Text size={12} weight="reg" color="gray-1">Upgrade to enable all features</Text>
                        </WidgetElement> :
                        <WidgetElement className={classItemThirdWidthContainer}>
                            <WidgetHeader className="flex">
                                <Text size={16} weight="med" color="gray-3"> {(props.plan as DashboardPayingPlan).displayName} </Text>
                                <Button className="ml-auto" buttonColor="red" sizeButton="xs" onClick={() => history.push('/account/plans')}>Upgrade</Button>
                            </WidgetHeader>
                            {/* <Text className="inline-block mb1" size={14} weight="reg" color="gray-1">Next Bill due {tsToLocaleDate(lastDay.getTime() / 1000)}</Text><br /> */}
                            <Text className="inline-block mb1" size={14} weight="reg" color="gray-1">Next Bill due {tsToLocaleDate((props.plan as DashboardPayingPlan).nextBill)}</Text><br />
                            <Text size={32} weight="reg" color="gray-1">${(props.plan as DashboardPayingPlan).price}</Text>
                        </WidgetElement>
                }
            </div> 
            <Card>
                <TextStyle className="pb2" ><Text size={20} weight='med' color='gray-1'>Plan Details</Text></TextStyle>
                <Table id="planDetailsTable" headerBackgroundColor="gray-10" className="" header={planDetailsTableHeaderElement()} body={planDetailsTableBodyElement()}></Table>
                <BorderStyle className="py1" />
                <TextStyle className="py2" ><Text size={20} weight='med' color='gray-1'>Payment Method</Text></TextStyle>
                <TextStyle className="pb2" ><Text size={14} weight='reg' color='gray-1'>Your chosen Payment Method will be charged for your Plan, optional Playback Protection, Extras and Overages. Choose from PayPal or Card. If you wish to pay using Check, Wire or Transfer, then please Contact Us.</Text></TextStyle>
                <Button className={"left "+ (smScreen ? '' : 'hide')} type="button" onClick={(event) => {event.preventDefault();setPaypaylModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Add Payment Method</Button>
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
                <Button className={"left "+ (smScreen ? '' : 'hide')} type="button" onClick={(event) => {event.preventDefault();setProtectionModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Enable protection</Button>
               
                {
                    (props.billingInfos.paypal === null || typeof props.billingInfos.paypal === 'undefined') && (props.billingInfos.creditCard=== null || typeof props.billingInfos.creditCard === 'undefined') && !playbackProtectionEnabled ?
                        <Table className="col-12" headerBackgroundColor="gray-10" id="protectionTableDisabled" header={disabledTableHeader()} body={disabledTableBody('Add Payment Method before Enablind Playback Protection')} />
                        :<Table className="col-12" headerBackgroundColor="gray-10" id="protectionTable" header={protectionTableHeaderElement()} body={protectionBodyElement()} />
                    

                }
                
                <BorderStyle className="py1" />
                <TextStyle className="py2" ><Text size={20} weight='med' color='gray-1'>Additional Data</Text></TextStyle>
                <TextStyle className="pb2" ><Text size={14} weight='reg' color='gray-3'>Manually purchase more data when you run out so that your content can keep playing.</Text></TextStyle>
                <Button className="col col-2 mb1" typeButton="secondary" sizeButton="xs" onClick={() => setPurchaseDataOpen(true)}>Purchase Data</Button>
                <TextStyle className="py2" ><Text size={16} weight='med' color='gray-1'>Pricing</Text></TextStyle>
                <div className="col col-2 mb2">
                    <DataPricingTable >
                        <DataPricingTableRow>
                            <DataCell><Text size={14}  weight="med" color="gray-1">1+TB</Text></DataCell>
                            <PriceCell><Text size={14}  weight="reg" color="gray-1">$0.25/GB</Text></PriceCell>
                        </DataPricingTableRow>
                        <DataPricingTableRow>
                            <DataCell><Text size={14}  weight="med" color="gray-1">5+TB</Text></DataCell>
                            <PriceCell><Text size={14}  weight="reg" color="gray-1">$0.12/GB</Text></PriceCell>
                        </DataPricingTableRow>
                        <DataPricingTableRow>
                            <DataCell><Text size={14}  weight="med" color="gray-1">10TB+</Text></DataCell>
                            <PriceCell><Text size={14}  weight="reg" color="gray-1">$0.09/GB</Text></PriceCell>
                        </DataPricingTableRow>
                    </DataPricingTable>
                </div>
                <TextStyle className="pb2" ><Text size={12} weight='reg' color='gray-3'><a href="/help">Contact us</a> for purchases over 100 TB</Text></TextStyle>
                
            </Card>
            <RecurlyProvider publicKey="ewr1-hgy8aq1eSuf8LEKIOzQk6T"> 
                <Elements>
                    <Modal 
                        hasClose={false} 
                        modalTitle={(paymentMethod ? 'Edit' : 'Add')  + ' Payment Method'} 
                        toggle={() => setPaypaylModalOpened(!paypalModalOpened)} size='large' 
                        opened={paypalModalOpened}>
                        <PaymentMethodModal actionButton={() => onSubmitFunctions()} toggle={setPaypaylModalOpened} />
                    </Modal>
                </Elements>
            </RecurlyProvider>
            <Modal hasClose={false} modalTitle='Enable Protection' toggle={() => setProtectionModalOpened(!protectionModalOpened)} size='large' opened={protectionModalOpened}>
                <ProtectionModal actionButton={props.billingInfos.playbackProtection ? props.editBillingPagePaymenPlaybackProtection : props.addBillingPagePaymenPlaybackProtection} toggle={setProtectionModalOpened} setPlaybackProtectionEnabled={setPlaybackProtectionEnabled} playbackProtection={props.billingInfos.playbackProtection ? props.billingInfos.playbackProtection : null}/>
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
            <CustomStepper 
                opened={purchaseDataOpen}
                stepperHeader="Purchase Data"
                stepTitles={["Cart", "Payment"]}
                stepList={[PurchaseDataCartStep, PurchaseDataPaymentStep]}
                nextButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Next"}} 
                backButtonProps={{typeButton: "secondary", sizeButton: "large", buttonText: "Back"}} 
                cancelButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Cancel"}}
                lastStepButton="Purchase"
                finalFunction={() => {}}
            />
            <Modal icon={{ name: "error_outlined", color: "yellow" }} hasClose={false} modalTitle="Disable Protection" toggle={() => setDisableProtectionModalOpened(!disableProtectionModalOpened)} size="small" opened={disableProtectionModalOpened} >
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

export const DataPricingTable = styled.table`
    height: auto;
    width: 100%;
    border: 1px solid ${props => props.theme.colors["gray-8"]};
    border-spacing: unset;
    border-collapse: collapse;
`

export const DataPricingTableRow = styled.tr`
    width: auto;
    height: 48px;
    border-bottom: 1px solid ${props => props.theme.colors["gray-8"]};
`


export const PriceCell = styled.td`
    background-color: ${props => props.theme.colors["white"]};
    min-width: 94px;
    text-align: center;
`

export const DataCell = styled(PriceCell)`
    background-color: ${props => props.theme.colors["gray-10"]};
    border-right: 1px solid ${props => props.theme.colors["gray-8"]};
`
