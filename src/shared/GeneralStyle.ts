import styled from 'styled-components';
import { Text } from '../components/Typography/Text'

export const Divider = styled.div`
    border-bottom: 1px solid ${props => props.theme.colors["gray-7"]};
    margin: 32px 24px 24px 0;
`

export const LinkBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    height:auto;
    padding-top: 16px;
    padding-right: 16px;
`

export const LinkBoxLabel = styled.label`
    display: flex;
    height:auto;
    margin-bottom: 4px;
    margin-top:4px;
    align-items: center;
`

export const LinkBox = styled.div`
display: flex;
height: 40px;
padding: 0 12px;
background-color: ${props => props.theme.colors["gray-10"]};
border: 1px solid ${props => props.theme.colors["gray-7"]};
align-items: center;
justify-content: space-between;
&:hover > button{
        display: block;
    }
`

export const LinkText = styled(Text)`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const IconButton = styled.button`
display: none;
border: none;
background-color: inherit;
`

export const ImagesContainer = styled.div`
flex-direction: row;
flex-wrap: wrap;
`

export const ImageContainer = styled.div`
    
`

export const ImageArea = styled.div`
width: 359px;
height: 176px;
border: 1px dashed ${props => props.theme.colors["gray-7"]};
display: flex;
`

export const ImageSection = styled.div`
width: 80%;
display: flex;
justify-content: center;
align-items: center;
`

export const ButtonSection = styled.div`
width: 20%;
`

export const SelectedImage = styled.img`
max-height: 107px;
max-width: 172px;
`

export const ButtonContainer = styled.div`
margin-top: 24px;
` 