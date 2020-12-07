import React from 'react';
import { ModalContent, ModalFooter } from '../../../components/Modal/Modal'
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { BillingPageInfos, PlaybackProtection } from '../../redux-flow/store/Account/Plan/types';

export const DisableProtectionModal = (props: {price: number; editBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => Promise<void>; setDisableProtectionModalOpened: React.Dispatch<React.SetStateAction<boolean>>; setPlaybackProtectionEnabled?: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const handleConfirm = () => {
        props.editBillingPagePaymenPlaybackProtection({enabled: false, amount: null, price: props.price}).then(() => {
            props.setDisableProtectionModalOpened(false)
            props.setPlaybackProtectionEnabled && props.setPlaybackProtectionEnabled(false)
        })
        
    }

    return (
        <React.Fragment>
            <ModalContent>
                <div className="mt1">
                    <Text size={14} weight="reg">If you disable Playback Protection then your content will no longer be viewable if you run out of data.</Text>
                </div>          
            </ModalContent>
            <ModalFooter>
                <Button onClick={() => handleConfirm()}>Confirm</Button>
                <Button typeButton="tertiary" onClick={()=> props.setDisableProtectionModalOpened(false)}>Cancel</Button>
            </ModalFooter>
        </React.Fragment>
    )
}