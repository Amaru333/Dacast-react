import React from 'react';
import { Bubble } from '../../../Bubble/Bubble';
import { TextStyle, ToggleTextInfo, BorderStyle, DisabledCard } from './SecurityStyle';
import { Text } from '../../../Typography/Text';
import { Toggle } from '../../../Toggle/toggle';
import { Input } from '../../../FormsComponents/Input/Input';
import { DropdownSingle } from '../../../FormsComponents/Dropdown/DropdownSingle';
import { DateSinglePicker } from '../../../FormsComponents/Datepicker/DateSinglePicker';
import { Button } from '../../../FormsComponents/Button/Button';
import { VodSecuritySettings, SecuritySettings } from '../../../../redux-flow/store/VOD/Security/types';
import { DropdownListType } from '../../../FormsComponents/Dropdown/DropdownTypes';
import { GeoRestriction, DomainControl } from '../../../../redux-flow/store/Settings/Security';
import { Modal, ModalContent, ModalFooter } from '../../../Modal/Modal';

interface VodSecurityComponentProps {
    vodSecuritySettings: VodSecuritySettings;
    globalSecuritySettings: SecuritySettings;
    getSettingsSecurityOptions: Function;
    saveVodSecuritySettings: Function;
}

export const VodSecurityPage = (props: VodSecurityComponentProps) => {

    const [toggleSchedulingVideo, setToggleSchedulingVideo] = React.useState<boolean>(false)
    const [togglePasswordProtectedVideo, setTogglePasswordProtectedVideo] = React.useState<boolean>(false)
    const [settingsEditable, setSettingsEditable] = React.useState<boolean>(false)
    const [selectedSettings, setSelectedSettings] = React.useState<SecuritySettings>(props.vodSecuritySettings.securitySettings)
    const [editSettingsModalOpen, setEditSettingsModalOpen] = React.useState<boolean>(false)
    const [revertSettingsModalOpen, setRevertSettingsModalOpen] = React.useState<boolean>(false)

    const handleReset = () => {
        setSelectedSettings(props.vodSecuritySettings.securitySettings)
        setTogglePasswordProtectedVideo(props.vodSecuritySettings.securitySettings.passwordProtectedVideo.enabled)
    }

    React.useEffect(() => {
        setSelectedSettings(props.vodSecuritySettings.securitySettings)
    }, [props.vodSecuritySettings.securitySettings])

    React.useEffect(() => {
        setTogglePasswordProtectedVideo(selectedSettings.passwordProtectedVideo.enabled);
        setToggleSchedulingVideo(selectedSettings.videoScheduling.enabled)
    }, [selectedSettings])

    return (
        <div >
            <div className="col col-12">
                <Button 
                    typeButton="secondary" 
                    type="button" 
                    sizeButton="small" 
                    className="col-right m25" 
                    onClick={settingsEditable? () => setRevertSettingsModalOpen(true) : () => setEditSettingsModalOpen(true)}>
                    { 
                        settingsEditable ? 
                            "Revert Security Settings"
                            : "Edit Security Settings"
                    }
                </Button>
            </div>
            
            {  !settingsEditable ? 
        
                <Bubble type='info' className='my2'>          
                This page is disabled because the settings are in a different place, so if you choose to overide these settings, do so at your own demise 
                </Bubble> : null
            }
            <DisabledCard settingsEditable={settingsEditable}>
                <TextStyle className="py2" >
                    <Text size={20} weight='med' color='gray-1'>Security</Text>
                </TextStyle>
                
                <Toggle 
                    id="privateVideosToggle" 
                    label='Private Video' 
                    defaultChecked={selectedSettings.privateVideo} 
                    onChange={() => setSelectedSettings({...selectedSettings, privateVideo: !selectedSettings.privateVideo})}
                />
                <ToggleTextInfo>
                    <Text size={14} weight='reg' color='gray-1'>This video won’t be displayed publicy on your website </Text>
                </ToggleTextInfo>

                <div className='col col-12 mb1'>
                    <Toggle 
                        id="passwordProtectedVideosToggle" 
                        label='Password Protected Videos' 
                        onChange={() => {setSelectedSettings({...selectedSettings, passwordProtectedVideo: {...selectedSettings.passwordProtectedVideo, enabled: !selectedSettings.passwordProtectedVideo.enabled}})}} defaultChecked={selectedSettings.passwordProtectedVideo.enabled}
                    />
                    <ToggleTextInfo>
                        <Text size={14} weight='reg' color='gray-1'>Viewers must enter a password before viewing your content. You can edit the prompt time to let the viewer preview some of the video before being prompted by a password. </Text>
                    </ToggleTextInfo>
                    { togglePasswordProtectedVideo ? 
                        <div className='col col-12'>
                            <Input 
                                type='time' 
                                defaultValue={props.vodSecuritySettings.securitySettings. passwordProtectedVideo.promptTime ? props.vodSecuritySettings.securitySettings.passwordProtectedVideo.promptTime : '00:00:00'}
                                className='col col-3 md-col-2 mb1'
                                disabled={false} 
                                id='promptTime' 
                                label='Prompt Time' 
                                required
                                pattern="[0-9]{2}:[0-9]{2}"
                                step='1'
                                onChange={(event) => setSelectedSettings({...selectedSettings, passwordProtectedVideo: {...selectedSettings.passwordProtectedVideo, promptTime: event.currentTarget.value}})}
                            />

                            <Input 
                                type='text'
                                defaultValue={props.vodSecuritySettings.securitySettings.passwordProtectedVideo.password ? props.vodSecuritySettings.securitySettings.passwordProtectedVideo.password : ''}  
                                className='col col-4 md-col-3 px1 mb1'
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
                                    defaultValue={props.vodSecuritySettings.securitySettings.videoScheduling.startTime ? props.vodSecuritySettings.securitySettings.videoScheduling.startTime : '00:00:00'} 
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
                                    defaultValue={props.vodSecuritySettings.securitySettings.videoScheduling.endTime ? props.vodSecuritySettings.securitySettings.videoScheduling.endTime : '00:00:00'}
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
                    <TextStyle className="py2" >
                        <Text size={20} weight='med' color='gray-1'>Geo-Restriction</Text>
                    </TextStyle>

                    <TextStyle className="py2" >
                        <Text size={14} weight='reg' color='gray-1'>Text tbd</Text>
                    </TextStyle>

                    <DropdownSingle 
                        className='col col-4 md-col-3 mb2 mr1' 
                        id="availableEnd" 
                        dropdownTitle="Select Geo-Restriction Group" 
                        list={props.vodSecuritySettings.securitySettings.geoRestriction.reduce((reduced: DropdownListType, item: GeoRestriction)=> {return {...reduced, [item.name]: false}},{})} 
                        defaultValue={selectedSettings.selectedGeoRestriction} callback={(selectedItem: string) => setSelectedSettings({...selectedSettings, selectedGeoRestriction: selectedItem})} 
                    />
                </div>

                <BorderStyle className="p1" />
                
                <div>
                    <TextStyle className="py2" >
                        <Text size={20} weight='med' color='gray-1'>Domain Control</Text>
                    </TextStyle>

                    <TextStyle className="py2" >
                        <Text size={14} weight='reg' color='gray-1'>Text tbd</Text>
                    </TextStyle>
                    <div className="col col-12 pb2">
                        <DropdownSingle 
                            className="col col-3" 
                            id="availableEnd" 
                            dropdownTitle="Select Domain Control Group" 
                            list={props.vodSecuritySettings.securitySettings.domainControl.reduce((reduced: DropdownListType, item: DomainControl)=> {return {...reduced, [item.name]: false}},{})} 
                            defaultValue={selectedSettings.selectedDomainControl} 
                            callback={(selectedItem: string) => setSelectedSettings({...selectedSettings, selectedDomainControl: selectedItem})} 
                        />
                    </div>
                </div>
            </DisabledCard>
          
            { selectedSettings === props.vodSecuritySettings.securitySettings ? null :
                <div>
                    <Button 
                        type='button' className="my2" typeButton='primary' buttonColor='blue' onClick={() => props.saveVodSecuritySettings(selectedSettings)}>Save</Button>
                    <Button type="button" form="vodSecurityForm" className="m2" typeButton='tertiary' buttonColor='blue' onClick={() => handleReset()}>Discard</Button>
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