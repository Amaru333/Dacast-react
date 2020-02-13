import React from 'react';
import { LoadingSpinner} from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { PendingOrdersPage } from '../../pages/Account/PendingOrders/PendingOrders';
import { ApplicationState } from '../../redux-flow/store';
import { PendingOrder } from '../../redux-flow/store/Account/PendingOrders/types';
import { Action, getPendingOrdersAction } from '../../redux-flow/store/Account/PendingOrders/actions';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

export interface PendingOrdersComponentProps {
    pendingOrders: PendingOrder[];
    getPendingOrders: Function;
}

export const PendingOrders = (props: PendingOrdersComponentProps) => {

    React.useEffect(() => {
        if(!props.pendingOrders) {
            props.getPendingOrders();
        }
    }, [])

    return (
        props.pendingOrders ?
            <PendingOrdersPage />
            : <LoadingSpinner size='large' color='blue60' />
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        pendingOrders: state.account.pendingOrders
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getInvoices: () => {
            dispatch(getPendingOrdersAction());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingOrders); 