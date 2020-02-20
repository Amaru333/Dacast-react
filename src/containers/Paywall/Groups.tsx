import React from 'react'
import { GroupsPage } from '../../pages/Paywall/Groups/Groups'
import { GroupPrice, GroupsPageInfos, Action, createGroupPriceAction, saveGroupPriceAction, deleteGroupPriceAction, GroupPromo, createGroupPromoAction, saveGroupPromoAction, deleteGroupPromoAction, getGroupsInfosAction } from '../../redux-flow/store/Paywall/Groups';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { getFoldersAction, getFolderContentAction, restoreContentAction } from '../../redux-flow/store/Folders/actions';
import { FolderAsset, FoldersInfos } from '../../redux-flow/store/Folders/types';

export interface GroupsComponentProps {
    groupsInfos: GroupsPageInfos;
    getgroupsInfos: Function;
    createGroupPrice: Function;
    saveGroupPrice: Function;
    deleteGroupPrice: Function;
    createGroupPromo: Function;
    saveGroupPromo: Function;
    deleteGroupPromo: Function;
    folderData: FoldersInfos;
    getFolders: Function;
    getFolderContent: Function;
    restoreContent: Function;
}

const Groups = (props: GroupsComponentProps) => {

    React.useEffect(() => {
        if(!props.groupsInfos) {
            props.getgroupsInfos()
        }
        if(!props.folderData) {
            const wait = async () => {
                await props.getFolderContent('/')
                //await props.getFolders('/');
            }
            wait()
        }
    }, [])

    return (
        props.groupsInfos && props.folderData ?
            <GroupsPage {...props} />
            : <LoadingSpinner size='large' color='green' />
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        groupsInfos: state.paywall.groups,
        folderData: state.folders.data
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getgroupsInfos: () => {
            dispatch(getGroupsInfosAction());
        },
        createGroupPrice: (data: GroupPrice) => {
            dispatch(createGroupPriceAction(data));
        },
        saveGroupPrice: (data: GroupPrice) => {
            dispatch(saveGroupPriceAction(data));
        },
        deleteGroupPrice: (data: GroupPrice) => {
            dispatch(deleteGroupPriceAction(data));
        },
        createGroupPromo: (data: GroupPromo) => {
            dispatch(createGroupPromoAction(data));
        },
        saveGroupPromo: (data: GroupPromo) => {
            dispatch(saveGroupPromoAction(data));
        },
        deleteGroupPromo: (data: GroupPromo) => {
            dispatch(deleteGroupPromoAction(data));
        },
        getFolders: (folderPath: string) => {
            dispatch(getFoldersAction(folderPath));
        },
        getFolderContent: (folderPath: string) => {
            dispatch(getFolderContentAction(folderPath))
        },
        restoreContent: (content: FolderAsset[]) => {
            dispatch(restoreContentAction(content))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups);