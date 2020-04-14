import React from 'react';
import { ValidationOptions } from 'react-hook-form';
export interface ValueInput { [key: string]: { value: string | boolean } }
export interface ValidationsInputObject { [key: string]: { id: string; error: boolean; errorMessage: string } }


var requiredHelp = "Required";

export type CustomType = 'email' | 'tel' | 'url' | 'password';

const PresetFormValidation: { [key in CustomType]: ValidationOptions } = {
    'email': {
        required: requiredHelp,
        pattern: {
            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: 'Please enter a valid email address'
        } 
    },
    'tel': {
        required: requiredHelp,
        pattern: {
            value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
            message: 'Please enter a valid phone number'
        } 
    },
    'url': {
        required: requiredHelp,
        pattern: {
            value: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
            message: 'Please enter a valid URL'
        } 
    },
    'password': {
        required: requiredHelp,
        minLength: {
            value: 6,
            message: 'Password must contain at least 6 characters'
        }
    }
}

export const handleValidationForm = (id: string, data: any, type?: CustomType, register?: Function) => {
    let spreadProps: any =  {
        isError: data[id],
        help: data[id] && (data[id].message ? data[id].message : data[id].validate) ,
        name: id
    }
    if(type && register) {
        spreadProps = { ...spreadProps, ref: register(PresetFormValidation[type]) }
    }
    return spreadProps;
}

//TODO: Delete all of this under that
export const handleValidationProps = (id: string, data: ValidationsInputObject) => {
    return {
        isError: data[id] ? data[id].error : false,
        help: data[id] ? data[id].errorMessage : ""
    }
}


export const formSubmit = (formRef: React.RefObject<HTMLFormElement>) => {

    const [dataValue, setDataValue] = React.useState<ValueInput>({})
    const [enabledSubmit, setEnabledSubmit] = React.useState<boolean>(false)
    const [data, setData] = React.useState<ValidationsInputObject>({})
    const [displayFormActionButtons, setDisplayFormActionButtons] = React.useState<boolean>(false);

    const returnErrorMEssage = ( validity: boolean, element: HTMLInputElement ) => {
        //Customize this with a constant file for each type / pattern associate to an error message
        if(validity) {
            return "";
        } else if(element.required && element.value.length === 0) {
            return "Input is required."
        } else {
            return "Input is invalid."
        }
    }

    const InputValueHandler = (inputType: string, element: HTMLInputElement) => {
        switch(inputType) {
            case 'email': 
            case 'tel':
            case 'text':
                element.addEventListener('keyup', (event) => {
                    event.preventDefault();
                    setDataValue( (dataValue: ValueInput)  =>  {return { ...dataValue, [element.id] : { value: element.value} } } );
                    setDisplayFormActionButtons(true);
                });
                break;
            case 'checkbox':
                element.addEventListener('change', (event) => {
                    event.preventDefault();
                    setDataValue( (dataValue: ValueInput)  =>  {return { ...dataValue, [element.id] : { value: element.checked} } } );
                    setDisplayFormActionButtons(true);
                });
                
                break;
            default:
                break;
        }
    }
    
    React.useEffect(() => {
        if(formRef.current && Object.getOwnPropertyNames(dataValue).length === 0)  {

            var dataInit={};
            var dataValueInit= {};
    
            const filtered: { [key: number]: HTMLInputElement } = Object.keys(formRef.current)
                .filter(key => /^\d+$/.test(key) && formRef.current![key] instanceof HTMLInputElement)
                .reduce((obj, key) => {
                    dataValueInit = { ...dataValueInit, [formRef.current![key].id]: { value: formRef.current![key].type === 'checkbox' ? formRef.current![key].defaultChecked: formRef.current![key].defaultValue }  };
                    dataInit = { ...dataInit, [formRef.current![key].id]: { id: formRef.current![key].id, error: false, errorMessage: ""  }  }
                    return {
                        ...obj,
                        [key]: formRef.current![key]
                    };
                }, {});
    
            Object.entries(filtered).map(([key, element]) =>  {
                InputValueHandler(element.type, element)
            })
    
            Object.entries(filtered).map(([key, element]) =>  {
                element.addEventListener('blur', (event) => {
                    event.preventDefault();
                    let validity = element.checkValidity();
                    setData( (data: ValidationsInputObject)  =>  {return { ...data, [element.id] : { id: element.id, error: !validity, errorMessage: returnErrorMEssage( validity, element ) } } } );
                });
            })
            setData(dataInit);
            setDataValue(dataValueInit);
        }



        if(formRef.current && Object.getOwnPropertyNames(dataValue).length !== 0) {
            if(Object.entries(data).filter( ([key, obj]) => obj.error ).length === 0 && formRef.current.checkValidity() ) {
                setEnabledSubmit(true)
            } else {
                setEnabledSubmit(false)
            }
        }
        
    }, [dataValue, data, enabledSubmit])
    return {value: dataValue, validations: data, enabledSubmit: enabledSubmit, displayFormActionButtons: displayFormActionButtons};

}

