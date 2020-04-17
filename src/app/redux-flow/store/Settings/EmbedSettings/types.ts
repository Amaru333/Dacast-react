export enum ActionTypes {
    GET_EMBED_SETTINGS_OPTIONS = "@@settings/GET_EMBED_SETTINGS_OPTIONS",
    SAVE_EMBED_SETTINGS_OPTIONS = "@@settings/SAVE_EMBED_SETTINGS_OPTIONS"
}


export interface EmbedSettingsOptionType {
    ['embed-type']:  'iframe' | 'html5-video'; 
    ['embed-scaling']: 'fixed' | 'responsive';
    'embed-size': number;
}