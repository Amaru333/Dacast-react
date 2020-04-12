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
    try {
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

    } catch(error) {
        throw new Error(error)
    }

}

const initMultiPart = async (fileName: string) => {
    try {
        await isTokenExpired()
        let {token, userId} = addTokenToHeader();
        let res = await axios.post(`${BASE_PATH}/uploads/init-multipart`, {'fileName': fileName,'vodStorageID': userId}, 
        {headers: {
            'Authorization': token
        }})

        return res.data.data

    } catch(error) {
        throw new Error(error)
    }
}

const retrieveChunkPresignedURL = async (uploadId: string, fromPart: number, toPart: number, urlS3: string) => {

    try {
        await isTokenExpired()
        let {token} = addTokenToHeader();
        let res = await axios.post(`${BASE_PATH}/uploads/signatures/multipart`, 
        {'s3Path': urlS3,
            'uploaderID': uploadId,
            'fromPartNumber': fromPart,
            'toPartNumber': toPart
        },
        {headers: {
            'Authorization': token
        }})

        return res.data.data.presignedURLs


    } catch(error) {
        throw new Error(error)
    }
}

axios.interceptors.response.use((response) => {
    return Promise.resolve(response);
}, (error) => {
    if (error.config && error.response) {
    }
    return Promise.reject(error);
  }
)

const requestsBatch = async (uploadId: string, batchStart: number, batchEnd: number, urlS3: string, file: File, Etags: any, nbChunks: number, fileSize: number, updateItem: Function, uploadUrls?: string[]) => {
    let urls = uploadUrls ? uploadUrls : await retrieveChunkPresignedURL(uploadId, batchStart, batchEnd, urlS3)
    let token = new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
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
                        updateItem(event, bytesUploaded, fileSize)
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

const multiPartUploadRefactored = async (keyPrefix: string, file: File, updateItem: Function, uploadUrls?: string[], eTags?: any, uploaderID?: string, s3Path?: string) => {
    let Etags: any = eTags ? eTags : []
    let uploaderId = uploaderID ? uploaderID : null
    let s3path = s3Path ? s3Path : null
    try {
        try {
            if(!uploaderId) {
                var res = await initMultiPart(file.name);
                uploaderId = res.uploaderID
                s3path = res.s3Path
            }

            const FILE_SIZE = file.size
            const NUM_CHUNKS = Math.ceil(FILE_SIZE / FILE_CHUNK_SIZE)
            console.log('etags done', eTags ? eTags.length : -1)
            let currentBatch = eTags ? eTags.length + 1 : 1
            while(currentBatch < NUM_CHUNKS) {
                
                if(currentBatch + MAX_ULRS_REQUEST < NUM_CHUNKS) {
                    await requestsBatch(uploaderId, currentBatch, currentBatch + MAX_ULRS_REQUEST, s3path, file, Etags, NUM_CHUNKS, FILE_SIZE, updateItem, uploadUrls)
                } else {
                    await requestsBatch(uploaderId, currentBatch, NUM_CHUNKS, s3path, file, Etags, NUM_CHUNKS, FILE_SIZE, updateItem, uploadUrls)
                }

                currentBatch += MAX_ULRS_REQUEST
            }

        } catch(error) {
            throw new Error(error)
        }
        let completeUploadResp = await completeMultipart(uploaderId, Etags, s3path)
        
    } catch (error) {      
        throw new Error(error);
    }
}

const retrieveSinglePartURL = async () => {
    try {
        await isTokenExpired()
        let {token} = addTokenToHeader();
        let response = await axios.get(`${BASE_PATH}/uploads/signatures/singlepart/`, {headers: {
            'Authorization': token
        }})
        
        return response.data.data

    } catch(error) {
        throw new Error(error)
    }

}

const singlePartUpload = async (keyPrefix: string, file: File, updateItem: Function) => {

    try {
        let signedSinglePartURL = await retrieveSinglePartURL()
        await axios.put(JSON.parse(signedSinglePartURL).url, file, {
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancel = c;
            }),
            onUploadProgress: (event) => updateItem(event)
        })
    } catch(error) {
        throw new Error(error);
    }
}
export const upload = async (file: File, updateItem: Function, setRemainingUploads?: Function, uploadUrls?: string[], eTags?: string[], uploaderID?: string, s3Path?: string) => {

    try {
        let keyPrefix = "";

        if (file.size < MIN_CHUNK_SIZE) {
            await singlePartUpload(keyPrefix, file, updateItem)
        }
        else {
            await multiPartUploadRefactored(keyPrefix, file, updateItem, uploadUrls, eTags, uploaderID, s3Path)
        }
    } catch (error) {
        setRemainingUploads(remainingUploads)
        throw new Error(error);
    }
}



