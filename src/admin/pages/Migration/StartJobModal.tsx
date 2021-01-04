import React from 'react'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle'
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { InputRadio } from '../../../components/FormsComponents/Input/InputRadio'
import { Modal } from '../../../components/Modal/Modal'
import { Text } from '../../../components/Typography/Text'
import { IconStyle } from '../../../shared/Common/Icon'

interface StartJobModalProps {
    opened: boolean
    toggle: React.Dispatch<React.SetStateAction<boolean>>
    startJob: (platform: 'Dacast' | 'Vzaar', usersList: string[]) => Promise<void>
}

export const StartJobModal = (props: StartJobModalProps) => {

    const [selectedPlatform, setSelectedPlatform] = React.useState<'Vzaar' | 'Dacast'>('Dacast')
    const [selectedOption, setSelectedOption] = React.useState<'copy' | 'csv'>('copy')
    const [csvFile, setCsvFile] = React.useState<File>(null);
    const [usersList, setUsersList] = React.useState<string[]>([])
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    let inputBrowseButtonRef = React.useRef<HTMLInputElement>(null)

    const handleDrop = (file: FileList) => {
        if(file.length > 0) {
            const reader = new FileReader();
            console.log('file reader', reader)
            reader.onload = (e) => {
                let contents = e.target.result;
                formatCsvData(contents);
            }
            reader.readAsText(file[0])
        }
    }

    const formatCsvData = (contents: any) => {

        let formattedContent: string = contents.replace(/"/g,"")
        let users: string[] = []
        if(contents.indexOf(',') !== -1) {
            users = formattedContent.split(',');

        } else {
            console.log('processing csv input:', formattedContent)
            users = formattedContent.replace(/\r/g,"").split("\n");
            console.log('users list: ', users)
        }
        users.shift()
        console.log('testing parsed users list: ', users.filter(n => n))
        setUsersList(users.filter(n => n))
    }
    
    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.files && e.target.files.length > 0) {
            handleDrop(e.target.files);
        }
    }

    const handleStartButtonClick = () => {
        setButtonLoading(true)
        props.startJob(selectedPlatform, usersList)
        .then(() => {
            console.log('reaching success')
            setButtonLoading(false)
            props.toggle(false)
        }).catch(() => setButtonLoading(false))
    }

    return (
        <Modal modalTitle='Start Migration Job' toggle={() => props.toggle(!props.opened)} opened={props.opened} >
            <div className='flex flex-column col col-12'>
                <DropdownSingle 
                    id='plaformDropdown'
                    className='my1 col col-4'
                    dropdownTitle='Platform'
                    dropdownDefaultSelect={selectedPlatform}
                    list={[{title: 'Dacast'}, {title: 'Vzaar'}]}
                    callback={(value: DropdownSingleListItem) => setSelectedPlatform(value.title as 'Dacast' | 'Vzaar')}
                />
                <Text className='py1' size={20}>Users List</Text>
                <div className='flex my1'>
                    <InputRadio defaultChecked={selectedOption === 'copy'} onChange={() => setSelectedOption('copy')} className="col col-6" value="copy" name="usersList" label="Copy Paste" />
                    <InputRadio defaultChecked={selectedOption === 'csv'} onChange={() => setSelectedOption('csv')} className="col col-6" value="csv" name="usersList" label="Upload CSV" />
                </div>
                { selectedOption === 'copy' && 
                    <div>
                        <Input 
                            id='copyPasteInput' 
                            label='Paste users here' 
                            indicationLabel="Users must be separated by a ','"                                type='textarea' 
                            onChange={(event) => setUsersList(event.currentTarget.value.split(','))}
                        />
                    </div>
                }
                { selectedOption === 'csv' && 
                    <div className="col col-12 flex-flex-column">
                        <input type='file' ref={inputBrowseButtonRef} className="pointer" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{display:'none'}} id='browseButton' accept='.csv' />
                        <Text className="py1 col col-12" size={14} weight="reg">Upload a file for your start a job</Text>
                        <Text className="py1 col col-12" size={14} weight="reg">The file must have one column with one user per row and a header (e.g. User ID)</Text>
                        <Button onClick={() => {inputBrowseButtonRef.current.click()} } className="mt2" sizeButton="xs" typeButton="secondary">
                            Upload File
                        </Button>
                        <Text className="col col-12 mt1" size={10} weight="reg" color="gray-5">Max file size is 5MB</Text>
                        { csvFile &&
                            <button style={{border: "none", backgroundColor:"inherit"}}>
                                <IconStyle onClick={() => setCsvFile(null)} customsize={14}>close</IconStyle>
                            </button>   
                        }
                    </div>
                }
                <div className='mt2'>
                    <Button className='mr2' disabled={usersList.length === 0} isLoading={buttonLoading} onClick={() => handleStartButtonClick()} buttonColor='blue' typeButton='primary' sizeButton='small'>Start</Button>
                    <Button onClick={() => props.toggle(false)} buttonColor='blue' typeButton='tertiary' sizeButton='small'>Cancel</Button>
                </div>
            </div>
        </Modal>
    )
}