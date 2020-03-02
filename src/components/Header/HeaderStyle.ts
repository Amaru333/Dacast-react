import styled from 'styled-components';

export const HeaderStyle = styled.div`
    border-bottom: 1px solid #D1DBE8;
    background-color: ${props => props.theme.colors["white"]};
    width: inherit;
    position: fixed;
    transition: none;
    z-index:999;
    height: 57px;
    align-items: center;
    display: flex;
    justify-content: flex-end;
`
export const IconContainerStyle = styled.div`
    display: flex;
    background-color: ${props => props.theme.colors["white"]};
    height: 56px;
    width: 100px;
    align-items: center;
    justify-content: center;
`
export const HeaderIconStyle = styled.div`
    top: 50%;
    padding: 8px;
    color: ${props => props.theme.colors["gray-1"]};
    cursor: pointer;
`

export const VerticalDivider = styled.div`
    border-left: 1px solid ${props => props.theme.colors["gray-7"]};
    margin: 4px 16px 4px 0;
    height: 80%;
`