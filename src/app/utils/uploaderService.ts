const BASE_PATH = "https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev"
export const MIN_CHUNK_SIZE = 5000000 //
export const FILE_CHUNK_SIZE = 10000000 // 10MB
const MAX_ULRS_REQUEST = 100
const MAX_MULTI_THREADING_REQUESTS = 5
import axios, { AxiosResponse } from 'axios'
import { isTokenExpired, addTokenToHeader } from './token'

const CancelToken = axios.CancelToken;
export let cancel: any
let remainingUploads: any = {}

const  completeMultipart = async (uploadId: string, allEtags: any, s3Url: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    let response = await axios.post(`${BASE_PATH}/uploads/complete-multipart`,
    {
        'orderedETags': allEtags.sort((a, b) => (a.index > b.index) ? 1 : -1).map((ETag: {'index': number, 'etag': string}) => {return ETag.etag}),
        's3Path': s3Url,
        'uploaderID': uploadId
    },
    {
        headers: {
            'Authorization': token
        }
    })

    return response

}

const initMultiPart = async (fileName: string) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    let res = await axios.post(`${BASE_PATH}/uploads/init-multipart`, {'fileName': fileName,'vodStorageID': userId}, 
    {
        headers: {
            'Authorization': token
        }
    })
    return res.data.data
}

const retrieveChunkPresignedURL = async (uploadId: string, fromPart: number, toPart: number, urlS3: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    let res = await axios.post(`${BASE_PATH}/uploads/signatures/multipart`, 
    {
        's3Path': urlS3,
        'uploaderID': uploadId,
        'fromPartNumber': fromPart,
        'toPartNumber': toPart
    },
    {
        headers: {       
            'Authorization': token
        }
    })

    return res.data.data.presignedURLs
}

axios.interceptors.response.use(null, (error) => {
    if (error.config && error.response) {
    }
    return Promise.reject(error);
  }
)

const requestsBatch = async (uploadId: string, batchStart: number, batchEnd: number, urlS3: string, file: File, Etags: any, nbChunks: number, updateItem: Function, uploadUrls?: string[]) => {
    let urls = uploadUrls ? uploadUrls : await retrieveChunkPresignedURL(uploadId, batchStart, batchEnd, urlS3)
    let token = new CancelToken(function executor(c) {
        cancel = c;
    })
    
    for(let index = batchStart; index < batchEnd; index += MAX_MULTI_THREADING_REQUESTS) {
        console.log(`starting batch with startValue ${index} and end value ${batchEnd}`)
        let multiThreadRequests = Array.from({length: MAX_MULTI_THREADING_REQUESTS})
        let test = multiThreadRequests.map((v, i) => {
            let start = ((index + i) - 1) * FILE_CHUNK_SIZE
            let end = (index + i) * FILE_CHUNK_SIZE
            if((index + i) <= urls.length) {
                let chunk = (index + i < nbChunks) ? file.slice(start, end) : file.slice(start)
                return axios.put(urls[index + i - 1], chunk, {
                    cancelToken: token,
                    onUploadProgress: (event: ProgressEvent) => {
                        let bytesUploaded = FILE_CHUNK_SIZE * ((index + i) - 1)
                        updateItem(event, bytesUploaded, file.size)
                    },
                }).then((response: AxiosResponse<any>) => {
                    let etagStr = response.headers['etag']
                    etagStr = etagStr.substring(1, etagStr.length - 1)
                    let etagObject = {'index': index + i, 'etag': etagStr}
                    Etags.push(etagObject)
                }).catch((error: any) => {
                    index = nbChunks;
                    if (axios.isCancel(error)) {
                        console.log('post Request canceled');
                        remainingUploads = {uploadUrls: urls, ETags: Etags, uploaderID: uploadId, s3Path: urlS3}
                        
                      }
                    throw new Error(error)
                })
            }
        })
        
        await axios.all(test)
    }
}

const multiPartUploadRefactored = async (file: File, updateItem: Function, uploadUrls?: string[], eTags?: any, uploaderID?: string, s3Path?: string) => {
    let Etags: any = eTags ? eTags : []
    let uploaderId = uploaderID ? uploaderID : null
    let s3path = s3Path ? s3Path : null
    if(!uploaderId) {
        var res = await initMultiPart(file.name);
        uploaderId = res.uploaderID
        s3path = res.s3Path
    }
    const NUM_CHUNKS = Math.ceil(file.size / FILE_CHUNK_SIZE)
    let currentBatch = eTags ? eTags.length + 1 : 1
    while(currentBatch < NUM_CHUNKS) {
        
        if(currentBatch + MAX_ULRS_REQUEST < NUM_CHUNKS) {
            await requestsBatch(uploaderId, currentBatch, currentBatch + MAX_ULRS_REQUEST, s3path, file, Etags, NUM_CHUNKS, updateItem, uploadUrls)
        } else {
            await requestsBatch(uploaderId, currentBatch, NUM_CHUNKS, s3path, file, Etags, NUM_CHUNKS, updateItem, uploadUrls)
        }

        currentBatch += MAX_ULRS_REQUEST
    }
    await completeMultipart(uploaderId, Etags, s3path)
}

const retrieveSinglePartURL = async () => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    let response = await axios.get(`${BASE_PATH}/uploads/signatures/singlepart/`, 
    {
        headers: {
        
            'Authorization': token
        }
    })
    
    return response.data.data

}

const singlePartUpload = async (file: File, updateItem: Function) => {

    let signedSinglePartURL = await retrieveSinglePartURL()
    await axios.put(JSON.parse(signedSinglePartURL).url, file, {
        cancelToken: new CancelToken(function executor(c) {
            cancel = c;
        }),
        onUploadProgress: (event) => updateItem(event)
    })
}
export const upload = async (file: File, updateItem: Function, setRemainingUploads?: Function, uploadUrls?: string[], eTags?: string[], uploaderID?: string, s3Path?: string) => {

    try {

        if (file.size < MIN_CHUNK_SIZE) {
            await singlePartUpload(file, updateItem)
        }
        else {
            await multiPartUploadRefactored(file, updateItem, uploadUrls, eTags, uploaderID, s3Path)
        }
    } catch (error) {
        setRemainingUploads(remainingUploads)
        throw new Error(error);
    }
}



