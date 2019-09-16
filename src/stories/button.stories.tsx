import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {ButtonApp} from '../components/ButtonApp/ButtonApp'

storiesOf('Welcome', module).add('to Storybook', () => <React.Fragment> Yo </React.Fragment> );

storiesOf('Buttons', module)
  .add('Primary button', () => ( 
  <React.Fragment>
    <ButtonApp onClick={action("button-click")}  sizeButton="small"  type="primary"  > Button Primary  </ButtonApp>
    <ButtonApp onClick={action("button-click")}  sizeButton="large" type="primary"   > Button Primary  </ButtonApp>
    <ButtonApp onClick={action("button-click")}  sizeButton="small" type="primary"   > Button Primary  </ButtonApp>
  </React.Fragment>

  ) );