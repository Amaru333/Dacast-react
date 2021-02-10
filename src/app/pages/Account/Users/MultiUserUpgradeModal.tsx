import React from 'react';
import { useHistory } from 'react-router';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Text } from '../../../../components/Typography/Text';

export const MultiUserUpgradeModal = (props: {toggle: (b: boolean) => void}) => {

    let history = useHistory()

    return (
        <div className="flex flex-column">
            <Text className="mt1">Upgrade your plan or buy extra seats and invite your team to your Dacast account!</Text>
            <div className="flex mt3">
                <Button typeButton="primary" onClick={() => {history.push('/account/upgrade'); props.toggle(false)}}>Upgrade</Button>
                <Button className="ml2" typeButton="secondary" onClick={() => console.log('buy more seats stepper')}>Buy Seats</Button>
                <Button className="ml2" typeButton="tertiary" onClick={() => props.toggle(false)}>Cancel</Button>
            </div>
        </div>
    )

}