import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';


export const CompanyPageContainer = styled.div<{}>`
    position: relative;
`

export const ButtonStyle = styled.div<{}>`
    margin: 0.5rem auto;
    width: fit-content;
`

export const BorderStyle = styled.div<{}>`
    border-bottom: 1px solid ${props => props.theme.colors['gray-7']};
    display: flex;
`
export const IconStyle = styled.div<{}>`
    display: block;
    color: ${props => props.theme.colors['dark-violet']};
    width: fit-content;
    margin: auto;
    padding-top: 32px;
`

export const BigIcon = styled(Icon)`
    font-size: 40px !important;
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