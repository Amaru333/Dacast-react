import * as React from 'react';
import { Avatar } from '../../../../components/Avatar/Avatar';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Toggle } from '../../../../components/Toggle/toggle';
import { Text } from '../../../../components/Typography/Text';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Card } from '../../../../components/Card/Card';
import { handleValidationForm } from '../../../utils/hooksFormSubmit';
import { Modal, ModalContent, ModalFooter } from '../../../../components/Modal/Modal';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownListType } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { TextStyle, BorderStyle, AvatarInputContainer, ToggleTextInfo, ToggleContainer } from './ProfileStyle'
import { ProfilePageInfos } from '../../../redux-flow/store/Account/Profile/types';
import { Prompt } from 'react-router';
import { useForm } from 'react-hook-form';

var moment = require('moment-timezone');

interface ProfileComponentProps {
    ProfilePageDetails: ProfilePageInfos;
    getProfilePageDetails: Function;
    saveProfilePageDetails: Function;
    saveProfilePassword: Function;
    showDiscardToast: Function;
}

export const ProfilePage = (props: ProfileComponentProps) => {


    const [passwordModalToggle, setPasswordModalToggle] = React.useState<boolean>(false);
    const [submitLoading, setSubmitLoading] = React.useState<boolean>(false);

    /** Validation */
    const { register, handleSubmit, errors, setValue, reset, formState, getValues } = useForm({
        reValidateMode: 'onChange',
        mode: 'onBlur',
        defaultValues: props.ProfilePageDetails,
    })
    const { dirty } = formState;

    const onSubmit = (data: any) => {
        setSubmitLoading(true);
        props.saveProfilePageDetails(data,() => {
            setSubmitLoading(false);
        });
    }

    const onPasswordSubmit = (data: any) => {
        props.saveProfilePassword(data.currentPassword, data.newPassword);
        setPasswordModalToggle(false)    
    }

    const { register: registerPassword, handleSubmit: handleSubmitPassword, errors: errorsPassword, getValues: getPasswordValues } = useForm({
        reValidateMode: 'onChange',
        mode: 'onBlur'
    })


    return (
        <div>
            <Card>
                <form id='profilePageForm' onSubmit={handleSubmit(onSubmit)} >
                    <TextStyle className="mx1 my2"><Text size={20} weight='med'>Details</Text></TextStyle>
                    <div className="md-col md-col-12">
                        <Input
                            type="text"
                            className="md-col md-col-6 px1 pb1"
                            id="firstName"
                            label="First Name"
                            placeholder="First Name"
                            {...handleValidationForm('firstName', errors)} ref={register({ required: "Required" })}
                        />
                        <AvatarInputContainer className="md-col md-col-6 px1 pb1">
                            <Input
                                className="col col-11"
                                id="lastName"
                                label="Last Name"
                                placeholder="Last Name"
                                {...handleValidationForm('lastName', errors)} ref={register({ required: "Required" })}
                            />
                            <Avatar className="col col-1 ml1 mt3" size='large' name={props.ProfilePageDetails.firstName + ' ' + props.ProfilePageDetails.lastName} />
                        </AvatarInputContainer>

                    </div>
                    <div className="md-col md-col-12" >
                        <Input
                            className="md-col md-col-6 p1"
                            id="phoneNumber"
                            label="Phone Number"
                            placeholder="(00) 0000 0000 00"
                            {...handleValidationForm('phoneNumber', errors, 'tel', register)}

                        />
                        <Input
                            type="email"
                            className="md-col md-col-6 p1"
                            id="emailAddress"
                            label="Email Address"
                            placeholder="Email Address"
                            {...handleValidationForm('emailAddress', errors, 'email', register)}
                        />
                    </div>
                    <div className="md-col md-col-12">
                        <input type="hidden" name="timezone" ref={register()} />
                        <DropdownSingle
                            className="md-col md-col-6 p1"
                            hasSearch
                            dropdownTitle='Timezone'
                            dropdownDefaultSelect={props.ProfilePageDetails.timezone}
                            defaultValue={props.ProfilePageDetails.timezone}
                            id='dropdownTimezone'
                            callback={(value: string) => { setValue('timezone', value) }}
                            list={moment.tz.names().reduce((reduced: DropdownListType, item: string) => { return { ...reduced, [item + ' (' + moment.tz(item).format('Z z') + ')']: false } }, {})}
                        />
                    </div>
                    <BorderStyle className="p1 mx1" />

                    <TextStyle className="px1 pt25 pb2" ><Text size={20} weight='med' color='gray-1'>Change Password</Text></TextStyle>

                    <p className="mx1 my0"><Text size={12} weight='reg' color='gray-3'>Password last changed: {props.ProfilePageDetails.lastChangedPassword}</Text></p>

                    <p className="mx1"><Text size={14} weight='reg' color='gray-3'>For best security practices you should update your password every 6 months.</Text></p>

                    <Button className="m1" sizeButton='xs' onClick={(event) => { event.preventDefault(); setPasswordModalToggle(true) }} typeButton='secondary' buttonColor='blue'><Text size={12} weight='reg' color='dark-violet'>Change password</Text></Button>

                    <BorderStyle className="p1 mx1" />

                    <TextStyle className="px1 pt25 pb2" ><Text size={20} weight='med' color='gray-1'>Email Notifications</Text></TextStyle>

                    <ToggleContainer>
                        <Toggle name="marketing" refForwarded={register()}  
                            id="marketingToggle" label='Marketing' defaultChecked={props.ProfilePageDetails.marketing}  />
                        <ToggleTextInfo className="mt1"><Text size={14} weight='reg' color='gray-3'>Turn off if you do not want to receive promotional marketing emails.</Text></ToggleTextInfo>
                    </ToggleContainer>

                    <ToggleContainer className="mt25">
                        <Toggle name="lowData" refForwarded={register()} 
                            id="lowData" label='Low Data' defaultChecked={props.ProfilePageDetails.lowData} />
                        <ToggleTextInfo className="mt1"><Text size={14} weight='reg' color='gray-3'>An email will be sent when the your remaining Data falls below 10%.</Text></ToggleTextInfo>
                    </ToggleContainer>

                    <ToggleContainer className="mt25">
                        <Toggle name="videoUpload" refForwarded={register()} 
                            id="uploadToggle" label='Video Uploaded' defaultChecked={props.ProfilePageDetails.videoUpload} />
                        <ToggleTextInfo className="mt1"><Text size={14} weight='reg' color='gray-3'>An email will be sent when an uploaded video’s encoding has completed.</Text></ToggleTextInfo>
                    </ToggleContainer>
                </form>

            </Card>
            {
                dirty ?
                    <div>
                        <Button isLoading={submitLoading} type="submit" form="profilePageForm"  className="my2" typeButton='primary' buttonColor='blue'>Save</Button>
                        <Button type='reset' form="profilePageForm" onClick={() => { reset(props.ProfilePageDetails, {errors: true}); props.showDiscardToast("Changes have been discarded", 'flexible', "success") }} className="m2" typeButton='tertiary' buttonColor='blue'>Discard</Button>
                    </div>
                    : null
            }

            <Modal hasClose={false} opened={passwordModalToggle} toggle={() => setPasswordModalToggle(!passwordModalToggle)} size="small" modalTitle="Change Password">
                {passwordModalToggle ?
                    <>
                        <ModalContent>
                            <form onSubmit={handleSubmitPassword(onPasswordSubmit)}>
                                <Input
                                    type="password"
                                    className="col col-12"
                                    id="currentPassword"
                                    label="Current Password"
                                    placeholder="Current Password"
                                    {...handleValidationForm('currentPassword', errorsPassword)} ref={registerPassword({ required: "Required" })}
                                />
                                <Input
                                    
                                    type="password"
                                    className="col col-12"
                                    id="newPassword"
                                    label="New Password"
                                    placeholder="New Password"
                                    {...handleValidationForm('newPassword', errorsPassword, 'password', registerPassword)}
                                />
                                <Input
                                    type="password"
                                    className="col col-12"
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    placeholder="Confirm Password"
                                    {...handleValidationForm('confirmPassword', errorsPassword)}
                                    ref={registerPassword({
                                        validate: {
                                            value: value => value ===  getPasswordValues().newPassword ? true : "Password must match",
                                        }
                                    })}
                                />
                            </form>
                        </ModalContent>
                        <ModalFooter>
                            <Button sizeButton="large" onClick={() => { props.saveProfilePassword(getPasswordValues().currentPassword, getPasswordValues().newPassword); setPasswordModalToggle(false) }} typeButton="primary">Change Password</Button>
                            <Button sizeButton="large" onClick={() => setPasswordModalToggle(false)} typeButton="tertiary">Cancel</Button>
                        </ModalFooter>
                    </>
                    : null
                }
            </Modal>
            {/* Will do real prompt when connected to endpoint */}
            <Prompt when={dirty} message='' />
        </div>
    )
}