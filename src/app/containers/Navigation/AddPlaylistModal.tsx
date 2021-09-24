import React from 'react';
import { Modal, ModalContent, ModalFooter } from "../../../components/Modal/Modal"
import { Button } from '../../../components/FormsComponents/Button/Button';
import { IconStyle } from '../../../shared/Common/Icon';
import { Text } from '../../../components/Typography/Text';
import { showToastNotification } from '../../redux-flow/store/Toasts';
import { useHistory } from 'react-router';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { dacastSdk } from '../../utils/services/axios/axiosClient';
import { getKnowledgebaseLink } from '../../constants/KnowledgbaseLinks';
import { segmentService } from '../../utils/services/segment/segmentService';
import { store } from '../..'
import { Trans, useTranslation } from 'react-i18next';

export const AddPlaylistModal = (props: { toggle: () => void; opened: boolean }) => {

    let history = useHistory()

    const [playlistTitle, setPlaylistTitle] = React.useState<string>('')
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const { t } = useTranslation()

    const handleCreatePlaylist = async () => {
    
        setButtonLoading(true)
        
        return await dacastSdk.postPlaylist({title:playlistTitle})
        .then((response) => {
            setButtonLoading(false)
            props.toggle()
            segmentService.track('Playlist Created', {
                action: 'Create Playlist',
                'playlist_id': response.id,
                step: 1,
            })  
            store.dispatch(showToastNotification(`Playlist ${playlistTitle} created!`, 'fixed', 'success'))
            history.push(`/playlists/${response.id}/setup`)
        }).catch((error) => {
            setButtonLoading(false)
            store.dispatch(showToastNotification('Ooops, something went wrong...', 'fixed', 'error'))
        })
    }


    return (
        <Modal size="small" modalTitle={t('playlist_create_modal_title')} toggle={props.toggle} opened={props.opened} hasClose={false}>
            <ModalContent>
                <div className='col col-12 flex mb2 relative'> 
                    <Input id='playlistModalInput' className='col col-12' defaultValue={playlistTitle} onChange={(event) => {setPlaylistTitle(event.currentTarget.value)}} label={t('common_content_list_table_header_title')} />

                </div>
                <div className="flex mt2 col col-12">
                    <IconStyle style={{ marginRight: "10px" }}>info_outlined</IconStyle>
                    <Text size={14} weight="reg"><Trans i18nKey='playlist_create_modal_help_text'>Need help creating a Playlist? Visit the <a href={getKnowledgebaseLink("Playlist")} target="_blank" rel="noopener noreferrer">Knowledge Base</a></Trans></Text>
                </div>
            </ModalContent>
            <ModalFooter>
                <Button isLoading={buttonLoading} onClick={() => handleCreatePlaylist()} disabled={playlistTitle.length === 0} typeButton="primary" >{t('common_button_text_create')}</Button>
                <Button typeButton="tertiary" onClick={() => props.toggle()}>{t('common_button_text_cancel')}</Button>
            </ModalFooter>
        </Modal>
    )
}