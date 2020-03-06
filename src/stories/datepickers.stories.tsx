import React from 'react';
import { storiesOf } from '@storybook/react';
import {Datepicker} from '../components/FormsComponents/Datepicker/DateRangePicker';
import {DateSinglePickerWrapper} from '../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
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
                <DateSinglePickerWrapper />
            </StorybookDropdownContainerStyle>
        </React.Fragment>
    )
});

const StorybookDropdownContainerStyle = styled.div`
    width: 100%;
    float: left;
    margin: 20px;
`;