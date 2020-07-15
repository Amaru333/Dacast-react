import React from 'react'
import { useQuery } from '../../../utils/utils'
import { useHistory } from 'react-router'

export const Impersonate = () => {

    let query = useQuery()
    let history = useHistory()

    React.useEffect(() => {
        if(query.get('token')) {
            localStorage.removeItem('userToken')
            localStorage.setItem('userToken', JSON.stringify(
                {
                    token: query.get('token'),
                    accessToken: null,
                    refresh: null,
                    expires: 9999999999999
                }
            ))
            history.push('/dashboard')
        }
    }, [])

    return (
        <div>
            <h1>Impersonate page</h1>
        </div>
    )
}