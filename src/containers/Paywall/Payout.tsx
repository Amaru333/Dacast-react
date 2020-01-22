import React from 'react';
import { PayoutPage } from '../../pages/Paywall/Payout/Payout';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

let data = 'lopl';
const Payout = () => {

    React.useEffect(() => {
        if(!data) {
            data = 'oi'
        }
    }, []) 
    
    return (
        data ?
            <PayoutPage />
            : <LoadingSpinner size='large' color='orange' />
    )
}

export default Payout;