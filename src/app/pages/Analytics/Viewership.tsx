import React from 'react';
import { CheeseChartOld } from '../../../components/Analytics/AnalyticsOld/CheeseChartOld'; 
import { AnalyticsCard, renderMap, DateFilteringAnalytics, handleRowIconType, AnalyticsContainerHalfSelector, BreadcrumbContainer, ThirdLgHalfXmFullXs, FailedCardAnalytics, HalfSmFullXs } from './AnalyticsCommunOld';
import { ViewershipComponentProps } from '../../containers/Analytics/Viewership';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { dateAdd } from '../../../utils/services/date/dateService';

export const ViewershipAnalytics = (props: ViewershipComponentProps) => {

    const updateData = (dates: any) => {

        //let options = { ...dates, selectedContents: selectedItems.map(e => e.objectID) };
        let options = { end: Math.round(dates.endDate / 1000), start: Math.round(dates.startDate / 1000 ) };
        props.getAnalyticsViewership(options)
    }

 

    if (props.viewershipAnalytics.data) {
        const viewershipAnalytics = props.viewershipAnalytics.data;
        return (
            <React.Fragment>
                <div className="col col-12 mb25">
                    <DateFilteringAnalytics defaultDates={{ end: dateAdd(new Date(), 'hour', -1), start: dateAdd(new Date(), 'day', -1) }} refreshData={updateData} />
                </div>
                <div className="clearfix mxn1 mb2">
                    <div className={HalfSmFullXs}>
                        <AnalyticsCard dataName='playTimePerDevices' data={viewershipAnalytics.playtimePerDevices ? viewershipAnalytics.playtimePerDevices.csv : []} infoText="On which devices viewers are consuming your data" title="Play time by Device">
                            {
                                viewershipAnalytics.playtimePerDevices ?
                                    viewershipAnalytics.playtimePerDevices.failed ?
                                        <FailedCardAnalytics /> :
                                        <CheeseChartOld
                                            data={viewershipAnalytics.playtimePerDevices.data.length ? viewershipAnalytics.playtimePerDevices.data : [0]}
                                            labels={viewershipAnalytics.playtimePerDevices.data.length ? viewershipAnalytics.playtimePerDevices.labels : ["No Data"]} />
                                    :
                                    <LoadingSpinner center size='medium' color='violet' />
                            }
                        </AnalyticsCard>
                    </div>
                    <div className={HalfSmFullXs}>
                        <AnalyticsCard dataName='playTimePerLocation' data={viewershipAnalytics.playtimePerLocation ? viewershipAnalytics.playtimePerLocation.csv : []} infoText="Reports on your data consumption" title="Play time by location">
                            {
                                viewershipAnalytics.playtimePerLocation ?
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