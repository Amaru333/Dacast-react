import * as React from 'react';
import { Avatar } from '../../../../components/Avatar/Avatar';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Toggle } from '../../../../components/Toggle/toggle';
import { Text } from '../../../../components/Typography/Text';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Card } from '../../../../components/Card/Card';
import { formSubmit, handleValidationProps } from '../../../utils/hooksFormSubmit';
import { Modal, ModalContent, ModalFooter } from '../../../../components/Modal/Modal';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownListType } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { TextStyle, BorderStyle, AvatarInputContainer, ToggleTextInfo, ToggleContainer } from './ProfileStyle'
import { ProfilePageInfos } from '../../../redux-flow/store/Account/Profile/types';
import { Prompt } from 'react-router';

var moment = require('moment-timezone');

interface ProfileComponentProps {
    ProfilePageDetails: ProfilePageInfos;
    getProfilePageDetails: Function;
    saveProfilePageDetails: Function;
    saveProfilePassword: Function;
    showDiscardToast: Function;
}

export const ProfilePage = (props: ProfileComponentProps) => {

    let formRef = React.useRef<HTMLFormElement>(null);
    
    let {value, validations, enabledSubmit, displayFormActionButtons} = formSubmit(formRef);
    const [passwordModalToggle, setPasswordModalToggle] = React.useState<boolean>(false);
    const [currentPassword, setCurrentPassword] = React.useState<string>(null)
    const [newPassword, setNewPassword] = React.useState<string>(null)
    const [confirmNewPassword, setConfirmNewPassword] = React.useState<string>(null)
    const [timezone, setTimezone] = React.useState<string>(props.ProfilePageDetails.timezone)
    const [pageEdited, setPageEdited] = React.useState<boolean>(false)

    const handleSubmit = () => {
        event.preventDefault();
        props.saveProfilePageDetails({
            firstName: value['firstName'].value,
            lastName: value['lastName'].value,
            phoneNumber: value['phoneNumber'].value,
            emailAddress: value['emailAddress'].value,
            timezone: timezone,
            marketing: value['Marketing'].value,
            lowData: value['Low Data'].value,
            videoUpload: value['Video Uploaded'].value
        })
        setPageEdited(false)
    }

    return (
        <div>
            <Card>
                <form id='profilePageForm' ref={formRef} noValidate>
                    <TextStyle className="mx1 my2"><Text size={20} weight='med'>Details</Text></TextStyle>
                    <div className="md-col md-col-12">
                        <Input 
                            disabled={false} 
                            defaultValue={props.ProfilePageDetails.firstName}
                            type="text" 
                            className="md-col md-col-6 px1 pb1" 
                            id="firstName" 
                            label="First Name" 
                            placeholder="First Name" 
                            required
                            onChange={() => setPageEdited(true)}
                            {...handleValidationProps('firstName', validations)}
                        />
                        <AvatarInputContainer className="md-col md-col-6 px1 pb1">
                            <Input 
                                disabled={false}
                                defaultValue={props.ProfilePageDetails.lastName} 
                                type="text" 
                                className="col col-11" 
                                id="lastName" 
                                label="Last Name" 
                                onChange={() => setPageEdited(true)}
                                placeholder="Last Name" 
                                required
                                {...handleValidationProps('lastName', validations)} 
                            />
                            <Avatar className="col col-1 ml1 mt3"  size='large' name={value['firstName'] ? value['firstName'].value.toString() + ' ' + value['lastName'].value.toString() : props.ProfilePageDetails.firstName + ' ' + props.ProfilePageDetails.lastName} /> 
                        </AvatarInputContainer>

                    </div>
                    <div className="md-col md-col-12" >
                        <Input 
                            disabled={false} 
                            defaultValue={props.ProfilePageDetails.phoneNumber}
                            type="tel" 
                            className="md-col md-col-6 p1" 
                            id="phoneNumber" 
                            label="Phone Number" 
                            placeholder="(00) 0000 0000 00" 
                            required
                            onChange={() => setPageEdited(true)}
                            {...handleValidationProps('phoneNumber', validations)}
                        />
                        <Input 
                            disabled={false} 
                            defaultValue={props.ProfilePageDetails.emailAddress}
                            type="email" 
                            className="md-col md-col-6 p1" 
                            id="emailAddress" 
                            label="Email Address" 
                            placeholder="Email Address" 
                            onChange={() => setPageEdited(true)}
                            required
                            {...handleValidationProps('emailAddress', validations)}
                        />
                    </div>
                    <div className="md-col md-col-12">
                        <DropdownSingle 
                            className="md-col md-col-6 p1"
                            hasSearch
                            dropdownTitle='Timezone'
                            dropdownDefaultSelect={props.ProfilePageDetails.timezone}
                            defaultValue={props.ProfilePageDetails.timezone}
                            id='dropdownTimezone'
                            callback={(value: string) => {setPageEdited(value !== props.ProfilePageDetails.timezone);setTimezone(value)}}
                            list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false}}, {})}
                        />
                    </div>
                    <BorderStyle className="p1 mx1" />

                    <TextStyle className="px1 pt25 pb2" ><Text size={20} weight='med' color='gray-1'>Change Password</Text></TextStyle>

                    <p className="mx1 my0"><Text size={12} weight='reg' color='gray-3'>Password last changed: {props.ProfilePageDetails.lastChangedPassword}</Text></p>

                    <p className="mx1"><Text size={14} weight='reg' color='gray-3'>For best security practices you should update your password every 6 months.</Text></p>

                    <Button className="m1" sizeButton='xs' onClick={(event) => {event.preventDefault(); setPasswordModalToggle(true)}} typeButton='secondary' buttonColor='blue'><Text size={12} weight='reg' color='dark-violet'>Change password</Text></Button>
                        
                    <BorderStyle className="p1 mx1"/>

                    <TextStyle className="px1 pt25 pb2" ><Text size={20} weight='med' color='gray-1'>Email Notifications</Text></TextStyle>

                    <ToggleContainer>
                        <Toggle id="marketingToggle" label='Marketing' onChange={() => setPageEdited(true)} defaultChecked={props.ProfilePageDetails.marketing} {...handleValidationProps('Marketing', validations)}/>
                        <ToggleTextInfo className="mt1"><Text size={14} weight='reg' color='gray-3'>Turn off if you do not want to receive promotional marketing emails.</Text></ToggleTextInfo>
                    </ToggleContainer>

                    <ToggleContainer className="mt25">
                        <Toggle id="lowDataToggle" label='Low Data' onChange={() => setPageEdited(true)} defaultChecked={props.ProfilePageDetails.lowData} {...handleValidationProps('lowDataToggle', validations)}/>
                        <ToggleTextInfo className="mt1"><Text size={14} weight='reg' color='gray-3'>An email will be sent when the your remaining Data falls below 10%.</Text></ToggleTextInfo>
                    </ToggleContainer>
                    
                    <ToggleContainer className="mt25">
                        <Toggle id="uploadToggle" label='Video Uploaded' onChange={() => setPageEdited(true)} defaultChecked={props.ProfilePageDetails.videoUpload} {...handleValidationProps('uploadToggle', validations)}/>
                        <ToggleTextInfo className="mt1"><Text size={14} weight='reg' color='gray-3'>An email will be sent when an uploaded video’s encoding has completed.</Text></ToggleTextInfo>
                    </ToggleContainer>    
                </form>

            </Card>
            { displayFormActionButtons ? 

                <div> 
                    
                    <Button disabled={!enabledSubmit} onClick={(event) => {event.preventDefault();handleSubmit()}} className="my2" typeButton='primary' buttonColor='blue'>Save</Button>
                    <Button type='reset' form="profilePageForm" onClick={() => {setPageEdited(false) ;props.showDiscardToast("Changes have been discarded", 'flexible', "success")}} className="m2" typeButton='tertiary' buttonColor='blue'>Discard</Button>
                </div>
                : null
            }

            <Modal hasClose={false} opened={passwordModalToggle} toggle={() => setPasswordModalToggle(!passwordModalToggle)} size="small" title="Change Password">
                {passwordModalToggle ?
                <>
                <ModalContent>
                    <Input 
                        disabled={false} 
                        defaultValue={''}
                        type="password" 
                        className="col col-12" 
                        id="currentPassword" 
                        label="Current Password" 
                        onChange={(event) => setCurrentPassword(event.currentTarget.value)}
                        placeholder="Current Password" 
                        required
                    />
                    <Input 
                        disabled={false} 
                        defaultValue={''}
                        type="password" 
                        className="col col-12" 
                        id="newPassword" 
                        label="New Password" 
                        onChange={(event) => setNewPassword(event.currentTarget.value)}
                        placeholder="New Password" 
                        help='Must contain more than 6 characters'
                        required
                    />
                    <Input 
                        disabled={false} 
                        defaultValue={''}
                        type="password" 
                        className="col col-12" 
                        id="confirmPassword" 
                        onChange={(event) => setConfirmNewPassword(event.currentTarget.value)}
                        label="Confirm Password" 
                        placeholder="Confirm Password" 
                        required
                    />
                </ModalContent>
                    <ModalFooter>
                        <Button disabled={newPassword !== confirmNewPassword || newPassword.length < 5 || currentPassword.length === 0} sizeButton="large" onClick={() => {props.saveProfilePassword(currentPassword, newPassword);setPasswordModalToggle(false)}} typeButton="primary">Change Password</Button>
                        <Button sizeButton="large" onClick={() => setPasswordModalToggle(false)} typeButton="tertiary">Cancel</Button>
                    </ModalFooter>
                    </>
                    : null
                }
            </Modal>
            {/* Will do real prompt when connected to endpoint */}
            <Prompt when={pageEdited} message='' />
        </div>
    )
}