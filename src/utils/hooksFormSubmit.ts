import React from 'react';


export interface ValueInput { [key: string]: { value: string | boolean } }
export interface ValidationsInputObject { [key: string]: { id: string; error: boolean; errorMessage: string } }

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
                });
                break;
            case 'checkbox':
                element.addEventListener('change', (event) => {
                    event.preventDefault();
                    setDataValue( (dataValue: ValueInput)  =>  {return { ...dataValue, [element.id] : { value: element.checked} } } );
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
    console.log(dataValue)
    return {value: dataValue, validations: data, enabledSubmit: enabledSubmit};

}

