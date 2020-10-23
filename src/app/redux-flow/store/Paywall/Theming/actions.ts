import { ActionTypes, PaywallTheme } from './types';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatGetPaywallThemesOutput, formatPostPaywallThemeInput, formatPostPaywallThemeOutput } from './viewModel';
import { applyViewModel } from '../../../../utils/utils';

export interface GetPaywallThemes {
    type: ActionTypes.GET_PAYWALL_THEMES;
    payload: PaywallTheme[];
}

export interface SavePaywallTheme {
    type: ActionTypes.SAVE_PAYWALL_THEME;
    payload: PaywallTheme;
}

export interface CreatePaywallTheme {
    type: ActionTypes.CREATE_PAYWALL_THEME;
    payload: PaywallTheme;
}

export interface DeletePaywallTheme {
    type: ActionTypes.DELETE_PAYWALL_THEME;
    payload: PaywallTheme;
}

export type Action = GetPaywallThemes | SavePaywallTheme | CreatePaywallTheme | DeletePaywallTheme;

export const getPaywallThemesAction = applyViewModel(dacastSdk.getPaywallThemes, null, formatGetPaywallThemesOutput, ActionTypes.GET_PAYWALL_THEMES, null, 'Couldn\'t get paywall themes list')
export const createPaywallThemeAction = applyViewModel(dacastSdk.postPaywallTheme, formatPostPaywallThemeInput, formatPostPaywallThemeOutput, ActionTypes.CREATE_PAYWALL_THEME, 'Paywall theme has been created', 'Couldn\'t create paywall theme')
export const savePaywallThemeAction = applyViewModel(dacastSdk.putPaywallTheme, (data: PaywallTheme) =>  data, null, ActionTypes.SAVE_PAYWALL_THEME, 'Paywall theme has been saved', 'Couldn\'t save paywall theme')
export const deletePaywallThemeAction = applyViewModel(dacastSdk.deletePaywallTheme, (data: PaywallTheme) =>  data.id, null, ActionTypes.DELETE_PAYWALL_THEME, 'Paywall theme has been deleted', 'Couldn\'t delete paywall theme')