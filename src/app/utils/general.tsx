import { editContentDetailsAction } from '../redux-flow/store/Content/General/actions';
import { ContentDetails } from '../redux-flow/store/Content/General/types';
import { userToken } from './services/token/tokenService';

export const userId = userToken.getUserInfoItem('user-id')

export const handleImageModalFunction = (imageModalTitle: string, contentType: string ) => {
    if (imageModalTitle === "Change Splashscreen") {
        return `${contentType}-splashscreen`
    } else if (imageModalTitle === "Change Thumbnail") {
        return `${contentType}-thumbnail`
    } else if (imageModalTitle === 'Change Poster') {
        return `${contentType}-poster`
    } else {
        return `${contentType}-poster`
    }
}