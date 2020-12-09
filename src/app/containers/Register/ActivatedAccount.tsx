import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle'
import { useQuery } from '../../../utils/utils'
import { ActivatedAccountPage } from '../../pages/Register/ActivatedAccount'
import { ApplicationState } from '../../redux-flow/store'
import { Action, confirmEmailAction } from '../../redux-flow/store/Register/ConfirmEmail/actions'

export interface ActivatedAccountComponentProps {
    confirmEmail: (email: string) => Promise<void>;
}

const ActivatedAccount = (props: ActivatedAccountComponentProps) => {

    let query = useQuery()

    const [emailChecked, setEmailChecked] = React.useState<boolean>(false)
    const [activationError, setActivationError] = React.useState<string>('')

    React.useEffect(() => {
        if (query.get('email')) {
            props.confirmEmail(query.get('email')).then((response) => {
                setEmailChecked(true)
                setActivationError("")
            }).catch((error) => {
                setActivationError(error.response.data.error)
                setEmailChecked(true)
            })
        }
    }, [])

    return emailChecked ?
        <ActivatedAccountPage activationError={activationError}  />
        :<SpinnerContainer><LoadingSpinner className="mlauto mrauto" size="medium" color="violet" /></SpinnerContainer>
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        confirmEmail: async (email: string) => {
            await dispatch(confirmEmailAction(email));
        },

    };
}

export default connect(null, mapDispatchToProps)(ActivatedAccount);