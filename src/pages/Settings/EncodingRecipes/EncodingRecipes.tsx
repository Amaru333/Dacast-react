import * as React from 'react'
import { Card } from '../../../components/Card/Card';
import { Text } from "../../../components/Typography/Text"
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Table } from '../../../components/Table/Table';
import { Icon } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { CustomStepper } from '../../../components/Stepper/Stepper';
import { EncodingRecipeItem, EncodingRecipesData } from '../../../redux-flow/store/Settings/EncodingRecipes/EncodingRecipesTypes';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { settingsStep, presetStep } from './EncodingRecipesSteps';
import { useMedia } from '../../../utils/utils';
import { Modal, ModalContent, ModalFooter } from '../../../components/Modal/Modal';
import { Label } from '../../../components/FormsComponents/Label/Label';
import { TableContainer } from '../../../components/Table/TableStyle';
import { isMobile } from 'react-device-detect';

export interface EncodingRecipesComponentProps {
    encodingRecipeData: EncodingRecipesData;
    getEncodingRecipes: Function;
    createEncodingRecipe: Function;
    saveEncodingRecipe: Function;
    deleteEncodingRecipe: Function;
}

const recipesBodyElement = (encodingRecipeData: EncodingRecipesData,  editRecipe: Function, setDeleteWarningModalOpen: Function, setDeletedRecipe: Function, emptyRecipe: EncodingRecipeItem) => {
    return ( 
        encodingRecipeData.recipes.map((value, key) => {
        
            return (
                key === 0 ? 
                    [<Text key={'encodingRecipesPage_dacastRecipe'} size={14} weight="reg">{encodingRecipeData.recipes[0].name}</Text>,
                        <Icon key={'encodingRecipesPage_isDefaultIcon'} style={{color:"green"}}>{encodingRecipeData.recipes[0].isDefault ? "check" : null}</Icon>,
                        <div className="flex flex-row" key={"encodingRecipesPage_labelContainer_default"}>
                            {    encodingRecipeData.recipes[0].recipePresets.map((recipe, key) => {
                                return (
                                    <RenditionLabel key={'encodingRecipesPage_renditions_' + key + recipe} size={14} weight="reg" color="gray-1" backgroundColor="gray-8" label={recipe} />
                                )
                            }
                            )}
                        </div>,
                        <IconContainer key={"encodingRecipesPage_iconContainer_default"}></IconContainer>
                    ]
                
                    :
                    [<Text key={'encodingRecipesPage_' + value.name + key} size={14} weight="reg">{value.name}</Text>,
                        <Icon key={'encodingRecipesPage_isDefaultIcon' + key} style={{color:"green"}}>{value.isDefault ? "check" : null}</Icon>,
                        <div key={"encodingRecipesPage_labelContainer_" + key}>
                            {    value.recipePresets.map((recipe, key) => {
                                return (
                                    <RenditionLabel key={'encodingRecipesPage_renditions_' + key + recipe} size={14} weight="reg" color="gray-1" backgroundColor="gray-8" label={recipe} />
                                )
                            }
                            )}
                        </div>,
                        <IconContainer key={ 'encodingRecipesPage_actionIcons' + key} className="iconAction">
                    
                            <Icon onClick={() => {setDeleteWarningModalOpen(true);setDeletedRecipe(value)}}>delete</Icon>
                            <Icon onClick={() => editRecipe(value)}>edit</Icon> 
                        </IconContainer>
                    ]
            )
        })
    )
}

const recipesHeaderElement = (newRecipe: Function, smScreen: boolean) => {
    return[
        <Text key={'encodingRecipesPage_TableNameHeader'} size={14} weight="med">Name</Text>,
        <Text key={'encodingRecipesPage_TableDefaultHeader'} size={14} weight="med">Default</Text>,
        <Text key={'encodingRecipesPage_TableRenditionsHeader'} size={14} weight="med">Renditions</Text>,
        <Button key={'encodingRecipesPage_TableCreateRecipeButtonHeader'} className={"right mr2 "+ (smScreen ? 'hide' : '')} typeButton="secondary" sizeButton="xs" onClick={() => newRecipe()}>Create Recipe</Button>
    ]
}

const submitRecipe = (selectedRecipe: EncodingRecipeItem | false, FunctionRecipe: Function, createEncodingRecipe: Function, saveEncodingRecipe: Function) => {
    if(selectedRecipe) {
        if (selectedRecipe.id) {
            saveEncodingRecipe(selectedRecipe)
        } else
        {
            createEncodingRecipe(selectedRecipe)
        }
        FunctionRecipe(false)
    }

}

const stepList = [settingsStep, presetStep]

export const EncodingRecipesPage = (props: EncodingRecipesComponentProps) => {

    React.useEffect(() => {
        props.getEncodingRecipes();
    }, [])

    let smScreen = useMedia('(max-width: 780px)');

    const emptyRecipe: EncodingRecipeItem = {id: "", name: "", isDefault: false, recipePresets: ["720p", "480p", "240p", "MagicEncoding"], watermarkFile: "sick_watermark.png", watermarkPositioningLeft: 0, watermarkPositioningRight: 0}
   
    const [createRecipeStepperOpen, setCreateRecipeStepperOpen] = React.useState<boolean>(false)
    const [selectedRecipe, setSelectedRecipe] = React.useState<EncodingRecipeItem | false>(false);
    const [deleteWarningModalOpen, setDeleteWarningModalOpen] = React.useState<boolean>(false);
    const [deletedRecipe, setDeletedRecipe] = React.useState<EncodingRecipeItem>(emptyRecipe)

    const FunctionRecipe = (value: boolean) => {setCreateRecipeStepperOpen(value)}

    const editRecipe = (recipe: EncodingRecipeItem) => {
        setSelectedRecipe(recipe);
        FunctionRecipe(true);
    }

    const newRecipe = () => {
        setSelectedRecipe(emptyRecipe);
        FunctionRecipe(true);
    }
    return(
        !props.encodingRecipeData? 
            <LoadingSpinner size='large' color='blue80' />
            :
            <Card className="col-12 clearfix p50">
                <HeaderStyle>
                    <Text size={20} weight="reg">Encoding Recipes</Text>
                </HeaderStyle>
                <Text size={14} weight="reg">Encoding recipes allow you to encode your videos during upload so they can be played immediately.</Text>
                <div className="flex col col-12 mt2 mb25">
                    <Icon style={{marginRight: "10px"}}>info_outlined</Icon>
                    <Text  size={14} weight="reg">Need help understanding Encoding Recipes? Visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                </div>
                <Button className={"left mb2 "+ (!smScreen ? 'hide' : '')} typeButton="secondary" sizeButton="xs" onClick={() => newRecipe()}>Create Recipe</Button>
                <RecipesTable isMobile={isMobile} className="col-12 mt3" id='encodingRecipeList' header={recipesHeaderElement(newRecipe, smScreen)} body={recipesBodyElement(props.encodingRecipeData, editRecipe, setDeleteWarningModalOpen, setDeletedRecipe, emptyRecipe)} />
                <CustomStepper
                    opened={createRecipeStepperOpen}
                    stepperHeader={selectedRecipe === false || !selectedRecipe.id ? "Create Recipe" : "Edit Recipe"}
                    stepList={stepList}
                    nextButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Next"}} 
                    backButtonProps={{typeButton: "secondary", sizeButton: "large", buttonText: "Back"}} 
                    cancelButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Cancel"}}
                    stepTitles={["Settings", "Presets"]}
                    lastStepButton="Save"
                    functionCancel={FunctionRecipe}
                    finalFunction={() => submitRecipe(selectedRecipe, FunctionRecipe, props.createEncodingRecipe, props.saveEncodingRecipe)}
                    stepperData={selectedRecipe}
                    updateStepperData={(value: EncodingRecipeItem) => {setSelectedRecipe(value)}}
                />
                <Modal size="small" title="Delete Recipe" icon={{name: "warning", color: "red"}} opened={deleteWarningModalOpen} toggle={() => setDeleteWarningModalOpen(false)} hasClose={false}>
                    <ModalContent>
                        <Text size={14} weight="reg">Are you sure that you want to delete {deletedRecipe.name}?</Text>
                        <Text size={14} weight="med">Please note any unsaved schanges will be lost.</Text>
                    </ModalContent>
                    <ModalFooter>
                        <Button onClick={() => {props.deleteEncodingRecipe(deletedRecipe);setDeleteWarningModalOpen(false)}}>Delete</Button>
                        <Button typeButton="tertiary" onClick={() => setDeleteWarningModalOpen(false)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Card>
    )
}

const HeaderStyle = styled.div`
display: flex;
align-content: center;
margin-bottom: 16px;
`

const IconContainer = styled.div`
    float:right;
    .material-icons{
        margin-right:16px;
        color:  ${props => props.theme.colors["gray-1"]};
    }
   ` 

const RenditionLabel = styled(Label)`
    margin: 14px 4px;
`

const RecipesTable = styled(Table)<{isMobile: boolean}>`
    ${props => props.isMobile && css`
        ${TableContainer} {
        width: 350%;
    }
    `}
`