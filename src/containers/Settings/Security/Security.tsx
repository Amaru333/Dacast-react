import React from 'react';
import styled from 'styled-components';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { Toggle } from '../../../components/Toggle/toggle';
import { formSubmit, handleValidationProps, ValueInput } from '../../../utils/hooksFormSubmit';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { DateSinglePicker } from '../../../components/FormsComponents/Datepicker/DateSinglePicker';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Table } from '../../../components/Table/Table';
import { Icon } from '@material-ui/core';
import { Modal } from '../../../components/Modal/Modal';
import { GeoRestrictionForm } from './GeoRestrictionForm';
import { DomainControlForm } from './DomainControlForm';

export type GeoRestriction = {
    name: string;
    isDefault: boolean;
    countries: string[];
}

export type DomainControl = {
    name: string;
    isDefault: boolean;
    domains: string[];
}

const geoRestrictionDummyData: GeoRestriction[] = [
    {
        name: 'All Countries',
        isDefault: true,
        countries: [
            'Morocco',
            'South Africa',
            'France'
        ]
    },
    {
        name: 'Eastern Countries',
        isDefault: false,
        countries: [
            'Morocco',
            'South Africa'
        ]
    },
    {
        name: 'Western Countries',
        isDefault: false,
        countries: [
            'France',
            'Argentina'
        ]
    }
]


const domainControlDummyData: DomainControl[] = [
    {
        name: 'All Domains',
        isDefault: true,
        domains: [
            'https://dacast.com',
            'https://pokemonForJake.com',
            'https://IneedABeer.co.uk'
        ]
    }
]


export const Security = () => {

    const [geoRestrictionModalOpened, setGeoRestrictionModalOpened] = React.useState<boolean>(false)
    const [domainControlModalOpened, setDomainControlModalOpened] = React.useState<boolean>(false)

    let formRef = React.useRef<HTMLFormElement>(null);   
    let {value, validations, enabledSubmit} = formSubmit(formRef);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, value: ValueInput) => {
        event.preventDefault();
    }

    const tableHeaderElement= (tableType: string) => {
        return[
            <Text key={"groupTable" + tableType} size={14}  weight="med" color="gray-1">Group</Text>,
            <Text key={"DefaultTable" + tableType} size={14}  weight="med" color="gray-1">Default</Text>,
            <Button key={"actionTable" + tableType} onClick={() => {tableType === 'geoRestriction' ? setGeoRestrictionModalOpened(true) : setDomainControlModalOpened(true)}} className="right mr2" sizeButton="xs" typeButton="secondary" buttonColor="blue">Add Group</Button>
        ]
    }

    const geoRestrictionBodyElement= () => {
        if(geoRestrictionDummyData) {
            return geoRestrictionDummyData.map((value, key) => {
                return [
                    <Text key={key.toString() +value.name} size={14}  weight="reg" color="gray-1">{value.name}</Text>,
                    value.isDefault ? <Icon key={key.toString() +value.name}>checked</Icon> : <></>,
                    <IconContainer className="iconAction" key={key.toString()+value.name}><Icon >delete</Icon><Icon onClick={() => { setGeoRestrictionModalOpened(true) }}>edit</Icon> </IconContainer>
                ]
            })
        }
    }

    const domainControlBodyElement= () => {
        if(domainControlDummyData) {
            return domainControlDummyData.map((value, key) => {
                return [
                    <Text key={key.toString() +value.name} size={14}  weight="reg" color="gray-1">{value.name}</Text>,
                    value.isDefault ? <Icon key={key.toString() +value.name}>checked</Icon> : <></>,
                    <IconContainer className="iconAction" key={key.toString()+value.name}><Icon >delete</Icon><Icon onClick={() => { setDomainControlModalOpened(true) }}>edit</Icon> </IconContainer>
                ]
            })
        }
    }

    return (
        <div>
            <Card>
                <form ref={formRef} onSubmit={event => handleSubmit(event, value)}>
                    <TextStyle className="px1 py2" ><Text size={20} weight='med' color='gray-1'>Security</Text></TextStyle>

                    <Toggle id="privateVideosToggle" label='Private Videos' defaultChecked={true} {...handleValidationProps('Private Videos', validations)}/>
                    <ToggleTextInfo className="mx3"><Text className="mx2 px1" size={12} weight='reg' color='gray-3'>They won't be dipslayed publicy on your website.</Text></ToggleTextInfo>
                    <div className='col col-12'>
                        <Toggle id="passowrdProtectedVideosToggle" label='Password Protected Videos' defaultChecked={false} {...handleValidationProps('Password Protected Videos', validations)}/>
                        <ToggleTextInfo className="mx3"><Text className="mx2 px1" size={12} weight='reg' color='gray-3'>Users will be prompted to enter a password before watching. For best security practices you should change your password every 6 months.</Text></ToggleTextInfo>
                        {
                            value['Password Protected Videos'] && value['Password Protected Videos'].value ?
                                <div className='col col-12 mx3 '>
                                    <Input 
                                        type='time' 
                                        defaultValue='00:00:00'
                                        className='col col-2 ml2 p1'
                                        disabled={false} 
                                        id='promptTime' 
                                        label='Prompt Time' 
                                        required
                                    />
        
                                    <Input 
                                        type='password' 
                                        defaultValue='' 
                                        className='col col-3 p1'
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

                        <Toggle id="videoScheduling" label='Video Scheduling' defaultChecked={false} {...handleValidationProps('Video Scheduling', validations)}/>
                        <ToggleTextInfo className="mx3"><Text className="mx2 px1" size={12} weight='reg' color='gray-3'>The video will only be available between the times/dates you provide.</Text></ToggleTextInfo>
                        {   
                            value['Video Scheduling'] && value['Video Scheduling'].value ?
                                <>
                                    <div className='col col-12 py1'>   
                                        <DateSinglePicker 
                                            DatepickerTitle='Start Date' 
                                            className='col col-3 p1' 
                                        />
                                        <DropdownSingle 
                                            className='col col-2 p1' 
                                            list={{'item1': false, ["item2"]: false}} 
                                            id='startTime' 
                                            dropdownTitle='Start Time' 
                                            defaultValue='item1' 
                                            
                                        />

                                    </div>
                                    <div className='col col-12 py1'>
                                        <DateSinglePicker 
                                            DatepickerTitle='End Date' 
                                            className='col col-3 p1' 
                                        />
                                        <DropdownSingle 
                                            className='col col-2 p1' 
                                            list={{'item1': false, ["item2"]: false}} 
                                            id='endTime' 
                                            dropdownTitle='End Time' 
                                            defaultValue='item1' 
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
            <Modal hasClose={false} title='Create Geo-restricion Group' toggle={() => setGeoRestrictionModalOpened(!geoRestrictionModalOpened)} size='small' opened={geoRestrictionModalOpened}>
                <GeoRestrictionForm item={null} toggle={setGeoRestrictionModalOpened} />
            </Modal>

            <Modal hasClose={false} title='Create Domain Group' toggle={() => setDomainControlModalOpened(!domainControlModalOpened)} size='small' opened={domainControlModalOpened}>
            <DomainControlForm item={null} toggle={setDomainControlModalOpened} />
            </Modal>

        </div>
    )
}

export const ToggleTextInfo = styled.p<{}>`
    margin-top: 0px;
    display: inline-flex;
`

export const TextStyle = styled.span<{}>`
    display: block;
`

export const BorderStyle = styled.div<{}>`
    border-bottom: 1px solid ${props => props.theme.colors['gray-7']};
    display: flex;
`

export const IconContainer = styled.div`
    float:right;
    display:none;
    .material-icons{
        margin-right:16px;
        color:  ${props => props.theme.colors["gray-1"]};
    }
`


export default Security;