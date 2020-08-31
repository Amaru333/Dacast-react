import React from 'react';
import { Bubble } from '../../../components/Bubble/Bubble';
import { ToggleTextInfo, DisabledSection, Header, BubbleContent } from './SecurityStyle';
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
import { Divider } from '../Common/MiscStyle';

var momentTZ = require('moment-timezone')

interface ContentSecurityComponentProps {
    contentType: string
    contentSecuritySettings: ContentSecuritySettings;
    globalSecuritySettings: SecuritySettings;
    contentId: string;
    getSettingsSecurityOptions: (contentId: string, contentType: string) => Promise<void>;
    saveContentSecuritySettings: (data: SecuritySettings, contentId: string, contentType: string) => Promise<void>;
    lockContent: (contentId: string, contentType: string) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

export const ContentSecurityPage = (props: ContentSecurityComponentProps) => {

    const inputTimeToTs = (value: string, timezoneName: string) => {
        //let offset = momentTZ.tz(timezoneName)*60
        let splitValue = value.split(':')
        let hours = parseInt(splitValue[0]) * 3600
        if(isNaN(hours)){
            hours = 0
        }
        let min = !splitValue[1] ? 0 : parseInt(splitValue[1]) * 60
        if(isNaN(min)){
            min = 0
        }
        let total = hours + min
        return total
    }

    
    const [togglePasswordProtectedVideo, setTogglePasswordProtectedVideo] = React.useState<boolean>(props.contentSecuritySettings.securitySettings.passwordProtection && props.contentSecuritySettings.securitySettings.passwordProtection.password ? true : false)
    const [hasToggleChanged, setHasToggleChanged] = React.useState<boolean>(false)
    const [startDateTime, setStartDateTime] = React.useState<'Always' | 'Set Date and Time'>(!props.contentSecuritySettings.securitySettings.contentScheduling.startTime || props.contentSecuritySettings.securitySettings.contentScheduling.startTime === 0 ? 'Always' : 'Set Date and Time')
    const [endDateTime, setEndDateTime] = React.useState<'Forever' | 'Set Date and Time'>(!props.contentSecuritySettings.securitySettings.contentScheduling.endTime || props.contentSecuritySettings.securitySettings.contentScheduling.endTime === 0 ? 'Forever' : 'Set Date and Time')
    const [settingsEditable, setSettingsEditable] = React.useState<boolean>(!props.contentSecuritySettings.securitySettings.locked )
    const [selectedSettings, setSelectedSettings] = React.useState<SecuritySettings>(props.contentSecuritySettings.securitySettings)
    const [editSettingsModalOpen, setEditSettingsModalOpen] = React.useState<boolean>(false)
    const [revertSettingsModalOpen, setRevertSettingsModalOpen] = React.useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    let startTimestamp = momentTZ.tz((selectedSettings.contentScheduling.startTime && selectedSettings.contentScheduling.startTime > 0 ? selectedSettings.contentScheduling.startTime : Math.floor(Date.now() / 1000))*1000, selectedSettings.contentScheduling && selectedSettings.contentScheduling.startTimezone ? selectedSettings.contentScheduling.startTimezone : momentTZ.tz.guess())
    let endTimestamp = momentTZ.tz((selectedSettings.contentScheduling.endTime && selectedSettings.contentScheduling.endTime > 0 ? selectedSettings.contentScheduling.endTime : Math.floor(Date.now() / 1000))*1000, selectedSettings.contentScheduling && selectedSettings.contentScheduling.startTimezone ? selectedSettings.contentScheduling.startTimezone : momentTZ.tz.guess())

    const [startDay, setStartDay] = React.useState<number>(startTimestamp.clone().startOf('day').valueOf()/1000)
    const [endDay, setEndDay] = React.useState<number>(endTimestamp.clone().startOf('day').valueOf()/1000)
    const [startTime, setStartTime] = React.useState<number>(startTimestamp.clone().valueOf()/1000 - startTimestamp.clone().startOf('day').valueOf()/1000)
    const [endTime, setEndTime] = React.useState<number>(endTimestamp.clone().valueOf()/1000 - endTimestamp.clone().startOf('day').valueOf()/1000)

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
        let startDate = startDateTime === 'Set Date and Time' ? momentTZ((startDay + startTime)*1000).tz(selectedSettings.contentScheduling.startTimezone || momentTZ.tz.guess()).valueOf()/1000 : 0
        let endDate = endDateTime === 'Set Date and Time' ? momentTZ((endDay + endTime)*1000).tz(selectedSettings.contentScheduling.endTimezone || momentTZ.tz.guess()).valueOf()/1000 : 0
        
        props.saveContentSecuritySettings(
            {
                passwordProtection: selectedSettings.passwordProtection,
                contentScheduling: {
                    startTime: startDate, 
                    startTimezone: startDateTime === 'Set Date and Time' ? selectedSettings.contentScheduling.startTimezone : null,
                    endTime: endDate,
                    endTimezone: endDateTime === 'Set Date and Time' ? selectedSettings.contentScheduling.endTimezone : null
                }, 
                selectedGeoRestriction: selectedSettings.selectedGeoRestriction, 
                selectedDomainControl: selectedSettings.selectedDomainControl
            }, 
            props.contentId, props.contentType
            ).then(() => {
                setButtonLoading(false)
                setHasToggleChanged(false)
            }).catch(() => setButtonLoading(false))
    }

    const handleRevert = () => {
        props.lockContent(props.contentId, props.contentType).then(() => {
            setSettingsEditable(!settingsEditable)
            setSelectedSettings(props.globalSecuritySettings)
            setRevertSettingsModalOpen(false)
            setHasToggleChanged(false)
        })

    }

    const handleUnlockingSettings = () => {
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
                selectedGeoRestriction: null,
                locked: false
            }, 
            props.contentId, props.contentType
        ).then(() => {
            setSettingsEditable(!settingsEditable)
            setEditSettingsModalOpen(false)
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
                    <div>
                        <Text size={20} weight='med' color='gray-1'>Security</Text>
                    </div>
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
                                    onChange={(event) => {setHasToggleChanged(true);setSelectedSettings({...selectedSettings, passwordProtection: {password: event.currentTarget.value }})}}
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
                                        id='startDate'
                                        date={momentTZ((startDay + startTime)*1000).tz(selectedSettings.contentScheduling.startTimezone || momentTZ.tz.guess())}
                                        callback={(_, timestamp: string) => { setHasToggleChanged(true);setStartDay(momentTZ.tz(parseInt(timestamp)*1000, selectedSettings.contentScheduling.startTimezone).startOf('day').valueOf()/1000)}}
                                        className='mt2' 
                                    />
                                    </div>

                                    <Input
                                        type='time'
                                        value={momentTZ((startDay + startTime)*1000).tz(selectedSettings.contentScheduling.startTimezone || momentTZ.tz.guess()).format('HH:mm')}
                                        onChange={(event) => { setHasToggleChanged(true);setStartTime(inputTimeToTs(event.currentTarget.value, selectedSettings.contentScheduling.startTimezone || momentTZ.tz.guess()))}}
                                        className='col col-6 pl1 sm-mt-auto xs-mt2 md-col-2'                                        disabled={false}
                                        id='startTime'
                                        pattern="[0-9]{2}:[0-9]{2}"
                                        
                                    />

                                    <DropdownSingle 
                                        hasSearch 
                                        id='startDateTimezoneDropdown' 
                                        dropdownDefaultSelect={selectedSettings.contentScheduling.startTimezone || momentTZ.tz.guess()} 
                                        className='col col-3 px2' 
                                        dropdownTitle='Timezone' 
                                        callback={(value: string) => {setHasToggleChanged(true);setSelectedSettings({...selectedSettings, contentScheduling: {...selectedSettings.contentScheduling, startTimezone: value.split(' ')[0]}})}} 
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
                                            id='endDate'
                                            date={momentTZ((endDay + endTime)*1000).tz(selectedSettings.contentScheduling.endTimezone || momentTZ.tz.guess())}
                                            callback={(_, timestamp: string) => { setHasToggleChanged(true);setEndDay(momentTZ.tz(parseInt(timestamp)*1000, selectedSettings.contentScheduling.endTimezone).startOf('day').valueOf()/1000)}}
                                            className='mt2' 
                                            minDate={momentTZ((startDay + startTime)*1000).tz(selectedSettings.contentScheduling.startTimezone || momentTZ.tz.guess())}
                                        />
                                    </div>

                                    <Input
                                        type='time'
                                        value={momentTZ((endDay + endTime)*1000).tz(selectedSettings.contentScheduling.endTimezone || momentTZ.tz.guess()).format('HH:mm')}
                                        onChange={(event) => { setHasToggleChanged(true);setEndTime(inputTimeToTs(event.currentTarget.value, selectedSettings.contentScheduling.endTimezone || momentTZ.tz.guess()))}}
                                        className='col col-6 pl1 sm-mt-auto xs-mt2 md-col-2'                                        disabled={false}
                                        id='endTime'
                                        pattern="[0-9]{2}:[0-9]{2}"
                                        
                                    />

                                    <DropdownSingle 
                                        hasSearch 
                                        id='endDateTimezoneDropdown' 
                                        dropdownDefaultSelect={selectedSettings.contentScheduling.endTimezone || momentTZ.tz.guess()} 
                                        className='col col-3 px2' 
                                        dropdownTitle='Timezone' 
                                        callback={(value: string) => {setHasToggleChanged(true);setSelectedSettings({...selectedSettings, contentScheduling: {...selectedSettings.contentScheduling, endTimezone: value.split(' ')[0]}})}} 
                                        list={momentTZ.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + momentTZ.tz(item).format('Z z') + ')']: false}}, {})} 
                                    />
                                </>
                        }
                    </div>
                     
                    
                              
                    </div>

                    <Divider className="p1" />

                    <div className="col col-12">
                        <div className="pt25" >
                            <Text size={20} weight='med' color='gray-1'>Geo-Restriction</Text>
                        </div>

                        <div className="pt2" >
                            <Text size={14} weight='reg' color='gray-1'>Restrict access to specific locations worldwide. Manage your Geo-Restriction Groups in your <a href="/settings/security">Security Settings</a>.</Text>
                        </div>

                        <DropdownSingle 
                            className='col col-12 md-col-3 my2 mr1' 
                            id="availableEnd" 
                            dropdownTitle="Select Geo-Restriction Group" 
                            list={props.globalSecuritySettings.geoRestriction.reduce((reduced: DropdownListType, item: GeoRestriction)=> {return {...reduced, [item.name]: false}},{})} 
                            dropdownDefaultSelect={props.globalSecuritySettings.geoRestriction.filter(f => f.id === selectedSettings.selectedGeoRestriction).length > 0 ? props.globalSecuritySettings.geoRestriction.filter(f => f.id === selectedSettings.selectedGeoRestriction)[0].name : props.globalSecuritySettings.geoRestriction.filter(f => f.isDefault)[0].name} 
                            callback={(selectedItem: string) => {setHasToggleChanged(true);setSelectedSettings({...selectedSettings, selectedGeoRestriction: props.globalSecuritySettings.geoRestriction.find(f => f.name === selectedItem).id})}} 
                        />
                    </div>

                    <Divider className="p1" />
                
                    <div>
                        <div className="pt25" >
                            <Text size={20} weight='med' color='gray-1'>Domain Control</Text>
                        </div>

                        <div className="pt2" >
                            <Text size={14} weight='reg' color='gray-1'>Restrict access to specific domain names on the internet. Manage your Domain Control Groups in your <a href="/settings/security">Security Settings</a>.</Text>
                        </div>
                        <div className="col col-12 py2">
                            <DropdownSingle 
                                className="col col-12 md-col-3" 
                                id="availableEnd" 
                                dropdownTitle="Select Domain Control Group" 
                                list={props.globalSecuritySettings.domainControl.reduce((reduced: DropdownListType, item: DomainControl)=> {return {...reduced, [item.name]: false}},{})} 
                                dropdownDefaultSelect={props.globalSecuritySettings.domainControl.filter(f => f.id === selectedSettings.selectedDomainControl).length > 0 ? props.globalSecuritySettings.domainControl.filter(f => f.id === selectedSettings.selectedDomainControl)[0].name : props.globalSecuritySettings.domainControl.filter(f => f.isDefault)[0].name} 
                                callback={(selectedItem: string) => {setHasToggleChanged(true);setSelectedSettings({...selectedSettings, selectedDomainControl: props.globalSecuritySettings.domainControl.find(f => f.name === selectedItem).id})}} 
                            />
                        </div>
                    </div>
                </DisabledSection>
            </Card>
          
            { hasToggleChanged &&
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
                    <Button onClick={() => handleUnlockingSettings()}>Edit</Button>
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
            <Prompt when={hasToggleChanged} message='' />
        </div>
                    
    )
}