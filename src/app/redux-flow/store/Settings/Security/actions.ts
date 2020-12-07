import { ActionTypes, SecuritySettings, GeoRestriction, DomainControl } from "./types";
import { applyViewModel } from '../../../../utils/utils';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatDeleteDomainControlInput, formatDeleteGeoRestrictionInput, formatGetSecuritySettingsOutput, formatPostDomainControlInput, formatPostDomainControlOutput, formatPostGeoRestrictionInput, formatPostGeoRestrictionOutput, formatPutDomainControlInput, formatPutGeoRestrictionInput, formatPutSecuritySettingsInput } from './viewModel';

export interface GetSettingsSecurityOptions {
    type: ActionTypes.GET_SETTINGS_SECURITY_OPTIONS;
    payload: SecuritySettings;
}

export interface SaveSettingsSecurityOptions {
    type: ActionTypes.SAVE_SETTINGS_SECURITY_OPTIONS;
    payload: SecuritySettings;
}

export interface CreateGeoRestrictionGroup {
    type: ActionTypes.CREATE_GEO_RESTRICTION_GROUP;
    payload: GeoRestriction;
}

export interface SaveGeoRestrictionGroup {
    type: ActionTypes.SAVE_GEO_RESTRICTION_GROUP;
    payload: GeoRestriction;
}

export interface DeleteGeoRestrictionGroup {
    type: ActionTypes.DELETE_GEO_RESTRICTION_GROUP;
    payload: GeoRestriction;
}

export interface CreateDomainControlGroup {
    type: ActionTypes.CREATE_DOMAIN_CONTROL_GROUP;
    payload: DomainControl;
}

export interface SaveDomainControlGroup {
    type: ActionTypes.SAVE_DOMAIN_CONTROL_GROUP;
    payload: DomainControl;
}

export interface DeleteDomainControlGroup {
    type: ActionTypes.DELETE_DOMAIN_CONTROL_GROUP;
    payload: DomainControl;
}

export type Action = GetSettingsSecurityOptions | SaveSettingsSecurityOptions | CreateGeoRestrictionGroup | SaveGeoRestrictionGroup | DeleteGeoRestrictionGroup | CreateDomainControlGroup | SaveDomainControlGroup | DeleteDomainControlGroup 

export const getSettingsSecurityOptionsAction = applyViewModel(dacastSdk.getSecuritySettings, undefined, formatGetSecuritySettingsOutput, ActionTypes.GET_SETTINGS_SECURITY_OPTIONS, null, 'Couldn\'t get security settings')
export const saveSettingsSecurityOptionsAction = applyViewModel(dacastSdk.putSecuritySettings, formatPutSecuritySettingsInput, undefined, ActionTypes.SAVE_SETTINGS_SECURITY_OPTIONS, 'Changes have been saved', 'Couldn\'t save changes')

export const createGeoRestrictionGroupAction = applyViewModel(dacastSdk.postGeoRestriction, formatPostGeoRestrictionInput, formatPostGeoRestrictionOutput, ActionTypes.CREATE_GEO_RESTRICTION_GROUP, 'Geo Restriction Group has been created', 'Couldn\'t create Geo Restriction Group')
export const saveGeoRestrictionGroupAction = applyViewModel(dacastSdk.putGeoRestriction, formatPutGeoRestrictionInput, undefined, ActionTypes.SAVE_GEO_RESTRICTION_GROUP, 'Geo Restriction Group has been saved', 'Couldn\'t save geo restriction group')
export const deleteGeoRestrictionGroupAction = applyViewModel(dacastSdk.deleteGeoRestriction, formatDeleteGeoRestrictionInput, undefined, ActionTypes.DELETE_GEO_RESTRICTION_GROUP, 'Geo Restriction Group has been deleted', 'Couldn\'t delete Geo Restriction Group')

export const createDomainControlGroupAction = applyViewModel(dacastSdk.postDomainControl, formatPostDomainControlInput, formatPostDomainControlOutput, ActionTypes.CREATE_DOMAIN_CONTROL_GROUP, 'Domain Control has been created', 'Couldn\'t create Domain Control Group')
export const saveDomainControlGroupAction = applyViewModel(dacastSdk.putDomainControl, formatPutDomainControlInput, undefined, ActionTypes.SAVE_DOMAIN_CONTROL_GROUP, 'Domain Control Group has been saved', 'Couldn\'t save Domain Control group')
export const deleteDomainControlGroupAction = applyViewModel(dacastSdk.deleteDomainControl, formatDeleteDomainControlInput, undefined, ActionTypes.DELETE_DOMAIN_CONTROL_GROUP, 'Domain Control Group has been deleted', 'Couldn\'t delete Domain Control Group')


