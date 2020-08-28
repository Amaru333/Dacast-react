import React from 'react';
import { storiesOf } from '@storybook/react';
import { Label } from '../components/FormsComponents/Label/Label';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('Label', module);
stories.addDecorator(withKnobs);

stories.add('Label', () => {
    return (
        <React.Fragment>
            <Label className='m2' color={"green"} backgroundColor={'green20'} label="Label" /> <br />
            <Label className='m2' color={'red'} backgroundColor={'red20'} label="Label" /> <br />
            <Label className='m2' size={12} weight="med" color={'yellow'} backgroundColor={'yellow20'} label="Label" />  <br />
            <Label className='m2' size={40} weight="reg" color={'gray-1'} backgroundColor={'gray-9'} label="Label" />  <br />
        </React.Fragment>
    );
})