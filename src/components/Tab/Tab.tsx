import * as React from 'react';
import {Link} from 'react-router-dom';
import { Text } from '../Typography/Text';
import { TabProps } from './TabTypes';
import { TabContainer, TabHeaderContainer, TabStyle, TabBody, TabContentStyle } from './TabStyle';
import { DropdownSingle } from '../FormsComponents/Dropdown/DropdownSingle';
import { DropdownListType } from '../FormsComponents/Dropdown/DropdownTypes';

function useMedia(query: string) {
    const [matches, setMatches] = React.useState(window.matchMedia(query).matches);
  
    React.useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) setMatches(media.matches);
        const listener = () => setMatches(media.matches);
        media.addListener(listener);
        return () => media.removeListener(listener);
    }, [matches, query]);
  
    return matches;
}

export const Tab = (props: TabProps) => {

    let mobile = useMedia('(max-width: 786px)');
    const {list, orientation } = props;
    const firstSelectedItem = () => {
        let item = props.list.find((element) => {
            return props.history.location.pathname === element.path
        })
        return item ? item.name : props.list[0].name;
    };

    let dropdownRef = React.useRef(null)
    const [selectedTab, setSelectedTab] = React.useState<string>(firstSelectedItem());
    React.useEffect(()=> {
        if(mobile && dropdownRef) {
            setSelectedTab(dropdownRef.current.innerText)
        }})

    const renderTabs = () => {
        const dropdownList: DropdownListType = {}
        list.forEach((item) => dropdownList[item.name] = false )
        return (
            mobile ?
                <DropdownSingle defaultValue={selectedTab} ref={dropdownRef} id={'navigationDropdown'} list={dropdownList} isNavigation dropdownTitle="" />
                :
                list.map((tab, i) => {
                    return (
                        <Link to={tab.path} key={tab.name+i.toString()}>
                            <TabStyle                               
                                orientation={orientation} 
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
        <TabContainer mobile={mobile}>
            <TabHeaderContainer mobile={mobile} {...props}>
                {renderTabs()}
            </TabHeaderContainer>
            <TabBody>
                {renderTabsContent()}
            </TabBody>
        </TabContainer>

    );
}