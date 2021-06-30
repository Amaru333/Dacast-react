import React from 'react'
import { TabSmallStyle } from './TabStyle'
import { SmallTabItem, TabSmallProps } from './TabTypes'

export const TabSmall = (props: TabSmallProps) => {

    const { list } = props
    const [selectedTab, setSelectedTab] = React.useState<SmallTabItem>(props.defaultTabSelected ? list.find(f => f.title === props.defaultTabSelected) : list[0])

    const renderTabs = () => {
        return list.map((tab, i) => {
            return <TabSmallStyle onClick={() => {props.callback(tab);setSelectedTab(tab)}} selected={tab.title === selectedTab.title} className='pointer p1' leftSide={i === 0} rightSide={i === props.list.length - 1} key={tab.title + i}>{tab.title}</TabSmallStyle>
        })
    }

    return (
        <div>
            {renderTabs()}
        </div>
    )
}