import React from 'react';
import { storiesOf } from '@storybook/react';
import {Input} from '../components/FormsComponents/Input/Input'
import {InputCheckbox} from '../components/FormsComponents/Input/InputCheckbox';
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

    ) )
        .add('Checkbox input', () => ( 
        <React.Fragment>
            <StorybookInputContainerStyle>
                <InputCheckbox disabled={false} label="Checkbox1" /> 
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <InputCheckbox disabled label="Disabled"/>  
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <InputCheckbox disabled={false} defaultChecked label="default checked"/> 
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <InputCheckbox disabled defaultChecked label="disabled checked"/>  
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <InputCheckbox disabled={false} indeterminate label="indeterminate"/> 
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <InputCheckbox disabled id="test" indeterminate label="disabled indeterminate" />  
            </StorybookInputContainerStyle>
        </React.Fragment>

    ) );

const StorybookInputContainerStyle = styled.div`
    width: 200px;
    float: left;
    margin: 20px;
`;