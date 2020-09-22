import React from 'react';
import { FolderAsset } from '../../redux-flow/store/Folders/types';
import { SetupComponentProps } from '../../containers/Playlists/Setup';
import { userToken } from '../../utils/token';
import { ContentSelector } from '../../../components/ContentSelector/ContentSelector';


export const SetupPage = (props: SetupComponentProps & {contentId: string; contentType: string}) => {

    const userId = userToken.getUserInfoItem('custom:dacast_user_id')

    const formateData: FolderAsset[] = props.contentData.contentList ? props.contentData.contentList.map(item =>{
        return {
            ownerID: "",
            objectID: item['live-channel-id'] ? item['live-channel-id'] : item['vod-id'],
            title: item.title,
            thumbnail: item.thumbnailURL,
            type: item["content-type"],
            createdAt: 0,
            duration: '',
            featuresList: {},
            status: 'online'
        }
    }) : [];
    



    
    const [saveLoading, setSaveLoading] = React.useState<boolean>(false)

    const handleSave = (items: any) => {
        console.log(items)
    }

    return (
        <>
            <ContentSelector 
                showSort={true}
                loading={saveLoading}
                folderId={props.contentData.folderId ? props.contentData.folderId : null} 
                folderData={props.folderData}
                type={'content'} 
                selectedItems={formateData} 
                getFolderContent={props.getFolderContent} 
                title={props.contentData.title} callback={handleSave} />
        </>
    )

    
}