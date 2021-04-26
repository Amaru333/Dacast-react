import React from 'react';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Text } from '../../../components/Typography/Text';
import { useHistory } from 'react-router';

export const handleButtonToPurchase = (percentage: number, purchaseItem: string, planPage?: boolean, callback?: () => void) => {

    let history = useHistory()

    if(percentage <= 25 ) {
        return (
            <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <Button buttonColor="lightBlue" sizeButton="xs" onClick={() => history.push("/account/upgrade")}>Upgrade</Button></Text>
        )
    } else {
        return (
            <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <Button buttonColor={percentage <= 25 ? "red" : "lightBlue"} sizeButton="xs" onClick={() => planPage ? callback() : history.push("/account/plan#purchase-data")}>Buy More</Button></Text>
        )
    }
}
