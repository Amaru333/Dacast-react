import React from 'react';
import { InputTags } from '../../../../components/FormsComponents/Input/InputTags';
import { ActionIcon, IconGreyActionsContainer, IconStyle } from '../../../../shared/Common/Icon';
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
import { defaultUser, MultiUserDetails, User, UserRole, UserStatus } from '../../../redux-flow/store/Account/Users/types';
import { DeleteUserModal } from './DeleteUserModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { TransferContentModal } from './TransferContentModal';
import { CustomStepper } from '../../../../components/Stepper/Stepper';
import { ChangeSeatsCartStep } from './ChangeSeatsCartStep';
import { ChangeSeatsPaymentStep } from './ChangeSeatsPaymentStep';
import { Plan } from '../../../redux-flow/store/Account/Upgrade/types';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { UsersComponentProps } from '../../../containers/Account/Users';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';

export const UsersPage = (props: UsersComponentProps) => {

    const [userModalOpen, setUserModalOpen] = React.useState<boolean>(false)
    const [deleteUserModalOpen, setDeleteUserModalOpen] = React.useState<boolean>(false)
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = React.useState<boolean>(false)
    const [transferContentModalOpen, setTransferContentModalOpen] = React.useState<boolean>(false)
    const [changeSeatsStepperOpen, setChangeSeatsStepperOpen] = React.useState<boolean>(false)
    const [userDetails, setUserDetails] = React.useState<User>(defaultUser)
    const [planDetails, setPlanDetails] = React.useState<Plan>(props.plan)
    let emptySeats: number = props.multiUserDetails.maxSeats - props.multiUserDetails.users.length

    const changeSeatsStepList = [{title: "Cart", content: ChangeSeatsCartStep}, {title: "Payment", content: ChangeSeatsPaymentStep}]

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
            default:
                return null
        }
    }

    // const handleUserDropdownOptions = (action: string, user: User) => {
    //     switch (action) {
    //         case 'Edit':
    //             setUserDetails(user);
    //             setUserModalOpen(true);
    //             break;
    //         case 'Delete':
    //             setDeleteUserModalOpen(true);
    //             break;
    //     }
    // }

    const handleDeleteModalSelection = (input: string) => {
        setDeleteUserModalOpen(false)
        if(input === "transfer"){
            setTransferContentModalOpen(true)
        } else {
            setConfirmDeleteModalOpen(true)
        }
    }

    const handleUserMoreActions = (user: User) => {
        if(user.userId === userToken.getUserInfoItem('user-id') || user.role === 'Owner') {
            return <span></span>
        }

        if(user.status === 'Invited') {
            return (
                <div key={"more" + user.userId} className="iconAction right mr2" >
                    <ActionIcon id={"deleteTooltip" + user.userId}>
                        <IconStyle onClick={() => {props.cancelUserInvite(user)}} className="right mr1" >delete</IconStyle>
                    </ActionIcon>
                    <Tooltip target={"deleteTooltip" + user.userId}>Delete</Tooltip>
                    <ActionIcon id={"editTooltip" + user.userId}>
                        <IconStyle onClick={() => {props.resendUserInvite(user)}} className="right mr1" >mail</IconStyle>
                    </ActionIcon>
                    <Tooltip target={"editTooltip" + user.userId}>Resend Email</Tooltip>
                </div>
            )
        }
        return (
            <div key={"more" + user.userId} className="iconAction right mr2" >
                <ActionIcon id={"deleteTooltip" + user.userId}>
                    <IconStyle onClick={() => {}} className="right mr1" >delete</IconStyle>
                </ActionIcon>
                <Tooltip target={"deleteTooltip" + user.userId}>Delete</Tooltip>
            </div>
        )
    }

    const usersHeaderElement = () => {
        return {
            data: [
                {cell: <Text style={{marginLeft: 56}} key="nameUsers" size={14} weight="med" color="gray-1">Name</Text>, sort: 'name'},
                {cell: <Text key="emailUsers" size={14} weight="med" color="gray-1">Email</Text>, sort: 'email'},
                {cell: <Text key="roleUsers" size={14} weight="med" color="gray-1">Role</Text>, sort: 'role'},
                {cell: <Text key="statusUsers" size={14} weight="med" color="gray-1">Status</Text>, sort: 'status'},
                { cell: <div></div> }
            ]
        }
    }

    const usersBodyElement = () => {
        return props.multiUserDetails.users.map((user) => {
            return {
                data: [
                    <div className="flex items-center">
                        <Avatar userRole={user.role} className="mr3" name={user.firstName + ' ' + user.lastName} />
                        <Text>{user.firstName + ' ' + user.lastName}</Text>
                        {
                            userToken.getUserInfoItem('user-id') === user.userId &&
                            <Text color="gray-5">&nbsp;(You)</Text>
                        }
                        
                    </div>,
                    <Text>{user.email}</Text>,
                    <div key={'usersRoleDropdown' + user.userId} className='right mr2'>
                        <DropdownCustom 
                            backgroundColor="transparent" 
                            id={'usersTableStatusDropdown_' + user.userId} 
                            dropdownDefaultSelect={{title: user.role}}
                            list={[{title: 'Admin'}, {title: 'Creator'}]} callback={(value: DropdownSingleListItem) => props.editUserRole({...user, role: value.title as UserRole})}
                        >
                            {handleUserRole(user.role, user.userId)}
                        </DropdownCustom>
                    </div>,
                    handleUserStatus(user.status),
                    handleUserMoreActions(user)
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
                    <Text style={{textDecoration: 'underline', cursor:'pointer'}} onClick={() => setChangeSeatsStepperOpen(true)} size={14} color="dark-violet">Change Number of Seats</Text>
                    <SeparatorHeader className="mx1 inline-block" />
                    <Text color="gray-3">{props.multiUserDetails.users.length} out of {props.multiUserDetails.maxSeats} seats used</Text>
                    <Button sizeButton="small" className="ml2" onClick={() => {setUserModalOpen(true)}}>Add User</Button>
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
            <Modal modalTitle={userDetails.userId === "-1" ? "Add User" : "Edit User"} size="small" hasClose={false} toggle={() => setUserModalOpen(false)} opened={userModalOpen}>
                <UserModal action={props.addUser} userDetails={userDetails} setUserDetails={setUserDetails} toggle={setUserModalOpen} />
            </Modal>
            <Modal modalTitle="Delete User" size="small" hasClose={false} toggle={() => setDeleteUserModalOpen(false)} opened={deleteUserModalOpen}>
                <DeleteUserModal toggle={setDeleteUserModalOpen} handleDeleteModalSelection={handleDeleteModalSelection}/>
            </Modal>
            <Modal modalTitle="Delete User" size="small" hasClose={false} toggle={() => setConfirmDeleteModalOpen(false)} opened={confirmDeleteModalOpen}>
                <ConfirmDeleteModal toggle={setConfirmDeleteModalOpen} />
            </Modal>
            {
                transferContentModalOpen &&
                <Modal modalTitle="Delete User" size="small" hasClose={false} toggle={() => setTransferContentModalOpen(false)} opened={transferContentModalOpen}>
                    <TransferContentModal users={props.multiUserDetails.users} toggle={setTransferContentModalOpen} />
                </Modal>
            }
        </React.Fragment>
    )
}