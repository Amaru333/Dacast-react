import React from 'react';
import { Modal, ModalContent, ModalFooter } from "../../../components/Modal/Modal"
import { Button } from '../../../components/FormsComponents/Button/Button';
import { StreamTypeSelector, StreamTypeSelectorContainer, StreamTypeSelectorContents } from './NavigationStyle';
import { UserAccountPrivileges, StreamSetupOptions } from './NavigationTypes';
import { Toggle } from '../../../components/Toggle/toggle';
import { IconStyle } from '../../../shared/Common/Icon';
import { Text } from '../../../components/Typography/Text';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { userToken } from '../../utils/services/token/tokenService';
import { showToastNotification } from '../../redux-flow/store/Toasts';
import { useHistory } from 'react-router';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { logAmplitudeEvent } from '../../utils/services/amplitude/amplitudeService';
import { isMobile } from 'react-device-detect';
import { axiosClient } from '../../utils/services/axios/axiosClient';
import { getKnowledgebaseLink } from '../../constants/KnowledgbaseLinks';
import { Bubble } from '../../../components/Bubble/Bubble';

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
        region: handleLocaleCountry()
    }

    const [streamSetupOptions, setStreamSetupOptions] = React.useState<StreamSetupOptions>(defaultStreamSetup)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [renditionCount, setRenditionCount] = React.useState<number>(1)


    const handleCancel = () => {
        setStreamSetupOptions(defaultStreamSetup)
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
                // rewind: streamSetupOptions.rewind ? true : false,
                region: handleRegionParse(streamSetupOptions.region),
                renditionCount: renditionCount
            }
        ).then((response) => {
            setButtonLoading(false)
            showToastNotification(`${streamSetupOptions.title} created!`, 'fixed', 'success')
            logAmplitudeEvent('create live stream');
            history.push(`/livestreams/${response.data.data.id}/general`)
            props.toggle()
            setStreamSetupOptions(defaultStreamSetup)
        }).catch((error) => {
            setButtonLoading(false)
            showToastNotification('Ooops, something went wrong...', 'fixed', 'error')
        })
    }


    return (
        <Modal size="small" modalTitle="Create Live Stream" toggle={props.toggle} className={isMobile && 'x-visible'} opened={props.opened} hasClose={false}>
            <ModalContent>
                <Bubble className="mt1" type="info">
                    Need help creating a Live Stream? Visit the <a href={getKnowledgebaseLink('Live')} target="_blank" rel="noopener noreferrer">Knowledge Base</a>
                </Bubble>
                <Input 
                    placeholder="My Live Stream" 
                    id='liveStreamModalInput' 
                    className='col col-12 mt1' 
                    value={streamSetupOptions.title} 
                    onChange={(event) => {setStreamSetupOptions({...streamSetupOptions, title: event.currentTarget.value})}} 
                    label='Title' 
                />
                <div className='col col-12 mt1 flex relative' >
                    <DropdownSingle 
                        dropdownTitle='Source Region' 
                        className='col col-12' 
                        id='channelRegionTypeDropdown' 
                        dropdownDefaultSelect={streamSetupOptions.region}
                        list={{'Australia & Asia Pacific': false, 'Europe, Middle East & Africa': false, 'Americas': false}} 
                        callback={(value: string) => setStreamSetupOptions({...streamSetupOptions, region: value})} 
                    />
                    <IconStyle className='absolute top-0 right-0' id="channelRegionTypeTooltip">info_outlined</IconStyle>
                    <Tooltip target={"channelRegionTypeTooltip"}>
                        The region your stream will broadcast from. Select the one closest to your encoder for best performance.
                    </Tooltip>
                </div>
                <div className='col col-12 mt1 flex relative' >
                    <DropdownSingle 
                        dropdownTitle='Number of Renditions' 
                        className='col col-12' 
                        id='numberOfRenditionsDropdown' 
                        dropdownDefaultSelect="1 Rendition"
                        list={{'1 Rendition': false, '2 Renditions': false, '3 Renditions': false, '4 Renditions': false, '5 Renditions': false}} 
                        callback={(value: string) => setRenditionCount(parseInt(value.charAt(0)))} 
                    />
                    <IconStyle className='absolute top-0 right-0' id="numberOfRenditionsDropdownTooltip">info_outlined</IconStyle>
                    <Tooltip target={"numberOfRenditionsDropdownTooltip"}>
                        For multi-bitrate streaming, select the number of renditions you will encode and stream to Dacast.
                    </Tooltip>
                </div>
                {/* {(getPrivilege('privilege-dvr') && selectedStreamType === 'standard') &&
                    <div className="flex col col-12 mt2 items-baseline">
                        <div className="col col-4">
                            <Toggle defaultChecked={streamSetupOptions.rewind ? true : false} checked={streamSetupOptions.rewind} onChange={() => { setStreamSetupOptions({ ...streamSetupOptions, rewind: !streamSetupOptions.rewind }) }} label="30 Minute Rewind" />
                        </div>
                        <IconStyle id="rewindTooltip">info_outlined</IconStyle>
                        <Tooltip target="rewindTooltip">30 Minute Rewind</Tooltip>
                    </div>} */}

            </ModalContent>
            <ModalFooter>
                <Button isLoading={buttonLoading} onClick={() => {handleCreateLiveStreams()}} typeButton="primary" >Create</Button>
                <Button typeButton="tertiary" onClick={() => handleCancel()}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}