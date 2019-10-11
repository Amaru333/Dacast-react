import styled, { css } from 'styled-components';
import { ElementMenuProps, MainMenuProps } from './NavigationTypes'
import { Button } from '../../components/FormsComponents/Button/Button';
import { Text } from '../../components/Typography/Text';

export const ContainerElementStyle = styled.div<ElementMenuProps>`
    display: flex;
    flex-direction: row;
    padding: 8px 23px;
    height:40px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
        background: ${props => props.theme.colors["gray-10"]};
        span {
            font-weight: 500;
        }
    }
    ${props => props.active && css`
        background: ${props => props.theme.colors["violet20"]} !important;
        color: ${props => props.theme.colors["dark-violet"]};
        border-left: 4px solid ${props => props.theme.colors["dark-violet"]};
        span{
            color: ${props => props.theme.colors["dark-violet"]};
            font-weight: 500;
        }
    `}
`;
​
export const IconStyle = styled.div`
    display: flex;
    flex-direction: row;
    margin-right: 19px;
    color: ${props => props.theme.colors["gray-1"]};
`;
​
export const SectionTitle = styled(Text)`
    margin-left:16px;
    margin-bottom: 16px;
    display: inline-block;
`;
​
export const SectionStyle = styled.div`
`;
​
export const ContainerStyle = styled.div<MainMenuProps>`
    display: flex;
    flex-direction: column;
    height:100%;
    position: fixed;
    width: 235px;
    background: ${props => props.theme.colors["white"]};
    border-right: 1px solid ${props => props.theme.colors["gray-7"]};
    overflow-y: scroll;
`;
​
export const ImageStyle = styled.img`
    max-width: 100%;
    margin-bottom: 22px;
    margin-top: 22px;
    width:80%;
`
​
export const BreakStyle = styled.hr`
    height: 1px;
    width: 100%;
    background-color: ${props => props.theme.colors["gray-7"]};
    border: 0;
    margin-bottom: 15px;
    margin-top:0;
`
export const ButtonMenuStyle = styled(Button)`
    width: 90%;
    margin-bottom: 15px;
`