import React from 'react';
import { storiesOf, forceReRender } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Toast } from '../components/Toasts';
import { Button } from '../components/FormsComponents/Button/Button';


var openedToasts: any = {
    "modal1": false,
}

var toggleToast = (name: any) => {
    openedToasts[name] = !openedToasts[name];
    forceReRender();
}

storiesOf('Toasts', module)
    .add('Fixed Toasts', () => (
        <React.Fragment>
            <Toast notificationType="error">Error</Toast>
            <Toast notificationType="success">Success</Toast>
            <Toast notificationType="information">Information</Toast>
            <Toast notificationType="warning">Warning</Toast>
            <Toast notificationType="other">Other</Toast>
        </React.Fragment>
        ))
    
        .add('Flexible Toasts', () => (
            <React.Fragment>
                <Toast size="flexible" notificationType="error">Error Message</Toast>
                <Toast size="flexible" notificationType="success">Success Message</Toast>
                <Toast size="flexible" notificationType="information">Information Message</Toast>
                <Toast size="flexible" notificationType="warning">Warning Message</Toast>
                <Toast size="flexible" notificationType="other">Other Message</Toast>
            </React.Fragment>
            ))
            
        .add('Toast Demo', () => (
           <React.Fragment>
               <Button onClick={() => toggleToast("toast1")}>Trigger Toast</Button>

                   <Toast opened={openedToasts['toast1']} notificationType="error">Toast triggered</Toast>
               
           </React.Fragment> 
        ))
        