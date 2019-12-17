import styled from 'styled-components';

export const HeaderStyle = styled.div`
    border-bottom: 1px solid #D1DBE8;
    background-color: ${props => props.theme.colors["white"]};
    width: inherit;
    position: fixed;
    transition: none;
    z-index:99;
    height: 57px;
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
    padding-right: 24px;
`
export const HeaderIconStyle = styled.div`
    top: 50%;
    padding: 8px;
    color: ${props => props.theme.colors["gray-1"]}
`