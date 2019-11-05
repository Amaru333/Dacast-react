import React from 'react';


export interface ValueInput { [key: string]: { value: string } }
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
    
    React.useEffect(() => {
        if(formRef.current && Object.entries(dataValue).every((key, element) => {return dataValue[element] ? dataValue[element].value.length === 0 : true}))  {

            var dataInit={};
            var dataValueInit= {};

            const filtered: { [key: number]: HTMLInputElement } = Object.keys(formRef.current)
                .filter(key => /^\d+$/.test(key) && formRef.current![key] instanceof HTMLInputElement)
                .reduce((obj, key) => {
                    dataValueInit = { ...dataValueInit, [formRef.current![key].id]: { value: formRef.current![key].defaultValue }  };
                    dataInit = { ...dataInit, [formRef.current![key].id]: { id: formRef.current![key].id, error: false, errorMessage: ""  }  }
                    return {
                        ...obj,
                        [key]: formRef.current![key]
                    };
                }, {});

            Object.entries(filtered).map(([key, element]) =>  {
                element.addEventListener('keyup', (event) => {
                    setDataValue( (dataValue: ValueInput)  =>  {return { ...dataValue, [element.id] : { value: element.value} } } );
                });
            })

            Object.entries(filtered).map(([key, element]) =>  {
                element.addEventListener('blur', (event) => {
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
    return {value: dataValue, validations: data, enabledSubmit: enabledSubmit};


}