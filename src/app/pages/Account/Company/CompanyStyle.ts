import styled from 'styled-components';
import { Text } from '../../../../components/Typography/Text'


export const CompanyPageContainer = styled.div<{}>`
    position: relative;
`

export const ButtonStyle = styled.div<{}>`
    margin: 0.5rem auto;
    width: fit-content;
`

export const ImageStyle = styled.img<{}>`
    position: relative;
    max-width: 204px;
    max-height: 176px;
    padding: 16px;
    display: flex;
    margin: 0 auto;
`

export const TextStyle = styled.span<{}>`
    display: block;
`

export const LinkStyle = styled.span<{}>`
    &:hover{
        cursor:pointer;
    }
`

export const ButtonsArea = styled.div<{}>`

`

export const AccountIdLabel = styled.label`
    display: flex;
    height:auto;
    margin: 0 0 4px 8px;
    align-items: center;
`

export const AccountIdContainer = styled.div`
display: flex;
margin: 0 8px 8px; 
height: 40px;
background-color: ${props => props.theme.colors["gray-10"]};
border: 1px solid ${props => props.theme.colors["gray-7"]};
/* align-items: center; */
justify-content: space-between;
&:hover > button{
        display: block;
    }
`

export const AccountIdText = styled(Text)`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`