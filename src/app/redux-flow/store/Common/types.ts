export type ContentType = 'vod' | 'live' | 'playlist' | 'expo'

export type ContentStatus = 'Deleted' | 'Online' | 'Offline' | 'Processing' | 'Restored'

export type BulkActionType = 'delete' | 'create' | 'theme' | 'paywall' | 'online'

export type BulkActionContentType = ContentType | 'rendition'

export type FolderContentType = ContentType | 'folder'

export interface BulkActionInput {
    items: {
        type: BulkActionContentType
        id?: string
        name?: string
    }[]
    action: BulkActionType
    targetValue?: string | boolean
}

