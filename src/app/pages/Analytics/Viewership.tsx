import React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { IconStyle } from '../../../shared/Common/Icon';
import { BarChart } from '../../../components/Analytics/BarChart';
import { tsToLocaleDate } from '../../../utils/utils';
import DoubleLineChart from '../../../components/Analytics/DoubleLineChart';
import { CheeseChart } from '../../../components/Analytics/CheeseChart';import { InputTags } from '../../../components/FormsComponents/Input/InputTags';
import {  TabSetupContainer, TabSetupStyles, HeaderBorder, ItemSetupRow } from '../Playlist/Setup/Setup';
import { Breadcrumb } from '../Folders/Breadcrumb';
import { FolderAsset } from '../../redux-flow/store/Folders/types';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { AnalyticsCard, renderMap, DateFilteringAnalytics, handleRowIconType, AnalyticsContainerHalfSelector, BreadcrumbContainer, ThirdLgHalfXmFullXs } from './AnalyticsCommun';
import { ViewershipComponentProps } from '../../containers/Analytics/Viewership';

export const ViewershipAnalytics = (props: ViewershipComponentProps) => {

    const [selectedFolder, setSelectedFolder] = React.useState<string>('/');

    const [selectedItems, setSelectedItems] = React.useState<FolderAsset[]>([]);
    const [checkedSelectedItems, setCheckedSelectedItems] = React.useState<FolderAsset[]>([]);

    const [checkedContents, setCheckedContents] = React.useState<FolderAsset[]>([]);

    const [selectedTabConsumption, setSelectedTabConsumption] = React.useState<string>('time');
    const [selectedTabViewing, setSelectedTabViewing] = React.useState<string>('device');
    const [selectedTabPlayback, setSelectedTabPlayback] = React.useState<string>('map')

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

    const updateData = (dates: any) => {
        let options = {...dates, selectedContents: selectedItems.map(e => e.id) };
        props.getAnalyticsViewership(options);
    }
    
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

    if(props.viewershipAnalytics.data) {
        var labelsFormate = props.viewershipAnalytics.data.playsViewersPerTime.plays.time.map( (number: number) => tsToLocaleDate(number))
        const viewershipAnalytics = props.viewershipAnalytics.data;
        return (
            <React.Fragment>
                <div className="col col-12 mb25">
                    <DateFilteringAnalytics refreshData={updateData} />
                    <div className="flex items-center col col-12">
                        <div className="inline-flex items-center flex col-7 mb2">
                            <IconStyle coloricon='gray-3'>search</IconStyle>
                            <InputTags noBorder={true} placeholder="Search..." style={{ display: "inline-block" }} defaultTags={[]} />
                        </div>
                    </div>
                    <AnalyticsContainerHalfSelector className="col col-5" >
                        <BreadcrumbContainer className="pl1 pr1">
                            <Breadcrumb options={selectedFolder} callback={(value: string) => setSelectedFolder(value)} />
                        </BreadcrumbContainer>
                        {renderContentsList()}
                    </AnalyticsContainerHalfSelector>
                    <div className="col col-2" style={{ marginTop: 70 }}>
                        <Button onClick={() => handleMoveToSelected()} className='block ml-auto mr-auto mb2' typeButton='secondary' sizeButton='xs' buttonColor='blue'><IconStyle>chevron_right</IconStyle></Button>
                        <Button onClick={() => handleRemoveFromSelected()} className='block ml-auto mr-auto' typeButton='secondary' sizeButton='xs' buttonColor='blue'><IconStyle>chevron_left</IconStyle></Button>
                    </div>
                    <AnalyticsContainerHalfSelector className="col col-5" >
                        <HeaderBorder className="p2">
                            <Text color={"gray-1"} size={14} weight='med'>Selected contents</Text>
                        </HeaderBorder>
                        {renderSelectedItems()}
                    </AnalyticsContainerHalfSelector>
                </div>
                <div className="clearfix mxn1 mb2">
                    <div className={ThirdLgHalfXmFullXs}>
                        <AnalyticsCard infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption by Domain">
                            <BarChart
                                datasetName="GBytes"
                                displayBytesFromGB={true}
                                beginAtZero={true}
                                data={viewershipAnalytics.consumptionPerDomain.value}
                                yAxesName="GB"
                                labels={viewershipAnalytics.consumptionPerDomain.domain} />
                        </AnalyticsCard>
                    </div>
                    <div className={ThirdLgHalfXmFullXs}>
                        <AnalyticsCard infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption by Device">
                            <CheeseChart
                                displayBytesFromGB={true}
                                data={viewershipAnalytics.consumptionPerDevices.data}
                                labels={viewershipAnalytics.consumptionPerDevices.labels} />
                        </AnalyticsCard>
                    </div>
                    <div className={ThirdLgHalfXmFullXs}>
                        <AnalyticsCard infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Plays and Viewers by Time">
                            <DoubleLineChart
                                datasetName="Hits"
                                noDecimals={false}
                                beginAtZero={true}
                                yAxesName="Plays and viewers"
                                datasetName1="plays"
                                datasetName2="viewers"
                                data1={viewershipAnalytics.playsViewersPerTime.plays.data}
                                data2={viewershipAnalytics.playsViewersPerTime.viewers.data}
                                labels={labelsFormate} />
                        </AnalyticsCard>
                    </div>
                    <div style={{float:"right"}} className={ThirdLgHalfXmFullXs}>
                        <AnalyticsCard infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption Breakdown">
                            <TabSetupContainer className="clearfix">
                                <TabSetupStyles className="pointer inline col col-3" selected={selectedTabConsumption === "time"} onClick={() => { setSelectedTabConsumption("time") }}>
                                    <Text color={selectedTabConsumption === "time" ? "dark-violet" : "gray-1"} size={14} weight='reg'>Time</Text>
                                </TabSetupStyles>
                                <TabSetupStyles className="pointer inline col col-3" selected={selectedTabConsumption === "content"} onClick={() => { setSelectedTabConsumption("content") }}>
                                    <Text color={selectedTabConsumption === "content" ? "dark-violet" : "gray-1"} size={14} weight='reg'>Content</Text>
                                </TabSetupStyles>
                                <TabSetupStyles className="pointer inline col col-3" selected={selectedTabConsumption === "map"} onClick={() => { setSelectedTabConsumption("map") }}>
                                    <Text color={selectedTabConsumption === "map" ? "dark-violet" : "gray-1"} size={14} weight='reg'>Map</Text>
                                </TabSetupStyles>
                            </TabSetupContainer>
                            <BarChart
                                hidden={selectedTabConsumption !== "time"}
                                datasetName="GBytes"
                                displayBytesFromGB={true}
                                beginAtZero={true}
                                data={viewershipAnalytics.consumptionBreakdown.time.data}
                                yAxesName="GB"
                                labels={labelsFormate} />
                            <BarChart
                                hidden={selectedTabConsumption !== "content"}
                                datasetName="GBytes"
                                displayBytesFromGB={true}
                                beginAtZero={true}
                                data={viewershipAnalytics.consumptionBreakdown.content.data}
                                yAxesName="GB"
                                labels={labelsFormate} />
                            <div hidden={selectedTabConsumption !== "map"}>
                                {renderMap(viewershipAnalytics.consumptionBreakdown.map, "idMapConsumption")}
                            </div>
                        </AnalyticsCard>
                    </div>
                    <div className={ThirdLgHalfXmFullXs}>
                        <AnalyticsCard infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Viewing Time Breakdown">
                            <TabSetupContainer className="clearfix">
                                <TabSetupStyles className="pointer inline col col-3" selected={selectedTabViewing === "device"} onClick={() => { setSelectedTabViewing("device") }}>
                                    <Text color={selectedTabViewing === "device" ? "dark-violet" : "gray-1"} size={14} weight='reg'>Device</Text>
                                </TabSetupStyles>
                                <TabSetupStyles className="pointer inline col col-3" selected={selectedTabViewing === "content"} onClick={() => { setSelectedTabViewing("content") }}>
                                    <Text color={selectedTabViewing === "content" ? "dark-violet" : "gray-1"} size={14} weight='reg'>Content</Text>
                                </TabSetupStyles>
                                <TabSetupStyles className="pointer inline col col-3" selected={selectedTabViewing === "map"} onClick={() => { setSelectedTabViewing("map") }}>
                                    <Text color={selectedTabViewing === "map" ? "dark-violet" : "gray-1"} size={14} weight='reg'>Map</Text>
                                </TabSetupStyles>
                            </TabSetupContainer>
                            <CheeseChart
                                displayBytesFromGB={false}
                                data={viewershipAnalytics.viewingTimeBreakdown.device.data}
                                labels={viewershipAnalytics.viewingTimeBreakdown.device.labels} 
                                hidden={selectedTabViewing !== "device"} />
                            <BarChart
                                datasetName="Minutes"
                                displayBytesFromGB={false}
                                beginAtZero={true}
                                data={viewershipAnalytics.viewingTimeBreakdown.content.data}
                                yAxesName="min"
                                labels={viewershipAnalytics.viewingTimeBreakdown.content.labels}
                                hidden={selectedTabViewing !== "content"} />
                            <div hidden={selectedTabViewing !== "map"}>
                                {renderMap(viewershipAnalytics.viewingTimeBreakdown.map, "idMapViewing")}
                            </div>
                        </AnalyticsCard>
                    </div>
                    <div className={ThirdLgHalfXmFullXs}>
                        <AnalyticsCard infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Concurrent Playback Sessions">
                            <TabSetupContainer className="clearfix">
                                <TabSetupStyles className="pointer inline col col-3" selected={selectedTabPlayback === "device"} onClick={() => { setSelectedTabPlayback("device") }}>
                                    <Text color={selectedTabPlayback === "device" ? "dark-violet" : "gray-1"} size={14} weight='reg'>Device</Text>
                                </TabSetupStyles>
                                <TabSetupStyles className="pointer inline col col-3" selected={selectedTabPlayback === "content"} onClick={() => { setSelectedTabPlayback("content") }}>
                                    <Text color={selectedTabPlayback === "content" ? "dark-violet" : "gray-1"} size={14} weight='reg'>Content</Text>
                                </TabSetupStyles>
                                <TabSetupStyles className="pointer inline col col-3" selected={selectedTabPlayback === "map"} onClick={() => { setSelectedTabPlayback("map") }}>
                                    <Text color={selectedTabPlayback === "map" ? "dark-violet" : "gray-1"} size={14} weight='reg'>Map</Text>
                                </TabSetupStyles>
                            </TabSetupContainer>
                            <CheeseChart
                                displayBytesFromGB={false}
                                data={viewershipAnalytics.concurrentPlaybackDevice.device.data}
                                labels={viewershipAnalytics.concurrentPlaybackDevice.device.labels} 
                                hidden={selectedTabPlayback !== "device"} />
                            <BarChart
                                datasetName="Avg Concurent playback"
                                beginAtZero={true}
                                data={viewershipAnalytics.concurrentPlaybackDevice.content.data}
                                yAxesName="Avg Concurent playback"
                                labels={labelsFormate}
                                hidden={selectedTabPlayback !== "content"} />
                            <div hidden={selectedTabPlayback !== "map"}>
                                {renderMap(viewershipAnalytics.concurrentPlaybackDevice.map, "idMapPlayback")}
                            </div>
                        </AnalyticsCard>
                    </div>
                </div>
    
            </React.Fragment>
        )
    }
    
}