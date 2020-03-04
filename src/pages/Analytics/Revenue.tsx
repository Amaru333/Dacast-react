import React from 'react';
import styled from 'styled-components';
import { Card } from '../../components/Card/Card';
import { Text } from '../../components/Typography/Text';
import { Button } from '../../components/FormsComponents/Button/Button';
import { Tooltip } from '../../components/Tooltip/Tooltip';
import { Datepicker } from '../../components/FormsComponents/Datepicker/DateRangePicker';
import { BarChart } from '../../components/Analytics/BarChart';
import { tsToLocaleDate, displayBytesForHumans, mapMarkerNameTranformBytesFromGB } from '../../utils/utils';
import DoubleLineChart from '../../components/Analytics/DoubleLineChart';
import { CheeseChart } from '../../components/Analytics/CheeseChart';
import ReactTable from "react-table";
import LeafletMap from '../../components/Analytics/LeafletMap';
import { InputTags } from '../../components/FormsComponents/Input/InputTags';
import { DropdownList } from '../../components/FormsComponents/Dropdown/DropdownStyle';
import { ContainerHalfSelector, TabSetupContainer, TabSetupStyle, HeaderBorder, ItemSetupRow } from '../Playlist/Setup/Setup';
import { Breadcrumb } from '../Folders/Breadcrumb';
import { FolderAsset, FoldersInfos } from '../../redux-flow/store/Folders/types';
import { InputCheckbox } from '../../components/FormsComponents/Input/InputCheckbox';
import { AnalyticsCard } from './Dashboard';
import { DateRangePickerWrapper } from '../../components/FormsComponents/Datepicker/DateRangePickerWrapper';
import { IconStyle } from '../../shared/Common/Icon';
import { presets } from '../../constants/DatepickerPresets';

interface RevenueAnalyticsProps {
    folderData: FoldersInfos;
    getFolders: Function;
    getFolderContent: Function;
    restoreContent: Function;
}

export const RevenueAnalytics = (props: RevenueAnalyticsProps) => {

    //Only for selected Folder things, not really interesting 
    const [selectedFolder, setSelectedFolder] = React.useState<string>('/');

    //every selected items
    const [selectedItems, setSelectedItems] = React.useState<FolderAsset[]>([]);
    //every checked items in the  selected items tab (right one)
    const [checkedSelectedItems, setCheckedSelectedItems] = React.useState<FolderAsset[]>([]);

    //every checked contents in the  content tabs (left one) ps: there's no folder tab in this context
    const [checkedContents, setCheckedContents] = React.useState<FolderAsset[]>([]);


    //Fuck this shit we need to put it in a shared folder
    const handleRowIconType = (item: FolderAsset) => {
        switch (item.contentType) {
            case 'playlist':
                return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.id}>playlist_play</IconStyle>
            case 'folder':
                return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.id}>folder_open</IconStyle>
            case 'live':
            case 'vod':
                return <img key={"thumbnail" + item.id} width="auto" height={42} src={item.thumbnail} ></img>
            default:
                return;
        }
    }

    //Every function is related to Contents picker, should make it a React hooks but lack of time and also the thing is that there all kind of different in a way 
    const handleNavigateToFolder = (folderName: string) => {
        setSelectedFolder(selectedFolder + folderName + '/');
        setCheckedContents([]);
    }

    const handleMoveContentsToSelected = () => {
        setSelectedItems([...selectedItems, ...checkedContents]);
        setCheckedContents([]);
    }

    const handleMoveToSelected = () => {
        handleMoveContentsToSelected();
    }


    const handleRemoveFromSelected = () => {
        var newSelectedItems = selectedItems.filter(el => {
            return !checkedSelectedItems.find(elChecked => {
                return el.id === elChecked.id;
            })
        });
        setSelectedItems(newSelectedItems);
        setCheckedSelectedItems([]);
    }


    const handleCheckboxContents = (checkedOption: FolderAsset) => {
        if (checkedContents.includes(checkedOption)) {
            setCheckedContents(checkedContents.filter(option => option !== checkedOption));
        } else {
            setCheckedContents([...checkedContents, checkedOption]);
        }
    }

    const handleCheckboxSelected = (checkedOption: FolderAsset) => {
        if (checkedSelectedItems.includes(checkedOption)) {
            setCheckedSelectedItems(checkedSelectedItems.filter(option => option !== checkedOption));
        } else {
            setCheckedSelectedItems([...checkedSelectedItems, checkedOption]);
        }
    }

    const handleDecreaseOrder = (element: FolderAsset) => {
        var currentIndex = selectedItems.findIndex(el => el === element);
        var newArray = [...selectedItems];
        newArray.splice(currentIndex, 1);
        newArray.splice(currentIndex + 1, 0, element);
        setSelectedItems(newArray);
    }

    const handleIncreaseOrder = (element: FolderAsset) => {
        var currentIndex = selectedItems.findIndex(el => el === element);
        var newArray = [...selectedItems];
        newArray.splice(currentIndex, 1);
        newArray.splice(currentIndex - 1, 0, element);
        setSelectedItems(newArray);
    }

    const renderSelectedItems = () => {
        return selectedItems.map((element, i) => {
            return (
                <ItemSetupRow className='col col-12 flex items-center p2 pointer' selected={checkedSelectedItems.includes(element)} >
                    <InputCheckbox className='mr2' id={element.id + element.contentType + 'InputCheckbox'} key={'foldersTableInputCheckbox' + element.id}
                        defaultChecked={checkedSelectedItems.includes(element)}
                        onChange={() => handleCheckboxSelected(element)}
                    />
                    {handleRowIconType(element)}
                    <Text className='pl2' size={14} weight='reg'>{element.name}</Text>
                    <div className="iconAction flex-auto justify-end">
                        <IconStyle className="right mr1" coloricon='gray-1' onClick={() => handleDecreaseOrder(element)}  >arrow_downward</IconStyle>
                        <IconStyle className="right" coloricon='gray-1' onClick={() => handleIncreaseOrder(element)} >arrow_upward</IconStyle>
                    </div>
                </ItemSetupRow>
            )
        })
    }

    //Dummies data, there's actually a call but no redux flow for that
    // The reason why is that the mockup is pretty fucked up. There's a pie chart for "Plays and Viewers per Time" which doesnt make sense
    // So nothing really hard to do, need to fugure out what is what aand change the chart accordingly
    // Keep the same type for every chart (follow the Dashboard and realtime components, they're what we need basically)
    var data = [28, 31, 45, 67, 78, 82];

    var labels = [1578528000000, 1578528000000, 1578528000000, 1578528000000, 1578528000000, 1578528000000];
    var labelsFormate = labels.map(number => tsToLocaleDate(number))

    //Second Chart
    var data1 = [12, 45, 78, 12, 35, 78];

    //Third chart
    var labelsDevice = ["iphone", 'pc', 'whatever'];
    var dataCheese = [9876, 2983, 921];

    //Table
    var dataTable = [{ contentId: 9876, watchtime: 2934, viewercount: 921, revenueUSD: 987, revenueEUR: 821 }];

    //Map
    var mapData = [{ "city": "San Francisco (California)", "position": { "latitude": 37.7484, "longitude": -122.4156 }, "consumedMB": 36.8285 }, { "city": "Annecy (Auvergne-Rhone-Alpes)", "position": { "latitude": 45.9, "longitude": 6.1167 }, "consumedMB": 2.767 }, { "city": "Hampstead (England)", "position": { "latitude": 51.5407, "longitude": -0.1964 }, "consumedMB": 0 }, { "city": "Lille (Hauts-de-France)", "position": { "latitude": 50.633, "longitude": 3.0586 }, "consumedMB": 83.9529 }, { "city": "San Carlos (California)", "position": { "latitude": 37.498, "longitude": -122.2672 }, "consumedMB": 17.2149 }, { "city": "Pacy-sur-Eure (Normandy)", "position": { "latitude": 49.0167, "longitude": 1.3833 }, "consumedMB": 0 }, { "city": "Paris (Île-de-France)", "position": { "latitude": 48.9333, "longitude": 2.3667 }, "consumedMB": 0 }]

    const COLUMNS_TOP_CONTENT = [
        {
            Header: 'Content',
            accessor: 'contentId'
        },
        {
            Header: 'Watch Time (sec)',
            accessor: 'watchtime'
        },
        {
            Header: 'Number of views',
            accessor: 'viewercount'
        },
        {
            Header: 'Revenue (USD)',
            accessor: 'revenueUSD'
        },
        {
            Header: 'Revenue (EUR)',
            accessor: 'revenueEUR'
        }
    ]


    //End of dummies data here, that's the renderMap, might expoert it in a shared file, I wasnt sure tall map was the same but it seems like they are
    const renderMap = (dataRepo: any) => {
        let mapMin: any = Math.min(...dataRepo.map(m => m.consumedMB));
        if (isFinite(mapMin)) {
            mapMin = displayBytesForHumans(mapMin, true);
        } else {
            mapMin = 'No Data';
        }
        let mapMax: any = Math.max(...dataRepo.map(m => m.consumedMB));
        if (isFinite(mapMax)) {
            mapMax = displayBytesForHumans(mapMax, true);
        } else {
            mapMax = 'No Data';
        }

        return (
            <div>
                <LeafletMap
                    height="400px"
                    markerNameTranform={mapMarkerNameTranformBytesFromGB}
                    markers={dataRepo} />
                <div className="flex mt2 justify-center">
                    <a className="mr2">{mapMin}</a>
                    <div style={{ backgroundColor: '#93d5ed', height: '20px', width: '30px' }}></div>
                    <div style={{ backgroundColor: '#45a5f5', height: '20px', width: '30px' }}></div>
                    <div style={{ backgroundColor: '#4285f4', height: '20px', width: '30px' }}></div>
                    <div style={{ backgroundColor: '#2f5ec4', height: '20px', width: '30px' }}></div>
                    <a className="ml2">{mapMax}</a>
                </div>
            </div>
        )
    }


    //That's the content selector too
    const renderContentsList = () => {
        return props.folderData.requestedContent.map((row) => {
            if (row.contentType === "playlist" || selectedItems.includes(row)) {
                return;
            }
            return (
                <ItemSetupRow className='col col-12 flex items-center p2 pointer'
                    selected={checkedContents.includes(row)}
                    onDoubleClick={() => { row.contentType === "folder" ? handleNavigateToFolder(row.name) : null }}
                >
                    {row.contentType !== "folder" ?
                        <InputCheckbox className='mr2' id={row.id + row.contentType + 'InputCheckbox'} key={'foldersTableInputCheckbox' + row.id}
                            onChange={() => handleCheckboxContents(row)}
                            defaultChecked={checkedContents.includes(row)}

                        />
                        : null}
                    {handleRowIconType(row)}
                    <Text className="pl2" key={'foldersTableName' + row.id} size={14} weight='reg' color='gray-1'>{row.name}</Text>
                    {
                        row.contentType === "folder" ?
                            <div className="flex-auto justify-end">
                                <IconStyle className="right" onClick={() => handleNavigateToFolder(row.name)} coloricon='gray-3'>keyboard_arrow_right</IconStyle>
                            </div>
                            : null
                    }
                </ItemSetupRow>
            )
        })
    }

    return (
        <React.Fragment>
            <div className="col col-12 mb25">
                <div className="col col-12 mb25">
                    <DateRangePickerWrapper presets={presets} />
                </div>
                <div className="flex items-center">
                    <div className="inline-flex items-center flex col-7 mb2">
                        <IconStyle coloricon='gray-3'>search</IconStyle>
                        <InputTags noBorder={true} placeholder="Search..." style={{ display: "inline-block" }} defaultTags={[]} />
                    </div>
                </div>
                <ContainerHalfSelector className="col col-5" >
                    <TabSetupContainer className="clearfix">
                        <TabSetupStyle className="pointer" selected={true} >
                            <Text color={"dark-violet"} size={14} weight='reg'>Content</Text>
                        </TabSetupStyle>
                    </TabSetupContainer>
                    <div className="pl1 pr1">
                        <Breadcrumb options={selectedFolder} callback={(value: string) => setSelectedFolder(value)} />
                    </div>
                    {renderContentsList()}
                </ContainerHalfSelector>
                <div className="col col-2" style={{ marginTop: 180 }}>
                    <Button onClick={() => handleMoveToSelected()} className='block ml-auto mr-auto mb2' typeButton='secondary' sizeButton='xs' buttonColor='blue'><IconStyle>chevron_right</IconStyle></Button>
                    <Button onClick={() => handleRemoveFromSelected()} className='block ml-auto mr-auto' typeButton='secondary' sizeButton='xs' buttonColor='blue'><IconStyle>chevron_left</IconStyle></Button>
                </div>
                <ContainerHalfSelector className="col col-5" >
                    <HeaderBorder className="p2">
                        <Text color={"gray-1"} size={14} weight='med'>Selected contents</Text>
                    </HeaderBorder>
                    {renderSelectedItems()}
                </ContainerHalfSelector>
            </div>
            <div className="clearfix mxn1 mb2">
                <div className="col col-4 px1">
                    <AnalyticsCard infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Sales by Time">
                        <BarChart
                            datasetName="GBytes"
                            displayBytesFromGB={true}
                            beginAtZero={true}
                            data={data}
                            yAxesName="GB"
                            labels={labelsFormate} />
                    </AnalyticsCard>
                </div>
                <div className="col col-4 px1">
                    <AnalyticsCard infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Revenue by Time">
                        <DoubleLineChart
                            datasetName="Hits"
                            noDecimals={false}
                            beginAtZero={true}
                            yAxesName="Plays and viewers"
                            datasetName1="plays"
                            data1={data1}
                            labels={labelsFormate} />
                    </AnalyticsCard>
                </div>
                <div className="col col-4 px1">
                    <AnalyticsCard infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Concurrent Playback Sessions">
                        {renderMap(mapData)}
                    </AnalyticsCard>
                </div>
            </div>
        </React.Fragment >
    )
}