import { EncodingRecipeItem } from '../../../../redux-flow/store/Settings/EncodingRecipes/EncodingRecipesTypes';
import styled from 'styled-components';
import React from 'react';
import { Input } from '../../../FormsComponents/Input/Input';
import { InputCheckbox } from '../../../FormsComponents/Input/InputCheckbox';
import { Text } from "../../../Typography/Text"
import { Button } from '../../../FormsComponents/Button/Button';
import { Icon } from '@material-ui/core';
import { Table } from '../../../Table/Table';

//TABLE ELEMENTS
export const createRecipeHeaderElement = () => {
    return[
        <></>,
        <Text key={'encodingRecipesPage_Present'}size={14} weight="med">Rendition</Text>,
        <Text key={'encodingRecipesPage_SizePx'} size={14} weight="med">Size (Px)</Text>,
        <Text key={'encodingRecipesPage_BitrateMbps'} size={14} weight="med">Bitrate (Mbps)</Text>,
        <Text key={'encodingRecipesPage_MPX'} size={14} weight="med">MPX (16:9)</Text>
    ]
}

export const recipePresets = [
    {id: "2160p", rendition: "4K - 2160p", size: "3480", bitrate: "68", mpx: "7.52"},
    {id: "1440p", rendition: "2K - 1440p", size: "2560", bitrate: "24", mpx: "3.69"},
    {id: "1080p", rendition: "FHD - 1080p", size: "1920", bitrate: "12", mpx: "2.07"},
    {id: "720p", rendition: "HD - 720p", size: "1280", bitrate: "7.5", mpx: "0.92"},
    {id: "480p", rendition: "SD - 480p", size: "854", bitrate: "4", mpx: "0.41"},
    {id: "360p", rendition: "LD - 360p", size: "640", bitrate: "1.5", mpx: "0.23"},
    {id: "240p", rendition: "ULD - 240p", size: "426", bitrate: "0.5", mpx: "0.10"},
    {id: "MagicEncoding", rendition: "Magic Encoding", size: "7.5", bitrate: "auto", mpx: "Auto"},
    {id: "DNE", rendition: "Do Not Encode", size: "Auto", bitrate: "Auto", mpx: "Auto"}
]

export const createRecipeBodyElement = (stepperData: EncodingRecipeItem, setSelectedRecipe: Function, recipePresets: {[key: string]: string}[]) => {
    return recipePresets.map((value, key) => {
        return [
            <InputCheckbox key={key + value.id } defaultChecked={stepperData.recipePresets.includes(value.id)} id={value.id} onChange={(event) => 
            {
                if (event.currentTarget.checked && stepperData.recipePresets.length < 6) {
                    setSelectedRecipe({...stepperData}, stepperData.recipePresets.push(value.id))
                } else {
                    const editedRecipePresets = stepperData.recipePresets.filter(item => item !== value.id)
                    setSelectedRecipe({...stepperData, ["recipePresets"]: editedRecipePresets})
                }
            }
            } />,
            <Text key={'encodingRecipesPage_' + value.rendition + key} size={14} weight="reg">{value.rendition}</Text>,
            <Text key={'encodingRecipesPage_' + value.size + key} size={14} weight="reg">{value.size}</Text>,
            <Text key={'encodingRecipesPage_' + value.bitrate + key} size={14} weight="reg">{value.bitrate}</Text>,
            <Text key={'encodingRecipesPage_' + value.mpx + key} size={14} weight="reg">{value.mpx}</Text>
        ]
    })   
}

//STEPS
export const settingsStep = (stepperData: EncodingRecipeItem, setSelectedRecipe: Function) => {
    return (
        <StepContent className="clearfix">
            <RecipeNameRow className="col col-12 mb1">
                <RecipeNameInput value={stepperData ? stepperData.name : ""} className="col col-6" required label="Recipe Name" onChange={(event) => 
                {
                    event.preventDefault();
                    setSelectedRecipe({...stepperData, ["name"]: event.currentTarget.value})
                }
                } />
                <DefaultRecipeCheckbox defaultChecked={stepperData.isDefault} className="col-6" style={{marginLeft: "16px"}} id="defaultRecipe" label="Save as default Recipe" 
                    onChange={(event) => 
                    {   
                        setSelectedRecipe({...stepperData, ["isDefault"]: event.currentTarget.checked})
                    }
                    }/>
            </RecipeNameRow>
            <Text className="col col-12 mt2" size={16} weight="med" >Watermark</Text>
            <Text className="col col-12 mt1" size={14} weight="reg">Add a watermark to videos to help prevent plagiarism</Text>
            <Button className="col-2 mt1" sizeButton="xs" typeButton="secondary">Upload File</Button>
            <Text className="col col-12 mt1" size={10} weight="reg" color="gray-5">Max file size is 1MB</Text>
            {stepperData.watermarkFile ?
                <div>
                    <WatermarkFile className="col col-6 mt1">
                        <Text className="ml2" color="gray-1" size={14} weight="reg">{stepperData.watermarkFile}</Text>
                        <WatermarkDeleteButton>
                            <Icon style={{fontSize: "14px"}}>close</Icon>
                        </WatermarkDeleteButton>   
                    </WatermarkFile>
                    <Text className="col col-12 mt3" size={16} weight="med">Positioning</Text>
                    <PositioningRow className="col col-12">
                        <Input suffix={<Text weight="med" size={14} color="gray-3">px</Text>} disabled={!stepperData.watermarkFile} value={stepperData.watermarkFile ? stepperData.watermarkPositioningLeft.toString() : null }className="col col-2 mr2" required label="Left"
                            onChange={(event) => 
                            {
                                event.preventDefault();
                                setSelectedRecipe({...stepperData, ["watermarkPositioningLeft"]: event.currentTarget.value})
                            }
                            }
                        />
            
                        <Input suffix={<Text weight="med" size={14} color="gray-3">px</Text>} disabled={!stepperData.watermarkFile} value={stepperData.watermarkFile ? stepperData.watermarkPositioningRight.toString() : null} className="col col-2" required label="Right"
                            onChange={(event) => 
                            {
                                event.preventDefault();
                                setSelectedRecipe({...stepperData, ["watermarkPositioningRight"]: event.currentTarget.value})
                            }
                            }
                        />
                    </PositioningRow>
                </div> 
                : null} 
        </StepContent>
    )
}

export const presetStep = (stepperData: EncodingRecipeItem, setSelectedRecipe: Function) => {
    return (
        <StepContent className="clearfix">
            <Text weight='reg' size={14}>
                Provide your audience with the best viewing experience. Select up to 6 encoding presets from the table below and we will encode based on your choices.
            </Text>
            <Table className="col col-12 mt2" id="createRecipe" header={createRecipeHeaderElement()} body={createRecipeBodyElement(stepperData, setSelectedRecipe, recipePresets)} />
            <div className="flex col col-12 mt3">
                <Icon style={{marginRight: "10px"}}>info_outlined</Icon>
                <Text  size={14} weight="reg">Need help choosing your presets? Visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank">Knowledge Base</a></Text>
            </div>
        </StepContent>
    )
}

const StepContent = styled.div`
    display: block;
`

const RecipeNameRow = styled.div`
display: flex;
align-items: flex-end;
`

const RecipeNameInput = styled(Input)`
`

const DefaultRecipeCheckbox = styled(InputCheckbox)`
    margin-left: 16px;
    margin-bottom: 6px;
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