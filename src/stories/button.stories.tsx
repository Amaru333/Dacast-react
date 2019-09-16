import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('Welcome', module).add('to Storybook', () => <React.Fragment> Yo </React.Fragment> );

storiesOf('Button', module)
  .add('with text2', () => <React.Fragment> Some random Button here </React.Fragment>);