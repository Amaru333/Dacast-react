import React from 'react';
import { storiesOf } from '@storybook/react';
import {Datepicker} from '../components/FormsComponents/Datepicker/DateRangePicker';
import {DateSinglePicker} from '../components/FormsComponents/Datepicker/DateSinglePicker';
import { withKnobs } from '@storybook/addon-knobs';
import styled from 'styled-components';
import "../scss/style.scss";


const stories = storiesOf('Date picker', module);
stories.addDecorator(withKnobs);

stories.add('Date Range picker', () => {
    return(
        <React.Fragment>
            <StorybookDropdownContainerStyle>
                <Datepicker />
            </StorybookDropdownContainerStyle>
        </React.Fragment>
    )
});

stories.add('Date Single picker', () => {
    return(
        <React.Fragment>
            <StorybookDropdownContainerStyle>
                <DateSinglePicker />
            </StorybookDropdownContainerStyle>
        </React.Fragment>
    )
});

const StorybookDropdownContainerStyle = styled.div`
    width: 100%;
    float: left;
    margin: 20px;
`;