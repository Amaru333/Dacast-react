import React from 'react'
import { IconStyle } from '../../shared/Common/Icon'
import { Text } from '../Typography/Text'
import { Button } from '../FormsComponents/Button/Button'

export const ErrorPlaceholder = (props: {}) => {

    return (
        <div className='flex flex-center' style={{minHeight:300}}>
            <div className='mx-auto flex flex-column col col-12 items-center'>
                <IconStyle className='py2'customsize={50} coloricon='red'>warning_outlined</IconStyle>
                <Text className='py2' size={40} weight='med'>Something went wrong</Text>
                <Text className='my1' size={14} weight='reg'>The page you are looking for is currently experiencing an error.</Text>
                <Text className='my1' size={14} weight='reg'>Please refresh the page or come back later.</Text>
                <Button onClick={() => {location.reload()}} className='my2' buttonColor='blue' typeButton='primary' sizeButton='large'>Refresh</Button>
            </div>
        </div>

    )
}