import styled from 'styled-components';
import { Text } from "../Typography/Text"

export const ToggleWrapperStyle = styled.div`
  position: relative;
  margin: 8px;
  margin-bottom: 0px;
`;
export const ToggleLabelStyle = styled.label`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 32px;
  height: 20px;
  border-radius: 15px;
  background: ${props => props.theme.colors['gray-6']};
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    margin: 3px;
    margin-left: 4px;
    background: ${props => props.theme.colors['white']};
    
    transition: 0.2s;
  }
`;

export const LabelTextStyle = styled(Text)`
position: absolute;
display: block;
margin-left: 44px;
width: max-content;
`

export const ToggleStyle = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 32px;
  height: 20px;
  &:checked + ${ToggleLabelStyle} {
    background: ${props => props.theme.colors['violet']};
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 14px;
      height: 14px;
      margin-left: 14px;
      transition: 0.2s;
    }
  }
`;