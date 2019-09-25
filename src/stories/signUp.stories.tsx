import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Modal, ModalFooter, ModalContent } from '../components/FormsComponents/Modal/Modal';
import { Input } from '../components/FormsComponents/Input/Input';


const stories = storiesOf('Sign Up Form', module);
stories.addDecorator(withKnobs);

stories.add('Form', () => {
    return (
        <Modal size="small" opened={true} title="Sign Up" >
            <ModalContent className="clearfix">
                <div className="col col-12">
                    <Input className="col col-6" label="First Name" placeholder="First Name"/>
                    <Input className="col col-6" label="Last Name" placeholder="Last Name"/>
                </div>
                <div className="col col-12">
                    <Input label="Company Website" placeholder="Company Website"/>
                </div>
                <div className="col col-12">
                    <Input label="Email Address" placeholder="Email Address"/>
                </div>
                <div className="col col-12">
                    <Input label="Contact Number" placeholder="Contact Number"/>
                </div>
                <div className="col col-12">
                    <Input label="Password" placeholder="Password" icon="visibility_off" />
                </div>
            </ModalContent>
            <ModalFooter>
                
            </ModalFooter>
        </Modal>

    );
})