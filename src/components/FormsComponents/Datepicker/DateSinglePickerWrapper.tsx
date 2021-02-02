import React from 'react';
import { Text } from '../../Typography/Text'
import { DateSinglePicker } from './DateSinglePicker';

export const DateSinglePickerWrapper = (props: { date?: Date; minDate?: Date; allowOustsideDate?: boolean; className?: string; callback?: (date: Date) => void; id?: string; datepickerTitle?: string; }) => {


    const handleDateChange = (date: Date) => {
        if (props.callback && date) {
            props.callback(date)
        }
    }
    
    return (
        <div className={props.className}>
            <div className="flex flex-column">
                {
                    props.datepickerTitle &&
                        <div style={{ marginTop: 4, marginBottom: 4 }}>
                            <Text size={14} weight='med'>{props.datepickerTitle}</Text>
                        </div>
                }
                <DateSinglePicker 
                    callback={(date: Date) => handleDateChange(date)}
                    id={props.id + 'SingleDatePicker'}
                    defaultStartDate={props.date}
                    minDate={props.minDate.getTime()}
                />
            </div>
        </div>

    )
}