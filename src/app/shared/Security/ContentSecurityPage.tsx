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

interface ContentSecurityComponentProps {
    contentSecuritySettings: ContentSecuritySettings;
    globalSecuritySettings: SecuritySettings;
    getSettingsSecurityOptions: Function;
    saveContentSecuritySettings: Function;
    contentId: string;
}

export const ContentSecurityPage = (props: ContentSecurityComponentProps) => {

    //Initial state depending on custom settings for the content
    const initvalues = () => {
        let defaultValues: {
            editableSettings: boolean;
            selectedSettings: SecuritySettings;
            passwordProtectionToggle: boolean;
            contentSchedulingToggle: boolean;
            startDateTime: 'Always' | 'Set Date and Time';
            endDateTime: 'Forever' | 'Set Date and Time';
        } = {editableSettings: false, selectedSettings: null, passwordProtectionToggle: false, contentSchedulingToggle: false, startDateTime: "Always", endDateTime: "Forever"}
        if(props.contentSecuritySettings.securitySettings && props.globalSecuritySettings) {
            defaultValues.editableSettings = JSON.stringify(props.globalSecuritySettings) == JSON.stringify(props.contentSecuritySettings.securitySettings) ? false : true
            defaultValues.selectedSettings = props.contentSecuritySettings.securitySettings
            defaultValues.passwordProtectionToggle = props.contentSecuritySettings.securitySettings.passwordProtection.password ? true : false
            defaultValues.contentSchedulingToggle = props.contentSecuritySettings.securitySettings.contentScheduling.endTime === 0 && props.contentSecuritySettings.securitySettings.contentScheduling.startTime === 0 ? false : true
            defaultValues.startDateTime = props.contentSecuritySettings.securitySettings.contentScheduling.startTime === 0 ? 'Always' : 'Set Date and Time'
            defaultValues.endDateTime = props.contentSecuritySettings.securitySettings.contentScheduling.endTime === 0 ? 'Forever' : 'Set Date and Time'
        }
        return defaultValues
    }

    const [toggleSchedulingVideo, setToggleSchedulingVideo] = React.useState<boolean>(initvalues().contentSchedulingToggle)
    const [togglePasswordProtectedVideo, setTogglePasswordProtectedVideo] = React.useState<boolean>(initvalues().passwordProtectionToggle)
    const [startDateTime, setStartDateTime] = React.useState<'Always' | 'Set Date and Time'>(initvalues().startDateTime)
    const [endDateTime, setEndDateTime] = React.useState<'Forever' | 'Set Date and Time'>(initvalues().endDateTime)
    const [settingsEditable, setSettingsEditable] = React.useState<boolean>(initvalues().editableSettings)
    const [selectedSettings, setSelectedSettings] = React.useState<SecuritySettings>(initvalues().selectedSettings)
    const [editSettingsModalOpen, setEditSettingsModalOpen] = React.useState<boolean>(false)
    const [revertSettingsModalOpen, setRevertSettingsModalOpen] = React.useState<boolean>(false)

    const handleReset = () => {
        setSelectedSettings(props.contentSecuritySettings.securitySettings)
        setTogglePasswordProtectedVideo(props.contentSecuritySettings.securitySettings.passwordProtection.password ? true : false)
    }

    React.useEffect(() => {
        setSelectedSettings(props.contentSecuritySettings.securitySettings)
    }, [props.contentSecuritySettings.securitySettings])

    const handlePasswordValue = () => {
        if(!settingsEditable) {
            return props.globalSecuritySettings.passwordProtection.password ? props.globalSecuritySettings.passwordProtection.password : ''
        } else {
            return props.contentSecuritySettings.securitySettings.passwordProtection.password ? props.contentSecuritySettings.securitySettings.passwordProtection.password : ''

        }
    }

    return (
        <div >
            {  !settingsEditable ? 
        
                <Bubble type='info' className='my2'>
                    <BubbleContent>         
                        These settings are inherited from your <a href="/settings/security">&nbsp;Security Settings&nbsp;</a> — click the&nbsp;<IconStyle>lock</IconStyle>&nbsp;Padlock to override these settings.
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
                
                    <div className='col col-12 mb1'>
                        <Toggle 
                            id="passwordProtectedVideosToggle" 
                            label='Password Protection' 
                            onChange={() => {setTogglePasswordProtectedVideo(!togglePasswordProtectedVideo)}} defaultChecked={togglePasswordProtectedVideo}
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
                        <Toggle 
                            id="videoScheduling" 
                            label='Content Scheduling' 
                            onChange={() => {setToggleSchedulingVideo(!toggleSchedulingVideo)}} defaultChecked={toggleSchedulingVideo}
                        />
                        <ToggleTextInfo><Text size={14} weight='reg' color='gray-1'>The content will only be available between the times/dates you provide.</Text></ToggleTextInfo>
                         
                        { toggleSchedulingVideo ? 
                        <>
                        <div className='col col-12 mb2 clearfix sm-flex'>
                            <DropdownSingle 
                                className='col col-12 md-col-3 clearfix sm-mr1'
                                id="availableStart" 
                                dropdownTitle="Available" 
                                list={{'Always': false, "Set Date and Time": false}} dropdownDefaultSelect={startDateTime} callback={(selectedItem: 'Always' | 'Set Date and Time') => setStartDateTime(selectedItem)} 
                            />
                            {
                                startDateTime === "Set Date and Time" &&
                                <>        
                                    <div className='col col-6 pr1 xs-mt2 sm-mt-auto md-col-3'>
                                        <DateSinglePickerWrapper 
                                            className='mt2'
                                            id="startDate"
                                            callback={(startDateValue: number) => setSelectedSettings({...selectedSettings, contentScheduling:{...selectedSettings.contentScheduling, startTime: startDateValue}})}
                                        />
                                    </div>

                                    <Input 
                                        type='time'
                                        defaultValue={'00:00:00'} 
                                        className='col col-6 pl1 sm-mt-auto xs-mt2 md-col-2'
                                        disabled={false} 
                                        id='startTime' 
                                        pattern="[0-9]{2}:[0-9]{2}"
                                        onChange={(event) => setSelectedSettings({...selectedSettings, contentScheduling:{...selectedSettings.contentScheduling, startTime: parseInt(event.currentTarget.value)}}) }
                                        required
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
                            dropdownDefaultSelect={endDateTime} callback={(selectedItem: 'Forever' | 'Set Date and Time') => setEndDateTime(selectedItem)}
                        />

                        {
                        
                            endDateTime === "Set Date and Time" &&
                                <>
                                    <div className='col col-6 pr1 xs-mt2 sm-mt-auto md-col-3' >
                                        <DateSinglePickerWrapper
                                            className='mt2' 
                                            id="endDate"
                                            callback={(endDateValue: number) => setSelectedSettings({...selectedSettings, contentScheduling:{...selectedSettings.contentScheduling, endTime: endDateValue}})}
                                        />
                                    </div>
                                    <Input 
                                        type='time' 
                                        defaultValue={'00:00:00'}
                                        className='col col-6 pl1 sm-mt-auto xs-mt2 md-col-2'
                                        disabled={false} 
                                        id='endTime' 
                                        pattern="[0-9]{2}:[0-9]{2}"
                                        onChange={(event) => setSelectedSettings({...selectedSettings, contentScheduling:{...selectedSettings.contentScheduling, endTime: parseInt(event.currentTarget.value)}})}
                                        required
                                    /> 
                                </>
                        }
                    </div>
                    </> : null
                        }      
                    
                              
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
                            dropdownDefaultSelect={props.globalSecuritySettings.geoRestriction.filter(f => f.id === selectedSettings.selectedGeoRestriction).length > 0 ? props.globalSecuritySettings.geoRestriction.filter(f => f.id === selectedSettings.selectedGeoRestriction)[0].name : ''} 
                            callback={(selectedItem: string) => setSelectedSettings({...selectedSettings, selectedGeoRestriction: props.contentSecuritySettings.securitySettings.geoRestriction.filter(f => f.name === selectedItem)[0].id})} 
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
                                dropdownDefaultSelect={props.globalSecuritySettings.domainControl.filter(f => f.id === selectedSettings.selectedDomainControl).length > 0 ? props.globalSecuritySettings.domainControl.filter(f => f.id === selectedSettings.selectedDomainControl)[0].name : ''} 
                                callback={(selectedItem: string) => setSelectedSettings({...selectedSettings, selectedDomainControl: props.contentSecuritySettings.securitySettings.domainControl.filter(f => f.name === selectedItem)[0].id})} 
                            />
                        </div>
                    </div>
                </DisabledSection>
            </Card>
          
            { selectedSettings === props.contentSecuritySettings.securitySettings ? null :
                <div>
                    <Button 
                        type='button' className="my2" typeButton='primary' buttonColor='blue' onClick={() => props.saveContentSecuritySettings(selectedSettings, props.contentId)}>Save</Button>
                    <Button type="button" form="vodSecurityForm" className="m2" typeButton='tertiary' buttonColor='blue' onClick={() => handleReset()}>Discard</Button>
                </div>}
            <Modal size="small" modalTitle="Edit Security Settings" icon={{name: "warning", color: "red"}} opened={editSettingsModalOpen} toggle={() => setEditSettingsModalOpen(false)} hasClose={false}>
                <ModalContent>
                    <Text size={14} weight="reg">This page is using the global settings. Override this if you wish to edit, but keep in mind that something, and this is a user based setting. </Text>
                </ModalContent>
                <ModalFooter>
                    <Button onClick={() => {setSettingsEditable(!settingsEditable);setEditSettingsModalOpen(false)}}>Edit</Button>
                    <Button typeButton="tertiary" onClick={() => setEditSettingsModalOpen(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Modal size="small" modalTitle="Revert Security Settings" icon={{name: "warning", color: "red"}} opened={revertSettingsModalOpen} toggle={() => setRevertSettingsModalOpen(false)} hasClose={false}>
                <ModalContent>
                    <Text size={14} weight="reg">Use global settings instead of content settings.</Text>
                </ModalContent>
                <ModalFooter>
                    <Button onClick={() => {setSettingsEditable(!settingsEditable); setSelectedSettings(props.globalSecuritySettings);setRevertSettingsModalOpen(false)}}>Revert</Button>
                    <Button typeButton="tertiary" onClick={() => setRevertSettingsModalOpen(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Prompt when={JSON.stringify(selectedSettings) !== JSON.stringify(props.contentSecuritySettings.securitySettings)} message='' />
        </div>
                    
    )
}