import * as React from "react";

export interface FormFieldProps {
    firstName? : string
    lastName?: string
    companyWebsite?: string
    email?: string
    contactNumber?: string
    password?: string

}

 export const useForm = (callback: () => void) => {
    const [formData, setFormData] = React.useState<FormFieldProps>({});

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
        callback();
    }

    return {
        handleChange,
        handleSubmit,
        formData
    }
}