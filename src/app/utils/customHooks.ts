import React from 'react'
import { addTokenToHeader } from "./token"
import axios from 'axios'

export const useWebSocket = () => {

    const ws = React.useRef(null)
    const [wsData, setWsData] = React.useState<any>(null)

    React.useEffect(() => {
        const setWebSocketConnection = async () => {
            const { token } = addTokenToHeader()
            axios.get(process.env.API_BASE_URL + '/websocket-endpoint',
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
            console.log("e", e.data)
        }
    })

    return wsData
}

export const useNetwork = () => {
    const [isOnline, setNetwork] = React.useState(window.navigator.onLine);
    const updateNetwork = () => {
        setNetwork(window.navigator.onLine);
    };

    React.useEffect(() => {
        window.addEventListener("offline", updateNetwork);
        window.addEventListener("online", updateNetwork);
        return () => {
            window.removeEventListener("offline", updateNetwork);
            window.removeEventListener("online", updateNetwork);
        };
    });

    return isOnline;
};