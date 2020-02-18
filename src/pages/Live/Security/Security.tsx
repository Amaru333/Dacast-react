import React from 'react';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Bubble } from '../../../components/Bubble/Bubble';
import { TextStyle, ToggleTextInfo, BorderStyle, Header, DisabledSection, UnlockSettingsIcon, BubbleContent } from '../../../shared/Security/SecurityStyle';
import { Text } from '../../../components/Typography/Text';
import { Toggle } from '../../../components/Toggle/toggle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DateSinglePicker } from '../../../components/FormsComponents/Datepicker/DateSinglePicker';
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { Modal, ModalContent, ModalFooter } from '../../../components/Modal/Modal';
import { SecuritySettings, LiveSecuritySettings } from '../../../redux-flow/store/Live/Security/types';
import { GeoRestriction, DomainControl } from '../../../redux-flow/store/Settings/Security/types';
import { Card } from '../../../components/Card/Card';
import { Icon } from '@material-ui/core';

interface LiveSecurityComponentProps {
    liveSecuritySettings: LiveSecuritySettings;
    globalSecuritySettings: SecuritySettings;
    getSettingsSecurityOptions: Function;
    saveLiveSecuritySettings: Function;
}

export const LiveSecurityPage = (props: LiveSecurityComponentProps) => {

    const [toggleSchedulingVideo, setToggleSchedulingVideo] = React.useState<boolean>(false)
    const [togglePasswordProtectedVideo, setTogglePasswordProtectedVideo] = React.useState<boolean>(false)
    const [settingsEditable, setSettingsEditable] = React.useState<boolean>(false)
    const [selectedSettings, setSelectedSettings] = React.useState<SecuritySettings>(props.liveSecuritySettings.securitySettings)
    const [editSettingsModalOpen, setEditSettingsModalOpen] = React.useState<boolean>(false)
    const [revertSettingsModalOpen, setRevertSettingsModalOpen] = React.useState<boolean>(false)

    const handleReset = () => {
        setSelectedSettings(props.liveSecuritySettings.securitySettings)
        setTogglePasswordProtectedVideo(props.liveSecuritySettings.securitySettings.passwordProtectedVideo.enabled)
    }

    React.useEffect(() => {
        setSelectedSettings(props.liveSecuritySettings.securitySettings)
    }, [props.liveSecuritySettings.securitySettings])

    React.useEffect(() => {
        setTogglePasswordProtectedVideo(selectedSettings.passwordProtectedVideo.enabled);
        setToggleSchedulingVideo(selectedSettings.videoScheduling.enabled)
    }, [selectedSettings])

    return (
        <div >
            {  !settingsEditable ? 
        
                <Bubble type='info' className='my2'>
                    <BubbleContent>         
                        These settings are inherited from your <a href="/settings/security">&nbsp;Security Settings&nbsp;</a> — click the&nbsp;<Icon>lock</Icon>&nbsp;Padlock to override these settings.
                    </BubbleContent>     
                </Bubble> 
                :
                <Bubble type='info' className='my2'>
                    <BubbleContent>         
                        These settings are different from your global <a href="/settings/security">&nbsp;Security Settings&nbsp;</a> — click the&nbsp;<Icon>lock_open</Icon>&nbsp;Padlock to revert to global settings.
                    </BubbleContent>     
                </Bubble> 


            }
            <Card>
                <Header className="pb25">
                    <TextStyle>
                        <Text size={20} weight='med' color='gray-1'>Security</Text>
                    </TextStyle>
                    <UnlockSettingsIcon onClick={settingsEditable? () => setRevertSettingsModalOpen(true) : () => setEditSettingsModalOpen(true)}>
                        { settingsEditable ? 
                            "lock_open"
                            : "lock"
                        }
                    </UnlockSettingsIcon>
                </Header>
                
                <DisabledSection settingsEditable={settingsEditable}>
                    <div className='col col-12 mb1'>
                        <Toggle 
                            id="passwordProtectedVideosToggle" 
                            label='Password Protection' 
                            onChange={() => {setSelectedSettings({...selectedSettings, passwordProtectedVideo: {...selectedSettings.passwordProtectedVideo, enabled: !selectedSettings.passwordProtectedVideo.enabled}})}} defaultChecked={selectedSettings.passwordProtectedVideo.enabled}
                        />
                        <ToggleTextInfo>
                            <Text size={14} weight='reg' color='gray-1'>Viewers must enter a password before viewing the content.</Text>
                        </ToggleTextInfo>
                        { togglePasswordProtectedVideo ? 
                            <div className='col col-12'>
                                <Input 
                                    type='text'
                                    defaultValue={props.liveSecuritySettings.securitySettings.passwordProtectedVideo.password ? props.liveSecuritySettings.securitySettings.passwordProtectedVideo.password : ''}  
                                    className='col col-4 md-col-3 mb2'
                                    disabled={false} 
                                    id='password' 
                                    label='Password' 
                                    placeholder='Password'
                                    onChange={(event) => setSelectedSettings({...selectedSettings, passwordProtectedVideo: {...selectedSettings.passwordProtectedVideo, password: event.currentTarget.value }})}
                                    required
                                />
                            </div>
                            : null }
                    </div> 

                    <div className='col col-12'>
                        <Toggle 
                            id="videoScheduling" 
                            label='Video Scheduling' 
                            onChange={() => {setSelectedSettings({...selectedSettings, videoScheduling:{...selectedSettings.videoScheduling, enabled:!selectedSettings.videoScheduling.enabled}})}} defaultChecked={selectedSettings.videoScheduling.enabled}
                        />
                        <ToggleTextInfo><Text size={14} weight='reg' color='gray-1'>The video will only be available between the times/dates you provide.</Text></ToggleTextInfo>
                         
                        { toggleSchedulingVideo ? 
                        <>
                        <div className='col col-12 flex items-center'>
                            <DropdownSingle 
                                className='col col-4 md-col-3 mb2 mr1' 
                                id="availableStart" 
                                dropdownTitle="Available" 
                                list={{'Always': false, "Set Date and Time": false}} defaultValue={selectedSettings.videoScheduling.startDateTime} callback={(selectedItem: string) => setSelectedSettings({...selectedSettings, videoScheduling:{...selectedSettings.videoScheduling, startDateTime: selectedItem}})} 
                            />
                            {
                                selectedSettings.videoScheduling.startDateTime === "Set Date and Time" ?
                                <>        
                                <div className='col col-4 md-col-3 mb2'>
                                    <DateSinglePicker 
                                        className='mt2'
                                        id="startDate"
                                        callback={(startDateValue: string) => setSelectedSettings({...selectedSettings, videoScheduling:{...selectedSettings.videoScheduling, startDate: startDateValue}})}
                                    />
                                </div>

                                <Input 
                                    type='time'
                                    defaultValue={props.liveSecuritySettings.securitySettings.videoScheduling.startTime ? props.liveSecuritySettings.securitySettings.videoScheduling.startTime : '00:00:00'} 
                                    className='col col-3 md-col-2 px1 mt1'
                                    disabled={false} 
                                    id='startTime' 
                                    pattern="[0-9]{2}:[0-9]{2}"
                                    onChange={(event) => setSelectedSettings({...selectedSettings, videoScheduling:{...selectedSettings.videoScheduling, startTime: event.currentTarget.value}}) }
                                    required
                                /> 
                                </> : null
                            }                
                        </div>

                    <div className='col col-12 flex items-center'>
                        <DropdownSingle 
                            className='col col-4 md-col-3 mb2 mr1' 
                            id="availableEnd" 
                            dropdownTitle="Until" 
                            list={{Forever: false, "Set Date and Time": false}} 
                            defaultValue={selectedSettings.videoScheduling.endDateTime} callback={(selectedItem: string) => setSelectedSettings({...selectedSettings, videoScheduling:{...selectedSettings.videoScheduling, endDateTime: selectedItem}})}
                        />

                        {
                        
                            selectedSettings.videoScheduling.endDateTime === "Set Date and Time" ?
                        
                                <>
                                <div className='col col-4 md-col-3 mb2' >
                                    <DateSinglePicker
                                        className='mt2' 
                                        id="endDate"
                                        callback={(endDateValue: string) => setSelectedSettings({...selectedSettings, videoScheduling:{...selectedSettings.videoScheduling, endDate: endDateValue}})}
                                    />
                                </div>
                                <Input 
                                    type='time' 
                                    defaultValue={props.liveSecuritySettings.securitySettings.videoScheduling.endTime ? props.liveSecuritySettings.securitySettings.videoScheduling.endTime : '00:00:00'}
                                    className='col col-3 md-col-2 mt1 px1'
                                    disabled={false} 
                                    id='endTime' 
                                    pattern="[0-9]{2}:[0-9]{2}"
                                    onChange={(event) => setSelectedSettings({...selectedSettings, videoScheduling:{...selectedSettings.videoScheduling, endTime: event.currentTarget.value}})}
                                    required
                                /> 
                                </> : null
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
                            className='col col-4 md-col-3 my2 mr1' 
                            id="availableEnd" 
                            dropdownTitle="Select Geo-Restriction Group" 
                            list={props.liveSecuritySettings.securitySettings.geoRestriction.reduce((reduced: DropdownListType, item: GeoRestriction)=> {return {...reduced, [item.name]: false}},{})} 
                            defaultValue={selectedSettings.selectedGeoRestriction} callback={(selectedItem: string) => setSelectedSettings({...selectedSettings, selectedGeoRestriction: selectedItem})} 
                        />
                    </div>

                    <BorderStyle className="p1" />
                
                    <div>
                        <TextStyle className="pt2" >
                            <Text size={20} weight='med' color='gray-1'>Domain Control</Text>
                        </TextStyle>

                        <TextStyle className="pt25" >
                            <Text size={14} weight='reg' color='gray-1'>Restrict access to specific domain names on the internet. Manage your Domain Control Groups in your <a href="/settings/security">Security Settings</a>.</Text>
                        </TextStyle>
                        <div className="col col-12 py2">
                            <DropdownSingle 
                                className="col col-3" 
                                id="availableEnd" 
                                dropdownTitle="Select Domain Control Group" 
                                list={props.liveSecuritySettings.securitySettings.domainControl.reduce((reduced: DropdownListType, item: DomainControl)=> {return {...reduced, [item.name]: false}},{})} 
                                defaultValue={selectedSettings.selectedDomainControl} 
                                callback={(selectedItem: string) => setSelectedSettings({...selectedSettings, selectedDomainControl: selectedItem})} 
                            />
                        </div>
                    </div>
                </DisabledSection>
            </Card>
          
            { selectedSettings === props.liveSecuritySettings.securitySettings ? null :
                <div>
                    <Button 
                        type='button' className="my2" typeButton='primary' buttonColor='blue' onClick={() => props.saveLiveSecuritySettings(selectedSettings)}>Save</Button>
                    <Button type="button" form="liveSecurityForm" className="m2" typeButton='tertiary' buttonColor='blue' onClick={() => handleReset()}>Discard</Button>
                </div>}
            <Modal size="small" title="Edit Security Settings" icon={{name: "warning", color: "red"}} opened={editSettingsModalOpen} toggle={() => setEditSettingsModalOpen(false)} hasClose={false}>
                <ModalContent>
                    <Text size={14} weight="reg">This page is using the global settings. Override this if you wish to edit, but keep in mind that something, and this is a user based setting. </Text>
                </ModalContent>
                <ModalFooter>
                    <Button onClick={() => {setSettingsEditable(!settingsEditable);setEditSettingsModalOpen(false)}}>Edit</Button>
                    <Button typeButton="tertiary" onClick={() => setEditSettingsModalOpen(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Modal size="small" title="Revert Security Settings" icon={{name: "warning", color: "red"}} opened={revertSettingsModalOpen} toggle={() => setRevertSettingsModalOpen(false)} hasClose={false}>
                <ModalContent>
                    <Text size={14} weight="reg">Choosing to revert to the Global Security Settings means that blah blah balh...</Text>
                </ModalContent>
                <ModalFooter>
                    <Button onClick={() => {setSettingsEditable(!settingsEditable); setSelectedSettings(props.globalSecuritySettings);setRevertSettingsModalOpen(false)}}>Revert</Button>
                    <Button typeButton="tertiary" onClick={() => setRevertSettingsModalOpen(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
    
}