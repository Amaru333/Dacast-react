import React from 'react';
import ReactTable from 'react-table';
import { AnalyticsCardStyle, AnalyticsCardHeader } from '../../../app/pages/Analytics/AnalyticsCommun';
import { ActionIcon, IconStyle } from '../../../shared/Common/Icon';
import { exportCSVFile } from '../../../utils/services/csv/csvService';
import { Tooltip } from '../../Tooltip/Tooltip';
import { Text } from '../../../components/Typography/Text';

export const AnalyticsCard = (props: React.HTMLAttributes<HTMLDivElement> & { table?: { data: any; columns: any }; infoText: string; title: string; data?: any; dataName?: string; realTime?: boolean }) => {

    const exportCsvAnalytics = () => {
        exportCSVFile(props.data.header, props.data.data, props.dataName + ".csv");
    }

    const [showTable, setShowTable] = React.useState<boolean>(false)

    return (
        <AnalyticsCardStyle className={props.className}>
            <AnalyticsCardHeader>
                <Text className='mb2' size={16} weight="med" color="gray-1">{props.title}</Text>
                <div className="flex">
                    <div>
                        <ActionIcon id={"tooltip" + props.title}>
                            <IconStyle >info_outlined</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"tooltip" + props.title}>{props.infoText}</Tooltip>
                    </div>
                    {!props.realTime ?
                        <ActionIcon id={"download" + props.title}>
                            <IconStyle onClick={() => { exportCsvAnalytics() }} >get_app</IconStyle>
                        </ActionIcon>
                        : null}
                    {props.table &&
                        <ActionIcon id={"table" + props.title}>
                            <IconStyle onClick={() => { setShowTable(!showTable) }} >toc</IconStyle>
                        </ActionIcon>
                    }
                </div>
                <Tooltip target={"download" + props.title}>Download csv</Tooltip>
                <Tooltip target={"table" + props.title}>Show table</Tooltip>
            </AnalyticsCardHeader>
            {showTable ?
                <ReactTable
                    data={props.table.data}
                    columns={props.table.columns}
                    pageSizeOptions={[5, 10, 20, 25]}
                    defaultPageSize={10} /> : props.children
            }
        </AnalyticsCardStyle>
    )
}