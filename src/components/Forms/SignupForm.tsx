import * as React from "react";
import styled from 'styled-components';
import { Input } from '../FormsComponents/Input/Input';
import { Button } from '../FormsComponents/Button/Button';
import { Text } from '../Typography/Text'
import {useForm} from '../../useForm'

import { ModalCard, ModalContent, ModalFooter } from '../Modal/ModalCard';

export const SignupForm = () => {

    const { handleChange, handleSubmit, formData} = useForm(submit);

    function submit() {
        console.log(formData)
    }

    return (

        
        <FormContainerStyle onSubmit={(event) => handleSubmit(event)} noValidate>
        <ModalCard className="mx-auto" size="small" title="Sign Up" >
                <ModalContent className="clearfix">
                    <div className="col col-12">
                        <Input type="text" className="col col-6 pr1" id="firstName" label="First Name" placeholder="First Name" value={formData.firstName} onChange={handleChange}/>
                        <Input type="text" className="col col-6 pl1" id="lastName" label="Last Name" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                    </div>
                    <Input className="col col-12" type="url" id="companyWebsite" label="Company Website" placeholder="Company Website" value={formData.companyWebsite} onChange={handleChange} />
                    <Input className="col col-12" type="email" id="email" label="Email Address" placeholder="Email Address" value={formData.email} onChange={handleChange} />
                    <Input className="col col-12" type="tel" id="contactNumber" label="Contact Number" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} />
                    <Input className="col col-12" type="password" id="password" label="Password" placeholder="Password" icon="visibility_off" value={formData.password} onChange={handleChange} />
                    <p>
                        <Text color="gray-1" size={12} weight="reg" >Already have an account? <a href="#" >Log in.</a></Text><br />
                        <Text color="gray-1" size={12} weight="reg" >By signing up, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></Text>
                    </p>
                </ModalContent>
                <ModalFooter>
                    <Button sizeButton="large" typeButton="primary" onClick={() => submit}>Sign Up</Button>
                    <Button sizeButton="large" typeButton="tertiary">Cancel</Button>
                </ModalFooter>
            </ModalCard>
            </FormContainerStyle>
    )       

}

export const FormContainerStyle = styled.form``