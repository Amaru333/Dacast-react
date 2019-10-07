import React from 'react';
import { storiesOf } from '@storybook/react';
import {LoadingSpinner} from '../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import {ProgressBar} from '../components/FormsComponents/Progress/ProgressBar/ProgressBar'
import styled from 'styled-components';
import { withKnobs, select } from '@storybook/addon-knobs';
import { ColorsApp, ColorsAppArray } from '../styled/types';
import "../scss/style.scss";

const stories = storiesOf('Progress', module);
stories.addDecorator(withKnobs);

stories.add('Progress Bar', () => {
    return (
        <React.Fragment>
            <StorybookProgressContainerStyle>
                <ProgressBar size="small" color="blue" startingValue="10%" label="someLabel"/> 
            </StorybookProgressContainerStyle>
            <StorybookProgressContainerStyle>
                <ProgressBar size="large" color="red" startingValue="20%" /> 
            </StorybookProgressContainerStyle>
            <StorybookProgressContainerStyle>
                <ProgressBar size="small" color="yellow" startingValue="90%" /> 
            </StorybookProgressContainerStyle>
        </React.Fragment>
    );
});

stories.add('Loading spinner', () => {
    const color = select<ColorsApp>("Colors", ColorsAppArray, "dark-violet");
    return(
        <React.Fragment>
            <StorybookProgressContainerStyle>
                <LoadingSpinner  size="large" color={color}/> 
            </StorybookProgressContainerStyle>
            <StorybookProgressContainerStyle>
                <LoadingSpinner size="medium" color={color}/> 
            </StorybookProgressContainerStyle>
            <StorybookProgressContainerStyle>
                <LoadingSpinner size="small" color={color}/> 
            </StorybookProgressContainerStyle>
        </React.Fragment>
    )
});

const StorybookProgressContainerStyle = styled.div`
    width: 200px;
    float: left;
    margin: 20px;
`;