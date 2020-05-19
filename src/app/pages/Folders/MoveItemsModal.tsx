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
import { IconStyle, ActionIcon } from '../../../shared/Common/Icon';
import { Tooltip } from '../../../components/Tooltip/Tooltip';

export const MoveItemModal = (props: {submit: Function; initialSelectedFolder: string; goToNode: (searchedFolder: string) => Promise<FolderTreeNode>; toggle: Function; newFolderModalToggle: Function}) => {

    const [selectedModalFolder, setSelectedModalFolder] = React.useState<string>(props.initialSelectedFolder);
    const [currentNode, setCurrentNode] = React.useState<FolderTreeNode>(null);
    const [checkedFolders, setCheckedFolders] = React.useState<{name: string; id: string}[]>([]);
    const [saveLoading, setSaveLoading] = React.useState<boolean>(false);

    
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

    const handleCheckboxChange = (checkedOption: {name: string; id: string}) => {
        if(checkedFolders.find(f => f.id === checkedOption.id)) {
            setCheckedFolders(checkedFolders.filter(option => {return option.id !== checkedOption.id}));
        } else {
            setCheckedFolders([...checkedFolders, checkedOption]);
        }
    }

    const handleModalFolderRowClick = (node: FolderTreeNode) => {
        if(node.subfolders > 0) {
            setSelectedModalFolder(node.fullPath)
        }
    }

    const handleSubmit = () => {
        setSaveLoading(true)
        props.submit(checkedFolders.map((folder) => {return folder.id}))
        .then(() => {
            debugger
            setSaveLoading(false)
            props.toggle(false)
        }).catch(() => {
            setSaveLoading(false)

        })
    } 

    const renderModalNode = () => {
        if(currentNode && currentNode.loadingStatus === 'loading') {
            return <LoadingSpinner center size='medium' className="mx-auto block" color='blue'/> 
        }
        return currentNode ? Object.values(currentNode.children).map((childNode, i) => {            
            return (
                <ModalItemFolderRow onDoubleClick={() => handleModalFolderRowClick(childNode)} selected={checkedFolders.find(f => f.id === childNode.id) ? true : false} key={childNode.id} className='col col-12 flex items-center py2 pl2 pointer'>
                    <div className="col col-11 flex">
                        <InputCheckbox className="mr2" id={childNode.id + 'Checkbox'} defaultChecked={checkedFolders.find(f => f.id === childNode.id) ? true : false} onChange={() => {handleCheckboxChange({id: childNode.id, name: childNode.name})}} />
                        <IconStyle coloricon='gray-7'>folder_open</IconStyle>
                        <Text className='pl2' size={14} weight='reg'>{childNode.name}</Text>
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
                                    
                                    <Tooltip target={"subfolderTooltip" + i}>Go to {childNode.name}</Tooltip>
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
                    defaultTags={checkedFolders.map(folder => folder ? folder.name : null)} 
                    callback={(checkedOptions: string[]) => {checkedOptions[0] ? setCheckedFolders(checkedFolders.filter(option => checkedOptions.indexOf(option.name) === -1)) : setCheckedFolders([])}}
                />
            </div>

            <div className='mt2'>
                <Button isLoading={saveLoading} onClick={() => handleSubmit()} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Move</Button>
                <Button onClick={() => props.toggle(false)} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
                <Button style={{marginTop: 8}} onClick={() => props.newFolderModalToggle(true)} className='right' typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Folder</Button>
            </div>
        </div>
    )
}