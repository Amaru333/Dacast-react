import React from 'react';
import { Text } from '../../../components/Typography/Text';
import { BarChartOld } from '../../../components/Analytics/AnalyticsOld/BarChartOld';
import { tsToLocaleDate } from '../../../utils/formatUtils';
import { FolderAsset } from '../../redux-flow/store/Folders/types';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { AnalyticsCard, ThirdLgHalfXmFullXs, FailedCardAnalytics, handleRowIconType } from './AnalyticsCommunOld';
import { IconStyle } from '../../../shared/Common/Icon';
import { RevenueComponentProps } from '../../containers/Analytics/Revenue';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ItemSetupRow } from '../Paywall/Groups/GroupsStyle';
import { ContentSelector } from '../../../components/ContentSelector/ContentSelector';

export const RevenueAnalytics = (props: RevenueComponentProps) => {

    const handleSave = (selectedContents: (FolderAsset)[]) => {
        let options = { selectedContents: selectedContents.map(e => {return ( e.objectID)}) };
        props.getAnalyticsRevenue(options);
    }

    return (
        <React.Fragment>
            <div className="col col-12 mb25">
                <ContentSelector
                    folderData={props.folderData}
                    getFolderContent={props.getFolderContent}
                    showSort={true}
                    type={'content'}
                    selectedItems={[]} 
                    title={"Selected contents"} 
                    callback={handleSave}
                />
            </div>
            <div className="clearfix mxn1 mb2">
                <div className={ThirdLgHalfXmFullXs}>
                    <AnalyticsCard infoText="Number of sales over time" title="Sales by Time">
                        {
                            props.analyticsRevenueData.salesTime ?
                            props.analyticsRevenueData.salesTime.failed ?
                                    <FailedCardAnalytics />
                                    :
                                <BarChartOld
                                    datasetName="Sales"
                                    beginAtZero={true}
                                    data={props.analyticsRevenueData.salesTime.data}
                                    yAxesName="Sales"
                                    labels={props.analyticsRevenueData.salesTime.time.map(number => tsToLocaleDate(number / 1000))} /> :
                                <LoadingSpinner center size='medium' color='violet' />
                        }

                    </AnalyticsCard>
                </div>
                <div className={ThirdLgHalfXmFullXs}>
                    <AnalyticsCard infoText="Revenue generation over time" title="Revenue by Time">
                        {
                            props.analyticsRevenueData.revenueTime ?
                            props.analyticsRevenueData.revenueTime.failed ?
                            <FailedCardAnalytics />
                            :
                                <BarChartOld
                                    datasetName="Revenue ($)"
                                    beginAtZero={true}
                                    data={props.analyticsRevenueData.revenueTime.data}
                                    yAxesName="Revenue"
                                    labels={props.analyticsRevenueData.revenueTime.time.map(number => tsToLocaleDate(number / 1000))} /> :
                                <LoadingSpinner center size='medium' color='violet' />
                        }

                    </AnalyticsCard>
                </div>
                <div className={ThirdLgHalfXmFullXs}>
                    <AnalyticsCard infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Sales by Country">
                        {
                            props.analyticsRevenueData.salesCountries ?
                            props.analyticsRevenueData.salesCountries.failed ?
                            <FailedCardAnalytics />
                            :
                            <BarChartOld
                                datasetName="Countrie"
                                beginAtZero={true}
                                data={props.analyticsRevenueData.salesCountries.data}
                                yAxesName="Countries"
                                labels={props.analyticsRevenueData.salesCountries.countries} />  :
                                <LoadingSpinner center size='medium' color='violet' />
                        }
                    </AnalyticsCard>
                </div>
            </div>
        </React.Fragment >
    )

}