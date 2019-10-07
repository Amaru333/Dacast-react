import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import "../scss/style.scss";
import { Tab } from '../components/Tab/Tab';
import { LoadingSpinner} from '../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ProgressBar } from '../components/FormsComponents/Progress/ProgressBar/ProgressBar';

const functionTest1 = () => {
    return (
        <LoadingSpinner size="small" color="dark-violet" />
    )
}

const functionTest2 = () => {
    return (
        <LoadingSpinner size="small" color="red" />
    )
}

const functionTest3 = () => {
    return (
        <LoadingSpinner size="small" color="yellow" />
    )
}

const functionTest4 = () => {
    return (
        <LoadingSpinner size="small" color="green" />
    )
}

storiesOf('Tabs', module)
    .add('Tab', () => {
        return ( 
        <React.Fragment>
            <StorybookTabContainerStyle>
                <Tab 
                    list={["tab1", "tab2", "tab3", "tab4"]} 
                    orientation="horizontal"
                    contentList={[functionTest1, functionTest2, functionTest3, functionTest4]}  
                />                    
            </StorybookTabContainerStyle>
            <StorybookTabContainerStyle>
                <Tab 
                    list={["tab1", "tab2", "tab3", "tab4"]} 
                    orientation="vertical"
                    contentList={[functionTest1, functionTest2, functionTest3, functionTest4]} 
                />
            </StorybookTabContainerStyle>
        </React.Fragment>

    )});

const StorybookTabContainerStyle = styled.div`
    float: left;
    margin: 150px 20px 20px 60px;
`;