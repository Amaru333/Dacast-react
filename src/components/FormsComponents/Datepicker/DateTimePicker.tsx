import React, { useState } from "react";
import {useDatepicker, START_DATE, UseDatepickerProps, OnDatesChangeProps } from "@datepicker-react/hooks";
import DatepickerContext from "./DatepickerContext";
import Month from "./Month";
import { Icon } from '@material-ui/core';
import {DatepickerStyle, BoxStyle, MonthContainerStyle, NavButtonStyle, NavButtonLeftStyle, NavButtonRightStyle, IconStyle, StartTextStyle, EndTextStyle} from './DatePickerStyle';
import { Text } from '../../Typography/Text';
import { useOutsideAlerter } from '../../../utils/utils';


interface DateTimePickerProps {

}


export const DateTimePicker = (props: DateTimePickerProps) => {


    React.useEffect(() => {}, [])

    return ( );
}


