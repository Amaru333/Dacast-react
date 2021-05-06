import React from 'react';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { ImageContainer, ImageArea, ButtonSection, ImageSection, SelectedImage } from '../../shared/General/GeneralStyle';
import { Modal, ModalContent, ModalFooter } from '../../../components/Modal/Modal';
import { InputRadio } from '../../../components/FormsComponents/Input/InputRadio';
import { IconStyle } from '../../../shared/Common/Icon';
import { RadioButtonContainer, RadioButtonOption, ThumbnailFile, UploadText } from '../../shared/General/ImageModal';
import { ColorPicker } from '../../../components/ColorPicker/ColorPicker';
import { ContentType } from '../../redux-flow/store/Common/types';
import { ExposThemingState } from '../../redux-flow/store/Content/General/types';

interface ImageAreaExpoProps { 
    getUploadUrl: (uploadType: string, contentId: string, extension: string, contentType: ContentType) => Promise<void>
    submit: (data: File, uploadUrl: string, contentId: string, contentType: ContentType) => Promise<void>
    saveHeaderColor: (headerColor: string) => Promise<void>
    headerEnable: boolean
    contentId: string
    uploadUrl?: string
    headerColor?: string
    headerUrl?: string
    stateContentDetails?: ExposThemingState
    deleteFile: (contentId: string, targetId: string, uploadType: string) => Promise<void>;
}

export const ImageAreaExpo = (props: ImageAreaExpoProps) => {

    const [settingsModalopen, setSettingsModalopen] = React.useState<boolean>(false)
    let inputBrowseButtonRef = React.useRef<HTMLInputElement>(null)
    const [selectedOption, setSelectedOption] = React.useState<string>("upload");
    const [logoFile, setLogoFile] = React.useState<File>(null);
    const [selectedColor, setSelectedColor] = React.useState<string>(props.headerColor || '#fffff');
    const [isSaveDisabled, setIsSaveDisabled] = React.useState<boolean>(true)
    const [saveButtonLoading, setSaveButtonLoading] = React.useState<boolean>(false)
    const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false)

    
    React.useEffect(() => {
        if (selectedOption === "color") {
            setIsSaveDisabled(false)
        } else {
            setIsSaveDisabled(logoFile ? false : true)
        }
    }, [selectedOption, logoFile])

    const handleDrop = (file: FileList) => {
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/svg'];
        if (file.length > 0 && acceptedImageTypes.includes(file[0].type)) {
            const reader = new FileReader();
            reader.onload = () => {
                let acceptedRatio = true;
                const img = new Image();
                img.onload = () => {
                    //acceptedRatio = (img.width / img.height) / 4 === 1 && img.width <= 240 ? true : false;
                }
                if (acceptedRatio) {
                    setLogoFile(file[0])
                }
            }
            reader.readAsDataURL(file[0])
        }
    }

    const handleSubmit = async () => {
        if(!saveButtonLoading && !isSaveDisabled) {
            setSaveButtonLoading(true);
            if(selectedOption === 'upload') {
                props.getUploadUrl('expo-poster', props.contentId, '.' + logoFile.type.split('/')[1], 'expo')
            } else {
                props.saveHeaderColor(selectedColor).then(() => setSettingsModalopen(false))
            }
        }
    }

    React.useEffect(() => {
        if(props.uploadUrl && saveButtonLoading && logoFile) {
            props.submit(logoFile, props.uploadUrl, props.contentId, 'expo')
            .then(() => {
                setSaveButtonLoading(false)
                setSettingsModalopen(false)
            })
        }
    }, [props.uploadUrl, saveButtonLoading])

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            handleDrop(e.target.files);
        }
    }

    const handleDelete = () => {
        if(props.headerUrl) {
            setDeleteLoading(true);
            props.deleteFile(props.contentId, props.stateContentDetails.coverBackgroundAssetId, 'expo').then(() => setDeleteLoading(false))
        } else {
            props.saveHeaderColor(null);
        }
        
    }

    return (
        <>
            <ImageContainer className="col col-12">
                <div className="flex flex-center">
                    <ImageArea className="mt2 col col-12">
                        <ButtonSection>
                            {
                                props.headerEnable && (props.headerUrl || props.headerColor) &&
                                <Button isLoading={deleteLoading} sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => {handleDelete()}} >Delete</Button>
                            }
                            <Button
                                className="clearfix right my1 mr1" sizeButton="xs" typeButton="secondary"
                                onClick={() => { setSettingsModalopen(true) }}>
                                {
                                    props.headerEnable && (props.headerUrl || props.headerColor) ?
                                        "Change" : "Add"
                                }
                            </Button>
                        </ButtonSection>
                        {(props.headerEnable && props.headerUrl && !props.headerColor) && <ImageSection> <SelectedImage src={props.headerUrl} /></ImageSection>}
                        {(props.headerEnable && !props.headerUrl && props.headerColor) && <ImageSection style={{height: 100}} backgroundColor={props.headerColor}> </ImageSection>}

                    </ImageArea>
                </div>
                <Text size={10} weight="reg" color="gray-3">Minimum 480px x 480px, formats: JPG, PNG, SVG, GIF</Text>
            </ImageContainer>
            <Modal
                size='large' hasClose toggle={() => setSettingsModalopen(!settingsModalopen)} opened={settingsModalopen} modalTitle='Cover Background'
            >
                <ModalContent>
                    <RadioButtonContainer className="col col-12 mt25" isSelected={selectedOption === "upload"}>
                        <InputRadio name="addThumbnail" value="upload" defaultChecked={selectedOption === "upload"} label={"Upload Image"} onChange={() => setSelectedOption('upload')} />
                    </RadioButtonContainer>
                    <RadioButtonOption className="col col-12 p25" isOpen={selectedOption === "upload"}>
                        <div className="col col-12">
                            <input type='file' ref={inputBrowseButtonRef} className="pointer" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{ display: 'none' }} id='browseButton' accept="image/gif,image/jpeg,image/png,image/svg" />
                            <Text className="col col-12" size={14} weight="reg">Recommended image aspect ratio 16:9</Text>
                            <Button onClick={() => { inputBrowseButtonRef.current.click() }} className="mt2" sizeButton="xs" typeButton="secondary">
                                Upload File
                            </Button>
                            <Text className="col col-12 mt1" size={10} weight="reg" color="gray-5">Max file size is 1MB</Text>
                            {logoFile &&
                                <ThumbnailFile className="col mt1">
                                    <UploadText className="ml2" color="gray-1" size={14} weight="reg">{logoFile ? logoFile.name : ''}</UploadText>
                                    <button style={{ border: "none", backgroundColor: "inherit" }}>
                                        <IconStyle onClick={() => setLogoFile(null)} customsize={14}>close</IconStyle>
                                    </button>
                                </ThumbnailFile>
                            }
                        </div>
                    </RadioButtonOption>
                    <RadioButtonContainer className="col col-12 px2 mt1" isSelected={selectedOption === "color"}>
                        <InputRadio name="addThumbnail" value="color" defaultChecked={selectedOption === "color"} label="Select Color" onChange={() => setSelectedOption('color')} />
                    </RadioButtonContainer>
                    <RadioButtonOption style={{ height: 300 }} className="col col-12 p25" isOpen={selectedOption === "color"}>
                        <ColorPicker
                            className='mb1 col-6'
                            defaultColor={selectedColor}
                            callback={(color: string) => {
                                setSelectedColor(color)
                            }}
                        />

                    </RadioButtonOption>
                </ModalContent>
                <ModalFooter>
                    <Button isLoading={saveButtonLoading} disabled={isSaveDisabled} onClick={() => handleSubmit()}>Save</Button>
                    <Button onClick={() => setSettingsModalopen(false)} typeButton="secondary">Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}