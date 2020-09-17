import React from 'react';
import {LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, getFolderContentAction } from '../../redux-flow/store/Folders/actions';
import { FoldersInfos } from '../../redux-flow/store/Folders/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { useParams } from 'react-router-dom';
import { ExposTabs } from './ExposTabs';
import { getContentSetupAction, postContentSetupAction } from '../../redux-flow/store/Content/Setup/actions';
import { ContentSetupState, ContentSetupObject } from '../../redux-flow/store/Content/Setup/types';
import { SetupPage } from '../../pages/Expos/Setup';

export interface ExposSetupComponentProps {
    folderData: FoldersInfos;
    contentData: ContentSetupObject;
    contentDataState: ContentSetupState;
    getContentSetup: (contentId: string, contentType: string) => Promise<void>;
    getFolderContent: (folderPath: string) => Promise<void>;
    saveContentSetup: (data: ContentSetupObject, contentId: string, contentType: string) => Promise<void>;
}

const ExposSetup = (props: ExposSetupComponentProps) => {

    let { exposId } = useParams()
    
    React.useEffect(() => {
        props.getContentSetup(exposId, 'expos')
        if(!props.folderData) {
            
            const wait = async () => {
                await props.getFolderContent('/')
            }
            wait()
        }
    }, [])
    return (
        <>
            <ExposTabs exposId={exposId} />
            { (props.folderData && props.contentDataState['expos'] && props.contentDataState['expos'][exposId]) ? 
                <div className='flex flex-column'>
                    <SetupPage {...props}  contentData={props.contentDataState['expos'][exposId]} contentId={exposId} contentType='expos'/>
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
        getContentSetup: async (contentId: string, contentType: string) => {
            await dispatch(getContentSetupAction(contentId, contentType))
        },
        getFolderContent: async (folderPath: string) => {
            await dispatch(getFolderContentAction(folderPath));
        },
        saveContentSetup: async (data: ContentSetupObject, contentId: string, contentType: string) => {
            await dispatch(postContentSetupAction(data, contentId, contentType))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExposSetup);