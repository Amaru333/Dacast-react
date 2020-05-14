import React from 'react'
import { addTokenToHeader } from "./token"
import axios from 'axios'

export const useWebSocket = () => {

    const ws = React.useRef(null)
    const [wsData, setWsData] = React.useState<any>(null)

    React.useEffect(() => {
        const setWebSocketConnection = async () => {
            const {token} = addTokenToHeader()
            axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/websocket-endpoint', 
                {
                    headers: {
                        Authorization: token
                    }
                }
            ).then(response => {
                let url: string = response.data.data.endpoint
                let editedUrl: string = 'wss' + url.substring(5)
                ws.current = new WebSocket(`${editedUrl}?token=${token}`)
                ws.current.onopen = () => console.log("ws opened")
            }).catch(error => {
                throw new Error(error.message)
            })
        }

        setWebSocketConnection()

        return () => {
            if(ws.current) {
                ws.current.onclose = () => console.log("ws closed")
                ws.current.close()
            }
        }
    }, [])

    React.useEffect(() => {
        if (!ws.current) return;
        ws.current.onmessage = (e: any) => {
            setWsData(JSON.parse(e.data))
            console.log("e", wsData)
        }
    })

    return wsData
}