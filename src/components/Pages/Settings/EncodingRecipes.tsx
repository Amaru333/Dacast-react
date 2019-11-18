import * as React from 'react'
import { Card } from '../../Card/Card';
import { Text } from "../../Typography/Text"
import { Button } from '../../FormsComponents/Button/Button';
import { Table } from '../../Table/Table';
import { Icon } from '@material-ui/core';
import styled from 'styled-components';
import { CustomStepper } from '../../Stepper/Stepper';



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

const recipesHeaderElement = () => {
    return[
        <Text size={14} weight="med">Name</Text>,
        <Text size={14} weight="med">Default</Text>,
        <Button className="right mr2" typeButton="secondary" sizeButton="xs" onClick={() => console.log("clicky")}>Create Recipe</Button>
    ]
}

const settingsStep = () => {
    return (
        <Text size={14} weight="reg">Settings step content</Text>
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
    return(
        <Card className="col-12 clearfix p50">
            <HeaderStyle>
                <Text size={20} weight="reg">Encoding Recipes</Text>
                <Icon style={{marginLeft: "10px"}}>info</Icon>
            </HeaderStyle>
            <Text size={14} weight="reg">Ingest recipes allow you to create a re-usable group of presets to customize how your videos are encoded and delivered.</Text>
            <Table style={{marginTop: "24px"}} className="col-12" id='lol' header={recipesHeaderElement()} body={recipesBodyElement()}></Table>
            <CustomStepper
            stepperHeader="Create Recipes"
            stepList={stepList}
            nextButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Next"}} 
            backButtonProps={{typeButton: "secondary", sizeButton: "large", buttonText: "Back"}} 
            cancelButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Cancel"}}
            stepTitles={["Settings", "Presets"]}
            lastStepButton="Create"
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