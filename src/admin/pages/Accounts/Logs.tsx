import React from 'react' 
import { Table } from '../../../components/Table/Table'
import { Tab } from '../../../components/Tab/Tab'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { Text } from '../../../components/Typography/Text'

export interface Routes {
    path: string;
    name: string;
    iconName?: string;
    arrowIcon?: string;
    component?: any;
    slug?: Routes[];
    exactPath?: boolean;
}


export const AccountLogsPage = () => {

    const makeRoute = (name: string): Routes => {
        return {
            path: null,
            name: name
        }
    }

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

    return (
        <div>
            <div className='flex'>
                <Button typeButton='secondary' sizeButton='small' buttonColor='gray'>Back</Button>
                <Tab list={[makeRoute('All'), makeRoute('Staff'), makeRoute('Customer')]} orientation='horizontal' callback={() => {}} />
            </div>

            <Table className='my2' id='accountLogsTable' headerBackgroundColor='white' header={accountLogsTableHeader()} />
        </div>
    )
}