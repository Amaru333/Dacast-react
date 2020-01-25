import React from 'react';
import { VodRenditionsPage } from '../../pages/Videos/Renditions/Renditions';
import { RenditionsList, Rendition } from '../../redux-flow/store/VOD/Renditions/types';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getVodRenditionsAction, addVodRenditionsAction, deleteVodRenditionsAction } from '../../redux-flow/store/VOD/Renditions/actions';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { connect } from 'react-redux';

interface VodRenditionsContainerProps {
    renditions: RenditionsList;
    getVodRenditions: Function;
    addVodRenditions: Function;
    deleteVodRenditions: Function;
}

export const VodRenditions = (props: VodRenditionsContainerProps) => {

    React.useEffect(() => {
        if(!props.renditions) {
            props.getVodRenditions();

        }
    }, [])

    return (
        props.renditions ?
            (
                <VodRenditionsPage {...props} />
            )
            : <LoadingSpinner color='dark-violet' size='large' />
    )
}

export function mapStateToProps( state: ApplicationState ) {
    return {
        renditions: state.vod.renditions
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodRenditions: () => {
            dispatch(getVodRenditionsAction());
        },
        addVodRenditions: (data: Rendition[]) => {
            dispatch(addVodRenditionsAction(data));
        },
        deleteVodRenditions: (data: Rendition[]) => {
            dispatch(deleteVodRenditionsAction(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodRenditions);