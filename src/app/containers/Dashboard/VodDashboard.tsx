import * as React from 'react';
import { Text } from '../../../components/Typography/Text';
import { WidgetHeader, TableListStyle, classContainer, classItemHalfWidthContainer, classItemFullWidth, classItemFullWidthContainer } from './DashboardStyles';
import { WidgetElement } from './WidgetElement';
import { getPercentage } from '../../../utils/utils';
import { numberFormatter } from '../../../utils/formatUtils';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { IconStyle } from '../../../shared/Common/Icon'
import { DoughnutChart } from '../../../components/Analytics/DoughnutChart/DoughnutChart';
import { DashboardVod } from '../../redux-flow/store/Dashboard/types';
import { userToken } from '../../utils/services/token/tokenService';
import { useTranslation } from 'react-i18next';

const VodDashboard = (props: React.HTMLAttributes<HTMLDivElement> & { fullWidth: boolean; rightSide: boolean } & { profile: DashboardVod }) => {

    var classTopContainer = (props.rightSide ? "right border-box " : "col ") + (props.fullWidth ? "lg-col-12" : "lg-col-6") + " sm-col-12 " + (props.fullWidth ? "" : "pl2 right");
    var itemClass = props.fullWidth ? classItemFullWidthContainer : classItemHalfWidthContainer;

    var totalVideos = numberFormatter(props.profile.totalVideos, 'comma');
    var videoPlays = numberFormatter(props.profile.videoPlays ? props.profile.videoPlays : 0, 'comma');
    
    var { rightSide, fullWidth, ...other } = props;

    let vodDataFetching = Number.isNaN(props.profile.totalVideos)
    const { t } = useTranslation('dashboard')

    return (
        <section {...other} className={classTopContainer}>
            <div className="flex items-baseline mb1">
                <IconStyle className="mr1 self-center">play_arrow</IconStyle>
                <Text size={24} weight="reg" className="mt0 inline-block">
                    Videos
                </Text>
            </div>

            <div className={classContainer}>
                <WidgetElement placeholderWidget={vodDataFetching} className={itemClass}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3">{t('dashboard_number_of_videos_widget_title')}</Text>
                        <IconStyle id="totalVideosTooltip" className="ml-auto">info_outline</IconStyle>
                        <Tooltip target="totalVideosTooltip">{t('dashboard_number_of_videos_widget_description')}</Tooltip>
                    </WidgetHeader>
                    <div className="flex minContentDash justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">{totalVideos}</Text>
                    </div>
                </WidgetElement>
                {
                    userToken.getPrivilege('privilege-analytics') &&
                    <>
                        <WidgetElement placeholderWidget={vodDataFetching} failed={typeof props.profile.impressions === "undefined"}  className={itemClass}>
                            <WidgetHeader className="flex">
                                <Text size={16} weight="med" color="gray-3">{t('dashboard_impressions_widget_title')}</Text>
                                <IconStyle id="impressionsTooltip" className="ml-auto">info_outline</IconStyle>
                                <Tooltip target="impressionsTooltip">{t('dashboard_impressions_widget_description')}</Tooltip>
                            </WidgetHeader>
                            <div className="flex minContentDash justify-center items-center mb1">
                                <Text size={48} weight="reg" color="gray-1">{props.profile.impressions ? props.profile.impressions : 0}</Text>
                            </div>
                        </WidgetElement>

                        <WidgetElement placeholderWidget={vodDataFetching}  failed={typeof props.profile.videoPlays === "undefined"} className={itemClass}>
                            <WidgetHeader className="flex">
                                <Text size={16} weight="med" color="gray-3">{t('dashboard_video_plays_widget_title')}</Text>
                            </WidgetHeader>
                            <div className="flex minContentDash justify-center items-center mb1">
                                <Text size={48} weight="reg" color="gray-1">{videoPlays}</Text>
                            </div>
                        </WidgetElement>

                        <WidgetElement placeholderWidget={vodDataFetching} failed={typeof props.profile.impressions === "undefined" || typeof props.profile.videoPlays === "undefined"}  className={itemClass}>
                            <WidgetHeader className="flex">
                                <Text size={16} weight="med" color="gray-3">{t('dashboard_play_rate_vs_impressions_widget_title')}</Text>
                                <IconStyle id="playrateVsImpressionsTooltip" className="ml-auto">info_outline</IconStyle>
                                <Tooltip target="playrateVsImpressionsTooltip">{t('dashboard_play_rate_vs_impressions_widget_description')}</Tooltip>
                            </WidgetHeader>
                            <div className="flex minContentDash justify-center items-center mb1">
                                <DoughnutChart value={props.profile.impressions? getPercentage(props.profile.videoPlays, props.profile.impressions) : 0}/>
                            </div>
                        </WidgetElement>
                        <WidgetElement placeholderWidget={vodDataFetching} failed={!props.profile.topVideos} className={classItemFullWidth}>
                            <WidgetHeader className="flex">
                                <Text size={16} weight="med" color="gray-3">{t('dashboard_top_videos_widget_title')}</Text>
                            </WidgetHeader>
                            <div className="flex mb1">
                                <TableListStyle>
                                    <thead>
                                        <tr>
                                            <th className="col-2" ><Text size={14} weight="reg" ><b>#</b></Text></th>
                                            <th className="col-7"><Text size={14} weight="reg" ><b>{t('dashboard_top_live_channels_widget_column_title_1')}</b></Text></th>
                                            <th className="col-3"><Text size={14} weight="reg" ><b>{t('dashboard_top_live_channels_widget_column_title_2')}</b></Text></th>
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
                    </>
                }
                
            </div>
        </section>
    )
}

VodDashboard.defaultProps = { rightSide: false };
export { VodDashboard };