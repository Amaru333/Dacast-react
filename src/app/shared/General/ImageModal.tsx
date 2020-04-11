import React from 'react';
import { Modal, ModalContent, ModalFooter } from '../../../components/Modal/Modal';
import { Button } from '../../../components/FormsComponents/Button/Button';
import styled, { css } from 'styled-components';
import { InputRadio } from '../../../components/FormsComponents/Input/InputRadio';
import { Text } from "../../../components/Typography/Text"
import { IconStyle } from '../../../shared/Common/Icon';
import { usePlayer } from '../../utils/player';

export const ImageModal = (props: {toggle: () => void; opened: boolean; submit: Function; title: string}) => {

    const testThumbnail = "sick_thumbnail.png"
    
    var objectContext = props.title ? props.title.split(' ')[1] : "";
    const [selectedOption, setSelectedOption] = React.useState<string>("upload");
    const [uploadedImage, setUploadedImage] = React.useState<string>("")
    const [isSaveDisabled, setIsSaveDisabled] = React.useState<boolean>(true)
    let playerRef = React.useRef<HTMLDivElement>(null);

    let player = usePlayer(playerRef, '104301_f_713989')

    React.useEffect(() => {
        if (uploadedImage) {
            setIsSaveDisabled(false)
        }
    }, [uploadedImage])

    React.useEffect(() => {
        if (selectedOption === "frame" || uploadedImage !== "") {
            setIsSaveDisabled(false)
        } else { 
            setIsSaveDisabled(true) 
        }
    }, [selectedOption])

    const handleClickNextFrame = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        if(!player || !player.getPlayerInstance()){
            return;
        }
        player.getPlayerInstance().currentTime += 1/24.0;
    }

    const handleClickPrevFrame = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        if(!player || !player.getPlayerInstance()){
            return;
        }
        player.getPlayerInstance().currentTime -= 1/24.0;
    }

    const handleSubmit = (ImageModalFunction: Function) => {
        event.preventDefault();
        if (selectedOption === "upload") {
            ImageModalFunction(uploadedImage)
        } else {
            ImageModalFunction(player.getPlayerInstance().currentTime.toString())
        }
        props.toggle()
    }

    return (
        <Modal size="large" title={props.title} toggle={props.toggle} opened={props.opened} hasClose={false}>
            <ModalContent>
                <RadioButtonContainer className="col col-12 mt25" isSelected={selectedOption === "upload"}>
                    <InputRadio name="addThumbnail" value="upload" label={"Upload "+objectContext} onChange={() => setSelectedOption('upload')}/>
                </RadioButtonContainer>
                <RadioButtonOption className="col col-12 p25" isOpen={selectedOption === "upload"}>
                    <div className="col col-12">
                        <Text className="col col-12" size={14} weight="reg">{"Upload a file for your "+objectContext}</Text>
                        <Button className="mt2" sizeButton="xs" typeButton="secondary" onClick={() => setUploadedImage(testThumbnail)}>Upload File</Button>
                        <Text className="col col-12 mt1" size={10} weight="reg" color="gray-5">Max file size is 1MB</Text>
                        { uploadedImage === "" ? null : 
                            <ThumbnailFile className="col col-6 my1">
                                <Text className="ml2" color="gray-1" size={14} weight="reg">{uploadedImage}</Text>
                                <button style={{border: "none", backgroundColor:"inherit"}}>
                                    <IconStyle onClick={() => setUploadedImage(testThumbnail)} customsize={14}>close</IconStyle>
                                </button>   
                            </ThumbnailFile>
                        }
                    </div>
                </RadioButtonOption>
                <RadioButtonContainer className="col col-12 px2 mt1" isSelected={selectedOption === "frame"}>
                    <InputRadio name="addThumbnail" value="frame" label="Select from Video" onChange={() => setSelectedOption('frame')}/>
                </RadioButtonContainer>
                <RadioButtonOption className="col col-12" isOpen={selectedOption === "frame"}>
                    <div className="col col-12">
                        <PlayerSection className='col col-12 mr2 mb2'>
                            <PlayerContainer className="col col-12 mx2 my2">
                                <div ref={playerRef}>
                                </div>
                            </PlayerContainer>
                            <ButtonsArea className='my2 mx2'>
                                <Button onClick={(event) =>handleClickPrevFrame(event)} className="mr2" sizeButton="xs" typeButton="secondary" buttonColor="blue">Previous Frame</Button>
                                <Button onClick={(event) => handleClickNextFrame(event)} className="mr2" sizeButton="xs" typeButton="secondary" buttonColor="blue">Next Frame</Button>
                            </ButtonsArea>
                        </PlayerSection>
                    </div>
                        
                </RadioButtonOption>
            </ModalContent>
            <ModalFooter>
                <Button disabled={isSaveDisabled} onClick={() => handleSubmit(props.submit)}>Save</Button>
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
    padding: 12px 16px;
    background-color: ${props => props.isSelected ? props.theme.colors['violet10'] : props.theme.colors['white'] };
    border: 1px solid ${props => props.theme.colors['gray-7']};
    margin-bottom: 0px;
`

const RadioButtonOption = styled.div<{isOpen: boolean}>`
    display: none;
    margin-bottom: 0;
    ${props => props.isOpen && css`
        display: flex;
        flex-direction: column;
        position: relative;
        border: 1px solid ${props.theme.colors['gray-7']};
        border-top: none;
    `}
`
const ThumbnailFile = styled.div`
    display: flex;
    background-color: ${props => props.theme.colors["gray-10"]};
    height: 32px;
    align-items: center;
    justify-content: space-between;
`

export const PlayerSection = styled.div`
`

export const PlayerContainer = styled.div`
    width: 100%;
    height: 341px;
    position: relative;
`

export const ButtonsArea = styled.div`

`