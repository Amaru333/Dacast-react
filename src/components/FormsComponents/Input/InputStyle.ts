import styled, { css } from "styled-components";
import { InputProps, SliderContainerProps } from './InputTypes';
import { Text } from "../../Typography/Text"
import { InputSearch } from "./InputSearch";

export const ContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    height:auto;
`;

export const HelpStyle = styled.div`
    margin-top: 8px;
`;

export const RelativeContainer = styled.div`
    position: relative;
    display: -webkit-box;
    display: -moz-box;
`;

export const IconStyle = styled.div<{disabled: boolean}>`
    position: absolute;
    right: 12px;
    top: 8px;
    color: ${props => props.disabled ? props.theme.colors["gray-6"] : props.theme.colors["gray-3"]};
`;

export const LabelStyle = styled.label<{disabled: boolean; tooltip?: string}>`
    display: flex;
    height:auto;
    margin-bottom: 4px;
    margin-top:4px;
    align-items: center;
    ${props => props.tooltip && css`
        justify-content: space-between;
    `}
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

export const TextAreaStyle = styled.textarea<InputProps>`
      display: flex;
    border: 1px solid ${props => props.theme.colors["gray-7"]} ;
    background: ${props => props.theme.colors["gray-10"]};
    box-sizing: border-box;
    padding: 8px 12px;
    flex-grow: 1;
    height:90px;
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
`

export const InputStyle = styled.input<InputProps>`
    display: flex;
    border: 1px solid ${props => props.theme.colors["gray-7"]} ;
    background: ${props => props.backgroundColor ? props.backgroundColor : props.theme.colors["gray-10"]};
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
        color: ${props => props.theme.colors["gray-5"]};
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
    ${props => ((props.defaultChecked !== false) &&
                ((!props.checkbox.current && props.defaultChecked)
                    ||
                (props.checkbox.current && (props.checkbox.current.checked || props.defaultChecked) )))  && css`
        border: none;
        background: ${props.theme.colors["violet"]};
        &:after{
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' fill='white'/%3E%3C/svg%3E%0A");
            content: '';
            display: block;
            width: 100%;
            height: 100%;
        }
    `}
    ${props => (props.indeterminate) && css`
        border: none;
        background: ${props.theme.colors["violet"]};
        &:after{
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M19 13H5v-2h14v2z' fill='white'/%3E%3C/svg%3E%0A");
            content: '';
            display: block;
            width: 100%;
            height: 100%;
        }
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
export const TagsContainer = styled.div<{noBorder: boolean; greyBackground: boolean}>`
    border: ${props => props.noBorder ? "none" : "1px solid "+ props.theme.colors["gray-7"] };  ;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    min-height: 40px;
    ${props => props.greyBackground && css`
        background-color: ${props.theme.colors["gray-10"]};
    `}
    background-color: ${props => props.theme.colors['gray-10']};
`

export const TagsInputStyle = styled(InputStyle)`
    border: none;
    width: 100%;
    padding-left: 12px;
    padding-top: 0px;
    padding-bottom: 0px;
    height: 20px;
    background-color: inherit;
    &:focus {
        border: none;
    }
`

export const InputSearchStyle = styled.input<{}>`
    background: white;
    border-radius: 4px;
    height:24px;
    padding: 8px 38px 8px 8px;
    border: 0;
    ::placeholder {
        color: ${props => props.theme.colors["gray-5"]};
        font-size: 14px;
    }
`

export const TagListStyle = styled.ul`
    padding: 0;
    list-style: none;
    margin: 0;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
`

export const TagStyle = styled.li`
    background-color: ${props => props.theme.colors["violet20"]};
    height: 20px;
    border-radius: 4px;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    margin: 4px;
    max-width: 90%;
`

export const TagTextContainer = styled(Text)<{disabled: boolean}>`
    max-width: ${props => !props.disabled && "90%"}
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
    width: 100%;
`
export const TagsTooltipStyle = styled.p`
    word-wrap: break-word;
    margin: 0;
    transition: none;
`
