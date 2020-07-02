import React from 'react';
import { LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { UpgradePage } from '../../pages/Account/Upgrade/Upgrade';
import { Plans, ChangePlan, Plan } from '../../redux-flow/store/Account/Upgrade/types';
import { ApplicationState } from '../../redux-flow/store';
import { UpgradeAction, getPlanDetailsAction, changeActivePlanAction } from '../../redux-flow/store/Account/Upgrade/actions';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';


export interface UpgradeContainerProps {
    planDetails: Plans;
    getPlanDetails: () => void;
    changeActivePlan: (data: ChangePlan) => void;
}

const UpgradeContainer = (props: UpgradeContainerProps) => {
    React.useEffect(() => {
        if(!props.planDetails) {
            props.getPlanDetails();
        }
    }, [])

    return (
        props.planDetails ? 
            <UpgradePage planDetails={props.planDetails} {...props}/>
            : 
            <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        planDetails: state.account.upgrade
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, UpgradeAction>) {
    return {
        getPlanDetails: () => {
            dispatch(getPlanDetailsAction())
        },
        changeActivePlan: async (data: Plan, recurlyData: any) => {
            await dispatch(changeActivePlanAction(data, recurlyData))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (UpgradeContainer);