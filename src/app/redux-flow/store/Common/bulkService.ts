import axios from 'axios'
import { isTokenExpired, addTokenToHeader } from '../../../utils/token'
import { ContentType } from '../Folders/types'

export const bulkActionsService = async (data: ContentType[], action: string, targetValue?: string | boolean) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.post(process.env.API_BASE_URL + '/bulk', 
        {
            action: action,
            items: data.map((item: ContentType) => {return {id: item.id, contentType: item.type}}),
            targetValue: targetValue
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}