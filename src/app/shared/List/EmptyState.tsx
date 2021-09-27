import React from 'react';
import { IconStyle } from '../../../shared/Common/Icon';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { AddExpoModal } from '../../containers/Navigation/AddExpoModal';
import { ContentType } from '../../redux-flow/store/Common/types';
import AddStreamModal from '../../containers/Navigation/AddStreamModal';
import { AddPlaylistModal } from '../../containers/Navigation/AddPlaylistModal';
import { useMedia } from '../../../utils/utils';
const ExpoImage = require('../../../../public/assets/Expo.svg');
const VodImage = require('../../../../public/assets/Videos.svg');
const LiveImage = require('../../../../public/assets/Livestream.svg');
const PlaylistImage = require('../../../../public/assets/Playlist.svg');
const ExpoMobileImage = require('../../../../public/assets/Expo_mobile.svg');
const VodMobileImage = require('../../../../public/assets/Videos_mobile.svg');
const LiveMobileImage = require('../../../../public/assets/Livestream_mobile.svg');
const PlaylistMobileImage = require('../../../../public/assets/Playlist_mobile.svg');



export const ContentEmptyState = (props: {contentType: ContentType; callToActionCallback?: () => void}) => {

    let smallScreen = useMedia('(max-width: 40em)')


    const renderInfo = () => {
        switch(props.contentType) {
            case 'vod':
                return {img: smallScreen ? VodMobileImage : VodImage, title: 'Upload your first Video!', text: <>Start uploading and managing your videos.</>}
            case 'expo':
                return {img: smallScreen ? ExpoMobileImage : ExpoImage, title: 'Create your first Expo!', text: <>The immersive video gallery allows you to organize videos and share a<br/> collection of videos with your audience.</>}
            case 'live':
                return {img: smallScreen ? LiveMobileImage : LiveImage, title: 'Create your first Live Stream!', text: <>Start streaming and connect with your audience live.</>}
            case 'playlist':
                return {img: smallScreen ? PlaylistMobileImage : PlaylistImage, title: 'Create your first Playlist!', text: <>Select from your uploaded videos. Share with your audience.</>}
            default:
                return null
        }
    }

    return (
        <>
            <div className='flex flex-column justify-center items-center center my3'>
                <img style={{marginLeft: (props.contentType === 'playlist' || props.contentType === 'live') && (smallScreen ? '1.5rem' : 92)}} className="mb4" src={renderInfo().img} />
                <Text className="mb2" size={24} weight='med' color="black">{renderInfo().title}</Text>
                <Text className="mb2" size={16} weight='reg' color="gray-3" >{renderInfo().text}</Text>
                <Button style={{width: 110}} className='px3' onClick={() => props.callToActionCallback && props.callToActionCallback()} typeButton="primary" sizeButton="large">{props.contentType === 'vod' ? 'Upload' : 'Create'}</Button>
            </div>
        </>
    )
}
