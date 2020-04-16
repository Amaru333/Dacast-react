import * as React from "react";
import { ContainerStyle, LabelStyle, IconStyle, HelpStyle, TagsContainer, TagsInputStyle, TagListStyle, TagStyle, TagTextStyle, TagButtonStyle, TagsWrapper, TagsTooltipStyle } from './InputStyle';
import { Text } from '../../Typography/Text';
import { TagProps } from './InputTypes';
import Icon from '@material-ui/core/Icon';
import { Tooltip } from '../../Tooltip/Tooltip';

export const InputTags = (props: TagProps) => {

    const [tags, setTags] = React.useState<string[]>([])
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        setTags(props.defaultTags)
    }, [props.defaultTags])

    const removeTag = (i: number) => {
        const newTags = [ ...tags ];
        newTags.splice(i, 1);
        setTags(newTags);
        if(props.callback) {
            props.callback(newTags)
        }

    }

    const inputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value;

        if (e.key === 'Enter' && val) {
            e.preventDefault();
            if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {

                inputRef.current.value = "";
                return;
            }
            setTags([...tags, val]);
            if(props.callback) {
                props.callback([...tags, val])
            }
            inputRef.current.value = "";
        } else if (e.key === 'Backspace' && !val) {
            removeTag(tags.length - 1);
        }
    }

    

    var { label, icon, help, isError, className, noBorder, style, ...other } = props;

    return (
        <ContainerStyle style={style} className={className} >
            {label ? <LabelStyle disabled={props.disabled ? true : false} > <Text color="gray-1" size={14} weight="med" > {props.label} </Text> </LabelStyle> : null}
            <TagsContainer noBorder={noBorder}>
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
                                {
                                    !props.disabled ?
                                        <TagButtonStyle 
                                            onClick={() => removeTag(i)} type="button">X
                                        </TagButtonStyle>
                                        : null
                                }

                            </TagStyle>
                        ))}
                        {
                            props.oneTag && tags.length === 1 ?
                                null
                                :
                                <li>
                                    <TagsInputStyle isError={isError} onKeyDown={inputKeyDown} ref={inputRef } {...other} />
                                </li>
                        }

                    </TagListStyle>
                </TagsWrapper>
                {icon ? <IconStyle disabled={props.disabled ? true : false}>
                    <Icon>{icon}</Icon>
                </IconStyle> : null}
            </TagsContainer>
            {help ? <HelpStyle>
                <Text color={props.isError ? "red" : props.disabled ? "gray-4" : "gray-3"} size={12} weight="reg"> {help} </Text>
            </HelpStyle> : null}
        </ContainerStyle>
    )
}

InputTags.defaultProps = { isError: false, disabled: false, required: false, defaultTags: [], noBorder: false }