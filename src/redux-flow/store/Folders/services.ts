import axios from 'axios';
import { FolderAsset } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getFolders = (folderPath: string) => {
    return axios.get(urlBase +  'folder?path=' + folderPath)
}

const getFolderContent = (folderPath: string) => {
    return axios.get(urlBase + 'folder-content?path=' + folderPath)
}

const moveItemsToFolder = (foldersPath: string[], items: FolderAsset[]) => {
    return axios.post(urlBase + 'folder/moveItems', {data: {foldersPath: foldersPath, items: items}})
}

const addFolder = (folderPath: string) => {
    return axios.post(urlBase + 'folder', {data: folderPath})
}

const deleteFolder = (folderPath: string) => {
    return axios.delete(urlBase + 'folder', {data: folderPath})
}

const deleteContent = (content: FolderAsset[]) => {
    return axios.delete(urlBase + 'folder/content', {data: content})
}

const restoreContent = (content: FolderAsset[]) => {
    return axios.put(urlBase + 'folder/content', {data: content})
}
const renameFolder = (folderPath: string, newName: string) => {
    return axios.put(urlBase + 'folder', {data: {folderPath: folderPath, newName: newName}})
}

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
