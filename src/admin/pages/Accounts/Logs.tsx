import React from 'react' 
import { Table } from '../../../components/Table/Table'
import { Tab } from '../../../components/Tab/Tab'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { Text } from '../../../components/Typography/Text'
import { AccountLogsComponentProps } from '../../containers/Accounts/Logs'
import { Pagination } from '../../../components/Pagination/Pagination'
import { useHistory } from 'react-router'
import { makeRoute } from '../../utils/utils'

export const AccountLogsPage = (props: AccountLogsComponentProps) => {

    let history = useHistory()

    const accountLogsTableHeader = () => {
        return {
            data: [
                {cell: <Text key='accountLogsTableHeaderDateCell' size={14} weight='med'>Date</Text>},
                {cell: <Text key='accountLogsTableHeaderEmailCell' size={14} weight='med'>Email</Text>},
                {cell: <Text key='accountLogsTableHeaderSourceCell' size={14} weight='med'>Source</Text>},
                {cell: <Text key='accountLogsTableHeaderEventCell' size={14} weight='med'>Event</Text>}
            ]
        }      
    }

    const accountLogsTableBody = () => {
        if(props.accountLogs) {
            return props.accountLogs.map((log, key) => {
                return {
                    data: [
                        <Text key={'accountLogsTableBodyDateCell' + key } size={14}>{log.date}</Text>,
                        <Text key={'accountLogsTableBodyEmailCell' + key } size={14}>{log.email}</Text>,
                        <Text key={'accountLogsTableBodySourceCell' + key } size={14}>{log.source}</Text>,
                        <Text key={'accountLogsTableBodyEventCell' + key } size={14}>{log.event}</Text>,

                    ]
                }
            })
        }

    }

    return (
        <div>
            <div className='flex'>
                <Button className='mr2' onClick={() => {history.push('/accounts')}} typeButton='secondary' sizeButton='small' buttonColor='gray'>Back</Button>
                <Tab list={[makeRoute('All'), makeRoute('Staff'), makeRoute('Customer')]} orientation='horizontal' callback={() => {}} />
            </div>

            <Table className='my2' id='accountLogsTable' headerBackgroundColor='white' header={accountLogsTableHeader()} body={accountLogsTableBody()} />
            <Pagination totalResults={290} displayedItemsOptions={[10, 20, 100]} callback={() => {}} />
        </div>
    )
}