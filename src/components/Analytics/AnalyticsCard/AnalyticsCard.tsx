import React from 'react';
import ReactTable from 'react-table';
import { ActionIcon, IconStyle } from '../../../shared/Common/Icon';
import { exportCSVFile } from '../../../utils/services/csv/csvService';
import { Tooltip } from '../../Tooltip/Tooltip';
import { Text } from '../../../components/Typography/Text';
import styled from 'styled-components';
import { Card } from '../../Card/Card';
import { Tab } from '../../Tab/Tab';
import { Routes } from '../../../app/containers/Navigation/NavigationTypes';

export interface AnalyticsCardProps {
    tabs?: { [name: string]: TabAnalytics },
    title: string,
    infoText?: string
}

type TabAnalytics = {
    name: string,
    content: JSX.Element
}

export const AnalyticsCard = (props: React.HTMLAttributes<HTMLDivElement> & AnalyticsCardProps) => {

    // const exportCsvAnalytics = () => {
    //     exportCSVFile(props.data.header, props.data.data, props.dataName + ".csv");
    // }
    const tabsList: Routes[] = props.tabs ? Object.keys(props.tabs).map((value: string, index: number) => { return { name: value, path: value } }) : [];
    const [selectedTab, setSelectedTab] = React.useState<string>(props.tabs? tabsList[0].name : "")
    

    return (
        <AnalyticsCardStyle className={props.className}>
            <AnalyticsCardHeader className='mb2 items-center'>
                <div className="">
                    <Text  size={16} weight="med" color="gray-1">{props.title + " " + selectedTab}</Text>
                    {/* <ActionIcon className="ml1" id={"tooltip" + props.title}>
                        <IconStyle >info_outlined</IconStyle>
                    </ActionIcon>
                    <Tooltip target={"tooltip" + props.title}>{props.infoText}</Tooltip> */}
                </div>
                { props.tabs && <Tab orientation='horizontal' list={tabsList} callback={(name) => setSelectedTab(name)} /> }
            </AnalyticsCardHeader>
            <AnalyticsCardBody>
                { props.tabs ? props.tabs[selectedTab].content : props.children}
            </AnalyticsCardBody>
        </AnalyticsCardStyle>
    )
}

const AnalyticsCardStyle = styled(Card) <{}>`
    min-height: 273px;
`


const AnalyticsCardHeader = styled.div<{}>`
    display: flex;
    justify-content: space-between;
`

const AnalyticsCardBody = styled.div<{}>`
    margin-left: auto;
    margin-right: auto;
    width: 60%;
`