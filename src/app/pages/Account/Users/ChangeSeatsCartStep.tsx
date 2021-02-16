import React from 'react';
import { InputCounter } from '../../../../components/FormsComponents/Input/InputCounter';
import { Table } from '../../../../components/Table/Table';
import { Text } from '../../../../components/Typography/Text';
import { Plan } from '../../../redux-flow/store/Account/Upgrade/types';

export const ChangeSeatsCartStep = (props: {stepperData: Plan; updateStepperData: React.Dispatch<React.SetStateAction<Plan>>; planData: Plan; emptySeats: number; setStepValidated: React.Dispatch<React.SetStateAction<boolean>>;}) => {

    const [seatChange, setSeatChange] = React.useState<number>(0)
    let newExtraSeatPrice = 120 * seatChange

    React.useEffect(() => {
        props.setStepValidated(seatChange !== 0)
    }, [seatChange])

    React.useEffect(() => {
        props.updateStepperData({...props.stepperData, extraSeats: (props.planData.extraSeats + seatChange), seatChange: seatChange})
    }, [seatChange])

    const seatsHeaderElement = () => {
        return {
            data: [
                {cell: <Text key="seatQuantity" size={14} weight="med" color="gray-1">Seats</Text>},
                {cell: <Text key="seatUnitPrice" size={14} weight="med" color="gray-1">Unit Price</Text>},
                {cell: <Text key="seatInput" size={14} weight="med" color="gray-1">Add / Remove Seats</Text>},
                {cell: <Text key="seatTotal" size={14} weight="med" color="gray-1">Total</Text>}

            ]
        }
    }

    const seatsBodyElement = () => {
        return [
            {
                data: [
                    <Text key="planSeatQuantity" size={14} weight="med" color="gray-1">{props.planData.baseSeats!} Seat</Text>,
                    <Text key="planSeatUnitPrice" size={14} weight="reg" color="gray-1">Included In Plan</Text>,
                    <></>,
                    <></>
                ]
            },
            {
                data: [
                    <Text key="extraSeatQuantity" size={14} weight="med" color="gray-1">{props.planData.extraSeats} Add-Ons</Text>,
                    <Text key="extraSeatUnitPrice" size={14} weight="reg" color="gray-1">$10 per month</Text>,
                    <InputCounter counterValue={seatChange} setCounterValue={setSeatChange} minValue={props.planData.extraSeats === 0 ? 0 : - Math.abs(props.emptySeats)}/>,
                    <Text key="extraSeatTotal" size={14} weight="med" color="gray-1">${120 * props.stepperData.extraSeats} /yr</Text>,
                ]
            }
        ]
    }

    const billingBodyElement = () => {
        return [
            {
                data: [
                    <Text key="totalDueNow" size={14} weight="med" color="gray-1">Total Due Now</Text>,
                    <Text className="right pr2" key="totalDueNowValue" size={14} weight="med" color="dark-violet">${seatChange > 0 ? (120 * seatChange) : 0 }</Text>
                ]
            },
            {
                data: [
                    <Text key="annualBill" size={14} weight="med" color="gray-1">Annual Bill From 2nd Sep 2020</Text>,
                    <Text className="right pr2" key="annualBillValue" size={14} weight="med" color="gray-1">${(props.stepperData.price/100) + newExtraSeatPrice}</Text>
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