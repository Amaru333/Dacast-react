import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { ApplicationState } from "../../redux-flow/store";
import { Action } from "../../redux-flow/store/Uploader";
import React from 'react';
import { DragAndDrop } from '../../components/DragAndDrop/DragAndDrop';
import { LinkStyle } from '../../components/Pages/Account/CompanyStyle';
import { Button } from '../../components/FormsComponents/Button/Button';
import styled from 'styled-components';
import { Text } from '../../components/Typography/Text';
import Icon from '@material-ui/core/Icon';
import { UploaderItemProps, UploaderItem } from './UploaderItem';
import { upload, MIN_CHUNK_SIZE } from '../../utils/uploaderService';

// export interface UploaderProps {
//     // Your props here
// }

export const Uploader = (props: {}) => {

    const tempListTest: UploaderItemProps[] = [
        {
            currentState: 'completed',
            progress: 100,
            timeRemaining: 0,
            size: 3898883,
            name: "test_completed_name.mp4",
            idItem: 83167,
            embedCode: "<iframe>"
        }, {
            currentState: 'failed',
            progress: 100,
            timeRemaining: 0,
            size: 3898883,
            name: "failed_video.mp4",
            idItem: 831767,
            embedCode: "<iframe>"
        }, {
            currentState: 'veryfing',
            progress: 100,
            timeRemaining: 0,
            size: 3898883,
            name: "test_veryfing_name.mp4",
            idItem: 83317,
            embedCode: "<iframe>"
        }, {
            currentState: 'progress',
            progress: 70,
            timeRemaining: 5,
            size: 3898883,
            name: "test_random_name.mp4",
            idItem: 83127,
            embedCode: "<iframe>"
        }, {
            currentState: 'paused',
            progress: 40,
            timeRemaining: 5,
            size: 3898883,
            name: "paused_video.mp4",
            idItem: 81317,
            embedCode: "<iframe>"
        }
    ]


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
            eta = Math.round(eta);
            return Object.assign([...currentList], {
                [index]:
            {
                ...currentList[index],
                currentState: progressPerc === 100 ? "completed" : currentList[index].currentState,
                progress: progressPerc,
                timeRemaining: eta
            }
            })
        });
    }

    const updateItemMultiPart = (event: ProgressEvent, name: string, startTime: number, fileSize: number, bytesUploaded: number) => {
        setUploadingList((currentList: UploaderItemProps[]) => {
            const index = currentList.findIndex(element => element.name === name);
            const bytesProgress = event.loaded + bytesUploaded
            const progressPerc = Math.round(( bytesProgress  / fileSize) * 100);
            //Calcul ETA
            var now = (new Date()).getTime();
            var elapsedtime = now - startTime;
            elapsedtime = elapsedtime / 1000;
            var eta = ((fileSize / bytesProgress) * elapsedtime) - elapsedtime;
            eta = Math.round(eta/60);
            return Object.assign([...currentList], {
                [index]:
            {
                ...currentList[index],
                currentState: progressPerc === 100 ? "completed" : currentList[index].currentState,
                progress: progressPerc,
                timeRemaining: eta
            }
            })
        });
    }

    const handleDrop = (fileList: FileList) => {
        const acceptedVideoTypes = ['video/mp4'];
        const file = fileList[0];
        if (fileList.length > 0 && acceptedVideoTypes.includes(file.type)) {
            try {
                var startTime = (new Date()).getTime();
                if (file.size < MIN_CHUNK_SIZE) {
                    upload(file, (event: ProgressEvent) => {
                        updateItem(event, file.name, startTime);
                    });
                }
                else {
                    upload(file, (event: ProgressEvent, bytesUploaded: number, fileSize: number) => {
                        updateItemMultiPart(event, file.name, startTime, fileSize, bytesUploaded);
                    });
                }
                setUploadingList([
                    ...uploadingList,
                {
                    currentState: 'progress',
                    progress: 0,
                    timeRemaining: 0,
                    size: file.size,
                    name: file.name,
                    idItem: 0,
                    embedCode: ""
                }])

            } catch (err) {
                console.log(err)
            }
        }
    }

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            handleDrop(e.target.files);
        }
    }

    const renderList = () => {
        console.log(uploadingList);
        return uploadingList.map((value, key) => {
            return (
                <UploaderItem key={key} {...value} ></UploaderItem>
            )
        })
    }

    React.useEffect(() => {

    }, [uploadingList]);

    return (
        <UploaderContainer>
            <DragAndDrop hasError={false} className="lg-col lg-col-12 bg-w" handleDrop={handleDrop}>
                <BigIcon>cloud_upload</BigIcon>
                <div className='center'><Text size={14} weight='med' color='gray-1'>Drag and drop to upload or</Text></div>
                <ButtonStyle className='my1'>
                    <Button style={{ marginBottom: 26 }} sizeButton='xs' typeButton='primary' buttonColor='blue'>
                        <label htmlFor='browseButton'>
                            <LinkStyle>
                                <input type='file' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{ display: 'none' }} id='browseButton' />
                                Browse Files
                            </LinkStyle>
                        </label>
                    </Button>
                </ButtonStyle>
            </DragAndDrop>
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

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        //Return from dispatch function to component props
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