import React from 'react'
import { Modal } from '../../../components/Modal/Modal'
import { usePlayer } from '../../utils/services/player/player';
import { PlayerContainer } from '../General/ImageModal';

export const PreviewModal = (props: {toggle: (v: boolean) => void; contentId: string; isOpened: boolean}) => {
    let playerRef = React.useRef<HTMLDivElement>(null)
    let player = usePlayer(playerRef, props.contentId)

    const [playerReady, setPlayerReady] = React.useState(false);
    let contentInfo = player && player.getContentInfo()
    let { width, height } = contentInfo || {}
    let playerWidth = playerRef.current && playerRef.current.clientWidth
    let playerHeight = width && height && player && playerWidth && (playerWidth * height / width)
    let canSetHeight = playerReady && !!playerHeight

    setTimeout(() => {
        setPlayerReady(true)
    }, 0)

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
