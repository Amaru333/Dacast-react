import React from 'react'
import { dacastSdk } from '../services/axios/axiosClient'
import { userToken } from '../services/token/tokenService'

export const useWebSocket = () => {

    const ws = React.useRef(null)
    const [wsData, setWsData] = React.useState<any>(null)

    React.useEffect(() => {
        const setWebSocketConnection = async () => {
            dacastSdk.getWebSocket()
            .then(response => {
                const token = userToken.getTokenInfo().token
                let url: string = response.endpoint
                let editedUrl: string = 'wss' + url.substring(5)
                ws.current = new WebSocket(`${editedUrl}?token=${token}`)
                ws.current.onopen = () => console.log("ws opened")
            }).catch(error => {
                throw new Error(error.message)
            })
        }

        setWebSocketConnection()

        return () => {
            if (ws.current) {
                ws.current.onclose = () => console.log("ws closed")
                ws.current.close()
            }
        }
    }, [])

    React.useEffect(() => {
        if (!ws.current) return;
        ws.current.onmessage = (e: any) => {
            setWsData(JSON.parse(e.data))
        }
    })

    return wsData
}
