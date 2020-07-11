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
import { useHistory } from 'react-router-dom'

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

    
    const [protectionModalOpened, setProtectionModalOpened] = React.useState<boolean>(false);
    const [playbackProtectionEnabled, setPlaybackProtectionEnabled] = React.useState<boolean>(props.billingInfos.playbackProtection.enabled)
    const [disableProtectionModalOpened, setDisableProtectionModalOpened] = React.useState<boolean>(false)
    const [extrasModalOpened, setExtrasModalOpened] = React.useState<boolean>(false);
    const [stepperExtraItem, setStepperExtraItem] = React.useState<Extras>(null);
    const [purchaseDataOpen, setPurchaseDataOpen] = React.useState<boolean>(false)
    const [purchaseDataStepperData, setPurchaseDataStepperData] = React.useState<any>(null)
    const stepList = [ExtrasStepperFirstStep, ExtrasStepperSecondStepCreditCard];

    let history = useHistory()
  
    const submitExtra = () => {
        if(stepperExtraItem) {
            props.addBillingPageExtras(stepperExtraItem);
            setExtrasModalOpened(false);
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
                <Text key={'playbackProtectionPriceValue'} size={14}  weight="reg" color="gray-1">${props.billingInfos.playbackProtection.price}</Text>,
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
            const {state, displayName, currency, price, paymentTerm, periodEndsAt} = props.billingInfos.currentPlan
            const color = state === 'active' ? 'green' : state === 'expired' ? 'yellow' : 'red';
            const BackgroundColor: ColorsApp = color + '20' as ColorsApp;
            return [{data:[
                <Text key={'planDetailsType'} size={14} weight='reg' color='gray-1'>{displayName}</Text>,
                <Text key={'planDetailsPayment'} size={14} weight='reg' color='gray-1'>{currency === 'gbp' ? "£" : "$" + (price/100) + " " + currency}</Text>,
                <Text key={'planDetailsRecurring'} size={14} weight='reg' color='gray-1'>{paymentTerm === 12 ? "Yearly" : "Monthly"}</Text>,
                <Text key={'planDetailsNextBill'} size={14} weight='reg' color='gray-1'>{tsToLocaleDate(periodEndsAt)}</Text>,
                <Label key={'planDetailsStatus'} backgroundColor={BackgroundColor} color={color} label={state} />,
                <Text key={'planDetailsPaywallBalance'} size={14} weight='reg' color='gray-1'>{currency === 'gbp' ? "£" : "$" + props.billingInfos.paywallBalance + " " + currency}</Text>
            ]}]
    }  
    
    return (
        <div>
            <div className={classContainer}>
                <WidgetElement className={classItemThirdWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Data Remaining </Text>
                        {handleButtonToPurchase(bandwidth.percentage, "Data", setPurchaseDataOpen)}
                    </WidgetHeader>
                    <div className="flex flex-wrap items-baseline mb1">
                        <Text size={32} weight="reg" color="gray-1"> {(bandwidth.left < 0 ? '-' : '') + readableBytes(Math.abs(bandwidth.left) )}</Text><Text size={16} weight="reg" color="gray-4" >/{readableBytes(bandwidth.limit)}</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >{bandwidth.percentage}%</Text>
                    </div>
                    <ProgressBarDashboard overage={props.widgetData.generalInfos.overage} percentage={bandwidth.percentage} widget="bandwidth" />
                </WidgetElement>

                <WidgetElement className={classItemThirdWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Storage Remaining </Text>
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
                                <Button className="ml-auto" typeButton='secondary' sizeButton="xs" onClick={() => history.push('/account/upgrade')}>Upgrade </Button>
                            </WidgetHeader>
                            <div className="flex flex-wrap items-baseline mb1">
                                <Text className="mr1" size={32} weight="reg" color="gray-1">{(props.plan as DashboardTrial).daysLeft}  </Text><Text size={16} weight="reg" color="gray-4" > Days remaining</Text>
                            </div>
                            <Text size={12} weight="reg" color="gray-1">Upgrade to enable all features</Text>
                        </WidgetElement> :
                        <WidgetElement className={classItemThirdWidthContainer}>
                            <WidgetHeader className="flex">
                                <Text size={16} weight="med" color="gray-3"> {(props.plan as DashboardPayingPlan).displayName} </Text>
                                <Button className="ml-auto" buttonColor="red" sizeButton="xs" onClick={() => history.push('/account/upgrade')}>Upgrade</Button>
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
                <TextStyle className="py2" ><Text size={20} weight='med' color='gray-1'>Playback Protection</Text></TextStyle>
                <TextStyle className="pb2" ><Text size={14} weight='reg' color='gray-3'>Automatically buy more Data when you run out to ensure your content never stops playing, even if you use all your data.</Text></TextStyle>
                <Button className={"left "+ (smScreen ? '' : 'hide')} type="button" onClick={(event) => {event.preventDefault();setProtectionModalOpened(true)}} sizeButton="xs" typeButton="secondary" buttonColor="blue">Enable protection</Button>
               
                {
                    (!props.billingInfos.paymentMethod || !playbackProtectionEnabled) ?
                        <Table className="col-12" headerBackgroundColor="gray-10" id="protectionTableDisabled" header={disabledTableHeader()} body={disabledTableBody((props.billingInfos.paymentMethod ? 'Enable Playback Protection to ensure your content never stops playing': 'Add Payment Method before Enablind Playback Protection'))} />
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
            <Modal hasClose={false} modalTitle='Enable Protection' toggle={() => setProtectionModalOpened(!protectionModalOpened)} size='large' opened={protectionModalOpened}>
                <ProtectionModal actionButton={props.billingInfos.playbackProtection.enabled ? props.editBillingPagePaymenPlaybackProtection : props.addBillingPagePaymenPlaybackProtection} toggle={setProtectionModalOpened} setPlaybackProtectionEnabled={setPlaybackProtectionEnabled} playbackProtection={props.billingInfos.playbackProtection.enabled ? props.billingInfos.playbackProtection : null}/>
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
                stepperData={purchaseDataStepperData}
                updateStepperData={(value: any) => {setPurchaseDataStepperData(value)}}
                functionCancel={setPurchaseDataOpen}
            />
            </Elements>
            </RecurlyProvider>
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
