import * as React from 'react';
import styled from 'styled-components';
import { Avatar } from '../../components/Avatar/Avatar';
import { Input } from '../../components/FormsComponents/Input/Input';
import { Toggle } from '../../components/Toggle/toggle';
import { Text } from '../../components/Typography/Text';
import { Button } from '../../components/FormsComponents/Button/Button';
import { Card } from '../../components/Card/Card';
import { formSubmit, handleValidationProps, ValueInput } from '../../utils/hooksFormSubmit';
import { Modal, ModalContent, ModalFooter } from '../../components/Modal/Modal';
import { DropdownSingle } from '../../components/FormsComponents/Dropdown/DropdownSingle';
import { EditorModeComment } from 'material-ui/svg-icons';
import { DropdownListType } from '../../components/FormsComponents/Dropdown/DropdownTypes';

var moment = require('moment-timezone');

export const Profile = () => {

    let formRef = React.useRef<HTMLFormElement>(null);
    
    let {value, validations, enabledSubmit} = formSubmit(formRef);
    const [passwordModalToggle, setPasswordModalToggle] = React.useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, value: ValueInput) => {

    }

    return (
        <div>
            <Card>
            <form onSubmit={(event) => handleSubmit(event, value)} ref={formRef} noValidate>
                        <TextStyle className="mx1 my2"><Text size={20} weight='med'>Details</Text></TextStyle>
                        <div className="md-col md-col-12">
                            <Input 
                                disabled={false} 
                                defaultValue={''}
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
                                defaultValue={''} 
                                type="text" 
                                className="col col-11" 
                                id="lastName" 
                                label="Last Name" 
                                placeholder="Last Name" 
                                required
                                {...handleValidationProps('lastName', validations)} 
                            />
                            <Avatar className="col col-1 ml1 mt3"  size='large' name='JL' /> 
                            </AvatarInputContainer>

                        </div>
                        <div className="md-col md-col-12" >
                            <Input 
                                disabled={false} 
                                defaultValue={''}
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
                                defaultValue={''}
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
                                className="md-col col-6 p1"
                                hasSearch
                                dropdownTitle='Timezone'
                                defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone + ' (' + moment.tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('Z z') + ')'}
                                id='dropdownTimezone'
                                list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => {return {...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false}}, {})}
                            />
                        </div>
                        <BorderStyle className="p1 mx1" />

                        <TextStyle className="px1 py2" ><Text size={20} weight='med' color='gray-1'>Change Password</Text></TextStyle>

                        <p className="mx1 my0"><Text size={12} weight='reg' color='gray-3'>Password last changed: some date</Text></p>

                        <p className="mx1"><Text size={14} weight='reg' color='gray-3'>For best security practices you should update your password every 6 months.</Text></p>

                        <Button className="m1" sizeButton='xs' typeButton='secondary' buttonColor='blue'><Text size={12} weight='reg' color='dark-violet'>Change password</Text></Button>
                        
                        <Modal opened={passwordModalToggle} toggle={() => setPasswordModalToggle(!passwordModalToggle)} size="small" title="Change Password">
                            <ModalContent>
                                    <Input 
                                        disabled={false} 
                                        defaultValue={''}
                                        type="password" 
                                        className="col col-12 p1" 
                                        id="currentPassword" 
                                        label="Current Password" 
                                        placeholder="Current Password" 
                                        required
                                    />
                                    <Input 
                                        disabled={false} 
                                        defaultValue={''}
                                        type="password" 
                                        className="col col-12 p1" 
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
                                        className="col col-12 p1" 
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
                        <BorderStyle className="p1 mx1"/>

                        <TextStyle className="px1 py2" ><Text size={20} weight='med' color='gray-1'>Email Notifications</Text></TextStyle>

                        <Toggle id="marketingToggle" label='Marketing' {...handleValidationProps('Marketing', validations)}/>
                        <ToggleTextInfo className="mx3"><Text className="mx2" size={12} weight='reg' color='gray-3'>Turn off if you do not want to receive promotional marketing emails.</Text></ToggleTextInfo>
                        <Toggle id="lowDataToggle" label='Low Data' {...handleValidationProps('lowDataToggle', validations)}/>
                        <ToggleTextInfo className="mx3"><Text className="mx2" size={12} weight='reg' color='gray-3'>An email will be sent when the data is below a certain percentage or something.</Text></ToggleTextInfo>

                        <Toggle id="uploadToggle" label='Upload' {...handleValidationProps('uploadToggle', validations)}/>
                        <ToggleTextInfo className="mx3"><Text className="mx2" size={12} weight='reg' color='gray-3'>An email will be sent when an upoload has been completed from anyone in your account.</Text></ToggleTextInfo>

                        <Toggle  label='Weekly Analytics' {...handleValidationProps('weeklyAnalyticsToggle', validations)}/>
                        <ToggleTextInfo className="mx3"><Text className="mx2" size={12} weight='reg' color='gray-3'>A weekly email will be sent to you to update you on analytics.</Text></ToggleTextInfo>

                        <Toggle id="apiPingbackNotificationsToggle" label='API Pingback Notifications' {...handleValidationProps('apiPingbackNotificationsToggle', validations)} />
                        <ToggleTextInfo className="mx3"><Text className="mx2" size={12} weight='reg' color='gray-3'>Send a pingback to notify me if my encoding has completed or failed.</Text></ToggleTextInfo>
                    </form>

            </Card>
            <div>
                <Button disabled={!enabledSubmit} type='submit' className="my2" typeButton='primary' buttonColor='blue'>Save</Button>
                <Button type='button' onClick={() => {}} className="m2" typeButton='tertiary' buttonColor='blue'>Discard</Button>
            </div>
        </div>
    )
}

const TextStyle = styled.span<{}>`
    display: block;
`

const BorderStyle = styled.div<{}>`
    border-bottom: 1px solid ${props => props.theme.colors['gray-7']};
    display: flex;
`

const AvatarInputContainer = styled.div<{}>`
    display: flex;
    flex-direction: row;
`

const ToggleTextInfo = styled.p<{}>`
    margin-top: 0px;
    display: inline-flex;
`