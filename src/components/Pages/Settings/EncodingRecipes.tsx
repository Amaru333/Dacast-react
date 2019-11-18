import * as React from 'react'
import { Card } from '../../Card/Card';
import { Text } from "../../Typography/Text"
import { Button } from '../../FormsComponents/Button/Button';


const recipesBodyElement = () => {
    return [
        <Text size={14} weight="reg">Default recipe</Text>,
        <Text size={14} weight="reg">Jake's amazing recipe</Text>,
        <Text size={14} weight="reg">Silly billy recipe</Text>

    ]
}

const recipesHeaderElement = () => {
    return[
        <Text size={14} weight="med">Name</Text>,
        <Text size={14} weight="med">Default</Text>,
        <Button typeButton="secondary">Create Recipe</Button>
    ]
}

const EncodingRecipes = () => {
    return(
        <Card>
            <header style={{paddingBottom: "16px"}}>
                <Text size={20} weight="reg">Encoding Recipes</Text>
            </header>
            <Text size={14} weight="reg">Ingest recipes allow you to create a re-usable group of presets to customize how your videos are encoded and delivered.</Text>
        </Card>
    )
}

export default (EncodingRecipes)