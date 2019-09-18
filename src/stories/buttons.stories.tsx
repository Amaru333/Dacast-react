import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {Button} from '../components/FormsComponents/Button/Button'

storiesOf('Buttons', module)
  .add('Large button', () => ( 
  <React.Fragment>
    <div className="m3">
    <Button onClick={action("button-click")}  sizeButton="large" typeButton="primary" className="mr1"  >Primary</Button>
    <Button onClick={action("button-click")}  sizeButton="large" typeButton="secondary" className="mr1"  >Secondary</Button>
    <Button onClick={action("button-click")}  sizeButton="large" typeButton="tertiary" className="mr1"   >Tertiary</Button>
    </div>
    <div className="m3">
    <Button onClick={action("button-click")}  sizeButton="large" typeButton="primary" className="mr1"  disabled  >Primary disabled</Button>
    <Button onClick={action("button-click")}  sizeButton="large" typeButton="secondary" className="mr1"  disabled >Secondary disabled</Button>
    <Button onClick={action("button-click")}  sizeButton="large" typeButton="tertiary" className="mr1"  disabled >Tertiary disabled</Button>
    </div>
    
  </React.Fragment>

  ))
  .add('Small button', () => ( 
    <React.Fragment>
    <div className="m3">
    <Button onClick={action("button-click")}  sizeButton="small" typeButton="primary" className="mr1"  >Primary</Button>
    <Button onClick={action("button-click")}  sizeButton="small" typeButton="secondary" className="mr1"  >Secondary</Button>
    <Button onClick={action("button-click")}  sizeButton="small" typeButton="tertiary" className="mr1"   >Tertiary</Button>
    </div>
    <div className="m3">
    <Button onClick={action("button-click")}  sizeButton="small" typeButton="primary" className="mr1"  disabled  >Primary disabled</Button>
    <Button onClick={action("button-click")}  sizeButton="small" typeButton="secondary" className="mr1"  disabled >Secondary disabled</Button>
    <Button onClick={action("button-click")}  sizeButton="small" typeButton="tertiary" className="mr1"  disabled >Tertiary disabled</Button>
    </div>
    
  </React.Fragment>
  ));