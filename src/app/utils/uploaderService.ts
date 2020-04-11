const BASE_PATH = "https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev"
export const MIN_CHUNK_SIZE = 5000000 //
export const FILE_CHUNK_SIZE = 10000000 // 10MB
const MAX_ULRS_REQUEST = 100
const MAX_MULTI_THREADING_REQUESTS = 5
import axios, { AxiosResponse } from 'axios'
import { isTokenExpired, addTokenToHeader } from './token'

const CancelToken = axios.CancelToken;
const source = CancelToken.source();


const  completeMultipart = async (keyPrefix: string, file: File, uploadId: string, allEtags: any, s3Url: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    axios.post(`${BASE_PATH}/uploads/complete-multipart?uploaderId=${uploadId}&s3Path=${s3Url}`,
        JSON.stringify(allEtags),
        {
            // cancelToken: source.token,
            headers: {
                'Authorization': token
            }
        }
    ).then((response: any) => {
    }).catch((error: any) => {
        throw new Error(error)
    });
}

const initMultiPart = async (fileName: string) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return await axios.post(`${BASE_PATH}/uploads/init-multipart`, {'fileName': fileName,'vodStorageID': userId}, 
    {headers: {
        'Authorization': token
    }})
    .then((res) => { return res.data.data })

}

const retrieveChunkPresignedURL = async (uploadId: string, fromPart: number, toPart: number, urlS3: string) => {
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

    if (res.status !== 200) {
        throw new Error("Error retrivieng chunk")
    }
    return await res.data.data.presignedURLs
}

// axios.interceptors.response.use(null, (error) => {
//     if (error.config && error.response && error.response.status >= 401) {
//         return axios.request(error.config);
//     }
//     return Promise.reject(error);
//   });

const requestsBatch = async (uploadId: string, batchStart: number, batchEnd: number, urlS3: string, file: File, Etags: any, nbChunks: number, fileSize: number, updateItem: Function) => {
    let urls = await retrieveChunkPresignedURL(uploadId, batchStart, batchEnd, urlS3)
    
    for(let index = batchStart; index < batchEnd; index += (batchEnd - batchStart)) {
        let start = (index - 1) * FILE_CHUNK_SIZE
        let end = (index) * FILE_CHUNK_SIZE
        let chunk = (index < nbChunks) ? file.slice(start, end) : file.slice(start)

        let multiThreadRequests = Array.from({length: MAX_MULTI_THREADING_REQUESTS})
        let test = multiThreadRequests.map((v, i) => {
            
            // if((index + i) < urls.presigned-urls.length) {
                
                return axios.put(urls[index + i], chunk, {
                    // cancelToken: source.token,
                    onUploadProgress: (event: ProgressEvent) => {
                        let bytesUploaded = FILE_CHUNK_SIZE * (index - 1)
                        updateItem(event, bytesUploaded, fileSize)
                    },
                }).then((response: AxiosResponse<any>) => {
                    let etagStr = response.headers['ETag']
                    etagStr = etagStr.substring(1, etagStr.length - 1)
                    console.log(etagStr)
                    Etags.push(etagStr)
                }).catch((error: any) => {
                    index = nbChunks;
                    console.log(error)
                    throw new Error(error)
                })
            // }
        })
        
        await axios.all(test)
        .then(axios.spread((...respnses) => {
            console.log(respnses)
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
                currentBatch += MAX_ULRS_REQUEST
            }

        } catch(error) {
            throw new Error(error)
        }
        let completeUploadResp = await completeMultipart(keyPrefix, file, res.uploaderID, Etags, res.s3Path)
    } catch (err) {
        throw new Error(err);
    }
}


// const multiPartUpload = async (keyPrefix: string, file: File, updateItem: Function) => {
//     let allEtags: any = []

//     try {
//         var res = await initMultiPart();
//         var uploadId = JSON.parse(res).uploaderId;
//         var urlS3 = JSON.parse(res).s3Path;

//         const FILE_SIZE = file.size
//         const NUM_CHUNKS = Math.ceil(FILE_SIZE / FILE_CHUNK_SIZE)

//         let urls = await retrieveChunkPresignedURL(uploadId, 1, NUM_CHUNKS,  urlS3)


//         // doing some math to split the file
//         for (let index = 1; index < NUM_CHUNKS + 1; index++) {
//             let start = (index - 1) * FILE_CHUNK_SIZE
//             let end = (index) * FILE_CHUNK_SIZE
//             let chunk = (index < NUM_CHUNKS) ? file.slice(start, end) : file.slice(start)
//             try {

//                 /** REFACTOR BEGIN */
//                 axios.put(urls.presigned-urls[index - 1], chunk, {
//                     cancelToken: source.token,
//                     onUploadProgress: (event: ProgressEvent) => {
//                         let bytesUploaded = FILE_CHUNK_SIZE * (index - 1)
//                         updateItem(event, bytesUploaded, FILE_SIZE)
//                     },
//                 }).then((response: any) => {
//                     let etagStr = response.headers['ETag']
//                     etagStr = etagStr.substring(1, etagStr.length - 1)

//                     allEtags.push(etagStr)
//                 }).catch((error: any) => {
//                     index = NUM_CHUNKS;
//                     throw new Error(error)
//                 })

//                 /** REFACTOR END */

//                 // let xhr = new XMLHttpRequest()
//                 // xhr.open('PUT', JSON.parse(url).urls[0], true)
//                 // xhr.upload.addEventListener("progress", function (event) {
//                 //     let bytesUploaded = FILE_CHUNK_SIZE * (index - 1)
//                 //     updateItem(event, bytesUploaded, FILE_SIZE)
//                 // }, false)

//                 // let upload = new Promise(function (resolve, reject) {
//                 //     xhr.send(chunk)
//                 //     xhr.addEventListener("load", function (event) {
//                 //         let etagStr = xhr.getResponseHeader('ETag')
//                 //         etagStr = etagStr.substring(1, etagStr.length - 1)

//                 //         allEtags.push(etagStr)
//                 //         resolve()
//                 //     })
//                 //     xhr.onabort = () => {
//                 //         resolve(false);
//                 //         index = NUM_CHUNKS;
//                 //     }
//                 // })
//                 // document.addEventListener('paused' + file.name, function (e) {
//                 //     xhr.abort();
//                 // }, false);

//                 // await upload
//             } catch (err) {
//                 throw new Error(err)
//             }
//         }

//         let completeUploadResp = await completeMultipart(keyPrefix, file, uploadId, allEtags, urlS3)
//     } catch (err) {
//         throw new Error(err);
//     }
// }

const retrieveSinglePartURL = async () => {
    let url: string = null
    await isTokenExpired()
    let {token} = addTokenToHeader();
    await axios.get(`${BASE_PATH}/uploads/signatures/singlepart/`, {headers: {
        'Authorization': token
    }})
    .then((response: any) => {
        url = response.data.data
    }).catch((error: any) => {
        throw new Error(error)
    })
    return url
}


const singlePartUpload = async (keyPrefix: string, file: File, updateItem: Function) => {

    let signedSinglePartURL = await retrieveSinglePartURL()
    /** REFACTOR BEGIN */
    axios.put(JSON.parse(signedSinglePartURL).url, file, {
        cancelToken: source.token,
        onUploadProgress: (event) => updateItem(event)
    }).then(() => {

    }).catch((error: any) => {
        throw new Error(error)
    })

    /** REFACTOR END */

    // let xhr = new XMLHttpRequest()
    // xhr.open('PUT', JSON.parse(signedSinglePartURL).url, true)
    // xhr.upload.addEventListener("progress", updateItem, false)

    // try {
    //     let upload = new Promise(function (resolve, reject) {
    //         xhr.send(file)
    //         xhr.addEventListener("load", function (event) { resolve() })
    //         xhr.onabort = () => resolve(false)
    //     })
    //     document.addEventListener('paused' + file.name, function (e) {
    //         xhr.abort();
    //     }, false);
    // } catch (err) {
    //     throw new Error(err)
    // }
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
    } catch (err) {
        throw new Error(err);
    }
}

source.cancel('Operation canceled by the user.');

