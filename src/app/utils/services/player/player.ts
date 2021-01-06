import React from 'react';
import { isProduction } from './stage';

// TODO WHILE REFACTORING: MAKE IT A PACKAGE
export const usePlayer = (playerRef: React.MutableRefObject<HTMLDivElement>, contentId: string) => {
    const [player, setPlayer] = React.useState<any>(null);
    let dacastPlayerRef =   React.useRef()

    React.useEffect(() => {
        dacastPlayerRef.current = player
    }, [player])


    const initPlayer = () => {
        let player = dacast(contentId, playerRef.current, {
            autoplay: false,
            provider: isProduction() ? 'universe' : 'singularity'
        })
        setPlayer(player)
    }

    React.useEffect(() => {
        if(playerRef && playerRef.current)
        {
            let existingPlayerTag = Array.from(document.getElementsByTagName('script'))
                .find(s => s.src.indexOf('player.dacast.com/js/player.js') !== -1)
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
                if(dacastPlayerRef.current) {
                    dacastPlayerRef.current.dispose()
                }
            }
        };
    }, [])
    return player;
}

