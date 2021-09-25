import * as React from 'react';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { Text } from '../../../../components/Typography/Text';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Card } from '../../../../components/Card/Card';
import { DragAndDrop } from '../../../../components/DragAndDrop/DragAndDrop';
import { handleValidationForm } from '../../../utils/custom-hooks/formValidationHook';
import { CompanyPageContainer, ButtonStyle, ImageStyle, ButtonsArea, AccountIdLabel, AccountIdContainer, AccountIdText} from './CompanyStyle';
import { CompanyPageInfos } from '../../../redux-flow/store/Account/Company/types';
import { countries } from 'countries-list';
import { IconStyle } from '../../../../shared/Common/Icon';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { Prompt, useHistory } from 'react-router';
import { updateClipboard } from '../../../utils/utils';
import { LoadingSpinner } from '../../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { useForm } from 'react-hook-form';
import { useKeyboardSubmit } from '../../../../utils/utils';
import { CompanyComponentProps } from '../../../containers/Account/Company';
import { Divider } from '../../../../shared/MiscStyles';
import { userToken } from '../../../utils/services/token/tokenService';
import { User } from '../../../redux-flow/store/Account/Users/types';
import EventHooker from '../../../../utils/services/event/eventHooker';
import { useTranslation } from 'react-i18next';

export const CompanyPage = (props: CompanyComponentProps) => {

    /** Validation */
    const { register, handleSubmit, errors, setValue, reset, formState } = useForm({
        reValidateMode: 'onChange',
        mode: 'onBlur',
        defaultValues: props.CompanyPageDetails,
    })
    const { dirty } = formState;

    let history = useHistory();

    useKeyboardSubmit( () => handleSubmit(onSubmit) )
    
    let {CompanyPageDetails} = props;

    const [uploadedFileUrl, setUploadedFileUrl] = React.useState<string>(props.CompanyPageDetails.logoURL);
    const [logoFile, setLogoFile] = React.useState<File>(null);
    const [errorMessage, setErrorMessage] = React.useState<string>('')
    const [uploadButtonLoading, setUploadButtonLoading] = React.useState<boolean>(false)
    const [submitLoading, setSubmitLoading] = React.useState<boolean>(false)
    const [edited, setEdited] = React.useState<boolean>(false)
    const [selectedCountry, setSelectedCountry] = React.useState<string>(null)
    const [newOwner, setNewOwner] = React.useState<User>(null)
    const [changeOwnerButtonLoading, setChangeOwnerButtonLoading] = React.useState<boolean>(false)
    const { t } = useTranslation()
    
    const getUserRole = () => {
        if(!props.multiUserDetails || !props.multiUserDetails.users) {
            return false
        }

        if(!props.multiUserDetails.users.find(user => user.role === "Owner")) {
            return false
        }

        return props.multiUserDetails.users.find(user => user.role === "Owner").userId === userToken.getUserInfoItem('user-id')
    }

    const isUserAccountOwner = getUserRole()

    const countryDropdownList = Object.keys(countries).map((item) => {
        let countryItem: DropdownSingleListItem = {
            title: countries[item].name, 
            data: {code: item}
        }
        return countryItem
    })

    let companyLogoBrowseButtonRef = React.useRef<HTMLInputElement>(null)

    let changeCompanyLogoBrowseButtonRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        if(!props.CompanyPageDetails.logoURL && !props.CompanyPageDetails.uploadLogoUrl) {
            setUploadedFileUrl(CompanyPageDetails.logoURL)
        }
    }, [props.CompanyPageDetails.logoURL])

    /**  Drag and drop or browse file LOGO SECTION AND FUNCTIN COMMENTED OUT FOR V2 */

    const onSubmit = (data: CompanyPageInfos) => { 
        setSubmitLoading(true)
        props.saveCompanyPageDetails(selectedCountry ? {...data, country: selectedCountry} : data).then(() => {
            setSubmitLoading(false)
            setEdited(false)
            reset(data)
        }).catch(() => setSubmitLoading(false))
    }
    
    const handleDrop = (file: FileList) => {
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/svg'];
        if(file.length > 0 && acceptedImageTypes.includes(file[0].type)) {
            const reader = new FileReader()
            reader.onload = () => {
                let acceptedRatio = true;
                const img = new Image()
                img.onload = () => {
                    //acceptedRatio = (img.width / img.height) / 4 === 1 && img.width <= 240 ? true : false;
                }
                if(acceptedRatio) {
                    setUploadedFileUrl(reader.result.toString())
                    setLogoFile(file[0])
                    setErrorMessage('')
                    setUploadButtonLoading(true)
                    props.getLogoUrlForUploading()
                }
                else {
                    setErrorMessage('Your image ratio is not 4:1 or its width exceeded the limit.')
                }
            }
            reader.readAsDataURL(file[0])
        }
        else{
            setErrorMessage('File provided was not an image, please retry')
        }
    }
    
    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.files && e.target.files.length > 0) {
            handleDrop(e.target.files);
        }
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setUploadedFileUrl(null);
        props.deleteCompanyLogo();
    }

    const handleUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();     
    }

    React.useEffect(() => {
        if(props.CompanyPageDetails.uploadLogoUrl) {
            props.uploadCompanyLogo(logoFile, props.CompanyPageDetails.uploadLogoUrl).then(() => {
                EventHooker.dispatch('EVENT_COMPANY_PAGE_EDITED', undefined)
                setUploadButtonLoading(false)
            })
        }
    }, [props.CompanyPageDetails.uploadLogoUrl])

    const createAccountOwnerList = () => {
        if(props.multiUserDetails && props.multiUserDetails.users) {
            return props.multiUserDetails.users.filter(user => (user.role !== "Owner" && user.status === 'Active')).map((user): DropdownSingleListItem => {
                return {
                    title:  `${user.firstName} ${user.lastName} (${user.email})`,
                    data: {
                        userId: user.userId,
                        role: user.role
                    },
                    description: user.role
                }
            })
        }
        return null
    }

    const handleOwnerChange = () => {
        setChangeOwnerButtonLoading(true)
        props.makeUserOwner(newOwner.userId)
        .then(() => setChangeOwnerButtonLoading(false))
        .catch(() => setChangeOwnerButtonLoading(false))
    }
    
    return (
        <CompanyPageContainer>
            <Card className='clearfix p2'>
                <div className="m1" ><Text size={20} weight='med'>{t('account_company_logo_title')}</Text></div>
                <div className="m1"><Text size={14} weight='reg'>{t('account_company_logo_description')}</Text></div>
                <div className="lg-col lg-col-12 mb1">
                    <DragAndDrop hasError={errorMessage.length > 0} className="lg-col lg-col-6 mx1 flex flex-column" handleDrop={handleDrop}>
                        { uploadedFileUrl ? 
                        <>
                            <div className="flex flex-column">
                                {props.CompanyPageDetails.isUploading && <SpinnerContainer style={{zIndex: 1000}}>
                                    <LoadingSpinner className='mx-auto' color='violet' size='small' /> 
                                </SpinnerContainer>}
                                <div style={{width:'100%'}} className=''>
                                    <input type='file' ref={changeCompanyLogoBrowseButtonRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{display:'none'}} id='changeButton' />
                                    <Button className="clearfix right my1 mr1" sizeButton='xs' typeButton='secondary'  buttonColor='blue' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleDelete(e)}>Delete</Button>
                                    <Button onClick={() => {changeCompanyLogoBrowseButtonRef.current.click()} } className="clearfix right my1 mr1" sizeButton='xs' typeButton='secondary'  buttonColor='blue'>
                                        {t('common_button_text_change')}
                                    </Button>
                                </div>
                                <ImageStyle src={uploadedFileUrl}></ImageStyle>
                            </div>
                        </>
                            :
                        <>
                        <IconStyle className='pt3 center mx-auto' customsize={40} coloricon='dark-violet'>cloud_upload</IconStyle>
                        <div className='center'><Text   size={14} weight='med' color='gray-1'>{t('common_engagement_brand_image_drag_and_drop_instruction')}</Text></div>
                        <div className='center'><Text size={12} weight='reg' color='gray-3'>{t('common_engagement_brand_image_drag_and_drop_info_text_2')}</Text></div>
                        <ButtonStyle className='my1'>
                            <input type='file' ref={companyLogoBrowseButtonRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{display:'none'}} id='browseButton' />
                            <Button onClick={() => {companyLogoBrowseButtonRef.current.click()} } style={{marginBottom:26}} sizeButton='xs' typeButton='secondary' buttonColor='blue'>    
                                {t('common_button_text_browse')}
                            </Button>
                        </ButtonStyle>
                        </>
                        } 
                    </DragAndDrop>
                </div>

                {
                    errorMessage.length > 0 &&
                        <div className="py1 mx1"  >
                            <Text size={10} weight='reg' color='red'>{errorMessage}</Text>
                        </div>
                }
                <div className="mb25 ml1" ><Text size={10} weight='reg' color='gray-3'>{t('account_company_logo_dimesions')}</Text></div>

                <Divider className="p1 mx1" />

                <form id='companyPageForm' onSubmit={handleSubmit(onSubmit)}>
                    <div className="mx1 my2"><Text size={20} weight='med'>{t('common_content_general_details_title')}</Text></div>
                    <div className="col col-12 flex flex-column">
                        <AccountIdLabel>
                            <Text size={14} weight="med">{t('account_company_user_id_title')}</Text>
                        </AccountIdLabel>
                        <AccountIdContainer className="col col-12 lg-col-3 sm-col-4 flex p1 clearfix">
                            <AccountIdText className='flex-auto pl1' size={14} weight="reg">{userToken.getUserInfoItem('salesforce-group-id')}</AccountIdText>
                            <IconStyle className='pointer' id="copyEmbedTooltip" onClick={() => updateClipboard(userToken.getUserInfoItem('salesforce-group-id'), 'Account ID copied to clipboard')}>file_copy_outlined</IconStyle>
                            <Tooltip target="copyEmbedTooltip">Copy to clipboard</Tooltip>
                        </AccountIdContainer>
                    </div>
                    <div className="md-col md-col-12 clearfix">
                        <Input 
                            disabled={false} 
                            defaultValue={CompanyPageDetails.accountName}
                            type="text" 
                            className="md-col md-col-6 p1" 
                            id="accountName" 
                            label={t('account_company_contact_name_title')}
                            placeholder={t('account_company_contact_name_title')}
                            {...handleValidationForm('accountName', errors)} ref={register({ required: "Required"})}
                            onChange={(event) => {setEdited(true); setValue('accountName', event.currentTarget.value)}}
                            help={t('account_company_contact_name_description')}
                        />
                        <Input 
                            disabled={false}
                            defaultValue={CompanyPageDetails.companyName} 
                            type="text" 
                            className="md-col md-col-6 p1" 
                            id="companyName" 
                            label={t('account_company_company_name_title')}
                            placeholder={t('account_company_company_name_title')}
                            {...handleValidationForm('companyName', errors)}
                            onChange={(event) => {setEdited(true); setValue('companyName', event.currentTarget.value)}}
                            name="companyName" ref={register()}
                            help={t('account_company_company_name_description')}
                        />
                    </div>
                    <div className="md-col md-col-12" >
                        <Input 
                            disabled={false} 
                            defaultValue={CompanyPageDetails.contactNumber}
                            type="tel" 
                            className="md-col md-col-6 p1" 
                            id="contactNumber" 
                            label={t('account_profile_phone_title')}
                            placeholder="(00) 0000 0000 00" 
                            {...handleValidationForm('contactNumber', errors, 'tel', register)}
                            onChange={(event) => {setEdited(true); setValue('contactNumber', event.currentTarget.value)}}
                        />
                        <Input 
                            disabled={false} 
                            defaultValue={CompanyPageDetails.companyEmail}
                            type="email" 
                            className="md-col md-col-6 p1" 
                            id="companyEmail" 
                            label={t('account_profile_email_title')}
                            placeholder={t('account_profile_email_title')}
                            {...handleValidationForm('companyEmail', errors, 'email', register)}
                            onChange={(event) => {setEdited(true); setValue('companyEmail', event.currentTarget.value)}}

                        />
                    </div>

                    <div className="md-col md-col-12">
                        <Input 
                            disabled={false} 
                            type="text" 
                            className="md-col md-col-6 p1" 
                            id="companyWebsite"
                            label={t('account_company_company_website_title')}
                            placeholder={t('account_company_company_website_title')}
                            {...handleValidationForm('companyWebsite', errors, 'url', register)}
                            onChange={(event) => {setEdited(true); setValue('companyWebsite', event.currentTarget.value)}}

                        />
                        <Input 
                            disabled={false} 
                            type="text" 
                            className="md-col md-col-6 p1" 
                            id="vatNumber" 
                            label={t('account_company_vat_number_title')}
                            placeholder={t('account_company_vat_number_title')}
                            indicationLabel={t('common_input_text_optional')}
                            name="vatNumber" ref={register()}
                            onChange={(event) => {setEdited(true); setValue('vatNumber', event.currentTarget.value)}}
                        />
                    </div>

                    <Divider className="p1 mx1" />

                    {
                        isUserAccountOwner &&
                        <React.Fragment>
                            <div className="px1 pt2 pb1" >
                                <Text size={20} weight='med'>{t('account_company_owner_title')}</Text>
                            </div>
                            <div className="md-col md-col-12 mx1">
                                <div className="col col-12">
                                    <Text size={14} weight='reg'>{t('account_company_owner_description')}</Text>
                                </div>
                                <DropdownSingle 
                                    id="accountOwnerDropdown"
                                    className="col col-6 my2"
                                    dropdownTitle=""
                                    list={createAccountOwnerList() ? createAccountOwnerList() : []}
                                    callback={(value: DropdownSingleListItem) => setNewOwner(value.data as User)}
                                    dropdownDefaultSelect={createAccountOwnerList() && createAccountOwnerList().length && createAccountOwnerList().find(user => user.data.role === "Owner") ? createAccountOwnerList().find(user => user.data.role === "Owner").title : null}
                                />
                                <Button className='ml2 mt2' type='button' isLoading={changeOwnerButtonLoading} onClick={() => handleOwnerChange()} sizeButton='small' buttonColor='blue' typeButton='primary'>{t('account_company_change_owner_button')}</Button>
                            </div>
                            <Divider className="p1 mx1" />
                        </React.Fragment>
                    }

                    <div className="px1 pt2 pb1" >
                        <Text size={20} weight='med'>{t('live_stream_general_encoder_modal_address_field_title')}</Text>
                        <Text color='gray-4' size={12} weight='reg'>{t('common_input_text_optional')}</Text>
                    </div>
                    <div className="md-col md-col-12">
                        <Input 
                            disabled={false} 
                            type="text" 
                            className="md-col md-col-6 p1" 
                            id="addressLine1" 
                            label={t('live_stream_general_encoder_modal_address_field_title')}
                            placeholder={t('live_stream_general_encoder_modal_address_field_title')}
                            name="addressLine1" ref={register()}
                            onChange={(event) => {setEdited(true); setValue('addressLine1', event.currentTarget.value)}}
                        />

                        <Input  
                            disabled={false} 
                            type="text" 
                            className="md-col md-col-6 p1" 
                            id="addressLine2" 
                            label={t('paywall_withdrawals_payment_method_form_adress_2')}
                            placeholder={t('paywall_withdrawals_payment_method_form_adress_2')}
                            name="addressLine2" ref={register()} 
                            onChange={(event) => {setEdited(true); setValue('addressLine2', event.currentTarget.value)}}

                        />
                    </div>
                    <div className="md-col md-col-12">
                        <Input 
                            disabled={false} 
                            type="text" 
                            className="sm-col md-col-3 sm-col-6 p1" 
                            id="state" 
                            label={t('paywall_withdrawals_payment_method_form_state')}
                            placeholder={t('paywall_withdrawals_payment_method_form_state')}
                            name="state" ref={register()}
                            onChange={(event) => {setEdited(true); setValue('state', event.currentTarget.value)}}
                            />

                        <Input 
                            disabled={false} 
                            type="text" 
                            className="sm-col md-col-3 sm-col-6 p1" 
                            id="town" 
                            label={t('paywall_withdrawals_payment_method_form_town')}
                            placeholder={t('paywall_withdrawals_payment_method_form_town')}
                            name="town" ref={register()}
                            onChange={(event) => {setEdited(true); setValue('town', event.currentTarget.value)}}
                            />

                        <Input  
                            disabled={false} 
                            type="text" 
                            className="sm-col md-col-3 sm-col-6 p1" 
                            id="zipCode" 
                            label={t('paywall_withdrawals_payment_method_form_zip')}
                            placeholder={t('paywall_withdrawals_payment_method_form_zip')}
                            name="zipCode" ref={register()}
                            onChange={(event) => {setEdited(true); setValue('zipCode', event.currentTarget.value)}}
                            />
                        {/* <input type="hidden" name="country" id='country' ref={register()} /> */}
                        <DropdownSingle hasSearch 
                            direction='up'
                            callback={(item: DropdownSingleListItem) => {setEdited(true);setSelectedCountry(item.data.code)}}
                            dropdownDefaultSelect={!props.CompanyPageDetails.country ? "" : countries[props.CompanyPageDetails.country] ? countries[props.CompanyPageDetails.country].name : props.CompanyPageDetails.country} className="sm-col md-col-3 sm-col-6 p1" 
                            id='countryDropdown' dropdownTitle={t('common_analytics_table_header_country')}
                            list={countryDropdownList} />
                    </div>
                </form>
            </Card>            
            { 
                edited &&
                    <ButtonsArea> 
                        <Button type='submit' isLoading={submitLoading} form='companyPageForm' className="my2" typeButton='primary' buttonColor='blue'>{t('common_button_text_save')}</Button>
                        <Button type='reset' form='companyPageForm' className="m2" typeButton='tertiary' buttonColor='blue' 
                            onClick={() => {reset(props.CompanyPageDetails, {errors: true});setEdited(false);props.showToast("Changes have been discarded", 'fixed', "success")}}>Discard</Button>
                    </ButtonsArea>
            }     
            <Prompt when={edited} message='' />     
        </CompanyPageContainer>
    )
}
