import React from 'react';
import { ToggleTextInfo, TextStyle, BorderStyle } from './SecurityStyle';
import { Card } from '../../../../components/Card/Card';
import { Text } from '../../../../components/Typography/Text';
import { Toggle } from '../../../../components/Toggle/toggle';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { DateSinglePickerWrapper } from '../../../../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Table } from '../../../../components/Table/Table';
import { IconStyle, IconContainer, ActionIcon } from '../../../../shared/Common/Icon';
import { Modal } from '../../../../components/Modal/Modal';
import { GeoRestrictionForm } from './GeoRestrictionForm';
import { DomainControlForm } from './DomainControlForm';
import { SecurityComponentProps } from '../../../containers/Settings/Security';
import { DomainControl, GeoRestriction, SecuritySettings } from '../../../redux-flow/store/Settings/Security/types';
import { Bubble } from '../../../../components/Bubble/Bubble';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Prompt } from 'react-router';
import moment from 'moment';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { DropdownListType } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';

var momentTZ = require('moment-timezone')

export const SecurityPage = (props: SecurityComponentProps) => {

    const initTimestampValues = (ts: number): {date: string; time: string} => {
        if(ts > 0 ) {
            return {date: moment(ts).format('YYYY-MM-DD hh:mm').split(' ')[0], time: moment(ts).format('YYYY-MM-DD hh:mm').split(' ')[1]}
        } 
        return {date: moment().toString(), time: '00:00'}
    }

    const [geoRestrictionModalOpened, setGeoRestrictionModalOpened] = React.useState<boolean>(false)
    const [domainControlModalOpened, setDomainControlModalOpened] = React.useState<boolean>(false)
    const [selectedItem, setSelectedItem] = React.useState<string>(null);
    const [toggleSchedulingVideo, setToggleSchedulingVideo] = React.useState<boolean>(props.securityDetails.contentScheduling.endTime || props.securityDetails.contentScheduling.startTime ? true : false)
    const [togglePasswordProtectedVideo, setTogglePasswordProtectedVideo] = React.useState<boolean>(props.securityDetails.passwordProtection.password ? true : false)
    const [startDateTime, setStartDateTime] = React.useState<string>(props.securityDetails.contentScheduling.startTime > 0 ? 'Set Date and Time' : 'Until');
    const [endDateTime, setEndDateTime] = React.useState<string>(props.securityDetails.contentScheduling.endTime > 0 ? 'Set Date and Time' : 'Forever');
    const [securityDetails, setSecurityDetails] = React.useState<SecuritySettings>(props.securityDetails)
    const [displayFormActionButtons, setDisplayformActionButtons] = React.useState<boolean>(false)
    const [submitLoading, setSubmitLoading] = React.useState<boolean>(false)
    const [startDateTimeValue, setStartDateTimeValue] = React.useState<{date: string; time: string; timezone: string;}>({date: initTimestampValues(props.securityDetails.contentScheduling.startTime).date, time: initTimestampValues(props.securityDetails.contentScheduling.startTime).time, timezone: momentTZ.tz.guess()})
    const [endDateTimeValue, setEndDateTimeValue] = React.useState<{date: string; time: string; timezone: string;}>({date: initTimestampValues(props.securityDetails.contentScheduling.endTime).date, time: initTimestampValues(props.securityDetails.contentScheduling.endTime).time, timezone: momentTZ.tz.guess()})

    React.useEffect(() => {
        if (props.securityDetails !== securityDetails) {
            setDisplayformActionButtons(true)
        }
    }, [securityDetails])

    React.useEffect(() => {
        setSecurityDetails(props.securityDetails)
    }, [props.securityDetails])

    const onSubmit = () => {
        setSubmitLoading(true);
        let startTimeTs = (toggleSchedulingVideo && startDateTime === 'Set Date and Time') ?  momentTZ.tz(`${startDateTimeValue.date} ${startDateTimeValue.time}`, `${startDateTimeValue.timezone}`).valueOf() : 0
        let endTimeTs = (toggleSchedulingVideo && endDateTime === 'Set Date and Time') ? momentTZ.tz(`${endDateTimeValue.date} ${endDateTimeValue.time}`, `${endDateTimeValue.timezone}`).valueOf() : 0
        props.saveSettingsSecurityOptions({...securityDetails, contentScheduling: {startTime:startTimeTs, endTime: endTimeTs} }, () => {
            setSubmitLoading(false);
            setDisplayformActionButtons(false);
        })
    }

    const domainControlEmptyValues: DomainControl = {
        id: '',
        name: '',
        isDefault: false,
        values: [],
        restrictionType: 'domain-restriction'
    }

    const geoRestrictionEmptyValues: GeoRestriction = {
        id: '',
        name: '',
        isDefault: false,
        values: [''],
        restrictionType: 'geo-restriction'
    };

    const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        let password: string = event.currentTarget.value
        setSecurityDetails({...securityDetails, passwordProtection: { password: password.length > 0 ? password : null}})
        setDisplayformActionButtons(true)
    }



    const tableHeaderElement = (tableType: string) => {
        return {
            data: [
                { cell: <Text className='col col-2' key={"groupTable" + tableType} size={14} weight="med" color="gray-1">Group</Text> },
                { cell: <Text className='col col-2' key={"DefaultTable" + tableType} size={14} weight="med" color="gray-1">Default</Text> },
                { cell: <Button className={"right mr2 sm-show"} key={"actionTable" + tableType} type="button" onClick={(event) => { event.preventDefault(); setSelectedItem(null); tableType === 'geoRestriction' ? setGeoRestrictionModalOpened(true) : setDomainControlModalOpened(true) }} sizeButton="xs" typeButton="secondary" buttonColor="blue">Add Group</Button> }
            ]
        }
    }

    const geoRestrictionBodyElement = () => {
        if (props.securityDetails.geoRestriction) {
            return props.securityDetails.geoRestriction.map((value, key) => {
                return {
                    data: [
                        <Text key={key.toString() + value.name} size={14} weight="reg" color="gray-1">{value.name}</Text>,
                        value.isDefault ? <IconStyle coloricon='green' key={key.toString() + value.name}>checked</IconStyle> : <></>,
                        <IconContainer className="iconAction" key={key.toString() + value.name}>

                                { value.id !== '-1' &&
                                    <>
                                        <ActionIcon>
                                            <IconStyle id={"geoRestrictionDelete" + key} onClick={(event) => { event.preventDefault(); props.deleteGeoRestrictionGroup(value) }} >delete</IconStyle>
                                            <Tooltip target={"geoRestrictionDelete" + key}>Delete</Tooltip>
                                        </ActionIcon>
                                        <ActionIcon>
                                        <IconStyle id={"geoRestrictionEdit" + key} onClick={(event) => { event.preventDefault(); setSelectedItem(value.name); setGeoRestrictionModalOpened(true) }}>edit</IconStyle>
                                        <Tooltip target={"geoRestrictionEdit" + key}>Edit</Tooltip>
                                        </ActionIcon>  
                                    </>
                                }

                        </IconContainer>
                    ]
                }
            })
        }
    }

    const domainControlBodyElement = () => {
        if (props.securityDetails.domainControl) {
            return props.securityDetails.domainControl.map((value, key) => {
                return {
                    data: [
                        <Text key={key.toString() + value.name} size={14} weight="reg" color="gray-1">{value.name}</Text>,
                        value.isDefault ? <IconStyle coloricon='green' key={key.toString() + value.name}>checked</IconStyle> : <></>,
                        <IconContainer className="iconAction" key={key.toString() + value.name}>

                                {
                                    value.id !== '-1' &&
                                    <>
                                        <ActionIcon>
                                            <IconStyle id={"domainControlDelete" + key} onClick={() => { props.deleteDomainControlGroup(value) }}>delete</IconStyle>
                                            <Tooltip target={"domainControlDelete" + key}>Delete</Tooltip>
                                        </ActionIcon>
                                        <ActionIcon>
                                            <IconStyle id={"domainControlEdit" + key} onClick={() => { setSelectedItem(value.name); setDomainControlModalOpened(true) }}>edit</IconStyle>
                                            <Tooltip target={"domainControlEdit" + key}>Edit</Tooltip>
                                        </ActionIcon>
                                    </>
                                }
                               
                        </IconContainer>
                    ]
                }
            })
        }
    }

    return (
        <div>
            <Bubble type='info' className='my2'>
                These global settings can be overriden by editing a specific piece of content (Video, Live Stream etc.)
            </Bubble>
            <Card>
                <div id='settingsPageForm'>
                    <TextStyle className="py2" ><Text size={20} weight='med' color='gray-1'>Security</Text></TextStyle>

                    {/* <Toggle id="privateVideosToggle" label='Private Videos' defaultChecked={props.securityDetails.privateVideo} {...handleValidationProps('Private Videos', validations)}/>
                    <ToggleTextInfo className="mx3"><Text className="mx2 px1" size={14} weight='reg' color='gray-3'>They won't be dipslayed publicy on your website.</Text></ToggleTextInfo> */}
                    <div className='col col-12 mb1'>
                        <Toggle id="passwordProtectedVideosToggle" label='Password Protection' onChange={() => { setDisplayformActionButtons(true) ;setTogglePasswordProtectedVideo(!togglePasswordProtectedVideo) }} defaultChecked={props.securityDetails.passwordProtection.password ? true : false} />
                        <ToggleTextInfo className=""><Text size={14} weight='reg' color='gray-1'>Viewers must enter a password before viewing your content. </Text></ToggleTextInfo>
                        {
                            togglePasswordProtectedVideo &&
                            <div className='col col-12 mb1'>
                                <Input
                                    type='text'
                                    className='col col-4 md-col-3 pr1 mb2'
                                    id='password'
                                    label='Password'
                                    placeholder='Password'
                                    onChange={(event) =>{ handlePasswordChange(event)}}
                                
                                />
                            </div>
                        }
                    </div>

                    <div className='col col-12'>

                        <Toggle id="videoScheduling" label='Content Scheduling' onChange={() => { setDisplayformActionButtons(true); setToggleSchedulingVideo(!toggleSchedulingVideo) }} defaultChecked={props.securityDetails.contentScheduling.startTime || props.securityDetails.contentScheduling.endTime ? true : false} />
                        <ToggleTextInfo className=""><Text size={14} weight='reg' color='gray-1'>The content will only be available between the times/dates you provide.</Text></ToggleTextInfo>
                        {
                            toggleSchedulingVideo &&
                            <>
                                <div className='col col-12 flex items-center'>
                                    <DropdownSingle className='col col-12 md-col-3 mb2 mr2' id="availableStart" dropdownTitle="Available" dropdownDefaultSelect={props.securityDetails.contentScheduling.startTime > 0 ? 'Set Date and Time' : 'Always'} list={{ 'Always': false, "Set Date and Time": false }} callback={(value: string) => { setDisplayformActionButtons(true);setStartDateTime(value) }} />
                                    {startDateTime === "Set Date and Time" &&
                                        <>
                                            <DateSinglePickerWrapper
                                                date={moment(startDateTimeValue.date)}
                                                callback={(date: string) => { setDisplayformActionButtons(true);setStartDateTimeValue({...startDateTimeValue, date: date}) }}
                                                className='col col-6 md-col-3 mr2 mt2' />
                                            <Input
                                                type='time'
                                                defaultValue={startDateTimeValue.time}
                                                onChange={(event) =>{ setDisplayformActionButtons(true);setStartDateTimeValue({...startDateTimeValue, time: event.currentTarget.value})} }
                                                className='col col-6 md-col-2 mt2'
                                                disabled={false}
                                                id='endTime'
                                                pattern="[0-9]{2}:[0-9]{2}"
                                                required
                                            />

                                            <DropdownSingle 
                                                hasSearch 
                                                id='startDateTimezoneDropdown' 
                                                dropdownDefaultSelect={startDateTimeValue.timezone} 
                                                className='col col-3 px2 mb2' 
                                                dropdownTitle='Timezone' 
                                                callback={(value: string) => {setDisplayformActionButtons(true);setStartDateTimeValue({...startDateTimeValue, timezone: value.split(' ')[0]})}} 
                                                list={momentTZ.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + momentTZ.tz(item).format('Z z') + ')']: false}}, {})} 
                                            />  
                                        </>
                                    }
                                </div>
                                <div className='col col-12 flex items-center'>
                                    <DropdownSingle className='col col-4 md-col-3 mb2 mr2' id="availableEnd" dropdownTitle="Until" dropdownDefaultSelect={props.securityDetails.contentScheduling.endTime > 0 ? 'Set Date and Time' : 'Forever'} list={{ 'Forever': false, "Set Date and Time": false }} callback={(value: string) => { setDisplayformActionButtons(true);setEndDateTime(value) }} />

                                    {
                                        endDateTime === "Set Date and Time" &&
                                        <>
                                            <DateSinglePickerWrapper
                                                date={moment(endDateTimeValue.date)}
                                                callback={(date: string) => { setDisplayformActionButtons(true);setEndDateTimeValue({...endDateTimeValue, date: date}) }}
                                                className='col col-4 md-col-3 mr2 mt2' />
                                            <Input
                                                type='time'
                                                defaultValue={endDateTimeValue.time}
                                                onChange={(event) => {setDisplayformActionButtons(true);setEndDateTimeValue({...endDateTimeValue, time: event.currentTarget.value})}}
                                                className='col col-3 md-col-2 mt2'
                                                disabled={false}
                                                id='endTime'
                                                pattern="[0-9]{2}:[0-9]{2}"
                                                required
                                            />
                                            <DropdownSingle 
                                                hasSearch 
                                                id='endDateTimezoneDropdown' 
                                                dropdownDefaultSelect={endDateTimeValue.timezone} 
                                                className='col col-3 px2 mb2' 
                                                dropdownTitle='Timezone' 
                                                callback={(value: string) => {setDisplayformActionButtons(true);setEndDateTimeValue({...endDateTimeValue, timezone: value.split(' ')[0]})}} 
                                                list={momentTZ.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + momentTZ.tz(item).format('Z z') + ')']: false}}, {})} 
                                            />
                                        </>
                                    }
                                </div>
                            </>
                        }
                    </div>
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

            </Card>
            {
                displayFormActionButtons &&
                <div>
                    <Button onClick={() => {onSubmit()}} isLoading={submitLoading} className="my2" typeButton='primary' buttonColor='blue'>Save</Button>
                    <Button onClick={() => { setDisplayformActionButtons(false);props.saveSettingsSecurityOptions(props.securityDetails) }} type="reset" form="settingsPageForm" className="m2" typeButton='tertiary' buttonColor='blue'>Discard</Button>
                </div>
            }

            <Modal className='x-visible' hasClose={false} modalTitle={(selectedItem ? 'Edit' : 'Create') + ' Geo-Restriction Group'} toggle={() => setGeoRestrictionModalOpened(!geoRestrictionModalOpened)} size='small' opened={geoRestrictionModalOpened}>
                {
                    geoRestrictionModalOpened && <GeoRestrictionForm item={selectedItem && props.securityDetails.geoRestriction.filter(item => item.name === selectedItem).length > 0 ? props.securityDetails.geoRestriction.filter(item => item.name === selectedItem)[0] : geoRestrictionEmptyValues} toggle={setGeoRestrictionModalOpened} submit={props.securityDetails.geoRestriction.filter(item => item.name === selectedItem).length > 0 ? props.saveGeoRestrictionGroup : props.createGeoRestrictionGroup} />
                }
            </Modal>

            <Modal hasClose={false} modalTitle={(selectedItem ? 'Edit' : 'Create') + ' Domain Group'} toggle={() => setDomainControlModalOpened(!domainControlModalOpened)} size='small' opened={domainControlModalOpened}>
                {
                    domainControlModalOpened && <DomainControlForm item={selectedItem && props.securityDetails.domainControl.filter(item => item.name === selectedItem).length > 0 ? props.securityDetails.domainControl.filter(item => item.name === selectedItem)[0] : domainControlEmptyValues} toggle={setDomainControlModalOpened} submit={props.securityDetails.domainControl.filter(item => item.name === selectedItem).length > 0 ? props.saveDomainControlGroup : props.createDomainControlGroup} />
                }
            </Modal>
            <Prompt when={displayFormActionButtons} message='' />
        </div>
    )
}