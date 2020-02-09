import React from 'react';
import { FolderTreeNode } from './Folders';
import { InputCheckbox } from '../../components/FormsComponents/Input/InputCheckbox';
import { IconStyle } from './FoldersStyle';
import { Text } from '../../components/Typography/Text';
import { Button } from '../../components/FormsComponents/Button/Button';



export const MoveItemModal = (props: {folders: FolderTreeNode, initialSelectedFolder: string, getChildren: Function; toggle: Function}) => {

    const [selectedModalFolder, setSelectedModalFolder] = React.useState<string>(props.initialSelectedFolder);
    const [currentNode, setCurrentNode] = React.useState<FolderTreeNode>(null)
    React.useEffect(() => {
        setSelectedModalFolder(props.initialSelectedFolder);
        findNode(props.folders)
    }, [props.initialSelectedFolder])

    React.useEffect(() => {}, [currentNode])

    const findNode = (node: FolderTreeNode) => {
        if(node !== null) {
            console.log('Trying to find node' , selectedModalFolder)
            if(node.fullPath === selectedModalFolder) {
                setCurrentNode(node);
                return
            }
            else {
                console.log('Trying to find child node', node)
               const splitNodePath = node.fullPath.split('/');
               const splitSelectedPath = selectedModalFolder.split('/');
               console.log('current node path', splitNodePath)
               console.log('desired node path', splitSelectedPath)
               if(splitNodePath.every((name, index) => name === splitSelectedPath[index])) {
                   Object.values(node.children).map((childNode) => findNode(childNode))
               }
               else {
                   if(node.fullPath === '/') {
                    Object.values(node.children).map((childNode) => findNode(childNode))
                   }
                   else {
                        return
                   }

               }
            }
        }

    }

    const renderModalNode = (node: FolderTreeNode) => {
            return node ? Object.values(node.children).map((childNode) => {
                return (
                    <div key={childNode.fullPath} className='col col-12'>
                        <InputCheckbox id={childNode.fullPath + 'Checkbox'} className='col col-1'/>
                        <IconStyle coloricon='gray-7'>folder_open</IconStyle>
                        <Text size={14} weight='reg'>{childNode.fullPath}</Text>
                        <IconStyle coloricon='gray-7'>keyboard_arrow_right</IconStyle>
                    </div>
    
                )
            })
            : null

    }
    return (
        <div>
            {renderModalNode(currentNode)}
            <div>
                <Button className='mr2'typeButton='primary' sizeButton='large' buttonColor='blue'>Move</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}