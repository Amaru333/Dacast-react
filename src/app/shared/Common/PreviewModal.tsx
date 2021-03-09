import React from 'react'
import { Modal } from '../../../components/Modal/Modal'
import { ContentType } from '../../redux-flow/store/Common/types';
import { usePlayer } from '../../utils/services/player/player';
import { PlayerContainer } from '../General/ImageModal';

export const PreviewModal = (props: {toggle: (v: boolean) => void; contentId: string; isOpened: boolean; contentType: ContentType}) => {
    let playerRef = React.useRef<HTMLDivElement>(null)
    let player = usePlayer(playerRef, props.contentId)

    const [playerReady, setPlayerReady] = React.useState(false);
    let contentInfo = player && player.getContentInfo()
    let { width, height, features } = contentInfo || {}
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
