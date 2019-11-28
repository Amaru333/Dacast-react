import React, { useState } from "react";
import {useDatepicker, START_DATE, UseDatepickerProps, OnDatesChangeProps } from "@datepicker-react/hooks";
import DatepickerContext from "./DatepickerContext";
import Month from "./Month";
import { Icon } from '@material-ui/core';
import {DatepickerStyle, BoxStyle, MonthContainerStyle, NavButtonStyle, NavButtonLeftStyle, NavButtonRightStyle, IconStyle, StartTextStyle, EndTextStyle} from './DatePickerStyle';
import { Text } from '../../Typography/Text';
import { useOutsideAlerter } from '../../../utils/utils';

const NavButton = (props: React.HtmlHTMLAttributes<HTMLButtonElement>) => {
    return (
        <NavButtonStyle
            type="button"
            onClick={props.onClick}
        >
            {props.children}
        </NavButtonStyle>
    );
}


export const  Datepicker = () => {

    const [isOpened, setIsOpened] = useState<boolean>(false);

    React.useEffect(() => console.log(isOpened), [isOpened])

    const datepickerRef = React.useRef<HTMLDivElement>(null);
    useOutsideAlerter(datepickerRef, () => setIsOpened(false));
    const [state, setState] = useState<OnDatesChangeProps>({
        startDate: null,
        endDate: null,
        focusedInput: START_DATE
    });

    const handleDateChange = (data: UseDatepickerProps) => {
        if (!data.focusedInput) {
            setState({ ...data, focusedInput: START_DATE });
        } else {
            setState(data);
        }
    }

    const {
        firstDayOfWeek,
        activeMonths,
        isDateSelected,
        isDateHovered,
        isFirstOrLastSelectedDate,
        isDateBlocked,
        isDateFocused,
        focusedDate,
        onDateHover,
        onDateSelect,
        onDateFocus,
        goToPreviousMonths,
        goToNextMonths
    } = useDatepicker({
        startDate: state.startDate,
        endDate: state.endDate,
        focusedInput: state.focusedInput,
        onDatesChange: handleDateChange
    });

    return (
        <DatepickerStyle ref={datepickerRef} isSingle={false}>
            <DatepickerContext.Provider
                value={{
                    focusedDate,
                    isDateFocused,
                    isDateSelected,
                    isDateHovered,
                    isDateBlocked,
                    isFirstOrLastSelectedDate,
                    onDateSelect,
                    onDateFocus,
                    onDateHover,
                    startDateStyle: state.startDate,
                    endDateStyle: state.endDate
                }}
            >
                    
                <BoxStyle isSelected={isOpened} onClick={() => setIsOpened(!isOpened)}>
                    <StartTextStyle text={state.startDate ? true : false}>
                        <Text size={16} weight='reg' color='gray-3'>
                            {state.startDate ? state.startDate.toLocaleDateString() : "Select date"}
                        </Text>
                    </StartTextStyle>
                    <IconStyle isCalendar={false}><Icon>arrow_forward</Icon></IconStyle>
                    <EndTextStyle text={state.endDate ? true : false}>
                        <Text size={16} weight='reg' color='gray-3'>
                            {state.endDate ? state.endDate.toLocaleDateString() : "Select date"}
                        </Text>
                    </EndTextStyle>
                    <IconStyle isCalendar={true}><Icon>calendar_today</Icon></IconStyle>
                </BoxStyle>
                <MonthContainerStyle isSingle={false} open={isOpened}>
                    <NavButtonLeftStyle>
                        <NavButton onClick={goToPreviousMonths}>
                            <Icon>keyboard_arrow_left</Icon>
                        </NavButton>
                    </NavButtonLeftStyle>
                    <NavButtonRightStyle>
                        <NavButton onClick={goToNextMonths}>
                            <Icon>keyboard_arrow_right</Icon>
                        </NavButton>
                    </NavButtonRightStyle>
                    {activeMonths.map(month => (
                        
                        <Month
                            key={`${month.year}-${month.month}`}
                            year={month.year}
                            month={month.month}
                            firstDayOfWeek={firstDayOfWeek}
                        />
                    ))}
                </MonthContainerStyle>
            </DatepickerContext.Provider>
        </DatepickerStyle>
     
    );
}


