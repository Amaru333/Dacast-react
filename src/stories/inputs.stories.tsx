import React from 'react';
import { storiesOf } from '@storybook/react';
import {Input} from '../components/FormsComponents/Input/Input'
import {InputCheckbox} from '../components/FormsComponents/Input/InputCheckbox';
import styled from 'styled-components';
import "../scss/style.scss";
import { InputRadio } from '../components/FormsComponents/Input/InputRadio';

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
                <InputCheckbox id="checkbox1" label="Checkbox" /> 
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <InputCheckbox id="checkbox2" disabled label="Disabled"/>  
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <InputCheckbox id="checkbox3" defaultChecked label="Default checked"/> 
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <InputCheckbox id="checkbox4" disabled defaultChecked label="Diabled checked"/>  
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <InputCheckbox id="checkbox6" disabled indeterminate label="Disabled indeterminate" />  
            </StorybookInputContainerStyle>
        </React.Fragment>

    ) )

        .add('Radio button input', () => (
            <React.Fragment>
                <InputRadio label="Test"></InputRadio>
            </React.Fragment>
        ));

const StorybookInputContainerStyle = styled.div`
    width: 200px;
    float: left;
    margin: 20px;
`;