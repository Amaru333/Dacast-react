import React from 'react';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { Text } from '../../../../components/Typography/Text';
import { User } from '../../../redux-flow/store/Account/Users/types';

export const TransferContentModal = (props: {users: User[]; toggle: (b: boolean) => void}) => {

    const createUserDropdownList = () => {
        return props.users.map((user: User) => {
            let userDropdownListItem: DropdownSingleListItem = {
                title: null,
                data: null
            }
            userDropdownListItem.title = user.firstName + ' ' + user.lastName
            userDropdownListItem.data = {
                id: user.userID,
                role: user.role
            }
            return userDropdownListItem
        })
    }

    const userDropdownList = createUserDropdownList()

    const [selectedUser, setSelectedUser] = React.useState<string>(userDropdownList.find(user => user.data.role === "Owner").data.userID)

    return (
        <div className="flex flex-column">
            <Text>Who should have the content?</Text>
            <DropdownSingle 
                id="userDropdown" 
                dropdownTitle="Existing User"
                isInModal 
                list={userDropdownList} 
                dropdownDefaultSelect={userDropdownList.find(user => user.data.role === "Owner").title}
                callback={(user: DropdownSingleListItem) => setSelectedUser(user.data.id)}
            />
            <div className="flex mt3">
                <Button onClick={() => props.toggle(false)}>Confirm</Button>
                <Button className="ml2" typeButton="secondary" onClick={() => {props.toggle(false)}}>Cancel</Button>
            </div>
        </div>
    )
}