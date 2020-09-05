import React from 'react';
import { DragAndDrop } from '../../../../components/DragAndDrop/DragAndDrop';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import styled from 'styled-components';
import { Text } from '../../../../components/Typography/Text';
import Icon from '@material-ui/core/Icon';
import { UploaderItemProps, UploaderItem } from './UploaderItem';
import { UploadObject } from '../../../utils/uploaderService';
import { Prompt, useHistory } from 'react-router'
import { UploaderProps } from '../../../containers/Videos/Uploader';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { IconStyle } from '../../../../shared/Common/Icon';
import { useNetwork } from '../../../utils/customHooks';
import { Toast } from '../../../../components/Toast/Toast';
import { ToastContainer } from '../../../../components/Toast/ToastStyle';
import { logAmplitudeEvent } from '../../../utils/amplitudeService';


export const UploaderPage = (props: UploaderProps) => {

    let history = useHistory();

    const FILE_CHUNK_SIZE = 10000000 // 10MB
    const MAX_REQUEST_PER_BATCH = 100
    const NB_CONCURRENT_REQUESTS = 5

    let isOnline = useNetwork()

    const [uploadingList, setUploadingList] = React.useState<UploaderItemProps[]>([]);
    const [itemsPaused, setItemsPaused] = React.useState<boolean>(false)
    const [File, setFile] = React.useState<File>(null)
    const [currentUpload, setCurrentUpload] = React.useState<UploadObject>(null)
    const [uploadFileQueue, setUploadFileQueue] = React.useState<UploadObject[]>([])
    const [selectedRecipe, setSelectedRecipe] = React.useState<string>(props.encodingRecipe.recipes.find(r => r.isDefault).id)
    let videoUploadBrowseButtonRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        if (!isOnline) {
            if (currentUpload && currentUpload.hasStarted) {
                currentUpload.pauseUpload();
            }
        } else {
            if (currentUpload) {
                currentUpload.resumeUpload();
            }
        }
    }, [isOnline])

    React.useEffect(() => {
        if (currentUpload && currentUpload.isCompleted) {
            uploadNextFile()
        }
    }, [currentUpload && currentUpload.isCompleted])

    React.useEffect(() => {
        setUploadingList((currentList: UploaderItemProps[]) => {
            const updatedList = currentList.map((value, key) => { if (value.name === currentUpload.getFileName()) { value.currentState = "progress"; value.timeRemaining.num = 0 } return value })
            return updatedList;
        })
    }, [currentUpload && currentUpload.getFileName()])

    const updateItem = (percent: number, name: string, startTime: number) => {
        setUploadingList((currentList: UploaderItemProps[]) => {
            const index = currentList.findIndex(element => element.name === name);

            //Calcul ETA
            var now = (new Date()).getTime();
            var elapsedtime = now - startTime;
            elapsedtime = elapsedtime / 1000;
            var uploadSpeed = percent / elapsedtime
            var eta = (100 - percent) / uploadSpeed;
            if (eta > 120) {
                eta = Math.round(eta / 60);
                var etaUnit = 'minutes'
            } else {
                eta = Math.round(eta);
                var etaUnit = ' seconds';
            }
            if(percent >= 100) {
                logAmplitudeEvent('upload video')
            }
            return Object.assign([...currentList], {
                [index]:
                {
                    ...currentList[index],
                    currentState: percent >= 100 ? "completed" : currentList[index].currentState,
                    progress: percent,
                    timeRemaining: { num: eta, unit: etaUnit }
                }
            })
        });
    }

    const handleDrop = (fileList: FileList) => {
        const acceptedVideoTypes = ['video/mp4', 'video/mov'];
        var newUploadingQueue = [];
        for (var i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            if (fileList.length > 0) {
                var startTime = (new Date()).getTime();
                let newUpload = new UploadObject(
                    file,
                    MAX_REQUEST_PER_BATCH,
                    NB_CONCURRENT_REQUESTS,
                    FILE_CHUNK_SIZE,
                    (percent: number) => { updateItem(percent, file.name, startTime) },
                    (err: any) => {
                        setUploadFileQueue((currentList: any[]) => {
                            uploadNextFile(currentList)
                            return currentList;
                        })
                        if (err === 'Cancel') {
                            setUploadingList((currentList: UploaderItemProps[]) => {
                                const updatedList = currentList.map((value, key) => { if (value.name === file.name) { value.currentState = "paused"; value.timeRemaining.num = 0 } return value })
                                return updatedList;
                            })
                        } else {
                            setUploadingList((currentList: UploaderItemProps[]) => {
                                const updatedList = currentList.map((value, key) => { if (value.name === file.name) { value.currentState = "failed"; value.progress = 100; value.timeRemaining.num = 0; } return value })
                                return updatedList;
                            })
                        }
                    },
                    selectedRecipe
                )
                if (uploadFileQueue.length < 1 && !uploadingList.find(el => el.currentState === 'progress') && i === 0) {
                    newUpload.startUpload()
                    setCurrentUpload(newUpload)
                    setUploadingList((currentList: UploaderItemProps[]) => {
                        return [
                            ...currentList,
                            {
                                currentState: 'progress',
                                progress: 0,
                                timeRemaining: { num: 0, unit: '' },
                                size: file.size,
                                name: file.name,
                                idItem: 0,
                                embedCode: ""
                            }]
                    })
                } else {
                    newUploadingQueue.push(newUpload)
                    if (i === fileList.length - 1) {
                        setUploadFileQueue([...uploadFileQueue, ...newUploadingQueue])
                    }
                    setUploadingList((currentList: UploaderItemProps[]) => {
                        return [
                            ...currentList,
                            {
                                currentState: 'queue',
                                progress: 0,
                                timeRemaining: { num: 0, unit: '' },
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

    const uploadNextFile = (currentList?: any[]) => {
        if (uploadFileQueue.length >= 1 || ( currentList && currentList.length >= 1) ) {
            let list = currentList ? currentList : uploadFileQueue;
            list[0].startUpload()
            setCurrentUpload(list[0])
            setUploadFileQueue(list.filter((e, key) => key !== 0))
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
                currentUpload.cancelUpload();
                setUploadingList(itemsProgress);
                // var event = new CustomEvent('paused' + item.name);
                // document.dispatchEvent(event);
                break;
            case 'queue':
                const itemsQueue = uploadingList.filter(obj => obj.name !== item.name);
                const queueItem = uploadFileQueue.filter(obj => obj.getFileName() !== item.name);
                setUploadingList(itemsQueue);
                setUploadFileQueue(queueItem);
                // var event = new CustomEvent('paused' + item.name);
                // document.dispatchEvent(event);
                break;
            case 'veryfing':
                break;
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
            const updatedList = currentList.map((value, key) => { if (value.currentState === 'paused') { value.currentState = "progress" } return value })
            return updatedList;
        })
    }

    React.useEffect(() => {
    }, [uploadingList]);

    var list = Object.keys(props.encodingRecipe.recipes).reduce((reduced, item) => { return { ...reduced, [props.encodingRecipe.recipes[item].name]: false } }, {})
    var defaultRecipe = props.encodingRecipe.recipes.find(recipe => recipe.isDefault === true)

    return (
        <UploaderContainer>
            <div className="flex space-between">
                <div className="col col-8 flex items-center">
                    <DropdownSingle
                        style={{ background: "#fff" }}
                        className='col col-5 mr1 pb2 '
                        dropdownTitle='Encoding Recipe'
                        dropdownDefaultSelect={defaultRecipe ? defaultRecipe.name : ""}
                        list={list}
                        isWhiteBackground={true}
                        id='dropdownUploaderEncoding'
                        callback={(value: string) => { setSelectedRecipe(props.encodingRecipe.recipes.find(recipe => recipe.name === value).id) }}
                    />
                    <IconStyle id="tooltipUploaderEncoding" className="inline-block mt1" coloricon="gray-3">info_outlined</IconStyle>
                    <Tooltip target="tooltipUploaderEncoding">Use our Standard Recipe, or go to Encoding to create your own Encoding Recipes</Tooltip>
                </div>
                {/* <div className="col col-4 flex items-center justify-end">
                    <Button sizeButton="small" typeButton="secondary" color="blue" onClick={() => history.push("/settings/integrations")}> FTP/S3 Uploader </Button>
                </div> */}
            </div>

            <Prompt
                when={uploadingList.filter((value, index) => value.currentState === "progress").length > 0}
                message={"Are you sure you want to leave? " + uploadingList.filter((value, index) => value.currentState === "progress").length + "item(s) still uploading"}
            />
            <DragAndDrop hasError={false} className="lg-col lg-col-12 bg-w" handleDrop={handleDrop}>
                <BigIcon>cloud_upload</BigIcon>
                <div className='center'><Text size={14} weight='med' color='gray-1'>Drag and drop to upload or</Text></div>
                <ButtonStyle className='my1'>
                    <input type='file' accept='video/mp4, video/mov' ref={videoUploadBrowseButtonRef} multiple onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{ display: 'none' }} id='browseButton' />
                    <Button onClick={() => { videoUploadBrowseButtonRef.current.click() }} style={{ marginBottom: 26 }} sizeButton='xs' typeButton='primary' buttonColor='blue'>
                        Browse Files
                    </Button>
                </ButtonStyle>
            </DragAndDrop>
            {
                !uploadingList.length &&
                <Text style={{ marginTop: "50%" }} weight="reg" color="gray-3" size={16} className="block mb2 center">
                    Choose an Encoding Recipe then upload your videos
                </Text>
            }
            <div hidden={uploadingList.length === 0} className=" mt2 right">
                <Button sizeButton='xs' className="mr2" typeButton='secondary' buttonColor='blue' onClick={() => { setUploadingList(uploadingList.filter(element => element.currentState !== "completed" && element.currentState !== "failed")) }} >Clear Completed</Button>
                {/* To be renoved eventually
                    {
                    itemsPaused ?
                        <Button sizeButton='xs' typeButton='primary' buttonColor='blue' onClick={() => handleResumeAll()} >Resume</Button>
                        :
                        <Button sizeButton='xs' typeButton='secondary' buttonColor='blue' onClick={() => { currentUpload.pauseUpload(); setItemsPaused(!itemsPaused) }} >Pause</Button>

                } */}
            </div>
            <ItemList className="col-12">
                {renderList()}
            </ItemList>
            <Prompt when={uploadingList.filter(item => item.currentState === 'progress' || item.currentState === 'paused' || item.currentState === 'veryfing').length > 1}
                message='Unfinished uploads will be deleted.' />
            {
                !isOnline &&
                <ToastContainer>
                    <Toast
                        toast={
                            {
                                text: "No Internet Connection",
                                timestamp: 1592399420,
                                size: 'flexible',
                                notificationType: 'error'
                            }
                        }
                    />
                </ToastContainer>
            }


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