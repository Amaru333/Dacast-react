import React from 'react'
import { useQuery } from '../../../utils/utils'

export const Impersonate = () => {

    let query = useQuery()


    React.useEffect(() => {
        if(query.get('token')) {
            localStorage.removeItem('userToken')
            localStorage.setItem('userToken', JSON.stringify(query.get('token')))
        }
    }, [])
    
    return (
        <div>
            <h1>Impersonate page</h1>
        </div>
    )
}