import axios from 'axios';
import { FolderAsset } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getFolders = async (folderPath: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/folders?parentID=' + folderPath, 
        {
            headers: {
                Authorization: token
            }
        }
    )}

const getFolderContent = (folderPath: string) => {
    return axios.get(urlBase + 'folder-content?path=' + folderPath)
}

const moveItemsToFolder = (foldersPath: string[], items: FolderAsset[]) => {
    return axios.post(urlBase + 'folder/moveItems', {data: {foldersPath: foldersPath, items: items}})
}

const addFolder = async (folderPath: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/folders', 
        {
            fullPath: folderPath
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const deleteFolder = async (folderIds: string[]) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.put('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/folders/delete', 
        {
            folderIds: folderIds
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const deleteContent = (content: FolderAsset[]) => {
    return axios.delete(urlBase + 'folder/content', {data: content})
}

const restoreContent = (content: FolderAsset[]) => {
    return axios.put(urlBase + 'folder/content', {data: content})
}
const renameFolder = async (folderPath: string, newName: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.put('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/folders/rename', 
        {
            oldPath: folderPath,
            newName: newName
        },
        {
            headers: {
                Authorization: token
            }
        }
    )}

export const FoldersServices = {
    getFolders,
    getFolderContent,
    moveItemsToFolder,
    addFolder,
    deleteFolder,
    deleteContent,
    restoreContent,
    renameFolder
}
