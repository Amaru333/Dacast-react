import React from 'react';
import { LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { PlansPage } from '../../pages/Account/Plans/Plans';
import { Plans, ChangePlan } from '../../redux-flow/store/Account/Plans/types';
import { ApplicationState } from '../../redux-flow/store';
import { PlansAction, getPlanDetailsAction, changeActivePlanAction } from '../../redux-flow/store/Account/Plans/actions';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';


export interface PlansContainerProps {
    planDetails: Plans;
    getPlanDetails: () => void;
    changeActivePlan: (data: ChangePlan) => void;
}

const PlansContainer = (props: PlansContainerProps) => {
    React.useEffect(() => {
        if(!props.planDetails) {
            props.getPlanDetails();
        }
    }, [])

    return (
        props.planDetails ? 
            <PlansPage planDetails={props.planDetails} {...props}/>
            : 
            <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        planDetails: state.account.plans
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, PlansAction>) {
    return {
        getPlanDetails: () => {
            dispatch(getPlanDetailsAction())
        },
        changeActivePlan: async (data: ChangePlan) => {
            await dispatch(changeActivePlanAction(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (PlansContainer);