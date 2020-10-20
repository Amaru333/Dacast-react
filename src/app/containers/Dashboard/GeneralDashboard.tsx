import React from 'react'
import { classContainer, WidgetHeader, classItemFullWidthContainer, classItemThirdWidthContainer, classItemQuarterWidthContainer } from './DashboardStyles'
import { WidgetElement } from './WidgetElement'
import { Text } from '../../../components/Typography/Text';
import { ProgressBar } from '../../../components/FormsComponents/Progress/ProgressBar/ProgressBar';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { getPercentage, useMedia } from '../../../utils/utils';
import { readableBytes, tsToLocaleDate } from '../../../utils/formatUtils';
import { IconStyle } from '../../../shared/Common/Icon';
import { DashboardGeneral, DashboardPayingPlan, DashboardTrial } from '../../redux-flow/store/Dashboard';
import { PurchaseStepperCartStep, PurchaseStepperPaymentStep } from './PurchaseStepper';
import { useHistory } from 'react-router';
import { handleButtonToPurchase } from '../../shared/Widgets/Widgets';
import { PlanSummary } from '../../redux-flow/store/Account/Plan';
import { useLocation } from 'react-router-dom'

interface PlanType {
    libelle: string;
    price: number;
    /** Change to Date maybe later or number for timestamp */
    nextBill: string;
    isTrial: boolean;
    daysLeft?: number;
    openOverage: (b: boolean) => void;
}

export const GeneralDashboard = (props: React.HTMLAttributes<HTMLDivElement> & {plan: PlanSummary; overage?: { enabled: boolean; amount: number; }; openOverage?: (b: boolean) => void; profile: DashboardGeneral; isPlanPage?: boolean}) => {

    let history = useHistory()
    
    let smallScreen = useMedia('(max-width: 40em)')

    const mockPaymentMethod = "none"

    const stepList = [PurchaseStepperCartStep, PurchaseStepperPaymentStep]

    const [purchaseStepperOpened, setPurchaseStepperOpened] = React.useState<boolean>(false)
    const [selectedPurchaseItem, setSelectedPurchaseItem] = React.useState<string>(null)

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
        history.push('/account/upgrade');

        // setSelectedPurchaseItem(purchaseItem);
        // setPurchaseStepperOpened(true);
    }

    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var lastDay = new Date(y, m + 1, 0);

    

    const handleBillingPeriod = () => {
        if(props.plan.displayName === "Free" || !props.plan.periodEndsAt || !props.plan.periodStartedAt) {
            return ;
        }else {
            return <Text className={smallScreen ? 'mb1' : "ml-auto mb2"} size={16} weight="reg" color="gray-2" ><b>For Billing Period</b> {tsToLocaleDate( props.plan.periodStartedAt )} - {tsToLocaleDate( props.plan.periodEndsAt )}</Text>
        }
    }

    const onSubmitFunctions = () => {
        setPurchaseStepperOpened(false)
    }


    // const classItem = getPrivilege('privilege-china') ? classItemQuarterWidthContainer : classItemThirdWidthContainer;
    const classItem = classItemThirdWidthContainer;
    return (
        <section className="col col-12">
            <div className={smallScreen ? 'flex flex-column mb1' : "flex items-baseline mb1"}>
                {
                    !props.isPlanPage &&
                        <Text size={24} weight="reg" className={smallScreen ? 'mb1' : "mt0 mb2 inline-block"}>
                            Dashboard
                        </Text>
                }
                {handleBillingPeriod()}
            </div>
            <div className={classContainer}>
                <WidgetElement className={classItem}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3">Data Remaining</Text>
                        {handleButtonToPurchase(bandwidth.percentage, "Data", handlePurchaseStepper)}
                    </WidgetHeader>
                    <div className="flex flex-wrap items-baseline mb1">
                        <Text size={32} weight="reg" color="gray-1"> {(bandwidth.left < 0 ? '-' : '') + readableBytes(Math.abs(bandwidth.left) )}</Text><Text size={16} weight="reg" color="gray-4" >/{readableBytes(bandwidth.limit)}</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >{isNaN(bandwidth.percentage) ? 0 : bandwidth.percentage}%</Text>
                    </div>
                    <ProgressBarDashboard openOverage={props.openOverage} overage={props.overage} percentage={bandwidth.percentage} widget="bandwidth" plan={props.plan} />
                </WidgetElement>

                {/* {
                    getPrivilege('privilege-china') && 
                    <WidgetElement className={classItem}>
                        <WidgetHeader className="flex">
                            <Text size={16} weight="med" color="gray-3"> China Data Remaining </Text>
                            {handleButtonToPurchase(bandwidth.percentage, "Data", handlePurchaseStepper)}
                        </WidgetHeader>
                        <div className="flex flex-wrap items-baseline mb1">
                            <Text size={32} weight="reg" color="gray-1"> {(bandwidth.left < 0 ? '-' : '') + readableBytes(Math.abs(bandwidth.left) )}</Text><Text size={16} weight="reg" color="gray-4" >/{readableBytes(bandwidth.limit)}</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >{bandwidth.percentage}%</Text>
                        </div>
                        <ProgressBarDashboard  percentage={bandwidth.percentage} widget="bandwidth" />
                    </WidgetElement>
                } */}

                <WidgetElement className={classItem}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Storage Remaining </Text>
                        {handleButtonToPurchase(storage.percentage, "Storage", handlePurchaseStepper)}
                    </WidgetHeader>
                    <div className="flex flex-wrap items-baseline mb1">
                        <Text size={32} weight="reg" color="gray-1"> { (storage.left < 0 ? '-' : '') + readableBytes(Math.abs(storage.left))}</Text><Text size={16} weight="reg" color="gray-4" >/{readableBytes(storage.limit)}</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >{isNaN(storage.percentage) ? 0 : storage.percentage}%</Text>
                    </div>
                    <ProgressBarDashboard percentage={storage.percentage} widget="storage" />
                </WidgetElement>


                {
                    props.plan.displayName === "30 Day Trial" ?
                        <WidgetElement className={classItem}>
                            <WidgetHeader className="flex">
                                <Text size={16} weight="med" color="gray-3"> 30 Day Trial </Text>
                                <Button className="ml-auto" typeButton='secondary' sizeButton="xs" onClick={() => history.push('/account/upgrade')}>Upgrade </Button>
                            </WidgetHeader>
                            <div className="flex flex-wrap items-baseline mb1">
                                <Text className="mr1" size={32} weight="reg" color="gray-1">{props.plan.trialExpiresIn}</Text><Text size={16} weight="reg" color="gray-4" > Days remaining</Text>
                            </div>
                            <Text size={12} weight="reg" color="gray-1">Upgrade to enable all features</Text>
                        </WidgetElement> :
                        <WidgetElement className={classItem}>
                            <WidgetHeader className="flex">
                                <Text size={16} weight="med" color="gray-3"> {props.plan.displayName} </Text>
                                <Button className="ml-auto" buttonColor="red" sizeButton="xs" onClick={() => history.push('/account/upgrade')}>Upgrade</Button>
                            </WidgetHeader>
                            {
                                props.plan.periodEndsAt && <><Text className="inline-block mb1" size={14} weight="reg" color="gray-1">Next Bill due {tsToLocaleDate(props.plan.periodEndsAt)}</Text><br /></>

                            }                            
                            <Text size={32} weight="reg" color="gray-1">${props.plan.price/100}</Text>
                        </WidgetElement>
                }
            </div>
        </section>
    )

}

export const ProgressBarDashboard = (props: { openOverage?: (b: boolean) => void; percentage: number; widget: 'bandwidth' | 'storage' | 'encoding'; overage?: {enabled: boolean; amount: number}; plan?: PlanSummary }) => {

    const handleProgressBar = (percentage: number) => {
        return (
            <ProgressBar className="mb1" size="large" color={ percentage<= 25 ? 'red' : 'violet' } startingValue={percentage} />
        )
    }
    const handleInfos = () => {
        if(props.widget === "bandwidth" && props.plan && props.plan.displayName !== "Free" && props.plan.state === "active") {
            if(props.overage && props.overage.enabled && props.overage.amount > 0) {
                return (
                    <div className="flex align-center"><Text className="self-center mr1" size={12} weight="reg">{ props.percentage <= 0 ? props.overage.amount+"GB Playback Protection purchased" : "Playback Protection enabled"}</Text>
                        <IconStyle className='pointer' onClick={() => props.openOverage(true)} >settings</IconStyle>
                    </div>
                )
            } else {
                
                return (
                    <div color={props.percentage <= 25 ? 'red' : 'gray-1'} className="flex align-center"><Text className="self-center mr1" size={12} weight="reg">{props.percentage <= 25 ? "Enable Playback Protection" : "Playback Protection"}</Text>
                        <IconStyle className='pointer' onClick={() => props.openOverage(true)}>settings</IconStyle>
                    </div>
                )
            }
        }
        if(props.percentage <= 25 && props.percentage > 0) {
            return <Text size={12} weight="reg" color="red"> Upgrade before you run out of {props.widget}</Text>
        }
        if(props.percentage <= 0) {
            if(props.widget === 'storage' || props.widget === 'encoding') {
                return <Text size={12} weight="reg" color="red">You have no {props.widget} remaining</Text>
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