import React from 'react';
import { storiesOf } from '@storybook/react';
import {Datepicker} from '../components/FormsComponents/Datepicker/DateRangePicker';
import { withKnobs } from '@storybook/addon-knobs';
import styled from 'styled-components';
import "../scss/style.scss";
import { DateRangePickerWrapper } from '../components/FormsComponents/Datepicker/DateRangePickerWrapper';
import { DateSinglePickerWrapper } from '../components/FormsComponents/Datepicker/DateSinglePickerWrapper';
import { action } from '@storybook/addon-actions';


const stories = storiesOf('Date picker', module);
stories.addDecorator(withKnobs);

stories.add('Date Range picker', () => {
    return(
        <React.Fragment>
            <StorybookDropdownContainerStyle>
                <DateRangePickerWrapper callback={action("Callback Trigger")} />
            </StorybookDropdownContainerStyle>
        </React.Fragment>
    )
});

stories.add('Date Single picker', () => {
    return(
        <React.Fragment>
            <StorybookDropdownContainerStyle>
                <DateSinglePickerWrapper callback={action("Callback Trigger")} />
            </StorybookDropdownContainerStyle>
        </React.Fragment>
    )
});

const StorybookDropdownContainerStyle = styled.div`
    width: auto;
    float: left;
    margin: 20px;
`;