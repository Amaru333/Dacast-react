import React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { IconStyle } from '../../../shared/Common/Icon';
import { BarChart } from '../../../components/Analytics/BarChart';
import { tsToLocaleDate } from '../../../utils/utils';
import DoubleLineChart from '../../../components/Analytics/DoubleLineChart';
import { CheeseChart } from '../../../components/Analytics/CheeseChart'; import { InputTags } from '../../../components/FormsComponents/Input/InputTags';
import { TabSetupContainer, TabSetupStyles, HeaderBorder, ItemSetupRow } from '../Playlist/Setup/Setup';
import { Breadcrumb } from '../Folders/Breadcrumb';
import { FolderAsset } from '../../redux-flow/store/Folders/types';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { AnalyticsCard, renderMap, DateFilteringAnalytics, handleRowIconType, AnalyticsContainerHalfSelector, BreadcrumbContainer, ThirdLgHalfXmFullXs, FailedCardAnalytics, HalfSmFullXs } from './AnalyticsCommun';
import { ViewershipComponentProps } from '../../containers/Analytics/Viewership';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import moment from 'moment';

export const ViewershipAnalytics = (props: ViewershipComponentProps) => {

    const [selectedFolder, setSelectedFolder] = React.useState<string>('/');

    const [selectedItems, setSelectedItems] = React.useState<FolderAsset[]>([]);
    const [checkedSelectedItems, setCheckedSelectedItems] = React.useState<FolderAsset[]>([]);

    const [checkedContents, setCheckedContents] = React.useState<FolderAsset[]>([]);

    const [selectedTabConsumption, setSelectedTabConsumption] = React.useState<string>('time');
    const [selectedTabViewing, setSelectedTabViewing] = React.useState<string>('device');
    const [selectedTabPlayback, setSelectedTabPlayback] = React.useState<string>('map')

    const [dates, setDates] = React.useState<{ end: number; start: number }>({ end: moment().subtract(1, 'hour'), start: moment().subtract(1, 'days') })

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
                return el.objectID === elChecked.objectID;
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
                    <InputCheckbox className='mr2' id={element.objectID + element.type + 'InputCheckbox'} key={'foldersTableInputCheckbox' + element.objectID}
                        defaultChecked={checkedSelectedItems.includes(element)}
                        onChange={() => handleCheckboxSelected(element)}
                    />
                    {handleRowIconType(element)}
                    <Text className='pl2' size={14} weight='reg'>{element.title}</Text>
                    <div className="iconAction flex-auto justify-end">
                        <IconStyle className="right mr1" coloricon='gray-1' onClick={() => handleDecreaseOrder(element)}  >arrow_downward</IconStyle>
                        <IconStyle className="right" coloricon='gray-1' onClick={() => handleIncreaseOrder(element)} >arrow_upward</IconStyle>
                    </div>
                </ItemSetupRow>
            )
        })
    }

    const updateData = (dates: any) => {

        //let options = { ...dates, selectedContents: selectedItems.map(e => e.objectID) };
        let options = { end: Math.round(dates.endDate / 1000), start: Math.round(dates.startDate / 1000 ) };
        props.getAnalyticsViewership(options)
    }

    const renderContentsList = () => {
        return props.folderData.requestedContent.results.map((row) => {
            if (row.type === "playlist" || selectedItems.includes(row)) {
                return;
            }
            return (
                <ItemSetupRow className='col col-12 flex items-center p2 pointer'
                    selected={checkedContents.includes(row)}
                    onDoubleClick={() => { row.type === "folder" ? handleNavigateToFolder(row.title) : null }}
                >
                    {row.type !== "folder" ?
                        <InputCheckbox className='mr2' id={row.objectID + row.type + 'InputCheckbox'} key={'foldersTableInputCheckbox' + row.objectID}
                            onChange={() => handleCheckboxContents(row)}
                            defaultChecked={checkedContents.includes(row)}

                        />
                        : null}
                    {handleRowIconType(row)}
                    <Text className="pl2" key={'foldersTableName' + row.objectID} size={14} weight='reg' color='gray-1'>{row.title}</Text>
                    {
                        row.type === "folder" ?
                            <div className="flex-auto justify-end">
                                <IconStyle className="right" onClick={() => handleNavigateToFolder(row.title)} coloricon='gray-3'>keyboard_arrow_right</IconStyle>
                            </div>
                            : null
                    }
                </ItemSetupRow>
            )
        })
    }

    const formateDates = (labels: number[]) => {
        if (dates.start + (24 * 3600) < dates.end) {
            return labels.map(number => tsToLocaleDate(number, { hour: "2-digit", minute: "2-digit", day: '2-digit' }))
        }
        return labels.map(number => tsToLocaleDate(number))
    };

    if (props.viewershipAnalytics.data) {
        const viewershipAnalytics = props.viewershipAnalytics.data;
        return (
            <React.Fragment>
                <div className="col col-12 mb25">
                    <DateFilteringAnalytics defaultDates={dates} refreshData={updateData} />
                    {/* PART OF ANALYTICS V2 TO REWORK

                    <div className="flex items-center col col-12">
                        <div className="inline-flex items-center flex col-7 mb2">
                            <IconStyle coloricon='gray-3'>search</IconStyle>
                            <InputTags noBorder={true} placeholder="Search..." style={{ display: "inline-block" }} defaultTags={[]} />
                        </div>
                    </div>
                    <AnalyticsContainerHalfSelector className="col sm-col-5 col-12" >
                        <BreadcrumbContainer className="pl1 pr1">
                            <Breadcrumb options={selectedFolder} callback={(value: string) => setSelectedFolder(value)} />
                        </BreadcrumbContainer>
                        {renderContentsList()}
                    </AnalyticsContainerHalfSelector>
                    <div className="col sm-show sm-col-2 col-12" style={{ marginTop: 70 }}>
                        <Button onClick={() => handleMoveToSelected()} className='block ml-auto mr-auto mb2' typeButton='secondary' sizeButton='xs' buttonColor='blue'><IconStyle>chevron_right</IconStyle></Button>
                        <Button onClick={() => handleRemoveFromSelected()} className='block ml-auto mr-auto' typeButton='secondary' sizeButton='xs' buttonColor='blue'><IconStyle>chevron_left</IconStyle></Button>
                    </div>
                    <Button disabled={selectedItems.length !== 0} onClick={() => handleMoveToSelected()} className='block ml-auto mr-auto mb2 col-12 mb2 mt2 xs-show' typeButton='secondary' sizeButton='xs' buttonColor='blue'>Add</Button>
                    <AnalyticsContainerHalfSelector className="col sm-col-5 col-12" >
                        <HeaderBorder className="p2">
                            <Text color={"gray-1"} size={14} weight='med'>Selected contents</Text>
                        </HeaderBorder>
                        {renderSelectedItems()}
                    </AnalyticsContainerHalfSelector>
                    <Button disabled={!selectedItems.length} onClick={() => handleRemoveFromSelected()} className='xs-show col-12  mt2 mb2' typeButton='secondary' sizeButton='xs' buttonColor='blue'>Remove</Button> */}
                </div>
                <div className="clearfix mxn1 mb2">
                    <div className={HalfSmFullXs}>
                        <AnalyticsCard data={viewershipAnalytics.playtimePerDevices ? viewershipAnalytics.playtimePerDevices.csv : []} infoText="On which devices viewers are consuming your data" title="Play time by Device">
                            {
                                viewershipAnalytics.playtimePerDevices ?
                                    viewershipAnalytics.playtimePerDevices.failed ?
                                        <FailedCardAnalytics /> :
                                        <CheeseChart
                                            displayBytesFromGB={true}
                                            data={viewershipAnalytics.playtimePerDevices.data.length ? viewershipAnalytics.playtimePerDevices.data : [0]}
                                            labels={viewershipAnalytics.playtimePerDevices.data.length ? viewershipAnalytics.playtimePerDevices.labels : ["No Data"]} />
                                    :
                                    <LoadingSpinner center size='medium' color='violet' />
                            }
                        </AnalyticsCard>
                    </div>
                    <div className={HalfSmFullXs}>
                        <AnalyticsCard data={viewershipAnalytics.playtimePerLocation.data ? viewershipAnalytics.playtimePerDevices.csv : []} infoText="Reports on your data consumption" title="Play time by location">
                            {
                                viewershipAnalytics.playtimePerLocation.data ?
                                    viewershipAnalytics.playtimePerLocation.failed ?
                                        <FailedCardAnalytics  /> :
                                        <div >
                                            {renderMap(viewershipAnalytics.playtimePerLocation.data, "idMapConsumption", false)}
                                        </div>
                                    :
                                    <LoadingSpinner  center size='medium' color='violet' />
                            }
                        </AnalyticsCard>
                    </div>
                    {/*  PART OF ANALYTICS V2 TO REWORK

                    <div className={ThirdLgHalfXmFullXs}>
                        <AnalyticsCard infoText="On which domains viewers are consuming your data" title="Consumption by Domain">
                            {
                                viewershipAnalytics.consumptionPerDomain ?
                                    viewershipAnalytics.consumptionPerDomain.failed ?
                                        <FailedCardAnalytics /> :
                                        <BarChart
                                            datasetName="GBytes"
                                            displayFromMb
                                            beginAtZero={true}
                                            data={viewershipAnalytics.consumptionPerDomain.value}
                                            yAxesName="GB"
                                            labels={viewershipAnalytics.consumptionPerDomain.domain} />
                                    :
                                    <LoadingSpinner center size='medium' color='violet' />
                            }
                        </AnalyticsCard>
                    </div>
                    <div className={ThirdLgHalfXmFullXs}>
                        <AnalyticsCard infoText="The number of views vs number of people viewing over time" title="Plays and Viewers by Time">
                            {
                                viewershipAnalytics.playsViewersPerTime ?
                                    viewershipAnalytics.playsViewersPerTime.failed ?
                                        <FailedCardAnalytics /> :
                                        <DoubleLineChart
                                            datasetName="Hits"
                                            noDecimals={false}
                                            beginAtZero={true}
                                            yAxesName="Plays and viewers"
                                            datasetName1="plays"
                                            datasetName2="viewers"
                                            data1={viewershipAnalytics.playsViewersPerTime.plays.data}
                                            data2={viewershipAnalytics.playsViewersPerTime.viewers.data}
                                            labels={formateDates(viewershipAnalytics.playsViewersPerTime.viewers.time)} />
                                    :
                                    <LoadingSpinner center size='medium' color='violet' />
                            }
                        </AnalyticsCard>
                    </div>
                    <div style={{ float: "right" }} className={ThirdLgHalfXmFullXs}>
                        <AnalyticsCard infoText="Reports on your data consumption" title="Consumption Breakdown">

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
                            {
                                viewershipAnalytics.playtimePerLocation.time ?
                                    viewershipAnalytics.playtimePerLocation.time.failed ?
                                        <FailedCardAnalytics hidden={selectedTabConsumption !== "time"} /> :
                                        <BarChart
                                            hidden={selectedTabConsumption !== "time"}
                                            datasetName="GBytes"
                                            displayFromMb
                                            beginAtZero={true}
                                            data={viewershipAnalytics.playtimePerLocation.time.data}
                                            yAxesName="GB"
                                            labels={formateDates(viewershipAnalytics.playtimePerLocation.time.time)} />
                                    :
                                    <LoadingSpinner hidden={selectedTabConsumption !== "time"} center size='medium' color='violet' />
                            }
                            {
                                viewershipAnalytics.playtimePerLocation.content ?
                                    viewershipAnalytics.playtimePerLocation.content.failed ?
                                        <FailedCardAnalytics hidden={selectedTabConsumption !== "content"} /> :
                                        <BarChart
                                            hidden={selectedTabConsumption !== "content"}
                                            datasetName="GBytes"
                                            displayFromMb
                                            beginAtZero={true}
                                            data={viewershipAnalytics.playtimePerLocation.content.data}
                                            yAxesName="GB"
                                            labels={viewershipAnalytics.playtimePerLocation.content.content} />
                                    :
                                    <LoadingSpinner hidden={selectedTabConsumption !== "content"} center size='medium' color='violet' />
                            }
                            {
                                viewershipAnalytics.playtimePerLocation.data ?
                                    viewershipAnalytics.playtimePerLocation.data.failed ?
                                        <FailedCardAnalytics hidden={selectedTabConsumption !== "map"} /> :
                                        <div hidden={selectedTabConsumption !== "map"}>
                                            {renderMap(viewershipAnalytics.playtimePerLocation.data, "idMapConsumption")}
                                        </div>
                                    :
                                    <LoadingSpinner hidden={selectedTabConsumption !== "map"} center size='medium' color='violet' />
                            }
                        </AnalyticsCard>
                    </div>
                    <div className={ThirdLgHalfXmFullXs}>
                        <AnalyticsCard infoText="Reports on the duration of content consumption" title="Viewing Time Breakdown">
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
                            {
                                viewershipAnalytics.viewingTimeBreakdown.device ?
                                    viewershipAnalytics.viewingTimeBreakdown.device.failed ?
                                        <FailedCardAnalytics hidden={selectedTabViewing !== "device"} /> :
                                        <CheeseChart
                                            displayBytesFromGB={false}
                                            data={viewershipAnalytics.viewingTimeBreakdown.device.data}
                                            labels={viewershipAnalytics.viewingTimeBreakdown.device.labels}
                                            hidden={selectedTabViewing !== "device"} />
                                    :
                                    <LoadingSpinner hidden={selectedTabViewing !== "device"} center size='medium' color='violet' />
                            }
                            {
                                viewershipAnalytics.viewingTimeBreakdown.content ?
                                    viewershipAnalytics.viewingTimeBreakdown.content.failed ?
                                        <FailedCardAnalytics hidden={selectedTabViewing !== "content"}  /> :
                                        <BarChart
                                            datasetName="Minutes"
                                            displayBytesFromGB={false}
                                            beginAtZero={true}
                                            data={viewershipAnalytics.viewingTimeBreakdown.content.data}
                                            yAxesName="min"
                                            labels={viewershipAnalytics.viewingTimeBreakdown.content.labels}
                                            hidden={selectedTabViewing !== "content"} />
                                    :
                                    <LoadingSpinner hidden={selectedTabViewing !== "content"} center size='medium' color='violet' />
                            }
                            {
                                viewershipAnalytics.viewingTimeBreakdown.map ?
                                    viewershipAnalytics.viewingTimeBreakdown.map.failed ?
                                        <FailedCardAnalytics hidden={selectedTabViewing !== "map"} /> :
                                        <div hidden={selectedTabViewing !== "map"}>
                                            {renderMap(viewershipAnalytics.viewingTimeBreakdown.map, "idMapViewing")}
                                        </div>
                                    :
                                    <LoadingSpinner hidden={selectedTabViewing !== "map"} center size='medium' color='violet' />
                            }

                        </AnalyticsCard>
                    </div>
                    <div className={ThirdLgHalfXmFullXs}>
                        <AnalyticsCard infoText="The number of viewers consuming your content at the same time" title="Concurrent Playback Sessions">
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
                            {
                                viewershipAnalytics.concurrentPlayback.device ?
                                    viewershipAnalytics.concurrentPlayback.device.failed ?
                                        <FailedCardAnalytics hidden={selectedTabPlayback !== "device"} /> :
                                        <CheeseChart
                                            displayBytesFromGB={false}
                                            data={viewershipAnalytics.concurrentPlayback.device.data}
                                            labels={viewershipAnalytics.concurrentPlayback.device.labels}
                                            hidden={selectedTabPlayback !== "device"} />
                                    :
                                    <LoadingSpinner hidden={selectedTabPlayback !== "device"} center size='medium' color='violet' />
                            }
                            {
                                viewershipAnalytics.concurrentPlayback.content ?
                                    viewershipAnalytics.concurrentPlayback.content.failed ?
                                        <FailedCardAnalytics hidden={selectedTabPlayback !== "content"} /> :
                                        <BarChart
                                            datasetName="Avg Concurent playback"
                                            beginAtZero={true}
                                            data={viewershipAnalytics.concurrentPlayback.content.data}
                                            yAxesName="Avg Concurent playback"
                                            labels={viewershipAnalytics.concurrentPlayback.content.content}
                                            hidden={selectedTabPlayback !== "content"} />
                                    :
                                    <LoadingSpinner hidden={selectedTabPlayback !== "content"} center size='medium' color='violet' />
                            }
                            {
                                viewershipAnalytics.concurrentPlayback.map ?
                                    viewershipAnalytics.concurrentPlayback.map.failed ?
                                        <FailedCardAnalytics hidden={selectedTabPlayback !== "map"}/> :
                                        <div hidden={selectedTabPlayback !== "map"}>
                                            {renderMap(viewershipAnalytics.concurrentPlayback.map, "idMapPlayback")}
                                        </div>
                                    :
                                    <LoadingSpinner hidden={selectedTabPlayback !== "map"} center size='medium' color='violet' />
                            }
                        </AnalyticsCard>
                    </div> */}
                </div>

            </React.Fragment>
        )
    }

}