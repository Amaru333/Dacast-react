import React from 'react';
import { Modal, ModalContent, ModalFooter } from "../../../components/Modal/Modal"
import { Button } from '../../../components/FormsComponents/Button/Button';
import { StreamTypeSelector, StreamTypeSelectorContainer, StreamTypeSelectorContents } from './NavigationStyle';
import { UserAccountPrivileges, StreamSetupOptions } from './NavigationTypes';
import { Toggle } from '../../../components/Toggle/toggle';
import { IconStyle } from '../../../shared/Common/Icon';
import { Text } from '../../../components/Typography/Text';
import { Tooltip } from '../../../components/Tooltip/Tooltip';

export const AddStreamModal = (props: {toggle: () => void; opened: boolean; privileges: UserAccountPrivileges}) => {

    const [selectedStreamType, setSelectedStreamType] = React.useState<string>(null)
    const [streamSetupOptions, setStreamSetupOptions] = React.useState<StreamSetupOptions>(null)

    React.useEffect(() => {
        setStreamSetupOptions({...streamSetupOptions, streamType: selectedStreamType })
    }, [selectedStreamType])

    const handleCancel = () => {
        setSelectedStreamType(null)
        props.toggle()
    }


    return (
        <Modal size="large" modalTitle="Create Live Stream" toggle={props.toggle} opened={props.opened} hasClose={false}>
            <ModalContent>
                <StreamTypeSelectorContainer className="flex col col-12 mt25">

                    { props.privileges.standard ?
                        <StreamTypeSelector onClick={() => setSelectedStreamType("standard")} selected={selectedStreamType === "standard"}>
                            <StreamTypeSelectorContents>
                                <IconStyle className="mb2">videocam</IconStyle>
                                <Text size={16} weight="med">Standard</Text>
                                <Text className="mt2" size={14}>Web, Mobile &amp; TV</Text>
                            </StreamTypeSelectorContents>
                            
                        </StreamTypeSelector> : null
                    }

                    { props.privileges.compatible ?   
                        <StreamTypeSelector onClick={() => setSelectedStreamType("compatible")} selected={selectedStreamType === "compatible"}>
                            <StreamTypeSelectorContents>
                                <IconStyle className="mb2">desktop_windows</IconStyle>
                                <Text size={16} weight="med">Compatible</Text>
                                <Text className="mt2" size={14}>Native Apps</Text>
                            </StreamTypeSelectorContents>
                        </StreamTypeSelector> : null
                    }

                    { props.privileges.premium ? 
                        <StreamTypeSelector onClick={() => setSelectedStreamType("premium")} selected={selectedStreamType === "premium"}>
                            <StreamTypeSelectorContents>
                                <IconStyle className="mb2">public</IconStyle>
                                <Text size={16} weight="med">Premium</Text>
                                <Text className="mt2" size={14}>Standard + China</Text>
                            </StreamTypeSelectorContents>
                        </StreamTypeSelector> : null}

                </StreamTypeSelectorContainer>

                {  props.privileges.rewind ?  
                    <div className="flex col col-12 mt2 items-baseline">
                        <div className="col col-4">
                            <Toggle onChange={() => {setStreamSetupOptions({...streamSetupOptions, rewind: !streamSetupOptions.rewind})}} label="30 Minute Rewind" />
                        </div>
                        <IconStyle id="rewindTooltip">info_outlined</IconStyle>
                        <Tooltip target="rewindTooltip">30 Minute Rewind</Tooltip>
                    </div> : null}
                
                <div className="flex mt2 col col-12">
                    <IconStyle style={{marginRight: "10px"}}>info_outlined</IconStyle>
                    <Text  size={14} weight="reg">Need help creating a Live Stream? Visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                </div>
            </ModalContent>
            <ModalFooter>
                <Button onClick={() => {location.href="/livestreams"}} disabled={selectedStreamType === null} typeButton="primary" >Create</Button>
                <Button typeButton="tertiary" onClick={() => handleCancel()}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}