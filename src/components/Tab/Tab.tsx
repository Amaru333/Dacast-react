import * as React from 'react';
import { Text } from '../Typography/Text';
import { TabProps } from './TabTypes';
import { TabContainer, TabHeaderContainer, TabStyle, TabBody, TabContentStyle } from './TabStyle';

export const Tab = (props:TabProps) => {
    const [selectedTab, setSelectedTab] = React.useState<string>(props.list[0]);

    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);

    }
    const renderTabs = () => {
        return (
            props.list.map((tab, i) => {
                return (
                    <TabStyle 
                    key={tab+i.toString()}
                    orientation={props.orientation} 
                    selected={selectedTab === tab} 
                    onClick={() => handleTabClick(tab)}>
                        <Text className="center" size={14} weight="reg" color={selectedTab === tab ? "dark-violet" : "gray-1"}>{tab}</Text>
                    </TabStyle>
                )
            })
        )
    }

    const renderTabsContent = () => {
        return (
            props.contentList.map((tabContent, i) => {
                return (
                <TabContentStyle key={props.list[i] + "content"+i.toString()} isDisplayed={props.list[i] === selectedTab}>
                    {tabContent()}
                </TabContentStyle>
                )
            })
        )
    }
    return (
        <TabContainer>
            <TabHeaderContainer {...props}>
                {renderTabs()}
            </TabHeaderContainer>
            <TabBody>
                {renderTabsContent()}
            </TabBody>
        </TabContainer>

    );
}