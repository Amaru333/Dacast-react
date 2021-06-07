import React from 'react'
import { useHistory } from 'react-router'
import { getUrlParam } from '../../../utils/utils'
import { dacastSdk } from '../../utils/services/axios/axiosClient'
import { userToken } from '../../utils/services/token/tokenService'

export const Impersonate = () => {
    let history = useHistory()

    const checkJSON = (input: string): string => {
        try {
            const parsedJSON = JSON.parse(input)
            return parsedJSON
        } catch(e) {
            if(input && input.length > 0) {
                return input
            }
            throw Error(e)
        }
    }

    React.useEffect(() => {
        userToken.resetUserInfo()
        userToken.addTokenInfo({
            token: checkJSON(getUrlParam('token')),
            accessToken: checkJSON(getUrlParam('accessToken')) || null,
            refresh: getUrlParam('refresh') || null,
            expires: parseInt(getUrlParam('expires')) || 9999999999,
            impersonatedUserIdentifier: getUrlParam('identifier') || null
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
