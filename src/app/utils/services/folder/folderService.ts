import { FolderTreeNode, SubFolder, FolderContent } from '../../../redux-flow/store/Folders/types';
import { formatPutMoveFolderInput } from '../../../redux-flow/store/Folders/viewModel';
import { dacastSdk } from '../axios/axiosClient';

export const rootNode: FolderTreeNode = {
    isExpanded: true,
    name: 'All folders',
    id: '',
    path: '',
    hasChild: true,
    subfolders: 2,
    nbChildren: 2,
    fullPath: '/',
    loadingStatus: 'loaded',
    children: {}
}

export class FolderTree {

    constructor(setTree: React.Dispatch<React.SetStateAction<FolderTreeNode>>, setSelectedFolder: React.Dispatch<React.SetStateAction<FolderTreeNode>>, node?: FolderTreeNode) {
        this.tree = node ? node : rootNode,
        this.setTree = setTree
        this.setSelectedFolder = setSelectedFolder
        this.goToNode = this.goToNode.bind(this)
        this.addFolder = this.addFolder.bind(this)
        this.renameFolder = this.renameFolder.bind(this)
        this.deleteFolders = this.deleteFolders.bind(this)
        this.changeSubfoldersPaths = this.changeSubfoldersPaths.bind(this)
    }

    private tree: FolderTreeNode

    public getTree() {
        return this.tree
    }

    public setTree: React.Dispatch<React.SetStateAction<FolderTreeNode>>

    public setSelectedFolder: React.Dispatch<React.SetStateAction<FolderTreeNode>>

    public async initTree() {
        await this.loadChildren(rootNode)
    }

    private async fetchChildren(parentNodeId: string, parentPath: string) {
        let fetchedNode: SubFolder
        return await dacastSdk.getFolderChildren(parentNodeId)
        .then((response) => {
            fetchedNode = response.folders.reduce((reduced: SubFolder, item) => {
                return {
                    ...reduced,
                    [item.name]: {
                        ...item,
                        loadingStatus: 'not-loaded',
                        nbChildren: item.hasChild ? 1 : 0,
                        subfolders: item.hasChild ? 1 : 0,
                        fullPath: parentPath + item.name + '/',
                        children: {},
                        isExpanded: false
                    }
                }
            }, {})
            return fetchedNode
        }).catch((error) => {
            throw new Error(error)
        })    
    }

    private async loadChildren(node: FolderTreeNode) {
        node.loadingStatus = 'loading'
        let children: SubFolder  = await this.fetchChildren(node.id, node.fullPath)
        node.children = Object.keys(children).sort().reduce((acc, next) => {
            return {...acc, [next]: children[next]}
          }, {})
        node.isExpanded = true
        node.loadingStatus = 'loaded'
        this.setTree({...this.tree})

    }

    private async getNode(root: FolderTreeNode, searchedFolder: string) {
        let pathElements = searchedFolder.split('/').filter(f => f)

        if (pathElements.length === 0) {
            return root
        }
        let currentNode = root
        while (currentNode.fullPath !== searchedFolder) {

            if (Object.keys(currentNode.children).length === 0 && currentNode.subfolders !== 0) {
                await this.loadChildren(currentNode)
            }

            let pathElement = pathElements.shift()
            let foundChild = currentNode.children[pathElement]
            if (!foundChild) {
                throw new Error('path doesnt exist: ' + pathElement + ' (of ' + searchedFolder + ')')
            }
            currentNode = foundChild
        }
        if (Object.values(currentNode.children).length === 0 && currentNode.subfolders !== 0) {
            await this.loadChildren(currentNode)
        }
        return currentNode
    }

    public async goToNode(searchedFolder: string) {
        return await this.getNode(this.tree, searchedFolder);
    }

    public expandFolder = (node: FolderTreeNode) => {
        if (node.loadingStatus === 'not-loaded' && !node.isExpanded) {
            this.loadChildren(node)
            return
        }
        node.isExpanded = !node.isExpanded
        this.setTree({...this.tree})
    }

    public navigateToFolder(node: FolderTreeNode) {
        this.setSelectedFolder(node)
        if(!node.subfolders) {
            return
        }
        if (node.loadingStatus === 'loading') {
            return
        }
        this.setTree({ ...this.tree });
    }

    public async addFolder(folderName: string, fullpath: string) {
        let node = await this.getNode(this.tree, fullpath)
        return await dacastSdk.postFolder(
            {
                fullPath: fullpath + folderName
            }
        ).then(response => {
            let newChild: SubFolder = {
                [folderName]: {
                    isExpanded: false,
                    name: folderName,
                    id: response.id,
                    path: fullpath,
                    hasChild: false,
                    subfolders: 0,
                    nbChildren: 0,
                    fullPath: fullpath + folderName + '/',
                    loadingStatus: 'not-loaded',
                    children: {}
                }
            }

            if(Object.values(node.children).length === 0) {
                node.hasChild = true
                node.isExpanded = true
                node.loadingStatus = 'loaded'
                node.nbChildren = 1
                node.subfolders = 1
            }

            node.children = {
                ...node.children,
                ...newChild
            }
            this.setTree({...this.tree})
            return folderName
        }).catch(error => {
            throw new Error(error)
        })
    }

    public async renameFolder(newName: string, fullPath: string) {
        let node = await this.getNode(this.tree, fullPath)
        return await dacastSdk.putRenameFolder(
            {
                newName: newName,
                id: node.id

            }
        ).then(() => {
            node.name = newName
            this.changeSubfoldersPaths(node.fullPath, node.path + newName, node)
            this.setTree({...this.tree})
            node.fullPath = node.fullPath + "/";
            return newName
        }).catch(error => {
            throw new Error(error)
        })
    }

    private changeSubfoldersPaths(previousPath: string, newPath: string, node: FolderTreeNode) {
        if(node.path + node.name !== newPath) {
            node.path = node.path.replace(previousPath, newPath)
        }
        node.fullPath = node.fullPath.replace(previousPath, newPath)

        if(Object.values(node.children).length === 0) {
            return
        }
        Object.values(node.children).map((child: FolderTreeNode) => this.changeSubfoldersPaths(previousPath, newPath, child))
    }

    public async deleteFolders(foldersToDelete: string[], fullPath: string) {
        let node = await this.getNode(this.tree, fullPath)
        await dacastSdk.putDeleteFolder(
            {
                folderIds: foldersToDelete

            }
        ).then( async () => {
            if(foldersToDelete.indexOf(node.id) > -1) {
                let parentNode = await this.getNode(this.tree, node.path)
                this.removeNodeFromTree(parentNode, foldersToDelete)
            } else {
                this.removeNodeFromTree(node, foldersToDelete)
            }
            this.setTree({...this.tree})
        }).catch(error => {
            throw new Error(error)
        })
    }

    private removeNodeFromTree(parentNode: FolderTreeNode, nodesIdToRemove: string[]) {
        parentNode.children = Object.values(parentNode.children).filter((child) => nodesIdToRemove.indexOf(child.id) === -1).reduce((reduced: SubFolder, child) => {
            return {
                ...reduced, [child.name]: {...child}
            }
        }, {})
    }

    public async moveToFolder(folderIds: string[], movedContent: FolderContent[], oldFolderId?: string) {
        return await dacastSdk.putMoveFolder(formatPutMoveFolderInput({foldersIds: folderIds, movedContent: movedContent, oldFolderId: oldFolderId}))
        .then(response => {
            return response
        }).catch(error => {
            throw new Error(error)
        })
    }
}