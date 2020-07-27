import React from 'react'
import { GroupsPage } from '../../pages/Paywall/Groups/Groups'
import { GroupPrice, GroupsPageInfos, Action, createGroupPriceAction, saveGroupPriceAction, deleteGroupPriceAction, GroupPromo, createGroupPromoAction, saveGroupPromoAction, deleteGroupPromoAction, getGroupPricesAction, getGroupPromosAction } from '../../redux-flow/store/Paywall/Groups';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { getFolderContentAction } from '../../redux-flow/store/Folders/actions';
import { FoldersInfos } from '../../redux-flow/store/Folders/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

export interface GroupsComponentProps {
    groupsInfos: GroupsPageInfos;
    getGroupPrices: () => Promise<void>;
    getGroupPromos: () => Promise<void>;
    createGroupPrice: (p: GroupPrice) => Promise<void>;
    saveGroupPrice: (p: GroupPrice) => Promise<void>;
    deleteGroupPrice: (p: GroupPrice) => Promise<void>;
    createGroupPromo: (p: GroupPromo) => Promise<void>;
    saveGroupPromo: (p: GroupPromo) => Promise<void>;
    deleteGroupPromo: (p: GroupPromo) => Promise<void>;
    folderData: FoldersInfos;
    getFolderContent: (path: string) => Promise<void>;
}

const Groups = (props: GroupsComponentProps) => {

    React.useEffect(() => {
        if(!props.groupsInfos.prices) {
            props.getGroupPrices()
        }
        if(!props.groupsInfos.promos) {
            props.getGroupPromos()
        }
        if(!props.folderData) {
            const wait = async () => {
                await props.getFolderContent('/')
            }
            wait()
        }
    }, [])

    return (
        props.groupsInfos.prices && props.groupsInfos.promos ?
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
            await dispatch(getGroupPricesAction());
        },
        getGroupPromos: async () => {
            await dispatch(getGroupPromosAction());
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