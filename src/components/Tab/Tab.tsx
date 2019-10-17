import * as React from 'react';
import {Link} from 'react-router-dom';
import { Text } from '../Typography/Text';
import { TabProps } from './TabTypes';
import { TabContainer, TabHeaderContainer, TabStyle, TabBody, TabContentStyle } from './TabStyle';

export const Tab = (props: TabProps) => {

    const firstSelectedItem = () => {
        let item = props.list.find((element) => {
            return props.history.location.pathname === element.path
        })
        return item ? item.name : props.list[0].name;
    };

    const [selectedTab, setSelectedTab] = React.useState<string>(firstSelectedItem());

    const renderTabs = () => {
        return (
            props.list.map((tab, i) => {
                return (
                    <Link to={tab.path} key={tab.name+i.toString()}>
                        <TabStyle                               
                            orientation={props.orientation} 
                            selected={selectedTab === tab.name} 
                            onClick={() => setSelectedTab(tab.name)}
                        >
                            <Text className="center" size={14} weight={selectedTab === tab.name ? 'med' : 'reg'}  color={selectedTab === tab.name ? "dark-violet" : "gray-1"}>{tab.name}</Text>
                        </TabStyle>
                    </Link>

                )
            })
        )
    }

    const renderTabsContent = () => {
        return (
            props.list.map((tabContent: any, i) => {
                return (
                    <TabContentStyle key={props.list[i].name + "content"+i.toString()} isDisplayed={props.list[i].name === selectedTab}>
                        <tabContent.component />
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