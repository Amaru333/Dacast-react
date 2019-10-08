import React from 'react';
import { storiesOf } from '@storybook/react';
import {Dropdown} from '../components/FormsComponents/Dropdown/Dropdown';
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
            <Dropdown  title="My dropdown" dropdownType="Single" list={["item1", "item2", "item3"]}/> 
        </StorybookDropdownContainerStyle>
        <StorybookDropdownContainerStyle>
            <Dropdown  
                title="My checkbox dropdown" dropdownType="Multiple" list={["item1", "item2", "item3"]}/> 
        </StorybookDropdownContainerStyle>
    </React.Fragment>
    )
});

const StorybookDropdownContainerStyle = styled.div`
    width: 200px;
    float: left;
    margin: 20px;
`;