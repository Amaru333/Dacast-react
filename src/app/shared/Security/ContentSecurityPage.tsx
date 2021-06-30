import React from 'react';
import { Bubble } from '../../../components/Bubble/Bubble';
import { ToggleTextInfo, Header, BubbleContent } from './SecurityStyle';
import { Text } from '../../../components/Typography/Text';
import { Toggle } from '../../../components/Toggle/toggle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { ContentSecuritySettings, SecuritySettings } from '../../redux-flow/store/Settings/Security';
import { Modal, ModalContent, ModalFooter } from '../../../components/Modal/Modal';
import { Card } from '../../../components/Card/Card';
import { IconStyle } from '../../../shared/Common/Icon';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Prompt } from 'react-router';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';
import { Divider } from '../../../shared/MiscStyles';
import { DateTimePicker } from '../../../components/FormsComponents/Datepicker/DateTimePicker';
import { DisabledSection } from '../Common/MiscStyle';
import { ContentType } from '../../redux-flow/store/Common/types';


interface ContentSecurityComponentProps {
    contentType: ContentType
    contentSecuritySettings: ContentSecuritySettings;
    globalSecuritySettings: SecuritySettings;
    contentId: string;
    getSettingsSecurityOptions: (contentId: string, contentType: ContentType) => Promise<void>;
    saveContentSecuritySettings: (data: SecuritySettings, contentId: string, contentType: ContentType) => Promise<void>;
    lockContent: (contentId: string, contentType: ContentType) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

export const ContentSecurityPage = (props: ContentSecurityComponentProps) => {
    
    const [togglePasswordProtectedVideo, setTogglePasswordProtectedVideo] = React.useState<boolean>(props.contentSecuritySettings.securitySettings.passwordProtection && props.contentSecuritySettings.securitySettings.passwordProtection.password ? true : false)
    const [hasToggleChanged, setHasToggleChanged] = React.useState<boolean>(false)
    const [settingsEditable, setSettingsEditable] = React.useState<boolean>(!props.contentSecuritySettings.securitySettings.locked )
    const [selectedSettings, setSelectedSettings] = React.useState<SecuritySettings>(props.contentSecuritySettings.securitySettings)
    const [editSettingsModalOpen, setEditSettingsModalOpen] = React.useState<boolean>(false)
    const [revertSettingsModalOpen, setRevertSettingsModalOpen] = React.useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const geoRestrictionDropdownList = props.globalSecuritySettings.geoRestriction.map((item): DropdownSingleListItem => {
        return {
            title: item.name,
            data: item
        }
    })

    const domainControlDropdownList = props.globalSecuritySettings.domainControl.map((item): DropdownSingleListItem => {
        return {
            title: item.name,
            data: item
        }
    })

    const [startTime, setStartTime] = React.useState<number>(Math.floor(selectedSettings.contentScheduling.startTime/ 1000))
    const [endTime, setEndTime] = React.useState<number>(Math.floor( selectedSettings.contentScheduling.endTime / 1000))
    const [startTimezone, setStartTimezone] = React.useState<string>(selectedSettings.contentScheduling.startTimezone)
    const [endTimezone, setEndTimezone] = React.useState<string>(selectedSettings.contentScheduling.endTimezone)

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
        
        props.saveContentSecuritySettings(
            {
                passwordProtection: selectedSettings.passwordProtection,
                contentScheduling: {
                    startTime: startTime * 1000, 
                    startTimezone: startTimezone,
                    endTime: endTime * 1000,
                    endTimezone: endTimezone
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
                        <div className='col col-12 mb2 flex items-end'>
                            <DateTimePicker 
                                dropdownTitle="Available"
                                id="dateStart"
                                hideOption="Always"
                                callback={(ts:number, tz: string) => { setHasToggleChanged(true); setStartTime(ts); setStartTimezone(tz)  }}
                                defaultTs={startTime}
                                timezone={startTimezone}
                                showTimezone={true}
                            />
                        </div>
                        <div className='col col-12 mb2 flex items-end'>
                            <DateTimePicker 
                                dropdownTitle="Until"
                                id="dateEnd"
                                minDate={startTime ? startTime : undefined}
                                hideOption="Forever"
                                callback={(ts:number, tz: string) => { setHasToggleChanged(true); setEndTime(ts); setEndTimezone(tz) }}
                                defaultTs={endTime}
                                timezone={endTimezone}
                                showTimezone={true}
                            />
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
                            list={geoRestrictionDropdownList} 
                            dropdownDefaultSelect={props.globalSecuritySettings.geoRestriction.filter(f => f.id === selectedSettings.selectedGeoRestriction).length > 0 ? props.globalSecuritySettings.geoRestriction.filter(f => f.id === selectedSettings.selectedGeoRestriction)[0].name : props.globalSecuritySettings.geoRestriction.filter(f => f.isDefault)[0].name} 
                            callback={(item: DropdownSingleListItem) => {setHasToggleChanged(true);setSelectedSettings({...selectedSettings, selectedGeoRestriction: item.data.id})}} 
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
                                list={domainControlDropdownList} 
                                dropdownDefaultSelect={props.globalSecuritySettings.domainControl.filter(f => f.id === selectedSettings.selectedDomainControl).length > 0 ? props.globalSecuritySettings.domainControl.filter(f => f.id === selectedSettings.selectedDomainControl)[0].name : props.globalSecuritySettings.domainControl.filter(f => f.isDefault)[0].name} 
                                callback={(item: DropdownSingleListItem) => {setHasToggleChanged(true);setSelectedSettings({...selectedSettings, selectedDomainControl: item.data.id})}} 
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