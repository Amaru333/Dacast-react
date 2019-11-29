import * as React from 'react';
import { Text } from '../../components/Typography/Text';
import { IconGray1, WidgetHeader, TableListStyle, classContainer, classItemHalfWidthContainer, classItemFullWidth, classItemFullWidthContainer } from './DashboardStyles';
import { WidgetElement } from './WidgetElement';
import { numberFormatter, getPercentage } from '../../utils/utils';

interface VodDashboardProps {
    totalVideos: number;
    videoPlays: number;
    impressions: number;
    topVideos: { name: string; viewers: number }[];
}

const VodDashboard = (props: React.HTMLAttributes<HTMLDivElement> & { fullWidth: boolean; rightSide: boolean } & { profile: VodDashboardProps }) => {

    var classTopContainer = (props.rightSide ? "right border-box " : "col ") + (props.fullWidth ? "lg-col-12" : "lg-col-6") + " sm-col-12 " + (props.fullWidth ? "" : "pl2 right");
    var itemClass = props.fullWidth ? classItemFullWidthContainer : classItemHalfWidthContainer;

    var totalVideos = numberFormatter(props.profile.totalVideos, 'comma');
    var videoPlays = numberFormatter(props.profile.videoPlays, 'comma');
    var impressions = numberFormatter(props.profile.impressions, 'comma');
    var rateVsImpressions = getPercentage(props.profile.videoPlays, props.profile.impressions);

    var { rightSide, fullWidth, ...other } = props;

    return (
        <section {...other} className={classTopContainer}>
            <div className="flex items-baseline mb1">
                <IconGray1 className="mr1 self-center">play_arrow</IconGray1>
                <Text size={24} weight="reg" className="mt0 inline-block">
                    Video
                </Text>
            </div>

            <div className={classContainer}>
                <WidgetElement className={itemClass}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Total Videos </Text>
                        <IconGray1 className="ml-auto">info_outline</IconGray1>
                    </WidgetHeader>
                    <div className="flex minContentDash justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">{totalVideos}</Text>
                    </div>
                </WidgetElement>

                <WidgetElement className={itemClass}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Impressions </Text>
                        <IconGray1 className="ml-auto">info_outline</IconGray1>
                    </WidgetHeader>
                    <div className="flex minContentDash justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">{impressions}</Text>
                    </div>
                </WidgetElement>

                <WidgetElement className={itemClass}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Video Plays </Text>
                    </WidgetHeader>
                    <div className="flex minContentDash justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">{videoPlays}</Text>
                    </div>
                </WidgetElement>

                <WidgetElement className={itemClass}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Play Rate vs Impressions </Text>
                    </WidgetHeader>
                    <div className="flex minContentDash justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">{rateVsImpressions}%</Text>
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
                                {
                                    props.profile.topVideos.map((value, key) => {
                                        return (
                                            <tr key={value.viewers+"-"+key}>
                                                <td className="col-2"><Text size={14} weight="reg" >{key+1}</Text></td>
                                                <td className="col-7"><Text size={14} weight="reg" >{value.name}</Text></td>
                                                <td className="col-3"><Text size={14} weight="reg" >{numberFormatter(value.viewers, 'comma')}</Text></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </TableListStyle>
                    </div>
                </WidgetElement>
            </div>
        </section>
    )
}

VodDashboard.defaultProps = { rightSide: false };
export { VodDashboard };