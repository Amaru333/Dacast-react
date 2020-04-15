import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { ModalCard, ModalFooter, ModalContent } from '../components/Modal/ModalCard';
import { Input } from '../components/FormsComponents/Input/Input';
import { Text } from '../components/Typography/Text';
import { Button } from '../components/FormsComponents/Button/Button';
import { InputCheckbox } from '../components/FormsComponents/Input/InputCheckbox';
import { action } from '@storybook/addon-actions';

const stories = storiesOf('Validations', module);
stories.addDecorator(withKnobs);


stories.add('Sign Up with validation', () => {
    return (
        <SignupFormExemple action={action("Form submit")} />
    )
});

export const SignupFormExemple = (props: { action: Function }) => {


    return (
        <ModalCard className="mx-auto" size="small" title="Sign Up" >
            
        </ModalCard>
    )
}