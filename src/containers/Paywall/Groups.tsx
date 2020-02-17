import React from 'react'
import { GroupsPage } from '../../pages/Paywall/Groups/Groups'
import { GroupPrice, GroupsPageInfos, Action, createGroupPriceAction, saveGroupPriceAction, deleteGroupPriceAction, GroupPromo, createGroupPromoAction, saveGroupPromoAction, deleteGroupPromoAction, getGroupsInfosAction } from '../../redux-flow/store/Paywall/Groups';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

export interface GroupsComponentProps {
    groupsInfos: GroupsPageInfos;
    getgroupsInfos: Function;
    createGroupPrice: Function;
    saveGroupPrice: Function;
    deleteGroupPrice: Function;
    createGroupPromo: Function;
    saveGroupPromo: Function;
    deleteGroupPromo: Function;
}

const Groups = (props: GroupsComponentProps) => {

    return (
        <GroupsPage {...props} />
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        groupsInfos: state.paywall.groups
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups);