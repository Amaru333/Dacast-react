import React from 'react'
import styled from 'styled-components';
import { Modal } from '../../../components/Modal/Modal'
import { ContentType } from '../../redux-flow/store/Common/types';
import { usePlayer } from '../../utils/services/player/player';

export const PreviewModal = (props: {toggle: (v: boolean) => void; contentId: string; isOpened: boolean; contentType: ContentType}) => {
    let playerRef = React.useRef<HTMLDivElement>(null)
    let player = usePlayer(playerRef, props.contentId)

    const [playerReady, setPlayerReady] = React.useState(false);
    let contentInfo = player && player.getContentInfo()
    let activeMedia = player && player.getActiveMedia()
    let { features } = contentInfo || {}
    let { width, height } = props.contentType === 'live' ? { width: 16, height: 9 } : (activeMedia || {})
    let playListPosition = features && features.playlist && features.playlist.position;
    let playlistWidthAdjustment = playListPosition === 'right' || playListPosition === 'left' ? 180 : 0
    let playlistHeightAdjustment = playListPosition === 'top' || playListPosition === 'bottom' ? 145 : 0
    let playerWidth = playerRef.current && playerRef.current.clientWidth
    let canCalculateHeight = width && height && player && playerWidth
    let playerHeight = canCalculateHeight && ((playerWidth - playlistWidthAdjustment) * height / width) + playlistHeightAdjustment
    let canSetHeight = playerReady && !!playerHeight

    setTimeout(() => {
        setPlayerReady(true)
    }, 250)

    React.useEffect(() => {
        setPlayerReady(!!width)
    })

    return (
        <Modal modalTitle='Preview' toggle={() => props.toggle(false)} opened={props.isOpened}>
            <PlayerContainer>
                <div
                    className="mt2"
                    ref={playerRef}
                    style={canSetHeight && { height: playerHeight + 'px', maxHeight: '66vh' } || {}}
                ></div>
            </PlayerContainer>
        </Modal>
    )
}

export const PlayerContainer = styled.div`
    width: 95%;
    height: 100%;
    max-height: 66vh;
    position: relative;
    margin: 16px auto;
`
