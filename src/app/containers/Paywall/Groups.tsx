import React from 'react'
import { GroupsPage } from '../../pages/Paywall/Groups/Groups'
import { Action, createGroupPriceAction, saveGroupPriceAction, deleteGroupPriceAction, getGroupPriceContentsAction, createGroupPromoAction, saveGroupPromoAction, deleteGroupPromoAction, getGroupPricesAction, getGroupPromosAction } from '../../redux-flow/store/Paywall/Groups/actions';
import { GroupPrice, GroupsPageInfos, GroupPromo } from '../../redux-flow/store/Paywall/Groups/types';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { getFolderContentAction } from '../../redux-flow/store/Folders/actions';
import { FoldersInfos } from '../../redux-flow/store/Folders/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';

export interface GroupsComponentProps {
    groupsInfos: GroupsPageInfos;
    folderData: FoldersInfos;
    getGroupPrices: () => Promise<void>;
    getGroupPromos: () => Promise<void>;
    createGroupPrice: (p: GroupPrice) => Promise<void>;
    saveGroupPrice: (p: GroupPrice) => Promise<void>;
    deleteGroupPrice: (p: GroupPrice) => Promise<void>;
    getGroupPriceContents: (path: string) => Promise<void>;
    createGroupPromo: (p: GroupPromo) => Promise<void>;
    saveGroupPromo: (p: GroupPromo) => Promise<void>;
    deleteGroupPromo: (p: GroupPromo) => Promise<void>;
    getFolderContent: (path: string) => Promise<void>;
}

const Groups = (props: GroupsComponentProps) => {

    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        if(!props.groupsInfos.prices) {
            props.getGroupPrices()
                .catch(() => setNodataFetched(true))
        }
        if(!props.groupsInfos.promos) {
            props.getGroupPromos()
                .catch(() => setNodataFetched(true))
        }
        props.getFolderContent('status=online&page=1&per-page=200&content-types=channel,vod,folder,playlist')
            .catch(() => setNodataFetched(true))
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (
        props.groupsInfos.prices && props.groupsInfos.promos && props.folderData ?
            <GroupsPage {...props} />
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
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
        getGroupPrices: async () => {
            await dispatch(getGroupPricesAction(undefined));
        },
        getGroupPromos: async () => {
            await dispatch(getGroupPromosAction(undefined));
        },
        createGroupPrice: async (data: GroupPrice) => {
            await dispatch(createGroupPriceAction(data));
        },
        saveGroupPrice: async (data: GroupPrice) => {
            await dispatch(saveGroupPriceAction(data));
        },
        deleteGroupPrice: async (data: GroupPrice) => {
            await dispatch(deleteGroupPriceAction(data));
        },
        getGroupPriceContents: async (path: string) => {
            await dispatch(getGroupPriceContentsAction(path));
        },
        createGroupPromo: async (data: GroupPromo) => {
            await dispatch(createGroupPromoAction(data));
        },
        saveGroupPromo: async (data: GroupPromo) => {
            await dispatch(saveGroupPromoAction(data));
        },
        deleteGroupPromo: async (data: GroupPromo) => {
            await dispatch(deleteGroupPromoAction(data));
        },
        getFolderContent: async (folderPath: string) => {
            await dispatch(getFolderContentAction(folderPath))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
