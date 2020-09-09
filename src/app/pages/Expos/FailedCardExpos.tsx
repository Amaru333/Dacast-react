import React from 'react';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { IconStyle } from '../../../shared/Common/Icon';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';

export const FailedCardExpos = (props: {}) => {

    return (
        <div style={{height: '100vh'}} className='flex flex-column justify-center items-center center'>
                <IconStyle className="mb2" customsize={42} fontSize="small" coloricon='gray-4'>desktop_mac</IconStyle>
                <Text className="mb2" size={40} weight='med' color="black">Create your first Expo!</Text>
                <Text className="mb2" size={14} weight='reg' color="black" >Expos are the easiest way to put content in front of your users.<br/>Click the button to create your first Expo!</Text>
                <Button typeButton="primary" sizeButton="small" >Create</Button>
        </div> 
    )
}