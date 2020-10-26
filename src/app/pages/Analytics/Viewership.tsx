import React from 'react';
import { Text } from '../../../components/Typography/Text';
import { IconStyle } from '../../../shared/Common/Icon';
import { tsToLocaleDate } from '../../../utils/formatUtils';
import { CheeseChart } from '../../../components/Analytics/CheeseChartOld'; 
import { Breadcrumb } from '../Folders/Breadcrumb';
import { FolderAsset } from '../../redux-flow/store/Folders/types';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { renderMap, DateFilteringAnalytics, handleRowIconType, AnalyticsContainerHalfSelector, BreadcrumbContainer, ThirdLgHalfXmFullXs, FailedCardAnalytics, HalfSmFullXs } from './AnalyticsCommun';
import { ViewershipComponentProps } from '../../containers/Analytics/Viewership';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import moment from 'moment';
import { AnalyticsCard } from '../../../components/Analytics/AnalyticsCard/AnalyticsCard';
import { ItemSetupRow } from '../Paywall/Groups/GroupsStyle';

export const ViewershipAnalytics = (props: ViewershipComponentProps) => {

    const [selectedFolder, setSelectedFolder] = React.useState<string>('/');

    const [selectedItems, setSelectedItems] = React.useState<FolderAsset[]>([]);
    const [checkedSelectedItems, setCheckedSelectedItems] = React.useState<FolderAsset[]>([]);

    const [checkedContents, setCheckedContents] = React.useState<FolderAsset[]>([]);
    
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
                </div>

            </React.Fragment>
        )
    }

}