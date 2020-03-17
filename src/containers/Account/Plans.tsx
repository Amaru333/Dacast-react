import React from 'react';
import { LoadingSpinner} from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { PlansPage } from '../../pages/Account/Plans/Plans';
import { SpinnerContainer } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Plans } from '../../redux-flow/store/Account/Plans/types';
import { ApplicationState } from '../../redux-flow/store';
import { PlansAction, getPlanDetailsAction, changeActivePlanAction } from '../../redux-flow/store/Account/Plans/actions';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';


export interface PlansContainerProps {
    planDetails: Plans;
    getPlanDetails: Function;
    changeActivePlan: Function;
}

const PlansContainer = (props: PlansContainerProps) => {
    React.useEffect(() => {
        if(!props.planDetails) {
            props.getPlanDetails();
        }
    }, [])

    return (
        props.planDetails ? 
            <PlansPage {...props}/>
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
        changeActivePlan: (data: Plans) => {
            dispatch(changeActivePlanAction(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (PlansContainer);