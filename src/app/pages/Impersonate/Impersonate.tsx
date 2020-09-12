import React from 'react'
import { useQuery } from '../../../utils/utils'
import { useHistory } from 'react-router'
import { userToken } from '../../utils/token'
import { store } from '../..'

export const Impersonate = () => {

    let query = useQuery()
    let history = useHistory()

    React.useEffect(() => {
        store.dispatch({type: 'USER_LOGOUT'});
        if(query.get('token')) {
            userToken.resetUserInfo()
            userToken.addTokenInfo({
                token: query.get('token'),
                accessToken: null,
                refresh: null,
                expires: 9999999999999
            })
            history.push('/dashboard')
        }
    }, [])

    return (
        <div>
            <h1>Impersonate page</h1>
        </div>
    )
}