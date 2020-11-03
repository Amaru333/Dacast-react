import { ActionTypes, PaywallSettingsInfos } from './types';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatGetPaywallSettingsOutput, formatPutPaywallSettingsInput } from './viewModel';
import { applyViewModel } from '../../../../utils/utils';

export interface GetPaywallSettingsInfos {
    type: ActionTypes.GET_PAYWALL_SETTINGS_INFOS;
    payload: PaywallSettingsInfos;
}

export interface SavePaywallSettingsInfos {
    type: ActionTypes.SAVE_PAYWALL_SETTINGS_INFOS;
    payload: PaywallSettingsInfos;
}

export type Action = GetPaywallSettingsInfos | SavePaywallSettingsInfos

export const getPaywallSettingsInfosAction = applyViewModel(dacastSdk.getPaywallSettings, null, formatGetPaywallSettingsOutput, ActionTypes.GET_PAYWALL_SETTINGS_INFOS, null, 'Couldn\'t get to get paywall settings')
export const savePaywallSettingsInfosAction = applyViewModel(dacastSdk.putPaywallSettings, formatPutPaywallSettingsInput, null, ActionTypes.SAVE_PAYWALL_SETTINGS_INFOS, 'Changes have been saved', 'Couldn\'t save changes')