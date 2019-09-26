import React from 'react';
import { storiesOf, forceReRender } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Toast } from '../components/Toasts';

storiesOf('Toasts', module)
    .add('Toasts', () => (
        <Toast icon={{name: "warning", color: "red"}}>Test Toast</Toast>
    ))