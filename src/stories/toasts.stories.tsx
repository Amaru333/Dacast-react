import React from 'react';
import { storiesOf, forceReRender } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Toast } from '../components/Toasts';

storiesOf('Toasts', module)
    .add('Toasts', () => (
        <React.Fragment>
            <Toast notificationType="error">Error</Toast>
            <Toast notificationType="success">Success</Toast>
            <Toast notificationType="information">Information</Toast>
            <Toast notificationType="warning">Warning</Toast>
            <Toast notificationType="other">Other</Toast>

        </React.Fragment>
        
        
    ))