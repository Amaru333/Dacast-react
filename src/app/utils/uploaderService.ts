const BASE_PATH = "https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev"
export const MIN_CHUNK_SIZE = 5000000 //
export const FILE_CHUNK_SIZE = 10000000 // 10MB
const MAX_ULRS_REQUEST = 100
const MAX_MULTI_THREADING_REQUESTS = 5
import axios, { AxiosResponse } from 'axios'
import { isTokenExpired, addTokenToHeader } from './token'

const CancelToken = axios.CancelToken;
export const source = CancelToken.source();

let pausedRequests: any = []


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
            cancelToken: source.token,
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

axios.interceptors.request.use((request) => {
    console.log('request', request)
    pausedRequests.push(request)
    console.log(pausedRequests)
    return Promise.resolve(request);
}, (error) => {
    if (error.config && error.response) {
        console.log('error request',axios.request(error.config))
        console.log('error request object', error)
    }
    return Promise.reject(error);
  }
)

axios.interceptors.response.use((response) => {
    console.log('response', response)
    pausedRequests = pausedRequests.filter(item => item.url !== response.config.url)
    console.log(pausedRequests)
    return Promise.resolve(response);
}, (error) => {
    if (error.config && error.response) {
        console.log('error response',axios.request(error.config))
        console.log('error response object', error)
    }
    return Promise.reject(error);
  }
)

const requestsBatch = async (uploadId: string, batchStart: number, batchEnd: number, urlS3: string, file: File, Etags: any, nbChunks: number, fileSize: number, updateItem: Function) => {
    let urls = await retrieveChunkPresignedURL(uploadId, batchStart, batchEnd, urlS3)
    console.log('entering batch with first chunk no', batchStart)
    for(let index = batchStart; index < batchEnd; index += MAX_MULTI_THREADING_REQUESTS) {

        let multiThreadRequests = Array.from({length: MAX_MULTI_THREADING_REQUESTS})
        let test = multiThreadRequests.map((v, i) => {
            let start = ((index + i) - 1) * FILE_CHUNK_SIZE
            let end = (index + i) * FILE_CHUNK_SIZE
            if((index + i) <= urls.length) {
                let chunk = (index + i < nbChunks) ? file.slice(start, end) : file.slice(start)
                return axios.put(urls[index + i - 1], chunk, {
                    cancelToken: source.token,
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
                    console.log(error)
                    if (axios.isCancel(error)) {
                        console.log('post Request canceled');
                      }
                    throw new Error(error)
                })
            }
        })
        
        await axios.all(test)
        .then(axios.spread((...respnses) => {
        })).catch(errors => {
            console.log(errors)
        })
    }
}

const multiPartUploadRefactored = async (keyPrefix: string, file: File, updateItem: Function) => {
    let Etags: any = []
    try {
        try {
            var res = await initMultiPart(file.name);

            const FILE_SIZE = file.size
            const NUM_CHUNKS = Math.ceil(FILE_SIZE / FILE_CHUNK_SIZE)

            let currentBatch = 1
            while(currentBatch < NUM_CHUNKS) {
                
                if(currentBatch + MAX_ULRS_REQUEST < NUM_CHUNKS) {
                    await requestsBatch(res.uploaderID, currentBatch, currentBatch + MAX_ULRS_REQUEST, res.s3Path, file, Etags, NUM_CHUNKS, FILE_SIZE, updateItem)
                } else {
                    await requestsBatch(res.uploaderID, currentBatch, currentBatch + (NUM_CHUNKS - currentBatch), res.s3Path, file, Etags, NUM_CHUNKS, FILE_SIZE, updateItem)
                }
                console.log(currentBatch)
                currentBatch += MAX_ULRS_REQUEST
            }

        } catch(error) {
            throw new Error(error)
        }
        let completeUploadResp = await completeMultipart(res.uploaderID, Etags, res.s3Path)
        
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
            cancelToken: source.token,
            onUploadProgress: (event) => updateItem(event)
        })
    } catch(error) {
        throw new Error(error);
    }
}
export const upload = async (file: File, updateItem: Function) => {

    try {
        let keyPrefix = "";

        if (file.size < MIN_CHUNK_SIZE) {
            await singlePartUpload(keyPrefix, file, updateItem)
        }
        else {
            await multiPartUploadRefactored(keyPrefix, file, updateItem)
        }
    } catch (error) {
        throw new Error(error);
    }
}



