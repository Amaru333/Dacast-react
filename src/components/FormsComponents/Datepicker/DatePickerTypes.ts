import { Data } from 'popper.js';

interface DatePickerContext {
    focusedDate: any,
    isDateFocused: (date: any) => boolean,
    isDateSelected: (date: any) => boolean,
    isDateHovered: (date: any) => boolean,
    isDateBlocked: (date: any) => boolean,
    isFirstOrLastSelectedDate: (date: any) => boolean,
    onDateFocus: (date: Date) => void,
    onDateHover: (date: Date) => void,
    onDateSelect: (date: Date) => void,
    startDateStyle?: any,
    endDateStyle?: any
}

export type DatePickerContextValue = DatePickerContext

export interface DayType {
    date: Date;
    focusedDate?: Date | null;
    isDateFocused?(date: Date): boolean;
    isDateSelected?(date: Date): boolean;
    isDateHovered?(date: Date): boolean;
    isDateBlocked?(date: Date): boolean;
    isFirstOrLastSelectedDate?(date: Date): boolean;
    onDateFocus?(date: Date): void;
    onDateSelect?(date: Date): void;
    onDateHover?(date: Date): void;
    dayRef?: React.RefObject<HTMLButtonElement>;
    dayLabel: string;
    key: string;
    isToday: boolean;
    isMonthLastDay: boolean;
  }

export type DayProps = DayType & React.HTMLAttributes<HTMLButtonElement>;