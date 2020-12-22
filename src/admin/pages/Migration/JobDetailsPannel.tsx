import React from 'react'
import { JobDetails, JobDetailsKey, JobReport } from '../../redux-flow/store/Migration/types'
import { Text } from '../../../components/Typography/Text'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { Modal } from '../../../components/Modal/Modal'
import { Table } from '../../../components/Table/Table'
import { IconStyle } from '../../../shared/Common/Icon'
import { updateClipboard } from '../../utils/utils'
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox'

interface JobDetailsPannelProps {
    jobId: string
    jobDetails: JobDetails
    switchUsers: (usersList: string[], jobId: string) => Promise<void>
}

export const JobDetailsPannel = (props: JobDetailsPannelProps) => {

    const [reportsModalOpened, setReportsModalOpened] = React.useState<boolean>(false) 
    const [selectedReport, setSelectedReport] = React.useState<JobReport[]>([])
    const [switchModalOpened, setSwitchModalOpened] = React.useState<boolean>(false)
    const [selectedUsers, setSelectedUsers] = React.useState<string[]>([])
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [errorModalOpened, setErrorModalOpened] = React.useState<boolean>(false)
    const [errorDetails, setErrorDetails] = React.useState<string>(null)

    const handleReportsModalClick = (report: JobReport[]) => {
        setSelectedReport(report)
        setReportsModalOpened(true)
    }

    const handleErrorButtonClick = (error: string) => {
        setErrorDetails(error)
    }

    const handleSwitchButtonClick = () => {
        setButtonLoading(true)
        props.switchUsers(selectedUsers, props.jobId)
        .then(() => {
            setButtonLoading(false)
            setSwitchModalOpened(false)
        })
        .catch(() => setButtonLoading(false))
    }

    const reportsTableHeader = () => {
        return {data: [
            {cell: <Text key='reportsTableHeaderUserIdCell' size={14} weight='med'>User Id</Text>},
            {cell: <Text key='reportsTableHeaderStatusCell' size={14} weight='med'>Status</Text>},
            {cell: <Text key='reportsTableHeaderErrorsCell' size={14} weight='med'>Errors</Text>},
        ]}
    }

    const reportsTableBody = () => {
        if(selectedReport) {
            return selectedReport.map((report, key) => {
                return {
                    data: [
                        <Text key={'reportsTableBodyUserIdCell' + key } size={14}>{report.userId}</Text>,
                        <IconStyle key={'reportsTableBodySuccessCell' + key } coloricon={report.success ? 'green' : 'red'}>{report.success ? 'check' : 'clear'}</IconStyle>,
                        <div className='flex' style={{maxWidth: 250}} >
                            <Text style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: 75}}  key={'reportsTableBodyErrorsCell' + key } size={14}>{report.errorDetails}</Text>
                            <IconStyle className='pointer px1' onClick={() => updateClipboard(report.errorDetails, `Error Copied`)}>file_copy_outlined</IconStyle>
                        </div>
                    ]
                }
            })
        }
    }

    const renderUsersList = () => {
        return (
            <div className='flex flex-column'>
                <div className='flex col col-12'>
                    <Text weight='med' className='col col-4'>User Id</Text>
                    <Text weight='med' className='col col-4'>Status</Text>
                </div>
                <InputCheckbox 
                    className='col col-12'
                    defaultChecked={selectedUsers.length === props.jobDetails.import.reports.length} 
                    indeterminate={selectedUsers.length >= 1 && selectedUsers.length < props.jobDetails.import.reports.length}
                    id='selectAllCheckbox' 
                    label='Select All' 
                    onChange={(event) => {
                        if (event.currentTarget.checked) {
                            setSelectedUsers(props.jobDetails.import.reports.map(report => report.userId))
                        } else if (event.currentTarget.indeterminate || !event.currentTarget.checked) {
                            setSelectedUsers([])
                        }
                    }} 
                />
                {
                    props.jobDetails.import.reports.map((report) => {
                        return (
                            <div className='flex col col-12' key={'userSection' + report.userId} >
                                <InputCheckbox 
                                    id={'userCheckbox' + report.userId} 
                                    className='col col-4'
                                    label={report.userId}
                                    defaultChecked={selectedUsers.indexOf(report.userId) !== -1}
                                    onChange={(event) => {
                                        if (event.currentTarget.checked && selectedUsers.length < props.jobDetails.import.reports.length) {
                                            setSelectedUsers([...selectedUsers, report.userId])
                                        } else {
                                            setSelectedUsers(selectedUsers.filter(item => item !== report.userId));
                                        }
                                    }}
                                />
                                <IconStyle className='col col-4' key={'reportsTableBodySuccessCell' } coloricon={report.success ? 'green' : 'red'}>{report.success ? 'check' : 'clear'}</IconStyle>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div style={{backgroundColor: '#DDE3ED', borderRadius: '4px'}} className='flex mx-auto flex-column col col-12 pl2'>
            <div className='flex'>
                <Text className='col col-4 py1' weight='med'>Step</Text>
                <Text className='col col-4 py1' weight='med'>Status</Text>
                <Text className='col col-4 py1' weight='med'>Action</Text>
            </div>
            <div>
                {
                    Object.keys(props.jobDetails).map((item: JobDetailsKey) => {
                        return (
                            <div key={item} className='flex'>
                                <Text className='col col-4 py1'>{props.jobDetails[item].label}</Text>
                                <Text className='col col-4 py1'>{props.jobDetails[item].status}</Text>
                                <div className='mr2 col col-1 py1 flex justify-start' >
                                    <Button disabled={props.jobDetails[item].errorDetails ? false : true} onClick={() => handleErrorButtonClick(props.jobDetails[item].errorDetails)} buttonColor='red' sizeButton='xs' typeButton='primary'>Error</Button>
                                </div>
                                {
                                    props.jobDetails[item].reports && 
                                    <div className='mr2 my1' >
                                        <Button onClick={() => handleReportsModalClick(props.jobDetails[item].reports)} buttonColor='gray' sizeButton='xs' typeButton='secondary'>Reports</Button>
                                    </div>
                                }
                            </div>
                            
                        )
                    })
                }
                {
                    props.jobDetails.switchover.status === 'SUCCESSFULLY_FINISHED' &&
                    <Button className='right mr2 mb2' onClick={() => setSwitchModalOpened(true)} typeButton='primary' buttonColor='blue' sizeButton='xs'>Switch users</Button>
                }
            </div>
            {
                errorModalOpened && 
                <Modal size='small' hasClose toggle={() => setErrorModalOpened(!errorModalOpened)} opened={errorModalOpened} modalTitle='Error Details' >
                    <Text>{errorDetails}</Text>
                </Modal>
            }
            {
                reportsModalOpened && 
                <Modal size='small' hasClose toggle={() => setReportsModalOpened(!reportsModalOpened)} opened={reportsModalOpened} modalTitle='Reports' >
                    <Table id='reportsTable' headerBackgroundColor='white' header={reportsTableHeader()} body={reportsTableBody()}  />
                </Modal>
            }
            {
                switchModalOpened && 
                <Modal size='small' toggle={() => setSwitchModalOpened(!switchModalOpened)} opened={switchModalOpened} modalTitle='Switch Users' >
                    <div className='flex flex-column'>
                        <Text weight='med'>List of users to switch</Text>
                        {renderUsersList()}
                        <div className='mt2'>
                            <Button className='mr2' disabled={selectedUsers.length === 0} isLoading={buttonLoading} onClick={() => handleSwitchButtonClick()} buttonColor='blue' typeButton='primary' sizeButton='small'>Switch</Button>
                            <Button onClick={() => setSwitchModalOpened(false)} buttonColor='blue' typeButton='tertiary' sizeButton='small'>Cancel</Button>
                        </div>
                    </div>
                </Modal>
            }
        </div>
    )
}