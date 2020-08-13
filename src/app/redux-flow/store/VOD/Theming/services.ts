import { ThemeOptions } from '../../Settings/Theming';
import { axiosClient } from '../../../../utils/axiosClient';

const getVodThemeService = async (vodId: string) => {    
    return await axiosClient.get('/vods/' + vodId + '/settings/themes')
}

const saveVodThemeService = async (data: ThemeOptions, vodId: string) => {
    if(!data.isCustom) {
        return await axiosClient.put('/vods/' + vodId + '/settings/themes/' + data.id + '/set',
            {
                ...data
            }
        )
    } else {
        if(data.id === '-1') {
            return await axiosClient.post('/vods/' + vodId + '/settings/themes/',
                {
                    ...data
                }
            )
        } else {
            return await axiosClient.put('/vods/' + vodId + '/settings/themes/' + data.id,
                {
                    ...data
                }
            )
        }

    }
    
}

export const VodThemingServices = {
    getVodThemeService,
    saveVodThemeService
}