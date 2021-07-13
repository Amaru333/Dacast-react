import React from 'react'
import { Table } from '../../../components/Table/Table'
import { MigrationComponentProps } from '../../containers/Migration/Migration'
import { Text } from '../../../components/Typography/Text'
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle'
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { JobDetailsPannel } from './JobDetailsPannel'
import { IconStyle } from '../../../shared/Common/Icon'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { StartJobModal } from './StartJobModal'
import { Tab } from '../../../components/Tab/Tab'
import { makeRoute } from '../../utils/utils'
import { FilteringMigrationState, MigrationFiltering } from './MigrationFilters'
import { Modal } from '../../../components/Modal/Modal'
import { Tooltip } from '../../../components/Tooltip/Tooltip'
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox'

export const MigrationPage = (props: MigrationComponentProps) => {

    var filteringDefault: FilteringMigrationState = {
        status: {
            "Export In Progress": false,
            "Error Exporting": false,
            "Done Exporting": false,
            "Import In Progress": false,
            "Error Importing": false,
            "Migrated But Not Switched": false,
            "Migrated And Switched": false,
            "Error Switching": false,
        },
        platform: 'uapp',
        userIds: null
    }

    const [selectedJob, setSelectedJob] = React.useState<string>(null)
    const [startJobModalOpened, setStartJobModalOpened] = React.useState<boolean>(false)
    const [selectedTab, setSelectedTab] = React.useState<'Jobs' | 'Users'>('Jobs')
    const [userTableFilters, setUserTableFilters] = React.useState<FilteringMigrationState>(filteringDefault)
    const [tablePagination, setTablePagination] = React.useState<{[key: number]: string}>({0: null})
    const [currentPage, setCurrentPage] = React.useState<number>(0)
    const [selectedUserIds, setSelectedUserIds] = React.useState<string[]>([])
    const [usersModalOpened, setUsersModalOpened] = React.useState<boolean>(false)
    const [pendingOnly, setPendingOnly] = React.useState<boolean>(false)

    React.useEffect(() => {
        if(selectedTab === 'Jobs') {
            props.getJobsList(pendingOnly)
        } else {
            props.getMigratedUsersList(null)
        }
    }, [selectedTab, pendingOnly])

    const handleArrowClick = (jobId: string) => {
        if(jobId !== selectedJob) {
            props.getJobDetails(jobId)
            .then(() => setSelectedJob(jobId))
        } else {
            setSelectedJob(null)
        }

    }

    React.useEffect(() => {
        if(selectedTab === 'Users') {
            props.getMigratedUsersList({...userTableFilters, next: null})
        }
    }, [userTableFilters])

    const jobsTableHeader = () => {
        return {data: [
            {cell: <Text key='jobsTableHeaderJobIdCell' size={14} weight='med'>Job Id</Text>},
            {cell: <Text key='jobsTableHeaderPlatformCell' size={14} weight='med'>Platform</Text>},
            {cell: <Text key='jobsTableHeaderCurrentStepCell' size={14} weight='med'>Current Step</Text>},
            {cell: <Text key='jobsTableHeaderNbUsersCell' size={14} weight='med'>Nb Users</Text>},
            {cell: <div className='relative flex items-center'>
                <Text id='jobsTableHeaderErrorStatusCell' key='jobsTableHeaderErrorStatusCell' size={14} weight='med'>Job Status</Text>
                <IconStyle fontSize="small" id='jobStatusIcon' coloricon='gray-3'>info_outlined</IconStyle>
                <Tooltip style={{width: 300, top: 20}} target='jobStatusIcon'>This status is for the job itself. For more information, click on the arrow to get the job details.</Tooltip>
                </div>},
            {cell: <Text key='jobsTableHeaderLastUpdateCell' size={14} weight='med'>Last Update</Text>},
        ]}
    }

    const jobsTableBody = () => {
        if(props.migrationData && props.migrationData.jobsList) {
            let subPanelIndex = 0
            let returnedData =  props.migrationData.jobsList.map((job, key) => {
                if(job.id === selectedJob) {
                    subPanelIndex = key + 1
                }
                return {
                    data: [
                        <div className='flex'>
                            <IconStyle className='pointer' onClick={() => handleArrowClick(job.id)}>{selectedJob === job.id ? 'keyboard_arrow_down' : 'keyboard_arrow_right' }</IconStyle>
                            <Text key={'jobsTableBodyJobIdCell' + key } size={14}>{job.id}</Text>
                        </div>,
                        <Text key={'jobsTableBodyPlaformCell' + key } size={14}>{job.platform}</Text>,
                        <Text key={'jobsTableBodyCurrenStepCell' + key } size={14}>{job.currentStep === 'Errored out' ? 'Failed' : job.currentStep}</Text>,
                        <Text onClick={() => {setSelectedUserIds(job.userIds);setUsersModalOpened(true)}} className='pointer' key={'jobsTableBodyNbUsersCell' + key } size={14}>{job.userIds.length}</Text>,
                        <IconStyle key={'jobsTableBodyErrorDetailsCell' + key } coloricon={!job.errorDetails && job.currentStep !== 'Errored out' ? 'green' : 'red'}>{!job.errorDetails && job.currentStep !== 'Errored out' ? 'check' : 'clear'}</IconStyle>,
                        <Text key={'jobsTableBodyLastUpdateCell' + key } size={14} >{job.lastUpdateDate}</Text>,
                    ]
                }
            })

            let subPanelRow = {data: [
                <JobDetailsPannel jobId={selectedJob} key='subRow' jobDetails={props.migrationData.jobDetails} switchUsers={props.switchUsers} />
                
            ], isSubRow: true}

            if(selectedJob) {
                returnedData.splice(subPanelIndex, 0, subPanelRow)
            }
            return returnedData
        }
    } 

    const migratedUsersTableHeader = () => {
        return {data: [
            {cell: <Text key='migratedUsersTableHeaderLecadyUserIdCell' size={14} weight='med'>Legacy User Id</Text>},
            {cell: <Text key='migratedUsersTableHeaderPlatformCell' size={14} weight='med'>Platform</Text>},
            {cell: <Text key='migratedUsersTableHeaderStatusCell' size={14} weight='med'>Status</Text>},
            {cell: <Text key='migratedUsersTableHeaderUappUserIdCell' size={14} weight='med'>Uapp User Id</Text>},
            {cell: <Text key='migratedUsersTableHeaderSalesforceIdCell' size={14} weight='med'>BID</Text>},
            {cell: <Text key='migratedUsersTableHeaderLastUpdateCell' size={14} weight='med'>Last Update</Text>},
        ]}
    }

    const migratedUsersTableBody = () => {
        if(props.migrationData && props.migrationData.usersList) {
            return props.migrationData.usersList.users.map((job, key) => {
                return {
                    data: [
                        <Text key={'migratedUsersTableBodyLegacyUserIdCell' + key } size={14}>{job.legacyUserId}</Text>,
                        <Text key={'migratedUsersTableBodyPlaformCell' + key } size={14}>{job.platform}</Text>,
                        <Text key={'migratedUsersTableBodyStatusCell' + key } size={14}>{job.migrationStatus}</Text>,
                        <Text key={'migratedUsersTableBodyUappUserIdCell' + key } size={14}>{job.uappUserId}</Text>,
                        <Text key={'migratedUsersTableBodySalesforceIdCell' + key } size={14}>{job.salesforceId}</Text>,
                        <Text key={'migratedUsersTableBodyLastUpdateCell' + key } size={14} >{job.lastUpdateDate}</Text>,
                    ]
                }
            })
        }
    }

    React.useEffect(() => {
        if(props.migrationData && props.migrationData.usersList && !Object.keys(tablePagination).find(k => k === (currentPage + 1).toString()) ) {
            setTablePagination({...tablePagination, [currentPage + 1]: props.migrationData.usersList.next})
        }
    }, [props.migrationData])

    const handlePageChange = (pageToGo: number) => {
        props.getMigratedUsersList({...userTableFilters, next: tablePagination[pageToGo]})
        .then(() => {
            if(props.migrationData && Object.keys(tablePagination).find(k => k === (pageToGo + 1).toString()) ) {
                setTablePagination({...tablePagination, [pageToGo + 1]: props.migrationData.usersList.next})
            }
            setCurrentPage(pageToGo)
        })
    }

    return props.migrationData ?
        <div className='flex flex-column'>
            <h1>Migration</h1>
            <div className='flex items-end'>
                <Tab  orientation='horizontal' list={[makeRoute('Jobs'), makeRoute('Users')]} callback={(value: 'Jobs' | 'Users') => setSelectedTab(value)} />
            </div>
            {
                selectedTab === 'Jobs' &&
                <React.Fragment>
                    <div className='flex items-center'>
                        <InputCheckbox label='Pending Only' className='flex-auto py1' id='pendingOnlyCheckbox' defaultChecked={pendingOnly} onChange={() => { setSelectedJob(null); setPendingOnly(!pendingOnly) } } />
                        <Button className='py1 right' onClick={() => setStartJobModalOpened(true)} buttonColor='blue' sizeButton='small' typeButton='primary'>Start Job</Button>
                    </div>
                    <Table id='jobsTable' headerBackgroundColor='white' header={jobsTableHeader()} body={jobsTableBody()} />
                    {
                        startJobModalOpened && 
                        <StartJobModal startJob={props.startJob} toggle={setStartJobModalOpened} opened={startJobModalOpened} />
                    }
                    {
                        usersModalOpened && 
                        <Modal size='small' modalTitle='Users List' toggle={() => {setUsersModalOpened(false);setSelectedUserIds([])}} opened={usersModalOpened} >
                            <div className='flex flex-column col col-12'>
                            {
                                selectedUserIds.map(user => {
                                    return (
                                        <Text key={user} size={14} weight='med'>{user}</Text>
                                    )
                                })
                            }
                            </div>
                    </Modal>
                    }
                </React.Fragment>
            }

            {
                selectedTab === 'Users' && 
                <React.Fragment>
                    <MigrationFiltering defaultFilters={userTableFilters} setSelectedFilter={setUserTableFilters} />
                    <Table id='migratedUsersTable' headerBackgroundColor='white' header={migratedUsersTableHeader()} body={migratedUsersTableBody()} />
                    <div>
                        {
                            currentPage > 0 &&
                            <Button onClick={() => handlePageChange(currentPage - 1)} buttonColor='gray' sizeButton='xs' typeButton='secondary'>Prev</Button>
                            
                        }
                        <Text>{currentPage}</Text>
                        <Button onClick={() => handlePageChange(currentPage + 1)} buttonColor='gray' sizeButton='xs' typeButton='secondary'>Next</Button>
                    </div>
                </React.Fragment>
            }

        </div>
        : <SpinnerContainer><LoadingSpinner size='medium' color='violet'></LoadingSpinner></SpinnerContainer>
}