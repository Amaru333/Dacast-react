import React, { useState } from "react";
import {useDatepicker, START_DATE, UseDatepickerProps, OnDatesChangeProps } from "@datepicker-react/hooks";
import DatepickerContext from "./DatepickerContext";
import Month from "./Month";
import { Icon } from '../../Icon/Icon';
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


export const DateRangePicker = (props: { start: number, end: number, onDatesChange: (data: {endDate: Date; startDate: Date}) => void } &  React.HtmlHTMLAttributes<HTMLDivElement>) => {

    const [isOpened, setIsOpened] = useState<boolean>(false);

    React.useEffect(() => {}, [isOpened])

    const datepickerRef = React.useRef<HTMLDivElement>(null);
    useOutsideAlerter(datepickerRef, () => setIsOpened(false));
    const [state, setState] = useState<OnDatesChangeProps>({
        startDate: props.start === null ? new Date(props.start) : null,
        endDate: props.end === null ? new Date(props.end) : null,
        focusedInput: START_DATE
    });

    const handleDateChange = (data: UseDatepickerProps) => {
        if (!data.focusedInput) {
            setState({ ...data, focusedInput: START_DATE });
        } else {
            setState(data);
        }
        if(data.startDate && data.endDate) {
            setIsOpened(false)
        }
        props.onDatesChange(data)
    }

    React.useEffect(() => {
        setState({
            ...state,
            startDate: props.start ? new Date(props.start) : null,
            endDate: props.end ? new Date(props.end) : null
        })
    }, [props.start, props.end])


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
        <DatepickerStyle  isSingle={false} className={props.className}>
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
                    <StartTextStyle isSingle={false} text={state.startDate ? true : false}>
                        <Text size={14} weight='reg' color='gray-1'>
                            {state.startDate ? state.startDate.toLocaleDateString() : "Select date"}
                        </Text>
                    </StartTextStyle>
                    <IconStyle isCalendar={false}><Icon>arrow_forward</Icon></IconStyle>
                    <EndTextStyle text={state.endDate ? true : false}>
                        <Text size={14} weight='reg' color='gray-1'>
                            {state.endDate ? state.endDate.toLocaleDateString() : "Select date"}
                        </Text>
                    </EndTextStyle>
                    <IconStyle isCalendar={true}><Icon>calendar_today</Icon></IconStyle>
                </BoxStyle>
                <MonthContainerStyle ref={datepickerRef} isSingle={false} open={isOpened}>
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


