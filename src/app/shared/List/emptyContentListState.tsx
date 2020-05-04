import React from 'react';
import { Text } from '../../../components/Typography/Text';

export const emptyContentListHeader = () => {
    return {data: [
        {cell: <span key={'emptyListHeader'}></span>}
    ]}
}

export const emptyContentListBody = (text: string) => {
    return [{data:[
        <div className='center'>
            <Text key={'emptyListBodyText' + text} size={14} weight='reg' color='gray-3' >{text}</Text>
        </div> 
    ]}]
}