import React from 'react';
import { IconStyle } from '../../../shared/Common/Icon';
import styled from 'styled-components';
import { Text } from '../../../components/Typography/Text';
import { FolderAsset } from '../../redux-flow/store/Folders/types';

export var ThirdLgHalfXmFullXs = "col col-12 sm-col-6 lg-col-4 px1 mb2";
export var HalfSmFullXs = "col col-12 sm-col-6 px1 mb2";


export const FailedCardAnalytics = (props: React.HTMLAttributes<HTMLDivElement>) => {
    if (props.hidden) {
        return <></>
    }

    return (
        <div className="col col-12 flex flex-column items-center">
            <IconStyle className="mt2" coloricon="red" fontSize='large' >warning</IconStyle>
            <Text size={16} weight="med" >Something went wrong</Text>
            <Text size={16} weight="reg" >We are unable to display this report.</Text>
        </div>
    )
}

export const AnalyticsContainerHalfSelector = styled.div<{}>`
    background-color: white;
    border: 1px solid ${props => props.theme.colors["gray-7"]};;
    height: 256px; 
    overflow-x: auto;
`

export const BreadcrumbContainer = styled.div`
min-height: 52px;
`

export const handleRowIconType = (item: FolderAsset) => {
    switch (item.type) {
        case 'playlist':
            return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.id}>playlist_play</IconStyle>
        case 'folder':
            return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.id}>folder_open</IconStyle>
        case 'live':
        case 'vod':
        case 'channel':
            return item.thumbnail ? <img key={"thumbnail" + item.id} width="auto" height={42} src={item.thumbnail} ></img>
                : <div className='mr1 relative justify-center flex items-center' style={{ width: 94, height: 54, backgroundColor: '#AFBACC' }}>
                        <IconStyle className='' coloricon='gray-1' >play_circle_outlined</IconStyle>
                    </div>
        default:
            return;
    }
}