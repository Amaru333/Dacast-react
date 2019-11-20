import React from 'react';
import styled from 'styled-components';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { Toggle } from '../../../components/Toggle/toggle';
import { formSubmit, handleValidationProps, ValueInput } from '../../../utils/hooksFormSubmit';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { DateSinglePicker } from '../../../components/FormsComponents/Datepicker/DateSinglePicker';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';



export const Security = () => {

    let formRef = React.useRef<HTMLFormElement>(null);
    
    let {value, validations, enabledSubmit} = formSubmit(formRef);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, value: ValueInput) => {
        event.preventDefault();
    }

    return (
        <div>
            <Card>
                <form ref={formRef} onSubmit={event => handleSubmit(event, value)}>
                    <TextStyle className="px1 py2" ><Text size={20} weight='med' color='gray-1'>Security</Text></TextStyle>

                    <Toggle id="privateVideosToggle" label='Private Videos' defaultChecked={true} {...handleValidationProps('Private Videos', validations)}/>
                    <ToggleTextInfo className="mx3"><Text className="mx2 px1" size={12} weight='reg' color='gray-3'>They won't be dipslayed publicy on your website.</Text></ToggleTextInfo>
                    <div className='col col-12'>
                        <Toggle id="passowrdProtectedVideosToggle" label='Password Protected Videos' defaultChecked={true} {...handleValidationProps('Password Protected Videos', validations)}/>
                        <ToggleTextInfo className="mx3"><Text className="mx2 px1" size={12} weight='reg' color='gray-3'>Users will be prompted to enter a password before watching. For best security practices you should change your password every 6 months.</Text></ToggleTextInfo>
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
                    </div>

                    <div className='col col-12'>

                        <Toggle id="videoScheduling" label='Video Scheduling' defaultChecked={true} {...handleValidationProps('Video Scheduling', validations)}/>
                        <ToggleTextInfo className="mx3"><Text className="mx2 px1" size={12} weight='reg' color='gray-3'>The video will only be available between the times/dates you provide.</Text></ToggleTextInfo>
                        <div className='col col-12'>   
                            <DateSinglePicker className='col col-4' />
                            <DropdownSingle className='col col-2' list={{'item1': false, ["item2"]: false}} id='startTime' dropdownTitle='Start Time' defaultValue='item1' />

                        </div>
                        <div>
                            <DateSinglePicker className='col col-4' />
                            <DropdownSingle className='col col-2' list={{'item1': false, ["item2"]: false}} id='endTime' dropdownTitle='End Time' defaultValue='item1' />

                        </div>

                    </div>

                    <BorderStyle className="p1 mx1" />

                </form>
            </Card>

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


export default Security;