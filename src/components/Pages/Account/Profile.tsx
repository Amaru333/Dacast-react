import * as React from 'react';
import { Avatar } from '../../Avatar/Avatar';
import { Input } from '../../FormsComponents/Input/Input';
import { Toggle } from '../../Toggle/toggle';
import { Text } from '../../Typography/Text';
import { Button } from '../../FormsComponents/Button/Button';
import { Card } from '../../Card/Card';
import { formSubmit, handleValidationProps, ValueInput } from '../../../utils/hooksFormSubmit';
import { Modal, ModalContent, ModalFooter } from '../../Modal/Modal';
import { DropdownSingle } from '../../FormsComponents/Dropdown/DropdownSingle';
import { DropdownListType } from '../../FormsComponents/Dropdown/DropdownTypes';
import { TextStyle, BorderStyle, AvatarInputContainer, ToggleTextInfo } from './ProfileStyle'
import { ProfilePageInfos } from '../../../redux-flow/store/Account/types';

var moment = require('moment-timezone');

interface ProfileComponentProps {
    ProfilePageDetails: ProfilePageInfos;
    getProfilePageDetails: Function;
    saveProfilePageDetails: Function;
    saveProfilePassword: Function;
}

export const ProfilePage = (props: ProfileComponentProps) => {

    let formRef = React.useRef<HTMLFormElement>(null);
    
    let {value, validations, enabledSubmit} = formSubmit(formRef);
    const [passwordModalToggle, setPasswordModalToggle] = React.useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, value: ValueInput) => {
        event.preventDefault();
        console.log(value)
        props.saveProfilePageDetails({
            firstName: value['firstName'].value,
            lastName: value['lastName'].value,
            phoneNumber: value['phoneNumber'].value,
            emailAddress: value['emailAddress'].value,
            timezone: "",
            marketing: value['Marketing'].value,
            lowData: value['Low Data'].value,
            upload: value['Upload'].value,
            weeklyAnalytics: value['Weekly Analytics'].value,
            apiPingbackNotifications: value['API Pingback Notifications'].value
        })
    }

    return (
        <div>
            <Card>
                <form id='profilePageForm' onSubmit={(event) => handleSubmit(event, value)} ref={formRef} noValidate>
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
                            required
                            {...handleValidationProps('emailAddress', validations)}
                        />
                    </div>
                    <div className="md-col md-col-12">
                        <DropdownSingle 
                            className="md-col md-col-6 p1"
                            hasSearch
                            dropdownTitle='Timezone'
                            defaultValue={props.ProfilePageDetails.timezone}
                            id='dropdownTimezone'
                            list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false}}, {})}
                        />
                    </div>
                    <BorderStyle className="p1 mx1" />

                    <TextStyle className="px1 py2" ><Text size={20} weight='med' color='gray-1'>Change Password</Text></TextStyle>

                    <p className="mx1 my0"><Text size={12} weight='reg' color='gray-3'>Password last changed: {props.ProfilePageDetails.lastChangedPassword}</Text></p>

                    <p className="mx1"><Text size={14} weight='reg' color='gray-3'>For best security practices you should update your password every 6 months.</Text></p>

                    <Button className="m1" sizeButton='xs' onClick={(event) => {event.preventDefault(); setPasswordModalToggle(true)}} typeButton='secondary' buttonColor='blue'><Text size={12} weight='reg' color='dark-violet'>Change password</Text></Button>
                        
                    <BorderStyle className="p1 mx1"/>

                    <TextStyle className="px1 py2" ><Text size={20} weight='med' color='gray-1'>Email Notifications</Text></TextStyle>

                    <Toggle id="marketingToggle" label='Marketing' defaultChecked={props.ProfilePageDetails.marketing} {...handleValidationProps('Marketing', validations)}/>
                    <ToggleTextInfo className="mx3"><Text className="mx2 px1" size={12} weight='reg' color='gray-3'>Turn off if you do not want to receive promotional marketing emails.</Text></ToggleTextInfo>
                    <Toggle id="lowDataToggle" label='Low Data' defaultChecked={props.ProfilePageDetails.lowData} {...handleValidationProps('lowDataToggle', validations)}/>
                    <ToggleTextInfo className="mx3"><Text className="mx2 px1" size={12} weight='reg' color='gray-3'>An email will be sent when the data is below a certain percentage or something.</Text></ToggleTextInfo>

                    <Toggle id="uploadToggle" label='Upload' defaultChecked={props.ProfilePageDetails.upload} {...handleValidationProps('uploadToggle', validations)}/>
                    <ToggleTextInfo className="mx3"><Text className="mx2 px1" size={12} weight='reg' color='gray-3'>An email will be sent when an upoload has been completed from anyone in your account.</Text></ToggleTextInfo>

                    <Toggle id="weeklyAnalyticsToggle" label='Weekly Analytics' defaultChecked={props.ProfilePageDetails.weeklyAnalytics} {...handleValidationProps('weeklyAnalyticsToggle', validations)}/>
                    <ToggleTextInfo className="mx3"><Text className="mx2 px1" size={12} weight='reg' color='gray-3'>A weekly email will be sent to you to update you on analytics.</Text></ToggleTextInfo>

                    <Toggle id="apiPingbackNotificationsToggle" label='API Pingback Notifications' defaultChecked={props.ProfilePageDetails.apiPingbackNotifications} {...handleValidationProps('apiPingbackNotificationsToggle', validations)} />
                    <ToggleTextInfo className="mx3"><Text className="mx2 px1" size={12} weight='reg' color='gray-3'>Send a pingback to notify me if my encoding has completed or failed.</Text></ToggleTextInfo>
                </form>

            </Card>
            <div>
                <Button disabled={!enabledSubmit} form='profilePageForm' type='submit' className="my2" typeButton='primary' buttonColor='blue'>Save</Button>
                <Button type='reset' form="profilePageForm" onClick={() => {}} className="m2" typeButton='tertiary' buttonColor='blue'>Discard</Button>
            </div>
            <Modal hasClose={false} opened={passwordModalToggle} toggle={() => setPasswordModalToggle(!passwordModalToggle)} size="small" title="Change Password">
                <ModalContent>
                    <Input 
                        disabled={false} 
                        defaultValue={''}
                        type="password" 
                        className="col col-12" 
                        id="currentPassword" 
                        label="Current Password" 
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
                        label="Confirm Password" 
                        placeholder="Confirm Password" 
                        required
                    />
                </ModalContent>
                <ModalFooter>
                    <Button sizeButton="large" typeButton="primary">Change Password</Button>
                    <Button sizeButton="large" onClick={() => setPasswordModalToggle(false)} typeButton="tertiary">Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}