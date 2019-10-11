import * as React from "react";

 export const useForm = (callback: () => void) => {
    const [formData, setFormData] = React.useState({firstName: ""});

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