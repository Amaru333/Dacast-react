import styled from 'styled-components';

export const HeaderStyle = styled.div`
    border-bottom: 1px solid #D1DBE8;
    height: 56px;
    background-color: ${props => props.theme.colors["white"]};
    width: 100%;
`
export const IconContainerStyle = styled.div`
    display: flex;
    float: right;
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