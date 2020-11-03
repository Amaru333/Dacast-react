import React from 'react';
import { Modal, ModalContent, ModalFooter } from "../../../components/Modal/Modal"
import { Button } from '../../../components/FormsComponents/Button/Button';
import { StreamSetupOptions } from './NavigationTypes';
import { IconStyle } from '../../../shared/Common/Icon';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { showToastNotification } from '../../redux-flow/store/Toasts';
import { useHistory } from 'react-router';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { logAmplitudeEvent } from '../../utils/services/amplitude/amplitudeService';
import { isMobile } from 'react-device-detect';
import { axiosClient } from '../../utils/services/axios/axiosClient';
import { getKnowledgebaseLink } from '../../constants/KnowledgbaseLinks';
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { Bubble } from '../../../components/Bubble/Bubble';
import { ApplicationState } from '../../redux-flow/store';
import { BillingPageInfos } from '../../redux-flow/store/Account/Plan';
import { connect } from 'react-redux';

const moment = require('moment-timezone')

const AddStreamModal = (props: { toggle: () => void; opened: boolean; billingInfo: BillingPageInfos }) => {

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

    const [renditionCount, setRenditionCount] = React.useState<number>(1)

    const defaultStreamSetup: StreamSetupOptions = {
        rewind: false, 
        title: '', 
        region: handleLocaleCountry(),
        renditionCount: renditionCount
    }

    const [streamSetupOptions, setStreamSetupOptions] = React.useState<StreamSetupOptions>(defaultStreamSetup)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const regionDropdownList = [{title: "Australia & Asia Pacific"}, {title: "Europe, Middle East & Africa"}, {title: "Americas"}]
    const [errorMessage, setErrorMessage] = React.useState<string>(null)

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
            let errorMsg = 'There was a problem while creating a channel'
            console.log('error message: ', error.response.data.error)
            if(error.response.data.error.indexOf('only 1 channel is allowed for free trials') > -1) {
                errorMsg = 'Only 1 channel is allowed for free trials'
            }
            if(error.response.data.error.indexOf('there was a problem while creating a channel') > -1) {
                errorMsg = 'There was a problem while creating a channel'
            }
            setErrorMessage(errorMsg)
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
                        list={regionDropdownList} 
                        callback={(item: DropdownSingleListItem) => setStreamSetupOptions({...streamSetupOptions, region: item.title})} 
                    />
                    <IconStyle className='absolute top-0 right-0' id="channelRegionTypeTooltip">info_outlined</IconStyle>
                    <Tooltip leftPositionValueToZero target={"channelRegionTypeTooltip"}>
                        The region your stream will broadcast from. Select the one closest to your encoder for best performance.
                    </Tooltip>
                </div>
                {
                    !(props.billingInfo && props.billingInfo.currentPlan.displayName === '30 Day Trial') &&
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
                        <Tooltip leftPositionValueToZero target={"numberOfRenditionsDropdownTooltip"}>
                            For multi-bitrate streaming, select the number of renditions you will encode and stream to Dacast.
                        </Tooltip>
                    </div>
                }

                {/* {(getPrivilege('privilege-dvr') && selectedStreamType === 'standard') &&
                    <div className="flex col col-12 mt2 items-baseline">
                        <div className="col col-4">
                            <Toggle defaultChecked={streamSetupOptions.rewind ? true : false} checked={streamSetupOptions.rewind} onChange={() => { setStreamSetupOptions({ ...streamSetupOptions, rewind: !streamSetupOptions.rewind }) }} label="30 Minute Rewind" />
                        </div>
                        <IconStyle id="rewindTooltip">info_outlined</IconStyle>
                        <Tooltip target="rewindTooltip">30 Minute Rewind</Tooltip>
                    </div>} */}
                    <Bubble hidden={!errorMessage} type='error' className='my2'>
                        {errorMessage}
                    </Bubble>

            </ModalContent>
            <ModalFooter>
                <Button isLoading={buttonLoading} onClick={() => {handleCreateLiveStreams()}} typeButton="primary" >Create</Button>
                <Button typeButton="tertiary" onClick={() => handleCancel()}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        billingInfo: state.account.plan
    };
}

export default connect(mapStateToProps, null)(AddStreamModal);