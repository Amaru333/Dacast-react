import React from 'react';
import { IconStyle } from '../../shared/Common/Icon';
import { Text } from '../Typography/Text';


export const EmptyAnalytics = (props: {}) => {

   return (
    <div className="col col-12 flex flex-column items-center">
        <IconStyle className="mb2" coloricon="gray-4" fontSize='large' >info_outlined</IconStyle>
        <Text size={16} className="mb1" weight="med" >No data yet</Text>
        <Text size={16} weight="reg" >Please come back later</Text>
    </div>
   )
}
