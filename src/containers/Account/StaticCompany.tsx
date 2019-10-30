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
import { string } from 'prop-types';


const GOOGLE_MAP_API_KEY = 'AIzaSyDfJamOAtXvTRvY8tRwyt5DI2mF8l4LSyk'

export const StaticCompany = (props: AccountProps & DispatchToastProps) => {

    /** Validation */
    let formRef = React.useRef<HTMLFormElement>(null);
    let {value, validations, enabledSubmit} = formSubmit(formRef);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, data: ValueInput) => {
        event.preventDefault();
    }

    /** Fetching data using redux and services */
    React.useEffect( () => {
        const fetchData = async () => {
            await props.getCompanyPageDetails();
        }
        fetchData()

    }, [])

    /** Calling toasts depending on services results */
    React.useEffect(() => {
        if(props.account.isFetching) {
            props.showToast('data is fetching...', 'flexible', 'information');
        }
        else if(!props.account.isFetching && props.account.data.length > 0){
            props.showToast('data fetched!', 'flexible', 'success');
            console.log(props.account.data[0].companyPage)
            value = props.account.data[0].companyPage;
            console.log(value)
        }
    }, [props.account])


    /**  Drag and drop or browse file  */
    const [fileUploaded, setfileUploaded] = React.useState(null);

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.files && e.target.files.length > 0) {
            handleDrop(e.target.files);
        }
    }

    const handleDrop = (file: any) => {
        if(file.length > 0 && file[0].type.match(/image.*/)) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setfileUploaded(e.target.result)
            }

            reader.readAsDataURL(file[0])
        }
        else{
            console.log("wrong file type!")
        }
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setfileUploaded(null);
    }

    /**  Action buttons */

    const handleCancel = () => {

    }


    // function initAutocomplete() {
    // autocomplete = new google.maps.places.Autocomplete(
    //     adressRef.current, {types: ['geocode']});
    // autocomplete.setFields(['address_component']);
    // autocomplete.addListener('place_changed', fillInAddress);
    // }
    // React.useEffect(() => {
    //     const googleMapScript = document.createElement('script')
    //     // googleMapScript.src = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${GOOGLE_MAP_API_KEY}&input=33%20Trellis%20Square%20E3%202DR&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry`
    //     window.document.body.appendChild(googleMapScript);

    //     googleMapScript.addEventListener('load', callback)
    // }, [])



    // function fillInAddress() {
    // let addressObject = autocomplete.getPlace()
    // let address = addressObject.address_components
    // setAdressValues({
    //     name: addressObject.name,
    //     street_address: `${address[0].long_name} ${address[1].long_name}`,
    //     city: address[4].long_name,
    //     state: address[6].short_name,
    //     zip_code: address[8].short_name,
    //     googleMapLink: addressObject.url
    // })
    // }

    // function geolocate() {
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //     var geolocation = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //     };
    //     //   var circle = new google.maps.Circle(
    //     //     {center: geolocation, radius: position.coords.accuracy});
    //     // autocomplete.setBounds(circle.getBounds());
    // });
    //     }
    // }



    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event, value)} ref={formRef} noValidate>
                <Card>
                    <Text className="my2" size={20} weight='med'>Logo</Text>
                    <br/>
                    <Text size={14} weight='reg'>This will be displayed in the navigation on your account.</Text>

                    <DragAndDrop className="m1" handleDrop={handleDrop}>
                        { fileUploaded ? 
                            <>
                            <ImageStyle src={fileUploaded}></ImageStyle>
                            <Button typeButton='secondary' style={{float:'right'}} buttonColor='blue' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleDelete(e)}>Delete</Button>
                            </>
                        :
                            <>
                            <IconStyle><Icon>cloud_upload</Icon></IconStyle>
                            <TextStyle className='center'><Text size={12} weight='reg' color='gray-1'>Drag and drop or <label htmlFor="browseButton"><a><input type='file' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{display:'none'}} id='browseButton' />browse</a></label> files to upload</Text></TextStyle>
                            </>
                        } 
                    </DragAndDrop>

                    <Text className="p1" size={10} weight='reg' color='gray-3'>240px max width and ratio of 4:1 image formats: JPG, PNG, SVG, GIF</Text>
                    <BorderStyle className="p1" />

                    <TextStyle className="m1"><Text size={20} weight='med'>Details</Text></TextStyle>

                    <Input 
                        disabled={false} 
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
                        type="text" 
                        className="md-col md-col-6 p1" 
                        id="businessName" 
                        label="Business Name" 
                        placeholder="Business Name" 
                        required
                        {...handleValidationProps('businessName', validations)} 

                    />
                    <Input 
                        disabled={false} 
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
                        type="email" 
                        className="md-col md-col-6 p1" 
                        id="email" 
                        label="Email Adress" 
                        placeholder="Email Adress" 
                        required
                        {...handleValidationProps('email', validations)}

                    />
                    <Input 
                        disabled={false} 
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
                        type="text" 
                        className="md-col md-col-6 p1" 
                        id="vatNumber" 
                        label="VAT Number" 
                        placeholder="VAT Number" 
                        required
                        {...handleValidationProps('vatNumber', validations)}

                    />
                    <BorderStyle className="p1" />

                    <TextStyle className="p1" ><Text size={20} weight='med'>Address</Text></TextStyle>

                    <Input 
                        disabled={false} 
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
                        type="text" 
                        className="sm-col sm-col-6 p1" 
                        id="address2" 
                        label="Address line 2" 
                        placeholder="Address line 2" 
                        required
                        {...handleValidationProps('address2', validations)}

                    />
                    <Input 
                        disabled={false} 
                        type="text" 
                        className="sm-col sm-col-3 p1" 
                        id="state" 
                        label="State" 
                        placeholder="State" 
                        required
                        {...handleValidationProps('state', validations)}

                    />

                    <Input 
                        disabled={false} 
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
                        type="text" 
                        className="sm-col sm-col-3 p1" 
                        id="zipCode" 
                        label="Zip Code" 
                        placeholder="Zip Code" 
                        required
                        {...handleValidationProps('zipCode', validations)}
                        
                    />
                    <Input 
                        disabled={false} 
                        type="text" 
                        className="sm-col sm-col-3 p1" 
                        id="country" 
                        label="Country" 
                        placeholder="Country" 
                        required
                        {...handleValidationProps('country', validations)}

                    />                
                </Card>
                <Button disabled={!enabledSubmit} type='submit' className="my2" typeButton='primary' buttonColor='blue'>Save</Button>
                <Button type='button' className="m2" typeButton='tertiary' buttonColor='blue'>Cancel</Button>
            </form>
            <Toasts />
        </div>
    )

}

const mapStateToProps = (state: ApplicationState): (StateProps & ToastStateProps) => ({
    account: state.account,
    toasts: state.toasts.data,
});

const mapDispatchToProps = (dispatch: any): (DispatchProps & DispatchToastProps) => ({
    getCompanyPageDetails: () => dispatch(actions.getCompanyPageDetails()),
    hideToast: (toast: ToastType) => dispatch(hideToast(toast)),
    showToast: (text: string, size: Size, notificationType: NotificationType) => dispatch(showToastNotification(text, size, notificationType)),
});

export default connect<(StateProps & ToastStateProps), (DispatchProps & DispatchToastProps), {}>(
    mapStateToProps,
    mapDispatchToProps
)(StaticCompany); 

const BorderStyle = styled.div<{}>`
    border-bottom: 1px solid ${props => props.theme.colors['gray-7']};
    display: flex;
`
const IconStyle = styled.span<{}>`
    display: block;
    width: 1em;
    margin: auto;
    padding-top: 22px;
`

const ImageStyle = styled.img<{}>`
    position: absolute;
    width: 200px;
    height: 50px;
`

const TextStyle = styled.span<{}>`
    display: block;
`