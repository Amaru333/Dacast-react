import React from 'react';
import { DragAndDrop } from '../../../../components/DragAndDrop/DragAndDrop';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import styled from 'styled-components';
import { Text } from '../../../../components/Typography/Text';
import Icon from '@material-ui/core/Icon';
import { UploaderItemProps, UploaderItem } from './UploaderItem';
import { UploadObject } from '../../../utils/uploaderService';
import { Prompt } from 'react-router'
import { UploaderProps } from '../../../containers/Videos/Uploader';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';


export const UploaderPage = (props: UploaderProps) => {

    const FILE_CHUNK_SIZE = 10000000 // 10MB
    const MAX_REQUEST_PER_BATCH = 100
    const NB_CONCURRENT_REQUESTS = 5


    const [uploadingList, setUploadingList] = React.useState<UploaderItemProps[]>([]);
    const [itemsPaused, setItemsPaused] = React.useState<boolean>(false)
    const [File, setFile] = React.useState<File>(null)
    const [currentUpload, setCurrentUpload] = React.useState<UploadObject>(null)
    const [uploadFileQueue, setUploadFileQueue] = React.useState<UploadObject[]>([])

    React.useEffect(() => {
        console.log('upload file queue', uploadFileQueue)
    }, [uploadFileQueue])

    React.useEffect(() => {
       uploadNextFile()
        
    }, [currentUpload && currentUpload.isCompleted])

    const updateItem = (percent: number, name: string, startTime: number) => {    
        setUploadingList((currentList: UploaderItemProps[]) => {
            const index = currentList.findIndex(element => element.name === name);
            //Calcul ETA
            var now = (new Date()).getTime();
            var elapsedtime = now - startTime;
            elapsedtime = elapsedtime / 1000;
            var uploadSpeed = percent / elapsedtime
            var eta = (100 - percent) / uploadSpeed;
            if(eta > 120) {
                eta = Math.round(eta / 60);
                var etaUnit = 'minutes'
            } else {
                eta = Math.round(eta);
                var etaUnit= ' seconds';
            }      
            return Object.assign([...currentList], {
                [index]:
                {
                    ...currentList[index],
                    currentState: percent === 100 ? "completed" : currentList[index].currentState,
                    progress: percent,
                    timeRemaining: {num: eta, unit: etaUnit}
                }
            })
        });
    }

    const handleDrop = (fileList: FileList) => {
        const acceptedVideoTypes = ['video/mp4', 'video/mov'];
        for (var i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            if (fileList.length > 0 ) {
                var startTime = (new Date()).getTime();
                setFile(file)
                let newUpload = new UploadObject(
                    file, 
                    MAX_REQUEST_PER_BATCH, 
                    NB_CONCURRENT_REQUESTS, 
                    FILE_CHUNK_SIZE, 
                    (percent: number) => {updateItem(percent, file.name, startTime)}, 
                    (err: any) => {
                        console.log(err)
                        if(err === 'Cancel') {
                            setUploadingList((currentList: UploaderItemProps[]) => {
                                const updatedList = currentList.map((value, key) => { if (value.name === file.name) {value.currentState = "paused"; value.timeRemaining.num = 0} return value })
                                return updatedList;
                            })
                        } else {
                            setUploadingList((currentList: UploaderItemProps[]) => {
                                const updatedList = currentList.map((value, key) => { if (value.name === file.name) { value.currentState = "failed"; value.progress = 100; value.timeRemaining.num = 0; } return value })
                                return updatedList;
                            })
                        }
                    }
                )
                
                setUploadFileQueue(uploadFileQueue.concat(newUpload)) 
                if (uploadFileQueue.length < 1){
                    
                    newUpload.startUpload()
                setCurrentUpload(newUpload)

                setUploadingList((currentList: UploaderItemProps[]) => {
                    return [
                        ...currentList,
                        {
                            currentState: 'progress',
                            progress: 0,
                            timeRemaining: {num: 0, unit: ''},
                            size: file.size,
                            name: file.name,
                            idItem: 0,
                            embedCode: ""
                        }]
                })
                } else {
                    setUploadingList((currentList: UploaderItemProps[]) => {
                        return [
                            ...currentList,
                            {
                                currentState: 'queue',
                                progress: 0,
                                timeRemaining: {num: 0, unit: ''},
                                size: file.size,
                                name: file.name,
                                idItem: 0,
                                embedCode: ""
                            }]
                    })
                }


                
            }
        }

    }

    const uploadNextFile = () => {
        if (uploadFileQueue.length > 1) {
            setUploadFileQueue(uploadFileQueue.slice(1))
        setCurrentUpload(uploadFileQueue[0])
        uploadFileQueue[1].startUpload()
        }
        
    }

    const handleActionItem = (item: UploaderItemProps) => {
        switch (item.currentState) {
            case 'completed':
                const items = uploadingList.filter(obj => obj.name !== item.name);
                setUploadingList(items);
                // var event = new CustomEvent('paused' + item.name);
                // document.dispatchEvent(event);
                break;
            case 'failed':
                const itemsFailed = uploadingList.filter(obj => obj.name !== item.name);
                setUploadingList(itemsFailed);
                // var event = new CustomEvent('paused' + item.name);
                // document.dispatchEvent(event);
                break;
            case 'paused':
                const itemsPaused: UploaderItemProps[] = uploadingList.filter(obj => obj.name !== item.name);
                setUploadingList(itemsPaused);
                // var event = new CustomEvent('paused' + item.name);
                // document.dispatchEvent(event);
                break;
            case 'progress':
                const itemsProgress = uploadingList.filter(obj => obj.name !== item.name);
                setUploadingList(itemsProgress);
                // var event = new CustomEvent('paused' + item.name);
                // document.dispatchEvent(event);
                break;
            case 'queue':
                const itemsQueue = uploadingList.filter(obj => obj.name !== item.name);
                setUploadingList(itemsQueue);
                // var event = new CustomEvent('paused' + item.name);
                // document.dispatchEvent(event);
                break;
            case 'veryfing':

        }
    }

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            handleDrop(e.target.files);
        }
    }

    const renderList = () => {
        return uploadingList.map((value, key) => {
            return (
                <UploaderItem actionFunction={() => { handleActionItem(value) }} key={key} {...value} ></UploaderItem>
            )
        })
    }

    const handleResumeAll = () => {
        currentUpload.resumeUpload()
        setItemsPaused(!itemsPaused)
        setUploadingList((currentList: UploaderItemProps[]) => {
            const updatedList = currentList.map((value, key) => { if (value.name === File.name) { value.currentState = "progress" } return value })
            return updatedList;
        })
    }

    React.useEffect(() => {
    }, [uploadingList]);

    var list = Object.keys(props.encodingRecipe.recipes).reduce((reduced, item)=> {return {...reduced, [props.encodingRecipe.recipes[item].name]: false}},{})
    return (
        <UploaderContainer>
            <div className="flex space-between">
                <div className="col col-8 flex items-center">
                    <DropdownSingle 
                        style={{background: "#fff"}}
                        className='col col-5 mr1 pb2 '
                        dropdownTitle='Encoding Recipe'
                        list={list}
                        isWhiteBackground={true}
                        id='dropdownUploaderEncoding'
                        callback={(value: string) => { console.log(value)}}
                    />
                    <Icon className="inline-block mt1" color="disabled">create</Icon>
                    <Icon className="inline-block mt1" color="disabled">info</Icon>
                </div>  
                <div className="col col-4 flex items-center justify-end">
                    <Button sizeButton="small" typeButton="secondary" color="blue"> FTP/S3 Uploader </Button>
                </div>
            </div>
            
            <Prompt
                when={uploadingList.filter((value, index) => value.currentState === "progress").length > 0}
                message={"Are you sure you want to leave? " + uploadingList.filter((value, index) => value.currentState === "progress").length + "item(s) still uploading"}
            />
            <DragAndDrop hasError={false} className="lg-col lg-col-12 bg-w" handleDrop={handleDrop}>
                <BigIcon>cloud_upload</BigIcon>
                <div className='center'><Text size={14} weight='med' color='gray-1'>Drag and drop to upload or</Text></div>
                <ButtonStyle className='my1'>
                    <Button style={{ marginBottom: 26 }} sizeButton='xs' typeButton='primary' buttonColor='blue'>
                        <label htmlFor='browseButton'>
                            <LinkStyleUploader>
                                <input type='file' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{ display: 'none' }} id='browseButton' />
                                Browse Files
                            </LinkStyleUploader>
                        </label>
                    </Button>
                </ButtonStyle>
            </DragAndDrop>
            <Text style={{ marginTop: "50%" }} weight="reg" color="gray-3" size={16} className="block mb2 center">
                Choose an Encoding Recipe then upload your videos
            </Text>
            <Text weight="reg" color="gray-3" size={16} className="block center">
                Note: this will consume Encoding Credits
            </Text>
            <div hidden={uploadingList.length === 0} className=" mt2 right">
                <Button sizeButton='xs' className="mr2" typeButton='secondary' buttonColor='blue' onClick={() => { setUploadingList(uploadingList.filter(element => element.currentState !== "completed")) }} >Clear Completed</Button>
                {
                    itemsPaused ?
                        <Button sizeButton='xs' typeButton='primary' buttonColor='blue' onClick={() => handleResumeAll()} >Resume All</Button>
                        :
                        <Button sizeButton='xs' typeButton='secondary' buttonColor='blue' onClick={() => {currentUpload.pauseUpload();setItemsPaused(!itemsPaused)}} >Pause All</Button>

                }
            </div>
            <ItemList className="col-12">
                {renderList()}
            </ItemList>
        </UploaderContainer>
    );

}


export const ItemList = styled.div<{}>`
    display: flex;
    flex-direction: column;
`

export const ButtonStyle = styled.div<{}>`
    margin: 0.5rem auto;
    width: fit-content;
`
export const ImageStyle = styled.img<{}>`
    position: relative;
    max-width: 204px;
    max-height: 176px;
    padding: 16px;
    display: flex;
    margin: 0 auto;
`

export const BigIcon = styled(Icon)`
    font-size: 98px !important; 
    display: block;
    margin: 0 auto;
    padding-top: 32px;
    color: ${props => props.theme.colors['gray-3']};
`

export const UploaderContainer = styled.div<{}>`
    max-width: 958px;
    margin: 0 auto;
`

export const LinkStyleUploader = styled.span<{}>`
    &:hover{
        cursor:pointer;
    }
`