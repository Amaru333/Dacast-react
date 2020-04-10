import React from 'react';
import { ToggleTextInfo, TextStyle, BorderStyle } from './SecurityStyle';
import { Card } from '../../../../components/Card/Card';
import { Text } from '../../../../components/Typography/Text';
import { Toggle } from '../../../../components/Toggle/toggle';
import { formSubmit, handleValidationProps, ValueInput } from '../../../utils/hooksFormSubmit';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { DateSinglePickerWrapper } from '../../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Table } from '../../../../components/Table/Table';
import { IconStyle, IconContainer } from '../../../../shared/Common/Icon';
import { Modal } from '../../../../components/Modal/Modal';
import { GeoRestrictionForm } from './GeoRestrictionForm';
import { DomainControlForm } from './DomainControlForm';
import { SecurityComponentProps } from '../../../containers/Settings/Security';
import { DomainControl, GeoRestriction } from '../../../redux-flow/store/Settings/Security/types';
import { Bubble } from '../../../../components/Bubble/Bubble';
import { useMedia } from '../../../../utils/utils';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Prompt } from 'react-router';

export const SecurityPage = (props: SecurityComponentProps) => {

    const [geoRestrictionModalOpened, setGeoRestrictionModalOpened] = React.useState<boolean>(false)
    const [domainControlModalOpened, setDomainControlModalOpened] = React.useState<boolean>(false)
    const [selectedItem, setSelectedItem] = React.useState<string>(null);
    const [toggleSchedulingVideo, setToggleSchedulingVideo] = React.useState<boolean>(props.securityDetails.videoScheduling.enabled)
    const [togglePasswordProtectedVideo, setTogglePasswordProtectedVideo] = React.useState<boolean>(props.securityDetails.passwordProtectedVideo.enabled)
    const [startDateTime, setStartDateTime] = React.useState<string>(null);
    const [endDateTime, setEndDateTime] = React.useState<string>(null);

    let smScreen = useMedia('(max-width: 780px)');



    const domainControlEmptyValues: DomainControl = {
        name: '',
        isDefault: false,
        domains: []
    }

    const geoRestrictionEmptyValues: GeoRestriction = {
        name: '',
        isDefault: false,
        countries: ['']
    };


    let formRef = React.useRef<HTMLFormElement>(null);
    let { value, validations, enabledSubmit, displayFormActionButtons } = formSubmit(formRef);

    React.useEffect(() => { }, [selectedItem])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, value: ValueInput) => {
        event.preventDefault();
        props.saveSettingsSecurityOptions({
            privateVideo: false,
            passwordProtectedVideo: {
                enabled: value['Password Protected Videos'].value,
                promptTime: value['promptTime'] ? value['promptTime'].value : null,
                password: value['password'] ? value['password'].value : null
            },
            videoScheduling: {
                enabled: value['Video Scheduling'].value,
                availableStart: value['availableStart'].value ? value['availableStart'].value : null,
                startDate: value['startDate'] ? value['startDate'].value : null,
                startTime: value['startTime'] ? value['startTime'].value : null,
                availableEnd: value['availableEnd'].value ? value['availableStart'].value : null,
                endDate: value['endDate'] ? value['endDate'].value : null,
                endTime: value['endTime'] ? value['endTime'].value : null
            }
        })
    }

    const tableHeaderElement = (tableType: string) => {
        return {data: [
            {cell: <Text className='col col-2' key={"groupTable" + tableType} size={14} weight="med" color="gray-1">Group</Text>},
            {cell: <Text className='col col-2' key={"DefaultTable" + tableType} size={14} weight="med" color="gray-1">Default</Text>},
            {cell: <Button className={"right mr2 sm-show"} key={"actionTable" + tableType} type="button" onClick={(event) => { event.preventDefault(); setSelectedItem(null); tableType === 'geoRestriction' ? setGeoRestrictionModalOpened(true) : setDomainControlModalOpened(true) }} sizeButton="xs" typeButton="secondary" buttonColor="blue">Add Group</Button>}
        ]}
    }

    const geoRestrictionBodyElement = () => {
        if (props.securityDetails.geoRestriction) {
            return props.securityDetails.geoRestriction.map((value, key) => {
                return {data: [
                    <Text key={key.toString() + value.name} size={14} weight="reg" color="gray-1">{value.name}</Text>,
                    value.isDefault ? <IconStyle coloricon='green' key={key.toString() + value.name}>checked</IconStyle>: <></>,
                    <IconContainer className="iconAction" key={key.toString() + value.name}><IconStyle onClick={(event) => { event.preventDefault(); props.deleteGeoRestrictionGroup(value) }} >delete</IconStyle><IconStyle onClick={(event) => { event.preventDefault(); setSelectedItem(value.name); setGeoRestrictionModalOpened(true) }}>edit</IconStyle> </IconContainer>
                ]}
            })
        }
    }

    const domainControlBodyElement = () => {
        if (props.securityDetails.domainControl) {
            return props.securityDetails.domainControl.map((value, key) => {
                return {data: [
                    <Text key={key.toString() + value.name} size={14} weight="reg" color="gray-1">{value.name}</Text>,
                    value.isDefault ? <IconStyle coloricon='green' key={key.toString() + value.name}>checked</IconStyle> : <></>,
                    <IconContainer className="iconAction" key={key.toString() + value.name}><IconStyle onClick={(event) => { event.preventDefault(); props.deleteDomainControlGroup(value) }}>delete</IconStyle><IconStyle onClick={(event) => { event.preventDefault(); setSelectedItem(value.name); setDomainControlModalOpened(true) }}>edit</IconStyle> </IconContainer>
                ]}
            })
        }
    }

    return (
        <div>
            <Bubble type='info' className='my2'>
                These global settings can be overriden by editing a specific piece of content (Video, Live Stream etc.)
            </Bubble>
            <Card>
                <form id='settingsPageForm' ref={formRef} onReset={() => { setTogglePasswordProtectedVideo(props.securityDetails.passwordProtectedVideo.enabled); setToggleSchedulingVideo(props.securityDetails.videoScheduling.enabled) }} onSubmit={event => handleSubmit(event, value)}>
                    <TextStyle className="py2" ><Text size={20} weight='med' color='gray-1'>Security</Text></TextStyle>

                    {/* <Toggle id="privateVideosToggle" label='Private Videos' defaultChecked={props.securityDetails.privateVideo} {...handleValidationProps('Private Videos', validations)}/>
                    <ToggleTextInfo className="mx3"><Text className="mx2 px1" size={14} weight='reg' color='gray-3'>They won't be dipslayed publicy on your website.</Text></ToggleTextInfo> */}
                    <div className='col col-12 mb1'>
                        <Toggle id="passwordProtectedVideosToggle" label='Password Protection' onChange={() => { setTogglePasswordProtectedVideo(!togglePasswordProtectedVideo) }} defaultChecked={props.securityDetails.passwordProtectedVideo.enabled} {...handleValidationProps('Password Protected Videos', validations)} />
                        <ToggleTextInfo className=""><Text size={14} weight='reg' color='gray-1'>Viewers must enter a password before viewing your content. </Text></ToggleTextInfo>
                        {
                            togglePasswordProtectedVideo ?
                                <div className='col col-12'>
                                    <Input
                                        type='text'
                                        defaultValue={props.securityDetails.passwordProtectedVideo.password ? props.securityDetails.passwordProtectedVideo.password : ''}
                                        className='col col-4 md-col-3 px1 mb1'
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

                        <Toggle id="videoScheduling" label='Content Scheduling' onChange={() => { setToggleSchedulingVideo(!toggleSchedulingVideo) }} defaultChecked={props.securityDetails.videoScheduling.enabled} {...handleValidationProps('Content Scheduling', validations)} />
                        <ToggleTextInfo className=""><Text size={14} weight='reg' color='gray-1'>The content will only be available between the times/dates you provide.</Text></ToggleTextInfo>
                        {
                            toggleSchedulingVideo ?
                                <>
                                    <div className='col col-12 flex items-center'>
                                        <DropdownSingle className='col col-4 md-col-3 mb2 mr1' id="availableStart" dropdownTitle="Available" dropdownDefaultSelect={props.securityDetails.videoScheduling.startDate ? 'Set Date and Time' : 'Always' } list={{ 'Always': false, "Set Date and Time": false }} callback={(value: string) => { setStartDateTime(value) }} />

                                        {
                                            startDateTime === "Set Date and Time" ?
                                                <>
                                                    <DateSinglePickerWrapper className='col col-4 md-col-3 mt2' />
                                                    <Input
                                                        type='time'
                                                        defaultValue={props.securityDetails.passwordProtectedVideo.promptTime ? props.securityDetails.passwordProtectedVideo.promptTime : '00:00:00'}
                                                        className='col col-3 md-col-2 px1 mt1'
                                                        disabled={false}
                                                        id='startTime'
                                                        pattern="[0-9]{2}:[0-9]{2}"
                                                        required
                                                    />
                                                </>
                                                : null
                                        }
                                    </div>

                                    <div className='col col-12 flex items-center'>
                                        <DropdownSingle className='col col-4 md-col-3 mb2 mr1' id="availableEnd" dropdownTitle="Until" dropdownDefaultSelect={props.securityDetails.videoScheduling.endDate ? 'Set Date and Time' : 'Forever' } list={{ 'Forever': false, "Set Date and Time": false }} callback={(value: string) => { setEndDateTime(value) }} />

                                        {
                                            endDateTime === "Set Date and Time" ?
                                                <>
                                                    <DateSinglePickerWrapper className='col col-4 md-col-3 mt2' />
                                                    <Input
                                                        type='time'
                                                        defaultValue={props.securityDetails.passwordProtectedVideo.promptTime ? props.securityDetails.passwordProtectedVideo.promptTime : '00:00:00'}
                                                        className='col col-3 md-col-2 mt1 px1'
                                                        disabled={false}
                                                        id='endTime'
                                                        pattern="[0-9]{2}:[0-9]{2}"
                                                        required
                                                    />
                                                </> : null
                                        }
                                    </div>
                                </>
                                :
                                null
                        }
                    </div>

                    <BorderStyle className="p1" />

                    <TextStyle className="py2" ><Text size={20} weight='med' color='gray-1'>Geo-Restriction</Text></TextStyle>

                    <TextStyle className="pb2" ><Text size={14} weight='reg' color='gray-1'>Restrict access to your content to specific countries and regions.</Text></TextStyle>
                    <div className="clearfix">
                        <Button className={"left col col-12 xs-show"} type="button" onClick={(event) => { event.preventDefault(); setSelectedItem(null); setGeoRestrictionModalOpened(true) }} sizeButton="xs" typeButton="secondary" buttonColor="blue">Add Group</Button>
                    </div>

                    <Table className="col-12" id="geoRestrictionTable" headerBackgroundColor="gray-10" header={tableHeaderElement('geoRestriction')} body={geoRestrictionBodyElement()} />

                    <BorderStyle className="py1" />

                    <TextStyle className="py2" ><Text size={20} weight='med' color='gray-1'>Domain Control</Text></TextStyle>

                    <TextStyle className="pb2"><Text size={14} weight='reg' color='gray-1'>Restrict access to your content to specific websites.</Text></TextStyle>
                    <div className="clearfix">
                        <Button className={"col col-12 xs-show "} type="button" onClick={(event) => { event.preventDefault(); setSelectedItem(null); setDomainControlModalOpened(true) }} sizeButton="xs" typeButton="secondary" buttonColor="blue">Add Group</Button>
                    </div>
                    <Table className="col-12 " id="domainControlTable" headerBackgroundColor="gray-10" header={tableHeaderElement('domainControl')} body={domainControlBodyElement()} />
                </form>
            </Card>
            {
                displayFormActionButtons ?
                    <div>
                        <Button disabled={!enabledSubmit} form='settingsPageForm' type='submit' className="my2" typeButton='primary' buttonColor='blue'>Save</Button>
                        <Button type="reset" form="settingsPageForm" className="m2" typeButton='tertiary' buttonColor='blue'>Discard</Button>
                    </div>
                    : null
            }

            <Modal hasClose={false} title={(selectedItem ? 'Edit' : 'Create') + ' Geo-Restricion Group'} toggle={() => setGeoRestrictionModalOpened(!geoRestrictionModalOpened)} size='small' opened={geoRestrictionModalOpened}>
                {
                    geoRestrictionModalOpened ?
                        <GeoRestrictionForm item={selectedItem && props.securityDetails.geoRestriction.filter(item => item.name === selectedItem).length > 0 ? props.securityDetails.geoRestriction.filter(item => item.name === selectedItem)[0] : geoRestrictionEmptyValues} toggle={setGeoRestrictionModalOpened} submit={props.saveGeoRestrictionGroup} />
                        : null
                }
            </Modal>

            <Modal hasClose={false} title={(selectedItem ? 'Edit' : 'Create') + ' Domain Group'} toggle={() => setDomainControlModalOpened(!domainControlModalOpened)} size='small' opened={domainControlModalOpened}>
                {
                    domainControlModalOpened ? 
                        <DomainControlForm item={selectedItem && props.securityDetails.domainControl.filter(item => item.name === selectedItem).length > 0 ? props.securityDetails.domainControl.filter(item => item.name === selectedItem)[0] : domainControlEmptyValues} toggle={setDomainControlModalOpened} submit={props.saveDomainControlGroup} />
                        : null
                }
            </Modal>
            {/* Needs save prompt adding when connected to endpoint */}
            <Prompt when={true} message='' />
        </div>
    )
}