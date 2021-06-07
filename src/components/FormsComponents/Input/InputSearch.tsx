import * as React from "react";
import { IconStyle } from "../../../shared/Common/Icon";
import { InputSearchStyle } from "./InputStyle";

export const InputSearch =  (props: {placeholder?: string, callback: (value: string) => void, isSearching?: boolean, value?: string} & React.HTMLAttributes<HTMLInputElement> ) => {
    
    let {className, placeholder, callback, isSearching, ...other} = props;
    const [value, setValue] = React.useState(props.value)

    const checkEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.which === 13) {
            props.callback(value)
       }
    }
    return (
        <div {...other} className={"flex items-center relative " + props.className} >
            <InputSearchStyle onKeyPress={(e) => checkEnterPress(e)} value={value} onChange={event => setValue(event.target.value)} className="flex-auto"  placeholder={props.placeholder} />
            {
                props.isSearching ? 
                <IconStyle onClick={() => { setValue(''); props.callback('') } } style={{color: "#58606e", right: 12}} fontSize="small" className="absolute pointer">close</IconStyle>
                :
                <IconStyle onClick={() => props.callback(value)} style={{color: "#58606e", right: 12}} fontSize="small" className="absolute pointer">search</IconStyle>
                
            }
        </div>
    );

}

InputSearch.defaultProps = { isError: false, disabled: false, required: false }
