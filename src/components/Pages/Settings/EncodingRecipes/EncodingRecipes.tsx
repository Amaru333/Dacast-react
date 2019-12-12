import * as React from 'react'
import { Card } from '../../../Card/Card';
import { Text } from "../../../Typography/Text"
import { Button } from '../../../FormsComponents/Button/Button';
import { Table } from '../../../Table/Table';
import { Icon } from '@material-ui/core';
import styled from 'styled-components';
import { CustomStepper } from '../../../Stepper/Stepper';
import { EncodingRecipeItem, EncodingRecipesData } from '../../../../redux-flow/store/Settings/EncodingRecipes/EncodingRecipesTypes';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../../../redux-flow/store';
import { Action, getEncodingRecipesAction, createEncodingRecipesAction, saveEncodingRecipesAction, deleteEncodingRecipesAction } from '../../../../redux-flow/store/Settings/EncodingRecipes/actions';
import { LoadingSpinner } from '../../../FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { settingsStep, presetStep } from './EncodingRecipesSteps';
import { useMedia } from '../../../../utils/utils';
import { Modal, ModalContent, ModalFooter } from '../../../Modal/Modal';

interface EncodingRecipesComponentProps {
    encodingRecipeData: EncodingRecipesData;
    getEncodingRecipes: Function;
    createEncodingRecipe: Function;
    saveEncodingRecipe: Function;
    deleteEncodingRecipe: Function;
}

const recipesBodyElement = (encodingRecipeData: EncodingRecipesData,  editRecipe: Function, setDeleteWarningModalOpen: Function, setDeletedRecipe: Function) => {
    return encodingRecipeData.recipes.map((value, key) => {
        return [
            <Text key={'encodingRecipesPage_' + value.name + key} size={14} weight="reg">{value.name}</Text>,
            <Icon key={'encodingRecipesPage_isDefaultIcon' + key} style={{color:"green"}}>{value.isDefault ? "check" : null}</Icon>,
            <IconContainer key={ 'encodingRecipesPage_actionIcons' + key} className="iconAction">
                <Icon onClick={() => {setDeleteWarningModalOpen(true);setDeletedRecipe(value)}}>delete</Icon>
                <Icon onClick={() => editRecipe(value)}>edit</Icon> 
            </IconContainer>
        ]
    })
}

const recipesHeaderElement = (newRecipe: Function, smScreen: boolean) => {
    return[
        <Text key={'encodingRecipesPage_TableNameHeader'} size={14} weight="med">Name</Text>,
        <Text key={'encodingRecipesPage_TableDefaultHeader'} size={14} weight="med">Default</Text>,
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

const EncodingRecipes = (props: EncodingRecipesComponentProps) => {

    React.useEffect(() => {
        props.getEncodingRecipes();
    }, [])

    let smScreen = useMedia('(max-width: 780px)');

    const emptyRecipe: EncodingRecipeItem = {id: "", name: "", isDefault: false, recipePresets: [], watermarkFile: "sick_watermark.png", watermarkPositioningLeft: 0, watermarkPositioningRight: 0}
   
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
                    <Icon style={{marginLeft: "10px"}}>info_outlined</Icon>
                </HeaderStyle>
                <Text size={14} weight="reg">Encoding recipes allow you to encode your videos during upload so they can be played immediately.</Text>
                <div className="flex col col-12 mt2 mb25">
                    <Icon style={{marginRight: "10px"}}>info_outlined</Icon>
                    <Text  size={14} weight="reg">Need help understanding Encoding Recipes? Visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                </div>
                <Button className={"left mb2 "+ (!smScreen ? 'hide' : '')} typeButton="secondary" sizeButton="xs" onClick={() => newRecipe()}>Create Recipe</Button>
                <Table style={{marginTop: "24px"}} className="col-12" id='lol' header={recipesHeaderElement(newRecipe, smScreen)} body={recipesBodyElement(props.encodingRecipeData, editRecipe, setDeleteWarningModalOpen, setDeletedRecipe)} />
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

export function mapStateToProps( state: ApplicationState) {
    return {
        encodingRecipeData: state.settings.encodingRecipes
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getEncodingRecipes: () => {
            dispatch(getEncodingRecipesAction());
        },
        createEncodingRecipe: (data: EncodingRecipeItem) => {
            dispatch(createEncodingRecipesAction(data))
        },
        saveEncodingRecipe: (data: EncodingRecipeItem) => {
            dispatch(saveEncodingRecipesAction(data))
        },
        deleteEncodingRecipe: (data: EncodingRecipeItem) => {
            dispatch(deleteEncodingRecipesAction(data))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EncodingRecipes)

const HeaderStyle = styled.div`
display: flex;
align-content: center;
margin-bottom: 16px;
`

const IconContainer = styled.div`
    float:right;
    display:none;
    .material-icons{
        margin-right:16px;
        color:  ${props => props.theme.colors["gray-1"]};
    }
   ` 