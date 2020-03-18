import React from 'react';
import { LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { PendingOrdersPage } from '../../pages/Account/PendingOrders/PendingOrders';
import { ApplicationState } from '../../redux-flow/store';
import { PendingOrdersList, PendingOrder } from '../../redux-flow/store/Account/PendingOrders/types';
import { Action, getPendingOrdersAction, updatePendingOrdersAction } from '../../redux-flow/store/Account/PendingOrders/actions';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

export interface PendingOrdersComponentProps {
    pendingOrders: PendingOrdersList;
    getPendingOrders: Function;
    updatePendingOrders: Function;
}

export const PendingOrders = (props: PendingOrdersComponentProps) => {

    React.useEffect(() => {
        if(!props.pendingOrders) {
            props.getPendingOrders();
        }
    }, [])

    return (
        props.pendingOrders ?
            <PendingOrdersPage {...props} />
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        pendingOrders: state.account.pendingOrders
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPendingOrders: () => {
            dispatch(getPendingOrdersAction());
        },
        updatePendingOrders: (data: PendingOrder) => {
            dispatch(updatePendingOrdersAction(data))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingOrders); 