import * as React from "react";
import { ContainerStyle, LabelStyle, IconStyle, HelpStyle, TagsContainer, TagsInputStyle, TagListStyle, TagStyle, TagTextStyle, TagButtonStyle, TagsWrapper, TagsTooltipStyle } from './InputStyle';
import { Text } from '../../Typography/Text';
import { InputProps } from './InputTypes';
import Icon from '@material-ui/core/Icon';
import { Tooltip } from '../../Tooltip/Tooltip';

export const InputTags = (props: InputProps) => {

    const [tags, setTags] = React.useState<string[]>([])
    const inputRef = React.useRef<HTMLInputElement>(null);

    const removeTag = (i: any) => {
        const newTags = [ ...tags ];
        newTags.splice(i, 1);
        setTags(newTags);
      }

    const inputKeyDown = (e: any) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                inputRef.current.value = "";
                return;
                //maybe add duplicate tag message?
              }
           setTags([...tags, val]);
           inputRef.current.value = "";
        } else if (e.key === 'Backspace' && !val) {
            removeTag(tags.length - 1);
          }
    }

    

    var { label, icon, help, isError, className, ...other } = props;

    return (
        <ContainerStyle className={className} >
            {label ? <LabelStyle disabled={props.disabled} > <Text color={props.disabled ? "gray-4" : "gray-1" } size={14} weight="med" > {props.label} </Text> </LabelStyle> : null}
                <TagsContainer>
                    <TagsWrapper>
                    <TagListStyle>
                    { tags.map((tag, i) => (
                        <TagStyle id={tag} key={tag}>
                            <Text size={14} weight="reg">
                                <TagTextStyle>{tag}</TagTextStyle>
                            
                            </Text>
                            <Tooltip target={tag}>
                            <TagsTooltipStyle>{tag}</TagsTooltipStyle>
                            </Tooltip>
                            
                            <TagButtonStyle 
                                onClick={() => removeTag(i)} type="button">X
                            </TagButtonStyle>
                        </TagStyle>
                    ))}
                    <li>
                    <TagsInputStyle isError={isError} onKeyDown={inputKeyDown} ref={inputRef } {...other} />
                    </li>
                    </TagListStyle>
                    </TagsWrapper>
                    {icon ? <IconStyle disabled={props.disabled}><Icon>{icon}</Icon></IconStyle> : null}
                </TagsContainer>
            {help ? <HelpStyle>
                <Text color={props.isError ? "red" : props.disabled ? "gray-4" : "gray-3"} size={12} weight="reg"> {help} </Text>
            </HelpStyle> : null}
        </ContainerStyle>
    )
}

InputTags.defaultProps = { isError: false, disabled: false, required: false }