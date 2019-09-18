import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {Button} from '../components/FormsComponents/Button/Button'

storiesOf('Buttons', module)
  .add('Large button', () => ( 
  <React.Fragment>
    <Button onClick={action("button-click")}  sizeButton="large" typeButton="primary"  >Primary</Button>
    <Button onClick={action("button-click")}  sizeButton="large" typeButton="secondary"  >Secondary</Button>
    <Button onClick={action("button-click")}  sizeButton="large" typeButton="tertiary"   >Tertiary</Button>
    <Button onClick={action("button-click")}  sizeButton="large" typeButton="primary"  disabled  >Primary disabled</Button>
    <Button onClick={action("button-click")}  sizeButton="large" typeButton="secondary"  disabled >Secondary disabled</Button>
    <Button onClick={action("button-click")}  sizeButton="large" typeButton="tertiary"  disabled >Tertiary disabled</Button>
  </React.Fragment>

  ))
  .add('Small button', () => ( 
    <React.Fragment>
      <Button onClick={action("button-click")}  sizeButton="small" typeButton="primary"  >Primary</Button>
      <Button onClick={action("button-click")}  sizeButton="small" typeButton="secondary"   >Secondary</Button>
      <Button onClick={action("button-click")}  sizeButton="small" typeButton="tertiary"   >Tertiary</Button>
      <Button onClick={action("button-click")}  sizeButton="small" typeButton="primary" disabled  >Primary disabled</Button>
      <Button onClick={action("button-click")}  sizeButton="small" typeButton="secondary"  disabled >Secondary disabled</Button>
      <Button onClick={action("button-click")}  sizeButton="small" typeButton="tertiary"  disabled >Tertiary disabled</Button>
    </React.Fragment> 
  ));