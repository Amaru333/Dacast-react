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
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { AvatarInputContainer, ToggleTextInfo, ToggleContainer } from './ProfileStyle'
import { Prompt } from 'react-router';
import { useForm } from 'react-hook-form';
import { Bubble } from '../../../../components/Bubble/Bubble';
import { IconStyle } from '../../../../shared/Common/Icon';
import { ProfileComponentProps } from '../../../containers/Account/Profile';
import { Divider } from '../../../../shared/MiscStyles';
import { languageDropdownList, timezoneDropdownList } from '../../../../utils/DropdownLists'
import  EventHooker from '../../../../utils/services/event/eventHooker'
import { guessTimezone } from '../../../../utils/services/date/dateService';
import { Trans, useTranslation } from 'react-i18next';

export const ProfilePage = (props: ProfileComponentProps) => {

    const [passwordModalToggle, setPasswordModalToggle] = React.useState<boolean>(false)
    const [submitLoading, setSubmitLoading] = React.useState<boolean>(false)
    const [passwordModalErrorHidden, setPasswordModalErrorHidden] = React.useState<boolean>(true)
    const [currentPasswordVisible, setCurrentPasswordVisible] = React.useState<boolean>(false)
    const [newPasswordVisible, setNewPasswordVisible] = React.useState<boolean>(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState<boolean>(false)
    const [changePasswordButtonLoading, SetChangePasswordButtonLoading] = React.useState<boolean>(false)
    const { i18n, t } = useTranslation()
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
        EventHooker.dispatch('EVENT_FORCE_LOGOUT', undefined)
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

    console.log(languageDropdownList.find( l => l.data.id === i18n.language))
    return (
        <div>
            <Card>
                <form id='profilePageForm' onSubmit={handleSubmit(onSubmit)} >
                    <div className="mx1 my2"><Text size={20} weight='med'>{t('common_content_general_details_title')}</Text></div>
                    <div className="md-col md-col-12">
                        <Input
                            type="text"
                            className="md-col md-col-6 px1 pb1"
                            id="firstName"
                            label={t('account_profile_first_name_title')}
                            placeholder={t('account_profile_first_name_title')}
                            {...handleValidationForm('firstName', errors)} ref={register({ required: "Required" })}
                        />
                        <AvatarInputContainer className="md-col md-col-6 px1 pb1">
                            <Input
                                className="col col-11"
                                id="lastName"
                                label={t('account_profile_last_name_title')}
                                placeholder={t('account_profile_last_name_title')}
                                {...handleValidationForm('lastName', errors)} ref={register({ required: "Required" })}
                            />
                            <Avatar className="col col-1 ml1 mt3" size='large' name={props.ProfilePageDetails.firstName + ' ' + props.ProfilePageDetails.lastName} />
                        </AvatarInputContainer>

                    </div>
                    <div className="md-col md-col-12" >
                        <Input
                            className="md-col md-col-6 p1"
                            id="phoneNumber"
                            label={t('account_profile_phone_title')}
                            placeholder="(00) 0000 0000 00"
                            {...handleValidationForm('phoneNumber', errors, 'tel', register)}

                        />
                        <Input
                            disabled
                            type="email"
                            className="md-col md-col-6 p1"
                            id="newEmail"
                            label={t('account_profile_email_title')}
                            placeholder={t('account_profile_email_title')}
                            {...handleValidationForm('newEmail', errors, 'email', register)}
                        />
                    </div>
                    <div className="md-col md-col-12">
                        <input type="hidden" name="timezone" ref={register()} />
                        <DropdownSingle
                            className="md-col md-col-6 p1"
                            hasSearch
                            dropdownTitle={t('common_datetime_picker_timezone_title')}
                            dropdownDefaultSelect={props.ProfilePageDetails.timezone ? props.ProfilePageDetails.timezone : guessTimezone()}
                            id='dropdownTimezone'
                            callback={(item: DropdownSingleListItem) => { setValue('timezone', item.title) }}
                            list={timezoneDropdownList}
                        />
                        <input type="hidden" name="language" ref={register()} />
                        <DropdownSingle
                            className="md-col md-col-6 p1"
                            hasSearch
                            dropdownTitle='Language'
                            dropdownDefaultSelect={languageDropdownList.find( l => l.data.id === props.ProfilePageDetails.language) ? languageDropdownList.find( l => l.data.id === props.ProfilePageDetails.language).title : languageDropdownList.find( l => l.data.id === i18n.language) ? languageDropdownList.find( l => l.data.id === i18n.language).title : null}
                            id='dropdownLanguage'
                            callback={(item: DropdownSingleListItem) => { i18n.changeLanguage(item.data.id); setValue('language', item.data.id) }}
                            list={languageDropdownList}
                        />
                    </div>
                    <Divider className="p1 mx1" />

                    <div className="px1 pt25 pb2" ><Text size={20} weight='med' color='gray-1'>{t('account_profile_change_password_title')}</Text></div>

                    <p className="mx1 my0"><Text size={12} weight='reg' color='gray-3'><Trans i18nKey='account_profile_las_changed_text'>Password last changed: {{date: props.ProfilePageDetails.passwordLastChanged}}</Trans></Text></p>

                    <p className="mx1"><Text size={14} weight='reg' color='gray-3'>{t('account_profile_password_best_practices')}</Text></p>

                    <Button className="m1" sizeButton='xs' onClick={(event) => { event.preventDefault(); setPasswordModalToggle(true) }} typeButton='secondary' buttonColor='blue'><Text size={12} weight='reg' color='dark-violet'>{t('account_profile_change_password_title')}</Text></Button>

                    <Divider className="p1 mx1" />

                    <div className="px1 pt25 pb2" ><Text size={20} weight='med' color='gray-1'>{t('account_profile_email_notifications_toggle')}</Text></div>

                    <ToggleContainer>
                        <Toggle name="marketing" refForwarded={register()}  
                            id="marketingToggle" label={t('account_profile_marketing_toggle')} defaultChecked={props.ProfilePageDetails.marketing}  />
                        <ToggleTextInfo className="mt1"><Text size={14} weight='reg' color='gray-3'>{t('account_profile_marketing_description')}</Text></ToggleTextInfo>
                    </ToggleContainer>

                    <ToggleContainer className="mt25">
                        <Toggle name="lowData" refForwarded={register()} 
                            id="lowData" label={t('account_profile_low_data_toggle')} defaultChecked={props.ProfilePageDetails.lowData} />
                        <ToggleTextInfo className="mt1"><Text size={14} weight='reg' color='gray-3'>{t('account_profile_low_data_description')}</Text></ToggleTextInfo>
                    </ToggleContainer>

                    <ToggleContainer className="mt25">
                        <Toggle name="videoUpload" refForwarded={register()} 
                            id="uploadToggle" label={t('account_profile_video_upload_toggle')} defaultChecked={props.ProfilePageDetails.videoUpload} />
                        <ToggleTextInfo className="mt1"><Text size={14} weight='reg' color='gray-3'>{t('account_profile_video_upload_description')}</Text></ToggleTextInfo>
                    </ToggleContainer>
                </form>

            </Card>
            {
                dirty &&
                    <div>
                        <Button isLoading={submitLoading} type="submit" form="profilePageForm"  className="my2" typeButton='primary' buttonColor='blue'>{t('common_button_text_save')}</Button>
                        <Button type='reset' form="profilePageForm" onClick={() => { reset(props.ProfilePageDetails, {errors: true}); props.showDiscardToast("Changes have been discarded", 'fixed', "success") }} className="m2" typeButton='tertiary' buttonColor='blue'>Discard</Button>
                    </div>
            }

            <Modal allowNavigation={false} hasClose={false} opened={passwordModalToggle} toggle={() => setPasswordModalToggle(!passwordModalToggle)} size="small" modalTitle="Change Password">
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
                            </form>
                            <Bubble type='info' className='my2'>After changing your password, you will be logged out of your session.</Bubble>
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