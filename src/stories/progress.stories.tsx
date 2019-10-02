import React from 'react';
import { storiesOf } from '@storybook/react';
import {LoadingSpinner} from '../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { withKnobs, select } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { ColorsApp, ColorsAppArray } from '../styled/types';
import "../scss/style.scss";


const stories = storiesOf('Progress', module);
stories.addDecorator(withKnobs);

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