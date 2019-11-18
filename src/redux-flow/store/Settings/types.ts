import { ApiIntegrationPageInfos } from './ApiIntegration';
import { DeliveryAndEmbedOptionType } from './DeliveryAndEmbed';


export const SettingsInitialState: SettingsState = {
    data: {
        apiIntegration: false,
        deliveryAndEmbed: false
    }
};

export interface SettingsState {
    readonly data: {
        apiIntegration: false | ApiIntegrationPageInfos;
        deliveryAndEmbed: false | DeliveryAndEmbedOptionType
    };
}
