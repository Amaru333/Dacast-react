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
                    key={"TabHeader"+i.toString()} 
                    selected={selectedTab === tab} 
                    onClick={() => handleTabClick(tab)}>
                        <Text size={14} weight="reg">{tab}</Text>
                    </TabStyle>
                )
            })
        )
    }

    const renderTabsContent = () => {
        return (
            props.contentList.map((tabContent, i) => {
                return (
                <TabContentStyle key={"TabContent"+i.toString()} isDisplayed={props.list[i] === selectedTab}>
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