import * as React from 'react';
import { Text } from '../../../components/Typography/Text';
import { WidgetHeader, TableListStyle, classContainer, classItemHalfWidthContainer, classItemFullWidth, classItemFullWidthContainer } from './DashboardStyles';
import { WidgetElement } from './WidgetElement';
import { numberFormatter, getPercentage } from '../../../utils/utils';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { IconStyle } from '../../../shared/Common/Icon'
import { DoughnutChart } from '../../../components/Analytics/DoughnutChart/DoughnutChart';
import { DashboardVod } from '../../redux-flow/store/Dashboard/types';

const VodDashboard = (props: React.HTMLAttributes<HTMLDivElement> & { fullWidth: boolean; rightSide: boolean } & { profile: DashboardVod }) => {

    var classTopContainer = (props.rightSide ? "right border-box " : "col ") + (props.fullWidth ? "lg-col-12" : "lg-col-6") + " sm-col-12 " + (props.fullWidth ? "" : "pl2 right");
    var itemClass = props.fullWidth ? classItemFullWidthContainer : classItemHalfWidthContainer;

    var totalVideos = numberFormatter(props.profile.totalVideos, 'comma');
    var videoPlays = numberFormatter(props.profile.videoPlays ? props.profile.videoPlays : 0, 'comma');
    
    var { rightSide, fullWidth, ...other } = props;

    return (
        <section {...other} className={classTopContainer}>
            <div className="flex items-baseline mb1">
                <IconStyle className="mr1 self-center">play_arrow</IconStyle>
                <Text size={24} weight="reg" className="mt0 inline-block">
                    Videos
                </Text>
            </div>

            <div className={classContainer}>
                <WidgetElement className={itemClass}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Total Videos </Text>
                        <IconStyle id="totalVideosTooltip" className="ml-auto">info_outline</IconStyle>
                        <Tooltip target="totalVideosTooltip">The number of VOD assets in your account</Tooltip>
                    </WidgetHeader>
                    <div className="flex minContentDash justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">{totalVideos}</Text>
                    </div>
                </WidgetElement>

                <WidgetElement failed={!props.profile.impressions}  className={itemClass}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Impressions </Text>
                        <IconStyle id="impressionsTooltip" className="ml-auto">info_outline</IconStyle>
                        <Tooltip target="impressionsTooltip">An "Impression" is seeing a video, even if you don't click play</Tooltip>
                    </WidgetHeader>
                    <div className="flex minContentDash justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">{props.profile.impressions ? props.profile.impressions : 0}</Text>
                    </div>
                </WidgetElement>

                <WidgetElement  failed={!props.profile.videoPlays} className={itemClass}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Video Plays </Text>
                    </WidgetHeader>
                    <div className="flex minContentDash justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">{videoPlays}</Text>
                    </div>
                </WidgetElement>

                <WidgetElement failed={!props.profile.impressions || !props.profile.videoPlays}  className={itemClass}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Play Rate vs Impressions </Text>
                        <IconStyle id="playrateVsImpressionsTooltip" className="ml-auto">info_outline</IconStyle>
                        <Tooltip target="playrateVsImpressionsTooltip">The proportion of people who click play</Tooltip>
                    </WidgetHeader>
                    <div className="flex minContentDash justify-center items-center mb1">
                        <DoughnutChart value={props.profile.impressions? getPercentage(props.profile.videoPlays, props.profile.impressions) : 0}/>
                    </div>
                </WidgetElement>
                <WidgetElement failed={!props.profile.topVideos} className={classItemFullWidth}>
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
                                    props.profile.topVideos && props.profile.topVideos.map((value, key) => {
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