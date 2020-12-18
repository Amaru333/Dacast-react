import styled, { css } from 'styled-components';
import { ElementMenuProps, MainMenuProps } from './NavigationTypes'
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Text } from '../../../components/Typography/Text';

export const ContainerElementStyle = styled.div<ElementMenuProps>`
    display: flex;
    flex-direction: row;
    padding: ${props => props.isOpen ? "8px 23px" : "8px 20px"};
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
        background: ${props.theme.colors["violet20"]} !important;
        color: ${props.theme.colors["dark-violet"]};

        ${!props.isOpen && css`
        border-left: 4px solid ${props.theme.colors["dark-violet"]} ;
        `}
        
        span{
            color: ${props.theme.colors["dark-violet"]};
            font-weight: 500;
        }
    `}
`;

export const SectionTitle = styled(Text)`
    margin-left:16px;
    margin-bottom: 16px;
    display: inline-block;
`;
export const SectionStyle = styled.div`
`;
export const ContainerStyle = styled.div<{isOpen: boolean} & MainMenuProps>`
    display: flex;
    flex-direction: column;
    height:100%;
    position: fixed;
    width: ${props => props.isMobile ? "75%" : props.navWidth};
    max-width: 300px;
    box-sizing: border-box;
    background: ${props => props.theme.colors["white"]};
    border-right: 1px solid ${props => props.theme.colors["gray-7"]};
    overflow-y: auto;

    z-index: 9997;
    ${props => props.isMobile && css`
        margin-top: 58px;
        transform: translate( ${props.isOpen ? 0: "-100%"} );
        transition: transform .2s linear ;
    `}
`;
export const ImageStyle = styled.img`
    max-width: 100%;
    margin-bottom: 22px;
    margin-top: 22px;
    width:80%;
`;

export const OverlayMobileStyle = styled.div<{ opened: boolean }>`
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.colors.overlay70};
    ${props => props.opened && css`
        display: block;
    `}
    z-index: 998;
`;

export const BreakStyle = styled.hr`
    height: 1px;
    width: 100%;
    background-color: ${props => props.theme.colors["gray-7"]};
    border: 0;
    margin-bottom: 15px;
    margin-top:0;
`;
export const ButtonMenuStyle = styled(Button)<{ menuOpen: boolean }>`
    width: 90%;
    margin-bottom: 15px;
    margin-left: 11px;
    ${props => !props.menuOpen && css`
        margin-left: 3px;
    `}
`;

export const BurgerStyle = styled.div`
  background: transparent;
  border: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height:100%;
  width:67px;
  margin-right: auto;
  display:flex;
  &:focus {
    outline: none;
  }
`;
export const TextStyle = styled(Text)<{selected: boolean}>`
    ${props => props.selected && css`
        color: ${props.theme.colors['dark-violet']};
        margin-left: -4px;
    `}
`