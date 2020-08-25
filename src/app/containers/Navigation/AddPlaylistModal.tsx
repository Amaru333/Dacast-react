import React from 'react';
import { Modal, ModalContent, ModalFooter } from "../../../components/Modal/Modal"
import { Button } from '../../../components/FormsComponents/Button/Button';
import { IconStyle } from '../../../shared/Common/Icon';
import { Text } from '../../../components/Typography/Text';
import { showToastNotification } from '../../redux-flow/store/Toasts';
import { useHistory } from 'react-router';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { axiosClient } from '../../utils/axiosClient';
import { getKnowledgebaseLink } from '../../constants/KnowledgbaseLinks';

export const AddPlaylistModal = (props: { toggle: () => void; opened: boolean }) => {

    let history = useHistory()

    const [playlistTitle, setPlaylistTitle] = React.useState<string>('')
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleCreatePlaylist = async () => {
    
        setButtonLoading(true)
        
        return await axiosClient.post('/playlists',
            {
                title:playlistTitle
            }
        ).then((response) => {
            setButtonLoading(false)
            showToastNotification(`Playlist ${playlistTitle} created!`, 'fixed', 'success')
            props.toggle()
            history.push(`/playlists/${response.data.data.id}/general`)
        }).catch((error) => {
            setButtonLoading(false)
            showToastNotification('Ooops, something went wrong...', 'fixed', 'error')
        })
    }


    return (
        <Modal size="small" modalTitle="Create Playlist" toggle={props.toggle} opened={props.opened} hasClose={false}>
            <ModalContent>
                <div className='col col-12 flex mb2 relative'> 
                    <Input id='liveStreamModalInput' className='col col-12' defaultValue={playlistTitle} onChange={(event) => {setPlaylistTitle(event.currentTarget.value)}} label='Title' />

                </div>
                <div className="flex mt2 col col-12">
                    <IconStyle style={{ marginRight: "10px" }}>info_outlined</IconStyle>
                    <Text size={14} weight="reg">Need help creating a Playlist? Visit the <a href={getKnowledgebaseLink("Playlist")} target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                </div>
            </ModalContent>
            <ModalFooter>
                <Button isLoading={buttonLoading} onClick={() => handleCreatePlaylist()} disabled={playlistTitle.length === 0} typeButton="primary" >Create</Button>
                <Button typeButton="tertiary" onClick={() => props.toggle()}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}