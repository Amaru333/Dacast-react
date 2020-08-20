import React from 'react'
import { Tab } from '../../../components/Tab/Tab'
import { IconStyle } from '../../../shared/Common/Icon'
import { AdminRoutes } from '../../constants/AdminRoutes'
import { LogoutAction, Action } from '../../redux-flow/store/Register/Login'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AdminState } from '../../redux-flow/store'
import { useHistory } from 'react-router-dom'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { AccountsServices } from '../../redux-flow/store/Accounts/List/services'

const Header = (props: {logout: () => void}) => {

    let history = useHistory()
    const [userIdentifier, setUserIdentifier] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const handleImpersonate = () => {
        setIsLoading(true)
        AccountsServices.impersonate(userIdentifier)
        .then((response) => {
            setIsLoading(false)
            Object.assign(document.createElement('a'), { target: '_blank', href: `${process.env.APP_DOMAIN}/impersonate?token=${response.data.token}`}).click()
        })
        .catch(() => setIsLoading(false))
    }
    
    return (
        <div className='flex items-center my2'>
            <div className='flex col col-12 items-end'>
                <Tab className='flex col col-12' orientation='horizontal' list={AdminRoutes.filter(r => r.displayedInHeadertab)}/>
                <div className='flex ml2 items-end'>
                    <Input type='text' id='impersonateInput' label='Impersonate' placeholder='Impersonate...' value={userIdentifier} onChange={(event) => setUserIdentifier(event.currentTarget.value)} />
                    <div className='ml2'>
                        <Button isLoading={isLoading} onClick={() => handleImpersonate()} sizeButton='large' typeButton='primary' buttonColor='blue'>Impersonate</Button>
                    </div>
                </div>


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
        }
    }
}

export default connect(null, mapDispatchToProps)(Header)