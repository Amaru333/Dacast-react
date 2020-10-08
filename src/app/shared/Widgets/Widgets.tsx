import React from 'react';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Text } from '../../../components/Typography/Text';
import { useHistory } from 'react-router';

export const handleButtonToPurchase = (percentage: number, purchaseItem: string, planPage?: boolean, callback?: () => void) => {

    let history = useHistory()

    if(purchaseItem === "Storage" ) {
        return (
            <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <Button buttonColor="red" sizeButton="xs" onClick={() => history.push("/account/upgrade")}>Upgrade</Button></Text>
        )
    } else {
        return (
            <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <Button buttonColor={percentage <= 25 ? "red" : "blue"} sizeButton="xs" onClick={() => planPage ? callback() : history.push("/account/plan")}>Buy More</Button></Text>
        )
    }
}