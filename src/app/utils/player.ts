import React from 'react';


export const usePlayer = (playerRef: React.MutableRefObject<HTMLDivElement>, contentId: string) => {
    const [player, setPlayer] = React.useState<any>(null);

    const initPlayer = () => {
        let player = dacast(contentId, playerRef.current, {
            autoplay: false
        })
        player.on('EVENT_READYSTATE_CHANGE', (state: number) => {
            console.log(state, player.getPlayerInstance().videoHeight)
            
        })
        setPlayer(player)
    }

    React.useEffect(() => {
        if(playerRef && playerRef.current)
        {
            let existingPlayerTag = Array.from(document.getElementsByTagName('script'))
                .find(s => s.src.indexOf('player.dacast.com/js/player.js') !== -1)
            console.log(existingPlayerTag)
            if(!existingPlayerTag) {
                let head = document.head || document.getElementsByTagName('head')[0];
                const playerScript = document.createElement('script');
                playerScript.src = "https://player.dacast.com/js/player.js?contentId=" + contentId;
                head.insertBefore(playerScript, head.firstChild);                
                playerScript.addEventListener('load', initPlayer)
            } else {
                initPlayer()
            }
        }
        return () => {
            // Investigate later why the state variable is null when trying to unmount 
            if(typeof dacast !== 'undefined') {
                let player = dacast.players[contentId]
                if(player) {
                    console.log('disposing')                
                    player.dispose()
                }
            }
        };
    }, [])
    return player;
}

