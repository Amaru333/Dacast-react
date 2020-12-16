export type ContentType = 'vod' | 'live' | 'playlist' | 'expo'

export type ContentStatus = 'Deleted' | 'Online' | 'Offline' | 'Processing'

export type BulkActionType = 'delete' | 'create' | 'theme' | 'paywall' | 'online'

export type BulkActionContentType = ContentType | 'rendition'

