import { useRef, useContext } from "react";
import { useDay } from "@datepicker-react/hooks";
import DatepickerContext from "./DatepickerContext";
import { DayProps } from './DatePickerTypes';
import React from 'react';
import { DayStyle, DayWrapper } from './DatePickerStyle';

function Day({ dayLabel, date, isToday, isMonthLastDay }: DayProps) {
  const dayRef = useRef(null);
  const {
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateSelect,
    onDateFocus,
    onDateHover,
    startDateStyle,
    endDateStyle,
    isSingle
  } = useContext(DatepickerContext);
  const {
    isSelected,
    isSelectedStartOrEnd,
    isWithinHoverRange,
    disabledDate,
    onClick,
    onKeyDown,
    onMouseEnter,
    tabIndex
  } = useDay({
    date,
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateFocus,
    onDateSelect,
    onDateHover,
    dayRef
  });
  if (!dayLabel) {
    return <div></div>;
  }
  return (
      <DayWrapper 
        isWithinHoverRange={isWithinHoverRange} 
        isSelected={isSelected} 
        isSelectedStartOrEnd={isSelectedStartOrEnd}
        isLineBeginning={date.toString().includes("Mon")}
        isLineEnd={date.toString().includes("Sun")}
        isMonthLastDay={isMonthLastDay}
        isMonthFirstDay={dayLabel === '01'}
        isFirstDay={startDateStyle === date}
        isLastDay={endDateStyle === date}
        isSingle={isSingle!}
        >
            <DayStyle
                onClick={onClick}
                isWithinHoverRange={isWithinHoverRange}
                isSelected={isSelected}
                isSelectedStartOrEnd={isSelectedStartOrEnd}
                onMouseEnter={onMouseEnter}
                tabIndex={tabIndex}
                type="button"
                ref={dayRef}
                isToday={isToday}
                >
                {dayLabel}
            </DayStyle>
        </DayWrapper>


    );
}
export default Day;