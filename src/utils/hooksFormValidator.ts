import React from 'react';


export type ValidationsInputObject = { [key: string] : { id: string, error: boolean, errorMessage:string } };

export const formValidator = (formRef: React.RefObject<HTMLFormElement>) => {

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

    //Merge with the other Hook in FormSubmit and return an object with both data for submit and validation
    React.useEffect(() => {
        if(formRef.current && Object.getOwnPropertyNames(data).length === 0) {

            var dataInit= {};

            const filtered : { [key : number]: HTMLInputElement } = Object.keys(formRef.current)
            .filter(key => /^\d+$/.test(key) && formRef.current![key] instanceof HTMLInputElement)
            .reduce((obj, key) => {
                dataInit = { ...dataInit, [formRef.current![key].id]: { id: formRef.current![key].id, error: false, errorMessage: ""  }  }
                return {
                  ...obj,
                  [key]: formRef.current![key]
                };
            }, {});

            Object.entries(filtered).map(([key, element]) =>  {
                element.addEventListener('blur', (event) => {
                    let validity = element.checkValidity();
                    setData( (data : ValidationsInputObject)  =>  {return { ...data, [element.id] : { id: element.id, error: !validity, errorMessage: returnErrorMEssage( validity, element ) } } } );
                });
            })
            setData(dataInit);
        }
    }, [data])
        return data;


}