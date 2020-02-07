import styled from 'styled-components';
import { Icon } from '@material-ui/core';
import { ColorsApp } from '../../styled/types';

export const FoldersTreeSection = styled.div`
    display: flex;
    flex-direction: column;
`

export const FolderLink = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
export const FolderElements = styled.div`
    display: flex;
    width: 100%;
`

export const SubfolderElements = styled.div`
    display: flex;
    width: 100%;
`

export const HeadingSection = styled.div`

`

export const ContentSection = styled.div`
    display: flex;
    width: 100%;
`

export const IconStyle = styled(Icon)<{coloricon: ColorsApp}>`
    color: ${props => props.theme.colors[props.coloricon]};
`