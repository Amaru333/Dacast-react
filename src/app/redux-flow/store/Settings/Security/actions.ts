import { ActionTypes, SecuritySettings, GeoRestriction, DomainControl } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { SettingsServices } from './services';
import { showToastNotification } from '../../Toasts';

export interface GetSettingsSecurityOptions {
    type: ActionTypes.GET_SETTINGS_SECURITY_OPTIONS;
    payload: {data: SecuritySettings};
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

export const getSettingsSecurityOptionsAction = (): ThunkDispatch<Promise<void>, {}, GetSettingsSecurityOptions> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetSettingsSecurityOptions> ) => {
        await SettingsServices.getSettingsSecurityOptionsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_SETTINGS_SECURITY_OPTIONS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const saveSettingsSecurityOptionsAction = (data: SecuritySettings): ThunkDispatch<Promise<void>, {}, SaveSettingsSecurityOptions> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveSettingsSecurityOptions> ) => {
        await SettingsServices.saveSettingsSecurityOptionsService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_SETTINGS_SECURITY_OPTIONS, payload: data} );
                dispatch(showToastNotification("Changes have been saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const createGeoRestrictionGroupAction = (data: GeoRestriction): ThunkDispatch<Promise<void>, {}, CreateGeoRestrictionGroup> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, CreateGeoRestrictionGroup> ) => {
        await SettingsServices.createGeoRestrictionGroupService(data)
            .then( response => {
                dispatch( {type: ActionTypes.CREATE_GEO_RESTRICTION_GROUP, payload: {...data, id: response.data.data.id}} );
                dispatch(showToastNotification(`${data.name} has been created`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const saveGeoRestrictionGroupAction = (data: GeoRestriction): ThunkDispatch<Promise<void>, {}, SaveGeoRestrictionGroup> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveGeoRestrictionGroup> ) => {
        await SettingsServices.saveGeoRestrictionGroupService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_GEO_RESTRICTION_GROUP, payload: data} );
                dispatch(showToastNotification(`${data.name} has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const deleteGeoRestrictionGroupAction = (data: GeoRestriction): ThunkDispatch<Promise<void>, {}, DeleteGeoRestrictionGroup> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteGeoRestrictionGroup> ) => {
        await SettingsServices.deleteGeoRestrictionGroupService(data)
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_GEO_RESTRICTION_GROUP, payload: data} );
                dispatch(showToastNotification(`${data.name} has been deleted`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const createDomainControlGroupAction = (data: DomainControl): ThunkDispatch<Promise<void>, {}, CreateDomainControlGroup> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, CreateDomainControlGroup> ) => {
        await SettingsServices.createDomainControlGroupService(data)
            .then( response => {
                dispatch( {type: ActionTypes.CREATE_DOMAIN_CONTROL_GROUP, payload: {...data, id: response.data.data.id}} );
                dispatch(showToastNotification(`${data.name} has been created`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const saveDomainControlGroupAction = (data: DomainControl): ThunkDispatch<Promise<void>, {}, SaveDomainControlGroup> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveDomainControlGroup> ) => {
        await SettingsServices.saveDomainControlGroupService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_DOMAIN_CONTROL_GROUP, payload: data} );
                dispatch(showToastNotification(`${data.name} has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const deleteDomainControlGroupAction = (data: DomainControl): ThunkDispatch<Promise<void>, {}, DeleteDomainControlGroup> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteDomainControlGroup> ) => {
        await SettingsServices.deleteDomainControlGroupService(data)
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_DOMAIN_CONTROL_GROUP, payload: data} );
                dispatch(showToastNotification(`${data.name} has been deleted`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export type Action = 
GetSettingsSecurityOptions | 
SaveSettingsSecurityOptions |
CreateGeoRestrictionGroup |
SaveGeoRestrictionGroup |
DeleteGeoRestrictionGroup |
CreateDomainControlGroup |
SaveDomainControlGroup |
DeleteDomainControlGroup 
;
