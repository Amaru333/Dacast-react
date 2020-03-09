import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { Table } from '../../../components/Table/Table'

export const AccountsPage = () => {

    const accountsTableHeader = () => {
        return {data: [
        {cell: <Text key='accountsTableHeaderAccountCell' size={14} weight='med'>Account</Text>},
        {cell:<Text key='accountsTableHeaderCompanyCell' size={14} weight='med'>Company</Text>},
        {cell: <Text key='accountsTableHeaderNameCell' size={14} weight='med'>Name</Text>},
        {cell:<Text key='accountsTableHeaderPhoneCell' size={14} weight='med'>Phone</Text>},
        {cell:<Text key='accountsTableHeaderEmailCell' size={14} weight='med'>Email</Text>},
        {cell:<Text key='accountsTableHeaderPlanCell' size={14} weight='med'>Plan</Text>},
        {cell:<Text key='accountsTableHeader12MonthsCell' size={14} weight='med'>12 Months</Text>},
        {cell:<Text key='accountsTableHeaderRegiteredCell' size={14} weight='med'>Registered</Text>},
        {cell:<Text key='accountsTableHeaderDataCell' size={14} weight='med'>Data</Text>},
        {cell:<Text key='accountsTableHeaderStorageCell' size={14} weight='med'>Storage</Text>},
        {cell: <Text key='accountsTableHeaderEncodingCell' size={14} weight='med'>Encoding</Text>},
        {cell:<Text key='accountsTableHeaderFlagsCell' size={14} weight='med'>Flags</Text>},
        {cell:<Text key='accountsTableHeaderEditCell' size={14} weight='med'>Edit</Text>},
        {cell:<Text key='accountsTableHeaderLogCell' size={14} weight='med'>Log</Text>},
        {cell:<Text key='accountsTableHeaderAllowancesCell' size={14} weight='med'>Allowances</Text>},

        ]}
    }

    return (
        <div>
            <Table id='accountsTable' headerBackgroundColor='gray-10' header={accountsTableHeader()} />
        </div>
    )
}