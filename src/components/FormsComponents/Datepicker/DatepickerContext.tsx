import * as React from 'react';
import { DatePickerContextValue } from './DatePickerTypes'


const datepickerContextDefaultValue: DatePickerContextValue = {
    focusedDate: null,
    isDateFocused: (date: Date) => false,
    isDateSelected: (date: Date) => false,
    isDateHovered: (date: Date) => false,
    isDateBlocked: (date: Date) => false,
    isFirstOrLastSelectedDate: (date: Date) => false,
    onDateFocus: (date: Date) => {},
    onDateHover: (date: Date) => {},
    onDateSelect: (date: Date) => {},
    startDateStyle:  null,
    endDateStyle: null,
};

export default React.createContext(datepickerContextDefaultValue);