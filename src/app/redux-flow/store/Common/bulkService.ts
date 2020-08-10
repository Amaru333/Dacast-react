import axios from 'axios'
import { isTokenExpired, addTokenToHeader } from '../../../utils/token'
import { ContentType } from '../Folders/types'

export const bulkActionsService = async (data: ContentType[], action: 'delete' | 'theme' | 'online' | 'paywall' | 'create', targetValue?: string | boolean) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.post(process.env.API_BASE_URL + '/bulk', 
        {
            action: action,
            items: data.map((item: any) => {return {id: item.id, contentType: item.type === 'live' ? 'channel' : item.type, name: item.name}}),
            targetValue: targetValue
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}