import React from 'react'
import { PirateComponentProps } from '../../containers/Piracy/Piracy'
import { Input } from '../../../components/FormsComponents/Input/Input';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { IconStyle } from '../../../shared/Common/Icon';
import { Text } from '../../../components/Typography/Text';

export const PiracyPage = (props: PirateComponentProps) => {

    const [url, setUrl] = React.useState<string>(null)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleSubmit = () => {
        setButtonLoading(true)
        props.getPirate(url)
        .then(() => setButtonLoading(false))
        .catch(() => setButtonLoading(false))
    }

    return (
        <div className='flex flex-column'>
            <div className='flex my2'>
                <div className='relative flex items-center mr2'>
                    <Input  id='urlInput' backgroundColor="white" value={url} placeholder='URL' onChange={(event) => setUrl(event.currentTarget.value)} />
                    <div className={ url && url.length > 0 ?'absolute right-0 pointer pr2' : 'hide'} onClick={() => {setUrl('')}}><IconStyle>close</IconStyle></div>
                </div>
                <Button isLoading={buttonLoading} disabled={!url} onClick={() => {handleSubmit()}} sizeButton='large' typeButton='primary' buttonColor='blue'>Search</Button>
            </div>
            {
                props.pirateData && 
                <div className='flex flex-column'>
                <Text size={14} weight="reg"> Here are the data related to the searched URL:</Text>
                <Text size={14} weight='reg'>{'BID: ' + props.pirateData.salesforceId}</Text>
                <Text size={14} weight='reg'>{'Uapp ID : ' + props.pirateData.userId}</Text>
                <Text size={14} weight='reg'>{'Channel ID: ' + props.pirateData.liveChannelId}</Text>

            </div>
            }
            {
                (!props.pirateData && !buttonLoading) && 
                <Text size={14} weight="reg">No pirate found for the searched URL</Text>

            }


        </div>
    )
}