import * as React from 'react';
import { Card } from './Card/Card';
import { VodDashboard } from '../containers/Dashboard/VodDashboard';
import { PaywallDashboard } from '../containers/Dashboard/PaywallDashboard';
import { LiveDashboard } from '../containers/Dashboard/LiveDashboard';
import { GeneralDashboard } from '../containers/Dashboard/GeneralDashboard';
import { TrialAdditionalDashboard } from '../containers/Dashboard/TrialAdditionalDashboard';
import { DropdownSingle } from './FormsComponents/Dropdown/DropdownSingle';

export const WidgetElement = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={props.className}>
            <Card className="dashboardCard">
                {props.children}
            </Card>
        </div>
    )
}

const Dashboard = (props: {}) => {

    const [profile, setProfile] = React.useState<number>(1);
    React.useEffect(() => {}, [profile])

    const renderDashboard = () => {
        switch(profile) {
            case 1:
                return (
                    <>
                        <GeneralDashboard profile={profile} />
                        <TrialAdditionalDashboard />
                    </>
                )
            case 2: 
                return (
                    <>
                        <GeneralDashboard profile={profile}/>
                        {/** Add end free trial stuff */}
                    </>
                )
            case 3: 
                return (
                    <>
                        <GeneralDashboard profile={profile}/>
                        <LiveDashboard/>
                        <VodDashboard fullWidth={false} />
                    </>
                )
            case 4: 
                return (
                    <>
                        <GeneralDashboard profile={profile}/>
                        <LiveDashboard/>
                        <VodDashboard rightSide={true} fullWidth={false} />
                        <PaywallDashboard rightSide={false} />
                    </>
                )
            case 5: 
                return (
                    <>
                        <GeneralDashboard profile={profile}/>
                        <LiveDashboard/>
                        <PaywallDashboard rightSide={true}/>
                    </>
                )
            case 6: 
                return (
                    <>
                        <GeneralDashboard profile={profile}/>
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
    var profileValue: {[key: string]: number} = {
        "Free acount": 1,
        "Live+Vod": 3,
        "Live+VoD+Paywall": 4,
        "Live+Paywall": 5,
        "VoD+Paywall": 6,
    }
    return (
        <>
            <DropdownSingle className="ml-auto mr-auto col-5" callback={(value: string) => setProfile(profileValue[value])} list={profileList} id="pickProfile" dropdownTitle="Pick a profile" />
            {renderDashboard()}
            <div className="clearfix"></div>
        </>
    )
};

Dashboard.defaultProps = { profile: 1 }

export default Dashboard;