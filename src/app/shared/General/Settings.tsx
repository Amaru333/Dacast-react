import React from 'react';
import { Text } from '../../../components/Typography/Text'
import { userToken } from '../../utils/services/token/tokenService';
import { Toggle } from '../../../components/Toggle/toggle'
import { ToggleTextInfo } from '../Security/SecurityStyle';
import { DateSinglePickerWrapper } from '../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import moment from 'moment';
import { ContentDetails, DateTimeValue } from '../../redux-flow/store/Content/General/types';

var momentTZ = require('moment-timezone')

export const GeneralSettings = (props: {localContentDetails: ContentDetails, setLocalContentDetails: React.Dispatch<React.SetStateAction<ContentDetails>>, setHasChanged: React.Dispatch<React.SetStateAction<boolean>>, liveStreamCountdownToggle: boolean, setLiveStreamCountdownToggle: React.Dispatch<React.SetStateAction<boolean>>, startDateTimeValue: DateTimeValue, setStartDateTimeValue: React.Dispatch<React.SetStateAction<DateTimeValue>>}) => {
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
                                onChange={() => { props.setLiveStreamCountdownToggle(!props.liveStreamCountdownToggle);props.setHasChanged(true) }}
                                defaultChecked={props.liveStreamCountdownToggle}
                            ></Toggle>
                            <ToggleTextInfo className="mt1">
                                <Text size={14} weight='reg' color='gray-1'>Note that a Paywall can stop this from being displayed.</Text>
                            </ToggleTextInfo>

                            {
                                props.liveStreamCountdownToggle &&
                                    <div className="col col-12">
                                        <div className='col col-12 sm-col-4 pr1'>
                                            <DateSinglePickerWrapper
                                                id="startDate"
                                                datepickerTitle='Start Date'
                                                date={moment(props.startDateTimeValue.date)}
                                                callback={(date: string) => {props.setStartDateTimeValue({...props.startDateTimeValue, date: date}) ;props.setHasChanged(true)}}
                                            />
                                        </div>
                                        <Input
                                            type='time'
                                            className='col col-12 sm-col-4 pl1 pr1'
                                            defaultValue={props.startDateTimeValue.time}
                                            onChange={(event) =>{props.setStartDateTimeValue({...props.startDateTimeValue, time: event.currentTarget.value});props.setHasChanged(true)} }
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
                                            dropdownDefaultSelect={props.startDateTimeValue.timezone}
                                            id='dropdownTimezone'
                                            callback={(value: string) => {props.setStartDateTimeValue({...props.startDateTimeValue, timezone: value.split(' ')[0]});props.setHasChanged(true)}} 
                                            list={momentTZ.tz.names().reduce((reduced: DropdownListType, item: string) => { return { ...reduced, [item + ' (' + momentTZ.tz(item).format('Z z') + ')']: false } }, {})}
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