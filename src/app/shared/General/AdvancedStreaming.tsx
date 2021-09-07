import React from 'react'
import { Toggle } from '../../../components/Toggle/toggle';
import { LiveDetails } from '../../redux-flow/store/Content/General/types'
import { Text } from '../../../components/Typography/Text'
import { ToggleTextInfo } from '../Security/SecurityStyle';
import { userToken } from '../../utils/services/token/tokenService';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';

export const AdvancedStreaming = (props: {contentDetails: LiveDetails, localContentDetails: LiveDetails, setHasChanged: React.Dispatch<React.SetStateAction<boolean>>, setLocalContentDetails: React.Dispatch<React.SetStateAction<LiveDetails>>}) => {

    return (
        <div className='col col-12'>
            <Text className="col col-12 mb25" size={20} weight="med">Advanced Streaming</Text>
            <div className="col col-12">
            {
                    userToken.getPrivilege('privilege-china') &&
                    <div className="mb2">
                        <Toggle label="Use multiple CDN" defaultChecked={true}></Toggle>
                        <ToggleTextInfo className="mt1">
                            <Text size={14} weight='reg' color='gray-1'>Live stream to multiple CDNs to avoid live stream interruptions due to CDN issues. Read more.</Text>
                        </ToggleTextInfo>
                        <div className='flex items-center'>
                            <DropdownSingle 
                                className='col col-3'
                                id='primaryCdnDropdown'
                                list={[{title: 'Limelight'}, {title: 'Akamai'}]}
                                dropdownTitle={'Primary CDN'}
                            />
                            <div className='ml2 mt25'>
                                <Button buttonColor='blue' typeButton='primary' sizeButton='small'>Start Streaming</Button>
                            </div>
                        </div>
                        <Text>Data is getting consumed after pressing “Start Streaming” and until you press “Stop Streaming”.</Text>
                    </div>
                }

                {
                    userToken.getPrivilege('privilege-china') &&
                    <div className="mb2">
                        <Toggle label="Live Stream to China" defaultChecked={props.localContentDetails.china} onChange={() => {props.setLocalContentDetails({...props.localContentDetails, china: !props.localContentDetails.china});props.setHasChanged(true)}}></Toggle>
                        <ToggleTextInfo className="mt1">
                            <Text size={14} weight='reg' color='gray-1'>This feature allows you to safely reach your audience located in China. Read more.</Text>
                        </ToggleTextInfo>
                    </div>
                }
            </div>
        </div>
    )
}