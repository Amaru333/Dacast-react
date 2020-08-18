import React from 'react';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { BarChart } from '../../../components/Analytics/BarChart';
import { tsToLocaleDate } from '../../../utils/utils';
import DoubleLineChart from '../../../components/Analytics/DoubleLineChart';
import { InputTags } from '../../../components/FormsComponents/Input/InputTags';
import { Breadcrumb } from '../Folders/Breadcrumb';
import { FolderAsset } from '../../redux-flow/store/Folders/types';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { AnalyticsCard, renderMap, DateFilteringAnalytics, AnalyticsContainerHalfSelector, BreadcrumbContainer, ThirdLgHalfXmFullXs, FailedCardAnalytics } from './AnalyticsCommun';
import { IconStyle } from '../../../shared/Common/Icon';
import { RevenueComponentProps } from '../../containers/Analytics/Revenue';
import { ItemSetupRow, HeaderBorder } from '../Playlist/Setup/Setup';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import moment from 'moment';

export const RevenueAnalytics = (props: RevenueComponentProps) => {


    const [selectedFolder, setSelectedFolder] = React.useState<string>('/');
    const [selectedItems, setSelectedItems] = React.useState<FolderAsset[]>([]);
    const [checkedSelectedItems, setCheckedSelectedItems] = React.useState<FolderAsset[]>([]);
    const [checkedContents, setCheckedContents] = React.useState<FolderAsset[]>([]);
    const [dates, setDates] = React.useState<{ end: number; start: number }>({ end: Math.floor(Date.now()/1000), start: Math.floor(Date.now()/1000) })

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

    const handleRowIconType = (item: FolderAsset) => {
        switch (item.type) {
            case 'playlist':
                return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.objectID}>playlist_play</IconStyle>
            case 'folder':
                return <IconStyle coloricon={"gray-5"} key={'foldersTableIcon' + item.objectID}>folder_open</IconStyle>
            case 'channel':
            case 'live':
            case 'vod':
                return item.thumbnail ? 
                    <img key={"thumbnail" + item.objectID} width="auto" height={42} src={item.thumbnail} ></img>
                    :                                  
                        <div className='mr1 relative justify-center flex items-center' style={{ width: 94, height: 54, backgroundColor: '#AFBACC' }}>
                            <IconStyle className='' coloricon='gray-1' >play_circle_outlined</IconStyle>
                        </div>
            default:
                return (                                    
                    <div className='mr1 relative justify-center flex items-center' style={{ width: 94, height: 54, backgroundColor: '#AFBACC' }}>
                        <IconStyle className='' coloricon='gray-1' >play_circle_outlined</IconStyle>
                    </div>
                )
        }
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

    const renderSelectedItems = () => {
        return selectedItems.map((element: FolderAsset, i) => {
            return (
                <ItemSetupRow className='col col-12 flex items-center p2 pointer' selected={checkedSelectedItems.includes(element)} >
                        <InputCheckbox className='mr2' id={(element.objectID) + element.type + 'InputCheckbox'} key={'foldersTableInputCheckbox' + (element.objectID)}
                            defaultChecked={checkedSelectedItems.includes(element)}
                            onChange={() => handleCheckboxSelected(element)}
                        />
                    {handleRowIconType(element)}
                    <Text className='pl2' size={14} weight='reg'>{element.title ? element.title : element.name}</Text>
                </ItemSetupRow>
            )
        })
    }

    const renderContentsList = () => {
        return props.folderData.requestedContent ? props.folderData.requestedContent.results.map((row) => {
            if (row.type === "playlist" || selectedItems.includes(row)) {
                return;
            }
            return (
                <ItemSetupRow className='col col-12 flex items-center p2 pointer'
                    selected={checkedContents.some(item => item.objectID ===row.objectID)}
                    onDoubleClick={() => { row.type === "folder" ? handleNavigateToFolder(row.title) : null }}
                >
                    {row.type !== "folder" &&
                        <InputCheckbox className='mr2' id={row.objectID + row.type + 'InputCheckboxTab'} key={'foldersTableInputCheckbox' + row.objectID}
                            onChange={() => handleCheckboxContents(row)}
                            checked={checkedContents.some(item => item.objectID ===row.objectID)}
                            defaultChecked={checkedContents.some(item => item.objectID ===row.objectID)}

                        />
                    }
                    {handleRowIconType(row)}
                    <Text className="pl2" key={'foldersTableName' + row.objectID} size={14} weight='reg' color='gray-1'>{row.title}</Text>
                    {
                        row.type === "folder" &&
                            <div className="flex-auto justify-end">
                                <IconStyle className="right" onClick={() => handleNavigateToFolder(row.title)} coloricon='gray-3'>keyboard_arrow_right</IconStyle>
                            </div>
                    }
                </ItemSetupRow>
            )
        })
            : null
    }

    const updateData = (dates: any) => {
        setDates(dates);
        let options = { ...dates, selectedContents: selectedItems.map(e => e.id) };
        props.getAnalyticsRevenue(options);
    }

    return (
        <React.Fragment>
            <div className="col col-12 mb25">
                <DateFilteringAnalytics defaultDates={dates} refreshData={updateData} />
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
                <Button  disabled={selectedItems.length !== 0} onClick={() => handleMoveToSelected()} className='block ml-auto mr-auto mb2 col-12 mb2 mt2 xs-show' typeButton='secondary' sizeButton='xs' buttonColor='blue'>Add</Button>
                <AnalyticsContainerHalfSelector className="col sm-col-5 col-12" >
                    <HeaderBorder className="p2">
                        <Text color={"gray-1"} size={14} weight='med'>Selected contents</Text>
                    </HeaderBorder>
                    {renderSelectedItems()}
                    <Button buttonColor='blue' typeButton='primary' sizeButton='small' onClick={() => props.getAnalyticsRevenue({...dates, selectedContents: selectedItems.map(e => e.objectID)})}>Update Charts</Button>
                </AnalyticsContainerHalfSelector>
                <Button disabled={!selectedItems.length} onClick={() => handleRemoveFromSelected()} className='xs-show col-12  mt2 mb2' typeButton='secondary' sizeButton='xs' buttonColor='blue'>Remove</Button>
            </div>
            <div className="clearfix mxn1 mb2">
                <div className={ThirdLgHalfXmFullXs}>
                    <AnalyticsCard infoText="Number of sales over time" title="Sales by Time">
                        {
                            props.analyticsRevenueData.data.salesByTime ?
                            props.analyticsRevenueData.data.salesByTime.failed ?
                                    <FailedCardAnalytics />
                                    :
                                <BarChart
                                    datasetName="Sales"
                                    beginAtZero={true}
                                    data={props.analyticsRevenueData.data.salesByTime.data}
                                    yAxesName="Sales"
                                    labels={props.analyticsRevenueData.data.salesByTime.time.map(number => tsToLocaleDate(number))} /> :
                                <LoadingSpinner center size='medium' color='violet' />
                        }

                    </AnalyticsCard>
                </div>
                <div className={ThirdLgHalfXmFullXs}>
                    <AnalyticsCard infoText="Revenue generation over time" title="Revenue by Time">
                        {
                            props.analyticsRevenueData.data.revenueByTime ?
                            props.analyticsRevenueData.data.revenueByTime.failed ?
                            <FailedCardAnalytics />
                            :
                                <BarChart
                                    datasetName="Revenue ($)"
                                    beginAtZero={true}
                                    data={props.analyticsRevenueData.data.revenueByTime.data}
                                    yAxesName="Revenue"
                                    labels={props.analyticsRevenueData.data.revenueByTime.time.map(number => tsToLocaleDate(number))} /> :
                                <LoadingSpinner center size='medium' color='violet' />
                        }

                    </AnalyticsCard>
                </div>
                <div className={ThirdLgHalfXmFullXs}>
                    <AnalyticsCard infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Sales by Country">
                        {
                            props.analyticsRevenueData.data.salesPerCountry ?
                            props.analyticsRevenueData.data.salesPerCountry.failed ?
                            <FailedCardAnalytics />
                            :
                                renderMap(props.analyticsRevenueData.data.salesPerCountry, 'revenueAnalyticsDevices') :
                                <LoadingSpinner center size='medium' color='violet' />
                        }
                    </AnalyticsCard>
                </div>
            </div>
        </React.Fragment >
    )

}