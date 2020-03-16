import React from 'react';
import { LoadingSpinner} from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { PlansPage } from '../../pages/Account/Plans/Plans';
import { SpinnerContainer } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Plans } from '../../redux-flow/store/Account/Plans/types';
import { ApplicationState } from '../../redux-flow/store';
import { PlansAction, getPlanDetailsAction } from '../../redux-flow/store/Account/Plans/actions';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';


interface PlansContainerProps {
    planDetails: Plans;
    getPlanDetails: Function;
}

const PlansContainer = (props: PlansContainerProps) => {
    const [value, setValue] = React.useState(null);
    React.useEffect(() => {
        if(!props.planDetails) {
            props.getPlanDetails();
        }
        setValue(props.planDetails)
    }, [])

    return (
        props.planDetails ? 
            <PlansPage plans={value}/>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (PlansContainer);