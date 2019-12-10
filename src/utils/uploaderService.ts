const BASE_PATH = "http://localhost:9000"
export const MIN_CHUNK_SIZE = 5000000 //
export const FILE_CHUNK_SIZE = 10000000 // 10MB

export async function upload(file: File, updateItem: Function) {

    let keyPrefix = "";

    if (file.size < MIN_CHUNK_SIZE) {
        await singlePartUpload(keyPrefix, file, updateItem)
    }
    else {
        await multiPartUpload(keyPrefix, file, updateItem)
    }
}

async function multiPartUpload(keyPrefix: string, file: File, updateItem: Function) {
    let allEtags:any = []

    try {
        var uploadId = await initMultiPart(keyPrefix, file)
        const FILE_SIZE = file.size
        const NUM_CHUNKS = Math.ceil(FILE_SIZE / FILE_CHUNK_SIZE)

        // doing some math to split the file
        for (let index = 1; index < NUM_CHUNKS + 1; index++) {
            let start = (index - 1) * FILE_CHUNK_SIZE
            let end = (index) * FILE_CHUNK_SIZE
            let chunk = (index < NUM_CHUNKS) ? file.slice(start, end) : file.slice(start)
            try {
                let xhr = new XMLHttpRequest()
                let url = await retrieveChunkPresignedURL(keyPrefix, file, JSON.parse(uploadId).data, index, index + 1)

                xhr.open('PUT', JSON.parse(url).data[0], true)
                xhr.upload.addEventListener("progress", function (event) {
                    let bytesUploaded = FILE_CHUNK_SIZE * (index - 1)
                    let bytesProgress = event.loaded + bytesUploaded
                    let progressPercent = (bytesProgress / FILE_SIZE) * 100
    
                    updateItem(event, bytesUploaded, FILE_SIZE)
                }, false)


                let upload = new Promise(function (resolve, reject) {
                    xhr.send(chunk)
                    xhr.addEventListener("load", function (event) {
                        let etagStr = xhr.getResponseHeader('ETag')
                        etagStr = etagStr.substring(1, etagStr.length - 1)
                        console.info('uploaded part', index, ' got etag ', etagStr)

                        let etag = {
                            ETag: etagStr,
                            PartNumber: index
                        }

                        allEtags.push(etag)
                        resolve()
                    })
                })

                await upload
            } catch (err) {
                console.error("error put S3 " + err)
                throw new Error('error put s3')
            }
        }

        let completeUploadResp = await completeMultipart(keyPrefix, file, uploadId, allEtags)
        console.info('AllEtags ', allEtags)

        console.info('Multipart Upload Completed')

    } catch (err) {
        console.info(err)
    }
}

async function singlePartUpload(keyPrefix: string, file: File, updateItem: Function) {

    let signedSinglePartURL = await retrieveSinglePartURL(keyPrefix, file)

    let xhr = new XMLHttpRequest()
    xhr.open('PUT', JSON.parse(signedSinglePartURL).data, true)
    xhr.upload.addEventListener("progress", updateItem, false)

    try {
        let upload = new Promise(function (resolve, reject) {
            xhr.send(file)
            xhr.addEventListener("load", function (event) { resolve() })
        })
    } catch (err) {
        console.error("error put S3 " + err)
        throw new Error('error put s3')
    }
}

async function retrieveSinglePartURL(keyPrefix: string, file: File) {
    let res = await fetch(`${BASE_PATH}/single-part-sig`, {
        method: "POST",
        body: JSON.stringify({
            key_prefix: keyPrefix,
            filename: file.name
        })
    })
    if (res.ok) {
        let url = await res.text()
        return url
    } else {
        throw new Error("failed to get signed url:" + res.status)
    }
}

async function initMultiPart(keyPrefix: string, file: File) {
    let res = await fetch(`${BASE_PATH}/init-multipart`, {
        method: "POST",
        body: JSON.stringify({
            key_prefix: keyPrefix,
            filename: file.name
        })
    })
    if (res.ok) {
        let url = await res.text()
        return url
    } else {
        throw new Error("failed to get signed url:" + res.status)
    }
}



async function retrieveChunkPresignedURL(keyPrefix: string, file: File, uploadId: string, partNumber: number, nbChunks: number) {
    let res = await fetch(`${BASE_PATH}/parts-multipart`, {
        method: 'POST',
        body: JSON.stringify({
            key_prefix: keyPrefix,
            filename: file.name,
            to_part_number: nbChunks.toString(),
            from_part_number: partNumber.toString(),
            upload_id: uploadId
        })
    })

    if (!res.ok) {
        console.error("failed to get part etag:" + res.status)
        throw new Error('failed to get part etag')
    }
    return await res.text()
}


async function completeMultipart(keyPrefix: string, file: File, uploadId: string, allEtags: any) {
    console.info(JSON.stringify(allEtags))
    await fetch(`${BASE_PATH}/complete-multipart`, {
        method: 'POST',
        body: JSON.stringify({
            key_prefix: keyPrefix,
            filename: file.name,
            parts: allEtags,
            upload_id: JSON.parse(uploadId).data
        })
    }).then(() => {
        console.info("file:" + file + " " + uploadId + "mulitpart is completed")
    }).catch(err => {
        throw new Error("error multipart complete error " + err)
    })
}