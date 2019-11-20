import * as React from 'react'
import { Card } from '../../Card/Card';
import { Text } from "../../Typography/Text"
import { Button } from '../../FormsComponents/Button/Button';
import { Table } from '../../Table/Table';
import { Icon } from '@material-ui/core';
import styled from 'styled-components';
import { CustomStepper } from '../../Stepper/Stepper';
import { Input } from '../../FormsComponents/Input/Input';
import { InputCheckbox } from '../../FormsComponents/Input/InputCheckbox';
import { EncodingRecipeItem } from './EncodingRecipesTypes';


const recipesBodyElement = (recipeData: EncodingRecipeItem) => {

    return [[
        <Text size={14} weight="reg">Default recipe</Text>,
        <Icon>check</Icon>,
        <IconContainer className="iconAction"><Icon>delete</Icon><Icon >edit</Icon> </IconContainer>
    ],
    [
        <Text size={14} weight="reg">Jake's amazing recipe</Text>,
        <></>,
        <></>
    ],
    [
        <Text size={14} weight="reg">{recipeData.name}</Text>,
        <></>,
        <IconContainer className="iconAction"><Icon>delete</Icon><Icon >edit</Icon> </IconContainer>
    ]
    ]
}

const recipesHeaderElement = (FunctionRecipe: Function) => {
    return[
        <Text size={14} weight="med">Name</Text>,
        <Text size={14} weight="med">Default</Text>,
        <Button className="right mr2" typeButton="secondary" sizeButton="xs" onClick={() => FunctionRecipe(true)}>Create Recipe</Button>
    ]
}

const createRecipeHeaderElement = () => {
    return[
        <></>,
        <Text size={14} weight="med">Preset</Text>,
        <Text size={14} weight="med">Size (Px)</Text>,
        <Text size={14} weight="med">Bitrate (Mbps)</Text>
    ]
}

const createRecipeBodyElement = () => {
    return [
        [
            <InputCheckbox id="2160p" />,
            <Text size={14} weight="reg">4K - 2160p</Text>,
            <Text size={14} weight="reg">3480</Text>,
            <Text size={14} weight="reg">68</Text>
        ],
        [
            <InputCheckbox id="1140p" />,
            <Text size={14} weight="reg">2K - 1440p</Text>,
            <Text size={14} weight="reg">2560</Text>,
            <Text size={14} weight="reg">24</Text>
        ],
        [
            <InputCheckbox id="1080p" />,
            <Text size={14} weight="reg">HD - 1080p</Text>,
            <Text size={14} weight="reg">1920</Text>,
            <Text size={14} weight="reg">12</Text>
        ],
        [
            <InputCheckbox id="720p" />,
            <Text size={14} weight="reg">SD - 720p</Text>,
            <Text size={14} weight="reg">1280</Text>,
            <Text size={14} weight="reg">7.5</Text>
        ],
        [
            <InputCheckbox id="480p" />,
            <Text size={14} weight="reg">LD - 480p</Text>,
            <Text size={14} weight="reg">854</Text>,
            <Text size={14} weight="reg">4</Text>
        ],
        [
            <InputCheckbox id="360p" />,
            <Text size={14} weight="reg">SLD - 360p</Text>,
            <Text size={14} weight="reg">640</Text>,
            <Text size={14} weight="reg">1.5</Text>
        ],
        [
            <InputCheckbox id="240p" />,
            <Text size={14} weight="reg">ULD - 240p</Text>,
            <Text size={14} weight="reg">426</Text>,
            <Text size={14} weight="reg">0.5</Text>
        ]
    ]
}

const extraEncodingOptionsBodyElement = () => {
    return [
        [
            <InputCheckbox id="magicEncoding" />,
            <Text size={14} weight="reg">Magic Encoding</Text>,
            <Text size={14} weight="reg">Auto</Text>,
            <Text size={14} weight="reg">7.5</Text>
        ],
        [<InputCheckbox id="DNE" />,
            <Text size={14} weight="reg">DNE - Do Not Encode</Text>,
            <Text size={14} weight="reg">Auto</Text>,
            <Text size={14} weight="reg">Auto</Text>
        ]
    ]
}

const settingsStep = () => {
    return (
       <StepContent className="clearfix">
           <RecipeNameRow className="col-12 mb1">
                <RecipeNameInput className="col-6" required label="Recipe Name" />
                <DefaultRecipeCheckbox className="col-6" style={{marginLeft: "16px"}} id="defaultRecipe" label="Save as default Recipe" />
           </RecipeNameRow>
           <Text className="col col-12 mt2" size={16} weight="med" >Watermark</Text>
           <Text className="col col-12 mt1" size={14} weight="reg">Add a watermark to videos to help prevent plagiarism</Text>
           <Button className="col-2 mt1" sizeButton="xs" typeButton="secondary">Upload File</Button>
           <Text className="col col-12 mt1" size={10} weight="reg" color="gray-5">Max file size is 1MB</Text>
           <WatermarkFile className="col col-6 mt1">
                <Text className="ml2" color="gray-1" size={14} weight="reg">my_watermark.png</Text>
                <button style={{border: "none", backgroundColor:"inherit"}}>
                    <Icon style={{fontSize: "14px"}}>close</Icon>
                </button>   
           </WatermarkFile>
           <Text className="col col-12 mt3" size={16} weight="med">Positioning</Text>
           <PositioningRow className="col col-12">
                
                <Input className="col col-2" required label="Left"></Input>
                <Suffix className="col col-1 mr2" >
                    <Text weight="med" size={14} color="gray-3">px</Text>
                </Suffix>
                <Input className="col col-2" required label="Right"></Input>
                <Suffix className="col col-1" >
                    <Text weight="med" size={14} color="gray-3">px</Text>
                </Suffix>
           </PositioningRow>
           
       </StepContent>
    )
}

const presetStep = () => {
    return (
        <StepContent className="clearfix">
            <Text weight='reg' size={14}>
                Provide your audience with the best viewing experience. Select up to 4 encoding presets from the table below and we will encode based on your choices.
            </Text>
            <Table className="col col-12 mt2" id="createRecipe" header={createRecipeHeaderElement()} body={createRecipeBodyElement()} />
            <Text className="col col-12 mt25" size={14} weight="reg">And you can also select one of the following to also be encoded if you want</Text>
            {/* extraEncodingOptions table to have header removed */}
            <Table className="col col-12 mt1" id="extraEncodingOptions" body={extraEncodingOptionsBodyElement()} />
            <div className="flex col col-12 mt3">
                <Icon style={{marginRight: "10px"}}>info</Icon>
                <Text  size={14} weight="reg">Need help choosing your presets? Visit the Knowledge Base</Text>
            </div>
        </StepContent>
    )
}

const submitRecipe = () => {
    console.log("recipe created")
}

const stepList = [settingsStep, presetStep]

const EncodingRecipes = () => {

    const recipeData: EncodingRecipeItem = {name: "Sick new Recipe", isDefault: false, recipePresets: ["2160p", "1440p", "1080p", "720p"]}

    const [createRecipeStepperOpen, setCreateRecipeStepperOpen] = React.useState<boolean>(false)

    function FunctionRecipe(value: boolean) {setCreateRecipeStepperOpen(value)}

    return(
        <Card className="col-12 clearfix p50">
            <HeaderStyle>
                <Text size={20} weight="reg">Encoding Recipes</Text>
                <Icon style={{marginLeft: "10px"}}>info</Icon>
            </HeaderStyle>
            <Text size={14} weight="reg">Ingest recipes allow you to create a re-usable group of presets to customize how your videos are encoded and delivered.</Text>
            <Table style={{marginTop: "24px"}} className="col-12" id='lol' header={recipesHeaderElement(FunctionRecipe)} body={recipesBodyElement(recipeData)} />
            <CustomStepper
            opened={createRecipeStepperOpen}
            stepperHeader="Create Recipes"
            stepList={stepList}
            nextButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Next"}} 
            backButtonProps={{typeButton: "secondary", sizeButton: "large", buttonText: "Back"}} 
            cancelButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Cancel"}}
            stepTitles={["Settings", "Presets"]}
            lastStepButton="Create"
            functionCancel={FunctionRecipe}
            finalFunction={submitRecipe}/>
        </Card>
    )
}

export default (EncodingRecipes)

const HeaderStyle = styled.div`
display: flex;
align-content: center;
margin-bottom: 16px;
`

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

const Suffix = styled.div`
    height: 40px;
    width: 40px;
    background-color: ${props => props.theme.colors["gray-8"]};
    border: 1px solid ${props => props.theme.colors["gray-7"]} ;
    border-left-style: none;
    display: flex;
    align-items: center;
    justify-content: center;

`

const PositioningRow = styled.div`
display: flex;
align-items: flex-end;
`

const IconContainer = styled.div`
    float:right;
    display:none;
    .material-icons{
        margin-right:16px;
        color:  ${props => props.theme.colors["gray-1"]};
    }
   ` 