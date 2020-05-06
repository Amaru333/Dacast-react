import { EncodingRecipeItem, RecipePreset } from '../../../redux-flow/store/Settings/EncodingRecipes/EncodingRecipesTypes';
import styled, { css } from 'styled-components';
import React from 'react';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { Text } from "../../../../components/Typography/Text"
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { IconStyle } from '../../../../shared/Common/Icon';
import { Table } from '../../../../components/Table/Table';
import { isMobile } from "react-device-detect";
import { LoadingSpinner } from '../../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

//STEPS
export const settingsStep = (props: {stepperData: EncodingRecipeItem; updateStepperData: Function; setStepValidated: Function; usefulFunctions: {[key: string]: Function}; staticStepperData: {[key: string]: any}}) => {

    React.useEffect(() => {
        if (props.stepperData) { props.setStepValidated(props.stepperData.name.length > 0) }
    })

    const [watermarkFileFile, setWatermarkFile] = React.useState<File>(null);

    const handleUpload = () => {
        props.usefulFunctions['getUploadUrl']();       
    }

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.files && e.target.files.length > 0) {
            setWatermarkFile(e.target.files[0])
            props.updateStepperData({...props.stepperData, watermarkFilename: e.target.files[0].name})
            handleUpload()
        }
    }

    React.useEffect(() => {
        if(props.staticStepperData['watermarkFileID']) {
            props.updateStepperData({...props.stepperData, watermarkFileID: props.staticStepperData['watermarkFileID']})
        }
    }, [props.staticStepperData['watermarkFileID']])

    React.useEffect(() => {
        if(props.staticStepperData['uploadWatermarkUrl'] && watermarkFileFile) {
            props.usefulFunctions['uploadWatermark'](watermarkFileFile, props.staticStepperData['uploadWatermarkUrl'])
        }
    }, [props.staticStepperData['uploadWatermarkUrl']])

    return (
        <StepContent className="clearfix">
            <RecipeNameRow isMobile={isMobile} className="col col-12 mb1">

                <RecipeNameInput isMobile={isMobile} className="col md-col-6 col-12 pr2" value={props.stepperData ? props.stepperData.name : ""} required label="Recipe Name" onChange={(event) => {
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
            <WatermarkContainer isMobile={isMobile} className="col mt2 col-12">
                <Text className="col col-12" size={16} weight="med" >Watermark</Text>
                <Text className="col col-12 mt1" size={14} weight="reg">Add a watermark to videos to help prevent plagiarism</Text>
                <Button className="lg-col-2 sm-col-3 col-3 mt2" sizeButton="xs" typeButton="secondary">
                    <label className='pointer' htmlFor='browseButton'>
                        <input type='file' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{display:'none'}} id='browseButton' />
                        Browse Files   
                    </label>    
                </Button>
                <Text className="col col-12 mt1" size={10} weight="reg" color="gray-5">Max file size is 1MB</Text>
                {props.stepperData.watermarkFilename ?
                    <div>
                        {props.stepperData.isUploading ? <SpinnerContainer style={{zIndex: 1000}}>
                                    <LoadingSpinner className='mx-auto' color='violet' size='small' /> 
                                </SpinnerContainer>: 
                            <WatermarkFile className="col lg-col-6 md-col-6 col-12 mt1">
                            <Text className="ml2" color="gray-1" size={14} weight="reg">{props.stepperData.watermarkFilename}</Text>
                            <WatermarkDeleteButton>
                                <IconStyle className='pointer' onClick={() => {props.usefulFunctions['deleteWatermark'](props.stepperData);props.updateStepperData({ ...props.stepperData, watermarkFilename: null })}} style={{ fontSize: "14px" }}>close</IconStyle>
                            </WatermarkDeleteButton>
                        </WatermarkFile>
                            }
                        
                        <Text className="col col-12 mt3" size={16} weight="med">Positioning</Text>
                        <PositioningRow className="col col-12">
                            <Input suffix={<Text weight="med" size={14} color="gray-3">px</Text>} disabled={!props.stepperData.watermarkFilename} value={props.stepperData.watermarkFilename && props.stepperData.watermarkPositioningLeft ? props.stepperData.watermarkPositioningLeft.toString() : "10"} className="col lg-col-3 col-6 pr1" required label="Left"
                                onChange={(event) => {
                                    event.preventDefault();
                                    props.updateStepperData({ ...props.stepperData, ["watermarkPositioningLeft"]: parseInt(event.currentTarget.value) })
                                }
                                }
                            />
                            <Input suffix={<Text weight="med" size={14} color="gray-3">px</Text>} disabled={!props.stepperData.watermarkFilename} value={props.stepperData.watermarkFilename && props.stepperData.watermarkPositioningRight ? props.stepperData.watermarkPositioningRight.toString() : "10"} className="col lg-col-3 col-6 pl1" required label="Right"
                                onChange={(event) => {
                                    event.preventDefault();
                                    props.updateStepperData({ ...props.stepperData, ["watermarkPositioningRight"]: parseInt(event.currentTarget.value) })
                                }
                                }
                            />
                        </PositioningRow>

                    </div>
                    : null}
            </WatermarkContainer>
        </StepContent>
    )
}

export const presetStep = (props: {stepperData: EncodingRecipeItem; updateStepperData: Function; setStepValidated: Function; finalFunction: Function; staticStepperData: {[key: string]: any}}) => {

    const createRecipeHeaderElement = () => {
        return {data: [
            {cell: <Text key={'encodingRecipesPage_Present'} size={14} weight="med">Rendition</Text>},
            {cell: <Text key={'encodingRecipesPage_SizePx'} size={14} weight="med">Size (Px)</Text>},
            {cell: <Text key={'encodingRecipesPage_BitrateMbps'} size={14} weight="med">Bitrate (Mbps)</Text>},
        ]}
    }

    const createRecipeBodyElement = () => {

        React.useEffect(() => {
            props.setStepValidated(props.stepperData.recipePresets.length > 0)
        }, [])
        if(props.staticStepperData['recipePresets']) {
            let presets: RecipePreset[] = props.staticStepperData['recipePresets']
            return presets.map((value, key) => {
    
                return {data: [
                    <InputCheckbox key={key + value.name} label={value.description} defaultChecked={props.stepperData.recipePresets.includes(value.name)} id={value.name} onChange={(event) => {
                        if (event.currentTarget.checked && props.stepperData.recipePresets.length < 6) {
                            props.updateStepperData({ ...props.stepperData }, props.stepperData.recipePresets.push(value.name))
                            props.setStepValidated(props.stepperData.recipePresets.length >= 1)
                        } else {
                            const editedRecipePresets = props.stepperData.recipePresets.filter(item => item !== value.name)
                            props.setStepValidated(editedRecipePresets.length >= 1)
                            props.updateStepperData({ ...props.stepperData, ["recipePresets"]: editedRecipePresets })
                        }
                    }
                    } />,
                    <Text key={'encodingRecipesPage_' + value.size + key} size={14} weight="reg">{value.size}</Text>,
                    <Text key={'encodingRecipesPage_' + value.bitrate + key} size={14} weight="reg">{value.bitrate ? value.bitrate / 1000 : null}</Text>,
                ]}
            })
        }
    
    }
    return (
        <StepContent className="clearfix">
            <Text weight='reg' size={14}>
                Provide your audience with the best viewing experience. Select up to 6 encoding presets from the table below and we will encode based on your choices.
            </Text>
            <Table tableHeight={300} className="col col-12 mt2" headerBackgroundColor="gray-10" id="createRecipe" header={createRecipeHeaderElement()} body={createRecipeBodyElement()} />
            <div className="flex col col-12 mt3">
                <IconStyle style={{ marginRight: "10px" }}>info_outlined</IconStyle>
                <Text size={14} weight="reg">Need help choosing your presets? Visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
            </div>
        </StepContent>
    )
}

const StepContent = styled.div`
    display: block;
`

const RecipeNameRow = styled.div<{ isMobile: boolean }>`
align-items: center;

${props => props.isMobile && css`
        align-items: flex-start;
        flex-direction: column;
    `};
`

const RecipeNameInput = styled(Input) <{ isMobile: boolean }>`

`

const DefaultRecipeCheckbox = styled(InputCheckbox) <{ isMobile: boolean }>`

    ${props => props.isMobile && css`
        margin-left: 0;
    `};
`

const WatermarkContainer = styled.div<{ isMobile: boolean }>`

`

const WatermarkFile = styled.div`
    display: flex;
    background-color: ${props => props.theme.colors["gray-10"]};
    height: 32px;
    align-items: center;
    justify-content: space-between;
`

const PositioningRow = styled.div`
display: flex;
align-items: flex-end;
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