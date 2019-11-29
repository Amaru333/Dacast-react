import React from 'react';
import { storiesOf } from '@storybook/react';
import {Input} from '../components/FormsComponents/Input/Input'
import {InputCheckbox} from '../components/FormsComponents/Input/InputCheckbox';
import styled from 'styled-components';
import "../scss/style.scss";
import { InputRadio } from '../components/FormsComponents/Input/InputRadio';
import { InputSlider } from '../components/FormsComponents/Input/InputSlider';
import { InputTags } from '../components/FormsComponents/Input/InputTags';
import { Text } from '../components/Typography/Text';

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
                <Input defaultValue="With a default value" placeholder="Placeholder" help="Help for this input"/> 
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
            <StorybookInputContainerStyle>
                <Input label="Whatever label" prefix={<Text size={14} weight="med" color={"gray-3"} > $ </Text>} placeholder="Placeholder" help="Info for this input" /> 
            </StorybookInputContainerStyle>
            <StorybookInputContainerStyle>
            <Input label="Whatever label"  suffix={<Text size={14} weight="med" color={"gray-3"} > $ </Text>} placeholder="Placeholder" help="Info for this input" /> 
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
            <InputRadio name="test" value="test" label="Test"></InputRadio>
            <InputRadio name="test" value="test2" label="Test 2"></InputRadio>
            <InputRadio name="test" value="test3" label="Test 3"></InputRadio>
            <InputRadio disabled name="test-disabled" value="test" label="Disabled Test"></InputRadio>
            <InputRadio  disabled name="test-disabled" value="test2" label="Disabled Test 2"></InputRadio>
            <InputRadio checked disabled name="test-disabled" value="test3" label="Disabled Test 3"></InputRadio>
        </React.Fragment>
            
    ))

    .add('Slider input', () => (
        <React.Fragment>
            <StorybookInputContainerStyle>
                 <InputSlider id="testSlider" min={0} max={150} value={[30, 100]}/>
            </StorybookInputContainerStyle>
        </React.Fragment>
    ))

    .add('Tags input', () => (
        <React.Fragment>
            <StorybookInputContainerStyle>
                 <InputTags placeholder="Type URL..." label="test"/>
            </StorybookInputContainerStyle>
            <br/>
            <StorybookInputContainerStyle>
                 <InputTags defaultTags={["www.google.com", "www.someothereallylongdomainname.org"]} placeholder="Type URL..." label="test with default tags"/>
            </StorybookInputContainerStyle>    
        </React.Fragment>
    ));

const StorybookInputContainerStyle = styled.div`
    width: 200px;
    margin: 20px;
`;