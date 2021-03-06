import React from 'react'
import { ChargebacksPage } from '../../pages/Paywall/Chargebacks'
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { submitChargebackAction, Action } from '../../redux-flow/store/Paywall/Chargebacks/actions';
import { Chargeback } from '../../redux-flow/store/Paywall/Chargebacks/types';
import { AdminState } from '../../redux-flow/store';

export interface ChargebackComponentProps {
    submitChargeback: (data: Chargeback) => Promise<void>;
}
const Chargebacks = (props: ChargebackComponentProps) => {

    return (
        <ChargebacksPage {...props} />
    )
}

export function mapDispatchToProps(dispatch: ThunkDispatch<AdminState, void, Action>) {
    return {
        submitChargeback: async (data: Chargeback) => {
            await dispatch(submitChargebackAction(data))
        }
    };
}

export default connect(null, mapDispatchToProps)(Chargebacks)