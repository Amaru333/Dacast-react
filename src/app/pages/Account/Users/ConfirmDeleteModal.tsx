import React from 'react';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Text } from '../../../../components/Typography/Text';
import { User } from '../../../redux-flow/store/Account/Users/types';

interface ConfirmDeleteUserModalProps {
    userInfo: User; 
    toggle: React.Dispatch<React.SetStateAction<boolean>>; 
    deleteUser: (userId: string, transferContentsToUserId: null, invitationId: string) => Promise<void>
}

export const ConfirmDeleteModal = (props: ConfirmDeleteUserModalProps) => {
    
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleSubmit = () => {
        setButtonLoading(true)
        props.deleteUser(props.userInfo.userId, null, props.userInfo.invitationId)
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