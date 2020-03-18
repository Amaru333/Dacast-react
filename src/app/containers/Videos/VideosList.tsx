import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../redux-flow/store";
import { Action } from '../../redux-flow/store/VOD/General/actions';
import { getVodListAction, deleteVodAction } from '../../redux-flow/store/VOD/General/actions';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { VideosListProps, VideosListPage } from '../../pages/Videos/VideosList/VideosList';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

const VideosList = (props: VideosListProps) => {

    React.useEffect(() => {
        if (!props.items) {
            props.getVodList();
        }
    }, [])

    if (!props.items) {
        return <SpinnerContainer><LoadingSpinner className="mlauto mrauto" size="medium" color="violet" /></SpinnerContainer>
    } else {
        return (
            <VideosListPage {...props} />
        )
    }
}

export function mapStateToProps(state: ApplicationState) {
    return {
        items: state.vod.list
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodList: () => {
            dispatch(getVodListAction());
        },
        deleteVodList: (name: string) => {
            dispatch(deleteVodAction(name));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideosList);