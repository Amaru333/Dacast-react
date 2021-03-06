import React from 'react';
import { useHistory } from 'react-router';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Text } from '../../../../components/Typography/Text';
import { userToken } from '../../../utils/services/token/tokenService';

export const MultiUserUpgradeModal = (props: {toggle: (b: boolean) => void, openBuySeatsStepper: () => void}) => {

    let history = useHistory()

    return (
        <div className="flex flex-column">
            <Text className="mt1">Upgrade your plan or buy extra seats and invite your team to your Dacast account!</Text>
            <div className="flex mt3">
                <Button typeButton="primary" onClick={() => {history.push('/account/upgrade'); props.toggle(false)}}>Upgrade</Button>
                {(userToken.getUserInfoItem('planName').indexOf('Trial') === -1 && userToken.getUserInfoItem('planName').indexOf('Free') === -1) && <Button className="ml2" typeButton="secondary" onClick={() => props.openBuySeatsStepper()}>Buy Seats</Button>}
                <Button className="ml2" typeButton="tertiary" onClick={() => props.toggle(false)}>Cancel</Button>
            </div>
        </div>
    )

}