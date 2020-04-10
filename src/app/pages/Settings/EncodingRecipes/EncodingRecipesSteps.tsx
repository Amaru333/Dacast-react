import { EncodingRecipeItem } from '../../../redux-flow/store/Settings/EncodingRecipes/EncodingRecipesTypes';
import styled, { css } from 'styled-components';
import React from 'react';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { Text } from "../../../../components/Typography/Text"
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { IconStyle } from '../../../../shared/Common/Icon';
import { Table } from '../../../../components/Table/Table';
import { isMobile } from "react-device-detect";
import { useStepperFinalStepAction } from '../../../utils/useStepperFinalStepAction';

//TABLE ELEMENTS
export const createRecipeHeaderElement = () => {
    return {data: [
        {cell: <></>},
        {cell: <Text key={'encodingRecipesPage_Present'} size={14} weight="med">Rendition</Text>},
        {cell: <Text key={'encodingRecipesPage_SizePx'} size={14} weight="med">Size (Px)</Text>},
        {cell: <Text key={'encodingRecipesPage_BitrateMbps'} size={14} weight="med">Bitrate (Mbps)</Text>},
        {cell: <Text key={'encodingRecipesPage_MPX'} size={14} weight="med">MPX (16:9)</Text>}
    ]}
}

export const recipePresets = [
    { id: "4K", rendition: "4K - 2160p", size: "3480", bitrate: "68", mpx: "7.52" },
    { id: "2K", rendition: "2K - 1440p", size: "2560", bitrate: "24", mpx: "3.69" },
    { id: "FHD", rendition: "FHD - 1080p", size: "1920", bitrate: "12", mpx: "2.07" },
    { id: "HD", rendition: "HD - 720p", size: "1280", bitrate: "7.5", mpx: "0.92" },
    { id: "SD", rendition: "SD - 480p", size: "854", bitrate: "4", mpx: "0.41" },
    { id: "LD", rendition: "LD - 360p", size: "640", bitrate: "1.5", mpx: "0.23" },
    { id: "ULD", rendition: "ULD - 240p", size: "426", bitrate: "0.5", mpx: "0.10" },
    { id: "Magic", rendition: "Magic Encoding", size: "7.5", bitrate: "auto", mpx: "Auto" },
    { id: "DNE", rendition: "Do Not Encode", size: "Auto", bitrate: "Auto", mpx: "Auto" }
]

export const createRecipeBodyElement = (stepperData: EncodingRecipeItem, setSelectedRecipe: Function, recipePresets: { [key: string]: string }[], setStepValidated: Function) => {

    React.useEffect(() => {
        setStepValidated(stepperData.recipePresets.length > 0)
    }, [])

    return recipePresets.map((value, key) => {

        return {data: [
            <InputCheckbox key={key + value.id} defaultChecked={stepperData.recipePresets.includes(value.id)} id={value.id} onChange={(event) => {
                if (event.currentTarget.checked && stepperData.recipePresets.length < 6) {
                    setSelectedRecipe({ ...stepperData }, stepperData.recipePresets.push(value.id))
                    setStepValidated(stepperData.recipePresets.length >= 1)
                } else {
                    const editedRecipePresets = stepperData.recipePresets.filter(item => item !== value.id)
                    setStepValidated(editedRecipePresets.length >= 1)
                    setSelectedRecipe({ ...stepperData, ["recipePresets"]: editedRecipePresets })
                }
            }
            } />,
            <Text key={'encodingRecipesPage_' + value.rendition + key} size={14} weight="reg">{value.rendition}</Text>,
            <Text key={'encodingRecipesPage_' + value.size + key} size={14} weight="reg">{value.size}</Text>,
            <Text key={'encodingRecipesPage_' + value.bitrate + key} size={14} weight="reg">{value.bitrate}</Text>,
            <Text key={'encodingRecipesPage_' + value.mpx + key} size={14} weight="reg">{value.mpx}</Text>
        ]}
    })
}

//STEPS
export const settingsStep = (props: {stepperData: EncodingRecipeItem; updateStepperData: Function; setStepValidated: Function; usefulFunctions: {[key: string]: Function}}) => {

    React.useEffect(() => {
        if (props.stepperData) { props.setStepValidated(props.stepperData.name.length > 0) }
    })

    const [watermarkFileFile, setWatermarkFile] = React.useState<File>(null);

    //BALANCING HOOK
    React.useEffect(() => {

    })

    return (
        <StepContent className="clearfix">
            <RecipeNameRow isMobile={isMobile} className="col col-12 mb1">

                <RecipeNameInput isMobile={isMobile} className="col md-col-6 col-12" value={props.stepperData ? props.stepperData.name : ""} required label="Recipe Name" onChange={(event) => {
                    event.preventDefault();
                    props.updateStepperData({ ...props.stepperData, ["name"]: event.currentTarget.value });
                    props.setStepValidated(event.currentTarget.value.length > 0)
                }
                } />
                <DefaultRecipeCheckbox isMobile={isMobile} className="col sm-pl1 sm-col-3 col-6 sm-mt3" defaultChecked={props.stepperData.isDefault} style={{ marginLeft: "16px" }} id="defaultRecipe" label="Save as default Recipe"
                    onChange={(event) => {
                        props.updateStepperData({ ...props.stepperData, ["isDefault"]: event.currentTarget.checked })
                    }
                    } />
            </RecipeNameRow>
            <WatermarkContainer isMobile={isMobile} className="col mt2 col-12">
                <Text className="col col-12" size={16} weight="med" >Watermark</Text>
                <Text className="col col-12 mt1" size={14} weight="reg">Add a watermark to videos to help prevent plagiarism</Text>
                <Button className="lg-col-2 sm-col-3 col-3 mt2" sizeButton="xs" typeButton="secondary" onClick={() => props.updateStepperData({ ...props.stepperData, watermarkFile: "cool new watermark" })}>Upload File</Button>
                <Text className="col col-12 mt1" size={10} weight="reg" color="gray-5">Max file size is 1MB</Text>
                {props.stepperData.watermarkFileID ?
                    <div>
                        <WatermarkFile className="col lg-col-6 md-col-6 col-12 mt1">
                            <Text className="ml2" color="gray-1" size={14} weight="reg">{props.stepperData.watermarkFileID}</Text>
                            <WatermarkDeleteButton>
                                <IconStyle onClick={() => props.updateStepperData({ ...props.stepperData, watermarkFile: null })} style={{ fontSize: "14px" }}>close</IconStyle>
                            </WatermarkDeleteButton>
                        </WatermarkFile>
                        <Text className="col col-12 mt3" size={16} weight="med">Positioning</Text>
                        <PositioningRow className="col col-12">
                            <Input suffix={<Text weight="med" size={14} color="gray-3">px</Text>} disabled={!props.stepperData.watermarkFileID} value={props.stepperData.watermarkFileID ? props.stepperData.watermarkPositioningLeft.toString() : null} className="col lg-col-3 col-6 pr1" required label="Left"
                                onChange={(event) => {
                                    event.preventDefault();
                                    props.updateStepperData({ ...props.stepperData, ["watermarkPwositioningLeft"]: event.currentTarget.value })
                                }
                                }
                            />
                            <Input suffix={<Text weight="med" size={14} color="gray-3">px</Text>} disabled={!props.stepperData.watermarkFileID} value={props.stepperData.watermarkFileID ? props.stepperData.watermarkPositioningRight.toString() : null} className="col lg-col-3 col-6 pl1" required label="Right"
                                onChange={(event) => {
                                    event.preventDefault();
                                    props.updateStepperData({ ...props.stepperData, ["watermarkPositioningRight"]: event.currentTarget.value })
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

export const presetStep = (props: {stepperData: EncodingRecipeItem; updateStepperData: Function; setStepValidated: Function; finalFunction: Function}) => {

    useStepperFinalStepAction('stepperNextButton', props.finalFunction)

    return (
        <StepContent className="clearfix">
            <Text weight='reg' size={14}>
                Provide your audience with the best viewing experience. Select up to 6 encoding presets from the table below and we will encode based on your choices.
            </Text>
            <Table tableHeight={300} className="col col-12 mt2" headerBackgroundColor="gray-10" id="createRecipe" header={createRecipeHeaderElement()} body={createRecipeBodyElement(props.stepperData, props.updateStepperData, recipePresets, props.setStepValidated)} />
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