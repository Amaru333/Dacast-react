import React from 'react';

export type InputType =
| 'text'
| 'email'
| 'select'
| 'file'
| 'radio'
| 'checkbox'
| 'textarea'
| 'button'
| 'reset'
| 'submit'
| 'date'
| 'datetime-local'
| 'hidden'
| 'image'
| 'month'
| 'number'
| 'range'
| 'search'
| 'tel'
| 'url'
| 'week'
| 'password'
| 'datetime'
| 'time'
| 'color';

export interface InputSpecificProps {
    label?: string;
    indicationLabel?: string;
    icon?: string;
    help?: string;
    isError?: boolean;
    disabled?: boolean;
    type?: InputType;
    name?: string;
    value?: string;  
    required?: boolean;
    ref?: React.RefObject<HTMLInputElement>;
    inputPrefix?: JSX.Element;
    suffix?: JSX.Element;
    step?: string;
}

export interface CheckboxSpecificProps {
    disabled?: boolean;
}

export type InputProps = InputSpecificProps & React.HTMLAttributes<HTMLInputElement>;

export type labelWeight = "reg" | "med";

export interface InputCheckboxSpecificProps {
    id: string;
    label?: string;
    disabled: boolean;
    indeterminate?: boolean;
    labelWeight: labelWeight;
    checked?: boolean;
}

export type InputCheckboxProps = InputCheckboxSpecificProps & React.HTMLAttributes<HTMLInputElement>;

export interface RadioSpecificProps {
    name: string;
    checked?: boolean;
    label: string;
    disabled?: boolean;
    value?: string;
}

export type RadioProps = RadioSpecificProps & React.HTMLAttributes<HTMLInputElement>;

export type SliderContainerProps = SliderSpecificProps & React.HTMLAttributes<HTMLInputElement>;

export interface SliderSpecificProps {
    min: number;
    max: number;
    value: number[];
    id: string;
}

export interface TagSpecificProps {
    defaultTags?: string[];
}

export type TagProps = TagSpecificProps & InputProps;
