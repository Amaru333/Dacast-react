import React from "react"
import { classContainer, classItemFullWidth, classItemFullWidthContainer, classItemHalfWidthContainer } from "./DashboardStyles"
import { WidgetElement } from "./WidgetElement"

export const PlaceholderDashboard = () => {
    return (
        <React.Fragment>
           <section className="col lg-col-6 sm-col-12 pr2">
               <div className="flex items-baseline mb1"></div>

                <div className={classContainer}>
                    <WidgetElement placeholderWidget className={classItemHalfWidthContainer} />
                    <WidgetElement placeholderWidget className={classItemHalfWidthContainer} />
                    <WidgetElement placeholderWidget className={classItemFullWidth} />
                </div>
           </section>
           <section className="right border-box lg-col-6 sm-col-12">
               <div className="flex items-baseline mb1"></div>

                <div className={classContainer}>
                    <WidgetElement placeholderWidget className={classItemHalfWidthContainer} />
                    <WidgetElement placeholderWidget className={classItemHalfWidthContainer} />
                    <WidgetElement placeholderWidget className={classItemHalfWidthContainer} />
                    <WidgetElement placeholderWidget className={classItemHalfWidthContainer} />
                    <WidgetElement placeholderWidget className={classItemFullWidth} />
                </div>
           </section>
           <section className="col lg-col-6 sm-col-12 pr2">
               <div className="flex items-baseline mb1"></div>

                <div className={classContainer}>
                    <WidgetElement placeholderWidget className={classItemHalfWidthContainer} />
                    <WidgetElement placeholderWidget className={classItemHalfWidthContainer} />
                </div>
           </section>
            
            
        </React.Fragment>
    )
}