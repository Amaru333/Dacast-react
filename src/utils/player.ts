import React from 'react';


export const usePlayer = (playerRef: React.MutableRefObject<HTMLDivElement>, contentId: string) => {
    const [player, setPlayer] = React.useState<any>(null);

    const initPlayer = () => {
        let player = dacast(contentId, playerRef.current, {
            height: 341,
            width: '100%',
            autoplay: false
        })
        setPlayer(player)
    }

    React.useEffect(() => {
        if(playerRef && playerRef.current)
        {
            let existingPlayerTag = Array.from(document.getElementsByTagName('script'))
                .find(s => s.src.indexOf('player.dacast.com/js/player.js') !== -1)
            if(!existingPlayerTag) {
                const playerScript = document.createElement('script');
                playerScript.src = "https://player.dacast.com/js/player.js?contentId=" + contentId;
                playerRef.current.appendChild(playerScript);
                playerScript.addEventListener('load', initPlayer)
            } else {
                initPlayer()
            }
        }
        return () => {
            // Investigate later why the state variable is null when trying to unmount 
            let player = dacast.players[contentId]
            if(player) {
                player.dispose()
            }
        };
    }, [])
    return player;
}

