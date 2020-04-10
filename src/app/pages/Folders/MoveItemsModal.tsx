import React from 'react';
import { FolderTreeNode } from '../../redux-flow/store/Folders/types';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { ModalItemFolderRow, MoveFoldersContainer } from './FoldersStyle';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { getNameFromFullPath } from '../../../utils/utils';
import { Breadcrumb } from './Breadcrumb';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { InputTags } from '../../../components/FormsComponents/Input/InputTags';
import { IconStyle } from '../../../shared/Common/Icon';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { ActionIcon } from '../../shared/ActionIconStyle';

export const MoveItemModal = (props: {initialSelectedFolder: string; goToNode: (searchedFolder: string) => Promise<FolderTreeNode>; toggle: Function; newFolderModalToggle: Function}) => {

    const [selectedModalFolder, setSelectedModalFolder] = React.useState<string>(props.initialSelectedFolder);
    const [currentNode, setCurrentNode] = React.useState<FolderTreeNode>(null);
    const [checkedFolders, setCheckedFolders] = React.useState<string[]>([]);

    React.useEffect( () => {
        if(!selectedModalFolder) {
            setSelectedModalFolder(props.initialSelectedFolder);
            return
        }
    }, [props])

    React.useEffect(() => {
        setCurrentNode({
            ...currentNode,
            loadingStatus: 'loading',
            children: {}
        });
        props.goToNode(selectedModalFolder)
            .then((node) => {
                setCurrentNode(node);
            })
    }, [selectedModalFolder])

    const handleCheckboxChange = (checkedOption: string) => {
        if(checkedFolders.includes(checkedOption)) {
            setCheckedFolders(checkedFolders.filter(option => {return option !== checkedOption}));
        } else {
            setCheckedFolders([...checkedFolders, checkedOption]);
        }
    }

    const handleModalFolderRowClick = (node: FolderTreeNode) => {
        if(node.subfolders > 0) {
            setSelectedModalFolder(node.fullPath)
        }
    }

    const renderModalNode = () => {
        if(currentNode && currentNode.loadingStatus === 'loading') {
            return <LoadingSpinner center size='medium' className="mx-auto block" color='blue'/> 
        }
        return currentNode ? Object.values(currentNode.children).map((childNode, i) => {            
            return (
                <ModalItemFolderRow onDoubleClick={() => handleModalFolderRowClick(childNode)} selected={checkedFolders.includes(getNameFromFullPath(childNode.fullPath))} key={childNode.fullPath} className='col col-12 flex items-center py2 pl2 pointer'>
                    <div className="col col-11 flex">
                    <InputCheckbox className="mr2" id={childNode.fullPath + 'Checkbox'} defaultChecked={checkedFolders.includes(getNameFromFullPath(childNode.fullPath))} onChange={() => {handleCheckboxChange(getNameFromFullPath(childNode.fullPath))}} />
                    <IconStyle coloricon='gray-7'>folder_open</IconStyle>
                    <Text className='pl2' size={14} weight='reg'>{getNameFromFullPath(childNode.fullPath)}</Text>
                    </div>
                    
                    <div  className='flex justify-end col col-1'>
                        {
                            childNode.loadingStatus === 'loading' ?
                                <LoadingSpinner size='small' color='red'/> 
                                : 
                                <div>
                                    <ActionIcon id={"subfolderTooltip" + i} className={childNode.subfolders === 0 ? 'hide' : ''}>
                                        <IconStyle   onClick={() => handleModalFolderRowClick(childNode)} coloricon='gray-3'>keyboard_arrow_right</IconStyle>
                                    </ActionIcon>
                                    
                                    <Tooltip target={"subfolderTooltip" + i}>Go to {getNameFromFullPath(childNode.fullPath)}</Tooltip>
                                </div>
                                
                        }
                    </div>
                    
                </ModalItemFolderRow>
            )
        })
            : null
    }
    return (
        <div>
            <Breadcrumb options={selectedModalFolder} callback={(value: string) => setSelectedModalFolder(value)} />
            <MoveFoldersContainer className="col col-12">
                {renderModalNode()}
            </MoveFoldersContainer>
            <div className='col col-12 my2'>
                <InputTags   
                    className='col col-12'            
                    defaultTags={checkedFolders.map(folder => folder ? getNameFromFullPath(folder) : null)} 
                    callback={(checkedOptions: string[]) => {console.log(checkedOptions);checkedOptions[0] ? setCheckedFolders(checkedOptions) : setCheckedFolders([])}}
                />
            </div>

            <div className='mt2'>
                <Button className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Move</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
                <Button style={{marginTop: 8}}onClick={() => props.newFolderModalToggle(true)} className='right' typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Folder</Button>
            </div>
        </div>
    )
}