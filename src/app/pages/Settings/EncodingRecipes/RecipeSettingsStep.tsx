import React from "react";
import styled, { css } from "styled-components";
import { Input } from "../../../../components/FormsComponents/Input/Input";
import { EncodingRecipeItem, EncodingRecipesData } from "../../../redux-flow/store/Settings/EncodingRecipes/EncodingRecipesTypes";
import { isMobile } from "react-device-detect";
import { InputCheckbox } from "../../../../components/FormsComponents/Input/InputCheckbox";
import { Text } from "../../../../components/Typography/Text"
import { Button } from "../../../../components/FormsComponents/Button/Button";
import { SpinnerContainer } from "../../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle";
import { LoadingSpinner } from "../../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner";
import { UploadText } from "../../../shared/General/ImageModal";
import { IconStyle } from '../../../../shared/Common/Icon';

export const RecipeSettingsStep = (props: {stepperData: EncodingRecipeItem; updateStepperData: React.Dispatch<React.SetStateAction<EncodingRecipeItem>>; setStepValidated: React.Dispatch<React.SetStateAction<boolean>>; getUploadUrl: () => Promise<void>; uploadWatermark: (data: File, uploadWatermarkUrl: string) => Promise<void>; deleteWatermark: (data: EncodingRecipeItem) => Promise<void>; encodingRecipeData: EncodingRecipesData}) => {

    React.useEffect(() => {
        if (props.stepperData) { props.setStepValidated(props.stepperData.name.length > 0 && !uploadButtonLoading) }
    })

    const [watermarkFileFile, setWatermarkFile] = React.useState<File>(null);
    const [uploadButtonLoading, setUploadButtonLoading] = React.useState<boolean>(false)
    let watermarkBrowseButtonRef = React.useRef<HTMLInputElement>(null)


    const handleUpload = () => {
        props.getUploadUrl();        
    }

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        const acceptedImageTypes = ['image/jpeg', 'image/png'];
        e.preventDefault();
        if(e.target.files && e.target.files.length > 0 && acceptedImageTypes.includes(e.target.files[0].type)) {
            setWatermarkFile(e.target.files[0])
            props.updateStepperData({...props.stepperData, watermarkFilename: e.target.files[0].name, watermarkPositioningLeft: 10, watermarkPositioningRight: 10})
            setUploadButtonLoading(true)
            handleUpload()
        }
    }

    React.useEffect(() => {
        if(props.encodingRecipeData.watermarkFileID) {
            props.updateStepperData({...props.stepperData, watermarkFileID: props.encodingRecipeData.watermarkFileID})
        }
    }, [props.encodingRecipeData.watermarkFileID])

    React.useEffect(() => {
        if(props.encodingRecipeData.uploadWatermarkUrl && watermarkFileFile) {
            props.uploadWatermark(watermarkFileFile, props.encodingRecipeData.uploadWatermarkUrl).then(() => {
                {setUploadButtonLoading(false)}
            }).catch(() => {
                {setUploadButtonLoading(false)}
            })
        }
    }, [props.encodingRecipeData.uploadWatermarkUrl])

    return (
        <div className="block clearfix">
            <RecipeNameRow isMobile={isMobile} className="col col-12 mb1">

                <Input className="col md-col-6 col-12 pr2" value={props.stepperData ? props.stepperData.name : ""} required label="Recipe Name" onChange={(event) => {
                    event.preventDefault();
                    props.updateStepperData({ ...props.stepperData, ["name"]: event.currentTarget.value });
                    props.setStepValidated(event.currentTarget.value.length > 0)
                }
                } />
                <DefaultRecipeCheckbox isMobile={isMobile} className="col sm-col-6 col-12 pt3" defaultChecked={props.stepperData.isDefault}  id="defaultRecipe" label="Save as default Recipe"
                    onChange={(event) => {
                        props.updateStepperData({ ...props.stepperData, ["isDefault"]: event.currentTarget.checked })
                    }
                    } />
            </RecipeNameRow>
            <div className="col mt2 col-12">
                <input type='file' ref={watermarkBrowseButtonRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{display:'none'}} id='browseButton' accept="image/png, image/jpeg" />
                <Text className="col col-12" size={16} weight="med" >Watermark</Text>
                <Text className="col col-12 mt1" size={14} weight="reg">Add a watermark to videos to help prevent plagiarism</Text>
                <Button onClick={() => {watermarkBrowseButtonRef.current.click()} } isLoading={uploadButtonLoading} className=" mt2" sizeButton="xs" typeButton="secondary">
                    Upload File  
                </Button>
                <Text className="col col-12 mt1" size={10} weight="reg" color="gray-5">Max file size is 1MB</Text>
                {props.stepperData.watermarkFilename &&
                    <div>
                        {props.stepperData.isUploading ? <SpinnerContainer style={{zIndex: 1000}}>
                            <LoadingSpinner className='mx-auto' color='violet' size='small' /> 
                        </SpinnerContainer>: 
                            <WatermarkFile className="col mt1">
                                <UploadText className="ml2" color="gray-1" size={14} weight="reg">{props.stepperData.watermarkFilename}</UploadText>
                                <WatermarkDeleteButton>
                                    <IconStyle className='pointer' onClick={() => {props.deleteWatermark(props.stepperData);props.updateStepperData({ ...props.stepperData, watermarkFilename: null })}} style={{ fontSize: "14px" }}>close</IconStyle>
                                </WatermarkDeleteButton>
                            </WatermarkFile>
                        }
                        
                        <Text className="col col-12 mt3" size={16} weight="med">Positioning</Text>
                        <div className="flex flex-end col col-12">
                            <Input suffix={<Text weight="med" size={14} color="gray-3">px</Text>} disabled={!props.stepperData.watermarkFilename} defaultValue={props.stepperData.watermarkFilename && props.stepperData.watermarkPositioningLeft ? props.stepperData.watermarkPositioningLeft.toString() : "10"} className="col lg-col-3 col-6 pr1" required label="Left"
                                onChange={(event) => {
                                    event.preventDefault();
                                    props.updateStepperData({ ...props.stepperData, ["watermarkPositioningLeft"]: parseInt(event.currentTarget.value) })
                                }
                                }
                            />
                            <Input suffix={<Text weight="med" size={14} color="gray-3">px</Text>} disabled={!props.stepperData.watermarkFilename} defaultValue={props.stepperData.watermarkFilename && props.stepperData.watermarkPositioningRight ? props.stepperData.watermarkPositioningRight.toString() : "10"} className="col lg-col-3 col-6 pl1" required label="Right"
                                onChange={(event) => {
                                    event.preventDefault();
                                    props.updateStepperData({ ...props.stepperData, ["watermarkPositioningRight"]: parseInt(event.currentTarget.value) })
                                }
                                }
                            />
                        </div>

                    </div>
                    }
            </div>
        </div>
    )
}

const RecipeNameRow = styled.div<{ isMobile: boolean }>`
align-items: center;

${props => props.isMobile && css`
        align-items: flex-start;
        flex-direction: column;
    `};
`
const DefaultRecipeCheckbox = styled(InputCheckbox) <{ isMobile: boolean }>`

    ${props => props.isMobile && css`
        margin-left: 0;
    `};
`
const WatermarkFile = styled.div`
    display: flex;
    background-color: ${props => props.theme.colors["gray-10"]};
    height: 32px;
    align-items: center;
    justify-content: space-between;
    max-width: 90%;
`
const WatermarkDeleteButton = styled.button`
    border: none; 
    background-color: inherit;
    display: flex; 
    justify-content: center;
        :focus {
            outline: none;
        }
`