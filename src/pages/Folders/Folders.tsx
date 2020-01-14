import React from 'react';
import { FoldersTreeSection, HeadingSection, ContentSection, FolderLink, FolderElements, IconStyle, SubfolderElements } from './FoldersStyle';
import { Button } from '../../components/FormsComponents/Button/Button';
import { Text } from '../../components/Typography/Text';
import { InputCheckbox } from '../../components/FormsComponents/Input/InputCheckbox';
import { Icon } from '@material-ui/core';
import { Label } from '../../components/FormsComponents/Label/Label';
import { Table } from '../../components/Table/Table';

export interface FolderAsset {
    id: string;
    name: string;
    contentType: 'playlist' | 'vod';
    created: string;
    duration: string;
    features: string[];
    status: 'deleted' | 'offline' | 'online';

}

interface SubFolder {
    id: string;
    name: string;
}
interface Folder {
    parentId: string;
    id: string;
    name: string;
    subfolders: SubFolder[];
    assets: FolderAsset[];
}

const TableData: FolderAsset[] = [
    {
        id: '11',
        name: 'Bibendum',
        duration: '03:12:12',
        created: 'Nov 02, 19',
        status: 'deleted',
        features: null,
        contentType: 'playlist'
    },
    {
        id: '11',
        name: 'Video 1',
        duration: '03:12:12',
        created: 'Dec 02, 19',
        status: 'offline',
        features: null,
        contentType: 'playlist'
    },    
    {
        id: '11',
        name: 'Playlist 2',
        duration: '03:12:12',
        created: 'Nov 05, 19',
        status: 'online',
        features: null,
        contentType: 'playlist'
    },
    {
        id: '11',
        name: 'Folder 1',
        duration: null,
        created: 'Dec 22, 19',
        status: null,
        features: null,
        contentType: 'playlist'
    },
    {
        id: '11',
        name: 'Bibendum',
        duration: '03:12:12',
        created: 'Nov 02, 19',
        status: 'deleted',
        features: null,
        contentType: 'playlist'
    },
    {
        id: '11',
        name: 'Bibendum',
        duration: '03:12:12',
        created: 'Nov 02, 19',
        status: 'online',
        features: null,
        contentType: 'playlist'
    }
]

const FoldersTree: Folder[] = [
    {
        parentId: 'Id',
        id: '1',
        name: 'Library',
        subfolders: null,
        assets: null
    },
    {
        parentId: 'Id',
        id: '2',
        name: 'unsorted',
        subfolders: null,
        assets: null,
    },
    {
        parentId: 'Id',
        id: '3',
        name: 'Trash',
        subfolders: null,
        assets: null
    },
    {
        parentId: 'Id',
        id: '4',
        name: 'Bunnies',
        subfolders: [
            {
                id: '11',
                name: 'gray bunnies',
            },
            {
                id: '12',
                name: 'green bunnies',
            }
        ],
        assets: null
    }
]

export const FoldersPage = () => {

    const [expandedFolders, setExpandedFolders] = React.useState<string[]>([]);

    React.useEffect(() => {console.log(expandedFolders)}, [expandedFolders])

    const foldersContentTableHeader = () => {
        return [
            <InputCheckbox key='tableHeaderCheckboxCell' id='tableHeaderCheckbox' />,
            <Text size={14} weight='med'>Name</Text>,
            <Text size={14} weight='med'>Duration</Text>,
            <Text size={14} weight='med'>Created</Text>,
            <Text size={14} weight='med'>Status</Text>,
            <Text size={14} weight='med'>Features</Text>,
            <span></span>
        ]
    }

    const foldersContentTableBody = () => {

        return TableData.map((row) => {
            return [
                <InputCheckbox id={row.name + 'InputCheckbox'} key={'foldersTableInputCheckbox' + row.name} />,
                <Icon key={'foldersTableIcon' + row.name}>folder_open</Icon>,
                <Text key={'foldersTableName' + row.name} size={14} weight='reg' color='gray-3'>{row.name}</Text>,
                <Text key={'foldersTableDuration' + row.name} size={14} weight='reg' color='gray-3'>{row.duration ? row.duration : '-'}</Text>,
                <Text key={'foldersTableCreated' + row.name} size={14} weight='reg' color='gray-3'>{row.created}</Text>,
                <Label key={'foldersTableStatus' + row.name} label={row.status} size={14} weight='reg' color={row.status === 'online' ? 'green' : 'red'} backgroundColor={row.status === 'online' ? 'green20' : 'red20'}/>,
                <Icon className='right mr2' key={'foldersTableActionButton' + row.name}>more_vert</Icon>

            ]
        })
    }

    const handleFolderClick = () => {

    }

    const handleSubfolderClick = () => {

    }

    const handleIconClick = (folderName: string) => {
        let newArray = expandedFolders
        if(expandedFolders.includes(folderName)) {
            newArray = expandedFolders.filter(name => {return name !== folderName})
        } 
        else {
            newArray.push(folderName);
        }
        setExpandedFolders(['Bunnies'])
    }

    const renderFoldersTree = () => {
        return (FoldersTree.map((folder, key) => {
            return (
                folder.subfolders ? 
                    <FolderLink key={folder.name + key.toString()}>
                        <FolderElements>
                            <IconStyle 
                                onClick={() => {handleIconClick(folder.name)}} 
                                coloricon='gray-5'
                            >
                                {expandedFolders.includes(folder.name) ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                            </IconStyle>
                            <IconStyle coloricon='gray-7'>folder_open</IconStyle>
                            <Text size={14} weight='reg' color='gray-3'>{folder.name}</Text>
                        </FolderElements>
                        {folder.subfolders.map((subfolder, key) => {                        
                            if(expandedFolders.includes(folder.name)) {
                                return (
                                    <SubfolderElements key={subfolder.name + key.toString()} onClick={() => {handleSubfolderClick()}}>
                                        <IconStyle coloricon='gray-5'>keyboard_arrow_down</IconStyle>
                                        <IconStyle coloricon='gray-7'>folder_open</IconStyle>
                                        <Text size={14} weight='reg' color='gray-3'>{subfolder.name}</Text>
                                    </SubfolderElements>
                                )
                            }
                            
                        })
                        }
                    </FolderLink>
                    :<FolderElements key={folder.name + key.toString()} onClick={() => {handleFolderClick()}}><IconStyle coloricon='gray-7'>folder_open</IconStyle><Text size={14} weight='reg' color='gray-3'>{folder.name}</Text></FolderElements>
            )
        }))
    }

    return (
        <div>
            <HeadingSection>
                <Button sizeButton='large' typeButton='secondary' buttonColor='blue'>
                    New Folder
                </Button>
                <Button sizeButton='large' typeButton='secondary' buttonColor='blue'>
                    Filter
                </Button>
            </HeadingSection>
            <ContentSection>
                <FoldersTreeSection>
                    {renderFoldersTree()}
                </FoldersTreeSection>
                <Table className='col col-12' id='folderContentTable' header={foldersContentTableHeader()} body={foldersContentTableBody()} />
            </ContentSection>        
        </div>
    )
}