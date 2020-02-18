import React from 'react';
import { Modal, ModalContent, ModalFooter } from '../../components/Modal/Modal';
import { Button } from '../../components/FormsComponents/Button/Button';
import styled, { css } from 'styled-components';
import { InputRadio } from '../../components/FormsComponents/Input/InputRadio';
import { Text } from "../../components/Typography/Text"
import { Icon } from '@material-ui/core';

export const ImageModal = (props: {toggle: () => void; opened: boolean; submit: Function}) => {

    const testThumbnail = "sick_thumbnail.png"

    const [selectedOption, setSelectedOption] = React.useState<string>("upload");
    const [uploadedImage, setUploadedImage] = React.useState<string>("")
    const [player, setPlayer] = React.useState<any>(null)
    const [isSaveDisabled, setIsSaveDisabled] = React.useState<boolean>(true)
    let playerRef = React.useRef<HTMLDivElement>(null);

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

    React.useEffect(() => {
        if(playerRef && playerRef.current)
        {
            const playerScript = document.createElement('script');
            playerScript.src = "https://player.dacast.com/js/player.js";
            playerRef.current.appendChild(playerScript);
            playerScript.addEventListener('load', () => {

                setPlayer(dacast('104301_f_769886', playerRef.current, {
                    player: 'theo',
                    height: 341,
                    width: '100%'
                }))

            })
        }
        return () => player ? player.dispose() : null;
    }, [])

    React.useEffect(() => {
        if(player) {
            player.onReady(() => {
                if(player.getPlayerInstance().autoplay){
                    let onPlay = () => {
                        player.getPlayerInstance().pause()
                        player.getPlayerInstance().removeEventListener('loadedmetadata', onPlay);
                    };
                    player.getPlayerInstance().addEventListener('loadedmetadata', onPlay);
                    
                }
            })
        }
    }, [player])

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
        <Modal size="large" title="Change Thumbnail" toggle={props.toggle} opened={props.opened} hasClose={false}>
            <ModalContent>
                <RadioButtonContainer className="col col-12 mt25" isSelected={selectedOption === "upload"}>
                    <InputRadio name="addThumbnail" value="upload" label="Upload Thumbnail" onChange={() => setSelectedOption('upload')}/>
                </RadioButtonContainer>
                <RadioButtonOption className="col col-12 p25" isOpen={selectedOption === "upload"}>
                    <div className="col col-12">
                        <Text className="col col-12" size={14} weight="reg">Upload a file for your Thumbnail</Text>
                        <Button className="mt2" sizeButton="xs" typeButton="secondary" onClick={() => setUploadedImage(testThumbnail)}>Upload File</Button>
                        <Text className="col col-12 mt1" size={10} weight="reg" color="gray-5">Max file size is 1MB</Text>
                        { uploadedImage === "" ? null :
                            <ThumbnailFile className="col col-6 mt1">
                                <Text className="ml2" color="gray-1" size={14} weight="reg">{uploadedImage}</Text>
                                <button style={{border: "none", backgroundColor:"inherit"}}>
                                    <Icon onClick={() => setUploadedImage(testThumbnail)} style={{fontSize: "14px"}}>close</Icon>
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
                            <PlayerContainer className="col col-12 px2 my2">
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
    padding: 12px 24px;
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
        border: 1px solid ${props => props.theme.colors['gray-7']};
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