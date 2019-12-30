import { connect } from "react-redux";
import * as Redux from 'redux'

import { ApplicationState } from "../../redux-flow/store";
import { Action } from "../../redux-flow/store/Uploader";
import React from 'react';
import { DragAndDrop } from '../../components/DragAndDrop/DragAndDrop';
import { Button } from '../../components/FormsComponents/Button/Button';
import styled from 'styled-components';
import { Text } from '../../components/Typography/Text';
import Icon from '@material-ui/core/Icon';
import { UploaderItemProps, UploaderItem } from './UploaderItem';
import { upload, MIN_CHUNK_SIZE } from '../../utils/uploaderService';
import { Prompt } from 'react-router'
import { postVodDemo } from '../../redux-flow/store/VOD/General/actions';

// export interface UploaderProps {
//     // Your props here
// }

export const Uploader = (props: { postVodDemo: Function }) => {

    const [uploadingList, setUploadingList] = React.useState<UploaderItemProps[]>([]);

    const updateItem = (event: ProgressEvent, name: string, startTime: number) => {
        setUploadingList((currentList: UploaderItemProps[]) => {
            const index = currentList.findIndex(element => element.name === name);
            const progressPerc = Math.round(100 * event.loaded / event.total);
            //Calcul ETA
            var now = (new Date()).getTime();
            var elapsedtime = now - startTime;
            elapsedtime = elapsedtime / 1000;
            var eta = ((event.total / event.loaded) * elapsedtime) - elapsedtime;
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
                    currentState: progressPerc === 100 ? "completed" : currentList[index].currentState,
                    progress: progressPerc,
                    timeRemaining: {num: eta, unit: etaUnit}
                }
            })
        });
    }

    const updateItemMultiPart = (event: ProgressEvent, name: string, startTime: number, fileSize: number, bytesUploaded: number) => {
        setUploadingList((currentList: UploaderItemProps[]) => {
            const index = currentList.findIndex(element => element.name === name);
            const bytesProgress = event.loaded + bytesUploaded
            const progressPerc = Math.round((bytesProgress / fileSize) * 100);
            //Calcul ETA
            var now = (new Date()).getTime();
            var elapsedtime = now - startTime;
            elapsedtime = elapsedtime / 1000;
            var eta = ((fileSize / bytesProgress) * elapsedtime) - elapsedtime;
            if(eta > 120) {
                eta = Math.round(eta / 60);
                var etaUnit = 'minutes'
            } else {
                eta = Math.round(eta);
                var etaUnit= ' seconds';
            }
            if(bytesProgress === fileSize) {
                props.postVodDemo()
            };
            return Object.assign([...currentList], {
                [index]:
                {
                    ...currentList[index],
                    currentState: progressPerc === 100 ? "completed" : currentList[index].currentState,
                    progress: progressPerc,
                    timeRemaining: {num: eta, unit: etaUnit}
                }
            })
        });
    }

    const handleDrop = (fileList: FileList) => {
        const acceptedVideoTypes = ['video/mp4'];
        for (var i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            if (fileList.length > 0 && acceptedVideoTypes.includes(file.type)) {
                var startTime = (new Date()).getTime();
                if (file.size < MIN_CHUNK_SIZE) {
                    upload(file, (event: ProgressEvent) => {
                        updateItem(event, file.name, startTime);
                    })
                        .catch(err => {
                            setUploadingList((currentList: UploaderItemProps[]) => {
                                const updatedList = currentList.map((value, key) => { if (value.name === file.name) { value.currentState = "failed"; value.progress = 100; value.timeRemaining.num = 0; } return value })
                                return updatedList;
                            })
                        });
                }
                else {
                    upload(file, (event: ProgressEvent, bytesUploaded: number, fileSize: number) => {
                        updateItemMultiPart(event, file.name, startTime, fileSize, bytesUploaded);
                    })
                        .catch(err => {
                            console.log(err);
                            setUploadingList((currentList: UploaderItemProps[]) => {
                                const updatedList = currentList.map((value, key) => { if (value.name === file.name) { value.currentState = "failed"; value.progress = 100; value.timeRemaining.num = 0; } return value })
                                return updatedList;
                            })
                        });
                }
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
            }
        }

    }

    const handleActionItem = (item: UploaderItemProps) => {
        switch (item.currentState) {
            case 'completed':
                const items = uploadingList.filter(obj => obj.name !== item.name);
                setUploadingList(items);
                var event = new CustomEvent('paused' + item.name);
                document.dispatchEvent(event);
                break;
            case 'failed':
                const itemsFailed = uploadingList.filter(obj => obj.name !== item.name);
                setUploadingList(itemsFailed);
                var event = new CustomEvent('paused' + item.name);
                document.dispatchEvent(event);
                break;
            case 'paused':
                const itemsPaused = uploadingList.filter(obj => obj.name !== item.name);
                setUploadingList(itemsPaused);
                var event = new CustomEvent('paused' + item.name);
                document.dispatchEvent(event);
                break;
            case 'progress':
                const itemsProgress = uploadingList.filter(obj => obj.name !== item.name);
                setUploadingList(itemsProgress);
                var event = new CustomEvent('paused' + item.name);
                document.dispatchEvent(event);
                break;
            case 'queue':
                const itemsQueue = uploadingList.filter(obj => obj.name !== item.name);
                setUploadingList(itemsQueue);
                var event = new CustomEvent('paused' + item.name);
                document.dispatchEvent(event);
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

    React.useEffect(() => {
    }, [uploadingList]);

    return (
        <UploaderContainer>
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
            <div className=" mt2 right">
                <Button sizeButton='xs' className="mr2" typeButton='secondary' buttonColor='blue' onClick={() => { setUploadingList(uploadingList.filter(element => element.currentState !== "completed")) }} >Clear Completed</Button>
                <Button sizeButton='xs' typeButton='secondary' buttonColor='blue' >Pause All</Button>
            </div>
            <ItemList className="col-12">
                {renderList()}
            </ItemList>
        </UploaderContainer>
    );

}

export function mapStateToProps(state: ApplicationState) {
    return {
        //Return from global state to component props
    };
}

export function mapDispatchToProps(dispatch: Redux.Dispatch<any>) {
    return {
        postVodDemo: () => {
            dispatch(postVodDemo());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);


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