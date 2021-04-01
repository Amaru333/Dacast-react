import React from 'react';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { InputRadio } from '../../../../components/FormsComponents/Input/InputRadio';
import { Text } from '../../../../components/Typography/Text';

export const DeleteUserModal = (props: {toggle: React.Dispatch<React.SetStateAction<boolean>>; handleDeleteModalSelection: React.Dispatch<React.SetStateAction<string>>}) => {

    const [deleteModalSelection, setDeleteModalSelection] = React.useState<string>(null)

    return (
        <div className="flex flex-column">
            <Text className="mt1">What do you want to happen to their content?</Text>
            <InputRadio checked={deleteModalSelection === "transfer"} className="mt1" name="delete-user" value="transfer" label="Transfer to another user" onChange={() => setDeleteModalSelection("transfer")}/>
            <InputRadio checked={deleteModalSelection === "delete"} className="mt1" name="delete-user" value="delete" label="Delete permanently" onChange={() => setDeleteModalSelection("delete")}/>
            <div className="flex mt3">
                <Button onClick={() => {props.handleDeleteModalSelection(deleteModalSelection); setDeleteModalSelection(null)}}>Next</Button>
                <Button className="ml2" typeButton="secondary" onClick={() => {props.toggle(false); setDeleteModalSelection(null)}}>Cancel</Button>
            </div>
        </div>
    )
}