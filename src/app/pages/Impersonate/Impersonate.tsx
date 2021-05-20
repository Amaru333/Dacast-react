import React from 'react'
import { useHistory } from 'react-router'
import { getUrlParam } from '../../../utils/utils'
import { dacastSdk } from '../../utils/services/axios/axiosClient'
import { userToken } from '../../utils/services/token/tokenService'

export const Impersonate = () => {
    let history = useHistory()

    React.useEffect(() => {
        userToken.resetUserInfo()
        userToken.addTokenInfo({
            token: JSON.parse(getUrlParam('token')),
            accessToken: JSON.parse(getUrlParam('accessToken')) || null,
            refresh: getUrlParam('refresh') || null,
            expires: parseInt(getUrlParam('expires')) || 9999999999,
            impersonatedUserIdentifier: JSON.parse(getUrlParam('identifier')) || null
        })
        dacastSdk.updateToken(userToken)
        history.push('/')
    }, [])

    return (
        <div>
            <h1></h1>
        </div>
    )
}
