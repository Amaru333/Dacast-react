import React from 'react';
import { storiesOf } from '@storybook/react';
import {ProgressBar} from '../components/FormsComponents/Progress/ProgressBar/ProgressBar'
import styled from 'styled-components';
import "../scss/style.scss";

storiesOf('Progress', module)
    .add('Progress Bar', () => ( 
        <React.Fragment>
            <StorybookProgressContainerStyle>
                <ProgressBar size="small" color="blue" startingValue="10%" /> 
            </StorybookProgressContainerStyle>
            <StorybookProgressContainerStyle>
            <ProgressBar size="large" color="red" startingValue="10px" /> 
            </StorybookProgressContainerStyle>
            <StorybookProgressContainerStyle>
            <ProgressBar size="small" color="yellow" startingValue="1em" /> 
            </StorybookProgressContainerStyle>
        </React.Fragment>

    ) );

const StorybookProgressContainerStyle = styled.div`
    width: 200px;
    float: left;
    margin: 20px;
`;