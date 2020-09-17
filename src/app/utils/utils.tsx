import { showToastNotification } from '../redux-flow/store/Toasts'
import { updateTitle } from '../redux-flow/store/Title/logic'
import { store } from '..';
import { FolderAsset } from '../redux-flow/store/Folders/types';
import { IconStyle } from '../../shared/Common/Icon';
import React from 'react';

export function updateClipboard(copiedValue: string, toastMessage: string): void {
    navigator.clipboard.writeText(copiedValue).then(function () {
        store.dispatch(showToastNotification(toastMessage, 'fixed', "success"));
    }, function () {
        store.dispatch(showToastNotification("Failed to copy to clipboard", 'fixed', "error"));
    });
}

export const removePrefix = (objectId: string) => {
    return objectId.replace(/channel_|live_|vod_/, '');
}

export function updateTitleApp(title: string): void {
    store.dispatch(updateTitle(title))
}

export const parseContentType = (contentType: string) => {
    return contentType === 'live' ? 'channels' : contentType + 's'
}

export const handleRowIconType = (item: FolderAsset) => {
    switch (item.type) {
        case 'playlist':
            return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.objectID}>playlist_play</IconStyle>
        case 'folder':
            return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.objectID}>folder_open</IconStyle>
        case 'channel':
        case 'live':
        case 'vod':
            return item.thumbnail ? 
                <img key={"thumbnail" + item.objectID} width="auto" height={42} src={item.thumbnail} ></img>
                :                                  
                    <div className='mr1 relative justify-center flex items-center' style={{ width: 94, height: 54, backgroundColor: '#AFBACC' }}>
                        <IconStyle className='' coloricon='gray-1' >play_circle_outlined</IconStyle>
                    </div>
        default:
            return (                                    
                <div className='mr1 relative justify-center flex items-center' style={{ width: 94, height: 54, backgroundColor: '#AFBACC' }}>
                    <IconStyle className='' coloricon='gray-1' >play_circle_outlined</IconStyle>
                </div>
            )
    }
}
