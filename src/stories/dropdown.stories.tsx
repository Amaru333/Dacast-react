import React from 'react';
import { storiesOf } from '@storybook/react';
import {DropdownCheckbox} from '../components/FormsComponents/Dropdown/DropdownCheckbox';
import {DropdownSingle} from '../components/FormsComponents/Dropdown/DropdownSingle';
import { withKnobs, select } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { ColorsApp, ColorsAppArray } from '../styled/types';
import "../scss/style.scss";


const stories = storiesOf('Dropdown', module);
stories.addDecorator(withKnobs);

stories.add('Dropdown', () => {
    const color = select<ColorsApp>("Colors", ColorsAppArray, "dark-violet");
    return(
        <React.Fragment>
        <StorybookDropdownContainerStyle>
            <DropdownSingle 
                id="singleDopdown"
                dropdownTitle="My dropdown" 
                list={{ "item1":false, "item2":false, "item3":false }}/> 
        </StorybookDropdownContainerStyle>
        <StorybookDropdownContainerStyle>
            <DropdownCheckbox  
                id="checkboxDropdown"
                dropdownTitle="My checkbox dropdown"
                list={  { "Checkbox1":false, "Checkbox2":false, "Checkbox3":false } }
            /> 
        </StorybookDropdownContainerStyle>
    </React.Fragment>
    )
});

const StorybookDropdownContainerStyle = styled.div`
    width: 200px;
    float: left;
    margin: 20px;
`;