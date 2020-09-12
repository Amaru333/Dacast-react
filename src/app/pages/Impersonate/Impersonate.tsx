import React from 'react'
import { useHistory } from 'react-router'

export const Impersonate = () => {
    let history = useHistory()

    React.useEffect(() => {
        history.push('/dashboard')
    }, [])

    return (
        <div>
            <h1>Impersonate page</h1>
        </div>
    )
}