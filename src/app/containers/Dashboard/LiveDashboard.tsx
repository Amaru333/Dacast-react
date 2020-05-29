import React from 'react'
import { Text } from '../../../components/Typography/Text';
import { classContainer, classItemHalfWidthContainer, WidgetHeader, classItemFullWidth, TableListStyle } from "./DashboardStyles"
import { WidgetElement } from "./WidgetElement";
import { numberFormatter } from '../../../utils/utils';
import { IconStyle } from '../../../shared/Common/Icon'
import { DashboardLive } from '../../redux-flow/store/Dashboard/types';

export const LiveDashboard = (props: React.HTMLAttributes<HTMLDivElement> & { profile: DashboardLive }) => {

    var totalChannels = numberFormatter(props.profile.totalChannels, 'comma');
    var activeChannels = numberFormatter(props.profile.activeChannels, 'comma');
    var liveViewers = numberFormatter(props.profile.liveViewers.data, 'comma');

    return (
        <section className="col lg-col-6 sm-col-12 pr2">
            <div className="flex items-baseline mb1">
                <IconStyle className="mr1 self-center">videocam</IconStyle>
                <Text size={24} weight="reg" className="mt0 inline-block">
                    Live Streams
                </Text>
            </div>

            <div className={classContainer}>
                <WidgetElement className={classItemHalfWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Active Channels </Text>
                    </WidgetHeader>
                    <div className="flex justify-center minContentDash items-center">
                        <Text size={48} weight="reg" color="gray-1"> {activeChannels}<Text size={20} weight="reg" color="gray-4" >/{totalChannels}</Text></Text>
                    </div>
                </WidgetElement>

                <WidgetElement className={classItemHalfWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Live Viewers </Text>
                    </WidgetHeader>
                    <div className="flex justify-center minContentDash items-center">
                        <Text size={48} weight="reg" color="gray-1">{liveViewers}</Text>
                    </div>
                </WidgetElement>

                {/* <WidgetElement className={classItemFullWidth}>
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
                                {
                                    props.profile.topChannels.data && props.profile.topChannels.data.map((value, key) => {
                                        return (
                                            <tr key={value.viewers+"_"+key}>
                                                <td className="col-2"><Text size={14} weight="reg" >{key + 1}</Text></td>
                                                <td className="col-7"><Text size={14} weight="reg" >{value.name}</Text></td>
                                                <td className="col-3"><Text size={14} weight="reg" >{numberFormatter(value.viewers, 'comma')}</Text></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>

                        </TableListStyle>
                    </div>
                </WidgetElement> */}
            </div>
        </section>
    )
}