import * as React from 'react';
import { Avatar } from '../../../../components/Avatar/Avatar';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Toggle } from '../../../../components/Toggle/toggle';
import { Text } from '../../../../components/Typography/Text';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Card } from '../../../../components/Card/Card';
import { handleValidationForm } from '../../../utils/custom-hooks/formValidationHook';
import { Modal, ModalContent, ModalFooter } from '../../../../components/Modal/Modal';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownListType, DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { AvatarInputContainer, ToggleTextInfo, ToggleContainer } from './ProfileStyle'
import { Prompt } from 'react-router';
import { useForm } from 'react-hook-form';
import { Bubble } from '../../../../components/Bubble/Bubble';
import { IconStyle } from '../../../../shared/Common/Icon';
import { DateTime } from 'luxon';
import { tsToLocaleDate } from '../../../../utils/formatUtils';
import { ProfileComponentProps } from '../../../containers/Account/Profile';
import { Divider } from '../../../shared/Common/MiscStyle';
import { axiosClient } from '../../../utils/services/axios/axiosClient';
import { timezoneDropdownList } from '../../../../utils/DropdownLists'
import  EventHooker from '../../../../utils/services/event/eventHooker'

var moment = require('moment-timezone');

export const ProfilePage = (props: ProfileComponentProps) => {

    const [passwordModalToggle, setPasswordModalToggle] = React.useState<boolean>(false)
    const [submitLoading, setSubmitLoading] = React.useState<boolean>(false)
    const [passwordModalErrorHidden, setPasswordModalErrorHidden] = React.useState<boolean>(true)
    const [currentPasswordVisible, setCurrentPasswordVisible] = React.useState<boolean>(false)
    const [newPasswordVisible, setNewPasswordVisible] = React.useState<boolean>(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState<boolean>(false)
    const [changePasswordButtonLoading, SetChangePasswordButtonLoading] = React.useState<boolean>(false)

    /** Validation */
    const { register, handleSubmit, errors, setValue, reset, formState, getValues } = useForm({
        reValidateMode: 'onChange',
        mode: 'onBlur',
        defaultValues: {...props.ProfilePageDetails, newEmail: props.ProfilePageDetails.emailAddress},
    })

    const { dirty } = formState;

    const handleSubmitCleanup = (data: any) => {
        setSubmitLoading(false)
        reset(data)
    }

    React.useEffect(() => {
        EventHooker.subscribe('EVENT_FORCE_TOKEN_REFRESH', handleSubmitCleanup)

        return () => {
            EventHooker.unsubscribe('EVENT_FORCE_TOKEN_REFRESH', handleSubmitCleanup)
        }
    }, [])

    const onSubmit = (data: any) => {
        setSubmitLoading(true)
        props.saveProfilePageDetails(data).then(() => {
            EventHooker.dispatch('EVENT_FORCE_TOKEN_REFRESH', data)
        })
    }

    const handlePasswordSuccess = () => {
        setPasswordModalErrorHidden(true)
        setPasswordModalToggle(false)
        SetChangePasswordButtonLoading(false)
    }

    const handlePasswordError = () => {
        setPasswordModalErrorHidden(false)
        SetChangePasswordButtonLoading(false)
    }

    const onPasswordSubmit = () => {
        props.saveProfilePassword(getPasswordValues().currentPassword, getPasswordValues().newPassword)
        .then(() => {
            handlePasswordSuccess()
        }).catch(() => {
            handlePasswordError()
        })  
    };
        
    const { register: registerPassword, handleSubmit: handleSubmitPassword, errors: errorsPassword, getValues: getPasswordValues } = useForm({
        reValidateMode: 'onChange',
        mode: 'onBlur'
    })


    return (
        <div>
            <Card>
                <form id='profilePageForm' onSubmit={handleSubmit(onSubmit)} >
                    <div className="mx1 my2"><Text size={20} weight='med'>Details</Text></div>
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
                            disabled
                            type="email"
                            className="md-col md-col-6 p1"
                            id="newEmail"
                            label="Email Address"
                            placeholder="Email Address"
                            {...handleValidationForm('newEmail', errors, 'email', register)}
                        />
                    </div>
                    <div className="md-col md-col-12">
                        <input type="hidden" name="timezone" ref={register()} />
                        <DropdownSingle
                            className="md-col md-col-6 p1"
                            hasSearch
                            dropdownTitle='Timezone'
                            dropdownDefaultSelect={props.ProfilePageDetails.timezone ? props.ProfilePageDetails.timezone : moment.tz.guess}
                            id='dropdownTimezone'
                            callback={(item: DropdownSingleListItem) => { setValue('timezone', item.title) }}
                            list={timezoneDropdownList}
                        />
                    </div>
                    <Divider className="p1 mx1" />

                    <div className="px1 pt25 pb2" ><Text size={20} weight='med' color='gray-1'>Change Password</Text></div>

                    <p className="mx1 my0"><Text size={12} weight='reg' color='gray-3'>Password last changed: {props.ProfilePageDetails.passwordLastChanged}</Text></p>

                    <p className="mx1"><Text size={14} weight='reg' color='gray-3'>For best security practices you should update your password every 6 months.</Text></p>

                    <Button className="m1" sizeButton='xs' onClick={(event) => { event.preventDefault(); setPasswordModalToggle(true) }} typeButton='secondary' buttonColor='blue'><Text size={12} weight='reg' color='dark-violet'>Change password</Text></Button>

                    <Divider className="p1 mx1" />

                    <div className="px1 pt25 pb2" ><Text size={20} weight='med' color='gray-1'>Email Notifications</Text></div>

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
                dirty &&
                    <div>
                        <Button isLoading={submitLoading} type="submit" form="profilePageForm"  className="my2" typeButton='primary' buttonColor='blue'>Save</Button>
                        <Button type='reset' form="profilePageForm" onClick={() => { reset(props.ProfilePageDetails, {errors: true}); props.showDiscardToast("Changes have been discarded", 'fixed', "success") }} className="m2" typeButton='tertiary' buttonColor='blue'>Discard</Button>
                    </div>
            }

            <Modal hasClose={false} opened={passwordModalToggle} toggle={() => setPasswordModalToggle(!passwordModalToggle)} size="small" modalTitle="Change Password">
                {passwordModalToggle &&
                    <>
                        <ModalContent>
                            <form onSubmit={handleSubmitPassword(onPasswordSubmit)}>
                                <div className="relative flex col col-12 mt1">
                                <Input
                                    type={currentPasswordVisible ? "text" : "password"}
                                    id="currentPassword"
                                    label="Current Password"
                                    className="col col-12"
                                    placeholder="Current Password"
                                    {...handleValidationForm('currentPassword', errorsPassword)} ref={registerPassword({ required: "Required" })}
                                />
                                <IconStyle onClick={() => setCurrentPasswordVisible(!currentPasswordVisible)} className='absolute pointer top-0 right-0 pt35 pr2' coloricon='gray-3'>{!currentPasswordVisible ? 'visibility_off' : 'visibility_on'}</IconStyle>
                                </div>
                                <div className="col col-12 mt2 relative flex">
                                <Input
                                    type={newPasswordVisible ? "text" : "password"}
                                    className="col col-12"
                                    id="newPassword"
                                    label="New Password"
                                    placeholder="New Password"
                                    {...handleValidationForm('newPassword', errorsPassword, 'password', registerPassword)}
                                    help="Password must contain at least 6 characters"
                                />
                                <IconStyle onClick={() => setNewPasswordVisible(!newPasswordVisible)} className='absolute pointer top-0 right-0 pt35 pr2' coloricon='gray-3'>{!newPasswordVisible ? 'visibility_off' : 'visibility_on'}</IconStyle>
                                </div>
                                <div className="col col-12 mt2 flex relative">
                                <Input
                                    type={confirmPasswordVisible ? "text" : "password"}
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
                                <IconStyle onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className='absolute pointer top-0 right-0 pt35 pr2' coloricon='gray-3'>{!confirmPasswordVisible ? 'visibility_off' : 'visibility_on'}</IconStyle>
                                </div>
                                <div className="col col-12 mt2 flex relative">
                                </div>
                            </form>
                            <Bubble hidden={passwordModalErrorHidden} type='error' className='my2'>
                            Unable to change your password. Please check your details and try again.
                    </Bubble>
                        </ModalContent>
                        <ModalFooter>
                            <Button sizeButton="large" onClick={() => {onPasswordSubmit();SetChangePasswordButtonLoading(true)}} typeButton="primary" isLoading={changePasswordButtonLoading}>Change Password</Button>
                            <Button sizeButton="large" onClick={() => {setPasswordModalToggle(false);setPasswordModalErrorHidden(true)}} typeButton="tertiary">Cancel</Button>
                        </ModalFooter>
                    </>
                }
            </Modal>
            {/* Will do real prompt when connected to endpoint */}
            <Prompt when={dirty} message='' />
        </div>
    )
}