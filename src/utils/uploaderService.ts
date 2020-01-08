const BASE_PATH = "https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev"
export const MIN_CHUNK_SIZE = 5000000 //
export const FILE_CHUNK_SIZE = 10000000 // 10MB
const axios = require('axios');

async function completeMultipart(keyPrefix: string, file: File, uploadId: string, allEtags: any, s3Url: string) {
    axios({
        url: `${BASE_PATH}/complete-multipart-upload?uploaderId=${uploadId}&s3Path=${s3Url}`,
        method: 'post',
        data: JSON.stringify(allEtags)
    }).then((response: any) => {
        console.log(response);
    })
        .catch((error: any) => {
            console.log(error);
            throw new Error(error)
        });

}


async function initMultiPart(keyPrefix: string, file: File) {
    return await fetch(`${BASE_PATH}/init-multipart-upload?vodStorageId=george`, {
        method: "POST"
    }).then(res => { return res.text() })

}



async function retrieveChunkPresignedURL(keyPrefix: string, file: File, uploadId: string, partNumber: number, nbChunks: number, urlS3: string) {
    console.log("jwfw");
    let res = await fetch(`${BASE_PATH}/multipart-upload-urls?s3Path=${urlS3}&toPart=${nbChunks.toString()}&fromPart=${partNumber.toString()}&uploaderId=${uploadId}&vodStorageId=george`, {
        method: 'GET',
    })

    if (!res.ok) {
        throw new Error("Error retrivieng chunk")
    }
    return await res.text()
}


async function multiPartUpload(keyPrefix: string, file: File, updateItem: Function) {
    let allEtags: any = []

    try {
        var res = await initMultiPart(keyPrefix, file);
        console.log(res);
        var uploadId = JSON.parse(res).uploaderId;
        var urlS3 = JSON.parse(res).s3Path;

        const FILE_SIZE = file.size
        const NUM_CHUNKS = Math.ceil(FILE_SIZE / FILE_CHUNK_SIZE)

        // doing some math to split the file
        for (let index = 1; index < NUM_CHUNKS + 1; index++) {
            let start = (index - 1) * FILE_CHUNK_SIZE
            let end = (index) * FILE_CHUNK_SIZE
            let chunk = (index < NUM_CHUNKS) ? file.slice(start, end) : file.slice(start)
            try {
                let xhr = new XMLHttpRequest()
                console.log("jwfw");
                let url = await retrieveChunkPresignedURL(keyPrefix, file, uploadId, index, index + 1, urlS3)
                console.log(url);
                xhr.open('PUT', JSON.parse(url).urls[0], true)
                xhr.upload.addEventListener("progress", function (event) {
                    let bytesUploaded = FILE_CHUNK_SIZE * (index - 1)
                    updateItem(event, bytesUploaded, FILE_SIZE)
                }, false)

                let upload = new Promise(function (resolve, reject) {
                    xhr.send(chunk)
                    xhr.addEventListener("load", function (event) {
                        let etagStr = xhr.getResponseHeader('ETag')
                        etagStr = etagStr.substring(1, etagStr.length - 1)

                        allEtags.push(etagStr)
                        resolve()
                    })
                    xhr.onabort = () => {
                        resolve(false);
                        index = NUM_CHUNKS;
                    }
                })
                document.addEventListener('paused' + file.name, function (e) {
                    xhr.abort();
                }, false);

                await upload
            } catch (err) {
                console.log(err);
                throw new Error(err)
            }
        }

        let completeUploadResp = await completeMultipart(keyPrefix, file, uploadId, allEtags, urlS3)
    } catch (err) {
        throw new Error(err);
    }
}

async function retrieveSinglePartURL(keyPrefix: string, file: File) {
    let res = await fetch(`${BASE_PATH}/single-part-upload-url?vodStorageId=george`, {
        method: "GET"
    })
    if (res.ok) {
        let url = await res.text()
        return url
    } else {
        throw new Error("Error retrieving url")
    }
}


async function singlePartUpload(keyPrefix: string, file: File, updateItem: Function) {

    let signedSinglePartURL = await retrieveSinglePartURL(keyPrefix, file)

    let xhr = new XMLHttpRequest()
    xhr.open('PUT', JSON.parse(signedSinglePartURL).url, true)
    xhr.upload.addEventListener("progress", updateItem, false)

    try {
        let upload = new Promise(function (resolve, reject) {
            xhr.send(file)
            xhr.addEventListener("load", function (event) { resolve() })
            xhr.onabort = () => resolve(false)
        })
        document.addEventListener('paused' + file.name, function (e) {
            xhr.abort();
        }, false);
    } catch (err) {
        throw new Error(err)
    }
}




export async function upload(file: File, updateItem: Function) {

    try {
        let keyPrefix = "";

        if (file.size < MIN_CHUNK_SIZE) {
            await singlePartUpload(keyPrefix, file, updateItem)
        }
        else {
            await multiPartUpload(keyPrefix, file, updateItem)
        }
    } catch (err) {
        throw new Error(err);
    }
}
