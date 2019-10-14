import * as React from "react";
import { validateForm }  from './validateForm';

export interface FormFieldProps {
    firstName? : string
    lastName?: string
    companyWebsite?: string
    email?: string
    contactNumber?: string
    password?: string

}

 export const useForm = (callback: () => void, validation: () => void) => {
    const [formData, setFormData] = React.useState<FormFieldProps>({});
    const [errors, setErrors] = React.useState<FormFieldProps>({});
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
     
    React.useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
          }
    }, [errors])
    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {

        const { id, value } = event.currentTarget

        setFormData(
            {
                ...formData,
                [id]: value
            }
        )
    }

    const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        setErrors(validateForm(formData))
        setIsSubmitting(true);
    }

    return {
        handleChange,
        handleSubmit,
        formData,
        errors
    }
}