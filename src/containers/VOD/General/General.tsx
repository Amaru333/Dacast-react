import React from 'react';
import { ApplicationState } from '../../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getVodDetailsAction, addVodSubtitleAction, editVodSubtitleAction, changeVodThumbnailAction, editVodDetailsAction, deleteVodSubtitleAction } from '../../../redux-flow/store/VOD/General/actions';
import { connect } from 'react-redux';
import { VodDetails, SubtitleInfo, ThumbnailUpload } from '../../../redux-flow/store/VOD/General/types';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { GeneralPage } from '../../../components/Pages/VOD/General/General'


interface GeneralProps {
    vodDetails: VodDetails;
    editVodDetails: Function;
    getVodDetails: Function;
    addVodSubtitle: Function;
    editVodSubtitle: Function;
    deleteVodSubtitle: Function;
    changeVodThumbnail: Function;
}

const General = (props: GeneralProps) => {

    React.useEffect(() => {
        if (!props.vodDetails) {
            props.getVodDetails();
        }
    }, [])

    return (
        props.vodDetails ?
            (
                <GeneralPage {...props} />
            )
            : <LoadingSpinner color='dark-violet' size='large' />
    )

}

export function mapStateToProps(state: ApplicationState) {
    return {
        vodDetails: state.vod.general
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodDetails: () => {
            dispatch(getVodDetailsAction());
        },
        editVodDetails: (data: VodDetails) => {
            dispatch(editVodDetailsAction(data));
        },
        addVodSubtitle: (data: SubtitleInfo) => {
            dispatch(addVodSubtitleAction(data));
        },
        editVodSubtitle: (data: SubtitleInfo) => {
            dispatch(editVodSubtitleAction(data));
        },
        deleteVodSubtitle: (data: SubtitleInfo) => {
            dispatch(deleteVodSubtitleAction(data));
        },
        changeVodThumbnail: (data: ThumbnailUpload) => {
            dispatch(changeVodThumbnailAction(data))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(General);