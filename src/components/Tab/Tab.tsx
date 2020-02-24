import * as React from 'react';
import {Link, useLocation} from 'react-router-dom';
import { Text } from '../Typography/Text';
import { TabProps } from './TabTypes';
import { TabContainer, TabHeaderContainer, TabStyle, TabBody, TabContentStyle } from './TabStyle';
import { DropdownSingle } from '../FormsComponents/Dropdown/DropdownSingle';
import { DropdownListType } from '../FormsComponents/Dropdown/DropdownTypes';
import { useMedia } from '../../utils/utils';

export const Tab = (props: TabProps) => {

    let location = useLocation()
    let mobile = useMedia('(max-width: 786px)');
    const {list, orientation } = props;
    const firstSelectedItem = (): string => {
        let matchingRoute = props.list[0].path;
        props.list.map((route) => {
            if(location.pathname === route.path) {
                console.log('found route', route.path)
                matchingRoute =  route.path
            }
        })
        return matchingRoute;
    };


    let dropdownRef = React.useRef<HTMLDivElement>(null)
    const [selectedTab, setSelectedTab] = React.useState<string>(firstSelectedItem());

    React.useEffect(() => {
        setSelectedTab(firstSelectedItem())
    }, [location])

    React.useEffect(()=> {
        if(mobile && dropdownRef.current !== null) {
            setSelectedTab(dropdownRef.current.innerText)
        }
        if(props.callback) {
            props.callback(selectedTab)
        }
    }, [selectedTab])

    const renderTabs = () => {
        const dropdownList: DropdownListType = {}
        list.forEach((item) => dropdownList[item.name] = false )
        return mobile && !props.callback ?
            <DropdownSingle defaultValue={selectedTab} ref={dropdownRef} id={'navigationDropdown'} list={dropdownList} isNavigation dropdownTitle="" />
            : !mobile && !props.callback ?
                list.map((tab, i) => {
                    return (
                        <Link to={tab.path} key={tab.name+i.toString()}>
                            <TabStyle                               
                                orientation={orientation} 
                                selected={selectedTab === tab.path} 
                                onClick={() => setSelectedTab(tab.path)}
                            >
                                <Text className={orientation === 'horizontal' ? "center" : ''} size={14} weight={selectedTab === tab.path ? 'med' : 'reg'}  color={selectedTab === tab.path ? "dark-violet" : "gray-1"}>{tab.name}</Text>
                            </TabStyle>
                        </Link>
                    )
                })
                : 
                list.map((tab) => {
                    return (
                        <TabStyle 
                            
                            key={tab.name}                              
                            orientation={orientation} 
                            selected={selectedTab === tab.name} 
                            onClick={() => setSelectedTab(tab.name)}
                        >
                            <Text className={orientation === 'horizontal' ? "center" : ''} size={14} weight={selectedTab === tab.name ? 'med' : 'reg'}  color={selectedTab === tab.name ? "dark-violet" : "gray-1"}>{tab.name}</Text>
                        </TabStyle>
                    )
                })
    }

    const renderTabsContent = () => {
        return ( <div></div>
        // props.list.map((tabContent: any, i) => {
        //     return (
        //         <TabContentStyle key={props.list[i].name + "content"+i.toString()} isDisplayed={props.list[i].name === selectedTab}>
        //             <tabContent.component />
        //         </TabContentStyle>
        //     )
        // })
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