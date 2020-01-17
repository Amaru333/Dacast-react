import React from 'react';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { InteractionsPage } from '../../pages/Settings/Interactions/Interactions';

const data = {
    test: 'test'
}
const Interactions = () => {

    React.useEffect(() => {
        if(data) {

        }
    }, []);

    return (
        data ?
            <InteractionsPage />
            : <LoadingSpinner size='medium' color='overlay70' />
    )
}

export default Interactions;