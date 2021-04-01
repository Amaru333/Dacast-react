import React from 'react';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { Text } from '../../../../components/Typography/Text';
import { User } from '../../../redux-flow/store/Account/Users/types';

export const TransferContentModal = (props: {users: User[]; toggle: React.Dispatch<React.SetStateAction<boolean>>; userToDelete: string; deleteUser: (userToDelete: string, transferContentsToUserId: string) => Promise<void>}) => {

    const createUserDropdownList = () => {
        return props.users.map((user: User): DropdownSingleListItem => {
            return {
                title: user.firstName + ' ' + user.lastName,
                data: {
                    id: user.userId,
                    role: user.role
                }
            }
        })
    }

    const userDropdownList = createUserDropdownList()
    const [selectedUser, setSelectedUser] = React.useState<string>(userDropdownList.find(user => user.data.role === "Owner") ? userDropdownList.find(user => user.data.role === "Owner").data.userId: '')
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleSubmit = () => {
        setButtonLoading(true)
        props.deleteUser(props.userToDelete, selectedUser)
        .then(() => {
            setButtonLoading(false)
            props.toggle(false)
        }).catch(() => setButtonLoading(false))
    }
    return (
        <div className="flex flex-column">
            <Text>Who should have the content?</Text>
            <DropdownSingle 
                id="userDropdown" 
                dropdownTitle="Existing User"
                isInModal 
                hasSearch
                list={userDropdownList} 
                dropdownDefaultSelect={userDropdownList.find(user => user.data.role === "Owner") ? userDropdownList.find(user => user.data.role === "Owner").title : null}
                callback={(user: DropdownSingleListItem) => setSelectedUser(user.data.id)}
            />
            <div className="flex mt3">
                <Button isLoading={buttonLoading} onClick={() => handleSubmit()}>Confirm</Button>
                <Button className="ml2" typeButton="secondary" onClick={() => {props.toggle(false)}}>Cancel</Button>
            </div>
        </div>
    )
}