import React from 'react';
import { Bubble } from '../../../components/Bubble/Bubble';
import { TextStyle, ToggleTextInfo, BorderStyle, DisabledSection, Header, BubbleContent } from './SecurityStyle';
import { Text } from '../../../components/Typography/Text';
import { Toggle } from '../../../components/Toggle/toggle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DateSinglePickerWrapper } from '../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { GeoRestriction, DomainControl, ContentSecuritySettings, SecuritySettings } from '../../redux-flow/store/Settings/Security';
import { Modal, ModalContent, ModalFooter } from '../../../components/Modal/Modal';
import { Card } from '../../../components/Card/Card';
import { IconStyle } from '../../../shared/Common/Icon';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Prompt } from 'react-router';
import moment from 'moment'
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';

var momentTZ = require('moment-timezone')

interface ContentSecurityComponentProps {
    contentType: string
    contentSecuritySettings: ContentSecuritySettings;
    globalSecuritySettings: SecuritySettings;
    contentId: string;
    getSettingsSecurityOptions: (contentId: string) => Promise<void>;
    saveContentSecuritySettings: (data: SecuritySettings, contentId: string, contentType: string) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

export const ContentSecurityPage = (props: ContentSecurityComponentProps) => {

    //Initial state depending on custom settings for the content
    const initvalues = () => {
        let defaultValues: {
            editableSettings: boolean;
            selectedSettings: SecuritySettings;
            passwordProtectionToggle: boolean;
            startDateTime: 'Always' | 'Set Date and Time';
            endDateTime: 'Forever' | 'Set Date and Time';
        } = {editableSettings: false, selectedSettings: null, passwordProtectionToggle: false, startDateTime: "Always", endDateTime: "Forever"}
        if(props.contentSecuritySettings.securitySettings && props.globalSecuritySettings) {
            defaultValues.editableSettings = JSON.stringify(props.globalSecuritySettings) === JSON.stringify(props.contentSecuritySettings.securitySettings) ? false : true
            defaultValues.selectedSettings = props.contentSecuritySettings.securitySettings
            defaultValues.passwordProtectionToggle = props.contentSecuritySettings.securitySettings.passwordProtection.password ? true : false
            defaultValues.startDateTime = props.contentSecuritySettings.securitySettings.contentScheduling.startTime === 0 ? 'Always' : 'Set Date and Time'
            defaultValues.endDateTime = props.contentSecuritySettings.securitySettings.contentScheduling.endTime === 0 ? 'Forever' : 'Set Date and Time'
        }
        return defaultValues
    }

    const initTimestampValues = (ts: number, timezone: string): {date: string; time: string} => {
        if(ts > 0 ) {
            return {date: momentTZ(ts).tz(timezone).format('YYYY-MM-DD'), time: momentTZ(ts).tz(timezone).format('HH:mm:ss')}
        } 
        return {date: moment().toString(), time: '00:00'}
    }

    
    const [togglePasswordProtectedVideo, setTogglePasswordProtectedVideo] = React.useState<boolean>(initvalues().passwordProtectionToggle)
    const [hasToggleChanged, setHasToggleChanged] = React.useState<boolean>(false)
    const [startDateTime, setStartDateTime] = React.useState<'Always' | 'Set Date and Time'>(initvalues().startDateTime)
    const [endDateTime, setEndDateTime] = React.useState<'Forever' | 'Set Date and Time'>(initvalues().endDateTime)
    const [settingsEditable, setSettingsEditable] = React.useState<boolean>(initvalues().editableSettings)
    const [selectedSettings, setSelectedSettings] = React.useState<SecuritySettings>(initvalues().selectedSettings)
    const [editSettingsModalOpen, setEditSettingsModalOpen] = React.useState<boolean>(false)
    const [revertSettingsModalOpen, setRevertSettingsModalOpen] = React.useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [startDateTimeValue, setStartDateTimeValue] = React.useState<{date: string; time: string; timezone: string;}>({...initTimestampValues(props.contentSecuritySettings.securitySettings.contentScheduling.startTime, props.contentSecuritySettings.securitySettings.contentScheduling.startTimezone), timezone: props.contentSecuritySettings.securitySettings.contentScheduling.startTimezone ? props.contentSecuritySettings.securitySettings.contentScheduling.startTimezone : momentTZ.tz.guess()})
    const [endDateTimeValue, setEndDateTimeValue] = React.useState<{date: string; time: string; timezone: string;}>({...initTimestampValues(props.contentSecuritySettings.securitySettings.contentScheduling.endTime, props.contentSecuritySettings.securitySettings.contentScheduling.endTimezone), timezone: props.contentSecuritySettings.securitySettings.contentScheduling.endTimezone ? props.contentSecuritySettings.securitySettings.contentScheduling.endTimezone : momentTZ.tz.guess()})

    const handleReset = () => {
        setSelectedSettings(props.contentSecuritySettings.securitySettings)
        setTogglePasswordProtectedVideo(props.contentSecuritySettings.securitySettings.passwordProtection.password ? true : false)
        setHasToggleChanged(false)
    }

    React.useEffect(() => {
        setSelectedSettings(props.contentSecuritySettings.securitySettings)
        setHasToggleChanged(false)
    }, [props.contentSecuritySettings.securitySettings])

    const handlePasswordValue = () => {
        if(!settingsEditable) {
            return props.globalSecuritySettings.passwordProtection.password ? props.globalSecuritySettings.passwordProtection.password : null
        } else {
            return props.contentSecuritySettings.securitySettings.passwordProtection.password ? props.contentSecuritySettings.securitySettings.passwordProtection.password : null

        }
    }

    const handlePasswordProtectedVideoChange = () => {
        setHasToggleChanged(true)
        if(togglePasswordProtectedVideo) {
            setSelectedSettings({...selectedSettings, passwordProtection: {password: null}})
        }
        setTogglePasswordProtectedVideo(!togglePasswordProtectedVideo)

    }

    

    const handleSave = () => {
        setButtonLoading(true)
        let startTimeTs = (startDateTime === 'Set Date and Time') ?  momentTZ.tz(`${startDateTimeValue.date} ${startDateTimeValue.time}`, `${startDateTimeValue.timezone}`).valueOf() : 0
        let endTimeTs =  (endDateTime === 'Set Date and Time') ? momentTZ.tz(`${endDateTimeValue.date} ${endDateTimeValue.time}`, `${endDateTimeValue.timezone}`).valueOf() : 0
        props.saveContentSecuritySettings(
            {
                passwordProtection: selectedSettings.passwordProtection,
                contentScheduling: {
                    startTime: startTimeTs, 
                    startTimezone: startDateTime === 'Set Date and Time' ? startDateTimeValue.timezone : null,
                    endTime: endTimeTs,
                    endTimezone: endDateTime === 'Set Date and Time' ? endDateTimeValue.timezone : null
                }, 
                selectedGeoRestriction: selectedSettings.selectedGeoRestriction, 
                selectedDomainControl: selectedSettings.selectedDomainControl
            }, 
            props.contentId, props.contentType
            ).then(() => {
                setButtonLoading(false)
                setHasToggleChanged(false)
            })
    }

    const handleRevert = () => {
        props.saveContentSecuritySettings(
            {
                passwordProtection: {
                    password: null
                }, 
                contentScheduling: {
                    startTime: 0, 
                    startTimezone: null,
                    endTime: 0,
                    endTimezone: null
                }, 
                selectedDomainControl: null, 
                selectedGeoRestriction: null
            }, 
            props.contentId, props.contentType).then(() => {
                setSettingsEditable(!settingsEditable)
                setSelectedSettings(props.globalSecuritySettings)
                setRevertSettingsModalOpen(false)
                setHasToggleChanged(false)
            })
    }

    return (
        <div >
            {  !settingsEditable ? 
        
                <Bubble type='info' className='my2'>
                    <BubbleContent>         
                        These settings are inherited from your global <a href="/settings/security">&nbsp;Security Settings&nbsp;</a> — click the&nbsp;<IconStyle>lock</IconStyle>&nbsp;Padlock to override these settings.
                    </BubbleContent>         
                </Bubble>
                :
                <Bubble type='info' className='my2'>
                    <BubbleContent>         
                        These settings are different from your global <a href="/settings/security">&nbsp;Security Settings&nbsp;</a> — click the&nbsp;<IconStyle>lock_open</IconStyle>&nbsp;Padlock to revert to global settings.
                    </BubbleContent>     
                </Bubble> 
            }
            <Card>
                <Header className="pb25">
                    <TextStyle>
                        <Text size={20} weight='med' color='gray-1'>Security</Text>
                    </TextStyle>
                    <IconStyle className='pointer' id="unlockSecurityTooltip" onClick={settingsEditable? () => setRevertSettingsModalOpen(true) : () => setEditSettingsModalOpen(true)}>
                        { settingsEditable ? 
                            "lock_open"
                            : "lock"
                        }
                    </IconStyle>
                    <Tooltip target="unlockSecurityTooltip">{settingsEditable ? "Click to revert Security Settings" : "Click to edit Security Settings"}</Tooltip>
                </Header>
        
                <DisabledSection settingsEditable={settingsEditable}>
                
                    <div className='col col-12 mb2'>
                        <Toggle 
                            id="passwordProtectedVideosToggle" 
                            label='Password Protection' 
                            onChange={() => {handlePasswordProtectedVideoChange()}} defaultChecked={togglePasswordProtectedVideo}
                        />
                        <ToggleTextInfo>
                            <Text size={14} weight='reg' color='gray-1'>Viewers must enter a password before viewing the content.</Text>
                        </ToggleTextInfo>
                        { togglePasswordProtectedVideo && 
                            <div className='col col-12'>
                                <Input 
                                    type='text'
                                    defaultValue={handlePasswordValue()}  
                                    className='col col-12 md-col-4 mb2'
                                    disabled={false} 
                                    id='password' 
                                    label='Password' 
                                    placeholder='Password'
                                    onChange={(event) => setSelectedSettings({...selectedSettings, passwordProtection: {password: event.currentTarget.value }})}
                                    required
                                />
                            </div>}
                    </div> 

                    <div className='col col-12 clearfix'>
                        <Text className="col col-12" size={16} weight="med">Content Scheduling</Text>
                        <ToggleTextInfo><Text size={14} weight='reg' color='gray-1'>The content will only be available between the times/dates you provide.</Text></ToggleTextInfo>
                         
                        
                        <div className='col col-12 mb2 clearfix sm-flex'>
                            <DropdownSingle 
                                className='col col-12 md-col-3 clearfix sm-mr1'
                                id="availableStart" 
                                dropdownTitle="Available" 
                                list={{'Always': false, "Set Date and Time": false}} 
                                dropdownDefaultSelect={startDateTime} 
                                callback={(selectedItem: 'Always' | 'Set Date and Time') => {setHasToggleChanged(true);setStartDateTime(selectedItem)}} 
                            />
                            {
                                startDateTime === "Set Date and Time" &&
                                <>        
                                    <div className='col col-6 pr1 xs-mt2 sm-mt-auto md-col-3'>
                                        <DateSinglePickerWrapper 
                                            date={moment(startDateTimeValue.date)}
                                            className='mt2'
                                            id="startDate"
                                            callback={(startDateValue: string) =>{ setHasToggleChanged(true);setStartDateTimeValue({...startDateTimeValue, date: startDateValue})}}
                                        />
                                    </div>

                                    <Input 
                                        type='time'
                                        defaultValue={startDateTimeValue.time} 
                                        className='col col-6 pl1 sm-mt-auto xs-mt2 md-col-2'
                                        disabled={false} 
                                        id='startTime' 
                                        pattern="[0-9]{2}:[0-9]{2}"
                                        onChange={(event) =>{ setHasToggleChanged(true);setStartDateTimeValue({...startDateTimeValue, time: event.currentTarget.value})} }
                                        required
                                    /> 
                                    <DropdownSingle 
                                        hasSearch 
                                        id='startDateTimezoneDropdown' 
                                        dropdownDefaultSelect={startDateTimeValue.timezone} 
                                        className='col col-3 px2' 
                                        dropdownTitle='Timezone' 
                                        callback={(value: string) => {setHasToggleChanged(true);setStartDateTimeValue({...startDateTimeValue, timezone: value.split(' ')[0]})}} 
                                        list={momentTZ.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + momentTZ.tz(item).format('Z z') + ')']: false}}, {})} 
                                    />

                                </>
                            }                
                        </div>

                    <div className='col col-12 mb2 clearfix sm-flex'>
                        <DropdownSingle 
                            className='col col-12 md-col-3 clearfix sm-mr1' 
                            id="availableEnd" 
                            dropdownTitle="Until" 
                            list={{'Forever': false, "Set Date and Time": false}} 
                            dropdownDefaultSelect={endDateTime} callback={(selectedItem: 'Forever' | 'Set Date and Time') => {setHasToggleChanged(true);setEndDateTime(selectedItem)}}
                        />

                        {
                        
                            endDateTime === "Set Date and Time" &&
                                <>
                                    <div className='col col-6 pr1 xs-mt2 sm-mt-auto md-col-3' >
                                        <DateSinglePickerWrapper
                                            date={moment(endDateTimeValue.date)}
                                            className='mt2' 
                                            id="endDate"
                                            minDate={moment(startDateTimeValue.date)}
                                            callback={(endDateValue: string) => {setHasToggleChanged(true);setEndDateTimeValue({...endDateTimeValue, date: endDateValue})}}
                                        />
                                    </div>
                                    <Input 
                                        type='time' 
                                        defaultValue={endDateTimeValue.time}
                                        className='col col-6 pl1 sm-mt-auto xs-mt2 md-col-2'
                                        disabled={false} 
                                        id='endTime' 
                                        pattern="[0-9]{2}:[0-9]{2}"
                                        onChange={(event) => {setHasToggleChanged(true);setEndDateTimeValue({...endDateTimeValue, time: event.currentTarget.value})}}
                                        required
                                    /> 

                                    <DropdownSingle 
                                        hasSearch 
                                        id='endDateTimezoneDropdown' 
                                        dropdownDefaultSelect={endDateTimeValue.timezone} 
                                        className='col col-3 px2' 
                                        dropdownTitle='Timezone' 
                                        callback={(value: string) => {setHasToggleChanged(true);setEndDateTimeValue({...endDateTimeValue, timezone: value.split(' ')[0]})}} 
                                        list={momentTZ.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + momentTZ.tz(item).format('Z z') + ')']: false}}, {})} 
                                    />
                                </>
                        }
                    </div>
                     
                    
                              
                    </div>

                    <BorderStyle className="p1" />

                    <div className="col col-12">
                        <TextStyle className="pt25" >
                            <Text size={20} weight='med' color='gray-1'>Geo-Restriction</Text>
                        </TextStyle>

                        <TextStyle className="pt2" >
                            <Text size={14} weight='reg' color='gray-1'>Restrict access to specific locations worldwide. Manage your Geo-Restriction Groups in your <a href="/settings/security">Security Settings</a>.</Text>
                        </TextStyle>

                        <DropdownSingle 
                            className='col col-12 md-col-3 my2 mr1' 
                            id="availableEnd" 
                            dropdownTitle="Select Geo-Restriction Group" 
                            list={props.globalSecuritySettings.geoRestriction.reduce((reduced: DropdownListType, item: GeoRestriction)=> {return {...reduced, [item.name]: false}},{})} 
                            dropdownDefaultSelect={props.globalSecuritySettings.geoRestriction.filter(f => f.id === selectedSettings.selectedGeoRestriction).length > 0 ? props.globalSecuritySettings.geoRestriction.filter(f => f.id === selectedSettings.selectedGeoRestriction)[0].name : props.globalSecuritySettings.geoRestriction.filter(f => f.isDefault)[0].name} 
                            callback={(selectedItem: string) => {setHasToggleChanged(true);setSelectedSettings({...selectedSettings, selectedGeoRestriction: props.contentSecuritySettings.securitySettings.geoRestriction.filter(f => f.name === selectedItem)[0].id})}} 
                        />
                    </div>

                    <BorderStyle className="p1" />
                
                    <div>
                        <TextStyle className="pt25" >
                            <Text size={20} weight='med' color='gray-1'>Domain Control</Text>
                        </TextStyle>

                        <TextStyle className="pt2" >
                            <Text size={14} weight='reg' color='gray-1'>Restrict access to specific domain names on the internet. Manage your Domain Control Groups in your <a href="/settings/security">Security Settings</a>.</Text>
                        </TextStyle>
                        <div className="col col-12 py2">
                            <DropdownSingle 
                                className="col col-12 md-col-3" 
                                id="availableEnd" 
                                dropdownTitle="Select Domain Control Group" 
                                list={props.globalSecuritySettings.domainControl.reduce((reduced: DropdownListType, item: DomainControl)=> {return {...reduced, [item.name]: false}},{})} 
                                dropdownDefaultSelect={props.globalSecuritySettings.domainControl.filter(f => f.id === selectedSettings.selectedDomainControl).length > 0 ? props.globalSecuritySettings.domainControl.filter(f => f.id === selectedSettings.selectedDomainControl)[0].name : props.globalSecuritySettings.domainControl.filter(f => f.isDefault)[0].name} 
                                callback={(selectedItem: string) => {setHasToggleChanged(true);setSelectedSettings({...selectedSettings, selectedDomainControl: props.contentSecuritySettings.securitySettings.domainControl.filter(f => f.name === selectedItem)[0].id})}} 
                            />
                        </div>
                    </div>
                </DisabledSection>
            </Card>
          
            { (JSON.stringify(selectedSettings) !== JSON.stringify(props.contentSecuritySettings.securitySettings) || hasToggleChanged) &&
                <div>
                    <Button 
                        type='button' className="my2" typeButton='primary' buttonColor='blue' isLoading={buttonLoading} onClick={() => { handleSave()}}>Save</Button>
                    <Button type="button" form="vodSecurityForm" className="m2" typeButton='tertiary' buttonColor='blue' onClick={() => {{handleReset();props.showToast(`Changes have been discarded`, 'fixed', "success")}}}>Discard</Button>
                </div>
            }
            <Modal size="small" modalTitle="Edit Security Settings" icon={{name: "warning", color: "red"}} opened={editSettingsModalOpen} toggle={() => setEditSettingsModalOpen(false)} hasClose={false}>
                <ModalContent>
                    <Text size={14} weight="reg">After unlocking these settings your global settings will no longer apply to this content.</Text>
                </ModalContent>
                <ModalFooter>
                    <Button onClick={() => {setSettingsEditable(!settingsEditable);setEditSettingsModalOpen(false)}}>Edit</Button>
                    <Button typeButton="tertiary" onClick={() => setEditSettingsModalOpen(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Modal size="small" modalTitle="Revert Security Settings" icon={{name: "warning", color: "red"}} opened={revertSettingsModalOpen} toggle={() => setRevertSettingsModalOpen(false)} hasClose={false}>
                <ModalContent>
                    <Text size={14} weight="reg">This will discard settings for this content and use your global settings instead.</Text>
                </ModalContent>
                <ModalFooter>
                    <Button onClick={() => handleRevert()}>Revert</Button>
                    <Button typeButton="tertiary" onClick={() => setRevertSettingsModalOpen(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Prompt when={JSON.stringify(selectedSettings) !== JSON.stringify(props.contentSecuritySettings.securitySettings) || hasToggleChanged} message='' />
        </div>
                    
    )
}