import { ThemeOptions } from '../../Settings/Theming';
import { axiosClient } from '../../../../utils/axiosClient';

const getContentThemeService = async (contentId: string, contentType: string) => {    
    return await axiosClient.get(`${contentType}/${contentId}/settings/themes`)
}

const saveContentThemeService = async (data: ThemeOptions, contentId: string, contentType: string) => {
    if(!data.isCustom) {
        return await axiosClient.put(`${contentType}/${contentId}/settings/themes/${data.id}/set`,
            {
                ...data
            }
        )
    } else {
        if(data.id === '-1') {
            return await axiosClient.post(`${contentType}/${contentId}/settings/themes/`,
                {
                    ...data
                }
            )
        } else {
            return await axiosClient.put(`${contentType}/${contentId}/settings/themes/${data.id}`,
                {
                    ...data
                }
            )
        }

    }
    
}

export const ContentThemingServices = {
    getContentThemeService,
    saveContentThemeService
}