import React from 'react';
import { LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { PendingOrdersPage } from '../../pages/Account/PendingOrders/PendingOrders';
import { ApplicationState } from '../../redux-flow/store';
import { PendingOrdersList, PendingOrder } from '../../redux-flow/store/Account/PendingOrders/types';
import { Action, getPendingOrdersAction, updatePendingOrdersAction } from '../../redux-flow/store/Account/PendingOrders/actions';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';

export interface PendingOrdersComponentProps {
    pendingOrders: PendingOrdersList;
    getPendingOrders: () => Promise<void>;
    updatePendingOrders: (data: PendingOrder) => Promise<void>;
}

export const PendingOrders = (props: PendingOrdersComponentProps) => {

    const [isFetching, setIsFetching] = React.useState<boolean>(true)
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getPendingOrders()
        .then(() => setIsFetching(false))
        .catch(() => setNodataFetched(true))
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    if(isFetching) {
        return <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    }
    return <PendingOrdersPage {...props} />
}

export function mapStateToProps( state: ApplicationState) {
    return {
        pendingOrders: state.account.pendingOrders
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPendingOrders: async () => {
           await dispatch(getPendingOrdersAction());
        },
        updatePendingOrders: async (data: PendingOrder) => {
            await dispatch(updatePendingOrdersAction(data))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingOrders); 