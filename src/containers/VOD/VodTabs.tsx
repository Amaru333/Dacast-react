import { useHistory, Router } from "react-router-dom";
import General from './General/General';
import { Routes } from '../Navigation/NavigationTypes';
import { Card } from '../../components/Card/Card';
import { Text } from '../../components/Typography/Text';
import React from 'react';
import { Tab } from '../../components/Tab/Tab';

export const Preview = (props: {}) => {
    return (
        <Card className="col-12 clearfix">
            <div className="details col col-12">
                <Text className="col-12 mb2 block" size={20} weight="med">Preview</Text>
                <video className="mr-auto ml-auto block" width="400" controls>
                    <source src="https://dcstorage04.s3.amazonaws.com/secure/96941/Big_Buck_Bunny.mp4" type="video/mp4" />
                </video>
            </div>
        </Card>
    )
}

export const VodTab = (props: {}) => {

    var history = useHistory();

    const routeList: Routes[] = [
        {
            name: 'General',
            path: '/video/general',
            component: General
        },
        {
            name: 'Preview',
            path: '/video/preview',
            component: Preview
        }]

    return (
        <Router history={history}>
            <Tab
                list={routeList}
                history={history}
                orientation="horizontal"
                className="mb2"
            />
        </Router>
    )
}
