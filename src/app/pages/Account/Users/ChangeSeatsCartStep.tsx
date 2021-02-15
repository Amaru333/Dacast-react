import React from 'react';
import { InputCounter } from '../../../../components/FormsComponents/Input/InputCounter';
import { Table } from '../../../../components/Table/Table';
import { Text } from '../../../../components/Typography/Text';

export const ChangeSeatsCartStep = () => {

    const [extraSeats, setExtraSeats] = React.useState<number>(0)

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
                    <Text key="planSeatQuantity" size={14} weight="med" color="gray-1">1 Seat</Text>,
                    <Text key="planSeatUnitPrice" size={14} weight="reg" color="gray-1">Included In Plan</Text>,
                    <></>,
                    <></>
                ]
            },
            {
                data: [
                    <Text key="extraSeatQuantity" size={14} weight="med" color="gray-1">0 Add-Ons</Text>,
                    <Text key="extraSeatUnitPrice" size={14} weight="reg" color="gray-1">$10 per month</Text>,
                    <InputCounter counterValue={extraSeats} setCounterValue={setExtraSeats}/>,
                    <Text key="extraSeatTotal" size={14} weight="med" color="gray-1">$480 /yr</Text>,
                ]
            }
        ]
    }

    const billingBodyElement = () => {
        return [
            {
                data: [
                    <Text key="totalDueNow" size={14} weight="med" color="gray-1">Total Due Now</Text>,
                    <Text className="right pr2" key="totalDueNowValue" size={14} weight="med" color="dark-violet">$240</Text>
                ]
            },
            {
                data: [
                    <Text key="annualBill" size={14} weight="med" color="gray-1">Annaul Bill From 2nd Sep 2020</Text>,
                    <Text className="right pr2" key="annualBillValue" size={14} weight="med" color="gray-1">$948</Text>
                ]
            }
        ]
    }

    return (
        <div>
            <Table id="seatsTable" header={seatsHeaderElement()} body={seatsBodyElement()} headerBackgroundColor="gray-10" />
            <Table id="seatsBillingTable" body={billingBodyElement()} headerBackgroundColor="gray-10" />
        </div>
    )
}