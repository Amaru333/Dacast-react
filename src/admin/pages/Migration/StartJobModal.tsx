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
        const users: string[] = contents.replace(/"/g,"").split(',');
        users.shift()
        users.pop()
        setUsersList(users)
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
            setButtonLoading(false)
            props.toggle(false)
        })
        .catch(() => setButtonLoading(false))
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
                <Text size={20}>Users List</Text>
                <div className='flex'>
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
                    <div className="col col-12">
                        <input type='file' ref={inputBrowseButtonRef} className="pointer" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{display:'none'}} id='browseButton' accept='.csv' />
                        <Text className="col col-12" size={14} weight="reg">{"Upload a file for your start a job"}</Text>
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