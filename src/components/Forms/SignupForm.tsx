import * as React from "react";
import styled from 'styled-components';
import { Input } from '../FormsComponents/Input/Input';
import { Button } from '../FormsComponents/Button/Button';
import { Text } from '../Typography/Text'
import { ModalCard, ModalContent, ModalFooter } from '../Modal/ModalCard';

export const SignupForm = () => {

    return (
        <FormContainerStyle>
        <ModalCard className="mx-auto" size="small" title="Sign Up" >
                <ModalContent className="clearfix">
                    <div className="col col-12">
                        <Input type="text" className="col col-6 pr1" label="First Name" placeholder="First Name" />
                        <Input type="text" className="col col-6 pl1" label="Last Name" placeholder="Last Name" />
                    </div>
                    <Input className="col col-12" type="url" label="Company Website" placeholder="Company Website" />
                    <Input className="col col-12" type="email" label="Email Address" placeholder="Email Address" />
                    <Input className="col col-12" type="tel" label="Contact Number" placeholder="Contact Number" />
                    <Input className="col col-12" type="password" label="Password" placeholder="Password" icon="visibility_off" />
                    <p>
                        <Text color="gray-1" size={12} weight="reg" >Already have an account? <a href="#" >Log in.</a></Text><br />
                        <Text color="gray-1" size={12} weight="reg" >By signing up, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></Text>
                    </p>
                </ModalContent>
                <ModalFooter>
                    <Button sizeButton="large" typeButton="primary">Sign Up</Button>
                    <Button sizeButton="large" typeButton="tertiary">Cancel</Button>
                </ModalFooter>
            </ModalCard>
            </FormContainerStyle>
    )       

}

export const FormContainerStyle = styled.form``