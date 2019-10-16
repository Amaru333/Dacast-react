import { FormFieldProps } from './useForm';

export  function validateForm(formData: FormFieldProps) {
    let errors: FormFieldProps = {};

    if (!formData.firstName) {
        errors.firstName = "First name required"
    }
    if (!formData.lastName) {
        errors.lastName = "Last name required"
    }
    if (!formData.companyWebsite) {
        errors.companyWebsite = "Company website required"
    }
    if (!formData.email) {
        errors.email = "Email address required"
    } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(formData.email)) {
        errors.email = "Email address invalid"
    }
    if (!formData.contactNumber) {
        errors.contactNumber = "Contact number required"
    }
    if (!formData.password) {
        errors.password = "Password required"
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/.test(formData.password)) {
        errors.password = "Password must contain one upper case letter, one lower case letter and one numeric digit"
    }
    

    return errors;
}