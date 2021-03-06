import React from 'react';
import { isMobile } from "react-device-detect";
import { Table } from '../../../../components/Table/Table';
import { Modal } from '../../../../components/Modal/Modal';
import { Text } from '../../../../components/Typography/Text';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Card } from '../../../../components/Card/Card';
import styled from 'styled-components';
import { IconStyle, IconContainer } from '../../../../shared/Common/Icon';
import { handleCurrencySymbol, useMedia } from '../../../../utils/utils';
import { tsToLocaleDate } from '../../../../utils/formatUtils';
import { ProtectionModal } from './ProtectionModal';
import { CustomStepper } from '../../../../components/Stepper/Stepper';
import { BandwidthProductCurrency, BillingPageInfos, Extras, PlaybackProtection } from '../../../redux-flow/store/Account/Plan/types';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { ColorsApp } from '../../../../styled/types';
import { RecurlyProvider, Elements } from '@recurly/react-recurly';
import { GeneralDashboard } from '../../../containers/Dashboard/GeneralDashboard';
import { DashboardPayingPlan, DashboardInfos } from '../../../redux-flow/store/Dashboard/types';
import { PaymentSuccessModal } from '../../../shared/Billing/PaymentSuccessModal';
import { PaymentFailedModal } from '../../../shared/Billing/PaymentFailedModal';
import { Divider } from '../../../../shared/MiscStyles';
import { DisableProtectionModal } from '../../../shared/Plan/DisableProtectionModal'
import { dacastSdk } from '../../../utils/services/axios/axiosClient';
import { formatPostProductExtraInput } from '../../../redux-flow/store/Account/Plan/viewModel';
import { PurchaseDataCartStep } from './PurchaseDataCartStep';
import { PurchaseDataPaymentStep } from './PurchaseDataPaymentStep';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { ProductExtraDataCurrencyKey } from '../../../../DacastSdk/account';
import { PlanDetailsCard } from '../../../shared/Plan/PlanDetailsCard';

interface PlanComponentProps {
    billingInfos: BillingPageInfos;
    widgetData: DashboardInfos;
    getWidgetData: () => Promise<void>;
    addBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => Promise<void>
    editBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => Promise<void>
}

export const PlanPage = (props: PlanComponentProps & {plan: DashboardPayingPlan}) => {

    const defaultCurrency = props.billingInfos.currentPlan && props.billingInfos.currentPlan.currency ? props.billingInfos.currentPlan.currency.toLowerCase() as BandwidthProductCurrency : 'usd'
    const [protectionModalOpened, setProtectionModalOpened] = React.useState<boolean>(false);
    const [playbackProtectionEnabled, setPlaybackProtectionEnabled] = React.useState<boolean>(props.billingInfos.playbackProtection ? props.billingInfos.playbackProtection.enabled : false)
    const [disableProtectionModalOpened, setDisableProtectionModalOpened] = React.useState<boolean>(false)
    const [purchaseDataOpen, setPurchaseDataOpen] = React.useState<boolean>(false)
    const [purchaseDataStepperData, setPurchaseDataStepperData] = React.useState<Extras>({
        code: null,
        quantity: null,
        totalPrice: null,
        currency: defaultCurrency
    })
    const [threeDSecureActive, setThreeDSecureActive] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [dataPaymentSuccessOpen, setDataPaymentSuccessOpen] = React.useState<boolean>(false)
    const [dataPaymentFailedOpen, setDataPaymentFailedOpen] = React.useState<boolean>(false)
    const [selectedCurrency, setSelectedCurrency] = React.useState<DropdownSingleListItem>({title: defaultCurrency + ' - ' + handleCurrencySymbol(defaultCurrency), data: {img: defaultCurrency.toLowerCase(), id: defaultCurrency.toLowerCase()}})


    const purchaseDataStepList = [{title: "Cart", content: PurchaseDataCartStep}, {title: "Payment", content: PurchaseDataPaymentStep}]

    const purchaseProducts = async (recurlyToken: string, callback: Function) => {
        setIsLoading(true);
        dacastSdk.postProductExtraData(formatPostProductExtraInput({
            ...purchaseDataStepperData,
            token: recurlyToken,
            threeDSecureToken: null
        }))
        .then((response) => {
            setIsLoading(false);
            if (response && response.tokenID) {
                callback(response.tokenID)
                setThreeDSecureActive(true)
            } else {
                setPurchaseDataOpen(false)
                setDataPaymentSuccessOpen(true)
                props.getWidgetData()
            }
        }).catch(() => {
            setIsLoading(false);
            setPurchaseDataOpen(false)
            setDataPaymentFailedOpen(true)
        })
    }

    const purchaseProducts3Ds = async (recurlyToken: string, threeDSecureResultToken: string) => {
        setIsLoading(true);
        dacastSdk.postProductExtraData(formatPostProductExtraInput({
            ...purchaseDataStepperData,
            token: recurlyToken,
            threeDSecureToken: threeDSecureResultToken
        }))
        .then(() => {
            setIsLoading(false);
            setPurchaseDataOpen(false)
            setDataPaymentSuccessOpen(true)
            props.getWidgetData()
            }
        ).catch(() => {
            setIsLoading(false);
            setPurchaseDataOpen(false)
            setDataPaymentFailedOpen(true)
        })
    }

    const handleThreeDSecureFail = () => {
        setDataPaymentFailedOpen(true)
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
                <Text key={'playbackProtectionPriceValue'} size={14}  weight="reg" color="gray-1">{handleCurrencySymbol(selectedCurrency.data.id) + props.billingInfos.playbackProtection.price} per GB</Text>,
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
            {cell: <Text  key={"protectionTableEnabled"} size={14}  weight="med" color="gray-1">Recurring</Text>},
            {cell: <Text  key={"protectionTableEnabled"} size={14}  weight="med" color="gray-1">Next Bill</Text>},
            {cell: <Text  key={"protectionTableEnabled"} size={14}  weight="med" color="gray-1">Status</Text>},
            {cell: <Text  key={"protectionTableEnabled"} size={14}  weight="med" color="gray-1">Paywall Balance</Text>}
        ]}
    }

    const planDetailsTableBodyElement = () => {
        if(props.billingInfos.currentPlan) {
            const {state, displayName, price, paymentTerm, periodEndsAt} = props.billingInfos.currentPlan
            const color = (state === 'active' || state === "") ? 'green' : 'red';
            const BackgroundColor: ColorsApp = color + '20' as ColorsApp;
            return [{data:[
                <Text key={'planDetailsType'} size={14} weight='reg' color='gray-1'>{displayName === "30 Day Trial" ? "Trial" : displayName}</Text>,
                <Text key={'planDetailsPayment'} size={14} weight='reg' color='gray-1'>{displayName && displayName !== "30 Day Trial" && state === "active" ? (handleCurrencySymbol(selectedCurrency.data.id) + (price)): "-"}</Text>,
                <Text key={'planDetailsRecurring'} size={14} weight='reg' color='gray-1'>{displayName && displayName !== "30 Day Trial" && state === "active" ? (paymentTerm === 12 ? "Yearly" : "Monthly") : "-"}</Text>,
                <Text key={'planDetailsNextBill'} size={14} weight='reg' color='gray-1'>{periodEndsAt ? tsToLocaleDate(periodEndsAt) : '-'}</Text>,
                <Label key={'planDetailsStatus'} backgroundColor={BackgroundColor} color={color} label={state === "active" || state === "" ? "Active" : "Inactive"} />,
                <Text key={'planDetailsPaywallBalance'} size={14} weight='reg' color='gray-1'>{handleCurrencySymbol('usd') + props.billingInfos.paywallBalance + " USD"}</Text>
            ]}]
        }

    }

    React.useEffect(() => {
        if (location.hash === '#purchase-data') {
            setPurchaseDataOpen(true)
            history.replaceState(null, null, ' ');
        }
    }, [location.hash])

    return (
        <div>
            <GeneralDashboard isPlanPage openOverage={setProtectionModalOpened} profile={props.widgetData.generalInfos} plan={props.billingInfos.currentPlan} overage={props.billingInfos.currentPlan && props.billingInfos.currentPlan.displayName !== "Free" ? props.billingInfos.playbackProtection : null} dataButtonFunction={() => setPurchaseDataOpen(true)} />
            <Card>
                <div className="pb2" ><Text size={20} weight='med' color='gray-1'>Plan Details</Text></div>
                <Table id="planDetailsTable" headerBackgroundColor="gray-10" className="" header={planDetailsTableHeaderElement()} body={planDetailsTableBodyElement()}></Table>
               {
                   (props.billingInfos.currentPlan && props.billingInfos.currentPlan.displayName !== "Free" && props.billingInfos.currentPlan.displayName !== "30 Day Trial") &&
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
                                        Object.values(props.billingInfos.products.bandwidth).sort((a, b) =>  a.minQuantity - b.minQuantity).map((item) => {
                                            return (
                                                <DataPricingTableRow key={item.code}>
                                                    <DataCell><Text size={14}  weight="med" color="gray-1">{item.description.split(' ')[item.description.split(' ').length - 1]}</Text></DataCell>
                                                    <PriceCell><Text size={14}  weight="reg" color="gray-1">{handleCurrencySymbol(selectedCurrency.data.id) + item.unitPrice[selectedCurrency.data.id as ProductExtraDataCurrencyKey] + '/GB'}</Text></PriceCell>
                                                </DataPricingTableRow>
                                            )
                                        })
                                    }
                                </DataPricingTable>
                            </div>
                            <div className="pb2" ><Text size={12} weight='reg' color='gray-3'><a href="/help">Contact us</a> for purchases over 100 TB</Text></div>
                    </>
                }
                {
                    !isMobile && props.billingInfos.currentPlan && props.billingInfos.currentPlan.displayName === "30 Day Trial" &&
                    <PlanDetailsCardWrapper>
                        <PlanDetailsCard/>
                    </PlanDetailsCardWrapper>
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
                                selectedCurrency={selectedCurrency.data.id}

                            />
                        </Modal>
                    }

            {
                purchaseDataOpen &&
                <CustomStepper
                    opened={purchaseDataOpen}
                    stepperHeader="Purchase Data"
                    stepList={purchaseDataStepList}
                    lastStepButton="Purchase"
                    finalFunction={() => {threeDSecureActive ? purchaseProducts3Ds : purchaseProducts}}
                    stepperData={purchaseDataStepperData}
                    updateStepperData={(data: Extras) => {setPurchaseDataStepperData(data)}}
                    functionCancel={setPurchaseDataOpen}
                    billingInfo={props.billingInfos}
                    purchaseProducts={purchaseProducts}
                    purchaseProducts3Ds={purchaseProducts3Ds}
                    handleThreeDSecureFail={handleThreeDSecureFail}
                    isLoading={isLoading}
                    selectedCurrency={selectedCurrency}
                    setSelectedCurrency={setSelectedCurrency}
                    bandwidthProduct={props.billingInfos.products.bandwidth}
                />
            }
            </Elements>
            </RecurlyProvider>
            {
                isMobile && props.billingInfos.currentPlan && props.billingInfos.currentPlan.displayName === "30 Day Trial" &&
                <PlanDetailsCardMobileWrapper>
                    <PlanDetailsCard/>
                </PlanDetailsCardMobileWrapper>
            }
            <Modal icon={{ name: "error_outlined", color: "yellow" }} hasClose={false} modalTitle="Disable Protection" toggle={() => setDisableProtectionModalOpened(!disableProtectionModalOpened)} size="small" opened={disableProtectionModalOpened} >
                <DisableProtectionModal
                    price={props.billingInfos.playbackProtection ? props.billingInfos.playbackProtection.price : 0}
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
                        <Text size={14}>Your payment of {handleCurrencySymbol(selectedCurrency.data.id) + purchaseDataStepperData.totalPrice} was declined</Text>
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

export const PlanDetailsCardWrapper = styled.div`
    background-color: ${props => props.theme.colors["gray-10"]};
    padding: 16px 16px 24px;
    margin-top: 8px;
`
export const PlanDetailsCardMobileWrapper = styled.div`
    padding: 16px 16px 7px;
    margin: 32px 0 16px;
`
