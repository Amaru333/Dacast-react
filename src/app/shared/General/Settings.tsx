import React from 'react';
import { Text } from '../../../components/Typography/Text'
import { userToken } from '../../utils/services/token/tokenService';
import { Toggle } from '../../../components/Toggle/toggle'
import { ToggleTextInfo } from '../Security/SecurityStyle';
import { DateSinglePickerWrapper } from '../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import moment from 'moment';
import { ContentDetails, DateTimeValue } from '../../redux-flow/store/Content/General/types';
import { timezoneDropdownList } from '../../../utils/DropdownLists';

var momentTZ = require('moment-timezone')

//TODO Refactor this file entirely, tbh it's a mess and date are treat as string ...
export const GeneralSettings = (props: {localContentDetails: ContentDetails, setLocalContentDetails: React.Dispatch<React.SetStateAction<ContentDetails>>, contentDetails: ContentDetails, setHasChanged: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const initTimestampValues = (ts: number, timezone: string): { date: string; time: string } => {
        timezone = timezone ? timezone : Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (ts > 0) {
            return { date: momentTZ(ts * 1000).tz(timezone).format('YYYY-MM-DD'), time: momentTZ(ts * 1000).tz(timezone).format('HH:mm:ss') }
        }
        return { date: moment().toString(), time: '00:00' }
    }

    const [liveStreamCountdownToggle, setLiveStreamCountdownToggle] = React.useState<boolean>((props.contentDetails.countdown.startTime && props.contentDetails.countdown.startTime !== 0) ? true : false)
    const [startDateTimeValue, setStartDateTimeValue] = React.useState<DateTimeValue>({...initTimestampValues(props.contentDetails.countdown.startTime, props.contentDetails.countdown.timezone), timezone: props.contentDetails.countdown.timezone ? props.contentDetails.countdown.timezone : momentTZ.tz.guess()})

    React.useEffect(() => {
        if (liveStreamCountdownToggle) {
            let countdownTs = liveStreamCountdownToggle ? momentTZ.tz(`${startDateTimeValue.date} ${startDateTimeValue.time}`, `${startDateTimeValue.timezone}`).valueOf() : 0
            props.setLocalContentDetails({ ...props.localContentDetails, countdown: { ...props.localContentDetails.countdown, startTime: Math.floor(countdownTs / 1000) } })
        } else {
            if(props.localContentDetails){
            props.setLocalContentDetails({ ...props.localContentDetails, countdown: { ...props.localContentDetails.countdown, startTime: 0 } })
            }
        }
    }, [liveStreamCountdownToggle, startDateTimeValue])

    return (
        <div className="settings col col-12">
                    <Text className="col col-12 mb25" size={20} weight="med">Settings</Text>
                    <div className="col col-12">
                        {
                            userToken.getPrivilege('privilege-recording') &&
                            <div className="mb2">
                                <Toggle label="Live Stream Recording" defaultChecked={props.localContentDetails.recording} onChange={() => {props.setLocalContentDetails({ ...props.localContentDetails, recording: !props.localContentDetails.recording });props.setHasChanged(true)}}></Toggle>
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
                                    <div className="col col-12">
                                        <div className='col col-12 sm-col-4 pr1'>
                                            <DateSinglePickerWrapper
                                                id="startDate"
                                                datepickerTitle='Start Date'
                                                date={new Date(startDateTimeValue.date)}
                                                callback={(date: Date) => {setStartDateTimeValue({...startDateTimeValue, date: date.toLocaleDateString()}) ;props.setHasChanged(true)}}
                                            />
                                        </div>
                                        <Input
                                            type='time'
                                            className='col col-12 sm-col-4 pl1 pr1'
                                            defaultValue={startDateTimeValue.time}
                                            onChange={(event) =>{setStartDateTimeValue({...startDateTimeValue, time: event.currentTarget.value});props.setHasChanged(true)} }
                                            disabled={false}
                                            id='promptTime'
                                            label='Prompt Time'
                                            required
                                            pattern="[0-9]{2}:[0-9]{2}"
                                            step='1'
                                        />
                                        <DropdownSingle
                                            className="col col-12 sm-col-4 pl1 "
                                            hasSearch
                                            dropdownTitle='Timezone'
                                            dropdownDefaultSelect={startDateTimeValue.timezone}
                                            id='dropdownTimezone'
                                            callback={(value: DropdownSingleListItem) => {setStartDateTimeValue({...startDateTimeValue, timezone: value.title.split(' ')[0]});props.setHasChanged(true)}} 
                                            list={timezoneDropdownList}
                                        />
                                    </div>
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
                </div>
    )
}