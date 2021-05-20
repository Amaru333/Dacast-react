import { Icon } from "@material-ui/core";
import * as React from "react";
import { InputSearchStyle } from "./InputStyle";

export const InputSearch =  (props: {placeholder?: string, className?: string, callback: (value: string) => void, isSearching?: boolean, value?: string} ) => {

    const [value, setValue] = React.useState(props.value)

    return (
        <div className={"flex items-center relative " + props.className}>
            <InputSearchStyle value={value} onChange={event => setValue(event.target.value)} className="flex-auto"  placeholder={props.placeholder} />
            {
                props.isSearching ? 
                <Icon onClick={() => { setValue(''); props.callback('') } } style={{color: "#58606e", right: 12}} fontSize="small" className="absolute pointer">close</Icon>
                :
                <Icon onClick={() => props.callback(value)} style={{color: "#58606e", right: 12}} fontSize="small" className="absolute pointer">search</Icon>
                
            }
        </div>
    );

}

InputSearch.defaultProps = { isError: false, disabled: false, required: false }
