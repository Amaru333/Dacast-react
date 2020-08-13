import { ThemeOptions } from '../../Settings/Theming';
import { axiosClient } from '../../../../utils/axiosClient';

const getLiveThemeService = async (liveId: string) => {
    return await axiosClient.get('/channels/' + liveId + '/settings/themes')
}

const saveLiveThemeService = async (data: ThemeOptions, liveId: string) => {
    if(!data.isCustom) {
        return await axiosClient.put('/channels/' + liveId + '/settings/themes/' + data.id + '/set',
            {...data}
        )
    } else {
        if(data.id === '-1') {
            return await axiosClient.post('/channels/' + liveId + '/settings/themes/',
                {...data}
            )
        } else {
            return await axiosClient.put('/channels/' + liveId + '/settings/themes/' + data.id,
                {...data}
            )
        }

    }
}

export const LiveThemingServices = {
    getLiveThemeService,
    saveLiveThemeService
}