import { Routes } from '../containers/Navigation/NavigationTypes';
import VodSecurity from '../containers/Videos/Security';
import General from '../containers/Videos/General';
import Chapters from '../containers/Videos/Chapters';


export const VideoSubRoutes: Routes[] = [   
    {
        path: '/general',
        name: 'General',
        iconName: null,
        component: General,
    },
    {
        path: '/chapters',
        name: 'Chapters',
        iconName: null,
        component: Chapters,
    },
    {
        path: '/security',
        name: 'Security',
        iconName: null,
        component: VodSecurity,
    }
];