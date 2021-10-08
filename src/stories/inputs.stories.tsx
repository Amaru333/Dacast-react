import React from 'react';
import { storiesOf } from '@storybook/react';
import {Input} from '../components/FormsComponents/Input/Input'
import {InputCheckbox} from '../components/FormsComponents/Input/InputCheckbox';
import styled from 'styled-components';
import "../scss/style.scss";
import { InputRadio } from '../components/FormsComponents/Input/InputRadio';
import { InputTags } from '../components/FormsComponents/Input/InputTags';
import { Text } from '../components/Typography/Text';
import { action } from '@storybook/addon-actions';

storiesOf('Inputs', module)
    .add('Text input', () => ( 
        <React.Fragment>


            <StorybookInputContainerStyle>
                <Input label='Simple Input' placeholder="Placeholder" /> 
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <Input label="Simple Input with icon" placeholder="Placeholder" icon="error"/> 
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <Input label="Simple Input with help" defaultValue="And a default value" placeholder="Placeholder" help="Help message here"/> 
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <Input label="Simple Input on error" placeholder="Placeholder" help="Error message here" isError={true}/> 
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <Input label="Disabled Input with icon/help" placeholder="Placeholder" help="Help message here" icon="error" disabled /> 
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <Input label="Input with icon prefix" inputPrefix={<Text size={14} weight="med" color={"gray-3"} > $ </Text>} placeholder="Placeholder" help="Info message here" /> 
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <Input label="Input with icon suffix"  suffix={<Text size={14} weight="med" color={"gray-3"} > $ </Text>} placeholder="Placeholder" /> 
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
            <StorybookInputContainerStyle>
                <InputRadio name="test" value="test" label="Radio Button 1"></InputRadio>
                <InputRadio name="test" value="test2" label="Radio Button 2"></InputRadio>
                <InputRadio name="test" value="test3" label="Radio Button 3"></InputRadio>
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
                <InputRadio disabled name="test-disabled" value="test" label="Disabled Radio Button 1"></InputRadio>
                <InputRadio  disabled name="test-disabled" value="test2" label="Disabled Radio Button 2"></InputRadio>
                <InputRadio checked disabled name="test-disabled" value="test3" label="Disabled Radio Button 3"></InputRadio>
            </StorybookInputContainerStyle>
        </React.Fragment>
            
    ))

    .add('Tags input', () => (
        <React.Fragment>
            <StorybookInputContainerStyle>
                 <InputTags placeholder="Placeholder..." label="Tags Input"/>
            </StorybookInputContainerStyle>
            <br/>
            <StorybookInputContainerStyle>
                 <InputTags defaultTags={["www.google.com", "www.someothereallylongdomainname.org"]} placeholder="Placeholder..." label="Tags Input with defaults"/>
            </StorybookInputContainerStyle>    
        </React.Fragment>
    ));

const StorybookInputContainerStyle = styled.div`
    width: 200px;
    display:inline-block;
    margin: 20px;
`;