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

    const [profile, setProfile] = React.useState<number>(4);
    React.useEffect(() => { }, [profile])

    var trialDashboardProps = {
        bandwidth: {
            limit: 5000,
            consumed: 4500
        },
        storage: {
            limit: 1000,
            consumed: 500
        },
        encoding: {
            limit: 50000,
            consumed: 35000
        },
        overage: {
            enabled: true,
            value: 5
        },
        plan: {
            libelle: "Enterprise",
            price: 390,
            nextBill: "2019-02-04",
            isTrial: false,
            daysLeft: 0
        }
    }

    const vodDashboardProps = {
        totalVideos: 3567,
        videoPlays: 48790,
        impressions: 76625,
        topVideos: [
            { name: "Video 1", viewers: 29384 },
            { name: "Video 2", viewers: 28384 },
            { name: "Video 3", viewers: 18384 },
            { name: "Video 4", viewers: 10927 },
        ]
    }

    const pwaywallDashboardProps = {
        balance: 543,
        revenue: 2356 
    }

    const liveDashboardProps = {
        activeChannels: 276,
        totalChannels: 456,
        liveViewers: 2389,
        topChannels: [
            { name: "Channel 1", viewers: 29384 },
            { name: "Channel 2", viewers: 28384 },
            { name: "Channel 3", viewers: 18384 },
            { name: "Channel 4", viewers: 10927 },
        ]
    }

    const renderDashboard = () => {
        switch (profile) {
            case 1:
                return (
                    <>
                        <GeneralDashboard profile={trialDashboardProps} />
                        <TrialAdditionalDashboard />
                    </>
                )
            case 3:
                return (
                    <>
                        <GeneralDashboard profile={trialDashboardProps} />
                        <LiveDashboard profile={liveDashboardProps}/>
                        <VodDashboard profile={vodDashboardProps} fullWidth={false} />
                    </>
                )
            case 4:
                return (
                    <>
                        <GeneralDashboard profile={trialDashboardProps} />
                        <LiveDashboard profile={liveDashboardProps}/>
                        <VodDashboard profile={vodDashboardProps} rightSide={true} fullWidth={false} />
                        <PaywallDashboard profile={pwaywallDashboardProps} rightSide={false} />
                    </>
                )
            case 5:
                return (
                    <>
                        <GeneralDashboard profile={trialDashboardProps} />
                        <LiveDashboard profile={liveDashboardProps}/>
                        <PaywallDashboard profile={pwaywallDashboardProps} rightSide={true} />
                    </>
                )
            case 6:
                return (
                    <>
                        <GeneralDashboard profile={trialDashboardProps} />
                        <VodDashboard profile={vodDashboardProps} fullWidth={true} />
                        <PaywallDashboard profile={pwaywallDashboardProps} rightSide={false} />
                    </>
                )
            default:
                return (
                    <>
                        Error
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
    var profileValue: { [key: string]: number } = {
        "Free acount": 1,
        "Live+Vod": 3,
        "Live+VoD+Paywall": 4,
        "Live+Paywall": 5,
        "VoD+Paywall": 6,
    }
    return (
        <>
            <DropdownSingle defaultValue="Live+VoD+Paywall" className="ml-auto mr-auto col-5" callback={(value: string) => setProfile(profileValue[value])} list={profileList} id="pickProfile" dropdownTitle="Pick a profile" />
            {renderDashboard()}
            <div className="clearfix"></div>
        </>
    )
};

export default Dashboard;