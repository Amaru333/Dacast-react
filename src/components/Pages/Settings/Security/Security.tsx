import React from 'react';
import {ToggleTextInfo, TextStyle, BorderStyle, IconContainer, IconCheck} from './SecurityStyle';
import { Card } from '../../../Card/Card';
import { Text } from '../../../Typography/Text';
import { Toggle } from '../../../Toggle/toggle';
import { formSubmit, handleValidationProps, ValueInput } from '../../../../utils/hooksFormSubmit';
import { Input } from '../../../FormsComponents/Input/Input';
import { DateSinglePicker } from '../../../FormsComponents/Datepicker/DateSinglePicker';
import { Button } from '../../../FormsComponents/Button/Button';
import { Table } from '../../../Table/Table';
import { Icon } from '@material-ui/core';
import { Modal } from '../../../Modal/Modal';
import { GeoRestrictionForm } from './GeoRestrictionForm';
import { DomainControlForm } from './DomainControlForm';
import { SettingsSecurityDetails, DomainControl, GeoRestriction } from '../../../../redux-flow/store/Settings/Security/types';
import { Bubble } from '../../../Bubble/Bubble';

interface SecurityComponentProps {
    securityDetails: SettingsSecurityDetails;
    saveSettingsSecurityOptions: Function;
    saveGeoRestrictionGroup: Function;
    deleteGeoRestrictionGroup: Function;
    saveDomainControlGroup: Function;
    deleteDomainControlGroup: Function;
}

export const SecurityPage = (props: SecurityComponentProps) => {

    const [geoRestrictionModalOpened, setGeoRestrictionModalOpened] = React.useState<boolean>(false)
    const [domainControlModalOpened, setDomainControlModalOpened] = React.useState<boolean>(false)
    const [selectedItem, setSelectedItem] = React.useState<string>(null);

    React.useEffect(() => {}, [selectedItem])

    const domainControlEmptyValues: DomainControl = {
        name: '',
        isDefault: false,
        domains: []
    }

    const geoRestrictionEmptyValues: GeoRestriction = {
        name: '',
        isDefault: false,
        countries: ['']
    }

    let formRef = React.useRef<HTMLFormElement>(null);   
    let {value, validations, enabledSubmit} = formSubmit(formRef);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, value: ValueInput) => {
        event.preventDefault();
        props.saveSettingsSecurityOptions({
            privateVideo: value['Private Videos'].value,
            passowrdProtectedVideo: {
                enabled: value['Password Protected Videos'].value,
                promptTime: value['promptTime'] ? value['promptTime'].value : null,
                password: value['password'] ? value['password'].value : null
            },
            videoScheduling: {
                enabled: value['Video Scheduling'].value,
                startDate: value['startDate'] ? value['startDate'].value : null,
                startTime: value['startTime'] ? value['startTime'].value : null,
                endDate: value['endDate'] ? value['endDate'].value : null,
                endTime: value['endTime'] ? value['endTime'].value : null
            }
        })
    }

    const tableHeaderElement= (tableType: string) => {
        return[
            <Text className='col col-2' key={"groupTable" + tableType} size={14}  weight="med" color="gray-1">Group</Text>,
            <Text className='col col-2' key={"DefaultTable" + tableType} size={14}  weight="med" color="gray-1">Default</Text>,
            <Button key={"actionTable" + tableType} type="button" onClick={(event) => {event.preventDefault();setSelectedItem(null);tableType === 'geoRestriction' ? setGeoRestrictionModalOpened(true) : setDomainControlModalOpened(true)}} className="right mr2" sizeButton="xs" typeButton="secondary" buttonColor="blue">Add Group</Button>
        ]
    }

    const geoRestrictionBodyElement= () => {
        if(props.securityDetails.geoRestriction) {
            return props.securityDetails.geoRestriction.map((value, key) => {
                return [
                    <Text key={key.toString() +value.name} size={14}  weight="reg" color="gray-1">{value.name}</Text>,
                    value.isDefault ? <IconCheck><Icon key={key.toString() +value.name}>checked</Icon></IconCheck> : <></>,
                    <IconContainer className="iconAction" key={key.toString()+value.name}><Icon onClick={(event) => {event.preventDefault();props.deleteGeoRestrictionGroup(value)}} >delete</Icon><Icon onClick={(event) => {event.preventDefault();setSelectedItem(value.name);  setGeoRestrictionModalOpened(true) }}>edit</Icon> </IconContainer>
                ]
            })
        }
    }

    const domainControlBodyElement= () => {
        if(props.securityDetails.domainControl) {
            return props.securityDetails.domainControl.map((value, key) => {
                return [
                    <Text key={key.toString() +value.name} size={14}  weight="reg" color="gray-1">{value.name}</Text>,
                    value.isDefault ? <IconCheck><Icon key={key.toString() +value.name}>checked</Icon></IconCheck> : <></>,
                    <IconContainer className="iconAction" key={key.toString()+value.name}><Icon onClick={(event) => {event.preventDefault();props.deleteDomainControlGroup(value)}}>delete</Icon><Icon onClick={(event) => {event.preventDefault();setSelectedItem(value.name); setDomainControlModalOpened(true) }}>edit</Icon> </IconContainer>
                ]
            })
        }
    }

    return (
        <div>
            <Bubble type='info' className='my2'>
            These global settings can be overriden by editing a specific piece of content (Video, Live Stream etc.)            </Bubble>
            <Card>
                <form id='settingsPageForm' ref={formRef} onSubmit={event => handleSubmit(event, value)}>
                    <TextStyle className="px1 py2" ><Text size={20} weight='med' color='gray-1'>Security</Text></TextStyle>

                    <Toggle id="privateVideosToggle" label='Private Videos' defaultChecked={props.securityDetails.privateVideo} {...handleValidationProps('Private Videos', validations)}/>
                    <ToggleTextInfo className="mx3"><Text className="mx2 px1" size={14} weight='reg' color='gray-3'>They won't be dipslayed publicy on your website.</Text></ToggleTextInfo>
                    <div className='col col-12 mb1'>
                        <Toggle id="passowrdProtectedVideosToggle" label='Password Protected Videos' defaultChecked={props.securityDetails.passwordProtectedVideo.enabled} {...handleValidationProps('Password Protected Videos', validations)}/>
                        <ToggleTextInfo className="mx3"><Text className="mx2 px1" size={14} weight='reg' color='gray-3'>Users will be prompted to enter a password before watching. For best security practices you should change your password every 6 months.</Text></ToggleTextInfo>
                        {
                            value['Password Protected Videos'] && value['Password Protected Videos'].value || props.securityDetails.videoScheduling.enabled && value['Password Protected Videos'] && typeof value['Password Protected Videos'].value === 'string' ?
                                <div className='col col-12 mx3 '>
                                    <Input 
                                        type='time' 
                                        defaultValue={props.securityDetails.passwordProtectedVideo.promptTime ? props.securityDetails.passwordProtectedVideo.promptTime : '00:00:00'}
                                        className='col col-1 ml2 px1 mb1'
                                        disabled={false} 
                                        id='promptTime' 
                                        label='Prompt Time' 
                                        required
                                    />
        
                                    <Input 
                                        type='password' 
                                        defaultValue={props.securityDetails.passwordProtectedVideo.password ? props.securityDetails.passwordProtectedVideo.password : ''} 
                                        className='col col-2 px1 mb1'
                                        disabled={false} 
                                        id='password' 
                                        label='Password' 
                                        placeholder='Password'
                                        required
                                    />
                                </div>
                                : 
                                null
                        }

                    </div>

                    <div className='col col-12'>

                        <Toggle id="videoScheduling" label='Video Scheduling' defaultChecked={props.securityDetails.videoScheduling.enabled} {...handleValidationProps('Video Scheduling', validations)}/>
                        <ToggleTextInfo className="mx3"><Text className="mx2 px1" size={12} weight='reg' color='gray-3'>The video will only be available between the times/dates you provide.</Text></ToggleTextInfo>
                        {   
                            value['Video Scheduling'] && value['Video Scheduling'].value || props.securityDetails.videoScheduling.enabled && value['Video Scheduling'] && typeof value['Video Scheduling'].value === 'string' ?
                                <>
                                    <div className='col col-12 mx3'>
                                        <div className='col pl1 ml2 mb2'>
                                            <DateSinglePicker 
                                                DatepickerTitle='Start Date'
                                                id="startDate"
                                                callback={(startDateValue: string) => { value = {...value, ['startDate']: {value: startDateValue}}}}

                                            />
                                        </div>

                                        <Input 
                                            type='time' 
                                            defaultValue={props.securityDetails.passwordProtectedVideo.promptTime ? props.securityDetails.passwordProtectedVideo.promptTime : '00:00:00'}
                                            className='col col-1 px1'
                                            disabled={false} 
                                            id='startTime' 
                                            label='Start Time' 
                                            required
                                        />


                                    </div>
                                    <div className='col col-12 mx3'>
                                        <div className='col pl1 ml2 mb2' >
                                            <DateSinglePicker 
                                                DatepickerTitle='End Date' 
                                                id="endDate"
                                                callback={(endDateValue: string) => { value = {...value, ['endDate']: {value: endDateValue}}}}
                                            />
                                        </div>
                                        <Input 
                                            type='time' 
                                            defaultValue={props.securityDetails.passwordProtectedVideo.promptTime ? props.securityDetails.passwordProtectedVideo.promptTime : '00:00:00'}
                                            className='col col-1 px1'
                                            disabled={false} 
                                            id='endTime' 
                                            label='End Time' 
                                            required
                                        />            


                                    </div>
                                </>
                                :
                                null
                        }


                    </div>

                    <BorderStyle className="p1 mx1" />

                    <TextStyle className="px1 py2" ><Text size={20} weight='med' color='gray-1'>Geo-restriction</Text></TextStyle>

                    <TextStyle className="px1 py2" ><Text size={14} weight='reg' color='gray-3'>Whatever</Text></TextStyle>

                    <Table className="col-12 mb1" id="geoRestrictionTable" header={tableHeaderElement('geoRestriction')} body={geoRestrictionBodyElement()} />

                    <BorderStyle className="p1 mx1" />

                    <TextStyle className="px1 py2" ><Text size={20} weight='med' color='gray-1'>Domain Control</Text></TextStyle>

                    <TextStyle className="px1 py2" ><Text size={14} weight='reg' color='gray-3'>That's it</Text></TextStyle>

                    <Table className="col-12" id="domainControlTable" header={tableHeaderElement('domainControl')} body={domainControlBodyElement()} />
                </form>
            </Card>
            <div>
                <Button disabled={!enabledSubmit} form='settingsPageForm' type='submit' className="my2" typeButton='primary' buttonColor='blue'>Save</Button>
                <Button type='reset' form="settingsPageForm" onClick={() => {}} className="m2" typeButton='tertiary' buttonColor='blue'>Discard</Button>
            </div>
            <Modal hasClose={false} title={(selectedItem ? 'Edit' : 'Create')  + ' Geo-restricion Group'} toggle={() => setGeoRestrictionModalOpened(!geoRestrictionModalOpened)} size='small' opened={geoRestrictionModalOpened}>
                <GeoRestrictionForm item={selectedItem && props.securityDetails.geoRestriction.filter(item => item.name === selectedItem).length > 0 ? props.securityDetails.geoRestriction.filter(item => item.name === selectedItem)[0] : geoRestrictionEmptyValues} toggle={setGeoRestrictionModalOpened} submit={props.saveGeoRestrictionGroup} />
            </Modal>

            <Modal hasClose={false} title={(selectedItem ? 'Edit' : 'Create') + ' Domain Group'} toggle={() => setDomainControlModalOpened(!domainControlModalOpened)} size='small' opened={domainControlModalOpened}>
                <DomainControlForm item={selectedItem  && props.securityDetails.domainControl.filter(item => item.name === selectedItem).length > 0 ? props.securityDetails.domainControl.filter(item => item.name === selectedItem)[0] : domainControlEmptyValues} toggle={setDomainControlModalOpened} submit={props.saveDomainControlGroup} />
            </Modal>

        </div>
    )
}