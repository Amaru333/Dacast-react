import React from 'react'
import { Table } from '../../../components/Table/Table'
import { MigrationComponentProps } from '../../containers/Migration/Migration'
import { Text } from '../../../components/Typography/Text'
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle'
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'

export const MigrationPage = (props: MigrationComponentProps) => {

    React.useEffect(() => {
        props.getJobsList()
    }, [])

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
            return props.migrationData.jobsList.map((job, key) => {
                return {data: [
                    <Text key={'jobsTableBodyJobIdCell' + key } size={14}>{job.id}</Text>,
                    <Text key={'jobsTableBodyPlaformCell' + key } size={14}>{job.platform}</Text>,
                    <Text key={'jobsTableBodyCurrenStepCell' + key } size={14}>{job.currentStep}</Text>,
                    <Text key={'jobsTableBodyNbUsersCell' + key } size={14}>{job.userIds.length}</Text>,
                    <Text key={'jobsTableBodyErrorStatusCell' + key } size={14}>{job.errorDetails}</Text>,
                    <Text key={'jobsTableBodyLastUpdateCell' + key } size={14} >{job.lastUpdateDate}</Text>,
                ]}
            })
        }
    } 

    return props.migrationData ?
        <div>
            <h1>Migration</h1>
            <Table id='jobsTable' headerBackgroundColor='white' header={jobsTableHeader()} body={jobsTableBody()} />
        </div>
        : <SpinnerContainer><LoadingSpinner size='medium' color='violet'></LoadingSpinner></SpinnerContainer>
}