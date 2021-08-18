import React from 'react';
import { IconStyle } from '../../../shared/Common/Icon';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { AddExpoModal } from '../../containers/Navigation/AddExpoModal';
import { ContentType } from '../../redux-flow/store/Common/types';
import AddStreamModal from '../../containers/Navigation/AddStreamModal';
import { AddPlaylistModal } from '../../containers/Navigation/AddPlaylistModal';
const ExpoImage = require('../../../../public/assets/Expo.svg');
const VodImage = require('../../../../public/assets/Videos.svg');
const LiveImage = require('../../../../public/assets/Livestream.svg');
const PlaylistImage = require('../../../../public/assets/Playlist.svg');



export const ContentEmptyState = (props: {contentType: ContentType}) => {

    const [createModalOpen, setCreateModalOpen] = React.useState<boolean>(false)

    const renderInfo = () => {
        switch(props.contentType) {
            case 'vod':
                return {img: VodImage, title: 'Upload your first Video', text: 'Start uploading and managing your videos.'}
            case 'expo':
                return {img: ExpoImage, title: 'Create your first Expo', text: 'The immersive video gallery allows you to organize videos and share a collection of videos with your audience.', modal: <AddExpoModal opened={createModalOpen} toggle={setCreateModalOpen} />}
            case 'live':
                return {img: LiveImage, title: 'Create your first Live Stream', text: 'Start streaming and connect with your audience live.', modal: <AddStreamModal opened={createModalOpen} toggle={() => setCreateModalOpen(!createModalOpen)} />}
            case 'playlist':
                return {img: PlaylistImage, title: 'Create your first Playlist', text: 'Select from your uploaded videos. Share with your audience.', modal: <AddPlaylistModal opened={createModalOpen} toggle={() => setCreateModalOpen(!createModalOpen)} />}
            default:
                return null
        }
    }

    const handleActionButtonClick = () => {
        if(props.contentType === 'vod') {
            location.href = '/uploader'
            return
        }

        setCreateModalOpen(true)
    }

    return (
        <>
            <div className='flex flex-column justify-center items-center center'>
                <img className="mb2" src={renderInfo().img} />
                <Text className="mb2" size={40} weight='med' color="black">{renderInfo().title}</Text>
                <Text className="mb2" size={14} weight='reg' color="black" >{renderInfo().text}</Text>
                <Button onClick={() => handleActionButtonClick()} typeButton="primary" sizeButton="small">{props.contentType === 'vod' ? 'Upload' : 'Create'}</Button>
            </div> 
            { createModalOpen && renderInfo().modal }
        </>
    )
}