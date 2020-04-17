import React from 'react';
import { Bubble } from '../../../../components/Bubble/Bubble';
import { TextStyle, ToggleTextInfo, BorderStyle, DisabledSection, Header, BubbleContent } from '../../../shared/Security/SecurityStyle';
import { Text } from '../../../../components/Typography/Text';
import { Toggle } from '../../../../components/Toggle/toggle';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { SecuritySettings } from '../../../redux-flow/store/Playlists/Security/types';
import { DropdownListType } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { GeoRestriction, DomainControl } from '../../../redux-flow/store/Settings/Security';
import { Modal, ModalContent, ModalFooter } from '../../../../components/Modal/Modal';
import { Card } from '../../../../components/Card/Card';
import { PlaylistSecurityContainerProps } from '../../../containers/Playlists/Security';
import { IconStyle } from '../../../../shared/Common/Icon';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { Prompt } from 'react-router';

export const PlaylistSecurityPage = (props: PlaylistSecurityContainerProps) => {

    const [togglePasswordProtectedVideo, setTogglePasswordProtectedVideo] = React.useState<boolean>(false)
    const [settingsEditable, setSettingsEditable] = React.useState<boolean>(false)
    const [selectedSettings, setSelectedSettings] = React.useState<SecuritySettings>(props.playlistSecuritySettings.securitySettings)
    const [editSettingsModalOpen, setEditSettingsModalOpen] = React.useState<boolean>(false)
    const [revertSettingsModalOpen, setRevertSettingsModalOpen] = React.useState<boolean>(false)

    const handleReset = () => {
        setSelectedSettings(props.playlistSecuritySettings.securitySettings)
        setTogglePasswordProtectedVideo(props.playlistSecuritySettings.securitySettings.passwordProtectedVideo.enabled)
    }

    React.useEffect(() => {
        setSelectedSettings(props.playlistSecuritySettings.securitySettings)
    }, [props.playlistSecuritySettings.securitySettings])

    React.useEffect(() => {
        setTogglePasswordProtectedVideo(selectedSettings.passwordProtectedVideo.enabled);
    }, [selectedSettings])

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
                            onChange={() => {setSelectedSettings({...selectedSettings, passwordProtectedVideo: {...selectedSettings.passwordProtectedVideo, enabled: !selectedSettings.passwordProtectedVideo.enabled}})}} defaultChecked={selectedSettings.passwordProtectedVideo.enabled}
                        />
                        <ToggleTextInfo>
                            <Text size={14} weight='reg' color='gray-1'>Viewers must enter a password before viewing your content. </Text>
                        </ToggleTextInfo>
                        { togglePasswordProtectedVideo ? 
                            <div className='col col-12'>
                                <Input 
                                    type='text'
                                    defaultValue={props.playlistSecuritySettings.securitySettings.passwordProtectedVideo.password ? props.playlistSecuritySettings.securitySettings.passwordProtectedVideo.password : ''}  
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
                            list={props.playlistSecuritySettings.securitySettings.geoRestriction.reduce((reduced: DropdownListType, item: GeoRestriction)=> {return {...reduced, [item.name]: false}},{})} 
                            defaultValue={selectedSettings.selectedGeoRestriction} callback={(selectedItem: string) => setSelectedSettings({...selectedSettings, selectedGeoRestriction: selectedItem})} 
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
                        <div className="col col-12 pb2">
                            <DropdownSingle 
                                className="col col-3 my2" 
                                id="availableEnd" 
                                dropdownTitle="Select Domain Control Group" 
                                list={props.playlistSecuritySettings.securitySettings.domainControl.reduce((reduced: DropdownListType, item: DomainControl)=> {return {...reduced, [item.name]: false}},{})} 
                                defaultValue={selectedSettings.selectedDomainControl} 
                                callback={(selectedItem: string) => setSelectedSettings({...selectedSettings, selectedDomainControl: selectedItem})} 
                            />
                        </div>
                    </div>
                </DisabledSection>
            </Card>
          
            { selectedSettings === props.playlistSecuritySettings.securitySettings ? null :
                <div>
                    <Button 
                        type='button' className="my2" typeButton='primary' buttonColor='blue' onClick={() => props.savePlaylistSecuritySettings(selectedSettings)}>Save</Button>
                    <Button type="button" form="playlistSecurityForm" className="m2" typeButton='tertiary' buttonColor='blue' onClick={() => {handleReset();props.showToast("Changes have been discarded", 'flexible', "success")}}>Discard</Button>
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
                    <Text size={14} weight="reg">Choosing to revert to the Global Security Settings means that blah blah balh...</Text>
                </ModalContent>
                <ModalFooter>
                    <Button onClick={() => {setSettingsEditable(!settingsEditable); setSelectedSettings(props.globalSecuritySettings);setRevertSettingsModalOpen(false)}}>Revert</Button>
                    <Button typeButton="tertiary" onClick={() => setRevertSettingsModalOpen(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Prompt when={selectedSettings !== props.playlistSecuritySettings.securitySettings} message='' />
        </div>
                    
    )
}