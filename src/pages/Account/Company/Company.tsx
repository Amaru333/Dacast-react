import * as React from 'react';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { Text } from '../../../components/Typography/Text';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Card } from '../../../components/Card/Card';
import { DragAndDrop } from '../../../components/DragAndDrop/DragAndDrop';
import { formSubmit, ValueInput, handleValidationProps } from '../../../utils/hooksFormSubmit';
import {CompanyPageContainer, ButtonStyle, BorderStyle, ImageStyle, TextStyle, LinkStyle, ButtonsArea, AccountIdLabel, AccountIdContainer, AccountIdText} from './CompanyStyle';
import { CompanyPageInfos } from '../../../redux-flow/store/Account/Company/types';
import { countries } from 'countries-list';
import { IconStyle } from '../../../shared/Common/Icon';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Prompt } from 'react-router';

interface CompanyComponentProps {
    CompanyPageDetails: CompanyPageInfos;
    getCompanyPageDetails: Function;
    saveCompanyPageDetails: Function;
    getUploadLogoUrl: Function;
    uploadCompanyLogo: Function;
}

export const CompanyPage = (props: CompanyComponentProps) => {

    /** Validation */
    let formRef = React.useRef<HTMLFormElement>(null);
    let {value, validations, enabledSubmit, displayFormActionButtons} = formSubmit(formRef);

    let {CompanyPageDetails} = props;
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, data: ValueInput) => {
        event.preventDefault();
        props.saveCompanyPageDetails({
            accountName: data['accountName'].value,
            businessName: data['businessName'].value,
            contactNumber: data['contactNumber'].value,
            emailAddress: data['emailAddress'].value,
            companyWebsite: data['companyWebsite'].value,
            vatNumber: data['vatNumber'].value,
            addressLine1: data['addressLine1'].value,
            addressLine2: data['addressLine2'].value,
            state: data['state'].value,
            town: data['town'].value,
            zipCode: data['zipCode'].value,
            country: ""
        })

    }

    const [uploadedFileUrl, setUploadedFileUrl] = React.useState<string>(null);
    const [logoFile, setLogoFile] = React.useState<File>(null);
    const [errorMessage, setErrorMessage] = React.useState<string>('')
    const [defaultCountryValue, setDefaultCountryValue] = React.useState<string>('')
    const [pageEdited, setPageEdited] = React.useState<boolean>(false)

    React.useEffect(() => {
        setDefaultCountryValue(countries[Object.keys(countries).filter((item: string) => {return countries[item].name.includes(CompanyPageDetails.country)})[0]].name)
        setUploadedFileUrl(CompanyPageDetails.logoUrl)
    }, []);

    /**  Drag and drop or browse file LOGO SECTION AND FUNCTIN COMMENTED OUT FOR V2 */


    const handleDrop = (file: FileList) => {
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/svg'];
        if(file.length > 0 && acceptedImageTypes.includes(file[0].type)) {
            const reader = new FileReader();
            reader.onload = () => {
                let acceptedRatio = true;
                const img = new Image();
                img.onload = () => {
                    //acceptedRatio = (img.width / img.height) / 4 === 1 && img.width <= 240 ? true : false;
                }
                if(acceptedRatio) {
                    setUploadedFileUrl(reader.result.toString())
                    setLogoFile(file[0])
                    setErrorMessage('')
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
    }

    const handleUpload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        await props.getUploadLogoUrl();
        if(props.CompanyPageDetails.uploadLogoUrl) {
            props.uploadCompanyLogo(logoFile, props.CompanyPageDetails.uploadLogoUrl);
        }
    }

    const copyKey = (value: string) => {
        var textArea = document.createElement("textarea");
        textArea.value = value;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
    }
    
    return (
        <CompanyPageContainer>
            <Card className='clearfix p2'>
                <div className="m1" ><Text size={20} weight='med'>Logo</Text></div>
                <div className="m1"><Text size={14} weight='reg'>This will be displayed in the navigation on your account.</Text></div>
                <div className="lg-col lg-col-12 mb1">
                    <DragAndDrop hasError={errorMessage.length > 0} className="lg-col lg-col-6 mx1" handleDrop={handleDrop}>
                        { uploadedFileUrl ? 
                        <>
                        <ImageStyle src={uploadedFileUrl}></ImageStyle>
                        <Button sizeButton='xs' typeButton='secondary' style={{position:'absolute', right:'8px', top:'8px'}} buttonColor='blue' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleDelete(e)}>Delete</Button>
                        <Button sizeButton='xs' typeButton='primary' style={{position:'absolute', right:'8px', top:'40px'}} buttonColor='blue' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleUpload(e)}>Upload</Button>
                        </>
                            :
                        <>
                        <IconStyle className='pt3 center' customsize={40} coloricon='dark-violet'>cloud_upload</IconStyle>
                        <div className='center'><Text   size={14} weight='med' color='gray-1'>Drag and drop files here</Text></div>
                        <div className='center'><Text size={12} weight='reg' color='gray-3'>or </Text></div>
                        <ButtonStyle className='my1'>
                            <Button style={{marginBottom:26}} sizeButton='xs' typeButton='secondary' buttonColor='blue'>    
                                <label htmlFor='browseButton'>
                                    <LinkStyle>
                                        <input type='file' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{display:'none'}} id='browseButton' />
                                        Browse Files
                                    </LinkStyle>
                                </label>
                            </Button>
                        </ButtonStyle>
                        </>
                        } 
                    </DragAndDrop>
                </div>

                {errorMessage.length > 0 ?<div className="py1 mx1"  ><Text size={10} weight='reg' color='red'>{errorMessage}</Text></div> : null}
                <div className="mb25 ml1" ><Text size={10} weight='reg' color='gray-3'>240px max width and ratio of 4:1 image formats: JPG, PNG, SVG, GIF</Text></div>
                <BorderStyle className="p1 mx1" />
                <form id='companyPageForm' onSubmit={(event) => handleSubmit(event, value)} ref={formRef} noValidate>
                    <TextStyle className="mx1 my2"><Text size={20} weight='med'>Details</Text></TextStyle>
                    <div className="col col-12 flex flex-column">
                        <AccountIdLabel>
                            <Text size={14} weight="med">Account ID</Text>
                        </AccountIdLabel>
                        <AccountIdContainer className="col col-3">
                            <AccountIdText size={14} weight="reg"></AccountIdText>
                            <IconStyle className='pointer' id="copyEmbedTooltip" onClick={() => copyKey("copied")}>file_copy_outlined</IconStyle>
                            <Tooltip target="copyEmbedTooltip">Copy to clipboard</Tooltip>
                        </AccountIdContainer>
                    </div>
                    <div className="md-col md-col-12">
                        <Input 
                            disabled={false} 
                            defaultValue={CompanyPageDetails.accountName}
                            type="text" 
                            className="md-col md-col-6 p1" 
                            id="accountName" 
                            label="Account Name" 
                            placeholder="Account Name"
                            onChange={() => setPageEdited(true)} 
                            required
                            {...handleValidationProps('accountName', validations)}
                        />
                        <Input 
                            disabled={false}
                            defaultValue={CompanyPageDetails.businessName} 
                            type="text" 
                            className="md-col md-col-6 p1" 
                            id="businessName" 
                            label="Business Name" 
                            placeholder="Business Name"
                            onChange={() => setPageEdited(true)}
                            indicationLabel='Optional'
                            required
                            {...handleValidationProps('businessName', validations)} 
                        />
                    </div>
                    <div className="md-col md-col-12" >
                        <Input 
                            disabled={false} 
                            defaultValue={CompanyPageDetails.contactNumber}
                            type="tel" 
                            className="md-col md-col-6 p1" 
                            id="contactNumber" 
                            label="Phone Number" 
                            placeholder="(00) 0000 0000 00" 
                            onChange={() => setPageEdited(true)}
                            required
                            {...handleValidationProps('contactNumber', validations)}
                        />
                        <Input 
                            disabled={false} 
                            defaultValue={CompanyPageDetails.emailAddress}
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
                        <Input 
                            disabled={false} 
                            defaultValue={CompanyPageDetails.companyWebsite}
                            type="text" 
                            className="md-col md-col-6 p1" 
                            id="companyWebsite"
                            label="Company Website" 
                            placeholder="Company Website"
                            onChange={() => setPageEdited(true)} 
                            required
                            {...handleValidationProps('companyWebsite', validations)}
                        />
                        <Input 
                            disabled={false} 
                            defaultValue={CompanyPageDetails.vatNumber}
                            type="text" 
                            className="md-col md-col-6 p1" 
                            id="vatNumber" 
                            label="VAT Number" 
                            placeholder="VAT Number"
                            onChange={() => setPageEdited(true)} 
                            indicationLabel='Optional'
                            required={false}
                            {...handleValidationProps('vatNumber', validations)}
                        />
                    </div>

                    <BorderStyle className="p1 mx1" />

                    <TextStyle className="px1 pt2 pb1" >
                        <Text size={20} weight='med'>Address</Text>
                        <Text color='gray-4' size={12} weight='reg'>Optional</Text>
                    </TextStyle>
                    <div className="md-col md-col-12">
                        <Input 
                            disabled={false} 
                            defaultValue={CompanyPageDetails.addressLine1}
                            type="text" 
                            className="md-col md-col-6 p1" 
                            id="addressLine1" 
                            label="Address line 1" 
                            placeholder="Address line 1"
                            onChange={() => setPageEdited(true)} 
                            required
                            {...handleValidationProps('addressLine1', validations)}                      
                        />

                        <Input  
                            disabled={false} 
                            defaultValue={CompanyPageDetails.addressLine2}
                            type="text" 
                            className="md-col md-col-6 p1" 
                            id="addressLine2" 
                            label="Address line 2" 
                            placeholder="Address line 2"
                            onChange={() => setPageEdited(true)} 
                            required={false}
                            {...handleValidationProps('addressLine2', validations)}
                        />
                    </div>
                    <div className="md-col md-col-12">
                        <Input 
                            disabled={false} 
                            defaultValue={CompanyPageDetails.state}
                            type="text" 
                            className="sm-col md-col-3 sm-col-6 p1" 
                            id="state" 
                            label="State" 
                            placeholder="State"
                            onChange={() => setPageEdited(true)} 
                            required={false}
                            {...handleValidationProps('state', validations)}
                        />

                        <Input 
                            disabled={false} 
                            defaultValue={CompanyPageDetails.town}
                            type="text" 
                            className="sm-col md-col-3 sm-col-6 p1" 
                            id="town" 
                            label="Town" 
                            placeholder="Town"
                            onChange={() => setPageEdited(true)} 
                            required
                            {...handleValidationProps('town', validations)}
                        />

                        <Input  
                            disabled={false} 
                            defaultValue={CompanyPageDetails.zipCode}
                            type="text" 
                            className="sm-col md-col-3 sm-col-6 p1" 
                            id="zipCode" 
                            label="Zip/Post Code" 
                            placeholder="Zip/Post Code"
                            onChange={() => setPageEdited(true)} 
                            required
                            {...handleValidationProps('zipCode', validations)}
                    
                        />
                        <DropdownSingle hasSearch dropdownDefaultSelect={defaultCountryValue} className="sm-col md-col-3 sm-col-6 p1" id='country' dropdownTitle='Country' list={Object.keys(countries).reduce((reduced: DropdownListType, item: string)=> {return {...reduced, [countries[item].name]: false}},{})} />

                    </div>
                </form>
            </Card>            
            { 
                displayFormActionButtons ?
                    <ButtonsArea> 
                        <Button disabled={!enabledSubmit} type='submit' form='companyPageForm' className="my2" typeButton='primary' buttonColor='blue'>Save</Button>
                        <Button type='reset' form='companyPageForm' className="m2" typeButton='tertiary' buttonColor='blue' onClick={() => setPageEdited(false)}>Discard</Button>
                    </ButtonsArea>
                    : null
            }     
            <Prompt when={pageEdited} message='' />     
        </CompanyPageContainer>
    )
}
