import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { ModalCard, ModalFooter, ModalContent } from '../components/Modal/ModalCard';
import { Input } from '../components/FormsComponents/Input/Input';
import { Text } from '../components/Typography/Text';
import { Button } from '../components/FormsComponents/Button/Button';
import { InputCheckbox } from '../components/FormsComponents/Input/InputCheckbox';
import { formValidator, ValidationsInputObject } from '../utils/hooksFormValidator';
import { formSubmit, ValueInput } from '../utils/hooksFormSubmit';
import { action } from '@storybook/addon-actions';

const stories = storiesOf('Validations', module);
stories.addDecorator(withKnobs);


stories.add('Sign Up with validation', () => {
    return (
        <SignupFormExemple action={action("Form submit")} />
    )
});

export const SignupFormExemple = (props: { action: Function }) => {

    let formRef = React.useRef<HTMLFormElement>(null);

    const data = formValidator(formRef);
    const dataInput = formSubmit(formRef);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, data: ValueInput) => {
        event.preventDefault();
        props.action(data);
    }

    //Export this from somewhere else 
    const handleValidationProps = (id: string, data: ValidationsInputObject) => {
        return {
            isError: data[id] ? data[id].error : false,
            help: data[id] ? data[id].errorMessage : ""
        }
    }

    return (
        <ModalCard className="mx-auto" size="small" title="Sign Up" >
            <form onSubmit={(event) => handleSubmit(event, dataInput)} ref={formRef} noValidate>
                <ModalContent className="clearfix">
                    <div className="col col-12">
                        <Input type="text" className="col col-6 pr1" id="firstName" label="First Name" placeholder="First Name" required
                            {...handleValidationProps('firstName', data)}
                        />
                        <Input type="text" className="col col-6 pl1" id="lastName" label="Last Name" placeholder="Last Name" required
                            {...handleValidationProps('lastName', data)}

                        />
                    </div>
                    <Input className="col col-12" type="url" id="companyWebsite" label="Company Website" placeholder="Company Website" required
                        {...handleValidationProps('companyWebsite', data)}
                    />

                    <Input className="col col-12" type="email" id="email" label="Email Address" placeholder="Email Address" required
                        {...handleValidationProps('email', data)}
                    />
                    <Input className="col col-12" type="tel" id="contactNumber" label="Contact Number" placeholder="Contact Number" required
                        {...handleValidationProps('contactNumber', data)}

                    />
                    <Input className="col col-12" type="password" id="password" label="Password" placeholder="Password" icon="visibility_off" required
                        {...handleValidationProps('password', data)}

                    />
                    <p>
                        <Text color="gray-1" size={12} weight="reg" >Already have an account? <a href="#" >Log in.</a></Text><br />
                        <Text color="gray-1" size={12} weight="reg" >By signing up, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></Text>
                    </p>
                    <InputCheckbox id="checkbox1" label="Checkbox" />
                </ModalContent>
                <ModalFooter>
                    <Button disabled={/**Handle disabled in Hook */ false} type="submit" sizeButton="large" typeButton="primary">Sign Up</Button>
                    <Button sizeButton="large" typeButton="tertiary">Cancel</Button>
                </ModalFooter>
            </form>
        </ModalCard>
    )
}