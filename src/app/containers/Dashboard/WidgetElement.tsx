import React from 'react'
import { Card } from '../../../components/Card/Card'
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { FailedCardAnalytics } from '../../shared/Analytics/AnalyticsCommun';

export const WidgetElement = (props: React.HTMLAttributes<HTMLDivElement> & {loading? : boolean; failed?: boolean; placeholderWidget?: boolean; customPadding?: string} ) => {
    
    return (
        <div className={props.className}>

            <Card backgroundColor={props.placeholderWidget? "gray-7" : "white"} customPadding={props.customPadding} className="dashboardCard">
                {props.loading ?
                    <LoadingSpinner center size='medium' color='violet' />
                    : props.failed ?
                        <FailedCardAnalytics /> :
                        !props.placeholderWidget && props.children
                }
            </Card>
        </div>
    )
}

WidgetElement.defaultProps = { loading: false, failed: false };
