import React from 'react'
import { Toggle } from '../../../components/Toggle/toggle';
import { LiveDetails } from '../../redux-flow/store/Content/General/types'
import { Text } from '../../../components/Typography/Text'
import { ToggleTextInfo } from '../Security/SecurityStyle';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';

const Timers: {[key: string]: NodeJS.Timeout} = {}

export const AdvancedStreaming = (props: {contentDetails: LiveDetails, localContentDetails: LiveDetails, setHasChanged: React.Dispatch<React.SetStateAction<boolean>>, setLocalContentDetails: React.Dispatch<React.SetStateAction<LiveDetails>>, advancedStreamingToggle: (contentId: string) => Promise<void>, getAdvancedStreamingStatus: () => Promise<string>}) => {

    const [advancedStreamingStatus, setAdvancedStreamingStatus] = React.useState<string | null>(null)

    const startPollingStatus = () => {
        if(Timers[props.contentDetails.id]){
            return
        }
        let interval = setInterval(() => {
            props.getAdvancedStreamingStatus().then(status => {
                setAdvancedStreamingStatus(status)
                if (status === 'running' || status === 'stopped') {
                    clearInterval(Timers[props.contentDetails.id])
                    Timers[props.contentDetails.id] = null
                }
            })
        }, 5000)
        Timers[props.contentDetails.id] = interval
    }

    const handleStartStreaming = () => {
        let status = advancedStreamingStatus || props.localContentDetails.advancedStreamingStatus
        if(status !== 'stopped' && status !== 'running'){
            return
        }
        setAdvancedStreamingStatus(status === 'stopped' ? 'starting' : 'stopping')
        props.advancedStreamingToggle(props.localContentDetails.id)
        startPollingStatus()
    }

    React.useEffect(() => {
        if(props.contentDetails.advancedStreamingStatus !== 'running' && props.contentDetails.advancedStreamingStatus !== 'stopped') {
            startPollingStatus()
        }
        return () => {
            if (Timers[props.contentDetails.id]) {
                clearInterval(Timers[props.contentDetails.id])
            }
        }
    }, [])

    return (
        <div className='col col-12'>
            <Text className="col col-12 mb25" size={20} weight="med">Advanced Streaming</Text>
            <div className="col col-12">
            {
                    props.localContentDetails.advancedStreaming &&
                    <div className="mb2">
                        <Toggle label="Use multiple CDN" checked={true}></Toggle>
                        <ToggleTextInfo className="mt1">
                            <Text size={14} weight='reg' color='gray-1'>Live stream to multiple CDNs to avoid live stream interruptions due to CDN issues. Read more.</Text>
                        </ToggleTextInfo>
                        <div className='flex items-center'>
                            {/* <DropdownSingle 
                                className='col col-3'
                                id='primaryCdnDropdown'
                                list={[{title: 'Limelight'}, {title: 'Akamai'}]}
                                dropdownTitle={'Primary CDN'}
                            /> */}
                            <div className='ml2 mt25'>
                                <Button buttonColor='blue' typeButton='primary' sizeButton='small' onClick={handleStartStreaming}>{{
                                    'starting': 'Starting stream...',
                                    'running': 'Stop streaming',
                                    'stopping': 'Stopping stream...',
                                    'stopped': 'Start streaming',
                                    'other': 'Invalid state'
                                }[advancedStreamingStatus || props.localContentDetails.advancedStreamingStatus] || 'Start streaming'}</Button>
                            </div>
                        </div>
                        <Text>Data is getting consumed after pressing “Start Streaming” and until you press “Stop Streaming”.</Text>
                    </div>
                }

                {
                    props.localContentDetails.china &&
                    <div className="mb2">
                        <Toggle label="Live Stream to China" checked={props.localContentDetails.china} /*onChange={() => {props.setLocalContentDetails({...props.localContentDetails, china: !props.localContentDetails.china});props.setHasChanged(true)}}*/></Toggle>
                        <ToggleTextInfo className="mt1">
                            <Text size={14} weight='reg' color='gray-1'>This feature allows you to safely reach your audience located in China. Read more.</Text>
                        </ToggleTextInfo>
                    </div>
                }
            </div>
        </div>
    )
}