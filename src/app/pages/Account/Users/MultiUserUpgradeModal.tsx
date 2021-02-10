import React from 'react';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Text } from '../../../../components/Typography/Text';

export const MultiUserUpgradeModal = () => {

    return (
        <div className="flex flex-column">
            <Text className="mt1">Upgrade your plan or buy extra seats and invite your team to your Dacast account!</Text>
            <div className="flex mt3">
                <Button typeButton="primary">Upgrade</Button>
                <Button className="ml2" typeButton="secondary">Buy Seats</Button>
                <Button className="ml2" typeButton="tertiary">Cancel</Button>
            </div>
        </div>
    )

}