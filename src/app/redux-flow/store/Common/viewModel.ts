import { PutUploadFileInput } from '../../../../DacastSdk/common'

export const formatPutUploadFileInput = (data: {data: File, uploadUrl: string}): PutUploadFileInput => {
    let formattedData: PutUploadFileInput = {
        uploadUrl: data.uploadUrl,
        data: data.data
    }

    return formattedData
}