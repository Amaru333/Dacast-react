import * as React from 'react'
import { Card } from '../../../../components/Card/Card';
import { Text } from "../../../../components/Typography/Text"
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Table } from '../../../../components/Table/Table';
import { IconStyle, IconContainer, ActionIcon } from '../../../../shared/Common/Icon';
import styled, { css } from 'styled-components';
import { CustomStepper } from '../../../../components/Stepper/Stepper';
import { EncodingRecipeItem, EncodingRecipesData } from '../../../redux-flow/store/Settings/EncodingRecipes/EncodingRecipesTypes';
import { LoadingSpinner } from '../../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { Modal, ModalContent, ModalFooter } from '../../../../components/Modal/Modal';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { TableContainer } from '../../../../components/Table/TableStyle';
import { isMobile } from 'react-device-detect';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { getKnowledgebaseLink } from '../../../constants/KnowledgbaseLinks';
import { SetStateAction, Dispatch } from 'react';
import { RecipeSettingsStep } from './RecipeSettingsStep';
import { RecipePresetStep } from './RecipePresetsStep';

export interface EncodingRecipesComponentProps {
    encodingRecipeData: EncodingRecipesData;
    getEncodingRecipes: () => Promise<void>;
    getEncodingRecipesPresets: () => Promise<void>;
    createEncodingRecipe: (data: EncodingRecipeItem) => Promise<void>;
    saveEncodingRecipe: (data: EncodingRecipeItem) => Promise<void>;
    deleteEncodingRecipe: (data: EncodingRecipeItem) => Promise<void>;
    getWatermarkUrlForUploading: () => Promise<void>;
    uploadWatermark: (data: File, uploadWatermarkUrl: string) => Promise<void>;
    deleteWatermark: (data: EncodingRecipeItem) => Promise<void>;
}


export const EncodingRecipesPage = (props: EncodingRecipesComponentProps) => {

    const emptyRecipe: EncodingRecipeItem = {id: "", name: "", isDefault: false, recipePresets: ["HD", "SD", "ULD", "Magic"], watermarkFileID: "", watermarkFilename: '', watermarkPositioningLeft: 0, watermarkPositioningRight: 0}

    const recipeOrder: string[] = ["4K", "2K", "FHD", "HD", "SD", "LD", "ULD", "Magic", "DNE"]

    const stepList = [RecipeSettingsStep, RecipePresetStep]
   
    const [createRecipeStepperOpen, setCreateRecipeStepperOpen] = React.useState<boolean>(false)
    const [selectedRecipe, setSelectedRecipe] = React.useState<EncodingRecipeItem | false>(false);
    const [deleteWarningModalOpen, setDeleteWarningModalOpen] = React.useState<boolean>(false);
    const [deletedRecipe, setDeletedRecipe] = React.useState<EncodingRecipeItem>(emptyRecipe)
    const [submitLoading, setSubmitLoading] = React.useState<boolean>(false);

    const FunctionRecipe = (value: boolean) => {setCreateRecipeStepperOpen(value)}

    const editRecipe = (recipe: EncodingRecipeItem) => {
        setSelectedRecipe(recipe);
        FunctionRecipe(true);
    }

    const newRecipe = () => {
        setSelectedRecipe(emptyRecipe);
        FunctionRecipe(true);
    }

    const sortRecipes = (a, b) => {
        return recipeOrder.indexOf(a) - recipeOrder.indexOf(b)
    }

    const recipesHeaderElement = (newRecipe: () => void) => {
        return {data: [
            {cell: <Text key={'encodingRecipesPage_TableNameHeader'} size={14} weight="med">Name</Text>},
            {cell: <Text key={'encodingRecipesPage_TableDefaultHeader'} size={14} weight="med">Default</Text>},
            {cell: <Text key={'encodingRecipesPage_TableRenditionsHeader'} size={14} weight="med">Renditions</Text>},
            {cell: <Button key={'encodingRecipesPage_TableCreateRecipeButtonHeader'} className={"right mr2 sm-show"} typeButton="secondary" sizeButton="xs" onClick={() => newRecipe()}>Create Recipe</Button>}
        ]}
    }

    const recipesBodyElement = (editRecipe: (recipe: EncodingRecipeItem) => void, setDeleteWarningModalOpen: Dispatch<SetStateAction<boolean>>, setDeletedRecipe:  Dispatch<SetStateAction<EncodingRecipeItem>>) => {
        let sortedRecipes = props.encodingRecipeData.recipes.reduce((acc, rec) => {
            if(rec.name === 'Standard') {
                return [rec, ...acc]
            } else {
                return [...acc, rec]
            }
        }, [])
    
        return ( 
            sortedRecipes.map((value: EncodingRecipeItem, key) => {
            
                return (
                    key === 0 ? 
                        {data: [<Text key={'encodingRecipesPage_dacastRecipe'} size={14} weight="reg">{value.name}</Text>,
                            <IconStyle key={'encodingRecipesPage_isDefaultIcon'} coloricon='green'>{value.isDefault ? "check" : null}</IconStyle>,
                            <div className="flex flex-row" key={"encodingRecipesPage_labelContainer_default"}>
                                {    value.recipePresets.sort(sortRecipes).map((recipe, key) => {
                                    return (
                                        <RenditionLabel key={'encodingRecipesPage_renditions_' + key + recipe} size={14} weight="reg" color="gray-1" backgroundColor="gray-8" label={recipe} />
                                    )
                                }
                                )}
                            </div>,
                            <IconContainer key={"encodingRecipesPage_iconContainer_default"}></IconContainer>
                        ]}              
                        : {data: [<Text key={'encodingRecipesPage_' + value.name + key} size={14} weight="reg">{value.name}</Text>,
                            <IconStyle key={'encodingRecipesPage_isDefaultIcon' + key} coloricon='green'>{value.isDefault ? "check" : null}</IconStyle>,
                            <div key={"encodingRecipesPage_labelContainer_" + key}>
                                {    value.recipePresets.map((recipe, key) => {
                                    return (
                                        <RenditionLabel key={'encodingRecipesPage_renditions_' + key + recipe} size={14} weight="reg" color="gray-1" backgroundColor="gray-8" label={recipe} />
                                    )
                                }
                                )}
                            </div>,
                            <IconContainer key={ 'encodingRecipesPage_actionIcons' + key} className="iconAction">
                                <ActionIcon>
                                    <IconStyle id={"deleteTooltip" + key} onClick={() => {setDeleteWarningModalOpen(true);setDeletedRecipe(value)}}>delete</IconStyle>
                                    <Tooltip target={"deleteTooltip" + key}>Delete</Tooltip>
                                </ActionIcon>
                                <ActionIcon>
                                    <IconStyle id={"editTooltip" + key} onClick={() => editRecipe(value)}>edit</IconStyle>
                                    <Tooltip target={"editTooltip" + key}>Edit</Tooltip>
                                </ActionIcon>                            
                            </IconContainer>
                        ]}
                )
            })
        )
    }

    const submitRecipe = (submittedRecipe: EncodingRecipeItem | false, FunctionRecipe: Function) => {
        setSubmitLoading(true);
        if(submittedRecipe) {
            if (submittedRecipe.id) {
                props.saveEncodingRecipe(submittedRecipe).then(() => {
                    setSubmitLoading(false)
                }).catch(() => {
                    setSubmitLoading(false)
                })
            } else
            {
                props.createEncodingRecipe(submittedRecipe).then(() => {
                    setSubmitLoading(false)
                }).catch(() => {
                    setSubmitLoading(false)
                })
            }
            FunctionRecipe(false)
        }
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
                    <IconStyle style={{marginRight: "10px"}}>info_outlined</IconStyle>
                    <Text  size={14} weight="reg">Need help understanding Encoding Recipes? Visit the <a href={getKnowledgebaseLink("Encoding Recipes")} target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                </div>
                <Button key={'encodingRecipesPage_TableCreateRecipeButtonHeader'} className={"col col-12 xs-show"} typeButton="secondary" sizeButton="xs" onClick={() => newRecipe()}>Create Recipe</Button>
                <RecipesTable isMobile={isMobile} className="col-12" headerBackgroundColor="gray-10" id='encodingRecipeList' header={recipesHeaderElement(newRecipe)} body={recipesBodyElement(editRecipe, setDeleteWarningModalOpen, setDeletedRecipe)} />
                <CustomStepper
                    opened={createRecipeStepperOpen}
                    stepperHeader={selectedRecipe === false || !selectedRecipe.id ? "Create Recipe" : "Edit Recipe"}
                    stepList={stepList}
                    isLoading={submitLoading}
                    stepTitles={["Settings", "Presets"]}
                    lastStepButton={selectedRecipe === false || !selectedRecipe.id ? "Create" : "Save"}
                    functionCancel={FunctionRecipe}
                    stepperData={selectedRecipe}
                    updateStepperData={(value: EncodingRecipeItem) => {setSelectedRecipe(value)}}
                    stepperStaticData={{'recipePresets': props.encodingRecipeData.defaultRecipePresets, 'uploadWatermarkUrl': props.encodingRecipeData.uploadWatermarkUrl, 'watermarkFileID': props.encodingRecipeData.watermarkFileID}}
                    usefulFunctions={{'getUploadUrl': props.getWatermarkUrlForUploading, 'uploadWatermark': props.uploadWatermark, 'deleteWatermark': props.deleteWatermark}}
                    finalFunction={() => {submitRecipe(selectedRecipe, FunctionRecipe)}}
                />
                <Modal size="small" modalTitle="Delete Recipe" icon={{name: "warning", color: "red"}} opened={deleteWarningModalOpen} toggle={() => setDeleteWarningModalOpen(false)} hasClose={false}>
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