import React from 'react';
import { Modal, ModalContent, ModalFooter } from '../../../components/Modal/Modal';
import { Button } from '../../../components/FormsComponents/Button/Button';
import styled, { css } from 'styled-components';
import { InputRadio } from '../../../components/FormsComponents/Input/InputRadio';
import { Text } from "../../../components/Typography/Text"
import { IconStyle } from '../../../shared/Common/Icon';
import { usePlayer } from '../../utils/services/player/player';
import { userToken } from '../../utils/services/token/tokenService';

export const ImageModal = (props: {imageType: string; contentType: string; imageFileName: string; contentId: string; toggle: () => void; uploadUrl: string; getUploadUrl: Function; opened: boolean; submit: Function; title: string; getContentDetails: Function; uploadFromVideoAction?: Function}) => {
    
    var objectContext = props.title ? props.title.split(' ')[1] : "";
    const [selectedOption, setSelectedOption] = React.useState<string>("upload");
    const [isSaveDisabled, setIsSaveDisabled] = React.useState<boolean>(true)
    const [saveButtonLoading, setSaveButtonLoading] = React.useState<boolean>(false)
    let playerRef = React.useRef<HTMLDivElement>(null);
    const [logoFile, setLogoFile] = React.useState<File>(null);
    const [fileName, setFileName] = React.useState<string>(props.imageFileName)
    const [uploadType, setUploadType] = React.useState<string>(null)

    let inputBrowseButtonRef = React.useRef<HTMLInputElement>(null)
    let inputBrowseImageModalButtonRef = React.useRef<HTMLInputElement>(null)

    const userId = userToken.getUserInfoItem('user-id')

    let player = usePlayer(playerRef, userId + '-' + props.contentType + '-' + props.contentId)

    React.useEffect(() => {
        if (selectedOption === "frame") {
            setIsSaveDisabled(false)
        } else { 
            setIsSaveDisabled(true) 
        }
    }, [selectedOption])

    React.useEffect(() => {
        if(props.imageType.includes("thumbnail")) {
            setUploadType("Thumbnail")
        } else if(props.imageType.includes("splashscreen")) {
            setUploadType("Splashscreen")
        } else {
            setUploadType("Poster")
        }
    }, [])

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



    const handleSubmit = async () => {
        if(!saveButtonLoading && !isSaveDisabled) {
            setSaveButtonLoading(true);
            if(selectedOption === 'upload') {
                props.getUploadUrl(props.imageType, props.contentId, '.' + logoFile.type.split('/')[1], props.contentType)
            } else {
                props.uploadFromVideoAction(props.contentId, player.getPlayerInstance().currentTime, props.imageType).then(() => {
                    props.getContentDetails(props.contentId, props.contentType)
                    setSaveButtonLoading(false)
                    props.toggle()
                }, 4000)
            }    
        }
    }

    React.useEffect(() => {
        if(props.uploadUrl && saveButtonLoading && logoFile) {
            props.submit(logoFile, props.uploadUrl, props.contentId, uploadType, props.contentType).then(() => {
                setTimeout(() => {
                    props.getContentDetails(props.contentId, props.contentType)
                    setSaveButtonLoading(false)
                    props.toggle()
                }, 7000)
            })
        }
    }, [props.uploadUrl, saveButtonLoading])

    const handleDrop = (file: FileList) => {
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/svg'];
        if(file.length > 0 && acceptedImageTypes.includes(file[0].type)) {
            const reader = new FileReader();
            reader.onload = () => {
                let acceptedRatio = true;
                const img = new Image();
                img.onload = () => {
                    //acceptedRatio = (img.width / img.height) / 4 === 1 && img.width <= 240 ? true : false;
                }
                if(acceptedRatio) {
                    setLogoFile(file[0])
                    setFileName(file[0].name)
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

    React.useEffect(() => {
        setIsSaveDisabled(logoFile ? false : true)
    }, [logoFile])

    return (
        <Modal size={props.contentType === 'vod' ? 'large' : 'small'} modalTitle={props.title} toggle={props.toggle} opened={props.opened} hasClose={false}>
            { props.contentType === 'vod' ?
                <ModalContent>
                    <RadioButtonContainer className="col col-12 mt25" isSelected={selectedOption === "upload"}>
                        <InputRadio name="addThumbnail" value="upload" defaultChecked={selectedOption === "upload"} label={"Upload "+objectContext} onChange={() => setSelectedOption('upload')}/>
                    </RadioButtonContainer>
                    <RadioButtonOption className="col col-12 p25" isOpen={selectedOption === "upload"}>
                        <div className="col col-12">
                        <input type='file' ref={inputBrowseButtonRef} className="pointer" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{display:'none'}} id='browseButton' accept="image/gif,image/jpeg,image/png,image/svg" />
                            <Text className="col col-12" size={14} weight="reg">{"Upload a file for your "+objectContext}</Text>
                            <Button onClick={() => {inputBrowseButtonRef.current.click()} } className="mt2" sizeButton="xs" typeButton="secondary">
                                Upload File
                            </Button>
                            <Text className="col col-12 mt1" size={10} weight="reg" color="gray-5">Max file size is 1MB</Text>
                            { logoFile &&
                                <ThumbnailFile className="col mt1">
                                    <UploadText className="ml2" color="gray-1" size={14} weight="reg">{fileName ? fileName : ''}</UploadText>
                                    <button style={{border: "none", backgroundColor:"inherit"}}>
                                        <IconStyle onClick={() => setLogoFile(null)} customsize={14}>close</IconStyle>
                                    </button>   
                                </ThumbnailFile>
                            }
                        </div>
                    </RadioButtonOption>
                    <RadioButtonContainer className="col col-12 px2 mt1" isSelected={selectedOption === "frame"}>
                        <InputRadio name="addThumbnail" value="frame" defaultChecked={selectedOption === "frame"} label="Select from Video" onChange={() => setSelectedOption('frame')}/>
                    </RadioButtonContainer>
                    <RadioButtonOption className="col col-12" isOpen={selectedOption === "frame"}>
                        <div className="col col-12">
                            <PlayerSection className='col col-12 mr2 mb1'>
                                <PlayerContainer>
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
                :
                <ModalContent>
                    <div className="col col-12 mt2">
                        <input type='file' ref={inputBrowseImageModalButtonRef} className="pointer" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{display:'none'}} id='browseButtonImageModal' accept="image/gif,image/jpeg,image/png,image/svg" />
                        <Text className="col col-12" size={14} weight="reg">{"Upload a file for your "+objectContext}</Text>
                        <Button onClick={() => {inputBrowseImageModalButtonRef.current.click()} }  className="mt2" sizeButton="xs" typeButton="secondary">
                            Upload File
                        </Button>
                        <Text className="col col-12 mt1" size={10} weight="reg" color="gray-5">Max file size is 1MB</Text>
                        { logoFile &&
                            <ThumbnailFile className="col mt1">
                                <UploadText className="ml2" color="gray-1" size={14} weight="reg">{fileName ? fileName : ''}</UploadText>
                                <button style={{border: "none", backgroundColor:"inherit"}}>
                                    <IconStyle onClick={() => setLogoFile(null)} customsize={14}>close</IconStyle>
                                </button>   
                            </ThumbnailFile>
                        }
                    </div>
                </ModalContent>
            }
            <ModalFooter>
                <Button isLoading={saveButtonLoading} disabled={isSaveDisabled} onClick={() => handleSubmit()}>Save</Button>
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
    max-width: 90%;
`

export const PlayerSection = styled.div`
`

export const PlayerContainer = styled.div`
    width: 95%;
    height: 100%;
    min-height: 341px;
    position: relative;
    margin: 16px auto;
`

export const ButtonsArea = styled.div`
`

export const UploadText = styled(Text)`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`