export type ContentType = 'vod' | 'live' | 'playlist' | 'expo'

export type ContentStatus = 'Deleted' | 'Online' | 'Offline' | 'Processing' | 'Restored'

export type BulkActionType = 'delete' | 'create' | 'theme' | 'paywall' | 'online'

export type FolderContentType = ContentType | 'folder'

export type BulkActionContentType = FolderContentType | 'rendition'

export interface BulkActionItem {
    type: BulkActionContentType
    id?: string
    name?: string
}

export interface BulkActionInput {
    items: BulkActionItem[]
    action: BulkActionType
    targetValue?: string | boolean
}

