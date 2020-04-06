import * as React from 'react'
import { Card } from '../../../../components/Card/Card';
import { Text } from "../../../../components/Typography/Text"
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Table } from '../../../../components/Table/Table';
import { IconStyle, IconContainer } from '../../../../shared/Common/Icon';
import styled, { css } from 'styled-components';
import { CustomStepper } from '../../../../components/Stepper/Stepper';
import { EncodingRecipeItem, EncodingRecipesData } from '../../../redux-flow/store/Settings/EncodingRecipes/EncodingRecipesTypes';
import { LoadingSpinner } from '../../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { settingsStep, presetStep } from './EncodingRecipesSteps';
import { useMedia } from '../../../../utils/utils';
import { Modal, ModalContent, ModalFooter } from '../../../../components/Modal/Modal';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { TableContainer } from '../../../../components/Table/TableStyle';
import { isMobile } from 'react-device-detect';
import { ActionIcon } from '../../../shared/ActionIconStyle';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';

export interface EncodingRecipesComponentProps {
    encodingRecipeData: EncodingRecipesData;
    getEncodingRecipes: Function;
    getEncodingRecipesPresets: Function;
    createEncodingRecipe: Function;
    saveEncodingRecipe: Function;
    deleteEncodingRecipe: Function;
    getWatermarkUrlForUploading: Function;
    uploadWatermark: Function;
    deleteWatermark: Function;
}

const recipesBodyElement = (encodingRecipeData: EncodingRecipesData,  editRecipe: Function, setDeleteWarningModalOpen: Function, setDeletedRecipe: Function, emptyRecipe: EncodingRecipeItem) => {
    return ( 
        encodingRecipeData.recipes.map((value, key) => {
        
            return (
                key === 0 ? 
                    {data: [<Text key={'encodingRecipesPage_dacastRecipe'} size={14} weight="reg">{encodingRecipeData.recipes[0].name}</Text>,
                        <IconStyle key={'encodingRecipesPage_isDefaultIcon'} coloricon='green'>{encodingRecipeData.recipes[0].isDefault ? "check" : null}</IconStyle>,
                        <div className="flex flex-row" key={"encodingRecipesPage_labelContainer_default"}>
                            {    encodingRecipeData.recipes[0].recipePresets.map((recipe, key) => {
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

const recipesHeaderElement = (newRecipe: Function, smScreen: boolean) => {
    return {data: [
        {cell: <Text key={'encodingRecipesPage_TableNameHeader'} size={14} weight="med">Name</Text>},
        {cell: <Text key={'encodingRecipesPage_TableDefaultHeader'} size={14} weight="med">Default</Text>},
        {cell: <Text key={'encodingRecipesPage_TableRenditionsHeader'} size={14} weight="med">Renditions</Text>},
        {cell: <Button key={'encodingRecipesPage_TableCreateRecipeButtonHeader'} className={"right mr2 sm-show"} typeButton="secondary" sizeButton="xs" onClick={() => newRecipe()}>Create Recipe</Button>}
    ]}
}


const stepList = [settingsStep, presetStep]


export const EncodingRecipesPage = (props: EncodingRecipesComponentProps) => {

    let smScreen = useMedia('(max-width: 780px)');

    const emptyRecipe: EncodingRecipeItem = {id: "", name: "", isDefault: false, recipePresets: ["2K", "4K", "HD", "Magic"], watermarkFileID: "", watermarkPositioningLeft: 0, watermarkPositioningRight: 0}
   
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
        console.log('submitting')
    }

    // useStepperFinalStepAction('stepperNextButton', () => {submitRecipe(selectedRecipe, FunctionRecipe, props.createEncodingRecipe, props.saveEncodingRecipe)})

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
                    <Text  size={14} weight="reg">Need help understanding Encoding Recipes? Visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                </div>
                <Button key={'encodingRecipesPage_TableCreateRecipeButtonHeader'} className={"col col-12 xs-show"} typeButton="secondary" sizeButton="xs" onClick={() => newRecipe()}>Create Recipe</Button>
                <RecipesTable isMobile={isMobile} className="col-12" headerBackgroundColor="gray-10" id='encodingRecipeList' header={recipesHeaderElement(newRecipe, smScreen)} body={recipesBodyElement(props.encodingRecipeData, editRecipe, setDeleteWarningModalOpen, setDeletedRecipe, emptyRecipe)} />
                <CustomStepper
                    opened={createRecipeStepperOpen}
                    stepperHeader={selectedRecipe === false || !selectedRecipe.id ? "Create Recipe" : "Edit Recipe"}
                    stepList={stepList}
                    nextButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Next"}} 
                    backButtonProps={{typeButton: "secondary", sizeButton: "large", buttonText: "Back"}} 
                    cancelButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Cancel"}}
                    stepTitles={["Settings", "Presets"]}
                    lastStepButton={selectedRecipe === false || !selectedRecipe.id ? "Create" : "Save"}
                    functionCancel={FunctionRecipe}
                    finalFunction={() => submitRecipe(selectedRecipe, FunctionRecipe, props.createEncodingRecipe, props.saveEncodingRecipe)}
                    stepperData={selectedRecipe}
                    updateStepperData={(value: EncodingRecipeItem) => {setSelectedRecipe(value)}}
                    stepperStaticData={{'recipePresets': props.encodingRecipeData.defaultRecipePresets, 'uploadWatermarkUrl': props.encodingRecipeData.uploadWatermarkUrl}}
                    usefulFunctions={{'getUploadUrl': props.getWatermarkUrlForUploading, 'uploadWatermark': props.uploadWatermark, 'deleteWatermark': props.deleteWatermark}}
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