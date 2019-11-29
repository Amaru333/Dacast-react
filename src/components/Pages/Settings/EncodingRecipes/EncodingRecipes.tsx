import * as React from 'react'
import { Card } from '../../../Card/Card';
import { Text } from "../../../Typography/Text"
import { Button } from '../../../FormsComponents/Button/Button';
import { Table } from '../../../Table/Table';
import { Icon } from '@material-ui/core';
import styled from 'styled-components';
import { CustomStepper } from '../../../Stepper/Stepper';
import { Input } from '../../../FormsComponents/Input/Input';
import { InputCheckbox } from '../../../FormsComponents/Input/InputCheckbox';
import { EncodingRecipeItem, EncodingRecipesData } from '../../../../redux-flow/store/Settings/EncodingRecipes/EncodingRecipesTypes';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../../../redux-flow/store';
import { Action, getEncodingRecipesAction, createEncodingRecipesAction, saveEncodingRecipesAction, deleteEncodingRecipesAction } from '../../../../redux-flow/store/Settings/EncodingRecipes/actions';
import { LoadingSpinner } from '../../../FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

interface EncodingRecipesComponentProps {
    encodingRecipeData: EncodingRecipesData;
    getEncodingRecipes: Function;
    createEncodingRecipe: Function;
    saveEncodingRecipe: Function;
    deleteEncodingRecipe: Function;
}

//TABLES

const recipesBodyElement = (encodingRecipeData: EncodingRecipesData,  editRecipe: Function, deleteEncodingRecipe: Function) => {
    return encodingRecipeData.recipes.map((value, key) => {
        return [
            <Text key={'encodingRecipesPage_' + value.name + key} size={14} weight="reg">{value.name}</Text>,
            <Icon key={'encodingRecipesPage_isDefaultIcon' + key} style={{color:"green"}}>{value.isDefault ? "check" : null}</Icon>,
            <IconContainer key={ 'encodingRecipesPage_actionIcons' + key} className="iconAction"><Icon onClick={() => deleteEncodingRecipe(value)}>delete</Icon><Icon onClick={() => editRecipe(value)}>edit</Icon> </IconContainer>
        ]
    })
}

const recipesHeaderElement = (newRecipe: Function) => {
    return[
        <Text key={'encodingRecipesPage_TableNameHeader'} size={14} weight="med">Name</Text>,
        <Text key={'encodingRecipesPage_TableDefaultHeader'} size={14} weight="med">Default</Text>,
        <Button key={'encodingRecipesPage_TableCreateRecipeButtonHeader'} className="right mr2" typeButton="secondary" sizeButton="xs" onClick={() => newRecipe()}>Create Recipe</Button>
    ]
}

const createRecipeHeaderElement = () => {
    return[
        <></>,
        <Text key={'encodingRecipesPage_Present'}size={14} weight="med">Preset</Text>,
        <Text key={'encodingRecipesPage_SizePx'} size={14} weight="med">Size (Px)</Text>,
        <Text key={'encodingRecipesPage_BitrateMbps'} size={14} weight="med">Bitrate (Mbps)</Text>
    ]
}

const recipePresets = [
    {id: "2160p", name: "4K - 2160p", size: "3480", bitrate: "68"},
    {id: "1440p", name: "2K - 1440p", size: "2560", bitrate: "24"},
    {id: "1080p", name: "HD - 1080p", size: "1920", bitrate: "12"},
    {id: "720p", name: "SD - 720p", size: "1280", bitrate: "7.5"},
    {id: "480p", name: "LD - 480p", size: "854", bitrate: "4"},
    {id: "360p", name: "SLD - 360p", size: "640", bitrate: "1.5"},
    {id: "240p", name: "ULD - 240p", size: "426", bitrate: "0.5"}
]

const createRecipeBodyElement = (stepperData: EncodingRecipeItem, setSelectedRecipe: Function, recipePresets: {[key: string]: string}[]) => {
    console.log(stepperData)
    return recipePresets.map((value, key) => {
        return [
            <InputCheckbox key={key + value.id } defaultChecked={stepperData.recipePresets.includes(value.id)} id={value.id} onChange={(event) => 
            {
                if (event.currentTarget.checked) {
                    setSelectedRecipe({...stepperData}, stepperData.recipePresets.push(value.id))
                } else {
                    const editedRecipePresets = stepperData.recipePresets.filter(item => item !== value.id)
                    setSelectedRecipe({...stepperData, ["recipePresets"]: editedRecipePresets})
                }
            }
            } />,
            <Text key={'encodingRecipesPage_' + value.name + key} size={14} weight="reg">{value.name}</Text>,
            <Text key={'encodingRecipesPage_' + value.size + key} size={14} weight="reg">{value.size}</Text>,
            <Text key={'encodingRecipesPage_' + value.bitrate + key} size={14} weight="reg">{value.bitrate}</Text>
        ]
    })   
}

const extraEncodingOptionsBodyElement = (stepperData: EncodingRecipeItem, setSelectedRecipe: Function) => {
    return [
        [
            <InputCheckbox key={'encodingRecipesPage_MagicEncodingCheckbox'} id="magicEncoding" defaultChecked={stepperData.recipePresets.includes("magicEncoding")} 
                onChange={(event) =>   
                {
                    if (event.currentTarget.checked) {
                        setSelectedRecipe({...stepperData}, stepperData.recipePresets.push("magicEncoding"))
                    } else {
                        const editedRecipePresets = stepperData.recipePresets.filter(item => item !== "magicEncoding")
                        setSelectedRecipe({...stepperData, ["recipePresets"]: editedRecipePresets})
                    }
                }
                }/>,
            <Text key={'encodingRecipesPage_MagicEncoding'} size={14} weight="reg">Magic Encoding</Text>,
            <Text key={'encodingRecipesPage_Auto0'} size={14} weight="reg">Auto</Text>,
            <Text key={'encodingRecipesPage_7.5'} size={14} weight="reg">7.5</Text>
        ],
        [<InputCheckbox key={'encodingRecipesPage_DNECheckbox'} id="DNE" defaultChecked={stepperData.recipePresets.includes("DNE")} onChange={(event) => 
        {
            if (event.currentTarget.checked) {
                setSelectedRecipe({...stepperData}, stepperData.recipePresets.push("DNE"))
            } else {
                const editedRecipePresets = stepperData.recipePresets.filter(item => item !== "DNE")
                setSelectedRecipe({...stepperData, ["recipePresets"]: editedRecipePresets})
            }
        }
        }/>,
        <Text key={'encodingRecipesPage_DNE_Text'} size={14} weight="reg">DNE - Do Not Encode</Text>,
        <Text key={'encodingRecipesPage_Auto1'} size={14} weight="reg">Auto</Text>,
        <Text key={'encodingRecipesPage_Auto2'} size={14} weight="reg">Auto</Text>
        ]
    ]
}

//STEPS

const settingsStep = (stepperData: EncodingRecipeItem, setSelectedRecipe: Function) => {
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
                        <button style={{border: "none", backgroundColor:"inherit"}}>
                            <Icon style={{fontSize: "14px"}}>close</Icon>
                        </button>   
                    </WatermarkFile>
                    <Text className="col col-12 mt3" size={16} weight="med">Positioning</Text>
                    <PositioningRow className="col col-12">
                        <Input suffix={<Text weight="med" size={14} color="gray-3">px</Text>} disabled={!stepperData.watermarkFile} value={stepperData.watermarkFile ? stepperData.watermarkPositioningLeft.toString() : null }className="col col-2 mr4" required label="Left"
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

const presetStep = (stepperData: EncodingRecipeItem, setSelectedRecipe: Function) => {
    return (
        <StepContent className="clearfix">
            <Text weight='reg' size={14}>
                Provide your audience with the best viewing experience. Select up to 4 encoding presets from the table below and we will encode based on your choices.
            </Text>
            <Table className="col col-12 mt2" id="createRecipe" header={createRecipeHeaderElement()} body={createRecipeBodyElement(stepperData, setSelectedRecipe, recipePresets)} />
            <Text className="col col-12 mt25" size={14} weight="reg">And you can also select one of the following to also be encoded if you want</Text>
            {/* extraEncodingOptions table to have header removed */}
            <Table className="col col-12 mt1" id="extraEncodingOptions" header={createRecipeHeaderElement()} body={extraEncodingOptionsBodyElement(stepperData, setSelectedRecipe)} />
            <div className="flex col col-12 mt3">
                <Icon style={{marginRight: "10px"}}>info_outlined</Icon>
                <Text  size={14} weight="reg">Need help choosing your presets? Visit the <a href="https://www.dacast.com/">Knowledge Base</a></Text>
            </div>
        </StepContent>
    )
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


    const emptyRecipe = {id: "", name: "", isDefault: false, recipePresets: [""], watermarkFile: "sick_watermark.png", watermarkPositioningLeft: 0, watermarkPositioningRight: 0}
   
    const [createRecipeStepperOpen, setCreateRecipeStepperOpen] = React.useState<boolean>(false)
    const [selectedRecipe, setSelectedRecipe] = React.useState<EncodingRecipeItem | false>(false);

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
                <Text size={14} weight="reg">Ingest recipes allow you to create a re-usable group of presets to customize how your videos are encoded and delivered.</Text>
                <Table style={{marginTop: "24px"}} className="col-12" id='lol' header={recipesHeaderElement(newRecipe)} body={recipesBodyElement(props.encodingRecipeData, editRecipe, props.deleteEncodingRecipe)} />
                <CustomStepper
                    opened={createRecipeStepperOpen}
                    stepperHeader={selectedRecipe === false || !selectedRecipe.id ? "Create Recipe" : "Edit Recipe"}
                    stepList={stepList}
                    nextButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Next"}} 
                    backButtonProps={{typeButton: "secondary", sizeButton: "large", buttonText: "Back"}} 
                    cancelButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Cancel"}}
                    stepTitles={["Settings", "Presets"]}
                    lastStepButton="Create"
                    functionCancel={FunctionRecipe}
                    finalFunction={() => submitRecipe(selectedRecipe, FunctionRecipe, props.createEncodingRecipe, props.saveEncodingRecipe)}
                    stepperData={selectedRecipe}
                    updateStepperData={(value: EncodingRecipeItem) => {setSelectedRecipe(value)}}
                />
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

const IconContainer = styled.div`
    float:right;
    display:none;
    .material-icons{
        margin-right:16px;
        color:  ${props => props.theme.colors["gray-1"]};
    }
   ` 