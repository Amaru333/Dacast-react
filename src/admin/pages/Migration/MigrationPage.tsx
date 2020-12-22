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

export const MigrationPage = (props: MigrationComponentProps) => {

    const [selectedJob, setSelectedJob] = React.useState<string>(null)
    const [startJobModalOpened, setStartJobModalOpened] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getJobsList()
    }, [])

    const handleArrowClick = (jobId: string) => {
        if(jobId !== selectedJob) {
            props.getJobDetails(jobId)
            .then(() => setSelectedJob(jobId))
        } else {
            setSelectedJob(null)
        }

    }

    const jobsTableHeader = () => {
        return {data: [
            {cell: <Text key='jobsTableHeaderJobIdCell' size={14} weight='med'>Job Id</Text>},
            {cell: <Text key='jobsTableHeaderPlatformCell' size={14} weight='med'>Platform</Text>},
            {cell: <Text key='jobsTableHeaderCurrentStepCell' size={14} weight='med'>Current Step</Text>},
            {cell: <Text key='jobsTableHeaderNbUsersCell' size={14} weight='med'>Nb Users</Text>},
            {cell: <Text key='jobsTableHeaderErrorStatusCell' size={14} weight='med'>Error Status</Text>},
            {cell: <Text key='jobsTableHeaderLastUpdateCell' size={14} weight='med'>Las Update</Text>},
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
                            <IconStyle onClick={() => handleArrowClick(job.id)}>{selectedJob === job.id ? 'keyboard_arrow_down' : 'keyboard_arrow_right' }</IconStyle>
                            <Text key={'jobsTableBodyJobIdCell' + key } size={14}>{job.id}</Text>
                        </div>,
                        <Text key={'jobsTableBodyPlaformCell' + key } size={14}>{job.platform}</Text>,
                        <Text key={'jobsTableBodyCurrenStepCell' + key } size={14}>{job.currentStep}</Text>,
                        <Text key={'jobsTableBodyNbUsersCell' + key } size={14}>{job.userIds.length}</Text>,
                        <Text key={'jobsTableBodyErrorStatusCell' + key } size={14}>{job.errorDetails}</Text>,
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

    return props.migrationData ?
        <div className='flex flex-column'>
            <h1>Migration</h1>
            <div>
                <Button className='right' onClick={() => setStartJobModalOpened(true)} buttonColor='blue' sizeButton='small' typeButton='primary'>Start Job</Button>
            </div>
            <Table id='jobsTable' headerBackgroundColor='white' header={jobsTableHeader()} body={jobsTableBody()} />
            {
                startJobModalOpened && 
                <StartJobModal startJob={props.startJob} toggle={setStartJobModalOpened} opened={startJobModalOpened} />
            }
        </div>
        : <SpinnerContainer><LoadingSpinner size='medium' color='violet'></LoadingSpinner></SpinnerContainer>
}