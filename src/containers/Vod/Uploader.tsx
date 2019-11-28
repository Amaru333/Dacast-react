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
        },{
            currentState: 'veryfing',
            progress: 100,
            timeRemaining: 0,
            size: 3898883,
            name: "test_veryfing_name.mp4",
            idItem: 83317,
            embedCode: "<iframe>"
        },{
            currentState: 'progress',
            progress: 70,
            timeRemaining: 5,
            size: 3898883,
            name: "test_random_name.mp4",
            idItem: 83127,
            embedCode: "<iframe>"
        },{
            currentState: 'paused',
            progress: 40,
            timeRemaining: 5,
            size: 3898883,
            name: "paused_video.mp4",
            idItem: 81317,
            embedCode: "<iframe>"
        }
    ]

    
    const [uploadingList, setUploadingList] = React.useState<UploaderItemProps[]>(tempListTest);

    


    const handleDrop = (file: FileList) => {
        const acceptedVideoTypes = ['video/mp4'];
        if(file.length > 0 && acceptedVideoTypes.includes(file[0].type)) {
            const reader = new FileReader();
            reader.onload = () => {
                let acceptedRatio = true;
                const img = new Image();
                img.onload = () => {
                    //acceptedRatio = (img.width / img.height) / 4 === 1 && img.width <= 240 ? true : false;
                }
                
            }
            reader.readAsDataURL(file[0])
        }
    }

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.files && e.target.files.length > 0) {
            handleDrop(e.target.files);
        }
    }

    const renderList = () => {
        return uploadingList.map( (value, key) => {
            return (
                <UploaderItem key={key} {...value} ></UploaderItem>
            )
        } )
    }

    React.useEffect(() => {

    }, []);

    return (
        <UploaderContainer>
            <DragAndDrop hasError={false} className="lg-col lg-col-12 bg-w" handleDrop={handleDrop}>
                <BigIcon>cloud_upload</BigIcon>
                <div className='center'><Text   size={14} weight='med' color='gray-1'>Drag and drop to upload or</Text></div>
                <ButtonStyle className='my1'>
                    <Button style={{marginBottom:26}} sizeButton='xs' typeButton='primary' buttonColor='blue'>    
                        <label htmlFor='browseButton'>
                            <LinkStyle>
                                <input type='file' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{display:'none'}} id='browseButton' />
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

export function mapStateToProps( state: ApplicationState) {
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