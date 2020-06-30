import styled from 'styled-components';
import { Text } from '../../../components/Typography/Text'
import { Input } from '../../../components/FormsComponents/Input/Input';

export const ClassHalfXsFullMd = "col lg-col-6 md-col-6 sm-col-12 col-12 xs-no-gutter ";

export const Divider = styled.div`
    border-bottom: 1px solid ${props => props.theme.colors["gray-7"]};
    margin: 32px 24px 24px 0;
`

export const LinkBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    height:auto;
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

export const ImagesContainer = styled.div`
flex-direction: row;
flex-wrap: wrap;
display: flex;
`

export const ImageContainer = styled.div`
    flex-grow: 1;  
`

export const ImageArea = styled.div`
height: 176px;
border: 1px dashed ${props => props.theme.colors["gray-7"]};
display: flex;
flex-direction: column;  
padding-bottom: 41px;
box-sizing: 'border-box';
`

export const ImageSection = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
`

export const ButtonSection = styled.div`
width: 100%;
`

export const SelectedImage = styled.img`
height: 90px;
width: 160px;
`

export const ButtonContainer = styled.div`
margin-top: 24px;
` 

export const AdvancedLinksContainer = styled.div<{ isExpanded: boolean }>`
   display: ${props => props.isExpanded ? "block" : "none"};
   `

export const DescriptionInput = styled(Input)`
    height: 96px;
`