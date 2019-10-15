import React from 'react';


export type ValueInput = { [key: string] : { value:string } };

export const formSubmit = (formRef: React.RefObject<HTMLFormElement>) => {

    const [dataValue, setDataValue] = React.useState<ValueInput>({})

    React.useEffect(() => {
        if(formRef.current && Object.getOwnPropertyNames(dataValue).length === 0) {

            var dataInit= {};

            const filtered : { [key : number]: HTMLInputElement } = Object.keys(formRef.current)
            .filter(key => /^\d+$/.test(key) && formRef.current![key] instanceof HTMLInputElement)
            .reduce((obj, key) => {
                dataInit = { ...dataInit, [formRef.current![key].id]: { value:""  }  }
                return {
                  ...obj,
                  [key]: formRef.current![key]
                };
            }, {});

            Object.entries(filtered).map(([key, element]) =>  {
                element.addEventListener('keyup', (event) => {
                    setDataValue( (dataValue : ValueInput)  =>  {return { ...dataValue, [element.id] : { value: element.value} } } );
                });
            })
            setDataValue(dataInit);
        }
    }, [dataValue])
        return dataValue;


}