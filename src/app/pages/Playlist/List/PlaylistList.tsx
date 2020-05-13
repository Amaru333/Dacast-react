import React from 'react';
import { Table } from '../../../../components/Table/Table';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { Text } from '../../../../components/Typography/Text';
import { tsToLocaleDate } from '../../../../utils/utils';
import { IconStyle, ActionIcon } from '../../../../shared/Common/Icon';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import styled from 'styled-components';
import { Pagination } from '../../../../components/Pagination/Pagination'
import { PlaylistItem } from '../../../redux-flow/store/Playlists/List/types';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { DropdownList, DropdownItem, DropdownItemText } from '../../../../components/FormsComponents/Dropdown/DropdownStyle';
import { OnlineBulkForm, DeleteBulkForm, PaywallBulkForm, ThemeBulkForm } from './BulkModals';
import { ThemeOptions } from '../../../redux-flow/store/Settings/Theming';
import { InputTags } from '../../../../components/FormsComponents/Input/InputTags';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { handleFeatures } from '../../../shared/Common/Features';
import { PlaylistFiltering } from './PlaylistFilter';
import { DateTime } from 'luxon';
import { useHistory } from 'react-router';
import { isTokenExpired } from '../../../../admin/utils/token';
import { addTokenToHeader } from '../../../utils/token';
import axios from 'axios'
import { showToastNotification } from '../../../redux-flow/store/Toasts/actions';
import { PlaylistListContainerProps } from '../../../containers/Playlists/List';

export const PlaylistListPage = (props: PlaylistListContainerProps & {playlistItems: PlaylistItem[], themesList: ThemeOptions[]}) => {

    const [selectedPlaylist, setSelectedPlaylist] = React.useState<string[]>([]);
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    let history = useHistory()

    const handleCreatePlaylist = async () => {
    
        setButtonLoading(true)
        await isTokenExpired()
        let {token} = addTokenToHeader();
        
        return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/PLAYLIST',
            {
                title: "My Playlist"
            }, 
            {
                headers: {
                    Authorization: token
                }
            }
        ).then((response) => {
            setButtonLoading(false)
            showToastNotification('Live channel created!', 'fixed', 'success')
            history.push(`PLAYLIST/${response.data.data.id}/general`)
        }).catch((error) => {
            setButtonLoading(false)
            showToastNotification('Ooops, something went wrong...', 'fixed', 'error')
        })
    }

    const liveListHeaderElement = () => {
        return {data: [
            {cell: <InputCheckbox
                className="inline-flex"
                key="checkboxLiveListBulkAction"
                indeterminate={selectedPlaylist.length >= 1 && selectedPlaylist.length < props.playlistItems.length}
                defaultChecked={selectedPlaylist.length === props.playlistItems.length}
                id="globalCheckboxPlaylistList"
                onChange={(event) => {
                    if (event.currentTarget.checked) {
                        const editedselectedLive = props.playlistItems.map(item => { return item.id })
                        setSelectedPlaylist(editedselectedLive);
                    } else if (event.currentTarget.indeterminate || !event.currentTarget.checked) {
                        setSelectedPlaylist([])
                    }
                }}
            />},
            // {cell: <></>},
            {cell: <Text key="namePlaylistList" size={14} weight="med" color="gray-1">Name</Text>, sort: 'Name'},
            {cell: <Text key="viewsPlaylistList" size={14} weight="med" color="gray-1">Created Date</Text>, sort: 'Created Date'},
            {cell: <Text key="statusPlaylistList" size={14} weight="med" color="gray-1">Status</Text>},
            {cell: <Text key="featuresPlaylistList" size={14} weight="med" color="gray-1">Features</Text>},
            {cell: <div style={{ width: "80px" }} ></div>},
        ], defaultSort: 'Created Date'}
    }

    const liveListBodyElement = () => {
        if (props.playlistItems) {
            return props.playlistItems.map((value, key) => {
                return {data: [
                    <div key={"checkbox" + value.id}  className='flex items-center'>
                        <InputCheckbox className="inline-flex" label="" defaultChecked={selectedPlaylist.includes(value.id)} id={"checkbox" + value.id} onChange={(event) => {
                            if (event.currentTarget.checked && selectedPlaylist.length < props.playlistItems.length) {
                                setSelectedPlaylist([...selectedPlaylist, value.id])
                            } else {
                                const editedselectedLive = selectedPlaylist.filter(item => item !== value.id)
                                setSelectedPlaylist(editedselectedLive);
                            }
                        }
                        } />
                        <img className="pl2" key={"thumbnail" + value.id} width={50} height={42} src={value.thumbnail} ></img>
                    </div>

                    ,
                    <Text key={"title" + value.id} size={14} weight="reg" color="gray-1">{value.title}</Text>,
                    <Text key={"created" + value.id} size={14} weight="reg" color="gray-1">{tsToLocaleDate(value.created, DateTime.DATETIME_SHORT)}</Text>,
                    <Text key={"status" + value.id} size={14} weight="reg" color="gray-1">{value.online ? <Label backgroundColor="green20" color="green" label="Online" /> : <Label backgroundColor="red20" color="red" label="Offline" />}</Text>,
                    <div className='flex'>{handleFeatures(value, value.id)}</div>,
                    <div key={"more" + value.id} className="iconAction right mr2" >
                        <ActionIcon id={"editTooltip" + value.id}>
                            <IconStyle onClick={() => { history.push('/playlists/' + value.id + '/general') }} className="right mr1" >edit</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"editTooltip" + value.id}>Edit</Tooltip>
                        <ActionIcon id={"deleteTooltip" + value.id}>
                            <IconStyle onClick={() => { props.deletePlaylist(value.id) }} className="right mr1" >delete</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltip" + value.id}>Delete</Tooltip>
                    </div>,
                ]}
            })
        }
    }

    const [bulkOnlineOpen, setBulkOnlineOpen] = React.useState<boolean>(false);
    const [bulkPaywallOpen, setBulkPaywallOpen] = React.useState<boolean>(false);
    const [bulkThemeOpen, setBulkThemeOpen] = React.useState<boolean>(false);
    const [bulkDeleteOpen, setBulkDeleteOpen] = React.useState<boolean>(false);

    const bulkActions = [
        { name: 'Online/Offline', function: setBulkOnlineOpen },
        { name: 'Paywall On/Off', function: setBulkPaywallOpen },
        { name: 'Change Theme', function: setBulkThemeOpen },
        { name: 'Move To', function: setBulkThemeOpen },
        { name: 'Delete', function: setBulkDeleteOpen },
    ]

    const renderList = () => {
        return bulkActions.map((item, key) => {
            return (
                <DropdownItem
                    isSingle
                    key={item.name}
                    className={key === 1 ? 'mt1' : ''}
                    isSelected={false}
                    onClick={() => item.function(true)}>
                    <DropdownItemText size={14} weight='reg' color={'gray-1'}>{item.name}</DropdownItemText>
                </DropdownItem>
            )
        })
    }

    const [dropdownIsOpened, setDropdownIsOpened] = React.useState<boolean>(false);

    return (
        <>
                <HeaderPlaylistList className="mb2 flex" >
                    <div className="flex-auto items-center flex">
                        <IconStyle coloricon='gray-3'>search</IconStyle>
                        <InputTags  noBorder={true} placeholder="Search Playlists..." style={{display: "inline-block"}} defaultTags={[]}   />
                    </div>
                    <div className="flex items-center" >
                        {selectedPlaylist.length > 0 ?
                            <Text className=" ml2" color="gray-3" weight="med" size={12} >{selectedPlaylist.length} items</Text>
                            : null
                        }
                        <div className="relative">
                            <Button onClick={() => { setDropdownIsOpened(!dropdownIsOpened) }} disabled={selectedPlaylist.length === 0} buttonColor="gray" className="relative  ml2" sizeButton="small" typeButton="secondary" >Bulk Actions</Button>
                            <DropdownList hasSearch={false} style={{width: 167, left: 16}} isSingle isInModal={false} isNavigation={false} displayDropdown={dropdownIsOpened} >
                                {renderList()}
                            </DropdownList>
                        </div>
                        <SeparatorHeader className="mx2 inline-block" />
                        <PlaylistFiltering setSelectedPlaylist={setSelectedPlaylist} />
                        <Button isLoading={buttonLoading} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="primary" onClick={() => handleCreatePlaylist()} >Create Playlist</Button>
                    </div>
                </HeaderPlaylistList>
                <Table className="col-12" id="playlistListTable" headerBackgroundColor="white" header={liveListHeaderElement()} body={liveListBodyElement()} hasContainer/>
                <Pagination totalResults={290} displayedItemsOptions={[10, 20, 100]} callback={() => { }} />
                <OnlineBulkForm items={selectedPlaylist} open={bulkOnlineOpen} toggle={setBulkOnlineOpen} />
                <DeleteBulkForm items={selectedPlaylist} open={bulkDeleteOpen} toggle={setBulkDeleteOpen} />
                <PaywallBulkForm items={selectedPlaylist} open={bulkPaywallOpen} toggle={setBulkPaywallOpen} />
                <ThemeBulkForm themes={props.themesList} items={selectedPlaylist} open={bulkThemeOpen} toggle={setBulkThemeOpen} />

            </>
    )
}
const HeaderPlaylistList = styled.div<{}>`
    position:relative;
    width: 100%;
`

const SeparatorHeader = styled.div<{}>`
    width:1px;
    height: 33px;
    background-color: ${props => props.theme.colors["gray-7"]} ;
`

const invisibleInput = styled.input<{}>`

`