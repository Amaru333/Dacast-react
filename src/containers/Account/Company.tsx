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
import * as actions from '../../redux-flow/store/Account/actions';
import { ApplicationState } from "../../redux-flow/store";
import { AccountProps, StateProps, DispatchProps } from '../../redux-flow/store/Account/types';
import { ToastStateProps, DispatchToastProps } from '../../components/Toast/Toasts';
import { ToastType, NotificationType, Size } from '../../components/Toast/ToastTypes';
import { hideToast, showToastNotification } from '../../redux-flow/store/toasts/actions';
import Toasts from '../Toasts';
import { bindActionCreators } from 'redux';
import { DropdownSingle } from '../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownListType } from '../../components/FormsComponents/Dropdown/DropdownTypes';
const {getNames} = require('country-list')

const GOOGLE_MAP_API_KEY = 'AIzaSyDfJamOAtXvTRvY8tRwyt5DI2mF8l4LSyk'

export const Company = (props: AccountProps & DispatchToastProps) => {

    /** Validation */
    let formRef = React.useRef<HTMLFormElement>(null);
    let {value, validations, enabledSubmit} = formSubmit(formRef);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, data: ValueInput) => {
        event.preventDefault();
        console.log(value);
        console.log(validations)
        debugger;
        props.saveCompanyPageDetails(data)

    }
    /** Fetching data using redux and services */
    React.useEffect( () => {
        const fetchData = async () => {
            await props.getCompanyPageDetails();
        }
        fetchData()
    }, [])

    const [defaultCountryValue, setDefaultCountryValue] = React.useState<string>('')
    /** Calling toasts depending on services results */
    React.useEffect(() => {
        if(props.account.isFetching) {
            props.showToast('data is fetching...', 'flexible', 'information');
        }
        else if(!props.account.isFetching && !props.account.isSaved && props.account.data.length > 0){
            props.showToast('data fetched!', 'flexible', 'success');
            setDefaultCountryValue(getNames().filter((item:string) => {return props.account.data.length > 0 ?  item.includes(props.account.data[0].companyPage.country) : false})[0])
        }

        if(props.account.isSaved) {
            props.showToast('data saved!', 'flexible', 'success');
        }
    }, [props.account])


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

    }

    return (
        <div>
            <Card className='clearfix p2'>
                <Text className="my2 mx1" size={20} weight='med'>Logo</Text>
                <br/>
                <Text className="mx1" size={14} weight='reg'>This will be displayed in the navigation on your account.</Text>

                <DragAndDrop hasError={errorMessage.length > 0} className="mx1" handleDrop={handleDrop}>
                    { fileUploaded ? 
                        <>
                        <ImageStyle src={fileUploaded}></ImageStyle>
                        <Button sizeButton='xs' typeButton='secondary' style={{float:'right'}} buttonColor='blue' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleDelete(e)}>Delete</Button>
                        </>
                        :
                        <>
                        <IconStyle><BigIcon>cloud_upload</BigIcon></IconStyle>
                        <TextStyle className='center'><Text  className='py2' size={12} weight='reg' color='gray-1'>Drag and drop or <label htmlFor="browseButton"><LinkStyle><input type='file' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{display:'none'}} id='browseButton' />browse</LinkStyle></label> files to upload</Text></TextStyle>
                        </>
                    } 
                </DragAndDrop>
                {errorMessage.length > 0 ?<><Text className="py1 mx1" size={10} weight='reg' color='red'>{errorMessage}</Text><br /> </> : null}
                <Text className="m1" size={10} weight='reg' color='gray-3'>240px max width and ratio of 4:1 image formats: JPG, PNG, SVG, GIF</Text>
                <BorderStyle className="p1 mx1" />
                <form onSubmit={(event) => handleSubmit(event, value)} ref={formRef} noValidate>
                <TextStyle className="mx1 my2"><Text size={20} weight='med'>Details</Text></TextStyle>
                <div className="md-col md-col-12">
                    <Input 
                        disabled={false} 
                        defaultValue={props.account.data.length > 0 ? props.account.data[0].companyPage.accountName : null}
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
                        defaultValue={props.account.data.length > 0 ? props.account.data[0].companyPage.businessName : null} 
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
                        defaultValue={props.account.data.length > 0 ? props.account.data[0].companyPage.contactNumber : null}
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
                        defaultValue={props.account.data.length > 0 ? props.account.data[0].companyPage.email : null}
                        type="email" 
                        className="md-col md-col-6 p1" 
                        id="email" 
                        label="Email Address" 
                        placeholder="Email Address" 
                        required
                        {...handleValidationProps('email', validations)}
                    />
                </div>

                <div className="md-col md-col-12">
                    <Input 
                        disabled={false} 
                        defaultValue={props.account.data.length > 0 ? props.account.data[0].companyPage.companyWebsite : null}
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
                        defaultValue={props.account.data.length > 0 ? props.account.data[0].companyPage.vatNumber : null}
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
                        defaultValue={props.account.data.length > 0 ? props.account.data[0].companyPage.address1 : null}
                        type="text" 
                        className="sm-col sm-col-6 p1" 
                        id="address1" 
                        label="Address line 1" 
                        placeholder="Address line 1" 
                        required
                        {...handleValidationProps('address1', validations)}                      
                    />

                    <Input  
                        disabled={false} 
                        defaultValue={props.account.data.length > 0 ? props.account.data[0].companyPage.address2 : null}
                        type="text" 
                        className="sm-col sm-col-6 p1" 
                        id="address2" 
                        label="Address line 2" 
                        placeholder="Address line 2" 
                        required
                        {...handleValidationProps('address2', validations)}
                    />
                </div>
                <div className="md-col md-col-12">
                    <Input 
                        disabled={false} 
                        defaultValue={props.account.data.length > 0 ? props.account.data[0].companyPage.state : null}
                        type="text" 
                        className="sm-col sm-col-3 p1" 
                        id="state" 
                        label="State" 
                        placeholder="State" 
                        required={false}
                        {...handleValidationProps('state', validations)}
                    />

                    <Input 
                        disabled={false} 
                        defaultValue={props.account.data.length > 0 ? props.account.data[0].companyPage.city : null}
                        type="text" 
                        className="sm-col sm-col-3 p1" 
                        id="city" 
                        label="Town" 
                        placeholder="Town" 
                        required
                        {...handleValidationProps('city', validations)}
                    />

                    <Input  
                        disabled={false} 
                        defaultValue={props.account.data.length > 0 ? props.account.data[0].companyPage.zipCode : null}
                        type="text" 
                        className="sm-col sm-col-3 p1" 
                        id="zipCode" 
                        label="Zip Code" 
                        placeholder="Zip Code" 
                        required
                        {...handleValidationProps('zipCode', validations)}
                        
                    />
                    <DropdownSingle hasSearch defaultValue={defaultCountryValue} className="sm-col sm-col-3 p1" id='Country' dropdownTitle='Country' list={getNames().reduce((reduced: DropdownListType, item: string)=> {return {...reduced, [item]: false}},{})} />

                </div>
                <div>
                <Button disabled={!enabledSubmit} type='submit' className="my2" typeButton='primary' buttonColor='blue'>Save</Button>
                <Button type='button' className="m2" typeButton='tertiary' buttonColor='blue'>Discard</Button>
            </div>
                </form>
            </Card>
            <Toasts />
        </div>
    )

}

const mapStateToProps = (state: ApplicationState): (StateProps & ToastStateProps) => ({
    account: state.account,
    toasts: state.toasts.data,
});

const mapDispatchToProps = (dispatch: any): (DispatchProps & DispatchToastProps) => bindActionCreators({
    getCompanyPageDetails: actions.getCompanyPageDetails,
    saveCompanyPageDetails: actions.saveCompanyPageDetails,
    hideToast: hideToast,
    showToast: showToastNotification,
}, dispatch);

export default connect<(StateProps & ToastStateProps), (DispatchProps & DispatchToastProps), {}>(
    mapStateToProps,
mapDispatchToProps
)(Company); 

const BorderStyle = styled.div<{}>`
    border-bottom: 1px solid ${props => props.theme.colors['gray-7']};
    display: flex;
`
const IconStyle = styled.div<{}>`
    display: block;
    color: ${props => props.theme.colors['gray-3']};
    width: 1em;
    margin: auto;
    padding-top: 22px;
`

const BigIcon = styled(Icon)`
    font-size: 40px !important;
`

const ImageStyle = styled.img<{}>`
    position: absolute;
    width: 200px;
    height: 50px;
`

const TextStyle = styled.span<{}>`
    display: block;
`

const LinkStyle = styled.a<{}>`
    color: ${props => props.theme.colors['blue']};
    text-decoration: underline;
    &:hover{
        cursor:pointer;
    }
`