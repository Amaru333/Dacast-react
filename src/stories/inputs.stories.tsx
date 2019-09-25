import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {Input} from '../components/FormsComponents/Input/Input'
import styled from 'styled-components';
import "../scss/style.scss";

storiesOf('Inputs', module)
    .add('Text input', () => ( 
        <React.Fragment>


            <StorybookInputContainerStyle>
                <Input placeholder="Placeholder" /> 
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <Input placeholder="Placeholder" icon="error"/> 
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <Input placeholder="Placeholder" help="Help for this input"/> 
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <Input placeholder="Placeholder" help="Error for this input" isError={true}/> 
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <Input label="Whatever label"  placeholder="Placeholder" /> 
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <Input label="Whatever label" placeholder="Placeholder" help="Info for this input" icon="error" disabled /> 
            </StorybookInputContainerStyle>
        </React.Fragment>

    ) );

const StorybookInputContainerStyle = styled.div`
    width: 200px;
    float: left;
    margin: 20px;
`;