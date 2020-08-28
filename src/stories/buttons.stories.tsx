import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from '../components/FormsComponents/Button/Button'
import { buttonArrayColor } from '../components/FormsComponents/Button/ButtonTypes';

storiesOf('Buttons', module)
    .add('Large button', () => (
        <React.Fragment>
            <div className="m3">
                <Button buttonColor='blue' onClick={action("button-click")} sizeButton="large" typeButton="primary" className="mr1"  >Primary</Button>
                <Button buttonColor='blue' onClick={action("button-click")} sizeButton="large" typeButton="secondary" className="mr1"  >Secondary</Button>
                <Button buttonColor='blue' onClick={action("button-click")} sizeButton="large" typeButton="tertiary" className="mr1"   >Tertiary</Button>
            </div>
            <div className="m3">
                <Button buttonColor='blue' onClick={action("button-click")} sizeButton="large" typeButton="primary" className="mr1" disabled  >Primary disabled</Button>
                <Button buttonColor='blue' onClick={action("button-click")} sizeButton="large" typeButton="secondary" className="mr1" disabled >Secondary disabled</Button>
                <Button buttonColor='blue' onClick={action("button-click")} sizeButton="large" typeButton="tertiary" className="mr1" disabled >Tertiary disabled</Button>
            </div>
            <div className="m3">
                <Button buttonColor='red' onClick={action("button-click")} sizeButton="large" typeButton="primary" className="mr1"  >Primary</Button>
                <Button buttonColor='red' onClick={action("button-click")} sizeButton="large" typeButton="secondary" className="mr1"  >Secondary</Button>
                <Button buttonColor='red' onClick={action("button-click")} sizeButton="large" typeButton="tertiary" className="mr1"   >Tertiary</Button>
            </div>
            <div className="m3">
                <Button buttonColor='red' onClick={action("button-click")} sizeButton="large" typeButton="primary" className="mr1" disabled  >Primary disabled</Button>
                <Button buttonColor='red' onClick={action("button-click")} sizeButton="large" typeButton="secondary" className="mr1" disabled >Secondary disabled</Button>
                <Button buttonColor='red' onClick={action("button-click")} sizeButton="large" typeButton="tertiary" className="mr1" disabled >Tertiary disabled</Button>
            </div>
            <div className="m3">
                <Button colorObject={buttonArrayColor['red']} onClick={action("button-click")} sizeButton="large" className="mr1"  >Custom Color Button Red</Button>
                <Button colorObject={buttonArrayColor['blue']} onClick={action("button-click")} sizeButton="large" className="mr1"  >Custom Color Button Blue</Button>
                <Button colorObject={buttonArrayColor['gray']} onClick={action("button-click")} sizeButton="large" className="mr1"  >Custom Color Button Gray</Button>
            </div>
        </React.Fragment>

    ))
    .add('Small button', () => (
        <React.Fragment>
            <div className="m3">
                <Button buttonColor='blue' onClick={action("button-click")} sizeButton="small" typeButton="primary" className="mr1"  >Primary</Button>
                <Button buttonColor='blue' onClick={action("button-click")} sizeButton="small" typeButton="secondary" className="mr1"  >Secondary</Button>
                <Button buttonColor='blue' onClick={action("button-click")} sizeButton="small" typeButton="tertiary" className="mr1"   >Tertiary</Button>
            </div>
            <div className="m3">
                <Button buttonColor='blue' onClick={action("button-click")} sizeButton="small" typeButton="primary" className="mr1" disabled  >Primary disabled</Button>
                <Button buttonColor='blue' onClick={action("button-click")} sizeButton="small" typeButton="secondary" className="mr1" disabled >Secondary disabled</Button>
                <Button buttonColor='blue' onClick={action("button-click")} sizeButton="small" typeButton="tertiary" className="mr1" disabled >Tertiary disabled</Button>
            </div><div className="m3">
                <Button buttonColor='red' onClick={action("button-click")} sizeButton="small" typeButton="primary" className="mr1"  >Primary</Button>
                <Button buttonColor='red' onClick={action("button-click")} sizeButton="small" typeButton="secondary" className="mr1"  >Secondary</Button>
                <Button buttonColor='red' onClick={action("button-click")} sizeButton="small" typeButton="tertiary" className="mr1"   >Tertiary</Button>
            </div>
            <div className="m3">
                <Button buttonColor='red' onClick={action("button-click")} sizeButton="small" typeButton="primary" className="mr1" disabled  >Primary disabled</Button>
                <Button buttonColor='red' onClick={action("button-click")} sizeButton="small" typeButton="secondary" className="mr1" disabled >Secondary disabled</Button>
                <Button buttonColor='red' onClick={action("button-click")} sizeButton="small" typeButton="tertiary" className="mr1" disabled >Tertiary disabled</Button>
            </div>
            <div className="m3">
                <Button colorObject={buttonArrayColor['red']} onClick={action("button-click")} sizeButton="small" className="mr1"  >Custom Color Button Red</Button>
                <Button colorObject={buttonArrayColor['blue']} onClick={action("button-click")} sizeButton="small" className="mr1"  >Custom Color Button Blue</Button>
                <Button colorObject={buttonArrayColor['gray']} onClick={action("button-click")} sizeButton="small" className="mr1"  >Custom Color Button Gray</Button>
            </div>
        </React.Fragment>
    ));