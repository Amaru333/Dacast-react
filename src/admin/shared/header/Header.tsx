import React from 'react'
import { Tab } from '../../../components/Tab/Tab'
import { IconStyle } from '../../../shared/Common/Icon'
import { AdminRoutes } from '../../constants/AdminRoutes'
import { LogoutAction, Action } from '../../redux-flow/store/Register/Login'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AdminState } from '../../redux-flow/store'
import { useHistory } from 'react-router-dom'

const Header = (props: {logout: Function}) => {

    let history = useHistory()
    
    return (
        <div className='flex items-center mt2'>
            <div className='flex col col-12 flex-auto'>
                <Tab className='flex col col-12 flex-auto' orientation='horizontal' list={AdminRoutes.filter(r => r.displayedInHeadertab)}/>
            </div>
            <div className='pointer'>
                <IconStyle onClick={() => {props.logout();history.push('/login')}}>exit_to_app_outlined</IconStyle>
            </div>
        </div>
    )
}

export function mapDispatchToProps(dispatch: ThunkDispatch<AdminState, void, Action>) {

    return {
        logout: () => {
            dispatch(LogoutAction());
        },
    }

}

export default connect(null, mapDispatchToProps)(Header); 