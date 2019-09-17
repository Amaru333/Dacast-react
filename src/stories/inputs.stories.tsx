import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {Input} from '../components/FormsComponents/Input/Input'

storiesOf('Inputs', module)
  .add('Primary button', () => ( 
  <React.Fragment>
    <Input  defaultValue="test"  /> 
    <Input  placeholder="helo" onKeyPress={action("key-press")} /> 
  </React.Fragment>

  ) );