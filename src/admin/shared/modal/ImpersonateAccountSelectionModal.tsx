import React from 'react'
import { ModalContent } from '../../../components/Modal/ModalCard'
import { Text } from '../../../components/Typography/Text'
import { ActionIcon, IconStyle } from '../../../shared/Common/Icon'
import styled from 'styled-components'
import { useQuery } from '../../../utils/utils'
import { dacastSdk } from '../../utils/services/axios/adminAxiosClient'
import { Modal } from '../../../components/Modal/Modal'
import { formatPostImpersonateOutput } from '../../utils/utils'


export const ImpersonateAccountSelectionModal = (props: {availableUsers: any[]; loginToken: string; opened: boolean; toggle: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const query = useQuery()

    const handleUserSelection = (userId: string) => {
        dacastSdk.postImpersonateAccount({selectedUserId: userId, loginToken: props.loginToken})
        .then((response) => {
            formatPostImpersonateOutput(response, userId)
            props.toggle(false)
        })
    }
    const renderAccountsList = () => {
        return props.availableUsers.map((account, i) => {
            return (
                <AccountSelectionRow style={{marginBottom: 0}} onClick={() => {handleUserSelection(account.userId)}} className='col col-12 flex items-center py2 pl2 pointer'>
                    <div className='col col-11 flex'>
                        <Text size={16} weight='med'>{account.companyName || account.companyWebsite}</Text>
                        <Text size={16} weight='med' color='gray-3'>&nbsp;({account.role || 'Owner'})</Text>
                    </div>
                    <div  className='flex justify-end col col-1'>
                        <ActionIcon id={"subfolderTooltip" + i}>
                            <IconStyle onClick={() => {handleUserSelection(account.userId)}} coloricon='gray-3'>keyboard_arrow_right</IconStyle>
                        </ActionIcon>
                    </div>
                </AccountSelectionRow>
            )
        })
    }
    return (
        <Modal allowNavigation={false} hasClose opened={props.opened} toggle={() => props.toggle(!props.opened)} className="mx-auto" size="small" modalTitle="Choose Account To Impersonate">
            <ModalContent>
                <div className="my1">
                    <Text size={14} weight="reg">There are multiple accounts associated with email</Text>
                </div>
                <div className="my1">
                    <Text size={14} weight="reg">{query.get('email') || ''}. Select account to impersonate.</Text>
                </div>
                {renderAccountsList()}
            </ModalContent>
        </Modal>
    )
}

const AccountSelectionRow = styled.div<{}>`
    border: 1px solid ${props => props.theme.colors['gray-8']};
    &: hover {
        background-color: ${props => props.theme.colors['violet10']};
    }
`