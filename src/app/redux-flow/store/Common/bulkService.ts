import axios from 'axios'
import { isTokenExpired, addTokenToHeader } from '../../../utils/token'
import { ContentType } from '../Folders/types'

export const bulkActionsService = async (data: ContentType[], action: string, targetValue?: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/bulk', 
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