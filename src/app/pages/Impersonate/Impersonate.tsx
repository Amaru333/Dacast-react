import React from 'react'
import { useHistory } from 'react-router'
import { userToken } from '../../utils/token'

export const Impersonate = () => {
    let history = useHistory()

    React.useEffect(() => {
        let query = new URLSearchParams(location.search);
        if(query.get('token')) {
            userToken.resetUserInfo()
            userToken.addTokenInfo({
                token: query.get('token'),
                accessToken: null,
                refresh: null,
                expires: 9999999999999
            })
            console.log('token used')
        }
        history.push('/dashboard')
    }, [])

    return (
        <div>
            <h1>Impersonate page</h1>
        </div>
    )
}