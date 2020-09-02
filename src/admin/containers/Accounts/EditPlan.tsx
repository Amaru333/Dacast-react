import React from 'react'
import { EditPlanPage } from '../../pages/Accounts/EditPlan'
import { saveAccountPlanAction, getAccountPlanAction, Action } from '../../redux-flow/store/Accounts/EditPlan';
import { PlanInfo, PlanInfoPut } from '../../redux-flow/store/Accounts/EditPlan/types';
import { ThunkDispatch } from 'redux-thunk';
import { AdminState } from '../../redux-flow/store';
import { connect } from 'react-redux';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { useParams } from 'react-router-dom';

export interface EditPlanComponentProps {
    accountPlan: PlanInfo;
    getAccountPlan: (accountId: string) => Promise<void>;
    saveAccountPlan: (accountId: string, planDetails: PlanInfoPut) => Promise<void>;
    switchAccountPlan: Function;
}
const EditPlan = (props: EditPlanComponentProps) => {

    let { accountId } = useParams()
    const [isFetching, setIsFetching] = React.useState<boolean>(true)

    React.useEffect(() => {
        props.getAccountPlan(accountId)
        .then(() => setIsFetching(false))
    }, [])
    return !isFetching ?
        <EditPlanPage {...props} accountId={accountId} /> 
        : <SpinnerContainer><LoadingSpinner size='medium' color='violet'></LoadingSpinner></SpinnerContainer>
}

export function mapStateToProps(state: AdminState) {
    return {
        accountPlan: state.accounts.plan
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<AdminState, void, Action>) {
    return {
        getAccountPlan: async (accountId: string) => {
            await dispatch(getAccountPlanAction(accountId));
        },
        saveAccountPlan: async (accountInfo: string, planInfo: PlanInfoPut) => {
            await dispatch(saveAccountPlanAction(accountInfo, planInfo))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPlan)