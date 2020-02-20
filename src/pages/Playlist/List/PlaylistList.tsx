import React from 'react';
import { Table } from '../../../components/Table/Table';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { Text } from '../../../components/Typography/Text';
import { tsToLocaleDate } from '../../../utils/utils';
import { Icon } from '@material-ui/core';
import { Label } from '../../../components/FormsComponents/Label/Label';
import styled from 'styled-components';
import { Pagination } from '../../../components/Pagination/Pagination'
import { PlaylistItem } from '../../../redux-flow/store/Playlists/List/types';
import { PlaylistsTabs } from './PlaylistTabs';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { DropdownList, DropdownItem, DropdownItemText } from '../../../components/FormsComponents/Dropdown/DropdownStyle';
import { OnlineBulkForm, DeleteBulkForm, PaywallBulkForm, ThemeBulkForm } from './BulkModals';
import { ThemeOptions } from '../../../redux-flow/store/Settings/Theming';
import { InputTags } from '../../../components/FormsComponents/Input/InputTags';
import { Tooltip } from '../../../components/Tooltip/Tooltip';

export interface LiveListProps {
    playlistItems: PlaylistItem[];
    themesList: ThemeOptions[];
}

export const PlaylistListPage = (props: LiveListProps) => {

    const [selectedPlaylist, setSelectedPlaylist] = React.useState<string[]>([]);
    const [showPlaylistTabs, setShowPlaylistTabs] = React.useState<boolean>(false)
    const [selectedPlaylistId, setSelectedPlaylistId] = React.useState<PlaylistItem>(null)

    React.useEffect(() => { }, [selectedPlaylist])

    const liveListHeaderElement = () => {
        return [
            <InputCheckbox
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
            />,
            <></>,
            <Text key="namePlaylistList" size={14} weight="med" color="gray-1">Name</Text>,
            <Text key="viewsPlaylistList" size={14} weight="med" color="gray-1">Created</Text>,
            <Text key="statusPlaylistList" size={14} weight="med" color="gray-1">Status</Text>,
            <Text key="featuresPlaylistList" size={14} weight="med" color="gray-1">Features</Text>,
            <div style={{ width: "80px" }} ></div>,
        ]
    }

    const handleFeatures = (item: PlaylistItem, id: string) => {
        var playlistElement = []
        if (item.features.paywall) {
            playlistElement.push(
                <IconGreyContainer className="mr1" >
                    <IconStyle id={"paywallTooltip" + id}>attach_money</IconStyle>
                    <Tooltip target={"paywallTooltip" + id}>Paywall</Tooltip>
                </IconGreyContainer>
            )
        }
        if (item.features.playlist) {
            playlistElement.push(
                <IconGreyContainer className="mr1" >
                    <IconStyle id={"playlistTooltip" + id}>video_library</IconStyle>
                    <Tooltip target={"playlistTooltip" + id}>Playlists</Tooltip>
                </IconGreyContainer>
            )
        }
        if (item.features.advertising) {
            playlistElement.push(
                <IconGreyContainer className="mr1" >
                    <IconStyle id={"advertisingTooltip" + id}>font_download</IconStyle>
                    <Tooltip target={"advertisingTooltip" + id}>Advertising</Tooltip>
                </IconGreyContainer>
            )
        }
        return playlistElement;
    }

    const liveListBodyElement = () => {
        if (props.playlistItems) {
            return props.playlistItems.map((value, key) => {
                return [
                    <InputCheckbox className="inline-flex" label="" key={"checkbox" + value.id} defaultChecked={selectedPlaylist.includes(value.id)} id={"checkbox" + value.id} onChange={(event) => {
                        if (event.currentTarget.checked && selectedPlaylist.length < props.playlistItems.length) {
                            setSelectedPlaylist([...selectedPlaylist, value.id])
                        } else {
                            const editedselectedLive = selectedPlaylist.filter(item => item !== value.id)
                            setSelectedPlaylist(editedselectedLive);
                        }
                    }
                    } />,
                    <img className="p1" key={"thumbnail" + value.id} width={70} height={42} src={value.thumbnail} ></img>,
                    <Text key={"title" + value.id} size={14} weight="reg" color="gray-1">{value.title}</Text>,
                    <Text key={"created" + value.id} size={14} weight="reg" color="gray-1">{tsToLocaleDate(value.created)}</Text>,
                    <Text key={"status" + value.id} size={14} weight="reg" color="gray-1">{value.online ? <Label backgroundColor="green20" color="green" label="Online" /> : <Label backgroundColor="red20" color="red" label="Offline" />}</Text>,
                    <>{handleFeatures(value, value.id)}</>,
                    <div key={"more" + value.id} className="iconAction right mr2" ><Icon onClick={() => { setSelectedPlaylistId(value); setShowPlaylistTabs(true) }} className="right mr1" >edit</Icon><Icon onClick={() => { props.deleteLiveChannel(value.id) }} className="right mr1" >delete</Icon></div>,
                ]
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

    console.log(props);
    return (
        showPlaylistTabs ?
            <PlaylistsTabs playlist={selectedPlaylistId} setShowPlaylistTabs={setShowPlaylistTabs} history={props.history} />
            :
            <>
                <HeaderPlaylistList className="mb2 flex" >
                    <div className="flex-auto items-center flex">
                        <IconSearch>search</IconSearch>
                        <InputTags  noBorder={true} placeholder="Search Playlists..." style={{display: "inline-block"}} defaultTags={[]}   />
                    </div>
                    <div className="flex items-center" >
                        {selectedPlaylist.length > 0 ?
                            <Text className=" ml2" color="gray-3" weight="med" size={12} >{selectedPlaylist.length} items</Text>
                            : null
                        }
                        <div className="relative">
                            <Button onClick={() => { setDropdownIsOpened(!dropdownIsOpened) }} disabled={selectedPlaylist.length === 0} buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="secondary" >Bulk Actions</Button>
                            <DropdownList style={{width: 167, left: 16}} isSingle isInModal={false} isNavigation={false} displayDropdown={dropdownIsOpened} >
                                {renderList()}
                            </DropdownList>
                        </div>
                        <SeparatorHeader className="ml2 inline-block" />
                        <Button buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="secondary" >Filter</Button>
                        <Button buttonColor="blue" className="relative  ml2" sizeButton="small" typeButton="primary" >Create Playlist</Button>
                    </div>
                </HeaderPlaylistList>
                <Table className="col-12" id="liveListTable" header={liveListHeaderElement()} body={liveListBodyElement()} />
                <Pagination totalResults={290} displayedItemsOptions={[10, 20, 100]} callback={() => { }} />
                <OnlineBulkForm items={selectedPlaylist} open={bulkOnlineOpen} toggle={setBulkOnlineOpen} />
                <DeleteBulkForm items={selectedPlaylist} open={bulkDeleteOpen} toggle={setBulkDeleteOpen} />
                <PaywallBulkForm items={selectedPlaylist} open={bulkPaywallOpen} toggle={setBulkPaywallOpen} />
                <ThemeBulkForm themes={props.themesList} items={selectedPlaylist} open={bulkThemeOpen} toggle={setBulkThemeOpen} />

            </>
    )
}

const IconStyle = styled(Icon)`
    margin: auto;
    font-size: 16px !important;
`

const IconSearch = styled(Icon)`
    color: ${props => props.theme.colors["gray-3"]} ;
`

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

const IconGreyContainer = styled.div<{}>`
    position: relative;
    z-index: 1;
    color :  ${props => props.theme.colors["gray-3"]} ;
    display: inline-flex;
    height: 24px;
    width: 24px;
    align-items: center;
    &:before {
        content: '';
        display: inline-block;
        width: 24px;
        z-index: -1;
        height: 24px;
        position: absolute;
        border-radius: 12px;
        background-color: ${props => props.theme.colors["gray-8"]} ;
    }
`