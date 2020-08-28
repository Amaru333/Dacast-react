import React from 'react';
import { storiesOf } from '@storybook/react';
import {DropdownCheckbox} from '../components/FormsComponents/Dropdown/DropdownCheckbox';
import {DropdownSingle} from '../components/FormsComponents/Dropdown/DropdownSingle';
import { withKnobs } from '@storybook/addon-knobs';
import styled from 'styled-components';
import "../scss/style.scss";
import { DropdownCountries } from '../components/FormsComponents/Dropdown/DropdownCountries';
import { action } from '@storybook/addon-actions';

const stories = storiesOf('Dropdown', module);
stories.addDecorator(withKnobs);

stories.add('Dropdown', () => {
    return(
        <React.Fragment>
            <StorybookDropdownContainerStyle>
                <DropdownSingle 
                    id="singleDopdown"
                    dropdownTitle="Dropdown example" 
                    list={{ "Green":false, "Yellow":false, "Blue":false }}
                    callback={action("Callback Trigger")}
                    />
            </StorybookDropdownContainerStyle>
            {/* <StorybookDropdownContainerStyle>
                <DropdownCheckbox  
                    id="checkboxDropdown"
                    dropdownTitle="My checkbox dropdown"
                    list={  { "Checkbox1":false, "Checkbox2":false, "Checkbox3":false } }
                /> 
            </StorybookDropdownContainerStyle> */}
            <StorybookDropdownContainerStyle>
                <DropdownCountries 
                    id="countriesDropdown"
                    dropdownTitle="Multi Check Countries Dropdown"
                    list={[]}
                    callback={action("Callback Trigger")}
                /> 
            </StorybookDropdownContainerStyle>
        </React.Fragment>
    )
});

const StorybookDropdownContainerStyle = styled.div`
    width: 400px;
    float: left;
    margin: 20px;
`;