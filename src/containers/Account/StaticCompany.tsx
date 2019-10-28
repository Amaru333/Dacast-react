import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../components/Typography/Text';
import { Input } from '../../components/FormsComponents/Input/Input';
import { Button } from '../../components/FormsComponents/Button/Button';
import { Card } from '../../components/Card/Card';
import Icon from '@material-ui/core/Icon';
import { DragAndDrop } from '../../components/DragAndDrop/DragAndDrop';


const GOOGLE_MAP_API_KEY = 'AIzaSyDfJamOAtXvTRvY8tRwyt5DI2mF8l4LSyk'

export const StaticCompany = (props: {}) => {
    let adressRef = React.useRef<HTMLInputElement>(null)
    const [adressValues, setAdressValues] = React.useState({
        name: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        googleMapLink: ''
    })
    // const callback = () => {
    //     initAutocomplete()
    // }

    const [fileUploaded, setfileUploaded] = React.useState(null);

    var autocomplete: any;
    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setAdressValues({...adressValues,
            [event.currentTarget.id]: event.currentTarget.value
        })
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

    const handleCancel = () => {

    }

    const handleSave = () => {

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
            <Card>
                <Text className="my2" size={20} weight='med'>Logo</Text>
                <br/>
                <Text size={14} weight='reg'>This will be displayed in the navigation on your account.</Text>

                <DragAndDrop className="m1" handleDrop={handleDrop}>
                    { fileUploaded ? 
                        <ImageStyle src={fileUploaded}></ImageStyle>
                    :
                        <>
                        <IconStyle><Icon>cloud_upload</Icon></IconStyle>
                        <TextStyle className='center'><Text size={12} weight='reg' color='gray-1'>Drag and drop or browse files to upload</Text></TextStyle>
                        </>
                    } 
                </DragAndDrop>

                <Text className="p1" size={10} weight='reg' color='gray-3'>240px max width and ratio of 4:1 image formats: JPG, PNG, SVG, GIF</Text>
                <BorderStyle className="p1" />

                <TextStyle className="m1"><Text size={20} weight='med'>Details</Text></TextStyle>

                <Input disabled={false} type="text" className="md-col md-col-6 p1" id="AccountName" label="Account Name" placeholder="Account Name" required
                    
                />
                <Input disabled={false} type="text" className="md-col md-col-6 p1" id="BusinessName" label="Business Name" placeholder="Business Name" required
                    

                />
                <Input disabled={false} type="text" className="md-col md-col-6 p1" id="PhoneNumber" label="Phone Number" placeholder="(00) 0000 0000 00" required
                    
                />
                <Input disabled={false} type="text" className="md-col md-col-6 p1" id="EmailAddress" label="Email Adress" placeholder="Email Adress" required
                    

                />
                <Input disabled={false} type="text" className="md-col md-col-6 p1" id="CompanyWebsite" label="Company Website" placeholder="Company Website" required
                    
                />
                <Input disabled={false} type="text" className="md-col md-col-6 p1" id="VATNumber" label="VAT Number" placeholder="VAT Number" required
                    

                />
                <BorderStyle className="p1" />

                <TextStyle className="p1" ><Text size={20} weight='med'>Address</Text></TextStyle>

                <Input icon='navigation_outlined' onChange={(event: React.FormEvent<HTMLInputElement>) => handleChange(event)} value={adressValues.name} disabled={false} type="text" className="sm-col sm-col-6 p1" ref={adressRef} id="Address" label="Address" placeholder="Address" required
                    
                />

                <Input onChange={(event: React.FormEvent<HTMLInputElement>) => handleChange(event)} value={adressValues.streetAddress} disabled={false} type="text" className="sm-col sm-col-6 p1" id="streetAddress" label="Address" placeholder="Address" required
                    

                />
                <Input onChange={(event: React.FormEvent<HTMLInputElement>) => handleChange(event)} value={adressValues.state} disabled={false} type="text" className="sm-col sm-col-3 p1" id="state" label="State" placeholder="State" required
                    

                />

                <Input onChange={(event: React.FormEvent<HTMLInputElement>) => handleChange(event)} value={adressValues.city} disabled={false} type="text" className="sm-col sm-col-3 p1" id="city" label="Town" placeholder="Town" required
                    
                />

                <Input onChange={(event: React.FormEvent<HTMLInputElement>) => handleChange(event)} value={adressValues.zipCode} disabled={false} type="text" className="sm-col sm-col-3 p1" id="zipCode" label="Zip Code" placeholder="Zip Code" required
                    
                />
                <Input disabled={false} type="text" className="sm-col sm-col-3 p1" id="Country" label="Country" placeholder="Country" required
                    

                />
            </Card>
            <Button type='button' className="my2" typeButton='primary' buttonColor='blue'>Save</Button>
            <Button type='button' className="m2" typeButton='tertiary' buttonColor='blue'>Cancel</Button>
        </div>
    )

}

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