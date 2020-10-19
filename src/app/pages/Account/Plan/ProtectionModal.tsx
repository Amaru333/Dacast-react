import React from 'react';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { PlaybackProtection } from '../../../redux-flow/store/Account/Plan';

export const ProtectionModal = (props: {playbackProtection: PlaybackProtection; toggle: (b: boolean) => void; actionButton: (value: string) => void; setPlaybackProtectionEnabled: (b: boolean) => void}) => {
    const [playbackProtectionAmount, setPlaybackProtectionAmount] = React.useState<string>('50');

    const ProtectionModalTableData = [
        {
            label: 'GBs',
            value: playbackProtectionAmount === "Disable Protection" ? "0" : playbackProtectionAmount
        },
        {
            label: 'Price per GB',
            value: "$" + props.playbackProtection.price
        },
        {
            label: 'Billed',
            value: playbackProtectionAmount === "Disable Protection" ? "N/A" : 'Recurring, when Data reaches 0 GB'
        } 
    ]

    const protectionModalTableBodyElement = () => {
        return ProtectionModalTableData.map((value, key) => {
            return {data: [
                <Text  key={"protectionModalTable" + value.label + key.toString()} size={14}  weight="reg" color="gray-1">{value.label}</Text>,
                <Text  key={"protectionModalTable" + value + key.toString()} size={14}  weight="reg" color="gray-1">{value.value}</Text>
            ]}
        }) 
    }

    const protectionModalTableFooterElement = () => {
        return  [
            <Text  key={"protectionModalTableFooterTotal"} size={14}  weight="med" color="gray-1">Total</Text>,
            <Text  key={"protectionModalTableFooterValue"} size={14}  weight="med" color="gray-1">${playbackProtectionAmount === "Disable Protection" ? "0" : (parseInt(playbackProtectionAmount) * props.playbackProtection.price).toFixed(2)}</Text>,
        ]
    }

    return (
        <div>
            <Text size={14}  weight="reg" color="gray-1">Select how much Data to buy each time your allowance reaches zero.</Text>
            <div className='clearfix'>
                <DropdownSingle
                    isInModal   
                    className='pb2 col sm-col-6 col-12'                  
                    dropdownTitle='Amount (GB)'
                    list={{'Disable Protection': false, '50': false, '100': false, '250': false, '500': false, '1000': false, '2000': false, '5000': false}}
                    id='amountDropdown'
                    dropdownDefaultSelect={'50'}
                    callback={(value: string) => setPlaybackProtectionAmount(value)}
                        
                />
            </div>
                <Table id='protectionModalTable' headerBackgroundColor="gray-10" body={protectionModalTableBodyElement()} footer={protectionModalTableFooterElement()}/>
                <Text size={14}  weight="reg" color="gray-1">You will be billed automatically each time you run out of Data.</Text>
            <div className='col col-12 py1'>
                <Button sizeButton="large" onClick={() => {props.actionButton(playbackProtectionAmount); props.toggle(false)}} typeButton="primary" buttonColor="blue" >{playbackProtectionAmount === "Disable Protection" ? "Disable" : "Enable"}</Button>
                <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
            </div>
            
        </div>
    )
}