import React from 'react'
import { IconGray1, classContainer, WidgetHeader, classItemFullWidthContainer, SupportCard, CloseCross } from './DashboardStyles'
import { WidgetElement } from '../../components/Dashboard'
import { Text } from '../../components/Typography/Text';
import { ProgressBar } from '../../components/FormsComponents/Progress/ProgressBar/ProgressBar';
import { Button } from '../../components/FormsComponents/Button/Button';
import { numberFormatter, getPercentage } from '../../utils/utils';
import { Icon } from '@material-ui/core';
import { Label } from '../../components/FormsComponents/Label/Label';

type PlanType = {
    libelle: string;
    price: number;
    /** Change to Date maybe later or number for timestamp */
    nextBill: string;
    isTrial: boolean;
    daysLeft?: number;
}

type GeneralDashboardProps = {
    bandwidth: {
        limit: number;
        consumed: number;
    }, 
    storage: {
        limit: number;
        consumed: number;
    }, 
    encoding: {
        limit: number;
        consumed: number;
    }, 
    overage: {
        enabled: boolean;
        value: number;
    }
    plan: PlanType 
}

export const GeneralDashboard = (props: React.HTMLAttributes<HTMLDivElement> & {profile: GeneralDashboardProps}) => {

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
    const encoding = {
        percentage: getPercentage(props.profile.encoding.limit-props.profile.encoding.consumed, props.profile.encoding.limit),
        left: numberFormatter(props.profile.encoding.limit-props.profile.encoding.consumed, 'k'),
        limit: numberFormatter(props.profile.encoding.limit, 'k'),
    } 

    const handleButtonToPurchase = (percentage: number) => {
        if(percentage <= 25 ) {
            return (
                <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <Button buttonColor="red" sizeButton="xs" onClick={() => alert('Go to purchase page')}>Buy More</Button> </Text>
            )
        } else {
            return (
                <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <a href="javascript:alert('Go to purchase page')">Buy More</a> </Text>
            )
        }
    }

    return (
        <section className="col col-12">
            <div className="flex items-baseline mb1">
                <Text size={24} weight="reg" className="mt0 mb3 inline-block">
                    Dashboard
                </Text>
                <Text className="ml-auto" size={14} weight="reg" color="gray-2" ><b>For Billing Period</b> 06/30/2019-07/29/2019</Text>
            </div>

            <div className={classContainer}>

                <WidgetElement className={classItemFullWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Data Remaining </Text>
                        {handleButtonToPurchase(bandwidth.percentage)}
                    </WidgetHeader>
                    <div className="flex flex-wrap items-baseline mb1">
                        <Text size={32} weight="reg" color="gray-1"> {bandwidth.left}</Text><Text size={16} weight="reg" color="gray-4" >/{bandwidth.limit} GB</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >{bandwidth.percentage}%</Text>
                    </div>
                    <ProgressBarDashboard overage={props.profile.overage} percentage={bandwidth.percentage} widget="bandwidth" />
                </WidgetElement>

                <WidgetElement className={classItemFullWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Storage Remaining </Text>
                        {handleButtonToPurchase(storage.percentage)}
                    </WidgetHeader>
                    <div className="flex flex-wrap items-baseline mb1">
                        <Text size={32} weight="reg" color="gray-1"> {storage.left}</Text><Text size={16} weight="reg" color="gray-4" >/{storage.limit} GB</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >{storage.percentage}%</Text>
                    </div>
                    <ProgressBarDashboard percentage={storage.percentage} widget="storage" />
                </WidgetElement>


                <WidgetElement className={classItemFullWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Encoding Remaining </Text>
                        {handleButtonToPurchase(encoding.percentage)}
                    </WidgetHeader>
                    <div className="flex flex-wrap items-baseline mb1">
                        <Text size={32} weight="reg" color="gray-1"> {encoding.left}</Text><Text size={16} weight="reg" color="gray-4" >/{encoding.limit} Mins</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >{encoding.percentage}%</Text>
                    </div>
                    <ProgressBarDashboard percentage={encoding.percentage} widget="encoding" />
                </WidgetElement>

                {
                    props.profile.plan.isTrial  ?
                        <WidgetElement className={classItemFullWidthContainer}>
                            <WidgetHeader className="flex">
                                <Text size={16} weight="med" color="gray-3"> 30 Day Trial </Text>
                                <Button className="ml-auto" typeButton='secondary' sizeButton="xs" >Upgrade </Button>
                            </WidgetHeader>
                            <div className="flex flex-wrap items-baseline mb1">
                                <Text className="mr1" size={32} weight="reg" color="gray-1">{props.profile.plan.daysLeft}  </Text><Text size={16} weight="reg" color="gray-4" > Days remaining</Text>
                            </div>
                            <Text size={12} weight="reg" color="gray-1">Upgrade to enable all features</Text>
                        </WidgetElement> :
                        <WidgetElement className={classItemFullWidthContainer}>
                            <WidgetHeader className="flex">
                                <Text size={16} weight="med" color="gray-3"> {props.profile.plan.libelle} </Text>
                                <Button className="ml-auto" buttonColor="red" sizeButton="xs" onClick={() => alert('Go to purchase page')}>Buy More</Button>
                            </WidgetHeader>
                            <Text className="inline-block mb1" size={14} weight="reg" color="gray-1">Next Bill due {props.profile.plan.nextBill}</Text><br />
                            <Text size={32} weight="reg" color="gray-1">${props.profile.plan.price}</Text>
                        </WidgetElement>
                }

            </div>
        </section>
    )

}

const ProgressBarDashboard = (props: { percentage: number, widget: 'bandwidth' | 'storage' | 'encoding', overage?: {enabled: boolean, value: number} }) => {

    const handleProgressBar = () => {
        return (
            <ProgressBar className="mb1" size="large" color={ props.percentage<= 25 ? 'red' : 'violet' } startingValue={props.percentage} />
        )
    }
    const handleInfos = () => {
        if(props.percentage <= 25 && props.percentage > 0) {
            if(props.widget === 'storage' || props.widget === 'encoding') {
                return <Text size={12} weight="reg" color="red"> Upgrade before you run out of {props.widget}</Text>
            } else {
                if(props.overage && props.overage.enabled) {
                    return <div className="flex align-center"><Text className="self-center mr1" size={12} weight="reg" color="red"> {props.overage.value}GB Overages enabled</Text><Icon>settings</Icon></div>
                } else {
                    return <><Text size={12} weight="reg" color="red"> Upgrade before you run out of data</Text><Icon>settings</Icon></>
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
            {handleProgressBar()}
            {handleInfos()}
        </>
    )

}