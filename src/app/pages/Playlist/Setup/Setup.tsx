import React from 'react';
import { FolderTreeNode, FolderAsset } from '../../../redux-flow/store/Folders/types';
import { PlaylistSettings } from './SetupModals';
import { SetupComponentProps } from '../../../containers/Playlists/Setup';
import { rootNode } from '../../../utils/folderService';
import { PreviewModal } from '../../../shared/Common/PreviewModal';
import { userToken } from '../../../utils/token';
import { ContentSetupObject, Content } from '../../../redux-flow/store/Content/Setup/types';
import { handleRowIconType, removePrefix } from '../../../utils/utils';
import { ContentSelector } from '../../../../components/ContentSelector/ContentSelector';


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
    


    const [playlistSettingsOpen, setPlaylistSettingsOpen] = React.useState<boolean>(false);

    const [maxNumberItems, setMaxNumberItems] = React.useState<number>(NaN);
    
    const [saveLoading, setSaveLoading] = React.useState<boolean>(false)
    const [previewModalOpen, setPreviewModalOpen] = React.useState<boolean>(false)

    const handleSave = (items: any, selectedTab, selectedFolderId, sortSettings) => {
        console.log(items)
        setSaveLoading(true);
        let newContent = items.map((item: FolderAsset): Content => {
            return {
                'content-type': item.type === 'channel' ? 'live' : 'vod',
                title: item.title,
                thumbnailURL: item.thumbnail,
                'vod-id': item.type === 'vod'? removePrefix(item.objectID) : null ,
                'live-channel-id': item.type === 'channel'? removePrefix(item.objectID): null ,
            }
        })
        let newData: ContentSetupObject = {...props.contentData};
        newData.contentList = newContent;
        newData.folderId = selectedFolderId;
        newData.maxItems = maxNumberItems;
        newData.playlistType = selectedTab;
        newData.sortType = sortSettings.value !== 'none' ? sortSettings.value : 'custom'
        props.saveContentSetup(newData, props.contentData.id, props.contentType)
        .then(() => setSaveLoading(false))
        .catch(() => setSaveLoading(false))
    }

    return (
        <>
            <PlaylistSettings open={playlistSettingsOpen} toggle={setPlaylistSettingsOpen} callBackSuccess={(data: number) => { setMaxNumberItems(data); setPlaylistSettingsOpen(false)} }/>
            <ContentSelector 
                showSort={true}
                loading={saveLoading}
                playlist={ { setPreviewModalOpen: setPreviewModalOpen, setPlaylistSettingsOpen: setPlaylistSettingsOpen } }
                folderId={props.contentData.folderId ? props.contentData.folderId : null} 
                folderData={props.folderData}
                type={props.contentData.playlistType} 
                selectedItems={formateData} 
                getFolderContent={props.getFolderContent} 
                title={props.contentData.title} callback={handleSave} />
            {
                previewModalOpen && <PreviewModal contentId={userId + '-playlist-' + props.contentData.id} toggle={setPreviewModalOpen} isOpened={previewModalOpen} />
            }
        </>
    )

    
}