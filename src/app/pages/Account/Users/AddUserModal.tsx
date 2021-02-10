import { userInfo } from 'os';
import React from 'react';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Toggle } from '../../../../components/Toggle/toggle';

export const AddUserModal = (props: {toggle: (b: boolean) => void}) => {

    const [newUserInfo, setNewUserInfo] = React.useState({firstName: "", lastName: "", email: "", isAdmin: false})

    const modalValidated = newUserInfo.firstName && newUserInfo.lastName && newUserInfo.email

    const handleCancel = () => {
        setNewUserInfo({firstName: "", lastName: "", email: "", isAdmin: false})
        props.toggle(false)
    }

    return (
    <div className="flex flex-column">
        <div>
        <Input className="col col-6 pr2" label="First Name" placeholder="First Name" value={newUserInfo.firstName} onChange={(event) => setNewUserInfo({...newUserInfo, firstName: event.currentTarget.value})} />
        <Input className="col col-6" label="Last Name" placeholder="Last Name" value={newUserInfo.lastName} onChange={(event) => setNewUserInfo({...newUserInfo, lastName: event.currentTarget.value})} />
        </div>
        <Input className="col col-12 mt2" label="Email Address" placeholder="Email Address" value={newUserInfo.email} onChange={(event) => setNewUserInfo({...newUserInfo, email: event.currentTarget.value})} />
        <div className="col col-12 mt2">
            <Toggle label="Admin Role" checked={newUserInfo.isAdmin} onChange={() => setNewUserInfo({...newUserInfo, isAdmin: !newUserInfo.isAdmin})}/>
        </div>
        <div className="flex mt3">
            <Button disabled={!modalValidated} onClick={() => {console.log('user added'); props.toggle(false)}}>Add</Button>
            <Button className="ml2" typeButton="secondary" onClick={() => handleCancel()}>Cancel</Button>
        </div>
    </div>
    )
    
}

