import React from 'react';
import {LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, getFolderContentAction } from '../../redux-flow/store/Folders/actions';
import { FolderAsset, FoldersInfos, SearchResult } from '../../redux-flow/store/Folders/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { useParams } from 'react-router-dom';
import { PlaylistsTabs } from './PlaylistTabs';
import { getContentSetupAction, postContentSetupAction } from '../../redux-flow/store/Content/Setup/actions';
import { ContentSetupState, ContentSetupObject, Content, ContentSelectorType } from '../../redux-flow/store/Content/Setup/types';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';
import { ContentType } from '../../redux-flow/store/Common/types';
import { segmentService } from '../../utils/services/segment/segmentService';
import { userToken } from '../../utils/services/token/tokenService';
import { removePrefix } from '../../utils/utils';
import { ContentSelector, SortSettingsContentSelector } from '../../../components/ContentSelector/ContentSelector';
import { PlaylistSettings } from '../../pages/Playlist/Setup/SetupModals';
import { PreviewModal } from '../../shared/Common/PreviewModal';

export interface SetupComponentProps {
    folderData: FoldersInfos;
    contentDataState: ContentSetupState;
    getContentSetup: (contentId: string, contentType: ContentType) => Promise<void>;
    getFolderContent: (folderPath: string) => Promise<void>;
    saveContentSetup: (data: ContentSetupObject, contentType: ContentType) => Promise<void>;
}

const Setup = (props: SetupComponentProps) => {

    let { playlistId } = useParams<{playlistId: string}>()
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)
    const [playlistSettingsOpen, setPlaylistSettingsOpen] = React.useState<boolean>(false);
    const [maxNumberItems, setMaxNumberItems] = React.useState<number>(NaN);
    const [saveLoading, setSaveLoading] = React.useState<boolean>(false)
    const [previewModalOpen, setPreviewModalOpen] = React.useState<boolean>(false)
    const userId = userToken.getUserInfoItem('user-id')

    React.useEffect(() => {
        props.getContentSetup(playlistId, 'playlist')
        .catch(() => setNodataFetched(true))

        if(!props.folderData) {

            const wait = async () => {

                await props.getFolderContent('/')
            }
            wait()
        }
    }, [])

    React.useEffect(() => {
        setSelectedItems(initFormateData())
    }, [props.contentDataState])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    const initFormateData = ():FolderAsset[] => {
        return props.contentDataState['playlist'] && props.contentDataState['playlist'][playlistId] && props.contentDataState['playlist'][playlistId].contentList ? props.contentDataState['playlist'][playlistId].contentList.map(item => {
            return {
                ownerID: "",
                objectID: item.id,
                title: item.title,
                thumbnail: item.thumbnailURL,
                type: item.contentType,
                createdAt: item.createdAt,
                duration: '',
                featuresList: {},
                status: 'Online'
            }
        }) : []
    }

    const [selectedItems, setSelectedItems] = React.useState<FolderAsset[]>(initFormateData())

    const handleSave = (items: FolderAsset[], selectedTab: ContentSelectorType, selectedFolderId: string, sortSettings: SortSettingsContentSelector) => {
        setSaveLoading(true);
        let newContent = items.map((item: FolderAsset): Content => {
            return {
                contentType: item.type as 'live' | 'vod',
                title: item.title,
                thumbnailURL: item.thumbnail,
                id: removePrefix(item.objectID),
                createdAt: item.createdAt
            }
        })
        let newData: ContentSetupObject = { ...props.contentDataState['playlist'][playlistId] };
        newData.contentList = newContent;
        newData.folderId = selectedFolderId;
        newData.maxItems = maxNumberItems;
        newData.type = selectedTab;
        newData.sortType = sortSettings.value !== 'none' ? sortSettings.value : 'custom'
        props.saveContentSetup(newData, 'playlist')
            .then(() => {
                setSaveLoading(false)
                segmentService.track('Playlist Created', {
                    action: 'Paylist Setup',
                    'playlist': playlistId, 
                    step: 2,
                })  
            })
            .catch(() => setSaveLoading(false))
    }

    return (
        <React.Fragment>
            <PlaylistsTabs playlistId={playlistId} />
            { (props.folderData && props.contentDataState['playlist'] && props.contentDataState['playlist'][playlistId]) ? 
                <div className='flex flex-column'>
                    <PlaylistSettings open={playlistSettingsOpen} toggle={setPlaylistSettingsOpen} callBackSuccess={(data: number) => { setMaxNumberItems(data); setPlaylistSettingsOpen(false) }} />
                    <ContentSelector
                        showSort={true}
                        loading={saveLoading}
                        playlist={{ setPreviewModalOpen: setPreviewModalOpen}}
                        openSettings={setPlaylistSettingsOpen}
                        folderId={props.contentDataState['playlist'][playlistId].folderId}
                        folderData={props.folderData}
                        type={props.contentDataState['playlist'][playlistId].type}
                        selectedItems={selectedItems}
                        getFolderContent={props.getFolderContent}
                        title={props.contentDataState['playlist'][playlistId].title} 
                        callback={handleSave}
                        showFolders={true}
                        defaultSort={props.contentDataState['playlist'][playlistId].sortType}
                    />
                    {
                        previewModalOpen && <PreviewModal contentType='playlist' contentId={userId + '-playlist-' + playlistId} toggle={setPreviewModalOpen} isOpened={previewModalOpen} />
                    }
                </div>
                : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </React.Fragment>
    )
}


export function mapStateToProps(state: ApplicationState) {
    return {
        folderData: state.folders.data,
        contentDataState: state.content.setup
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getContentSetup: async (contentId: string, contentType: ContentType) => {
            await dispatch(getContentSetupAction(contentType)(contentId))
        },
        getFolderContent: async (folderPath: string, callback?: (data: SearchResult) => void) => {
            await dispatch(getFolderContentAction(folderPath, callback));
        },
        saveContentSetup: async (data: ContentSetupObject, contentType: ContentType) => {
            await dispatch(postContentSetupAction(contentType)(data))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup);