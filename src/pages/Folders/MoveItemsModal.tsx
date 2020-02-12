import React from 'react';
import { FolderTreeNode } from '../../redux-flow/store/Folders/types';
import { InputCheckbox } from '../../components/FormsComponents/Input/InputCheckbox';
import { IconStyle, ModalItemFolderRow } from './FoldersStyle';
import { Text } from '../../components/Typography/Text';
import { Button } from '../../components/FormsComponents/Button/Button';
import { InputTags } from '../../components/FormsComponents/Input/InputTags';
import { getNameFromFullPath } from '../../utils/utils';
import { Breadcrumb } from './Breadcrumb';

export const MoveItemModal = (props: {initialSelectedFolder: string; findNode: Function; toggle: Function}) => {

    const [selectedModalFolder, setSelectedModalFolder] = React.useState<string>(null);
    const [currentNode, setCurrentNode] = React.useState<FolderTreeNode>(null);
    const [checkedFolders, setCheckedFolders] = React.useState<string[]>(['']);

    React.useEffect( () => {
        if(!selectedModalFolder) {
            setSelectedModalFolder(props.initialSelectedFolder);
        }
        setCurrentNode(props.findNode(selectedModalFolder));

    }, [props])

    React.useEffect(() => {
        setCurrentNode(props.findNode(selectedModalFolder));
    }, [selectedModalFolder])

    const handleCheckboxChange = (checkedOption: string) => {
        if(checkedFolders.includes(checkedOption)) {
            setCheckedFolders(checkedFolders.filter(option => {return option !== checkedOption}));
        } else {

            setCheckedFolders([...checkedFolders, checkedOption]);
        }
    }

    const renderModalNode = () => {
        return currentNode ? Object.values(currentNode.children).map((childNode, i) => {
            return (
                <ModalItemFolderRow key={childNode.fullPath} className='col col-12 flex items-center p2'>
                    <InputCheckbox id={childNode.fullPath + 'Checkbox'} defaultChecked={checkedFolders.includes(childNode.fullPath)} className='col col-1' onChange={() => {handleCheckboxChange(childNode.fullPath)}} />
                    <IconStyle coloricon='gray-7'>folder_open</IconStyle>
                    <Text size={14} weight='reg'>{getNameFromFullPath(childNode.fullPath)}</Text>
                    <IconStyle className='flex right mr2' onClick={() => setSelectedModalFolder(childNode.fullPath + '*')} coloricon='gray-7'>keyboard_arrow_right</IconStyle>
                </ModalItemFolderRow>
            )
        })
        : null
    }
    return (
        <div>
            <Breadcrumb options={selectedModalFolder} callback={(value: string) => setSelectedModalFolder(value)} />
            {renderModalNode()}
            <div className='col col-12 my2'>
            <InputTags   
                className='col col-12'            
                defaultTags={checkedFolders.map(folder => getNameFromFullPath(folder))} 

            />
            </div>

            <div className='mt2'>
                <Button className='mr2'typeButton='primary' sizeButton='large' buttonColor='blue'>Move</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>
    )
}