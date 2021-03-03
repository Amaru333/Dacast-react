import React from 'react';
import { useHistory } from 'react-router-dom';
import { Bubble } from '../../../../components/Bubble/Bubble';
import { Button } from '../../../../components/FormsComponents/Button/Button';

export const AccessPaywallGroupsModal = () => {

    let history = useHistory();

    return (
        <div>
            <Bubble className="mt2" type='info'>Add a livestream or video to create Price and Promo Groups.</Bubble>
            <div className="mt25 mb1">
                <Button onClick={() => history.push('/livestreams')} >Add Live Stream</Button>
                <Button onClick={() => history.push('/videos')} className="ml2" typeButton="secondary">Add Video</Button>
            </div>
        </div>
        
    )
}