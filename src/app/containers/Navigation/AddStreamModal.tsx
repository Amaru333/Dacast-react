import React from 'react';
import { Modal, ModalContent, ModalFooter } from "../../../components/Modal/Modal"
import { Button } from '../../../components/FormsComponents/Button/Button';
import { StreamTypeSelector, StreamTypeSelectorContainer, StreamTypeSelectorContents } from './NavigationStyle';
import { UserAccountPrivileges, StreamSetupOptions } from './NavigationTypes';
import { Toggle } from '../../../components/Toggle/toggle';
import { IconStyle } from '../../../shared/Common/Icon';
import { Text } from '../../../components/Typography/Text';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { getPrivilege } from '../../../utils/utils';
import { addTokenToHeader, isTokenExpired } from '../../utils/token';
import axios from 'axios'
import { showToastNotification } from '../../redux-flow/store/Toasts';
import { useHistory } from 'react-router';

export const AddStreamModal = (props: { toggle: () => void; opened: boolean }) => {

    let history = useHistory()

    const [selectedStreamType, setSelectedStreamType] = React.useState<string>(null)
    const [streamSetupOptions, setStreamSetupOptions] = React.useState<StreamSetupOptions>({rewind: false, streamType: null})
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        setStreamSetupOptions({ ...streamSetupOptions, streamType: selectedStreamType })
    }, [selectedStreamType])

    const handleCancel = () => {
        setSelectedStreamType(null)
        props.toggle()
    }

    const handleCreateLiveStreams = async () => {
        setButtonLoading(true)
        await isTokenExpired()
        let {token} = addTokenToHeader();
        
        return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/channels',
            {
                title: "My Live Channel"
            }, 
            {
                headers: {
                    Authorization: token
                }
            }
        ).then((response) => {
            setButtonLoading(false)
            showToastNotification('Live channel created!', 'fixed', 'success')
            history.push(`/livestreams/${response.data.data.id}/general`)
            props.toggle()
        }).catch((error) => {
            setButtonLoading(false)
            showToastNotification('Ooops, something went wrong...', 'fixed', 'error')
        })
    }


    return (
        <Modal size="large" modalTitle="Create Live Stream" toggle={props.toggle} opened={props.opened} hasClose={false}>
            <ModalContent>
                <StreamTypeSelectorContainer className="col col-12 mt25 ">

                    {getPrivilege('privilege-live') &&
                        <div className="col-12 sm-col-4 col sm-pr1 xs-mb2">
                            <StreamTypeSelector onClick={() => setSelectedStreamType("standard")} selected={selectedStreamType === "standard"}>
                                <StreamTypeSelectorContents>
                                    <IconStyle className="mb2">videocam</IconStyle>
                                    <Text size={16} weight="med">Standard</Text>
                                    <Text className="mt2" size={14}>Web, Mobile &amp; TV</Text>
                                </StreamTypeSelectorContents>

                            </StreamTypeSelector>
                        </div>

                    }

                    {getPrivilege('privilege-unsecure-m3u8') &&
                        <div className="col-12 sm-col-4 col sm-pr1 sm-pl1 xs-mb2">
                            <StreamTypeSelector onClick={() => setSelectedStreamType("compatible")} selected={selectedStreamType === "compatible"}>
                                <StreamTypeSelectorContents>
                                    <IconStyle className="mb2">desktop_windows</IconStyle>
                                    <Text size={16} weight="med">Compatible</Text>
                                    <Text className="mt2" size={14}>Native Apps</Text>
                                </StreamTypeSelectorContents>
                            </StreamTypeSelector>
                        </div>
                    }

                    {getPrivilege('privilege-china') &&
                        <div className="col-12 sm-col-4 col sm-pl1">
                            <StreamTypeSelector onClick={() => setSelectedStreamType("premium")} selected={selectedStreamType === "premium"}>
                                <StreamTypeSelectorContents>
                                    <IconStyle className="mb2">public</IconStyle>
                                    <Text size={16} weight="med">Premium</Text>
                                    <Text className="mt2" size={14}>Standard + China</Text>
                                </StreamTypeSelectorContents>
                            </StreamTypeSelector>
                        </div>}

                </StreamTypeSelectorContainer>

                {getPrivilege('privilege-dvr') &&
                    <div className="flex col col-12 mt2 items-baseline">
                        <div className="col col-4">
                            <Toggle defaultChecked={streamSetupOptions.rewind ? true : false} onChange={() => { setStreamSetupOptions({ ...streamSetupOptions, rewind: !streamSetupOptions.rewind }) }} label="30 Minute Rewind" />
                        </div>
                        <IconStyle id="rewindTooltip">info_outlined</IconStyle>
                        <Tooltip target="rewindTooltip">30 Minute Rewind</Tooltip>
                    </div>}

                <div className="flex mt2 col col-12">
                    <IconStyle style={{ marginRight: "10px" }}>info_outlined</IconStyle>
                    <Text size={14} weight="reg">Need help creating a Live Stream? Visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                </div>
            </ModalContent>
            <ModalFooter>
                <Button isLoading={buttonLoading} onClick={() => {handleCreateLiveStreams()}} disabled={selectedStreamType === null} typeButton="primary" >Create</Button>
                <Button typeButton="tertiary" onClick={() => handleCancel()}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}