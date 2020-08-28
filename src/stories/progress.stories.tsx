import React from 'react';
import { storiesOf } from '@storybook/react';
import {LoadingSpinner} from '../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import {ProgressBar} from '../components/FormsComponents/Progress/ProgressBar/ProgressBar'
import styled from 'styled-components';
import { withKnobs, select } from '@storybook/addon-knobs';
import { ColorsApp, ColorsAppArray } from '../styled/types';
import "../scss/style.scss";
import { Text } from '../components/Typography/Text'

const stories = storiesOf('Progress', module);
stories.addDecorator(withKnobs);

stories.add('Progress Bar', () => {
    return (
        <React.Fragment>
            <StorybookProgressContainerStyle>
                <Text className="mb1"> Small Progress Bar </Text>
                <ProgressBar className="mb1" size="small" color="blue" startingValue={10} label="someLabel"/> 
                <ProgressBar size="small" color="yellow" startingValue={90} /> 
            </StorybookProgressContainerStyle>
            <StorybookProgressContainerStyle>
                <Text className="mb1"> Large Progress Bar </Text>
                <ProgressBar className="mb1" size="large" color="red" startingValue={20} /> 
                <ProgressBar className="mb1" size="large" color="black" startingValue={90} /> 
            </StorybookProgressContainerStyle>
        </React.Fragment>
    );
});

stories.add('Loading spinner', () => {
    const color = select<ColorsApp>("Colors", ColorsAppArray, "dark-violet");
    return(
        <React.Fragment>
            <StorybookProgressContainerStyle>
                <Text className="mb1 block"> Large Loading Spinner </Text>
                <LoadingSpinner  size="large" color={color}/> 
            </StorybookProgressContainerStyle>
            <StorybookProgressContainerStyle>
                <Text className="mb1 block"> Medium Loading Spinner </Text>
                <LoadingSpinner size="medium" color={color}/> 
            </StorybookProgressContainerStyle>
            <StorybookProgressContainerStyle>
                <Text className="mb1 block"> Small Loading Spinner </Text>
                <LoadingSpinner size="small" color={color}/> 
            </StorybookProgressContainerStyle>
            <StorybookProgressContainerStyle>
                <Text className="mb1 block"> Xs Loading Spinner </Text>
                <LoadingSpinner size="xs" color={color}/> 
            </StorybookProgressContainerStyle>
            <StorybookProgressContainerStyle>
                <Text className="mb1 block"> xxs (Button) Loading Spinner </Text>
                <LoadingSpinner size="xxs" color={color}/> 
            </StorybookProgressContainerStyle>
        </React.Fragment>
    )
});

const StorybookProgressContainerStyle = styled.div`
    width: auto;
    float: left;
    margin: 20px;
`;