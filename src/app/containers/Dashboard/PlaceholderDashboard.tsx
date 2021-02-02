import React from "react"
import { classContainer, classItemFullWidth, classItemFullWidthContainer, classItemHalfWidthContainer } from "./DashboardStyles"
import { WidgetElement } from "./WidgetElement"
import { Text } from '../../../components/Typography/Text';
import { useMedia } from "../../../utils/utils";

export const PlaceholderDashboard = () => {

    let smallScreen = useMedia('(max-width: 40em)')

    return (
        <React.Fragment>
            <section id="allowances" className="col col-12">
                <div className={smallScreen ? 'flex flex-column mb1' : "flex items-baseline mb1"}>
                    <Text size={24} weight="reg" className={smallScreen ? 'mb1' : "mt0 mb2 inline-block"}>
                        Dashboard
                    </Text>  
                </div>
                <div className={classContainer}>
                    <WidgetElement placeholderWidget className={classItemHalfWidthContainer} />
                    <WidgetElement placeholderWidget className={classItemHalfWidthContainer} />
                </div>
            </section>
            <section id="live" className="col lg-col-6 sm-col-12 pr2">
                <div className={classContainer}>
                    <WidgetElement placeholderWidget className={classItemHalfWidthContainer} />
                    <WidgetElement placeholderWidget className={classItemHalfWidthContainer} />
                    <WidgetElement placeholderWidget className={classItemFullWidth} />
                </div>
            </section>
            <section id="vod" className="right border-box lg-col-6 sm-col-12 pl2">
                <div className={classContainer}>
                    <WidgetElement placeholderWidget className={classItemHalfWidthContainer} />
                    <WidgetElement placeholderWidget className={classItemHalfWidthContainer} />
                    <WidgetElement placeholderWidget className={classItemHalfWidthContainer} />
                    <WidgetElement placeholderWidget className={classItemHalfWidthContainer} />
                    <WidgetElement placeholderWidget className={classItemFullWidth} />
                </div>
            </section>
            <section id="paywall" className="col lg-col-6 sm-col-12 pr2">
                <div className={classContainer}>
                    <WidgetElement placeholderWidget className={classItemHalfWidthContainer} />
                    <WidgetElement placeholderWidget className={classItemHalfWidthContainer} />
                </div>
            </section>  
        </React.Fragment>
    )
}