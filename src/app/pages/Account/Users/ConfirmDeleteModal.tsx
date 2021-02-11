import React from 'react';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Text } from '../../../../components/Typography/Text';

export const ConfirmDeleteModal = (props: {toggle: (b: boolean) => void}) => {
    return (
        <div className="flex flex-column">
            <Text className="mt1">Are you sure that you want to delete this user and all their content?</Text>
            <Text className="mt1" weight="med">Please note this action cannot be undone</Text>
            <div className="flex mt3">
                <Button onClick={() => console.log('delete user')}>Delete</Button>
                <Button className="ml2" typeButton="secondary" onClick={() => props.toggle(false)}>Cancel</Button>
            </div>
        </div>
    )
}