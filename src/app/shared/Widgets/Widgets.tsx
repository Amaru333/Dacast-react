import React from 'react';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Text } from '../../../components/Typography/Text';

export const handleButtonToPurchase = (percentage: number, purchaseItem: string, handlePurchaseStepper: Function) => {
    if(percentage <= 25 ) {
        return (
            <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <Button buttonColor="red" sizeButton="xs" onClick={() => handlePurchaseStepper(purchaseItem)}>Upgrade</Button></Text>
        )
    } else {
        // return (
        //     <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <Button typeButton="tertiary" sizeButton="xs" onClick={() => handlePurchaseStepper(purchaseItem)}>Upgrade</Button></Text>
        // )
    }
}