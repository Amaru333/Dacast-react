import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { PayoutPage } from '../../pages/Paywall/Payout/Payout';
import { Action, getPayoutInfosAction } from '../../redux-flow/store/Paywall/Payout/actions'
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { PayoutInfos } from '../../redux-flow/store/Paywall/Payout';


export interface PayoutComponentProps {
    payoutInfos: PayoutInfos;
    getPayoutInfos: Function;
}


const Payout = (props: PayoutComponentProps) => {

    React.useEffect(() => {
        if(!props.payoutInfos) {
            props.getPayoutInfos();
        }
    }, []) 

    return (
        props.payoutInfos ?
            <PayoutPage {...props} />
            : <LoadingSpinner size='large' color='orange' />
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        payoutInfos: state.paywall.payout
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPayoutInfos: () => {
            dispatch(getPayoutInfosAction());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payout);