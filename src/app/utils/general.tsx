import { ContentType } from "../redux-flow/store/Common/types"

export const handleImageModalFunction = (imageModalTitle: string, contentType: ContentType ) => {
    if (imageModalTitle === "Change Splashscreen") {
        return `${contentType}-splashscreen`
    } 

    if (imageModalTitle === "Change Thumbnail") {
        return `${contentType}-thumbnail`
    }

    if (imageModalTitle === 'Change Poster') {
        return `${contentType}-poster`
    }

    return `${contentType}-poster`
}