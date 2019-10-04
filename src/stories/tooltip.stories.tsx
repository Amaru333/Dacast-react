import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import "../scss/style.scss";
import { Button } from '../components/FormsComponents/Button/Button';
import { Tooltip } from '../components/Tooltip/Tooltip';

storiesOf('Tooltips', module)
    .add('Tooltip', () => ( 
        <React.Fragment>
            <StorybookInputContainerStyle>
             <Button id="tooltipButton" > Super long button tooltip </Button>
             <Tooltip target="tooltipButton" > Tooltip </Tooltip>
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
             <Button id="tooltipButton2" > Small button tooltip </Button>
             <Tooltip target="tooltipButton2" > Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Tooltip>
            </StorybookInputContainerStyle>
        </React.Fragment>

    ));

const StorybookInputContainerStyle = styled.div`
    float: left;
    margin: 150px 20px 20px 60px;
`;