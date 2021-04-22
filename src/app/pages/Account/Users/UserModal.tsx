import React from 'react';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Toggle } from '../../../../components/Toggle/toggle';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { IconStyle } from '../../../../shared/Common/Icon';
import { defaultUser, User } from '../../../redux-flow/store/Account/Users/types';
import { DisabledSection } from '../../../shared/Common/MiscStyle';

interface UserModalProps {
    userDetails: User; 
    setUserDetails: React.Dispatch<React.SetStateAction<User>>; 
    toggle: React.Dispatch<React.SetStateAction<boolean>>; 
    addUser: (email: string, isAdmin: boolean) => Promise<void>
    editRole: (user: User) => Promise<void>
}

export const UserModal = (props: UserModalProps) => {

    const [user, setUser] = React.useState<{email: string; isAdmin: boolean}>({email: props.userDetails.email, isAdmin: props.userDetails.role === 'Admin'})
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const handleCancel = () => {
        props.setUserDetails(defaultUser)
        props.toggle(false)
    }

    const validateEmail = () => {
        return !/\S+@\S+\.\S+/.test(user.email)
    }

    const handleSubmit = () => {
        setIsLoading(true)
        if(props.userDetails.userId === '-1') {
            props.addUser(user.email, user.isAdmin)
            .then(() => {
                setIsLoading(false)
                props.toggle(false)
            })
            .catch(() => setIsLoading(false))
        } else {
            props.editRole({
                ...props.userDetails,
                role: user.isAdmin ? 'Admin' : 'Creator'
            })
            .then(() =>{
                setIsLoading(false)
                props.toggle(false)
            }).catch(() => setIsLoading(false))
        }

    }

    return (
    <div className="flex flex-column">
        {
            props.userDetails.userId !== '-1' && 
            <div>
                <Input disabled={props.userDetails.userId !== '-1'} className="col col-6 pr2" label="First Name" placeholder="First Name" value={props.userDetails.firstName} onChange={(event) => props.setUserDetails({...props.userDetails, firstName: event.currentTarget.value})} />
                <Input disabled={props.userDetails.userId !== '-1'} className="col col-6" label="Last Name" placeholder="Last Name" value={props.userDetails.lastName} onChange={(event) => props.setUserDetails({...props.userDetails, lastName: event.currentTarget.value})} />
            </div>
        }
        <Input type='email' isError={validateEmail() && user.email.length > 0} help={validateEmail() && user.email.length > 0 ? 'Please enter a valid email address' : null} disabled={props.userDetails.userId !== "-1"} className="col col-12 mt2" label="Email Address" placeholder="Email Address" value={user.email} onChange={(event) => setUser({...user, email: event.currentTarget.value})} />
        <DisabledSection settingsEditable={props.userDetails.role !== "Owner"} className="col col-6 mt2 flex">
            <Toggle style={{marginRight: 92}} label="Admin Role" defaultChecked={user.isAdmin} onChange={() => setUser({...user, isAdmin: !user.isAdmin})}/>
            <IconStyle fontSize="small" coloricon="gray-4" id="adminTooltip">info_outlined</IconStyle>
            <Tooltip leftPositionValueToZero target="adminTooltip">Grants access to account management features and all content</Tooltip>
        </DisabledSection>
        <div className="flex mt3">
            <Button isLoading={isLoading} disabled={validateEmail() && props.userDetails.userId === '-1'} onClick={() => handleSubmit()}>{props.userDetails.userId === '-1' ? 'Add' : 'Save'}</Button>
            <Button className="ml2" typeButton="secondary" onClick={() => handleCancel()}>Cancel</Button>
        </div>
    </div>
    )
    
}

