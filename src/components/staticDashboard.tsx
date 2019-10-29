import * as React from 'react';
import styled from 'styled-components';
import { Card } from './Card/Card';
import { Text } from './Typography/Text';
import { ProgressBar } from './FormsComponents/Progress/ProgressBar/ProgressBar';
import { Button } from './FormsComponents/Button/Button';
import { Icon } from '@material-ui/core';
import { IconProps } from '@material-ui/core/Icon';

var classContainer = "clearfix mxn2";
var classItemFullWidth = "col col-12 px2 mb3";
var classItemHalfWidthContainer = "col lg-col-6 md-col-6 sm-col-12 col-12 px2 mb3";
var classItemFullWidthContainer = "col lg-col-3 md-col-6 sm-col-12 col-12 px2 mb3";

export const WidgetElement = (props: React.HTMLAttributes<HTMLDivElement>) => {

    return (
        <div className={props.className}>
            <Card className="dashboardCard">
                {props.children}
            </Card>
        </div>
    )

}


export const Dashboard = (props: React.HTMLAttributes<HTMLDivElement>) => {


    return (
        <section className="col col-12">
            <div className="flex items-baseline mb1">
                <Text size={24} weight="reg" className="mt0 mb3 inline-block">
                    Dashboard
                </Text>
                <Text className="ml-auto" size={14} weight="reg" color="gray-2" ><b>For Billing Period</b> 06/30/2019-07/29/2019</Text>
            </div>

            <div className={classContainer}>
                <WidgetElement className={classItemFullWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Storage Remaining </Text>
                        <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <a href="javascript:alert('Go to purchase page')">Buy More</a> </Text>
                    </WidgetHeader>
                    <div className="flex flex-wrap items-baseline mb1">
                        <Text size={32} weight="reg" color="gray-1"> 10GB</Text><Text size={16} weight="reg" color="gray-4" >/20GB</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >50%</Text>
                    </div>
                    <ProgressBar size="large" color="violet" startingValue={50} />
                </WidgetElement>

                <WidgetElement className={classItemFullWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Data Remaining </Text>
                        <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <Button buttonColor="red" sizeButton="xs" onClick={() => alert('Go to purchase page')}>Buy More</Button> </Text>
                    </WidgetHeader>
                    <div className="flex flex-wrap items-baseline mb1">
                        <Text size={32} weight="reg" color="gray-1"> 20GB</Text><Text size={16} weight="reg" color="gray-4" >/100GB</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >20%</Text>
                    </div>
                    <ProgressBar size="large" color="red" startingValue={20} />
                    <Text size={12} weight="reg" color="red"> Upgrade before you run out of data</Text>
                </WidgetElement>

                <WidgetElement className={classItemFullWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Monthly Custom Plan </Text>
                        <IconGray1 className="ml-auto"><Icon>settings</Icon></IconGray1>
                    </WidgetHeader>
                    <Text className="inline-block mb1" size={14} weight="reg" color="gray-1">Next Bill due 09/17/2019</Text><br />
                    <Text size={32} weight="reg" color="gray-1">$612</Text>
                </WidgetElement>
                <div className={classItemFullWidthContainer}>
                    <SupportCard className="dashboardCard">
                        <WidgetHeader className="flex">
                            <Text size={16} weight="med" color="gray-1"> 24/7 Support </Text>
                            <CloseCross className="ml-auto"><Icon>close</Icon></CloseCross>
                        </WidgetHeader>
                        <Text size={12} weight="reg" color="gray-1" className="inline-block mb2">Need some help getting started?</Text><br />
                        <Button sizeButton="xs" typeButton="secondary">Chat now</Button>
                    </SupportCard>
                </div>
            </div>
        </section>
    )

}

const DashboardLive = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <section className="col lg-col-6 sm-col-12 pr2">
            <div className="flex items-baseline mb1">
                <IconGray1 className="mr1 self-center"><Icon>videocam</Icon></IconGray1>
                <Text size={24} weight="reg" className="mt0 inline-block">
                    Live Channels
                </Text>
            </div>

            <div className={classContainer}>
                <WidgetElement className={classItemHalfWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Active Channels </Text>
                    </WidgetHeader>
                    <div className="flex justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1"> 279<Text size={20} weight="reg" color="gray-4" >/500</Text></Text>
                    </div>
                </WidgetElement>

                <WidgetElement className={classItemHalfWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Live Viewers </Text>
                    </WidgetHeader>
                    <div className="flex justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">301</Text>
                    </div>
                </WidgetElement>

                <WidgetElement className={classItemFullWidth}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Top Live Channels </Text>
                    </WidgetHeader>
                    <div className="flex mb1">
                        <TableListStyle>
                            <thead>
                                <tr>
                                    <th className="col-2" ><Text size={14} weight="reg" ><b>#</b></Text></th>
                                    <th className="col-7"><Text size={14} weight="reg" ><b>Name</b></Text></th>
                                    <th className="col-3"><Text size={14} weight="reg" ><b>Viewers</b></Text></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="col-2"><Text size={14} weight="reg" >1</Text></td>
                                    <td className="col-7"><Text size={14} weight="reg" >Karmen likes Hello Kitty</Text></td>
                                    <td className="col-3"><Text size={14} weight="reg" >5,023</Text></td>
                                </tr>
                                <tr>
                                    <td className="col-2"><Text size={14} weight="reg" >2</Text></td>
                                    <td className="col-7"><Text size={14} weight="reg" >Lorem ipsum dolor sit amet.</Text></td>
                                    <td className="col-3"><Text size={14} weight="reg" >4,023</Text></td>
                                </tr>
                                <tr>
                                    <td className="col-2"><Text size={14} weight="reg" >3</Text></td>
                                    <td className="col-7"><Text size={14} weight="reg" >Neque porro quisquam est qui</Text></td>
                                    <td className="col-3"><Text size={14} weight="reg" >3,953</Text></td>
                                </tr>
                                <tr>
                                    <td className="col-2"><Text size={14} weight="reg" >4</Text></td>
                                    <td className="col-7"><Text size={14} weight="reg" >in voluptate velit esse cillum dolore</Text></td>
                                    <td className="col-3"><Text size={14} weight="reg" >1,343</Text></td>
                                </tr>
                            </tbody>

                        </TableListStyle>
                    </div>
                </WidgetElement>
            </div>
        </section>
    )
}

const TableListStyle = styled.table<{}>`
    tr{
        border-bottom: 1px solid ${props => props.theme.colors['gray-8']};
        padding: 6px;
        display: flex;
        th {
            text-align: left;
        }
        :last-child {
            border-bottom: none;
        }
    }
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const DashboardPaywall = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <section className="col lg-col-6 sm-col-12 pr2">
            <div className="flex items-baseline mb1">
                <IconGray1 className="mr1 self-center"><Icon>attach_money</Icon></IconGray1>
                <Text size={24} weight="reg" className="mt0 inline-block">
                    Paywall
                </Text>
            </div>

            <div className={classContainer}>
                <WidgetElement className={classItemHalfWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Balance </Text>
                    </WidgetHeader>
                    <div className="flex justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">$3,567</Text>
                    </div>
                </WidgetElement>

                <WidgetElement className={classItemHalfWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Revenue </Text>
                        <IconGray1 className="ml-auto"><Icon>error_outline</Icon></IconGray1>
                    </WidgetHeader>
                    <div className="flex justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">$400</Text>
                    </div>
                </WidgetElement>
            </div>
        </section>
    )
}

const DashboardVod = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <section className="border-box lg-col-6 sm-col-12 pl2 right">
            <div className="flex items-baseline mb1">
                <IconGray1 className="mr1 self-center">play_arrow</IconGray1>
                <Text size={24} weight="reg" className="mt0 inline-block">
                    Video
                </Text>
            </div>

            <div className={classContainer}>
                <WidgetElement className={classItemHalfWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Total Videos </Text>
                        <IconGray1 className="ml-auto"><Icon>error_outline</Icon></IconGray1>
                    </WidgetHeader>
                    <div className="flex justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1"> 3,567</Text>
                    </div>
                </WidgetElement>

                <WidgetElement className={classItemHalfWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Impressions </Text>
                        <IconGray1 className="ml-auto"><Icon>error_outline</Icon></IconGray1>
                    </WidgetHeader>
                    <div className="flex justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">76,625</Text>
                    </div>
                </WidgetElement>

                <WidgetElement className={classItemHalfWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Video Plays </Text>
                    </WidgetHeader>
                    <div className="flex justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">48,790</Text>
                    </div>
                </WidgetElement>

                <WidgetElement className={classItemHalfWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Play Rate vs Impressions </Text>
                    </WidgetHeader>
                    <div className="flex justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">76,625</Text>
                    </div>
                </WidgetElement>
                <WidgetElement className={classItemFullWidth}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Top Videos </Text>
                    </WidgetHeader>
                    <div className="flex mb1">
                        <TableListStyle>
                            <thead>
                                <tr>
                                    <th className="col-2" ><Text size={14} weight="reg" ><b>#</b></Text></th>
                                    <th className="col-7"><Text size={14} weight="reg" ><b>Name</b></Text></th>
                                    <th className="col-3"><Text size={14} weight="reg" ><b>Viewers</b></Text></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="col-2"><Text size={14} weight="reg" >1</Text></td>
                                    <td className="col-7"><Text size={14} weight="reg" >Karmen likes Hello Kitty</Text></td>
                                    <td className="col-3"><Text size={14} weight="reg" >5,023</Text></td>
                                </tr>
                                <tr>
                                    <td className="col-2"><Text size={14} weight="reg" >2</Text></td>
                                    <td className="col-7"><Text size={14} weight="reg" >Lorem ipsum dolor sit amet.</Text></td>
                                    <td className="col-3"><Text size={14} weight="reg" >4,023</Text></td>
                                </tr>
                                <tr>
                                    <td className="col-2"><Text size={14} weight="reg" >3</Text></td>
                                    <td className="col-7"><Text size={14} weight="reg" >Neque porro quisquam est qui</Text></td>
                                    <td className="col-3"><Text size={14} weight="reg" >3,953</Text></td>
                                </tr>
                                <tr>
                                    <td className="col-2"><Text size={14} weight="reg" >4</Text></td>
                                    <td className="col-7"><Text size={14} weight="reg" >in voluptate velit esse cillum dolore</Text></td>
                                    <td className="col-3"><Text size={14} weight="reg" >1,343</Text></td>
                                </tr>
                            </tbody>
                        </TableListStyle>
                    </div>
                </WidgetElement>
            </div>
        </section>
    )
}

const StaticDashbaord = (props: {}) => {




    return (
        <>
            <Dashboard />
            <DashboardLive />
            <DashboardVod />
            <DashboardPaywall />
            <div className="clearfix"></div>
        </>
    );
};

const CloseCross = styled.div<{}>`
    color: ${props => props.theme.colors['gray-3']};
`;

const IconGray1 = styled.div<{}>`
    color: ${props => props.theme.colors['gray-1']};
`;

const SupportCard = styled(Card)`
    background-color: ${props => props.theme.colors['violet20']};
`;

const WidgetHeader = styled.div<{}>`
    margin-bottom: 16px;
`;
export default StaticDashbaord;