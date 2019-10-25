import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../components/Typography/Text';
import { Input } from '../../components/FormsComponents/Input/Input';
import { Button } from '../../components/FormsComponents/Button/Button';
import { Card } from '../../components/Card/Card';


const GOOGLE_MAP_API_KEY = 'AIzaSyDfJamOAtXvTRvY8tRwyt5DI2mF8l4LSyk'

export const StaticCompany = (props: {}) => {
    let adressRef = React.useRef<HTMLInputElement>(null)
    const [adressValues, setAdressValues] = React.useState({
        name: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        googleMapLink: ''
    })
    const callback = () => {
        initAutocomplete()
    }
    React.useEffect(() => {
        const googleMapScript = document.createElement('script')
        // googleMapScript.src = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${GOOGLE_MAP_API_KEY}&input=33%20Trellis%20Square%20E3%202DR&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry`
        window.document.body.appendChild(googleMapScript);

        googleMapScript.addEventListener('load', callback)
    }, [])

    var autocomplete: any;
const handleChange = (event:React.FormEvent<HTMLInputElement>) => {
    setAdressValues({...adressValues,
        [event.currentTarget.id]: event.currentTarget.value
    })
}

function initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
       adressRef.current, {types: ['geocode']});

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(['address_component']);

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
   autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  let addressObject = autocomplete.getPlace()
  let address = addressObject.address_components
  setAdressValues({
    name: addressObject.name,
    street_address: `${address[0].long_name} ${address[1].long_name}`,
    city: address[4].long_name,
    state: address[6].short_name,
    zip_code: address[8].short_name,
    googleMapLink: addressObject.url
  })
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    //   var circle = new google.maps.Circle(
    //     {center: geolocation, radius: position.coords.accuracy});
    // autocomplete.setBounds(circle.getBounds());
   });
    }
}



    return (
        <div>
            <Card>
                <div>
                    <Text size={20} weight='med'>Logo</Text>
                    <br/>
                    <Text size={14} weight='reg'>This will be displayed in the navigation on your account.</Text>
                    <div>
                        Blah
                    </div>
                    <Text size={10} weight='reg' color='gray-3'>240px max width and ratio of 4:1 image formats: JPG, PNG, SVG, GIF</Text>
                <BorderStyle />
                </div>
                <div>
                    <Text size={20} weight='med'>Details</Text>

                    <div>
                        <Input disabled={false} type="text" className="md-col md-col-6 px1" id="AccountName" label="Account Name" placeholder="Account Name" required
                            
                        />
                        <Input disabled={false} type="text" className="md-col md-col-6 px1" id="BusinessName" label="Business Name" placeholder="Business Name" required
                            

                        />
                        <Input disabled={false} type="text" className="md-col md-col-6 px1" id="PhoneNumber" label="Phone Number" placeholder="(00) 0000 0000 00" required
                            
                        />
                        <Input disabled={false} type="text" className="md-col md-col-6 px1" id="EmailAddress" label="Email Adress" placeholder="Email Adress" required
                            

                        />
                        <Input disabled={false} type="text" className="md-col md-col-6 px1" id="CompanyWebsite" label="Company Website" placeholder="Company Website" required
                            
                        />
                        <Input disabled={false} type="text" className="md-col md-col-6 px1" id="VATNumber" label="VAT Number" placeholder="VAT Number" required
                            

                        />
                        <BorderStyle />
                    </div>

                </div>

                <div>
                    <div>
                    <Text size={20} weight='med'>Address</Text>
                    </div>


                    <div >
                        <Input icon='navigation_outlined' onChange={(event: React.FormEvent<HTMLInputElement>) => handleChange(event)} value={adressValues.name} disabled={false} type="text" className="sm-col sm-col-6 px1" ref={adressRef} id="Address" label="Address" placeholder="Address" required
                            
                        />

                        <Input onChange={(event: React.FormEvent<HTMLInputElement>) => handleChange(event)} value={adressValues.street_address} disabled={false} type="text" className="sm-col sm-col-6 px1" id="street_address" label="Adress" placeholder="Adress" required
                            

                        />
                        <Input onChange={(event: React.FormEvent<HTMLInputElement>) => handleChange(event)} value={adressValues.state} disabled={false} type="text" className="sm-col sm-col-3 px1" id="state" label="State" placeholder="State" required
                            

                        />

                        <Input onChange={(event: React.FormEvent<HTMLInputElement>) => handleChange(event)} value={adressValues.city} disabled={false} type="text" className="sm-col sm-col-3 px1" id="city" label="Town" placeholder="Town" required
                            
                        />
      
                        <Input onChange={(event: React.FormEvent<HTMLInputElement>) => handleChange(event)} value={adressValues.zip_code} disabled={false} type="text" className="sm-col sm-col-3 px1" id="zip_code" label="Zip Code" placeholder="Zip Code" required
                            
                        />
                        <Input disabled={false} type="text" className="sm-col sm-col-3 px1" id="Country" label="Country" placeholder="Country" required
                            

                        />
                    </div>
                </div>
            </Card>
            <div>
                <Button type='button' typeButton='primary' buttonColor='blue'>Save</Button>
                <Button type='button' typeButton='tertiary' buttonColor='blue'>Cancel</Button>
            </div>
            <Button type='button' typeButton='tertiary' buttonColor='blue' onClick={geolocate}>geolocate</Button>
        </div>
    )

}

const BorderStyle = styled.div<{}>`
    /* padding: 10px 0; */
    border-bottom: 1px solid ${props => props.theme.colors['gray-7']};
`