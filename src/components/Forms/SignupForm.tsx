import * as React from "react";
import styled from 'styled-components';
import { Input } from '../FormsComponents/Input/Input';
import { Button } from '../FormsComponents/Button/Button';
import { Text } from '../Typography/Text'
import {useForm} from '../../useForm'

import { ModalCard, ModalContent, ModalFooter } from '../Modal/ModalCard';

export const SignupForm = () => {

    const { handleChange, handleSubmit, handleBlur, formData, errors} = useForm(submit, () => {});

    React.useEffect(() => {
        console.log(errors)
    }, [errors])


    function submit() {
        console.log(formData)
    }

    return (

        
        <FormContainerStyle onSubmit={(event) => handleSubmit(event)} noValidate>
        <ModalCard className="mx-auto" size="small" title="Sign Up" >
                <ModalContent className="clearfix">
                    <div className="col col-12">
                        <Input type="text" className="col col-6 pr1" id="firstName" label="First Name" placeholder="First Name" value={formData.firstName} onChange={handleChange} onBlur={(event) => handleBlur(event)} { ...(errors.firstName) && {isError:true, help: `${errors.firstName}`} }/>
                        <Input type="text" className="col col-6 pl1" id="lastName" label="Last Name" placeholder="Last Name" value={formData.lastName} onChange={handleChange} onBlur={(event) => handleBlur(event)} { ...(errors.lastName) && {isError:true, help: `${errors.lastName}`} } />
                    </div>
                    <Input className="col col-12" type="url" id="companyWebsite" label="Company Website" placeholder="Company Website" value={formData.companyWebsite} onChange={handleChange} onBlur={(event) => handleBlur(event)} { ...(errors.companyWebsite) && {isError:true, help: `${errors.companyWebsite}`} } />

                    <Input className="col col-12" type="email" id="email" label="Email Address" placeholder="Email Address" value={formData.email} onChange={handleChange} onBlur={(event) => handleBlur(event)} { ...(errors.email) && {isError:true, help: `${errors.email}`} }/>
                    <Input className="col col-12" type="tel" id="contactNumber" label="Contact Number" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} onBlur={(event) => handleBlur(event)} { ...(errors.contactNumber) && {isError:true, help: `${errors.contactNumber}`} }/>
                    <Input className="col col-12" type="password" id="password" label="Password" placeholder="Password" icon="visibility_off" value={formData.password} onChange={handleChange} onBlur={(event) => handleBlur(event)} { ...(errors.password) && {isError:true, help: `${errors.password}`} }/>
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