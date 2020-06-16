import React from 'react'
import { classContainer, WidgetHeader, classItemFullWidthContainer, classItemThirdWidthContainer } from './DashboardStyles'
import { WidgetElement } from './WidgetElement'
import { Text } from '../../../components/Typography/Text';
import { ProgressBar } from '../../../components/FormsComponents/Progress/ProgressBar/ProgressBar';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { numberFormatter, getPercentage, tsToLocaleDate, useMedia, readableBytes } from '../../../utils/utils';
import { IconStyle } from '../../../shared/Common/Icon';
import { Label } from '../../../components/FormsComponents/Label/Label';
import { DashboardGeneral, DashboardPayingPlan, DashboardTrial } from '../../redux-flow/store/Dashboard';
import { CustomStepper } from '../../../components/Stepper/Stepper';
import { PurchaseStepperCartStep, PurchaseStepperPaymentStep } from './PurchaseStepper';
import { useHistory } from 'react-router';

interface PlanType {
    libelle: string;
    price: number;
    /** Change to Date maybe later or number for timestamp */
    nextBill: string;
    isTrial: boolean;
    daysLeft?: number;
}

export const GeneralDashboard = (props: React.HTMLAttributes<HTMLDivElement> & {plan: DashboardPayingPlan | DashboardTrial; profile: DashboardGeneral}) => {

    let history = useHistory()
    
    let smallScreen = useMedia('(max-width: 40em)')

    const mockPaymentMethod = "none"

    const stepList = [PurchaseStepperCartStep, PurchaseStepperPaymentStep]

    const [purchaseStepperOpened, setPurchaseStepperOpened] = React.useState<boolean>(false)
    const [selectedPurchaseItem, setSelectedPurchaseItem] = React.useState<string>(null)

    console.log(props.profile)
    const storage = {
        percentage: getPercentage(props.profile.storage.limit-props.profile.storage.consumed, props.profile.storage.limit),
        left: props.profile.storage.limit-props.profile.storage.consumed,
        limit: props.profile.storage.limit,
    } 
    const bandwidth = {
        percentage: getPercentage(props.profile.bandwidth.limit-props.profile.bandwidth.consumed, props.profile.bandwidth.limit),
        left: props.profile.bandwidth.limit-props.profile.bandwidth.consumed,
        limit: props.profile.bandwidth.limit,
    } 
    
    const handlePurchaseStepper = (purchaseItem: string) => {
        setSelectedPurchaseItem(purchaseItem);
        setPurchaseStepperOpened(true);
    }

    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var lastDay = new Date(y, m + 1, 0);

    const handleButtonToPurchase = (percentage: number, purchaseItem: string) => {
        if(percentage <= 25 ) {
            return (
                <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <Button buttonColor="red" sizeButton="xs" onClick={() => handlePurchaseStepper(purchaseItem)}>Buy More</Button></Text>
            )
        } else {
            return (
                <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <Button typeButton="tertiary" sizeButton="xs" onClick={() => handlePurchaseStepper(purchaseItem)}>Buy More</Button></Text>
            )
        }
    }

    const handleBillingPeriod = () => {
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        if( (props.plan as DashboardPayingPlan).nextBill ) {
            return <Text className={smallScreen ? 'mb1' : "ml-auto"} size={16} weight="reg" color="gray-2" ><b>For Billing Period</b> {tsToLocaleDate( firstDay.getTime()/1000 )} - {tsToLocaleDate( lastDay.getTime()/1000 )}</Text>
        }
    }

    const onSubmitFunctions = () => {
        setPurchaseStepperOpened(false)
    }

    return (
        <section className="col col-12">
            <div className={smallScreen ? 'flex flex-column mb1' : "flex items-baseline mb1"}>
                <Text size={24} weight="reg" className={smallScreen ? 'mb1' : "mt0 mb3 inline-block"}>
                    Dashboard
                </Text>
                {handleBillingPeriod()}
            </div>

            <div className={classContainer}>
                <WidgetElement className={classItemThirdWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Data Remaining </Text>
                        {handleButtonToPurchase(bandwidth.percentage, "Data")}
                    </WidgetHeader>
                    <div className="flex flex-wrap items-baseline mb1">
                        <Text size={32} weight="reg" color="gray-1"> {readableBytes(bandwidth.left)}</Text><Text size={16} weight="reg" color="gray-4" >/{readableBytes(bandwidth.limit)}</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >{bandwidth.percentage}%</Text>
                    </div>
                    <ProgressBarDashboard overage={props.profile.overage} percentage={bandwidth.percentage} widget="bandwidth" />
                </WidgetElement>

                <WidgetElement className={classItemThirdWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Storage Remaining </Text>
                        {handleButtonToPurchase(storage.percentage, "Storage")}
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

            <CustomStepper
                opened={purchaseStepperOpened} 
                stepperHeader={"Buy " + selectedPurchaseItem}
                stepTitles={['Cart', 'Payment']}
                stepList={stepList}
                nextButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Next"}} 
                backButtonProps={{typeButton: "secondary", sizeButton: "large", buttonText: "Back"}} 
                cancelButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Cancel"}}
                functionCancel={() => setPurchaseStepperOpened(false)}
                lastStepButton="Purchase"
                finalFunction={onSubmitFunctions}
                stepperData={mockPaymentMethod}
                updateStepperData={(value: string) => console.log(value)}
            />

            
        </section>
    )

}

const ProgressBarDashboard = (props: { percentage: number; widget: 'bandwidth' | 'storage' | 'encoding'; overage?: {enabled: boolean; value: number} }) => {

    const handleProgressBar = (percentage: number) => {
        return (
            <ProgressBar className="mb1" size="large" color={ percentage<= 25 ? 'red' : 'violet' } startingValue={percentage} />
        )
    }
    const handleInfos = () => {
        if(props.percentage <= 25 && props.percentage > 0) {
            if(props.widget === 'storage' || props.widget === 'encoding') {
                return <Text size={12} weight="reg" color="red"> Upgrade before you run out of {props.widget}</Text>
            } else {
                if(props.overage && props.overage.enabled) {
                    return <div className="flex align-center"><Text className="self-center mr1" size={12} weight="reg"> Playback Protection enabled</Text><IconStyle>settings</IconStyle></div>
                } else {
                    return <><Text size={12} weight="reg" color="red"> Upgrade before you run out of data</Text></>
                }
            }
        } if(props.percentage <= 0) {
            if(props.widget === 'storage' || props.widget === 'encoding') {
                return <Text size={12} weight="reg" color="red">You have no {props.widget} remaining</Text>
            } else {
                if(props.overage && props.overage.enabled) {
                    return <><Label size={12} color="red" backgroundColor={'red20'} label={'+ '+props.overage.value+'GB'}/><Text className="ml-1" size={12} weight="reg" color="red"> Overages purchased</Text></>
                } else {
                    return <Text size={12} weight="reg" color="red">You have no data remaining</Text>
                }
            }
        }
    }

    return( 
        <>
            {handleProgressBar(props.percentage)}
            {handleInfos()}
        </>
    )

}