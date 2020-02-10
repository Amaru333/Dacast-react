import React from 'react';
import { FolderTreeNode } from './Folders';
import { InputCheckbox } from '../../components/FormsComponents/Input/InputCheckbox';
import { IconStyle } from './FoldersStyle';
import { Text } from '../../components/Typography/Text';
import { Button } from '../../components/FormsComponents/Button/Button';
import { InputTags } from '../../components/FormsComponents/Input/InputTags';



export const MoveItemModal = (props: {initialSelectedFolder: string, findNode: Function; toggle: Function}) => {

    const [selectedModalFolder, setSelectedModalFolder] = React.useState<string>(null);
    const [currentNode, setCurrentNode] = React.useState<FolderTreeNode>(null);
    const [checkedFolders, setCheckedFolders] = React.useState<string[]>(['']);
    React.useEffect( () => {
        if(!selectedModalFolder) {
            setSelectedModalFolder(props.initialSelectedFolder);
        }
        setCurrentNode(props.findNode(selectedModalFolder))

    }, [props])

    React.useEffect(() => {
        setCurrentNode(props.findNode(selectedModalFolder))
    }, [selectedModalFolder])

    const renderModalNode = () => {
            return currentNode ? Object.values(currentNode.children).map((childNode) => {
                return (
                    <div key={childNode.fullPath} className='col col-12'>
                        <InputCheckbox id={childNode.fullPath + 'Checkbox'} className='col col-1'/>
                        <IconStyle coloricon='gray-7'>folder_open</IconStyle>
                        <Text size={14} weight='reg'>{childNode.fullPath}</Text>
                        <IconStyle onClick={() => setSelectedModalFolder(childNode.fullPath + '*')} coloricon='gray-7'>keyboard_arrow_right</IconStyle>
                    </div>
    
                )
            })
            : null

    }
    return (
        <div>
            {renderModalNode()}
            <InputTags 
                className='col col-12 py1' 
                defaultTags={checkedFolders} 

            />
            <div>
                <Button className='mr2'typeButton='primary' sizeButton='large' buttonColor='blue'>Move</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}