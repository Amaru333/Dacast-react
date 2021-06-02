import React from 'react';
import { InputCounter } from '../../../../components/FormsComponents/Input/InputCounter';
import { Table } from '../../../../components/Table/Table';
import { Text } from '../../../../components/Typography/Text';
import { handleCurrencySymbol } from '../../../../utils/utils';
import { PlanSummary } from '../../../redux-flow/store/Account/Plan';
import { dacastSdk } from '../../../utils/services/axios/axiosClient';
import { PlanSummaryWithAdditionalSeats } from './Users';

interface ChangeSeatsCartStep {
    stepperData: PlanSummaryWithAdditionalSeats; 
    planData: PlanSummary; 
    emptySeats: number; 
    updateStepperData: React.Dispatch<React.SetStateAction<PlanSummaryWithAdditionalSeats>>; 
    setStepValidated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChangeSeatsCartStep = (props: ChangeSeatsCartStep) => {

    const [seatChange, setSeatChange] = React.useState<number>(props.stepperData.seatToPurchase)
    const [firstSeatChange, setFirstSeatChange] = React.useState<boolean>(false)
    const seatPricePerMonth = props.stepperData.addOns && props.stepperData.addOns.find(addOn => addOn.code === 'MUA_ADDITIONAL_SEATS') ? props.stepperData.addOns.find(addOn => addOn.code === 'MUA_ADDITIONAL_SEATS').price : 0

    React.useEffect(() => {
        if(!firstSeatChange && props.stepperData.proRatedPrice === 0) {
            setFirstSeatChange(true)
            dacastSdk.postPurchaseAddOn({
                quantity: (props.stepperData.extraSeats || 0) + 1,
                addOnCode: 'MUA_ADDITIONAL_SEATS',
                preview: true
            })
            .then((response) => {
                console.log(response)
                props.updateStepperData({...props.stepperData, proRatedPrice: response.price / 100})
            } )
        }
        props.setStepValidated(seatChange !== 0)
        props.updateStepperData({...props.stepperData, extraSeats: (props.planData.extraSeats + seatChange), addOns: props.stepperData.addOns ? props.stepperData.addOns.map(addOn => {
            if(addOn.code === 'MUA_ADDITIONAL_SEATS') {
                return {
                    ...addOn,
                    quantity: props.planData.extraSeats + seatChange,
                    included: true
                }
            }
            return addOn
        }) : [],
        seatToPurchase: seatChange
        })

    }, [seatChange])

    const seatsHeaderElement = () => {
        return {
            data: [
                {cell: <Text key="seatQuantity" size={14} weight="med" color="gray-1">Seats</Text>},
                {cell: <Text key="seatUnitPrice" size={14} weight="med" color="gray-1">Unit Price</Text>},
                {cell: <Text key="seatInput" size={14} weight="med" color="gray-1">Add Seats</Text>},
                {cell: <Text key="seatTotal" size={14} weight="med" color="gray-1">Total</Text>}

            ]
        }
    }

    const seatsBodyElement = () => {
        return [
            {
                data: [
                    <Text key="planSeatQuantity" size={14} weight="med" color="gray-1">{props.stepperData.addOns && props.stepperData.addOns.find(addOn => addOn.code === 'MUA_SEATS') ? props.stepperData.addOns.find(addOn => addOn.code === 'MUA_SEATS').quantity : 0} Seat</Text>,
                    <Text key="planSeatUnitPrice" size={14} weight="reg" color="gray-1">Included In Plan</Text>,
                    <></>,
                    <></>
                ]
            },
            {
                data: [
                    <Text key="extraSeatQuantity" size={14} weight="med" color="gray-1">{props.planData.extraSeats} Add-Ons</Text>,
                    <Text key="extraSeatUnitPrice" size={14} weight="reg" color="gray-1">{ handleCurrencySymbol(props.stepperData.currency) + seatPricePerMonth} per month</Text>,
                    <InputCounter counterValue={seatChange} setCounterValue={setSeatChange} minValue={0}/>,
                    <Text key="extraSeatTotal" size={14} weight="med" color="gray-1">{handleCurrencySymbol(props.stepperData.currency) + (seatPricePerMonth * 12 * props.stepperData.extraSeats)} /yr</Text>,
                ]
            }
        ]
    }

    const billingBodyElement = () => {
        const billingPeriod = new Date(props.stepperData.periodEndsAt * 1000).toLocaleString()
        return [
            {
                data: [
                    <Text size={14} weight="med" color="gray-1">Total Due Now</Text>,
                    <Text className="right pr2" size={14} weight="med" color="dark-violet">{handleCurrencySymbol(props.stepperData.currency) + (seatChange > 0 ? (props.stepperData.proRatedPrice * seatChange).toFixed(2) : 0)}</Text>
                ]
            },
            {
                data: [
                    <Text key="annualBill" size={14} weight="med" color="gray-1">Annual Bill From {billingPeriod}</Text>,
                    <Text className="right pr2" key="annualBillValue" size={14} weight="med" color="gray-1">{handleCurrencySymbol(props.stepperData.currency) + ((props.stepperData.price) + seatPricePerMonth * 12 * props.stepperData.extraSeats)}</Text>
                ]
            }
        ]
    }

    return (
        <div>
            <Table id="seatsTable" header={seatsHeaderElement()} body={seatsBodyElement()} headerBackgroundColor="gray-10" noCells />
            <Table id="seatsBillingTable" body={billingBodyElement()} headerBackgroundColor="gray-10" />
        </div>
    )
}