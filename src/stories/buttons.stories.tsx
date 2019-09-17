import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {Button} from '../components/FormsComponents/Button/Button'

storiesOf('Welcome', module).add('to Storybook', () => <React.Fragment> Yo </React.Fragment> );

storiesOf('Buttons', module)
  .add('Primary button', () => ( 
  <React.Fragment>
    <Button onClick={action("button-click")}  sizeButton="small" typeButton="primary"  > Button Primary  </Button>
    <Button onClick={action("button-click")}  sizeButton="large" typeButton="primary"   > Button Primary  </Button>
    <Button onClick={action("button-click")}  sizeButton="small" typeButton="primary"   > Button Primary  </Button>
  </React.Fragment>

  ) );