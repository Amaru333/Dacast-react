import React from 'react';
import { Tab } from '../../../components/Tab/Tab';
import {useRouteMatch, Switch, Route, useHistory} from "react-router-dom";
import { Routes } from '../Navigation/NavigationTypes';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { IconStyle } from '../../../shared/Common/Icon';
import { LiveSubRoutes } from '../../constants/LiveSubRoutes';
import { TabsContainer } from '../../shared/TabsStyle';
import { LiveItem } from '../../redux-flow/store/Live/General/types';
import { getPrivilege } from '../../../utils/utils';

export const LiveTabs = (props: { live: LiveItem; liveId: string; setShowLiveTabs: Function}) => {
    const {path} = useRouteMatch();
    let history = useHistory()
    React.useEffect(() => {
        // updateTitleApp(props.live.title);
        if(location.pathname === '/livestreams') {
            history.push('/livestreams/'+props.liveId+'/general')
        }
    }, [])

    const handleLiveSubRoutes = () => {
        return LiveSubRoutes.filter(item => item.associatePrivilege ? getPrivilege(item.associatePrivilege) : true ).map((route) => {
            return {
                ...route, path: path + '/' + props.liveId + route.path
            }
        })
    }
    const returnRouter = (props: Routes[]) => {
        return (
            props.filter(item => item.associatePrivilege ? getPrivilege(item.associatePrivilege) : true ).map((route: Routes, i: number) => {
                return !route.slug ? <Route key={i}
                    path={route.path}
                    render={props => (
                        // pass the sub-routes down to keep nesting
                        <route.component {...props} routes={route.slug} />
                    )}
                />
                    : route.slug.filter(item => item.associatePrivilege ? getPrivilege(item.associatePrivilege) : true ).map((subroute, index) => {
                        return <Route key={'subroute'+index}
                            path={subroute.path}
                            render={props => (
                                // pass the sub-routes down to keep nesting
                                <subroute.component {...props} />
                            )}
                        />
                    })   
            })
        )
    }

    return (
        <div>
            <TabsContainer>
                <Button onClick={(event) => {event.preventDefault();history.push('/livestreams');props.setShowLiveTabs(false);}} className='mx2' sizeButton='xs' typeButton='secondary'><IconStyle>keyboard_arrow_left</IconStyle></Button>
                <Tab orientation='horizontal' list={handleLiveSubRoutes()} />
            </TabsContainer>
            <Switch>
                {returnRouter(handleLiveSubRoutes())}
            </Switch>
        </div>
    )
}