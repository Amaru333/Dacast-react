import * as React from 'react';
import { Card } from './Card/Card';
import { VodDashboard } from '../containers/Dashboard/VodDashboard';
import { PaywallDashboard } from '../containers/Dashboard/PaywallDashboard';
import { LiveDashboard } from '../containers/Dashboard/LiveDashboard';
import { GeneralDashboard } from '../containers/Dashboard/GeneralDashboard';
import { TrialAdditionalDashboard } from '../containers/Dashboard/TrialAdditionalDashboard';
import { DropdownSingle } from './FormsComponents/Dropdown/DropdownSingle';

export type Profile = 1 | 2 | 3 | 4 | 5 | 6;

export const WidgetElement = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={props.className}>
            <Card className="dashboardCard">
                {props.children}
            </Card>
        </div>
    )
}

const Dashboard = (props: {profile: Profile}) => {

    const renderDashboard = () => {
        switch(props.profile) {
            case 1:
                return (
                    <>
                        <GeneralDashboard profile={props.profile} />
                        <TrialAdditionalDashboard />
                    </>
                )
            case 2: 
                return (
                    <>
                        <GeneralDashboard profile={props.profile}/>
                        {/** Add end free trial stuff */}
                    </>
                )
            case 3: 
                return (
                    <>
                        <GeneralDashboard profile={props.profile}/>
                        <LiveDashboard/>
                        <VodDashboard fullWidth={false} />
                    </>
                )
            case 4: 
                return (
                    <>
                        <GeneralDashboard profile={props.profile}/>
                        <LiveDashboard/>
                        <VodDashboard  fullWidth={false} />
                        <PaywallDashboard rightSide={false} />
                    </>
                )
            case 5: 
                return (
                    <>
                        <GeneralDashboard profile={props.profile}/>
                        <LiveDashboard/>
                        <PaywallDashboard rightSide={true}/>
                    </>
                )
            case 6: 
                return (
                    <>
                        <GeneralDashboard profile={props.profile}/>
                        <VodDashboard fullWidth={true} />
                        <PaywallDashboard rightSide={false}/>
                    </>
                )
        }
    }

    var profileList = {
        "Free acount": false,
        "Live+Vod": false,
        "Live+VoD+Paywall": false,
        "Live+Paywall": false,
        "VoD+Paywall": false,
    }
    return (
        <>
            <DropdownSingle list={profileList} id="pickProfile" dropdownTitle="Pick a profile" />
            {renderDashboard()}
            <div className="clearfix"></div>
        </>
    )
};

Dashboard.defaultProps = { profile: 1 }

export default Dashboard;