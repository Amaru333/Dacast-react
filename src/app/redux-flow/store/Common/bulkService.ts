import axios from 'axios'
import { ContentType } from '../Folders/types'
import { axiosClient } from '../../../utils/axiosClient'

export const bulkActionsService = async (data: ContentType[], action: 'delete' | 'theme' | 'online' | 'paywall' | 'create', targetValue?: string | boolean) => {
    return await axiosClient.post('/bulk', 
        {
            action: action,
            items: data.map((item: any) => {return {id: item.id, contentType: item.type === 'live' ? 'channel' : item.type, name: item.name}}),
            targetValue: targetValue
        }
    )
}