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
import { AnalyticsCard, renderMap, handleRowIconType, DateFilteringAnalytics, AnalyticsContainerHalfSelector, BreadcrumbContainer, ThirdLgHalfXmFullXs } from './AnalyticsCommun';
import { IconStyle } from '../../../shared/Common/Icon';
import { RevenueComponentProps } from '../../containers/Analytics/Revenue';
import { ItemSetupRow, HeaderBorder } from '../Playlist/Setup/Setup';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

export const RevenueAnalytics = (props: RevenueComponentProps) => {

    const [selectedFolder, setSelectedFolder] = React.useState<string>('/');
    const [selectedItems, setSelectedItems] = React.useState<FolderAsset[]>([]);
    const [checkedSelectedItems, setCheckedSelectedItems] = React.useState<FolderAsset[]>([]);
    const [checkedContents, setCheckedContents] = React.useState<FolderAsset[]>([]);

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

    const updateData = (dates: any) => {
        let options = { ...dates, selectedContents: selectedItems.map(e => e.id) };
        props.getRevenueByTime(options);
        props.getSalesByTime(options);
        props.getSalesPerCountry(options);
    }

    console.log(props);
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
                    <AnalyticsCard infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Sales by Time">
                        {
                            props.analyticsRevenueData.data.salesByTime ?
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
                    <AnalyticsCard infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Revenue by Time">
                        {
                            props.analyticsRevenueData.data.revenueByTime ?
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
                                renderMap(props.analyticsRevenueData.data.salesPerCountry, 'revenueAnalyticsDevices') :
                                <LoadingSpinner center size='medium' color='violet' />
                        }
                    </AnalyticsCard>
                </div>
            </div>
        </React.Fragment >
    )

}