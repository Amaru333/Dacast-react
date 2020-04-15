import React from 'react';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { PlaybackProtection } from '../../../redux-flow/store/Account/Billing';

const ProtectionModalTableData = [
    {
        label: 'Storage',
        value: '60'
    },
    {
        label: 'Price per GB',
        value: '$2.25'
    },
    {
        label: 'Billed',
        value: 'Recurring, when Storage reaches 0 GB'
    } 
]

export const ProtectionModal = (props: {toggle: Function; actionButton: Function; setPlaybackProtectionEnabled: Function, playbackProtection: PlaybackProtection}) => {
    const [selectedValue, setSelectedValue] = React.useState<string>('Select');

    console.log(props.playbackProtection)

    React.useEffect(() => {
        props.playbackProtection === null || props.playbackProtection.amount === null ? 
        setSelectedValue('Select') : setSelectedValue(props.playbackProtection.amount)
    }, [props.playbackProtection])

    const protectionModalTableBodyElement = () => {
        return ProtectionModalTableData.map((value, key) => {
            return {data: [
                <Text  key={"protectionModalTable" + value.label + key.toString()} size={14}  weight="reg" color="gray-1">{value.label}</Text>,
                <Text  key={"protectionModalTable" + selectedValue + key.toString()} size={14}  weight="reg" color="gray-1">{selectedValue}</Text>
            ]}
        }) 
    }

    const protectionModalTableFooterElement = () => {
        return  [
            <Text  key={"protectionModalTableFooterTotal"} size={14}  weight="med" color="gray-1">Total</Text>,
            <Text  key={"protectionModalTableFooterValue"} size={14}  weight="med" color="gray-1">$135</Text>,
        ]
    }

    return (
        <div>
            <Text size={14}  weight="reg" color="gray-1">Select how much Data to buy each time your allowance reaches zero.</Text>
            <div className='clearfix'>
                <DropdownSingle
                    isInModal   
                    className='pb2 col sm-col-6 col-12'                  
                    dropdownTitle='Amount'
                    list={{'10 GB': false, '60 GB': false}}
                    id='amountDropdown'
                    dropdownDefaultSelect={props.playbackProtection === null || props.playbackProtection.amount === null ? "Select" : props.playbackProtection.amount}
                    callback={setSelectedValue}
                        
                />
            </div>

            {
                selectedValue !== 'Select' ? 
                <>
                <Table id='protectionModalTable' headerBackgroundColor="gray-10" body={protectionModalTableBodyElement()} footer={protectionModalTableFooterElement()}/>

                <Text size={14}  weight="reg" color="gray-1">You will be billed automatically each time you run out of storage.</Text>
                </>
                    : null
            }


            <div className='col col-12 py1'>
                <Button sizeButton="large" disabled={selectedValue === 'Select'} onClick={() => {props.actionButton({enabled: true, price: '2$', amount: selectedValue}); props.toggle(false); props.setPlaybackProtectionEnabled(true)}} typeButton="primary" buttonColor="blue" >Enable</Button>
                <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
            </div>
            
        </div>
    )
}