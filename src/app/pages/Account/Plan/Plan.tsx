import React from 'react';
import { Table } from '../../../../components/Table/Table';
import { Modal, ModalContent, ModalFooter } from '../../../../components/Modal/Modal';
import { Text } from '../../../../components/Typography/Text';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Card } from '../../../../components/Card/Card';
import styled from 'styled-components';
import { IconStyle, IconContainer } from '../../../../shared/Common/Icon';
import { useMedia, getPercentage } from '../../../../utils/utils';
import { tsToLocaleDate } from '../../../../utils/formatUtils';
import { ProtectionModal } from './ProtectionModal';
import { CustomStepper } from '../../../../components/Stepper/Stepper';
import { BillingPageInfos, Extras, PlaybackProtection } from '../../../redux-flow/store/Account/Plan/types';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { ColorsApp } from '../../../../styled/types';
import { RecurlyProvider, Elements } from '@recurly/react-recurly';
import { GeneralDashboard } from '../../../containers/Dashboard/GeneralDashboard';
import { DashboardPayingPlan, DashboardInfos } from '../../../redux-flow/store/Dashboard/types';
import { PurchaseDataCartStep, PurchaseDataPaymentStep } from './PurchaseDataStepper';
import { PaymentSuccessModal } from '../../../shared/Billing/PaymentSuccessModal';
import { PaymentFailedModal } from '../../../shared/Billing/PaymentFailedModal';
import { Divider } from '../../../../shared/MiscStyles';
import { DisableProtectionModal } from '../../../shared/Plan/DisableProtectionModal'

interface PlanComponentProps {
    billingInfos: BillingPageInfos;
    widgetData: DashboardInfos;
    getWidgetData: () => Promise<void>;
    saveBillingPagePaymentMethod: (data: string) => Promise<void>
    addBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => Promise<void>
    editBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => Promise<void>
    addBillingPageExtras: (data: Extras) => Promise<void>
    purchaseProducts: (data: Extras, recurlyToken: string, token3Ds?: string) => Promise<any>
}

export const PlanPage = (props: PlanComponentProps & {plan: DashboardPayingPlan}) => {

    
    const [protectionModalOpened, setProtectionModalOpened] = React.useState<boolean>(false);
    const [playbackProtectionEnabled, setPlaybackProtectionEnabled] = React.useState<boolean>(props.billingInfos.playbackProtection ? props.billingInfos.playbackProtection.enabled : false)
    const [disableProtectionModalOpened, setDisableProtectionModalOpened] = React.useState<boolean>(false)
    const [purchaseDataOpen, setPurchaseDataOpen] = React.useState<boolean>(false)
    const [purchaseDataStepperData, setPurchaseDataStepperData] = React.useState<any>(null)
    const [threeDSecureActive, setThreeDSecureActive] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [dataPaymentSuccessOpen, setDataPaymentSuccessOpen] = React.useState<boolean>(false)
    const [dataPaymentFailedOpen, setDataPaymentFailedOpen] = React.useState<boolean>(false)

    const purchaseProducts = async (recurlyToken: string, threeDSecureToken: string, callback: Function) => {
        setIsLoading(true);
        await props.purchaseProducts(purchaseDataStepperData, recurlyToken, null).then(
            (response) => {
            setIsLoading(false);
            if (response && response.data.data.tokenID) {
                callback(response.data.data.tokenID)
                setThreeDSecureActive(true)
            } else {
                setPurchaseDataOpen(false)
                setDataPaymentSuccessOpen(true)
                props.getWidgetData()
            }
        }).catch((error) => {
            setIsLoading(false);
            setPurchaseDataOpen(false)
            setDataPaymentFailedOpen(true)
        })
    }

    const handlePlaybackProtectionValue = (value: string) => {

        let playbackProtectionData: PlaybackProtection = {enabled: true, amount: parseInt(value), price: props.billingInfos.playbackProtection.price}

        if(value === "Disable Protection"){
            setProtectionModalOpened(false);
            setDisableProtectionModalOpened(true);
        } else {
            if(props.billingInfos.playbackProtection.enabled){
                props.editBillingPagePaymenPlaybackProtection(playbackProtectionData);
            } else {
                props.addBillingPagePaymenPlaybackProtection(playbackProtectionData);
                setPlaybackProtectionEnabled(true);
            }

        }
    }

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

    

    const disabledTableHeader = () => {
        return props.billingInfos.paymentMethod ? {data: [
            {cell: <Button className={"right mr2 "+ (smScreen ? 'hide' : '')} key={"protectionTableActionButton"} type="button" onClick={(event) => {event.preventDefault();setProtectionModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Enable Protection</Button>}
        ]}
        : {data: [
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
                <Text key={'playbackProtectionAmountValue'} size={14}  weight="reg" color="gray-1">{props.billingInfos.playbackProtection.amount} GB</Text>,
                <Text key={'playbackProtectionPriceValue'} size={14}  weight="reg" color="gray-1">${props.billingInfos.playbackProtection.price} per GB</Text>,
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
        if(props.billingInfos.currentPlan) {
            const {state, displayName, currency, price, paymentTerm, periodEndsAt} = props.billingInfos.currentPlan
            const color = (state === 'active' || state === "") ? 'green' : 'red';
            const BackgroundColor: ColorsApp = color + '20' as ColorsApp;
            return [{data:[
                <Text key={'planDetailsType'} size={14} weight='reg' color='gray-1'>{displayName === "Free" ? "Trial" : displayName}</Text>,
                <Text key={'planDetailsPayment'} size={14} weight='reg' color='gray-1'>{displayName && displayName === "Trial" ? (currency === 'gbp' ? "£" : "$" + (price/100) + " " + currency): "-"}</Text>,
                <Text key={'planDetailsRecurring'} size={14} weight='reg' color='gray-1'>{displayName && displayName === "Trial" ? (paymentTerm === 12 ? "Yearly" : "Monthly") : "-"}</Text>,
                <Text key={'planDetailsNextBill'} size={14} weight='reg' color='gray-1'>{periodEndsAt ? tsToLocaleDate(periodEndsAt) : '-'}</Text>,
                <Label key={'planDetailsStatus'} backgroundColor={BackgroundColor} color={color} label={state === "active" || state === "" ? "Active" : "Inactive"} />,
                <Text key={'planDetailsPaywallBalance'} size={14} weight='reg' color='gray-1'>{currency === 'gbp' ? "£" : "$" + props.billingInfos.paywallBalance + " " + currency}</Text>
            ]}]
        }

    }  
    
    return (
        <div>
            <GeneralDashboard isPlanPage openOverage={setProtectionModalOpened} profile={props.profile} plan={props.plan} overage={props.billingInfos.currentPlan.displayName !== "Free" ? props.billingInfos.playbackProtection : null} dataButtonFunction={() => setPurchaseDataOpen(true)} />
            <Card>
                <div className="pb2" ><Text size={20} weight='med' color='gray-1'>Plan Details</Text></div>
                <Table id="planDetailsTable" headerBackgroundColor="gray-10" className="" header={planDetailsTableHeaderElement()} body={planDetailsTableBodyElement()}></Table>
               { 
                   (props.billingInfos.currentPlan.displayName !== "Free" && props.billingInfos.currentPlan.state === "active") &&
                    <>
                        <Divider className="py1" />
                        <div className="py2" ><Text size={20} weight='med' color='gray-1'>Playback Protection</Text></div>
                            <div className="pb2" ><Text size={14} weight='reg' color='gray-3'>Automatically buy more Data when you run out to ensure your content never stops playing, even if you use all your data.</Text></div>
                            <Button className={"left "+ (smScreen ? '' : 'hide')} type="button" onClick={(event) => {event.preventDefault();setProtectionModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Enable protection</Button>
                            {
                                (!props.billingInfos.paymentMethod || !playbackProtectionEnabled) ?
                                    <Table className="col-12" headerBackgroundColor="gray-10" id="protectionTableDisabled" header={disabledTableHeader()} body={disabledTableBody((props.billingInfos.paymentMethod ? 'Enable Playback Protection to ensure your content never stops playing': 'Add Payment Method before Enablind Playback Protection'))} />
                                    :<Table className="col-12" headerBackgroundColor="gray-10" id="protectionTable" header={protectionTableHeaderElement()} body={protectionBodyElement()} />
                            }
                        
                            <Divider className="py1" />
                            <div className="py2" ><Text size={20} weight='med' color='gray-1'>Additional Data</Text></div>
                            <div className="pb2" ><Text size={14} weight='reg' color='gray-3'>Manually purchase more data when you run out so that your content can keep playing.</Text></div>
                            <Button className="col col-2 mb1" typeButton="secondary" sizeButton="xs" onClick={() => setPurchaseDataOpen(true)}>Purchase Data</Button>
                            <div className="py2" ><Text size={16} weight='med' color='gray-1'>Pricing</Text></div>
                            <div className="col col-2 mb2">
                                <DataPricingTable >
                                    {
                                        props.billingInfos.products && 
                                        Object.values(props.billingInfos.products.bandwidth).sort((a, b) =>  parseFloat(a.minQuantity) - parseFloat(b.minQuantity)).map((item) => {
                                            return (
                                                <DataPricingTableRow key={item.code}>
                                                    <DataCell><Text size={14}  weight="med" color="gray-1">{item.description.split(' ')[item.description.split(' ').length - 1]}</Text></DataCell>
                                                    <PriceCell><Text size={14}  weight="reg" color="gray-1">{`$${item.unitPrice}/GB`}</Text></PriceCell>
                                                </DataPricingTableRow>
                                            )
                                        })
                                    }  
                                </DataPricingTable>
                            </div>
                            <div className="pb2" ><Text size={12} weight='reg' color='gray-3'><a href="/help">Contact us</a> for purchases over 100 TB</Text></div>
                    </>
                }
            </Card>
            <RecurlyProvider publicKey={process.env.RECURLY_TOKEN}> 
                <Elements>    
                    {
                        protectionModalOpened &&
                        <Modal hasClose={false} modalTitle='Enable Protection' toggle={() => setProtectionModalOpened(!protectionModalOpened)} size='large' opened={protectionModalOpened}>
                            <ProtectionModal 
                                actionButton={handlePlaybackProtectionValue} 
                                toggle={setProtectionModalOpened} 
                                setPlaybackProtectionEnabled={setPlaybackProtectionEnabled} 
                                playbackProtection={props.billingInfos.playbackProtection} 
                            />
                        </Modal>
                    }            

            {
                purchaseDataOpen && 
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
                    stepperData={purchaseDataStepperData}
                    updateStepperData={(value: any) => {setPurchaseDataStepperData(value)}}
                    functionCancel={setPurchaseDataOpen}
                    usefulFunctions={{'billingInfo': props.billingInfos, 'purchaseProducts': purchaseProducts}}
                    isLoading={isLoading}
                />
            }
            
            </Elements>
            </RecurlyProvider>
            <Modal icon={{ name: "error_outlined", color: "yellow" }} hasClose={false} modalTitle="Disable Protection" toggle={() => setDisableProtectionModalOpened(!disableProtectionModalOpened)} size="small" opened={disableProtectionModalOpened} >
                <DisableProtectionModal
                    price={props.billingInfos.playbackProtection.price}
                    editBillingPagePaymenPlaybackProtection={props.editBillingPagePaymenPlaybackProtection}
                    setDisableProtectionModalOpened={setDisableProtectionModalOpened}
                    setPlaybackProtectionEnabled={setPlaybackProtectionEnabled} 
                />
            </Modal>
            {purchaseDataStepperData &&
                <>
                    <PaymentSuccessModal opened={dataPaymentSuccessOpen} toggle={() => setDataPaymentSuccessOpen(!dataPaymentSuccessOpen)}>
                        <Text size={14}>You bought {purchaseDataStepperData.quantity}GB of data</Text>
                    </PaymentSuccessModal>
                    <PaymentFailedModal opened={dataPaymentFailedOpen} toggle={() => setDataPaymentFailedOpen(!dataPaymentSuccessOpen)}>
                        <Text size={14}>Your payment of ${purchaseDataStepperData.totalPrice} was declined</Text>
                    </PaymentFailedModal>
                </>
            }
            
        </div>

    )
}

export const ToggleTextInfo = styled.p<{}>`
    margin-top: 0px;
    margin-block-end: 8px;
    display: inline-flex;
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
