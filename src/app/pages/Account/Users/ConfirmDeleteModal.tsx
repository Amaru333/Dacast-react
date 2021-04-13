import React from 'react';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Text } from '../../../../components/Typography/Text';
import { UserStatus } from '../../../redux-flow/store/Account/Users/types';

interface ConfirmDeleteUserModalProps {
    userId: string; 
    invitationId: string
    userStatus: UserStatus; 
    toggle: React.Dispatch<React.SetStateAction<boolean>>; 
    deleteUser: (userId: string, transferContentsToUserId?: null) => Promise<void>
    cancelInvite: (invitationId: string) => Promise<void>
}

export const ConfirmDeleteModal = (props: ConfirmDeleteUserModalProps) => {
    
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleSubmit = () => {
        setButtonLoading(true)
        if(props.userStatus === 'Invited') {
            props.cancelInvite(props.invitationId)
            .then(() => {
                setButtonLoading(false)
                props.toggle(false)
            }).catch(() => setButtonLoading(false))
        }
        props.deleteUser(props.userId, null)
        .then(() => {
            setButtonLoading(false)
            props.toggle(false)
        }).catch(() => setButtonLoading(false))
    }
    
    return (
        <div className="flex flex-column">
            <Text className="mt1">Are you sure that you want to delete this user and all their content?</Text>
            <Text className="mt1" weight="med">Please note this action cannot be undone</Text>
            <div className="flex mt3">
                <Button isLoading={buttonLoading} onClick={() => handleSubmit()}>Delete</Button>
                <Button className="ml2" typeButton="secondary" onClick={() => props.toggle(false)}>Cancel</Button>
            </div>
        </div>
    )
}