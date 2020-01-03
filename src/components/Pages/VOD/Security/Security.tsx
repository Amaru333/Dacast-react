import React from 'react';
import { Bubble } from '../../../Bubble/Bubble';
import { TextStyle, ToggleTextInfo, BorderStyle, DisabledCard } from './SecurityStyle';
import { Text } from '../../../Typography/Text';
import { Toggle } from '../../../Toggle/toggle';
import { Input } from '../../../FormsComponents/Input/Input';
import { DropdownSingle } from '../../../FormsComponents/Dropdown/DropdownSingle';
import { DateSinglePicker } from '../../../FormsComponents/Datepicker/DateSinglePicker';
import { Button } from '../../../FormsComponents/Button/Button';

export const VodSecurityPage = () => {

    const [toggleSchedulingVideo, setToggleSchedulingVideo] = React.useState<boolean>(false)
    const [togglePasswordProtectedVideo, setTogglePasswordProtectedVideo] = React.useState<boolean>(false)
    const [settingsEditable, setSettingsEditable] = React.useState<boolean>(false)

    return (
        <div >
            <div className="col col-12">
               <Button typeButton="secondary" type="button" sizeButton="small" className="col-right m25" onClick={() => setSettingsEditable(!settingsEditable)}>
                   { settingsEditable ? 
                       "Revert Security Settings"
                    : "Edit Security Settings"}
                   </Button>
            </div>
            
        {  !settingsEditable ? 
        
        <Bubble type='info' className='my2'>          
                This page is disabled because the settings are in a different place, so if you choose to overide these settings, do so at your own demise 
            </Bubble> : null}

            <DisabledCard settingsEditable={settingsEditable}>
                <TextStyle className="py2" >
                    <Text size={20} weight='med' color='gray-1'>Security</Text>
                </TextStyle>

                <Toggle id="privateVideosToggle" label='Private Video'/>
                    <ToggleTextInfo>
                        <Text size={14} weight='reg' color='gray-1'>This video won’t be displayed publicy on your website </Text>
                    </ToggleTextInfo>

              <div className='col col-12 mb1'>
                    <Toggle id="passwordProtectedVideosToggle" label='Password Protected Videos' onChange={() => setTogglePasswordProtectedVideo(!togglePasswordProtectedVideo)}/>
                    <ToggleTextInfo className="">
                        <Text size={14} weight='reg' color='gray-1'>Viewers must enter a password before viewing your content. You can edit the prompt time to let the viewer preview some of the video before being prompted by a password. </Text>
                    </ToggleTextInfo>
                    { togglePasswordProtectedVideo ? 
                        <div className='col col-12'>
                            <Input 
                                type='time' 
                                className='col col-3 md-col-2 mb1'
                                disabled={false} 
                                id='promptTime' 
                                label='Prompt Time' 
                                required
                                pattern="[0-9]{2}:[0-9]{2}"
                                step='1'
                            />

                            <Input 
                                type='text'  
                                className='col col-4 md-col-3 px1 mb1'
                                disabled={false} 
                                id='password' 
                                label='Password' 
                                placeholder='Password'
                                required
                            />
                        </div>
                        : null }
                    </div> 

                <div className='col col-12'>
                    <Toggle id="videoScheduling" label='Video Scheduling' onChange={() => setToggleSchedulingVideo(!toggleSchedulingVideo)}/>
                    <ToggleTextInfo className=""><Text size={14} weight='reg' color='gray-1'>The video will only be available between the times/dates you provide.</Text></ToggleTextInfo>
                         
                    { toggleSchedulingVideo ? 
                        <>
                        <div className='col col-12 flex items-center'>
                        <DropdownSingle className='col col-4 md-col-3 mb2 mr1' id="availableStart" dropdownTitle="Available" list={{'Always': false, "Set Date and Time": false}}  />
                            <div className='col col-4 md-col-3 mb2'>
                                <DateSinglePicker 
                                    className='mt2'
                                    id="startDate"   
                                />
                            </div>

                            <Input 
                                type='time' 
                                className='col col-3 md-col-2 px1 mt1'
                                disabled={false} 
                                id='startTime' 
                                pattern="[0-9]{2}:[0-9]{2}"
                                required
                            />                    
                    </div>

                    <div className='col col-12 flex items-center'>
                        <DropdownSingle className='col col-4 md-col-3 mb2 mr1' id="availableEnd" dropdownTitle="Until" list={{Forever: false, "Set Date and Time": false}} />
                        <div className='col col-4 md-col-3 mb2' >
                            <DateSinglePicker
                                className='mt2' 
                                id="endDate"
                                
                            />
                        </div>
                        <Input 
                            type='time' 
                            
                            className='col col-3 md-col-2 mt1 px1'
                            disabled={false} 
                            id='endTime' 
                            pattern="[0-9]{2}:[0-9]{2}"
                            required
                        /> 
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

                    <DropdownSingle className='col col-4 md-col-3 mb2 mr1' id="availableEnd" dropdownTitle="Select Geo-Restriction Group" list={{"Default Group": false}} />
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
                        <DropdownSingle className="col col-3" id="availableEnd" dropdownTitle="Select Domain Control Group" list={{"Default Group": false}} />
                    </div>
                </div>
            </DisabledCard>
          
            <div>
                <Button form='settingsPageForm' type='button' className="my2" typeButton='primary' buttonColor='blue'>Save</Button>
                <Button type="button" form="settingsPageForm" className="m2" typeButton='tertiary' buttonColor='blue'>Discard</Button>
            </div>

        </div>
                    
    )
}