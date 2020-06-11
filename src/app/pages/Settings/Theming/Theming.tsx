import React from 'react';
import { TextStyle } from '../../../shared/Theming/ThemingStyle'
import { Card } from '../../../../components/Card/Card';
import { Text } from '../../../../components/Typography/Text';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Table } from '../../../../components/Table/Table';
import { IconStyle, IconContainer, ActionIcon } from '../../../../shared/Common/Icon';
import { ThemingComponentProps} from '../../../containers/Settings/Theming';
import { ThemeOptions, defaultTheme } from '../../../redux-flow/store/Settings/Theming';
import { usePlayer } from '../../../utils/player';
import { tsToLocaleDate } from '../../../../utils/utils';
import { DateTime } from 'luxon';
import { ThemingControlsCard } from '../../../shared/Theming/ThemingControlsCard';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';

export const ThemingPage = (props: ThemingComponentProps) => {

    const [currentPage, setCurrentPage] = React.useState<'list' | 'options'>('list');
    const [selectedTheme, setSelectedTheme] = React.useState<ThemeOptions>(null);

    React.useEffect(() => {
        setCurrentPage('list')
    }, [props.themingList.themes.length])

    const ThemingOptions = () => {
        return (
            <ThemingControlsCard
                theme={{themes: [selectedTheme], id: null}} 
                saveTheme={props.saveTheme}
                createTheme={props.createTheme}
                cancelFunction={() => {setCurrentPage('list');setSelectedTheme(null)}}
                contentType='settings'
                actionType={selectedTheme.id === '-1'? 'Create' : 'Save'}
            />
        )
    }

    const ThemingList = () => {
        const themingTableHeader = () => {
            return {data: [
                {cell: <Text key='ThemingTableHeaderName' size={14} weight='med'>Name</Text>},
                {cell: <Text key='ThemingTableHeaderDefault' size={14} weight='med'>Default</Text>},
                {cell: <Text key='ThemingTableHeaderCreated' size={14} weight='med'>Created Date</Text>},
                {cell: <Button className='right sm-show mr2' onClick={() => {setSelectedTheme(defaultTheme);setCurrentPage('options')}} sizeButton='xs' typeButton='secondary' buttonColor='blue'>New Theme</Button>}
            ]}
        }

        const themingTableBody = () => {
            return props.themingList.themes.map((theme, key) => {
                return ( key === 0 ?
                    {data: [
                        <Text key={'ThemingTableBodyNameCell' + key.toString()} size={14} weight='reg'>{theme.themeName}</Text>,
                        theme.isDefault ? <IconStyle coloricon='green' key={'ThemingTableBodyDefaultCell' + key.toString()}>checked</IconStyle> : <></>,
                        <Text key={'ThemingTableBodyCreatedCell' + key.toString()} size={14} weight='reg'>{tsToLocaleDate(theme.createdDate, DateTime.DATETIME_SHORT)}</Text>,
                        <IconContainer className="iconAction" key={'ThemingTableBodyButtonsCell' + key.toString()}>
                            <ActionIcon>
                                <IconStyle id={"copyTooltip" + key} onClick={(event) => { event.preventDefault();props.createTheme({...theme, themeName: theme.themeName + ' copy'})}} >filter_none_outlined</IconStyle>
                                <Tooltip target={"copyTooltip" + key}>Copy</Tooltip>
                            </ActionIcon>
                            
                        </IconContainer>
    
                    ]}
                    :            
                    {data: [
                        <Text key={'ThemingTableBodyNameCell' + key.toString()} size={14} weight='reg'>{theme.themeName}</Text>,
                        theme.isDefault ? <IconStyle coloricon='green' key={'ThemingTableBodyDefaultCell' + key.toString()}>checked</IconStyle> : <></>,
                        <Text key={'ThemingTableBodyCreatedCell' + key.toString()} size={14} weight='reg'>{tsToLocaleDate(theme.createdDate, DateTime.DATETIME_SHORT)}</Text>,
                        <IconContainer className="iconAction" key={'ThemingTableBodyButtonsCell' + key.toString()}>
                            <ActionIcon>
                                <IconStyle id={"copyTooltip" + key} onClick={(event) => { event.preventDefault();props.createTheme({...theme, themeName: theme.themeName + ' copy'})}} >filter_none_outlined</IconStyle>
                                <Tooltip target={"copyTooltip" + key}>Copy</Tooltip>
                            </ActionIcon>
                            <ActionIcon>
                                <IconStyle id={"deleteTooltip" + key} onClick={(event) => { event.preventDefault();props.deleteTheme(theme)}} >delete</IconStyle>
                                <Tooltip target={"deleteTooltip" + key}>Delete</Tooltip>
                            </ActionIcon>
                            <ActionIcon>
                                <IconStyle id={"editTooltip" + key} onClick={(event) => { event.preventDefault(); setSelectedTheme(props.themingList.themes.filter((item) => {return item.id === theme.id })[0]); setCurrentPage('options') }}>edit</IconStyle>
                                <Tooltip target={"editTooltip" + key}>Edit</Tooltip>
                            </ActionIcon>                      
                        </IconContainer>

                    ]}
                )})
        }

        return (
            <Card>
                <Text className='py2' size={20} weight='med'>Themes</Text>
                <TextStyle className='py2'><Text size={14} weight='reg'>Some information about Theming</Text></TextStyle>
                <div className='my2 flex'>
                    <IconStyle className="mr1">info_outlined</IconStyle> 
                    <Text size={14} weight='reg'>Need help creating a Theme? Visit the <a>Knowledge Base</a></Text>
                </div>
                <Button className='xs-show col col-12' onClick={() => {setSelectedTheme(defaultTheme);setCurrentPage('options')}} sizeButton='xs' typeButton='secondary' buttonColor='blue'>New Theme</Button>
                <Table id='themesListTable' headerBackgroundColor="gray-10" header={themingTableHeader()} body={themingTableBody()} />
            </Card>
        )
    }

    return (
        <div>
            {   
                currentPage === 'list' ?
                    ThemingList()
                    : ThemingOptions()
            }
        </div>
    )
}