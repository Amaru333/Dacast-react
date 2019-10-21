import { useMonth, UseMonthProps } from "@datepicker-react/hooks";
import Day from "./Day";
import React from 'react';
import { Text } from '../../Typography/Text';
import { WeekdayStyle, DaysContainer, MonthContainer, MonthLabelStyle } from './DatePickerStyle';

const  Month = ({ year, month, firstDayOfWeek }: UseMonthProps) => {
  const { days, weekdayLabels, monthLabel } = useMonth({
    year,
    month,
    firstDayOfWeek
  });

  const today = new Date()
  return (
    <MonthContainer>
      <MonthLabelStyle>
        <Text size={16} weight='med' color='gray-3'>{monthLabel}</Text>
      </MonthLabelStyle>
      <WeekdayStyle>
        {weekdayLabels.map(dayLabel => (
          <Text size={12} weight='med' color='gray-3' key={dayLabel}>
            {dayLabel.substring(0,1)}
          </Text>
        ))}
      </WeekdayStyle>
      <DaysContainer>
        {days.map((day, index) => {
          if (typeof day === "object") {
            return (
              <Day
                date={day.date}
                key={day.date.toString()}
                dayLabel={day.dayLabel}
                isToday={today.toLocaleDateString() === day.date.toLocaleDateString()}
                isMonthLastDay={index === (days.length - 1)}
              />
            );
          }
          return <div key={index} />;
        })}
      </DaysContainer>
    </MonthContainer>
  );
}
export default Month;