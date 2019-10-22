import * as React from 'react';
import styled from 'styled-components';
import { Card } from './Card/Card';
import { Text } from './Typography/Text';
import { ProgressBar } from './FormsComponents/Progress/ProgressBar/ProgressBar';
import { Button } from './FormsComponents/Button/Button';
import { Icon } from '@material-ui/core';
import { IconProps } from '@material-ui/core/Icon';


const StaticDashbaord = (props: {}) => {


    var classItemFullWidthContainer = "col lg-col-3 md-col-6 sm-col-12 col-12 px2 mb3"; 
    var classContainer = "clearfix mxn2"; 
    var classItemHalfWithContainer = "col lg-col-6 md-col-6 sm-col-12 col-12 px2 mb3";

    return (
        <>
            <section className="col col-12">
                <div className="flex items-baseline mb1">
                    <Text size={24} weight="reg" className="mt0 mb3 inline-block">
                            Dashboard
                    </Text>
                    <Text className="ml-auto" size={14} weight="reg" color="gray-2" ><b>For Billing Period</b> 06/30/2019-07/29/2019</Text>
                </div>

                <div className={classContainer}>
                    <div className={classItemFullWidthContainer}>
                        <Card className="dashboardCard">
                            <WidgetHeader className="flex">                             
                                <Text size={16} weight="med" color="gray-3"> Storage Remaining </Text>
                                <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <a href="javascript:alert('Go to purchase page')">Buy More</a> </Text>
                            </WidgetHeader>
                            <div className="flex items-baseline mb1">
                                <Text size={32} weight="reg" color="gray-1"> 10GB</Text><Text size={16} weight="reg" color="gray-4" >/20GB</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >50%</Text>
                            </div>
                            <ProgressBar size="large" color="violet" startingValue={50} /> 
                        </Card>
                    </div>
                    
                    <div className={classItemFullWidthContainer}>
                        <Card className="dashboardCard">
                            <WidgetHeader className="flex">                             
                                <Text size={16} weight="med" color="gray-3"> Data Remaining </Text>
                                <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <Button sizeButton="xs" onClick={() => alert('Go to purchase page')}>Buy More</Button> </Text>
                            </WidgetHeader>
                            <div className="flex items-baseline mb1">
                                <Text size={32} weight="reg" color="gray-1"> 20GB</Text><Text size={16} weight="reg" color="gray-4" >/100GB</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >20%</Text>
                            </div>
                            <ProgressBar size="large" color="red" startingValue={20} /> 
                            <Text size={12} weight="reg" color="red"> Upgrade before you run out of data</Text>
                        </Card>
                    </div>

                    <div className={classItemFullWidthContainer}>
                        <Card className="dashboardCard">
                            <WidgetHeader className="flex">                             
                                <Text size={16} weight="med" color="gray-3"> Monthly Custom Plan </Text>
                                <IconGray1 className="ml-auto">settings</IconGray1>
                            </WidgetHeader>
                            <Text className="inline-block mb1" size={14} weight="reg" color="gray-1">Next Bill due 09/17/2019</Text><br />
                            <Text size={32} weight="reg" color="gray-1">$612</Text>
                        </Card>
                    </div>
                    <div className={classItemFullWidthContainer}>
                        <SupportCard className="dashboardCard">
                            <WidgetHeader className="flex">                             
                                <Text size={16} weight="med" color="gray-1"> 24/7 Support </Text>
                                <CloseCross className="ml-auto">close</CloseCross>
                            </WidgetHeader>
                            <Text size={12} weight="reg" color="gray-1" className="inline-block mb2">Need some help getting started?</Text><br />
                            <Button sizeButton="xs" typeButton="secondary">Chat now</Button>
                        </SupportCard>
                    </div>
                </div>
            </section>
            <section className="col lg-col-6 sm-col-12 pr2">
                <div className="flex items-baseline mb1">
                    <IconGray1 className="mr1 self-center">videocam</IconGray1>
                    <Text size={24} weight="reg" className="mt0 inline-block">
                            Live Channels
                    </Text>
                </div>

                <div className={classContainer}>
                    <div className={classItemHalfWithContainer}>
                        <Card className="dashboardCard">
                            <WidgetHeader className="flex">                             
                                <Text size={16} weight="med" color="gray-3"> Active Channels </Text>
                            </WidgetHeader>
                            <div className="flex justify-center items-center mb1">
                                <Text size={48} weight="reg" color="gray-1"> 279<Text size={20} weight="reg" color="gray-4" >/500</Text></Text>
                            </div>
                        </Card>
                    </div>
                    
                    <div className={classItemHalfWithContainer}>
                        <Card className="dashboardCard">
                            <WidgetHeader className="flex">                             
                                <Text size={16} weight="med" color="gray-3"> Live Viewers </Text>
                            </WidgetHeader>
                            <div className="flex justify-center items-center mb1">
                                <Text size={48} weight="reg" color="gray-1">301</Text>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
            <section className="col lg-col-6 sm-col-12 pl2">
                <div className="flex items-baseline mb1">
                    <IconGray1 className="mr1 self-center">play_arrow</IconGray1>
                    <Text size={24} weight="reg" className="mt0 inline-block">
                            Video
                    </Text>
                </div>

                <div className={classContainer}>
                    <div className={classItemHalfWithContainer}>
                        <Card className="dashboardCard">
                            <WidgetHeader className="flex">                             
                                <Text size={16} weight="med" color="gray-3"> Total Videos </Text>
                                <IconGray1 className="ml-auto">error_outline</IconGray1>
                            </WidgetHeader>
                            <div className="flex justify-center items-center mb1">
                                <Text size={48} weight="reg" color="gray-1"> 3,567</Text>
                            </div>
                        </Card>
                    </div>
                    
                    <div className={classItemHalfWithContainer}>
                        <Card className="dashboardCard">
                            <WidgetHeader className="flex">                             
                                <Text size={16} weight="med" color="gray-3"> Impressions </Text>
                                <IconGray1 className="ml-auto">error_outline</IconGray1>
                            </WidgetHeader>
                            <div className="flex justify-center items-center mb1">
                                <Text size={48} weight="reg" color="gray-1">76,625</Text>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    );
};

const CloseCross = styled(Icon)`
    color: ${props => props.theme.colors['gray-3']};
`;

const IconGray1 = styled(Icon)<IconProps>`
    color: ${props => props.theme.colors['gray-1']};
`;

const SupportCard = styled(Card)`
    background-color: ${props => props.theme.colors['violet20']};
`;

const WidgetHeader = styled.div<{}>`
    margin-bottom: 16px;
`;
export default StaticDashbaord;