import { EmbedSettings } from '../../../../../DacastSdk/settings';
import { EmbedSettingsOptionType } from './types';

export const formatGetEmbedSettingsOuput = (data: EmbedSettings): EmbedSettingsOptionType => {
    let formattedData: EmbedSettingsOptionType = {
        type: data["embed-type"],
        scaling: data["embed-scaling"],
        size: data["embed-size"]
    }

    return formattedData
}

export const formatPutEmbedSettingsInput = (data: EmbedSettingsOptionType): EmbedSettings => {
    let formattedData: EmbedSettings = {
        ["embed-type"]: data.type,
        ["embed-scaling"]: data.scaling,
        ["embed-size"]: data.size
    }

    return formattedData
}