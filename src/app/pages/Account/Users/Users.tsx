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
import { defaultUser, User, UserRole, UserStatus } from '../../../redux-flow/store/Account/Users/types';
import { DeleteUserModal } from './DeleteUserModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { TransferContentModal } from './TransferContentModal';
import { CustomStepper } from '../../../../components/Stepper/Stepper';
import { ChangeSeatsCartStep } from './ChangeSeatsCartStep';
import { ChangeSeatsPaymentStep } from './ChangeSeatsPaymentStep';
import { Plan } from '../../../redux-flow/store/Account/Upgrade/types';
import { UsersComponentProps } from '../../../containers/Account/Users';
import { compareValues } from '../../../../utils/utils';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';

export const UsersPage = (props: UsersComponentProps) => {

    const [userModalOpen, setUserModalOpen] = React.useState<boolean>(false)
    const [deleteUserModalOpen, setDeleteUserModalOpen] = React.useState<boolean>(false)
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = React.useState<boolean>(false)
    const [transferContentModalOpen, setTransferContentModalOpen] = React.useState<boolean>(false)
    const [changeSeatsStepperOpen, setChangeSeatsStepperOpen] = React.useState<boolean>(false)
    const [userDetails, setUserDetails] = React.useState<User>(defaultUser)
    const [planDetails, setPlanDetails] = React.useState<Plan>(props.plan)
    const [usersTableSort, setUsersTableSort] = React.useState<string>('')
    const [usersTableKeyword, setUsersTableKeyword] = React.useState<string>(null)
    const [usersList, setUsersList] = React.useState<User[]>(props.multiUserDetails.users)
    const [userToDelete, setUserToDelete] = React.useState<string>(null)

    let emptySeats: number = props.multiUserDetails.maxSeats - props.multiUserDetails.users.length

    const changeSeatsStepList = [{title: "Cart", content: ChangeSeatsCartStep}, {title: "Payment", content: ChangeSeatsPaymentStep}]

    React.useEffect(() => {
        setUsersList(filterUsersTable())
    }, [props.multiUserDetails.users, usersTableSort, usersTableKeyword])

    const handleUserRole = (role: UserRole, userId: string) => {
        switch (role) {
            case 'Owner':
                return <Label backgroundColor={userToken.getUserInfoItem('user-id') === userId ? "green20" : "gray-9"} color={userToken.getUserInfoItem('user-id') === userId ? "green" : "gray-5"} label="Owner" />
            case 'Admin':
                return <Label backgroundColor="red20" color="red" label="Admin" />
            case 'Creator':
                return <Label backgroundColor="yellow20" color="orange" label="Creator" />
            default:
                return null
        }
    }

    const handleUserStatus = (status: UserStatus) => {
        switch (status) {
            case 'Active':
                return <Label backgroundColor="green20" color="green" label={status} />
            case 'Invited':
                return <Label backgroundColor="blue20" color="blue" label={status} />
            case 'Expired':
                return <Label backgroundColor="yellow20" color="orange" label={status} />
            case 'Disabled':
                return <Label backgroundColor="red20" color="red" label={status} />
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
                setUserToDelete(user.userId)
                setDeleteUserModalOpen(true);
                break;
            case 'Resend Invite': 
                props.resendUserInvite(user)
                break;
        }
    }

    const handleDeleteModalSelection = (input: string) => {
        setDeleteUserModalOpen(false)
        if(input === "transfer"){
            setTransferContentModalOpen(true)
        } else {
            setConfirmDeleteModalOpen(true)
        }
    }

    const getUserDropdownOptions = (user: User) => {
        if(user.userId === userToken.getUserInfoItem('user-id') || user.role === 'Owner') {
            return null
        }

        if(user.status === 'Invited') {
            return [{title: 'Edit'}, {title: 'Delete'}, {title: 'Resend Invite'}]
        }

        return [{title: 'Edit'}, {title: 'Delete'}]
    }

    const usersHeaderElement = () => {
        return {
            data: [
                {cell: <Text style={{marginLeft: 56}} key="nameUsers" size={14} weight="med" color="gray-1">Name</Text>, sort: 'name'},
                {cell: <Text key="emailUsers" size={14} weight="med" color="gray-1">Email</Text>, sort: 'email'},
                {cell: <Text key="roleUsers" size={14} weight="med" color="gray-1">Role</Text>, sort: 'role'},
                {cell: <Text key="statusUsers" size={14} weight="med" color="gray-1">Status</Text>, sort: 'status'},
                { cell: <div></div> }
            ],
            sortCallback: (value: string) => setUsersTableSort(value)
        }
    }

    const usersBodyElement = () => {
        return usersList.map((user) => {
            return {
                data: [
                    <div className="flex items-center">
                        {
                            (user.name) &&
                            <Avatar userRole={user.role} className="mr3" name={user.name} />
                        }
                        <Text>{user.name}</Text>
                        {
                            userToken.getUserInfoItem('user-id') === user.userId &&
                            <Text color="gray-5">&nbsp;(You)</Text>
                        }
                        
                    </div>,
                    <Text>{user.email}</Text>,
                    <div key={'usersRoleDropdown' + user.userId} className='left mr2'>
                        {handleUserRole(user.role, user.userId)}
                    </div>,
                    handleUserStatus(user.status),
                    <div key={'usersMoreActionButton' + user.userId} className='right mr2'>
                        {
                            (user.userId !== userToken.getUserInfoItem('user-id') && user.role !== 'Owner' && user.status !== 'Disabled') &&
                            <DropdownCustom 
                                backgroundColor="transparent" 
                                id={'foldersTableMoreActionDropdown_' + user.userId} 
                                list={getUserDropdownOptions(user)} callback={(value: DropdownSingleListItem) => handleUserDropdownOptions(value.title, user)}
                            >
                                <IconGreyActionsContainer >
                                    <IconStyle>more_vert</IconStyle>
                                </IconGreyActionsContainer>
                            </DropdownCustom>
                        }
                    </div>
                ]
            }
            
        })
    }

    const filterUsersTable = () => {
        let filteredList = props.multiUserDetails.users
        if(usersTableKeyword) {
            filteredList = filteredList.filter(item => (item.email.indexOf(usersTableKeyword) !== -1 || item.firstName.indexOf(usersTableKeyword) !== -1 || item.lastName.indexOf(usersTableKeyword) !== -1))
        }

        filteredList.sort(compareValues(usersTableSort.split('-')[0], usersTableSort.split('-')[1] as 'asc'| 'desc'))

        return filteredList
    }
    return (
        <React.Fragment>
            <div className="flex items-center mb2">
                <div className="flex-auto flex items-center">
                    <IconStyle coloricon='gray-3'>search</IconStyle>
                    <InputTags oneTag noBorder={true} placeholder="Search Users..." style={{ display: "inline-block" }} defaultTags={usersTableKeyword ? [usersTableKeyword] : []} callback={(value: string[]) => setUsersTableKeyword(value[0])} />
                </div>
                <div className="flex items-center relative">
                    <Text style={{textDecoration: 'underline', cursor:'pointer'}} onClick={() => setChangeSeatsStepperOpen(true)} size={14} color="dark-violet">Change Number of Seats</Text>
                    <SeparatorHeader className="mx1 inline-block" />
                    <Text color="gray-3">{props.multiUserDetails.users.length} out of {props.multiUserDetails.maxSeats} seats used</Text>
                    <Button disabled={emptySeats <= 0} sizeButton="small" className="ml2" onClick={() => {setUserModalOpen(true)}}>Add User</Button>
                </div>
            </div>
            <Table customClassName=" tableOverflow" id="usersTable" header={usersHeaderElement()} body={usersBodyElement()} headerBackgroundColor="white"></Table>
            <Text className="relative right" size={12} color="gray-3">{emptySeats} Seats Available</Text>
            <CustomStepper
                stepperHeader="Change Number of Seats"
                stepList={changeSeatsStepList}
                opened={changeSeatsStepperOpen}
                lastStepButton="Purchase"
                finalFunction={() => {}}
                functionCancel={() => setChangeSeatsStepperOpen(false)}
                stepperData={planDetails}
                updateStepperData={(plan: Plan) => setPlanDetails(plan)}
                emptySeats={emptySeats}
                planData={props.plan}
                billingInfo={props.billingInfo}
            />
            {
                userModalOpen && 
                <Modal modalTitle={userDetails.userId === "-1" ? "Add User" : "Edit User"} size="small" hasClose={false} toggle={() => setUserModalOpen(false)} opened={userModalOpen}>
                    <UserModal addUser={props.addUser} editRole={props.editUserRole} userDetails={userDetails} setUserDetails={setUserDetails} toggle={setUserModalOpen} />
                </Modal>
            }

            <Modal modalTitle="Delete User" size="small" hasClose={false} toggle={() => setDeleteUserModalOpen(false)} opened={deleteUserModalOpen}>
                <DeleteUserModal toggle={setDeleteUserModalOpen} handleDeleteModalSelection={handleDeleteModalSelection}/>
            </Modal>
            <Modal modalTitle="Delete User" size="small" hasClose={false} toggle={() => setConfirmDeleteModalOpen(false)} opened={confirmDeleteModalOpen}>
                <ConfirmDeleteModal userId={userToDelete} deleteUser={props.deleteUser} toggle={setConfirmDeleteModalOpen} />
            </Modal>
            {
                transferContentModalOpen &&
                <Modal modalTitle="Delete User" size="small" hasClose={false} toggle={() => setTransferContentModalOpen(false)} opened={transferContentModalOpen}>
                    <TransferContentModal userToDelete={userToDelete} deleteUser={props.deleteUser} users={props.multiUserDetails.users} toggle={setTransferContentModalOpen} />
                </Modal>
            }
        </React.Fragment>
    )
}