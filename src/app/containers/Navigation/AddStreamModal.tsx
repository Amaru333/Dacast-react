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
import { isMobile } from 'react-device-detect';
import { axiosClient, dacastSdk } from '../../utils/services/axios/axiosClient';
import { getKnowledgebaseLink } from '../../constants/KnowledgbaseLinks';
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { Bubble } from '../../../components/Bubble/Bubble';
import { ApplicationState } from '../../redux-flow/store';
import { BillingPageInfos } from '../../redux-flow/store/Account/Plan';
import { connect } from 'react-redux';
import { segmentService } from '../../utils/services/segment/segmentService';
import { guessTimezone } from '../../../utils/services/date/dateService';
import { store } from '../..'
import { ChannelRegion } from '../../../DacastSdk/live';
import { Toggle } from '../../../components/Toggle/toggle';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { userToken } from '../../utils/services/token/tokenService';
import { Trans, useTranslation } from 'react-i18next';

const AddStreamModal = (props: { toggle: () => void; opened: boolean; billingInfo: BillingPageInfos }) => {

    let history = useHistory()

    const localeTimezone: string = guessTimezone()
    const { t } = useTranslation()

    const handleLocaleCountry = (): string => {
        if (localeTimezone.toLowerCase().indexOf('asia') > -1 || localeTimezone.toLowerCase().indexOf('australia') > -1) {
            return 'Australia & Asia Pacific'
        } else if (localeTimezone.toLowerCase().indexOf('europe') > -1) {
            return 'Europe, Middle East & Africa'
        }
        return 'Americas'
    }

    const [renditionCount, setRenditionCount] = React.useState<number>(1)

    const defaultStreamSetup: StreamSetupOptions = {
        rewind: false,
        title: '',
        region: handleLocaleCountry(),
        renditionCount: renditionCount,
        advancedStreaming: {
            enabled: false,
            china: false
        }
    }

    const [streamSetupOptions, setStreamSetupOptions] = React.useState<StreamSetupOptions>(defaultStreamSetup)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const regionDropdownList = [{title: t('live_stream_create_modal_region_dropdown_option_1'), data: {id: 'Australia & Asia Pacific'}}, {title: t('live_stream_create_modal_region_dropdown_option_2'), data: {id: "Europe, Middle East & Africa"}}, {title: t('live_stream_create_modal_region_dropdown_option_3'), data: {id: "Americas"}}]
    const numberOfRenditionsList = [{title: "1 Rendition", data: 1}, {title: "2 Renditions", data: 2}, {title: "3 Renditions", data: 3}, {title: "4 Renditions", data: 4}, {title: "5 Renditions", data: 5}]

    const [errorMessage, setErrorMessage] = React.useState<string>(null)

    const handleCancel = () => {
        setStreamSetupOptions(defaultStreamSetup)
        props.toggle()
    }

    const handleRegionParse = (region: string): ChannelRegion => {
        switch (region) {
            case 'Americas':
                return 'north-america'
            case 'Australia & Asia Pacific':
                return 'asia-pacific'
            case 'Europe, Middle East & Africa':
                return 'europe'
            default:
                return 'north-america'
        }
    }

    const handleCreateLiveStreams = async () => {
        setButtonLoading(true)

        await dacastSdk.postChannel(
            {
                title: streamSetupOptions.title,
                online: true,
                // rewind: streamSetupOptions.rewind ? true : false,
                region: handleRegionParse(streamSetupOptions.region),
                renditionCount: renditionCount,
                enabledAdvancedStreaming: streamSetupOptions.advancedStreaming.enabled,
                china: streamSetupOptions.advancedStreaming.china
            }
        )
        .then((response) => {
            setButtonLoading(false)
            store.dispatch(showToastNotification(`${streamSetupOptions.title} created!`, 'fixed', 'success'))
            props.toggle()
            setStreamSetupOptions(defaultStreamSetup)
            segmentService.track('Livestream Created', {
                action: 'Create Livestream',
                'channel_id': response.id,
                step: 1,
            })
            history.push(`/livestreams/${response.id}/general`)
        }).catch((error) => {
            setButtonLoading(false)
            let errorMsg = 'Sorry, the platform is really busy right now. Please try again in 10 minutes.'
            console.log('error message: ', error.response.data.error)
            if(error.response.data.error.indexOf('only 1 channel is allowed for free trials') > -1) {
                errorMsg = 'Only 1 channel is allowed for free trials. Please click here to'
            }
            if(error.response.data.error.indexOf('there was a problem while creating a channel') > -1) {
                errorMsg = 'Sorry, the platform is really busy right now. Please try again in 10 minutes.'
            }
            setErrorMessage(errorMsg)
        })
    }


    return (
        <Modal size="small" modalTitle={t('common_content_list_create_live_stream_button_text')} toggle={props.toggle} className={'x-visible'} opened={props.opened} hasClose={false}>
            <ModalContent>
                <Bubble className="mt1" type="info">
                    <Trans i18nKey='live_stream_create_modal_help_text'>
                    Need help creating a Live Stream? Visit the <a href={getKnowledgebaseLink('Live')} target="_blank" rel="noopener noreferrer">Knowledge Base</a>
                    </Trans>
                </Bubble>
                <Input
                    placeholder={t('live_stream_create_modal_title')}
                    id='liveStreamModalInput'
                    className='col col-12 mt1'
                    value={streamSetupOptions.title}
                    onChange={(event) => { setStreamSetupOptions({ ...streamSetupOptions, title: event.currentTarget.value }) }}
                    label={t('common_content_list_table_header_title')}
                />
                <div className='col col-12 mt1 flex relative' >
                    <DropdownSingle
                        dropdownTitle={t('live_stream_create_modal_region_dropdown_title')}
                        className='col col-12'
                        id='channelRegionTypeDropdown'
                        dropdownDefaultSelect={regionDropdownList.find(f => f.data.id === streamSetupOptions.region).title}
                        list={regionDropdownList}
                        callback={(item: DropdownSingleListItem) => setStreamSetupOptions({...streamSetupOptions, region: item.data.id})}
                    />
                    <IconStyle className='absolute top-0 right-0' id="channelRegionTypeTooltip">info_outlined</IconStyle>
                    <Tooltip leftPositionValueToZero target={"channelRegionTypeTooltip"}>
                        {t('live_stream_create_modal_region_dropdown_tooltip_text')}
                    </Tooltip>
                </div>
                {
                    !(props.billingInfo && props.billingInfo.currentPlan.displayName === '30 Day Trial') &&
                    <div className='col col-12 mt1 flex relative' >
                        <DropdownSingle
                            dropdownTitle={t('live_stream_create_modal_renditions_dropdown_title')}
                            className='col col-12'
                            id='numberOfRenditionsDropdown'
                            dropdownDefaultSelect="1 Rendition"
                            list={numberOfRenditionsList}
                            callback={(item: DropdownSingleListItem) => setRenditionCount(item.data)}
                        />
                        <IconStyle className='absolute top-0 right-0' id="numberOfRenditionsDropdownTooltip">info_outlined</IconStyle>
                        <Tooltip leftPositionValueToZero target={"numberOfRenditionsDropdownTooltip"}>
                            For multi-bitrate streaming, select the number of renditions you will encode and stream to Dacast.
                        </Tooltip>
                    </div>
                }

                {
                    userToken.getPrivilege('privilege-advanced-streaming') &&
                    <div className='col col-12 mt1 flex relative'>
                        <Toggle defaultChecked={streamSetupOptions.advancedStreaming.enabled} onChange={() => setStreamSetupOptions({...streamSetupOptions, advancedStreaming: {...streamSetupOptions.advancedStreaming, enabled: !streamSetupOptions.advancedStreaming.enabled}})} id='advancedStreamingToggle' label='Advanced Streaming' />
                        <IconStyle className='pl2' id="advancedStreamingTooltip">info_outlined</IconStyle>
                        <Tooltip leftPositionValueToZero target="advancedStreamingTooltip">
                            Tooltip for the advanced streaming
                        </Tooltip>
                        {
                            (userToken.getPrivilege('privilege-china') && streamSetupOptions.advancedStreaming.enabled) && 
                            <div className='col col-12 mt1 flex relative'>
                                <InputCheckbox id='chinaStreamingCheckbox' label='Stream to China' defaultChecked={streamSetupOptions.advancedStreaming.china} onChange={() => setStreamSetupOptions({...streamSetupOptions, advancedStreaming: {...streamSetupOptions.advancedStreaming, china: !streamSetupOptions.advancedStreaming.china}})}/>
                            </div>
                        }
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
                        {
                            errorMessage && errorMessage.indexOf('1 channel') !== -1 &&
                            <a href='/account/upgrade'>&nbsp;{t('common_button_upgrade_text')}</a>
                        }
                    </Bubble>

            </ModalContent>
            <ModalFooter>
                <Button isLoading={buttonLoading} onClick={() => { handleCreateLiveStreams() }} typeButton="primary" >{t('common_button_text_create')}</Button>
                <Button typeButton="tertiary" onClick={() => handleCancel()}>{t('common_button_text_cancel')}</Button>
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
