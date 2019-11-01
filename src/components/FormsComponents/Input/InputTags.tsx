import * as React from "react";
import { ContainerStyle, LabelStyle, RelativeContainer, InputStyle, IconStyle, HelpStyle, TagsContainer } from './InputStyle';
import { Text } from '../../Typography/Text';
import { InputProps } from './InputTypes';
import Icon from '@material-ui/core/Icon';

export const InputTags = (props: InputProps) => {

    const [tags, setTags] = React.useState<string[]>([])
    const inputRef = React.useRef<HTMLInputElement>(null);
    const inputKeyDown = (e: any) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
           setTags([...tags, val]);
           inputRef.current.value = "";
           console.log(tags)
        }
    }

    var { label, icon, help, isError, className, ...other } = props;

    return (
        <ContainerStyle className={className} >
            {label ? <LabelStyle disabled={props.disabled} > <Text color={props.disabled ? "gray-4" : "gray-1" } size={14} weight="med" > {props.label} </Text> </LabelStyle> : null}
            <RelativeContainer>
                <TagsContainer>
                    <ul>
                        <li>Tag<button>X</button></li>
                    </ul>
                    <InputStyle isError={isError} onKeyDown={inputKeyDown} ref={inputRef } {...other} />
                    {icon ? <IconStyle disabled={props.disabled}><Icon>{icon}</Icon></IconStyle> : null}
                </TagsContainer>
            </RelativeContainer>
            {help ? <HelpStyle>
                <Text color={props.isError ? "red" : props.disabled ? "gray-4" : "gray-3"} size={12} weight="reg"> {help} </Text>
            </HelpStyle> : null}
        </ContainerStyle>
    )
}

InputTags.defaultProps = { isError: false, disabled: false, required: false }