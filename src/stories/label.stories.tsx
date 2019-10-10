import React from 'react';
import { storiesOf } from '@storybook/react';
import { Label } from '../components/FormsComponents/Label/Label';
import { withKnobs, select } from '@storybook/addon-knobs';

const stories = storiesOf('Label', module);
stories.addDecorator(withKnobs);

stories.add('Label', () => {
    return (
        <React.Fragment>
            <Label color={"green"} backgroundColor={'green20'} label="Label" /> <br />
            <Label color={'red'} backgroundColor={'red20'} label="Label" /> <br />
            <Label size={12} weight="med" color={'yellow'} backgroundColor={'yellow20'} label="Label" />  <br />
            <Label size={40} weight="reg" color={'gray-1'} backgroundColor={'gray-9'} label="Label" />  <br />
        </React.Fragment>
    );
})