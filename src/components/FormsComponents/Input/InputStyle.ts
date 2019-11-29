import styled, { css } from "styled-components";
import { InputProps, SliderContainerProps } from './InputTypes';
import { Text } from "../../Typography/Text"

export const ContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    height:auto;
`;

export const HelpStyle = styled.div`
    margin-top: 8px;
`;

export const RelativeContainer = styled(ContainerStyle)`
    position: relative;
`;

export const IconStyle = styled.div<{disabled: boolean}>`
    position: absolute;
    right: 12px;
    top: 8px;    
    color: ${props => props.disabled ? props.theme.colors["gray-6"] : props.theme.colors["gray-3"]};
`;

export const LabelStyle = styled.label<{disabled: boolean}>`
    display: flex;
    height:auto;
    margin-bottom: 4px;
    margin-top:4px;
    align-items: center;
`;

export const IndicationLabelStyle = styled.label<{}>`
    padding-left: 4px;
    padding-bottom: 4px;
`

export const AddonStyle = styled.div<{suffix: boolean}>`
    background: ${props => props.theme.colors["gray-8"]};
    border: 1px solid ${props => props.theme.colors["gray-7"]} ;
    ${props => props.suffix && css`
        border-left: none;
    `}
    ${props => !props.suffix && css`
        border-right: none;
    `}
    height:40px;
    display: flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    width:auto; 
    box-sizing: border-box;
`

export const InputStyle = styled.input<InputProps>`
    display: flex;
    border: 1px solid ${props => props.theme.colors["gray-7"]} ;
    background: ${props => props.theme.colors["gray-10"]};
    box-sizing: border-box;
    padding: 8px 12px;
    flex-grow: 1;
    height:40px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: ${props => props.theme.colors["gray-1"]};
    ${props => props.isError && css`
        border-bottom: 2px solid ${props => props.theme.colors["red"]};
        background: ${props => props.theme.colors["red10"]};
    `}
    ${props => props.disabled && css`
        background: ${props => props.theme.colors["gray-8"]};
    `}
    ::placeholder{
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        color: ${props => props.theme.colors["gray-5"]};
        ${props => props.disabled && css`
            color: ${props => props.theme.colors["gray-6"]} ;
        `}
    }
    &:focus {
        border: 1px solid ${props => props.theme.colors["violet"]} ;
        ${props => props.isError && css`
            border-bottom: 2px solid ${props => props.theme.colors["red"]};
        `}
    }
`;

export const InputCheckboxStyle = styled.input`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

export const CheckBoxStyle = styled.div<{defaultChecked: boolean | undefined; disabled: boolean | undefined; isFocus: boolean; indeterminate: boolean | undefined; checkbox: React.RefObject<HTMLInputElement>}>`
    display: flex;
    border: 1px solid ${props => props.theme.colors["gray-7"]} ;
    background-color: ${props => props.theme.colors["gray-10"]};
    box-sizing: border-box;
    border-radius: 2px;
    height:16px;
    width: 16px;
    cursor: pointer;
    margin-right: 8px;
    ${props => (
                ((!props.checkbox.current && props.defaultChecked) 
                    || 
                (props.checkbox.current && (props.checkbox.current.checked) )))  && css`
        &:after{
            font-family: Material Icons;
            content: "check";
            color: ${props => props.theme.colors["white"]};
        }
        border: none;
        background: ${props => props.theme.colors["violet"]};
    `}
    ${props => (props.indeterminate) && css`
        &:after{
            font-family: Material Icons;
            content: "remove";
            color: ${props => props.theme.colors["white"]};
        }
        border: none;
        background: ${props => props.theme.colors["violet"]};
    `}
    ${props => ((props.disabled) || (props.checkbox.current && props.checkbox.current.disabled)) && css`
        opacity: 0.5;
        cursor: auto;
    `}
    ${props => props.isFocus && css`
        outline: rgb(59, 153, 252) auto 5px;
    `}
`
export const RadioLabelStyle = styled.label``

export const InputRadioStyle = styled.input<{checked: boolean | undefined; disabled: boolean | undefined}>`
  position: absolute;
  top: auto;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  width: 1px;
  height: 1px;
  white-space: nowrap;

    & + ${RadioLabelStyle} {
        
        &::before {
            content: '';
            cursor: pointer;
            border: 1px solid ${props => props.theme.colors["gray-7"]} ;
            background-color: ${props => props.theme.colors["gray-10"]};
            display: block;
            box-sizing: border-box;
            float: left;
            width: 16px;
            height: 16px;
            margin-top: 4px;
            border-radius: 100%;
            text-align: center;
            transition: all .1s ease-out;
        }  

        ${props => (props.disabled) && css `
             cursor: auto;
            opacity: 0.5;
        `}
    }

    &:checked + ${RadioLabelStyle} {
        &::before {
            border: 1px solid ${props => props.theme.colors["violet"]} ;
            background-color: ${props => props.theme.colors["violet"]};
            box-shadow: inset 0 0 0 .15em ${props => props.theme.colors["white"]};
        }
    }

    &:focus + ${RadioLabelStyle} {
        &::before {
            box-shadow: 0 0 0 3px ${props => props.theme.colors["blue60"]}, inset 0 0 0 .15em ${props => props.theme.colors["white"]
}
        }
    }
`
export const RadioTextStyle = styled(Text)`
    position: relative;
    display: inline-block;
    margin-left: 8px;
    vertical-align: middle;
`
export const SliderContainerStyle = styled.div<SliderContainerProps>`
    position: relative;
    & .MuiSlider-rail {
        color: ${props => props.theme.colors["violet40"]};
        opacity: 1;
    }
    & .MuiSlider-thumb, .MuiSlider-track{
        background-color: ${props => props.theme.colors["dark-violet"]};
        transition: none;
    }
`
export const TagsContainer = styled.div`
    border: 1px solid ${props => props.theme.colors["gray-7"]} ;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 352px;
    min-height: 40px;
    background-color: ${props => props.theme.colors["gray-10"]};
`

export const TagsInputStyle = styled(InputStyle)`
    border: none;
    background-color: white;
    width: 100%;
    padding-left: 6px;
    height: 20px;
    background-color: ${props => props.theme.colors["gray-10"]};
    &:focus {
        border: none;
    }
`
export const TagListStyle = styled.ul`
    padding: 0;
    list-style: none;
    margin: 0;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
`

export const TagStyle = styled.li`
    background-color: ${props => props.theme.colors["violet20"]};
    height: 20px;
    border-radius: 4px;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    margin: 4px;
    max-width: 335px;
`

export const TagTextStyle = styled.p`
    max-width: 298px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 2px 8px;
    line-height: 16px;
    white-space: nowrap;
`

export const TagButtonStyle = styled.button`
    border: none;
    background-color: ${props => props.theme.colors["violet20"]};
`

export const TagsWrapper = styled.div`
    margin: 4px;
`
export const TagsTooltipStyle = styled.p`
    word-wrap: break-word;
    margin: 0;
    transition: none;
`
