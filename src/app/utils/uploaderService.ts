import axios, { AxiosResponse } from 'axios'
import { isTokenExpired, addTokenToHeader } from './token'

export class UploadObject {

    constructor(
        file: File,
        uploadUrlBatchSize: number,
        maxMultiThreadingRequests: number,
        fileChunkSize: number,
        onProgressUpdate: (percent: number) => void,
        onError: (error: any) => void
    ) {
        this.file = file
        this.uploadUrlBatchSize = uploadUrlBatchSize
        this.maxMultiThreadingRequests = maxMultiThreadingRequests
        this.fileChunkSize = fileChunkSize
        this.onProgressUpdate = onProgressUpdate
        this.onError = onError
        this.requestBatch = this.requestBatch.bind(this)
        this.uploadPart = this.uploadPart.bind(this)
        this.getUploadUrl = this.getUploadUrl.bind(this)
    }

    private file: File
    private uploadUrlBatchSize: number
    private maxMultiThreadingRequests: number
    private fileChunkSize: number
    private onProgressUpdate: (percent: number) => void
    private onError: (error: any) => void
    uploadId: string
    urlS3: string
    ETags: { partNumber: number; etag: string }[] = []
    uploadUrls: string[] = []
    hasStarted: boolean = false
    isCompleted: boolean = false
    execCancel: () => {}
    token: any
    totalUploadedBytes: number = 0
    nextStart: number = 0
    onGoingUploads: { [partNumber: number]: true } = {}

    public getFileName() {
        return this.file.name
    }

    public async startUpload() {
        if (this.hasStarted) {
            throw new Error('Upload has alredy started.')
        }
        console.log('starting upload')
        this.hasStarted = true
        this.createCancelToken()
        if (this.fileChunkSize >= this.file.size) {
            this.singlePartUpload()
        } else {
            await this.initUpload()
            this.runUpload()
        }
    }

    public pauseUpload() {
        this.execCancel()
        this.createCancelToken()
    }

    public cancelUpload() {
        this.execCancel()
    }
    public async resumeUpload() {
        if (this.fileChunkSize >= this.file.size) {
            this.singlePartUpload()
        } else {
            if (!this.uploadId || !this.urlS3) {
                await this.initUpload()
            }
            this.nextStart = parseInt(Object.keys(this.onGoingUploads)[Object.keys(this.onGoingUploads).length - 1]) + 1
            this.runUpload()
        }
    }

    private createCancelToken() {
        this.token = new axios.CancelToken(function executor(c: any) {
            this.execCancel = c;
        }.bind(this))
    }

    private async initUpload() {
        console.log('init upload for file ', this.file.name)
        await isTokenExpired()
        let { token } = addTokenToHeader();
        let res = await axios.post(`${process.env.API_BASE_URL}/uploads/init-multipart`,
            {
                fileName: this.file.name,
            },
            {
                headers: {
                    Authorization: token
                }
            })
            .catch((error: any) => {
                this.onError('init')
                throw new Error(error)
            })
        this.uploadId = res.data.data.uploaderID
        this.urlS3 = res.data.data.s3Path
    }

    private async getUploadUrl(partNumber: number): Promise<string> {
        if (partNumber >= Math.ceil(this.file.size / this.fileChunkSize)) {
            return null
        }
        if ((partNumber) in this.uploadUrls) {
            return this.uploadUrls[partNumber]
        }
        let newUrlBatch = await this.retrieveChunkPresignedURL(this.uploadUrls.length, this.uploadUrls.length + this.uploadUrlBatchSize)
        this.uploadUrls.push(...newUrlBatch)
        return await this.getUploadUrl(partNumber)

    }
    private retrieveSinglePartURL = async () => {
        await isTokenExpired()
        let { token, vodStorageId, userId } = addTokenToHeader();
        let response = await axios.post(`${process.env.API_BASE_URL}/uploads/signatures/singlepart/`,
            {
                fileName: this.file.name,
                vodStorageID: vodStorageId
            },
            {
                headers: {
                    Authorization: token
                }
            }).catch((error: any) => {
            this.onError('single')
            throw new Error(error)})
        this.uploadUrls.push(response.data.data.presignedURL)
        return this.uploadUrls[0]
    }

    private singlePartUpload = async () => {
        let signedSinglePartURL = await this.retrieveSinglePartURL()
        axios.put(signedSinglePartURL, this.file,
            {
                cancelToken: this.token,
                onUploadProgress: (event: ProgressEvent) => {
                    this.onProgressUpdate(event.loaded / this.file.size * 100)
                },
            }).then(() => {
            this.isCompleted = true;
            this.onProgressUpdate(100);
        } )
            .catch((error: any) => {
                if (!axios.isCancel(error)) {
                    this.onError(error)
                }
                this.onError('Cancel')
                throw new Error(error)
            })
    }

    private retrieveChunkPresignedURL = async (fromPart: number, toPart: number): Promise<string[]> => {
        await isTokenExpired()
        let { token } = addTokenToHeader();
        let res = await axios.post(`${process.env.API_BASE_URL}/uploads/signatures/multipart`,
            {
                s3Path: this.urlS3,
                uploaderID: this.uploadId,
                fromPartNumber: fromPart + 1,
                toPartNumber: toPart
            },
            {
                headers: {
                    Authorization: token
                }
            })
            .catch(function (error) {
                this.onError('multipart')
                throw new Error(error)
            });

        return res.data.data.presignedURLs
    }

    private async uploadPart(partNumber: number): Promise<void> {
        let start = (partNumber) * this.fileChunkSize
        let end = (partNumber + 1) * this.fileChunkSize
        let uploadedBytes = 0
        let chunk = (end < this.file.size) ? this.file.slice(start, end) : this.file.slice(start)
        let uploadUrl = await this.getUploadUrl(partNumber)
        this.onGoingUploads[partNumber] = true
        return uploadUrl ? await axios.put(uploadUrl, chunk, {
            cancelToken: this.token,
            onUploadProgress: (event: ProgressEvent) => {
                this.totalUploadedBytes += event.loaded - uploadedBytes
                uploadedBytes = event.loaded
                this.onProgressUpdate(this.totalUploadedBytes / this.file.size * 100)
            },
        }).then((response: AxiosResponse<any>) => {
            let etagStr: string = response.headers['etag']
            console.log('partNumber', partNumber)
            console.log('etag array', this.ETags)
            etagStr = etagStr.substring(1, etagStr.length - 1)
            this.ETags.push({
                partNumber: partNumber,
                etag: etagStr
            })
            delete this.onGoingUploads[partNumber]
            console.log(this.onGoingUploads)
        }).catch((error: any) => {
            if (!axios.isCancel(error)) {
                this.onError(error)
            }
            this.onError('Cancel')
            throw new Error(error)
        })
            : null
    }

    private async requestBatch(partNumbers: number[]): Promise<void> {
        let batchArray = partNumbers
        let i = 0
        while (i < partNumbers.length) {
            let batch = batchArray.slice(i, i + this.maxMultiThreadingRequests)
            await axios.all(batch.map(this.uploadPart))
            i += this.maxMultiThreadingRequests
        }
    }

    private async completeUpload() {
        await isTokenExpired()
        let { token } = addTokenToHeader();
        await axios.post(`${process.env.API_BASE_URL}/uploads/complete-multipart`,
            {
                orderedETags: this.ETags.sort((a, b) => a.partNumber - b.partNumber).map(ETag => ETag.etag),
                s3Path: this.urlS3,
                uploaderID: this.uploadId,
            },
            {
                headers: {
                    Authorization: token
                }
            })
            .catch((error: any) => {
                this.onError('complete')
                throw new Error(error)
            })
        this.isCompleted = true
        this.onProgressUpdate(100)
    }

    private async runUpload() {
        const nbChunks = Math.ceil(this.file.size / this.fileChunkSize)
        console.log('chunks', nbChunks)
        while (this.nextStart < nbChunks) {
            let nextParts: number[] = []
            if (Object.keys(this.onGoingUploads).length > 0) {
                nextParts.push(...Object.keys(this.onGoingUploads).map(v => parseInt(v)))
            }
            nextParts.push(...Array.from({ length: this.uploadUrlBatchSize }).map((_, i) => i + this.nextStart))
            this.nextStart += this.uploadUrlBatchSize
            await this.requestBatch(nextParts)
        }
        await this.completeUpload()
    }

}

axios.interceptors.response.use(null, (error) => {
    if (error.config && error.response) {
        // TODO: Count nb of retry
        // return axios.request(error.config)
    }
    return Promise.reject(error);
}
)


