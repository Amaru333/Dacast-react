import React from 'react';
import { InputTags } from '../../../../components/FormsComponents/Input/InputTags';
import { IconGreyActionsContainer, IconStyle } from '../../../../shared/Common/Icon';
import { Text } from '../../../../components/Typography/Text';
import { SeparatorHeader } from '../../Folders/FoldersStyle';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Table } from '../../../../components/Table/Table';
import { Avatar } from '../../../../components/Avatar/Avatar';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { DropdownCustom } from '../../../../components/FormsComponents/Dropdown/DropdownCustom';
import { userToken } from '../../../utils/services/token/tokenService';
import { Modal } from '../../../../components/Modal/Modal';
import { UserModal } from './UserModal';
import { defaultUser, User } from '../../../redux-flow/store/Account/Users/types';

export const UsersPage = (props: {users: User[]}) => {

    const [userModalOpen, setUserModalOpen] = React.useState<boolean>(false)
    const [userDetails, setUserDetails] = React.useState<User>(defaultUser)

    const handleUserRole = (role: string) => {
        switch (role) {
            case 'Owner':
                return <Label backgroundColor="green20" color="green" label="Owner" />
            case 'Admin':
                return <Label backgroundColor="red20" color="red" label="Admin" />
            default:
                return null
        }
    }

    const handleUserDropdownOptions = (action: string, user: User) => {
        switch (action) {
            case 'Edit':
                setUserDetails(user);
                setUserModalOpen(true);
                break;
            case 'Delete':
                console.log('delete user modal')
                break;
        }
    }

    const usersHeaderElement = () => {
        return {
            data: [
                {cell: <Text style={{marginLeft: 56}} key="nameUsers" size={14} weight="med" color="gray-1">Name</Text>, sort: 'name'},
                {cell: <Text key="emailUsers" size={14} weight="med" color="gray-1">Email</Text>, sort: 'email'},
                {cell: <Text key="roleUsers" size={14} weight="med" color="gray-1">Role</Text>, sort: 'role'},
                { cell: <div></div> }
            ]
        }
    }

    const usersBodyElement = () => {
        return props.users.map((user) => {
            return {
                data: [
                    <div className="flex items-center">
                        <Avatar className="mr3" name={user.firstName + ' ' + user.lastName} />
                        <Text>{user.firstName + ' ' + user.lastName}</Text>
                        {
                            userToken.getUserInfoItem('custom:dacast_user_id') === user.userID &&
                            <Text color="gray-5">&nbsp;(You)</Text>
                        }
                        
                    </div>,
                    <Text>{user.email}</Text>,
                    handleUserRole(user.role),
                    <div key={'usersMoreActionButton' + user.userID} className='right mr2'>
                            <DropdownCustom 
                                backgroundColor="transparent" 
                                id={'foldersTableMoreActionDropdown_' + user.userID} 
                                list={['Edit', 'Delete']} callback={(value: string) => handleUserDropdownOptions(value, user)}
                            >
                                <IconGreyActionsContainer >
                                    <IconStyle>more_vert</IconStyle>
                                </IconGreyActionsContainer>
                            </DropdownCustom>
                        </div>
                ]
            }
        })
    }

    return (
        <React.Fragment>
            <div className="flex items-center mb2">
                <div className="flex-auto flex items-center">
                    <IconStyle coloricon='gray-3'>search</IconStyle>
                    <InputTags oneTag noBorder={true} placeholder="Search Users..." style={{ display: "inline-block" }} />
                </div>
                <div className="flex items-center relative">
                    <Text style={{textDecoration: 'underline', cursor:'pointer'}} onClick={() => console.log('hey')} size={14} color="dark-violet">Change Number of Seats</Text>
                    <SeparatorHeader className="mx1 inline-block" />
                    <Text color="gray-3">1 out of 5 seats used</Text>
                    <Button sizeButton="small" className="ml2" onClick={() => {setUserModalOpen(true)}}>Add User</Button>
                </div>
            </div>
            <Table customClassName=" tableOverflow" id="usersTable" header={usersHeaderElement()} body={usersBodyElement()} headerBackgroundColor="white"></Table>
            <Text className="relative right" size={12} color="gray-3">4 Seats Available</Text>
            <Modal modalTitle={userDetails.userID === "-1" ? "Add User" : "Edit User"} size="small" hasClose={false} toggle={() => setUserModalOpen(false)} opened={userModalOpen}>
                <UserModal userDetails={userDetails} setUserDetails={setUserDetails} toggle={setUserModalOpen} />
            </Modal>

        </React.Fragment>
    )
}