import { FormFieldProps } from './useForm';

export  function validateForm(formData: FormFieldProps) {
    let errors: FormFieldProps = {};

    if (!formData.email) {
        errors.email = "Email address required"
    }
    return errors;
}