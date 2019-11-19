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

const recipesBodyElement = () => {

    

    return [[
        <Text size={14} weight="reg">Default recipe</Text>,
        <Icon>check</Icon>,
        <></>
    ],
    [
        <Text size={14} weight="reg">Jake's amazing recipe</Text>,
        <></>,
        <></>
    ],
    ]
}

const recipesHeaderElement = (FunctionRecipe: Function) => {
    return[
        <Text size={14} weight="med">Name</Text>,
        <Text size={14} weight="med">Default</Text>,
        <Button className="right mr2" typeButton="secondary" sizeButton="xs" onClick={() => FunctionRecipe(true)}>Create Recipe</Button>
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
        <Text size={14} weight="reg">Presets step content</Text>
    )
}

const submitRecipe = () => {
    console.log("recipe created")
}

const stepList = [settingsStep, presetStep]

const EncodingRecipes = () => {

    const [createRecipeStepperOpen, setCreateRecipeStepperOpen] = React.useState<boolean>(false)

    function FunctionRecipe(value: boolean) {setCreateRecipeStepperOpen(value)}

    return(
        <Card className="col-12 clearfix p50">
            <HeaderStyle>
                <Text size={20} weight="reg">Encoding Recipes</Text>
                <Icon style={{marginLeft: "10px"}}>info</Icon>
            </HeaderStyle>
            <Text size={14} weight="reg">Ingest recipes allow you to create a re-usable group of presets to customize how your videos are encoded and delivered.</Text>
            <Table style={{marginTop: "24px"}} className="col-12" id='lol' header={recipesHeaderElement(FunctionRecipe)} body={recipesBodyElement()}></Table>
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