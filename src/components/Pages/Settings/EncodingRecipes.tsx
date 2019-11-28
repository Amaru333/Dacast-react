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
import { EncodingRecipeItem, EncodingRecipesData } from '../../../redux-flow/store/Settings/EncodingRecipes/EncodingRecipesTypes';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../../redux-flow/store';
import { Action, getEncodingRecipesAction, createEncodingRecipesAction, saveEncodingRecipesAction, deleteEncodingRecipesAction } from '../../../redux-flow/store/Settings/EncodingRecipes/actions';
import { LoadingSpinner } from '../../FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

interface EncodingRecipesComponentProps {
    encodingRecipeData: EncodingRecipesData
    getEncodingRecipes: Function;
    createEncodingRecipe: Function
    saveEncodingRecipe: Function
    deleteEncodingRecipe: Function
}

//TABLES

const recipesBodyElement = (encodingRecipeData: EncodingRecipesData,  editRecipe: Function, props, deleteEncodingRecipe: Function) => {
    console.log(encodingRecipeData)
    return encodingRecipeData.recipes.map((value, key) => {
        return [
            <Text key={key+value.name} size={14} weight="reg">{value.name}</Text>,
            <Icon>{value.isDefault ? "check" : null}</Icon>,
            <IconContainer className="iconAction"><Icon onClick={() => deleteEncodingRecipe(value)}>delete</Icon><Icon onClick={() => editRecipe(value)}>edit</Icon> </IconContainer>
        ]
    })
    
}

const recipesHeaderElement = (newRecipe: Function) => {
    return[
        <Text size={14} weight="med">Name</Text>,
        <Text size={14} weight="med">Default</Text>,
        <Button className="right mr2" typeButton="secondary" sizeButton="xs" onClick={() => newRecipe()}>Create Recipe</Button>
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

//REFACTOR THIS ABSOLUTE MONSTROSITY
const createRecipeBodyElement = (stepperData, setSelectedRecipe: Function) => {
    
    return [
        [
            <InputCheckbox defaultChecked={stepperData.recipePresets.includes("2160p")} id="2160p" onChange={(event) => 
                    
                {
                    if (event.currentTarget.checked) {
                        setSelectedRecipe({...stepperData}, stepperData.recipePresets.push("2160p"))
                    } else {
                        const editedRecipePresets = stepperData.recipePresets.filter(item => item !== "2160p")
                        setSelectedRecipe({...stepperData, ["recipePresets"]: editedRecipePresets})
                    }

                }
                    } />,
            <Text size={14} weight="reg">4K - 2160p</Text>,
            <Text size={14} weight="reg">3480</Text>,
            <Text size={14} weight="reg">68</Text>
        ],
        [
            <InputCheckbox id="1440p" defaultChecked={stepperData.recipePresets.includes("1440p")} onChange={(event) => 
                    
                {
                    if (event.currentTarget.checked) {
                        setSelectedRecipe({...stepperData}, stepperData.recipePresets.push("1440p"))
                    } else {
                        const editedRecipePresets = stepperData.recipePresets.filter(item => item !== "1440p")
                        setSelectedRecipe({...stepperData, ["recipePresets"]: editedRecipePresets})
                    }

                }
                    }/>,
            <Text size={14} weight="reg">2K - 1440p</Text>,
            <Text size={14} weight="reg">2560</Text>,
            <Text size={14} weight="reg">24</Text>
        ],
        [
            <InputCheckbox id="1080p" defaultChecked={stepperData.recipePresets.includes("1080p")} onChange={(event) => 
                    
                {
                    if (event.currentTarget.checked) {
                        setSelectedRecipe({...stepperData}, stepperData.recipePresets.push("1080p"))
                    } else {
                        const editedRecipePresets = stepperData.recipePresets.filter(item => item !== "1080p")
                        setSelectedRecipe({...stepperData, ["recipePresets"]: editedRecipePresets})
                    }

                }
                    } />,
            <Text size={14} weight="reg">HD - 1080p</Text>,
            <Text size={14} weight="reg">1920</Text>,
            <Text size={14} weight="reg">12</Text>
        ],
        [
            <InputCheckbox id="720p" defaultChecked={stepperData.recipePresets.includes("720p")} onChange={(event) => 
                    
                {
                    if (event.currentTarget.checked) {
                        setSelectedRecipe({...stepperData}, stepperData.recipePresets.push("720p"))
                    } else {
                        const editedRecipePresets = stepperData.recipePresets.filter(item => item !== "720p")
                        setSelectedRecipe({...stepperData, ["recipePresets"]: editedRecipePresets})
                    }

                }
                    } />,
            <Text size={14} weight="reg">SD - 720p</Text>,
            <Text size={14} weight="reg">1280</Text>,
            <Text size={14} weight="reg">7.5</Text>
        ],
        [
            <InputCheckbox id="480p" defaultChecked={stepperData.recipePresets.includes("480p")} onChange={(event) => 
                    
                {
                    if (event.currentTarget.checked) {
                        setSelectedRecipe({...stepperData}, stepperData.recipePresets.push("480p"))
                    } else {
                        const editedRecipePresets = stepperData.recipePresets.filter(item => item !== "480p")
                        setSelectedRecipe({...stepperData, ["recipePresets"]: editedRecipePresets})
                    }

                }
                    }/>,
            <Text size={14} weight="reg">LD - 480p</Text>,
            <Text size={14} weight="reg">854</Text>,
            <Text size={14} weight="reg">4</Text>
        ],
        [
            <InputCheckbox id="360p" defaultChecked={stepperData.recipePresets.includes("360p")} onChange={(event) => 
                    
                {
                    if (event.currentTarget.checked) {
                        setSelectedRecipe({...stepperData}, stepperData.recipePresets.push("360p"))
                    } else {
                        const editedRecipePresets = stepperData.recipePresets.filter(item => item !== "360p")
                        setSelectedRecipe({...stepperData, ["recipePresets"]: editedRecipePresets})
                    }

                }
                    } />,
            <Text size={14} weight="reg">SLD - 360p</Text>,
            <Text size={14} weight="reg">640</Text>,
            <Text size={14} weight="reg">1.5</Text>
        ],
        [
            <InputCheckbox id="240p" defaultChecked={stepperData.recipePresets.includes("240p")} onChange={(event) => 
                    
                {
                    if (event.currentTarget.checked) {
                        setSelectedRecipe({...stepperData}, stepperData.recipePresets.push("240p"))
                    } else {
                        const editedRecipePresets = stepperData.recipePresets.filter(item => item !== "240p")
                        setSelectedRecipe({...stepperData, ["recipePresets"]: editedRecipePresets})
                    }

                }
                    }/>,
            <Text size={14} weight="reg">ULD - 240p</Text>,
            <Text size={14} weight="reg">426</Text>,
            <Text size={14} weight="reg">0.5</Text>
        ]
    ]
}

const extraEncodingOptionsBodyElement = (stepperData, setSelectedRecipe: Function) => {
    return [
        [
            <InputCheckbox id="magicEncoding" defaultChecked={stepperData.recipePresets.includes("magicEncoding")} 
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
            <Text size={14} weight="reg">Magic Encoding</Text>,
            <Text size={14} weight="reg">Auto</Text>,
            <Text size={14} weight="reg">7.5</Text>
        ],
        [<InputCheckbox id="DNE" defaultChecked={stepperData.recipePresets.includes("DNE")} onChange={(event) => 
                    
            {
                if (event.currentTarget.checked) {
                    setSelectedRecipe({...stepperData}, stepperData.recipePresets.push("DNE"))
                } else {
                    const editedRecipePresets = stepperData.recipePresets.filter(item => item !== "DNE")
                    setSelectedRecipe({...stepperData, ["recipePresets"]: editedRecipePresets})
                }
            }
                }/>,
            <Text size={14} weight="reg">DNE - Do Not Encode</Text>,
            <Text size={14} weight="reg">Auto</Text>,
            <Text size={14} weight="reg">Auto</Text>
        ]
    ]
}

//STEPS

const settingsStep = (stepperData: any, setSelectedRecipe: Function) => {
    return (
       <StepContent className="clearfix">
           <RecipeNameRow className="col-12 mb1">
                <RecipeNameInput value={stepperData ? stepperData.name : ""} className="col-6" required label="Recipe Name" onChange={(event) => 
                    
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
           <WatermarkFile className="col col-6 mt1">
                <Text className="ml2" color="gray-1" size={14} weight="reg">{stepperData.watermarkFile}</Text>
                <button style={{border: "none", backgroundColor:"inherit"}}>
                    <Icon style={{fontSize: "14px"}}>close</Icon>
                </button>   
           </WatermarkFile>
           : null}
           <Text className="col col-12 mt3" size={16} weight="med">Positioning</Text>
           <PositioningRow className="col col-12">
                
                <Input disabled={!stepperData.watermarkFile} value={stepperData.watermarkFile ? stepperData.watermarkPositioningLeft : null }className="col col-2" required label="Left"
                onChange={(event) => 
                    
                    {
                        event.preventDefault();
                        setSelectedRecipe({...stepperData, ["watermarkPositioningLeft"]: event.currentTarget.value})
                    }
                        }
                        ></Input>
                <Suffix className="col col-1 mr2" >
                    <Text weight="med" size={14} color="gray-3">px</Text>
                </Suffix>
                <Input disabled={!stepperData.watermarkFile} value={stepperData.watermarkFile ? stepperData.watermarkPositioningRight : null} className="col col-2" required label="Right"
                onChange={(event) => 
                    
                    {
                        event.preventDefault();
                        setSelectedRecipe({...stepperData, ["watermarkPositioningRight"]: event.currentTarget.value})
                    }
                        }
                ></Input>
                <Suffix className="col col-1" >
                    <Text weight="med" size={14} color="gray-3">px</Text>
                </Suffix>
           </PositioningRow>
           
       </StepContent>
    )
}

const presetStep = (stepperData: any, setSelectedRecipe: Function) => {
    return (
        <StepContent className="clearfix">
            <Text weight='reg' size={14}>
                Provide your audience with the best viewing experience. Select up to 4 encoding presets from the table below and we will encode based on your choices.
            </Text>
            <Table className="col col-12 mt2" id="createRecipe" header={createRecipeHeaderElement()} body={createRecipeBodyElement(stepperData, setSelectedRecipe)} />
            <Text className="col col-12 mt25" size={14} weight="reg">And you can also select one of the following to also be encoded if you want</Text>
            {/* extraEncodingOptions table to have header removed */}
            <Table className="col col-12 mt1" id="extraEncodingOptions" body={extraEncodingOptionsBodyElement(stepperData, setSelectedRecipe)} />
            <div className="flex col col-12 mt3">
                <Icon style={{marginRight: "10px"}}>info_outlined</Icon>
                <Text  size={14} weight="reg">Need help choosing your presets? Visit the Knowledge Base</Text>
            </div>
        </StepContent>
    )
}

const submitRecipe = (selectedRecipe, FunctionRecipe: Function, saveRecipe: Function) => {
   
    saveRecipe(selectedRecipe);
    FunctionRecipe(false)
}

const stepList = [settingsStep, presetStep]

const EncodingRecipes = (props: EncodingRecipesComponentProps) => {

    React.useEffect(() => {
        props.getEncodingRecipes();
    }, [])

    

    const emptyRecipe = {name: "", isDefault: false, recipePresets: [""], watermarkFile: "sick_watermark.png", watermarkPositioningLeft: 0, watermarkPositioningRight: 0}
   
    const [createRecipeStepperOpen, setCreateRecipeStepperOpen] = React.useState<boolean>(false)
    const [selectedRecipe, setSelectedRecipe] = React.useState<EncodingRecipeItem | false>(false);

    const editRecipe = (recipe: EncodingRecipeItem) => {
        setSelectedRecipe(recipe);
        FunctionRecipe(true);
    }

    const newRecipe = () => {
        setSelectedRecipe(emptyRecipe);
        FunctionRecipe(true);
    }

    function FunctionRecipe(value: boolean) {setCreateRecipeStepperOpen(value)}

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
            <Table style={{marginTop: "24px"}} className="col-12" id='lol' header={recipesHeaderElement(newRecipe)} body={recipesBodyElement(props.encodingRecipeData, setSelectedRecipe, editRecipe, props.deleteEncodingRecipe)} />
            <CustomStepper
            opened={createRecipeStepperOpen}
            stepperHeader={selectedRecipe ? "Edit Recipe" : "Create Recipe"}
            stepList={stepList}
            nextButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Next"}} 
            backButtonProps={{typeButton: "secondary", sizeButton: "large", buttonText: "Back"}} 
            cancelButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Cancel"}}
            stepTitles={["Settings", "Presets"]}
            lastStepButton="Create"
            functionCancel={FunctionRecipe}
            finalFunction={() => submitRecipe(selectedRecipe, FunctionRecipe, selectedRecipe === emptyRecipe ? props.createEncodingRecipe : props.saveEncodingRecipe)}
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