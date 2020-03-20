import React from 'react'
import { EditPlanPage } from '../../pages/Accounts/EditPlan'
import { saveAccountPlanAction, getAccountPlanAction, Action } from '../../redux-flow/store/Accounts/EditPlan';
import { PlanInfo } from '../../redux-flow/store/Accounts/EditPlan/types';
import { ThunkDispatch } from 'redux-thunk';
import { AdminState } from '../../redux-flow/store';
import { connect } from 'react-redux';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { useParams } from 'react-router-dom';

export interface EditPlanComponentProps {
    accountPlan: PlanInfo;
    getAccountPlan: Function;
    saveAccountPlan: Function;
    switchAccountPlan: Function;
}
const EditPlan = (props: EditPlanComponentProps) => {

    let { accountId } = useParams()

    React.useEffect(() => {
        if(!props.accountPlan) {
            props.getAccountPlan(accountId)
        }
    }, [])
    return props.accountPlan ?
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
        getAccountPlan: (accountId: string) => {
            dispatch(getAccountPlanAction(accountId));
        },
        saveAccountPlan: (accountInfo: string, planInfo: PlanInfo) => {
            dispatch(saveAccountPlanAction(accountInfo, planInfo))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPlan)