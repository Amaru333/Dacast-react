export enum ActionTypes {
    GET_DELIVERY_AND_EMBED_OPTIONS = "@@settings/GET_DELIVERY_AND_EMBED_OPTIONS",
    SAVE_DELIVERY_AND_EMBED_OPTIONS = "@@settings/SAVE_DELIVERY_AND_EMBED_OPTIONS"
}


export interface DeliveryAndEmbedOptionType {
    [key: string]:  string; 
}