export enum ActionTypes {
    GET_PIRATE = "@@admin_piracy/GET_PIRATE"
}

export interface PirateData {
    salesforceId: string;
    userId: string;
    liveChannelId: string;
}

export const pirateDataInitialState: PirateData = null