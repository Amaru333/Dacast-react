import React from 'react';
import { Modal, ModalContent, ModalFooter } from '../../../Modal/Modal';
import { Button } from '../../../FormsComponents/Button/Button';
import styled, { css } from 'styled-components';
import { InputRadio } from '../../../FormsComponents/Input/InputRadio';
import { Text } from "../../../Typography/Text"
import { Icon } from '@material-ui/core';
import { Input } from '../../../FormsComponents/Input/Input';

export const ThumbnailModal = (props) => {

    const [selectedOption, setSelectedOption] = React.useState<string>("upload");

    return (
        <Modal size="small" title="Add Thumbnail" toggle={props.toggle} opened={props.opened}>
                <ModalContent>
                    <RadioButtonContainer className="col col-12" isSelected={selectedOption === "upload"}>
                        <InputRadio name="addThumbnail" value="upload" label="Upload Thumbnail" onChange={() => setSelectedOption('upload')}/>
                    </RadioButtonContainer>
                    <RadioButtonOption isOpen={selectedOption === "upload"}>
                        <div className="col col-12">
                            <Text className="col col-12" size={14} weight="reg">Upload a file for your Thumbnail</Text>
                            <Button className="col col-3" sizeButton="xs" typeButton="secondary">Upload File</Button>
                            <Text className="col col-12" size={10} weight="reg" color="gray-5">Max file size is 1MB</Text>
                            <ThumbnailFile className="col col-6 mt1">
                                <Text className="ml2" color="gray-1" size={14} weight="reg">new_thumbnail.png</Text>
                                <button style={{border: "none", backgroundColor:"inherit"}}>
                                     <Icon style={{fontSize: "14px"}}>close</Icon>
                                </button>   
                            </ThumbnailFile>
                        </div>
                    </RadioButtonOption>
                    <RadioButtonContainer className="col col-12 px2" isSelected={selectedOption === "frame"}>
                        <InputRadio name="addThumbnail" value="frame" label="Select from Video" onChange={() => setSelectedOption('frame')}/>
                    </RadioButtonContainer>
                    <RadioButtonOption isOpen={selectedOption === "frame"}>
                        <div className="col col-12">
                           <Text size={14} weight="reg">Select a still frame from your video for your Thumbnail</Text>
                           <Input></Input>
                        </div>
                        
                    </RadioButtonOption>
                </ModalContent>
                <ModalFooter>
                    <Button>Add</Button>
                    <Button onClick={props.toggle} typeButton="secondary">Cancel</Button> 
                </ModalFooter>
            </Modal>
    )
}

const RadioButtonContainer = styled.div<{isSelected: boolean}>`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 24px;
    background-color: ${props => props.isSelected ? props.theme.colors['violet10'] : props.theme.colors['white'] };
    border: 1px solid ${props => props.theme.colors['gray-7']};
`

const RadioButtonOption = styled.div<{isOpen: boolean}>`
    display: none;
    ${props => props.isOpen && css`
        display: flex;
        flex-direction: column;
        position: relative;
    `}
`
const ThumbnailFile = styled.div`
    display: flex;
    background-color: ${props => props.theme.colors["gray-10"]};
    height: 32px;
    align-items: center;
    justify-content: space-between;
`