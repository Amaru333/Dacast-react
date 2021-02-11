import React from 'react';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Toggle } from '../../../../components/Toggle/toggle';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { IconStyle } from '../../../../shared/Common/Icon';
import { defaultUser, User } from '../../../redux-flow/store/Account/Users/types';
import { DisabledSection } from '../../../shared/Common/MiscStyle';

export const UserModal = (props: {userDetails: User; setUserDetails: React.Dispatch<React.SetStateAction<User>>; toggle: (b: boolean) => void}) => {

    const modalValidated = props.userDetails.firstName && props.userDetails.lastName && props.userDetails.email

    const handleCancel = () => {
        props.setUserDetails(defaultUser)
        props.toggle(false)
    }

    const handleRoleChange = () => {
        if(props.userDetails.role === "Creator"){
            props.setUserDetails({...props.userDetails, role: "Admin"})
        } else {
            props.setUserDetails({...props.userDetails, role: "Creator"})
        }
    }

    return (
    <div className="flex flex-column">
        <div>
        <Input className="col col-6 pr2" label="First Name" placeholder="First Name" value={props.userDetails.firstName} onChange={(event) => props.setUserDetails({...props.userDetails, firstName: event.currentTarget.value})} />
        <Input className="col col-6" label="Last Name" placeholder="Last Name" value={props.userDetails.lastName} onChange={(event) => props.setUserDetails({...props.userDetails, lastName: event.currentTarget.value})} />
        </div>
        <Input disabled={props.userDetails.userID !== "-1"} className="col col-12 mt2" label="Email Address" placeholder="Email Address" value={props.userDetails.email} onChange={(event) => props.setUserDetails({...props.userDetails, email: event.currentTarget.value})} />
        <DisabledSection settingsEditable={props.userDetails.role !== "Owner"} className="col col-6 mt2 flex">
            <Toggle style={{marginRight: 92}} label="Admin Role" checked={props.userDetails.role !== 'Creator'} onChange={() => handleRoleChange()}/>
            <IconStyle fontSize="small" coloricon="gray-4" id="adminTooltip">info_outlined</IconStyle>
            <Tooltip leftPositionValueToZero target="adminTooltip">Grants access to account management features and all content</Tooltip>
        </DisabledSection>
        <div className="flex mt3">
            <Button disabled={!modalValidated} onClick={() => {console.log('user added'); props.toggle(false)}}>Add</Button>
            <Button className="ml2" typeButton="secondary" onClick={() => handleCancel()}>Cancel</Button>
        </div>
    </div>
    )
    
}

