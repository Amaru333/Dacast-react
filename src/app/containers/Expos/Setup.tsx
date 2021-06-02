import React from 'react';
import {LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, getFolderContentAction } from '../../redux-flow/store/Folders/actions';
import { FolderAsset, FoldersInfos, SearchResult } from '../../redux-flow/store/Folders/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { useParams } from 'react-router-dom';
import { ExposTabs } from './ExposTabs';
import { getContentSetupAction, postContentSetupAction } from '../../redux-flow/store/Content/Setup/actions';
import { ContentSetupState, ContentSetupObject, Content, ContentSelectorType } from '../../redux-flow/store/Content/Setup/types';
import { segmentService } from '../../utils/services/segment/segmentService';
import { removePrefix } from '../../utils/utils';
import { ContentSelector, SortSettingsContentSelector } from '../../../components/ContentSelector/ContentSelector';
import { ContentType } from '../../redux-flow/store/Common/types';

export interface ExposSetupComponentProps {
    folderData: FoldersInfos;
    contentDataState: ContentSetupState;
    getContentSetup: (contentId: string, contentType: ContentType) => Promise<void>;
    getFolderContent: (folderPath: string) => Promise<void>;
    saveContentSetup: (data: ContentSetupObject, contentType: ContentType) => Promise<void>;
}

const ExposSetup = (props: ExposSetupComponentProps) => {

    let { exposId } = useParams<{exposId: string}>()
    
    React.useEffect(() => {
        props.getContentSetup(exposId, 'expo')
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

    const initFormateData = ():FolderAsset[] => {
        return props.contentDataState['expo'] && props.contentDataState['expo'][exposId] && props.contentDataState['expo'][exposId].contentList ? props.contentDataState['expo'][exposId].contentList.map(item =>{
            return {
                ownerID: "",
                objectID: item['id'],
                title: item.title,
                thumbnail: item.thumbnailURL,
                type: item.contentType,
                createdAt: 0,
                duration: '',
                featuresList: {},
                status: 'online'
            }
        }) : []
    }
    
    const [selectedItems, setSelectedItems] = React.useState<FolderAsset[]>(initFormateData())
    


    const [saveLoading, setSaveLoading] = React.useState<boolean>(false)

    const handleSave = (items: FolderAsset[], selectedTab: ContentSelectorType, selectedFolderId: string, sortSettings: SortSettingsContentSelector) => {
        setSaveLoading(true);
        let newContent = items.map((item: FolderAsset): Content => {
            return {
                contentType: (item.type === 'channel'|| item.type === 'live') ? 'live' : 'vod',
                id: removePrefix(item.objectID),
                title: item.title,
                thumbnailURL: item.thumbnail
            }
        })
        let newData: ContentSetupObject = {...props.contentDataState['expo'][exposId]};
        newData.contentList = newContent;
        newData.folderId = selectedFolderId ? selectedFolderId : undefined ;
        newData.type = selectedTab ;
        newData.sortType = sortSettings.value !== 'none' ? sortSettings.value : 'custom';
        newData.id = exposId;
        props.saveContentSetup(newData, 'expo')
        .then(() => {
            setSaveLoading(false)
            segmentService.track('Expo Created', {
                action: 'Setup Expo',
                'expo_id': exposId, 
                step: 2,
            })  
        })
        .catch(() => setSaveLoading(false))
    }

    return (
        <>
            <ExposTabs exposId={exposId} />
            { (props.folderData && props.contentDataState['expo'] && props.contentDataState['expo'][exposId]) ? 
                <div className='flex flex-column'>
                    <ContentSelector 
                        emptyText="Start adding videos to your Expo by selecting folders/content from the left using the arrows."
                        showSort={true}
                        loading={saveLoading}
                        showFolders={true}
                        folderId={props.contentDataState['expo'][exposId].folderId} 
                        folderData={props.folderData}
                        type={props.contentDataState['expo'][exposId].type} 
                        selectedItems={selectedItems} 
                        getFolderContent={props.getFolderContent} 
                        title={props.contentDataState['expo'][exposId].title} 
                        callback={handleSave} 
                    />
                </div>
                : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExposSetup);