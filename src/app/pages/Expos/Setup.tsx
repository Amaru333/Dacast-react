import React from 'react';
import { FolderAsset } from '../../redux-flow/store/Folders/types';
import { SetupComponentProps } from '../../containers/Playlists/Setup';
import { ContentSelector } from '../../../components/ContentSelector/ContentSelector';
import { userToken } from '../../utils/services/token/tokenService';
import { Content, ContentSetupObject } from '../../redux-flow/store/Content/Setup/types';
import { removePrefix } from '../../utils/utils';
import { segmentService } from '../../utils/services/segment/segmentService';


export const SetupPage = (props: SetupComponentProps & {contentId: string; contentType: string}) => {

    const userId = userToken.getUserInfoItem('custom:dacast_user_id')

    const formateData: FolderAsset[] = props.contentData.contentList ? props.contentData.contentList.map(item =>{
        return {
            ownerID: "",
            objectID: item['id'],
            title: item.title,
            thumbnail: item.thumbnailUrl,
            type: item.contentType,
            createdAt: 0,
            duration: '',
            featuresList: {},
            status: 'online'
        }
    }) : [];
    
    const [saveLoading, setSaveLoading] = React.useState<boolean>(false)

    const handleSave = (items: any, selectedTab: string, selectedFolderId: string, sortSettings: Object) => {
        setSaveLoading(true);
        let newContent = items.map((item: FolderAsset): Content => {
            return {
                'contentType': (item.type === 'channel'|| item.type === 'live') ? 'live' : 'vod',
                contentId: removePrefix(item.objectID)
            }
        })
        let newData: ContentSetupObject = {...props.contentData};
        newData.contentList = newContent;
        newData.folderId = selectedFolderId ? selectedFolderId : undefined ;
        newData.expoType = selectedTab ;
        newData.sortType = sortSettings.value !== 'none' ? sortSettings.value : 'custom';
        newData.id = undefined;
        props.saveContentSetup(newData, props.contentId, props.contentType)
        .then(() => {
            setSaveLoading(false)
            segmentService.track('Expo Created', {
                action: 'Setup Expo',
                expoId: props.contentId, 
                step: 2,
            })  
        })
        .catch(() => setSaveLoading(false))
    }



    return (
        <>
            <ContentSelector 
                showSort={true}
                loading={saveLoading}
                showFolders={true}
                folderId={props.contentData.folderId ? props.contentData.folderId : null} 
                folderData={props.folderData}
                type={props.contentData.expoType ? props.contentData.expoType.replace('-list', '') : "content"} 
                selectedItems={formateData} 
                getFolderContent={props.getFolderContent} 
                title={props.contentData.title} callback={handleSave} />
        </>
    )

    
}