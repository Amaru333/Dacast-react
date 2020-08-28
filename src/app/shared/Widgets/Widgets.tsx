import React from 'react';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Text } from '../../../components/Typography/Text';
import { useHistory } from 'react-router';

export const handleButtonToPurchase = (percentage: number, purchaseItem: string, handlePurchaseStepper: Function) => {

    let history = useHistory()

    if(percentage <= 25 ) {
        return (
            <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <Button buttonColor="red" sizeButton="xs" onClick={() => history.push("/account/upgrade")}>Upgrade</Button></Text>
        )
    } else {
        // return (
        //     <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <Button typeButton="tertiary" sizeButton="xs" onClick={() => handlePurchaseStepper(purchaseItem)}>Upgrade</Button></Text>
        // )
    }
}