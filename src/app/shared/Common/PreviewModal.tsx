import React from 'react'
import { Modal } from '../../../components/Modal/Modal'
import { usePlayer } from '../../utils/player';
import { PlayerContainer } from '../General/ImageModal';

export const PreviewModal = (props:{toggle: (v: boolean) => void; contentId: string; isOpened: boolean}) => {
    let playerRef = React.useRef<HTMLDivElement>(null)
    let player = usePlayer(playerRef, props.contentId)

    return (
        <Modal modalTitle='Preview' toggle={() => props.toggle(false)} opened={props.isOpened}>
            <PlayerContainer>
            <div className="mt2" ref={playerRef}></div>
            </PlayerContainer>
        </Modal>
    )
}