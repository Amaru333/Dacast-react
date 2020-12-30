import { ActionTypes, BillingPageInfos, PlaybackProtection, Products } from './types';
import { applyViewModel } from '../../../../utils/utils';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatGetBillingInfoOutput, formatGetProductExtraDataListOutput, formatPutPlaybackProtectionInput } from './viewModel';


export interface GetBillingPageInfos {
    type: ActionTypes.GET_BILLING_PAGE_INFOS;
    payload: BillingPageInfos;
}

export interface AddBillingPagePlaybackProtection {
    type: ActionTypes.ADD_BILLING_PAGE_PLAYBACK_PROTECTION;
    payload: PlaybackProtection;
}

export interface EditBillingPagePlaybackProtection {
    type: ActionTypes.EDIT_BILLING_PAGE_PLAYBACK_PROTECTION;
    payload: PlaybackProtection;
}

export interface GetProductDetails {
    type: ActionTypes.GET_PRODUCT_DETAILS;
    payload: Products;
}


export const getBillingPageInfosAction = applyViewModel(dacastSdk.getBillingInfo, undefined, formatGetBillingInfoOutput, ActionTypes.GET_BILLING_PAGE_INFOS, null, 'Couldn\'t get billing info')

export const addBillingPagePaymenPlaybackProtectionAction = applyViewModel(dacastSdk.putPlaybackProtection, formatPutPlaybackProtectionInput, undefined, ActionTypes.ADD_BILLING_PAGE_PLAYBACK_PROTECTION, 'Playack Protection has been enabled', 'Couldn\'t enable playback protection')

export const editBillingPagePaymenPlaybackProtectionAction = applyViewModel(dacastSdk.putPlaybackProtection, formatPutPlaybackProtectionInput, undefined, ActionTypes.EDIT_BILLING_PAGE_PLAYBACK_PROTECTION, 'Playback protection changes saved', 'Couldn\'t save playback protection changes')


export const getProductDetailsAction = applyViewModel(dacastSdk.getProductExtraDataList, undefined, formatGetProductExtraDataListOutput, ActionTypes.GET_PRODUCT_DETAILS, null, 'Couldn\'t get product details')



export type PlanAction = 
GetBillingPageInfos  
| AddBillingPagePlaybackProtection
| EditBillingPagePlaybackProtection
| GetProductDetails