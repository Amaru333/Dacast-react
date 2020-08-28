import React from 'react'
import { IconStyle } from '../../shared/Common/Icon'
import { Text } from '../Typography/Text'
import { Button } from '../FormsComponents/Button/Button'

export const ErrorRealTime = (props: {handleSubmit: () => void}) => {

    return (
        <div className='flex flex-center' style={{minHeight:300}}>
            <div className='mx-auto flex flex-column col col-12 items-center'>
                <IconStyle className='py2'customsize={50} coloricon='red'>warning_outlined</IconStyle>
                <Text className='py2' size={40} weight='med'>You have no live streams</Text>
                <Text className='my1' size={14} weight='reg'>You need to create at least one live stream to access the real-time analytics.</Text>
                <Text className='my1' size={14} weight='reg'>Please create a live stream and come back here.</Text>
                <Button onClick={() => props.handleSubmit()} className='my2' buttonColor='blue' typeButton='primary' sizeButton='large'>Create a Live Stream</Button>
            </div>
        </div>

    )
}