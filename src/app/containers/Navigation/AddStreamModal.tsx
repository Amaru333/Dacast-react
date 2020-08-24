import React from 'react';
import { Modal, ModalContent, ModalFooter } from "../../../components/Modal/Modal"
import { Button } from '../../../components/FormsComponents/Button/Button';
import { StreamTypeSelector, StreamTypeSelectorContainer, StreamTypeSelectorContents } from './NavigationStyle';
import { UserAccountPrivileges, StreamSetupOptions } from './NavigationTypes';
import { Toggle } from '../../../components/Toggle/toggle';
import { IconStyle } from '../../../shared/Common/Icon';
import { Text } from '../../../components/Typography/Text';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { userToken } from '../../utils/token';
import { showToastNotification } from '../../redux-flow/store/Toasts';
import { useHistory } from 'react-router';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { logAmplitudeEvent } from '../../utils/amplitudeService';
import { isMobile } from 'react-device-detect';
import { axiosClient } from '../../utils/axiosClient';
import { getKnowledgebaseLink } from '../../constants/KnowledgbaseLinks';

const moment = require('moment-timezone')

export const AddStreamModal = (props: { toggle: () => void; opened: boolean }) => {

    let history = useHistory()

    const localeTimezone: string = moment.tz.guess()

    const handleLocaleCountry = (): string => {
        if(localeTimezone.toLowerCase().indexOf('asia') > -1 || localeTimezone.toLowerCase().indexOf('australia') > -1) {
            return 'Australia & Asia Pacific'
        } else if(localeTimezone.toLowerCase().indexOf('europe') > -1) {
            return 'Europe, Middle East & Africa'
        } 
        return 'Americas'
    }

    const defaultStreamSetup: StreamSetupOptions = {
        rewind: false, 
        title: '', 
        streamType: 'standard', 
        region: handleLocaleCountry()
    }

    const [selectedStreamType, setSelectedStreamType] = React.useState<string>('standard')
    const [streamSetupOptions, setStreamSetupOptions] = React.useState<StreamSetupOptions>(defaultStreamSetup)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        setStreamSetupOptions({ ...streamSetupOptions, streamType: selectedStreamType, rewind: selectedStreamType === 'standard' ? streamSetupOptions.rewind : false })
    }, [selectedStreamType])

    const handleCancel = () => {
        setStreamSetupOptions(defaultStreamSetup)
        setSelectedStreamType('standard')
        props.toggle()
    }

    const handleRegionParse =(region: string): string => {
        switch(region) {
            case 'Americas':
                return 'north-america'
            case 'Australia & Asia Pacific':
                return 'asia-pacific'
            case 'Europe, Middle East & Africa':
                return 'europe'
            default: 
                return ''
        }
    }

    const handleCreateLiveStreams = async () => {
        setButtonLoading(true)
        
        await axiosClient.post('/channels',
            {
                title: streamSetupOptions.title,
                online: true,
                streamType: streamSetupOptions.streamType,
                rewind: streamSetupOptions.rewind ? true : false,
                region: handleRegionParse(streamSetupOptions.region),
            }
        ).then((response) => {
            setButtonLoading(false)
            showToastNotification(`${streamSetupOptions.title} created!`, 'fixed', 'success')
            logAmplitudeEvent('create live stream');
            history.push(`/livestreams/${response.data.data.id}/general`)
            props.toggle()
            setStreamSetupOptions(defaultStreamSetup)
            setSelectedStreamType('standard')
        }).catch((error) => {
            setButtonLoading(false)
            showToastNotification('Ooops, something went wrong...', 'fixed', 'error')
        })
    }


    return (
        <Modal size="large" modalTitle="Create Live Stream" toggle={props.toggle} className={isMobile && 'x-visible'} opened={props.opened} hasClose={false}>
            <ModalContent>
                <StreamTypeSelectorContainer className="col col-12 mt25 ">

                    <div className='col col-12 flex mb2 relative'> 
                        <Input placeholder="My Live Stream" id='liveStreamModalInput' className='col col-6 pr1' value={streamSetupOptions.title} onChange={(event) => {setStreamSetupOptions({...streamSetupOptions, title: event.currentTarget.value})}} label='Title' />

                        <div className='col col-6 pl1 flex' >
                            <DropdownSingle 
                                dropdownTitle='Source Region' 
                                className='col col-12' 
                                id='channelRegionTypeDropdown' 
                                dropdownDefaultSelect={streamSetupOptions.region}
                                list={{'Australia & Asia Pacific': false, 'Europe, Middle East & Africa': false, 'Americas': false}} 
                                callback={(value: string) => setStreamSetupOptions({...streamSetupOptions, region: value})} 
                            />
                            <IconStyle className='absolute top-0 right-0' id="channelRegionTypeTooltip">info_outlined</IconStyle>
                            <Tooltip target={"channelRegionTypeTooltip"}>The region your stream will broadcast from. Select the one closest to your encoder for best performance.</Tooltip>
                        </div>

                    </div>

                    {userToken.getPrivilege('privilege-live') &&
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

                    {userToken.getPrivilege('privilege-unsecure-m3u8') &&
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

                    {userToken.getPrivilege('privilege-china') &&
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

                {/* {(getPrivilege('privilege-dvr') && selectedStreamType === 'standard') &&
                    <div className="flex col col-12 mt2 items-baseline">
                        <div className="col col-4">
                            <Toggle defaultChecked={streamSetupOptions.rewind ? true : false} checked={streamSetupOptions.rewind} onChange={() => { setStreamSetupOptions({ ...streamSetupOptions, rewind: !streamSetupOptions.rewind }) }} label="30 Minute Rewind" />
                        </div>
                        <IconStyle id="rewindTooltip">info_outlined</IconStyle>
                        <Tooltip target="rewindTooltip">30 Minute Rewind</Tooltip>
                    </div>} */}

                <div className="flex mt2 col col-12">
                    <IconStyle style={{ marginRight: "10px" }}>info_outlined</IconStyle>
                    <Text size={14} weight="reg">Need help creating a Live Stream? Visit the <a href={getKnowledgebaseLink('Live')} target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                </div>
            </ModalContent>
            <ModalFooter>
                <Button isLoading={buttonLoading} onClick={() => {handleCreateLiveStreams()}} disabled={selectedStreamType === null} typeButton="primary" >Create</Button>
                <Button typeButton="tertiary" onClick={() => handleCancel()}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}