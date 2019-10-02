import React from 'react';
import { storiesOf } from '@storybook/react';
import {ProgressBar} from '../components/FormsComponents/Progress/ProgressBar/ProgressBar'
import styled from 'styled-components';
import { withKnobs, select } from '@storybook/addon-knobs';
import { ColorsApp, ColorsAppArray } from '../styled/types';
import "../scss/style.scss";

const stories = storiesOf('Progress', module);
stories.addDecorator(withKnobs);

stories.add('Progress Bar', () => {
    const color = select<ColorsApp>("Colors", ColorsAppArray, "gray-1");
    return (
        <React.Fragment>
        <StorybookProgressContainerStyle>
            <ProgressBar size="small" color="blue" startingValue="10%" label="someLabel"/> 
        </StorybookProgressContainerStyle>
        <StorybookProgressContainerStyle>
        <ProgressBar size="large" color="red" startingValue="10px" /> 
        </StorybookProgressContainerStyle>
        <StorybookProgressContainerStyle>
        <ProgressBar size="small" color="yellow" startingValue="1em" /> 
        </StorybookProgressContainerStyle>
    </React.Fragment>
    );
});

const StorybookProgressContainerStyle = styled.div`
    width: 200px;
    float: left;
    margin: 20px;
`;