
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
    icon?: string;
    help?: string;
    isError?: boolean;
    disabled?: boolean;
    type?: InputType;
}

export interface CheckboxSpecificProps {
    disabled?: boolean;
}

export type InputProps = InputSpecificProps & React.HTMLAttributes<HTMLInputElement>;

export interface InputCheckboxSpecificProps {
    id: string;
    label?: string;
    disabled?: boolean;
    indeterminate?: boolean;
}

export type InputCheckboxProps = InputCheckboxSpecificProps & React.HTMLAttributes<HTMLInputElement>;