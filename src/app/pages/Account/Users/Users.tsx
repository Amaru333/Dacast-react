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
import { UsersComponentProps } from '../../../containers/Account/Users';
import { compareValues } from '../../../../utils/utils';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { MultiUserUpgradeModal } from './MultiUserUpgradeModal';
import { PlanSummary } from '../../../redux-flow/store/Account/Plan';
import { dacastSdk } from '../../../utils/services/axios/axiosClient';
import { PaymentSuccessModal } from '../../../shared/Billing/PaymentSuccessModal';
import { PaymentFailedModal } from '../../../shared/Billing/PaymentFailedModal';
import EventHooker from '../../../../utils/services/event/eventHooker';
import { ContactOwnerModal } from './ContactOwnerModal';

export type PlanSummaryWithAdditionalSeats = PlanSummary & {termsAndConditions: boolean; seatToPurchase: number; proRatedPrice: number}

export const UsersPage = (props: UsersComponentProps) => {

    const [userModalOpen, setUserModalOpen] = React.useState<boolean>(false)
    const [deleteUserModalOpen, setDeleteUserModalOpen] = React.useState<boolean>(false)
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = React.useState<boolean>(false)
    const [transferContentModalOpen, setTransferContentModalOpen] = React.useState<boolean>(false)
    const [changeSeatsStepperOpen, setChangeSeatsStepperOpen] = React.useState<boolean>(false)
    const [userDetails, setUserDetails] = React.useState<User>(defaultUser)
    const [planDetails, setPlanDetails] = React.useState<PlanSummaryWithAdditionalSeats>(props.billingInfo ? {...props.billingInfo.currentPlan, termsAndConditions: false, seatToPurchase: 0, proRatedPrice: 0} : null)
    const [usersTableSort, setUsersTableSort] = React.useState<string>('name')
    const [usersTableKeyword, setUsersTableKeyword] = React.useState<string>(null)
    const [userToDelete, setUserToDelete] = React.useState<User>(null)
    const [upgradeMultiUserModalOpen, setUpgradeMultiUserModalOpen] = React.useState<boolean>(false)
    const [paymentSuccessfulModalOpened, setPaymentSuccessfulModalOpened] = React.useState<boolean>(false)
    const [paymentDeclinedModalOpened, setPaymentDeclinedModalOpened] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [ contactOwnerModalOpened, setContactOwnerModalOpened] = React.useState<boolean>(false)
    let emptySeats: number = props.multiUserDetails.maxSeats - props.multiUserDetails.occupiedSeats
    const refreshSpan = 5000
    const refreshEvery = 5000
    let fastRefreshUntil = 0
    let timeoutId: NodeJS.Timeout | null = null
    const changeSeatsStepList = [{title: "Cart", content: ChangeSeatsCartStep}, {title: "Payment", content: ChangeSeatsPaymentStep}]

    React.useEffect(() => {
        filterUsersTable()
    }, [props.multiUserDetails.users, usersTableSort, usersTableKeyword])

    React.useEffect(() => {
        if(props.billingInfo && !planDetails) {
            setPlanDetails({...props.billingInfo.currentPlan, termsAndConditions: false, seatToPurchase: 0, proRatedPrice: 0})
        }
    }, [props.billingInfo])

    const timeoutFunc = () => {
        props.getMultiUsersDetails()
        if(userToken.getPrivilege('privilege-billing')) {
            props.getBillingPageInfos()
        }
        if(new Date().getTime() < fastRefreshUntil) {
            timeoutId = setTimeout(timeoutFunc, refreshEvery)
        }
    }

    React.useEffect(() => {
        EventHooker.subscribe('ADDITIONAL_SEATS_PURCHASED', () => {
            fastRefreshUntil = new Date().getTime() + refreshSpan
            if(timeoutId === null) { 
                timeoutId = setTimeout(timeoutFunc, refreshEvery)
            }
        })

        return () => {
            EventHooker.unsubscribe('ADDITIONAL_SEATS_PURCHASED', () => {
                fastRefreshUntil = new Date().getTime() + refreshSpan
                if(timeoutId === null) { 
                    timeoutId = setTimeout(timeoutFunc, refreshEvery)
                }
            })
        }
    }, [])

    const purchaseAddOns = () => {
        setIsLoading(true)
        dacastSdk.postPurchaseAddOn({
            addOnCode: 'MUA_ADDITIONAL_SEATS',
            quantity: planDetails.addOns.find(addOn => addOn.code === 'MUA_ADDITIONAL_SEATS').quantity,
            preview: false
        })
        .then(() => {
            setIsLoading(false)
            setChangeSeatsStepperOpen(false)
            setPaymentSuccessfulModalOpened(true)
            EventHooker.dispatch('ADDITIONAL_SEATS_PURCHASED', undefined)
        })
        .catch(() => {
            setIsLoading(false)
            setPaymentDeclinedModalOpened(true)
        })
    }

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

    const handleStatusColor = (status: UserStatus) => {
        switch (status) {
            case 'Active':
                return 'green'
            case 'Invited':
                return 'gray-4'
            case 'Expired':
            case 'Disabled':
                return 'red'
            default:
                return 'red'
        }
    }

    const handleUserDropdownOptions = (action: string, user: User) => {
        switch (action) {
            case 'Edit':
                setUserDetails(user);
                setUserModalOpen(true);
                break;
            case 'Delete':
                setUserToDelete(user)
                if(user.status === 'Invited') {
                    setConfirmDeleteModalOpen(true)
                } else {
                    setDeleteUserModalOpen(true);
                }
                break;
            case 'Resend Invite': 
                props.resendUserInvite(user.invitationId)
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
            sortCallback: (value: string) => setUsersTableSort(value),
            defaultSort: 'name'
        }
    }

    const usersBodyElement = () => {
        return props.multiUserDetails.filteredUsers.map((user) => {
            return {
                data: [
                    <div key={'userName' + user.userId} className="flex items-center">
                        {
                            (user.name) &&
                            <Avatar userRole={user.role} className="mr3" name={user.name} />
                        }
                        <Text >{user.name}</Text>
                        {
                            userToken.getUserInfoItem('user-id') === user.userId &&
                            <Text color="gray-5">&nbsp;(You)</Text>
                        }
                        
                    </div>,
                    <Text key={'userEmail' + user.userId}>{user.email}</Text>,
                    <div key={'usersRole' + user.userId} className='left mr2'>
                        {handleUserRole(user.role, user.userId)}
                    </div>,
                    <Text key={'userStatus' + user.userId} size={14} weight='reg' color={handleStatusColor(user.status)}>{user.status}</Text>,
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
        props.filterUsersList(filteredList)
    }
    return (
        <React.Fragment>
            <div className="flex items-center mb2">
                <div className="flex-auto flex items-center">
                    <IconStyle coloricon='gray-3'>search</IconStyle>
                    <InputTags oneTag noBorder={true} placeholder="Search Users..." style={{ display: "inline-block" }} defaultTags={usersTableKeyword ? [usersTableKeyword] : []} callback={(value: string[]) => setUsersTableKeyword(value[0])} />
                </div>
                <div className="flex items-center relative">
                    <Text style={{textDecoration: 'underline', cursor:'pointer'}} onClick={() => {userToken.getPrivilege('privilege-billing') ? setChangeSeatsStepperOpen(true) : setContactOwnerModalOpened(true)}} size={14} color="dark-violet">Buy more seats</Text>
                    <SeparatorHeader className="mx1 inline-block" />
                    <Text color="gray-3">{props.multiUserDetails.occupiedSeats} out of {props.multiUserDetails.maxSeats} seats used</Text>
                    <Button disabled={emptySeats <= 0} sizeButton="small" className="ml2" onClick={() => {userToken.getUserInfoItem('planName').indexOf('Trial') === -1 ? setUserModalOpen(true) : setUpgradeMultiUserModalOpen(true)}}>Add User</Button>
                </div>
            </div>
            <Table customClassName=" tableOverflow" id="usersTable" header={usersHeaderElement()} body={usersBodyElement()} headerBackgroundColor="white"></Table>
            <Text className="relative right" size={12} color="gray-3">{emptySeats} Seats Available</Text>
            {
                changeSeatsStepperOpen &&
                <CustomStepper
                    stepperHeader="Buy more Seats"
                    stepList={changeSeatsStepList}
                    opened={changeSeatsStepperOpen}
                    lastStepButton="Purchase"
                    finalFunction={() => {}}
                    functionCancel={() => setChangeSeatsStepperOpen(false)}
                    stepperData={planDetails}
                    updateStepperData={(plan: PlanSummaryWithAdditionalSeats) => setPlanDetails(plan)}
                    emptySeats={emptySeats}
                    planData={props.billingInfo.currentPlan}
                    billingInfo={props.billingInfo}
                    purchaseAddOn={purchaseAddOns}
                    isLoading={isLoading}
                />
            }
            {
                userModalOpen && 
                <Modal modalTitle={userDetails.userId === "-1" ? "Add User" : "Edit User"} size="small" hasClose={false} toggle={() => setUserModalOpen(false)} opened={userModalOpen}>
                    <UserModal addUser={props.addUser} editRole={props.editUserRole} userDetails={userDetails} setUserDetails={setUserDetails} toggle={setUserModalOpen} />
                </Modal>
            }

            <Modal modalTitle="Delete User" size="small" hasClose={false} toggle={() => setDeleteUserModalOpen(false)} opened={deleteUserModalOpen}>
                <DeleteUserModal toggle={setDeleteUserModalOpen} handleDeleteModalSelection={handleDeleteModalSelection} userName={userToDelete ? userToDelete.name : ''}/>
            </Modal>
            <Modal modalTitle="Delete User" size="small" hasClose={false} toggle={() => setConfirmDeleteModalOpen(false)} opened={confirmDeleteModalOpen}>
                <ConfirmDeleteModal userInfo={userToDelete} deleteUser={props.deleteUser} toggle={setConfirmDeleteModalOpen} />
            </Modal>
            {
                transferContentModalOpen &&
                <Modal modalTitle="Delete User" size="small" hasClose={false} toggle={() => setTransferContentModalOpen(false)} opened={transferContentModalOpen}>
                    <TransferContentModal userToDelete={userToDelete} deleteUser={props.deleteUser} users={props.multiUserDetails.users} toggle={setTransferContentModalOpen} />
                </Modal>
            }
            <Modal modalTitle="Upgrade for Multi-User Access?" size="small" hasClose={false} toggle={() => setUpgradeMultiUserModalOpen(false)} opened={upgradeMultiUserModalOpen} >
                <MultiUserUpgradeModal openBuySeatsStepper={() => setChangeSeatsStepperOpen(true)} toggle={setUpgradeMultiUserModalOpen} />
            </Modal>
            {
                paymentSuccessfulModalOpened && 
                <PaymentSuccessModal toggle={() => setPaymentSuccessfulModalOpened(!paymentSuccessfulModalOpened)} opened={paymentSuccessfulModalOpened}>
                    <Text size={14}>You bought {planDetails.seatToPurchase} additional seats.</Text>
                </PaymentSuccessModal>
            }

            <PaymentFailedModal toggle={() => setPaymentDeclinedModalOpened(!paymentDeclinedModalOpened)} opened={paymentDeclinedModalOpened}>
                <Text size={14}>Your payment was declined.</Text>
            </PaymentFailedModal>
            <ContactOwnerModal title="Access restricted" specificText='buy more seats.' toggle={setContactOwnerModalOpened} opened={contactOwnerModalOpened} />
        </React.Fragment>
    )
}