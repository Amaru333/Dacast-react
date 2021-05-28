import React from 'react';
import { Text } from '../../../components/Typography/Text'
import { userToken } from '../../utils/services/token/tokenService';
import { Toggle } from '../../../components/Toggle/toggle'
import { ToggleTextInfo } from '../Security/SecurityStyle';
import { DateTimeValue, LiveDetails } from '../../redux-flow/store/Content/General/types';
import { DateTimePicker } from '../../../components/FormsComponents/Datepicker/DateTimePicker';
import { Modal } from '../../../components/Modal/Modal';
import { Button } from '../../../components/FormsComponents/Button/Button';


export const GeneralSettings = (props: {localContentDetails: LiveDetails, setLocalContentDetails: React.Dispatch<React.SetStateAction<LiveDetails>>, contentDetails: LiveDetails, setHasChanged: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const initTimestampValues = (ts: number, timezone: string): DateTimeValue => {
        timezone = timezone ? timezone : null;
        return { date: ts > 0 ? ts : Math.round(new Date().getTime() /1000), timezone: timezone }
    }

    const [liveStreamCountdownToggle, setLiveStreamCountdownToggle] = React.useState<boolean>((props.contentDetails.countdown.startTime && props.contentDetails.countdown.startTime !== 0) ? true : false)
    const [startDateTimeValue, setStartDateTimeValue] = React.useState<DateTimeValue>({...initTimestampValues(props.contentDetails.countdown.startTime, props.contentDetails.countdown.timezone) })
    const [liveStreamRecordingModalOpened, setLiveStreamRecordingModalOpened] = React.useState<boolean>(false)
    
    React.useEffect(() => {
        if (liveStreamCountdownToggle) {
            let countdownTs = liveStreamCountdownToggle ? startDateTimeValue.date : 0
            props.setLocalContentDetails({ ...props.localContentDetails, countdown: { ...props.localContentDetails.countdown, startTime: countdownTs, timezone: startDateTimeValue.timezone  } })
        } else {
            if(props.localContentDetails){
            props.setLocalContentDetails({ ...props.localContentDetails, countdown: { ...props.localContentDetails.countdown, startTime: 0, timezone: startDateTimeValue.timezone } })
            }
        }
    }, [liveStreamCountdownToggle, startDateTimeValue])

    const handleLiveRecordingButtonClick = () => {
        if(!props.localContentDetails.recording) {
            setLiveStreamRecordingModalOpened(true)
        }
        props.setLocalContentDetails({ ...props.localContentDetails, recording: !props.localContentDetails.recording })
        props.setHasChanged(true)
    }

    return (
        <div className="settings col col-12">
                    <Text className="col col-12 mb25" size={20} weight="med">Settings</Text>
                    <div className="col col-12">
                        {
                            userToken.getPrivilege('privilege-recording') &&
                            <div className="mb2">
                                <Toggle label="Live Stream Recording" defaultChecked={props.localContentDetails.recording} onChange={handleLiveRecordingButtonClick}></Toggle>
                                <ToggleTextInfo className="mt1">
                                    <Text size={14} weight='reg' color='gray-1'>8 continuous hours recording limit at a time. Live Stream recording turns off after 7 days and can be turned on again.</Text>
                                </ToggleTextInfo>
                            </div>
                        }

                        <div className="mb2 clearfix">
                            <Toggle
                                label="Live Stream Start Countdown"
                                onChange={() => { setLiveStreamCountdownToggle(!liveStreamCountdownToggle);props.setHasChanged(true) }}
                                defaultChecked={liveStreamCountdownToggle}
                            ></Toggle>
                            <ToggleTextInfo className="mt1">
                                <Text size={14} weight='reg' color='gray-1'>Note that a Paywall can stop this from being displayed.</Text>
                            </ToggleTextInfo>
                            {
                                liveStreamCountdownToggle &&
                                    <DateTimePicker 
                                        hideOption=""
                                        fullLineTz
                                        showTimezone={true}
                                        defaultTs={startDateTimeValue.date}
                                        timezone={startDateTimeValue.timezone}
                                        callback={(ts: number, timezone: string) => { setStartDateTimeValue({...startDateTimeValue, timezone: timezone, date: ts});props.setHasChanged(true)} } 
                                        id="countowdTimePicker"
                                    />
                            }
                        </div>
                        {/* MAYBE V2? 
                            {
                            getPrivilege('privilege-dvr') &&
                            <div className="mb2 clearfix">
                                <Toggle label="30 Minutes Rewind" checked={newLiveDetails.rewind} callback={() => { newLiveDetails.rewind ? setNewLiveDetails({ ...newLiveDetails, rewind: false }) : setConfirmRewindModal(true) }}></Toggle>
                                <ToggleTextInfo className="mt1">
                                    <Text size={14} weight='reg' color='gray-1'>Rewind, pause, and fast-forward to catch back up to the live broadcast for up to 30 minutes. For help setting up please visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a>.</Text>
                                </ToggleTextInfo>
                                {
                                    newLiveDetails.rewind &&
                                        <div className="col col-12 mb2">
                                            <Bubble type='warning' className='my2'>
                                                <BubbleContent>
                                                    <Text weight="reg" size={16}>
                                                        30 Minute Rewind will take 2 hours to take effect after enabling. Please ensure you have Purged your Live Stream before starting your encoder.
                                                    </Text>
                                                </BubbleContent>
                                            </Bubble>
                                            <Button sizeButton="xs" typeButton="secondary" onClick={() => { }}>Purge Live Stream</Button>
                                        </div>
                                }
                            </div>
                        } */}
                    </div>
                    <Modal size='small' allowNavigation={false} icon={{name: "error_outline", color: "blue-2"}} modalTitle='Live Stream Recording' toggle={() => setLiveStreamRecordingModalOpened(false)} opened={liveStreamRecordingModalOpened}>
                        <div className='flex flex-column'>
                            <Text>Live recording is a great feature. However, this action can sometimes be unreliable due to many factors beyond our control (e.g. your internet connexion), the industry best practices recommend to also setup local recording through your encoder.</Text>
                            <div className='mt2'>
                                <Button onClick={() => setLiveStreamRecordingModalOpened(false)} typeButton='primary' sizeButton='small' buttonColor='lightBlue'>Okay</Button>
                            </div>
                        </div>
                    </Modal>
                </div>
    )
}