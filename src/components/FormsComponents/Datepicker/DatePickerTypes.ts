

export interface DatePickerProps {
    className?: string;
    id?: string;
    callback?: Function;
    DatepickerTitle?: string;
    defaultStartDate?: Date;
    defaultEndDate?: string;
    minDate: number;
}

interface DatePickerContext {
    focusedDate: Date;
    isDateFocused: (date: Date) => boolean;
    isDateSelected: (date: Date) => boolean;
    isDateHovered: (date: Date) => boolean;
    isDateBlocked: (date: Date) => boolean;
    isFirstOrLastSelectedDate: (date: Date) => boolean;
    onDateFocus: (date: Date) => void;
    onDateHover: (date: Date) => void;
    onDateSelect: (date: Date) => void;
    startDateStyle?: Date;
    endDateStyle?: Date;
    isSingle?: boolean;
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