import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../components/Typography/Text';
import { Input } from '../../components/FormsComponents/Input/Input';
import { Button } from '../../components/FormsComponents/Button/Button';
import { Card } from '../../components/Card/Card';
import Icon from '@material-ui/core/Icon';
import { DragAndDrop } from '../../components/DragAndDrop/DragAndDrop';
import { formSubmit, ValueInput, handleValidationProps } from '../../utils/hooksFormSubmit';
import { connect } from 'react-redux';
import { ApplicationState } from "../../redux-flow/store";
import { CompanyPageInfos, AccountInfos } from '../../redux-flow/store/Account/types';
import { DropdownSingle } from '../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownListType } from '../../components/FormsComponents/Dropdown/DropdownTypes';
import { ThunkDispatch } from 'redux-thunk';
import { AccountAction, getCompanyPageDetailsAction, saveCompanyPageDetailsAction } from '../../redux-flow/store/Account/actions';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
const {getNames} = require('country-list')

interface AccountComponentProps {
    AccountDetails: AccountInfos;
    getCompanyPageDetails: Function;
    saveCompanyPageDetails: Function;
}
export const Company = (props: AccountComponentProps) => {

    /** Validation */
    let formRef = React.useRef<HTMLFormElement>(null);
    let {value, validations, enabledSubmit} = formSubmit(formRef);
    let {AccountDetails} = props;
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, data: ValueInput) => {
        event.preventDefault();
        //props.saveCompanyPageDetails(data)

    }

    /** Fetching data using redux and services */
    React.useEffect( () => {
        props.getCompanyPageDetails();
    }, [])

    const [defaultCountryValue, setDefaultCountryValue] = React.useState<string>('')
    /** Calling toasts depending on services results */


    /**  Drag and drop or browse file  */
    const [fileUploaded, setfileUploaded] = React.useState<string>(null);
    const [errorMessage, setErrorMessage] = React.useState<string>('')

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
                    setfileUploaded(reader.result.toString())
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
        setfileUploaded(null);
    }

    /**  Action buttons */

    const handleDiscard = () => {
        Object.keys(value).forEach((key) => {value[key].value = ''});
    }

    const renderCompanyPage = () => {
        if(defaultCountryValue.length === 0) {
            setDefaultCountryValue(getNames().filter((item: string) => {return AccountDetails.companyPage ?  item.includes(AccountDetails.companyPage.country) : false})[0])
        }
        return (
            <CompanyPageContainer>
                <Card className='clearfix p2'>
                    <div className="m1" ><Text size={20} weight='med'>Logo</Text></div>
                    <div className="m1"><Text size={14} weight='reg'>This will be displayed in the navigation on your account.</Text></div>

                    <DragAndDrop hasError={errorMessage.length > 0} className="mx1" handleDrop={handleDrop}>
                        { fileUploaded ? 
                            <>
                            <ImageStyle src={fileUploaded}></ImageStyle>
                            <Button sizeButton='xs' typeButton='secondary' style={{position:'absolute', right:'8px', top:'12px'}} buttonColor='blue' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleDelete(e)}>Delete</Button>
                            </>
                            :
                            <>
                            <IconStyle><BigIcon>cloud_upload</BigIcon></IconStyle>
                            <div className='center'><Text   size={14} weight='med' color='gray-1'>Drag and drop files here</Text></div>
                            <div className='center'><Text size={12} weight='reg' color='gray-3'>or </Text></div>
                            <ButtonStyle className='my1'>
                                <Button sizeButton='small' typeButton='secondary' buttonColor='blue'>    
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
                    {errorMessage.length > 0 ?<div className="py1 mx1"  ><Text size={10} weight='reg' color='red'>{errorMessage}</Text></div> : null}
                    <div className="m1" ><Text size={10} weight='reg' color='gray-3'>240px max width and ratio of 4:1 image formats: JPG, PNG, SVG, GIF</Text></div>
                    <BorderStyle className="p1 mx1" />
                    <form onSubmit={(event) => handleSubmit(event, value)} ref={formRef} noValidate>
                        <TextStyle className="mx1 my2"><Text size={20} weight='med'>Details</Text></TextStyle>
                        <div className="md-col md-col-12">
                            <Input 
                                disabled={false} 
                                defaultValue={AccountDetails.companyPage ? AccountDetails.companyPage.accountName : null}
                                type="text" 
                                className="md-col md-col-6 p1" 
                                id="accountName" 
                                label="Account Name" 
                                placeholder="Account Name" 
                                required
                                {...handleValidationProps('accountName', validations)}
                            />
                            <Input 
                                disabled={false}
                                defaultValue={AccountDetails.companyPage ? AccountDetails.companyPage.businessName : null} 
                                type="text" 
                                className="md-col md-col-6 p1" 
                                id="businessName" 
                                label="Business Name" 
                                placeholder="Business Name" 
                                required
                                {...handleValidationProps('businessName', validations)} 
                            />
                        </div>
                        <div className="md-col md-col-12" >
                            <Input 
                                disabled={false} 
                                defaultValue={AccountDetails.companyPage ? AccountDetails.companyPage.contactNumber : null}
                                type="tel" 
                                className="md-col md-col-6 p1" 
                                id="contactNumber" 
                                label="Phone Number" 
                                placeholder="(00) 0000 0000 00" 
                                required
                                {...handleValidationProps('contactNumber', validations)}
                            />
                            <Input 
                                disabled={false} 
                                defaultValue={AccountDetails.companyPage ? AccountDetails.companyPage.emailAddress : null}
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
                            <Input 
                                disabled={false} 
                                defaultValue={AccountDetails.companyPage ? AccountDetails.companyPage.companyWebsite : null}
                                type="text" 
                                className="md-col md-col-6 p1" 
                                id="companyWebsite"
                                label="Company Website" 
                                placeholder="Company Website" 
                                required
                                {...handleValidationProps('companyWebsite', validations)}
                            />
                            <Input 
                                disabled={false} 
                                defaultValue={AccountDetails.companyPage ? AccountDetails.companyPage.vatNumber : null}
                                type="text" 
                                className="md-col md-col-6 p1" 
                                id="vatNumber" 
                                label="VAT Number" 
                                placeholder="VAT Number" 
                                required
                                {...handleValidationProps('vatNumber', validations)}
                            />
                        </div>

                        <BorderStyle className="p1 mx1" />

                        <TextStyle className="px1 py2" ><Text size={20} weight='med'>Address</Text></TextStyle>
                        <div className="md-col md-col-12">
                            <Input 
                                disabled={false} 
                                defaultValue={AccountDetails.companyPage ? AccountDetails.companyPage.addressLine1 : null}
                                type="text" 
                                className="sm-col sm-col-6 p1" 
                                id="addressLine1" 
                                label="Address line 1" 
                                placeholder="Address line 1" 
                                required
                                {...handleValidationProps('addressLine1', validations)}                      
                            />

                            <Input  
                                disabled={false} 
                                defaultValue={AccountDetails.companyPage ? AccountDetails.companyPage.addressLine2 : null}
                                type="text" 
                                className="sm-col sm-col-6 p1" 
                                id="addressLine2" 
                                label="Address line 2" 
                                placeholder="Address line 2" 
                                required
                                {...handleValidationProps('addressLine2', validations)}
                            />
                        </div>
                        <div className="md-col md-col-12">
                            <Input 
                                disabled={false} 
                                defaultValue={AccountDetails.companyPage ? AccountDetails.companyPage.state : null}
                                type="text" 
                                className="sm-col sm-col-3 p1" 
                                id="state" 
                                label="State (optional)" 
                                placeholder="State" 
                                required={false}
                                {...handleValidationProps('state', validations)}
                            />

                            <Input 
                                disabled={false} 
                                defaultValue={AccountDetails.companyPage ? AccountDetails.companyPage.town : null}
                                type="text" 
                                className="sm-col sm-col-3 p1" 
                                id="town" 
                                label="Town" 
                                placeholder="Town" 
                                required
                                {...handleValidationProps('town', validations)}
                            />

                            <Input  
                                disabled={false} 
                                defaultValue={AccountDetails.companyPage ? AccountDetails.companyPage.zipCode : null}
                                type="text" 
                                className="sm-col sm-col-3 p1" 
                                id="zipCode" 
                                label="Zip/Post Code" 
                                placeholder="Zip/Post Code" 
                                required
                                {...handleValidationProps('zipCode', validations)}
                            
                            />
                            <DropdownSingle hasSearch defaultValue={defaultCountryValue} className="sm-col sm-col-3 p1 my1" id='country' dropdownTitle='Country' list={getNames().reduce((reduced: DropdownListType, item: string)=> {return {...reduced, [item]: false}},{})} />

                        </div>
                        <ButtonsArea>
                            <Button disabled={!enabledSubmit} type='submit' className="my2" typeButton='primary' buttonColor='blue'>Save</Button>
                            <Button type='button' onClick={handleDiscard} className="m2" typeButton='tertiary' buttonColor='blue'>Discard</Button>
                        </ButtonsArea>
                    </form>
                </Card>
            </CompanyPageContainer>
        )
    }

    return (
        props.AccountDetails ? 
            renderCompanyPage()
            : 
            <LoadingSpinner size='large' color='dark-violet' />
    )

}


export function mapStateToProps( state: ApplicationState) {
    return {
        AccountDetails: state.account.data
    };
}


export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, AccountAction>) {
    return {
        getCompanyPageDetails: () => {
            dispatch(getCompanyPageDetailsAction());
        },
        saveCompanyPageDetails: (data: CompanyPageInfos) => {
            dispatch(saveCompanyPageDetailsAction(data));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Company); 

const CompanyPageContainer = styled.div<{}>`
    position: relative;
`

const ButtonStyle = styled.div<{}>`
    margin: 0.5rem auto;
    width: fit-content;
`

const BorderStyle = styled.div<{}>`
    border-bottom: 1px solid ${props => props.theme.colors['gray-7']};
    display: flex;
`
const IconStyle = styled.div<{}>`
    display: block;
    color: ${props => props.theme.colors['dark-violet']};
    width: fit-content;
    margin: auto;
    padding-top: 32px;
`

const BigIcon = styled(Icon)`
    font-size: 40px !important;
`

const ImageStyle = styled.img<{}>`
    position: relative;
    max-width: 204px;
    max-height: 176px;
    display: flex;
    margin: 0 auto;
`

const TextStyle = styled.span<{}>`
    display: block;
`

const LinkStyle = styled.span<{}>`
    &:hover{
        cursor:pointer;
    }
`

const ButtonsArea = styled.div<{}>`
    
`