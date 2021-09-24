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
import { Trans, useTranslation } from 'react-i18next';

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
    const { t } = useTranslation()
    const stepList = [{title: t('common_navigation_bar_menu_item_settings'), content: RecipeSettingsStep}, {title: t('paywall_presets_title'), content: RecipePresetStep}]
   
    const [createRecipeStepperOpen, setCreateRecipeStepperOpen] = React.useState<boolean>(false)
    const [selectedRecipe, setSelectedRecipe] = React.useState<EncodingRecipeItem | false>(false);
    const [deleteWarningModalOpen, setDeleteWarningModalOpen] = React.useState<boolean>(false);
    const [deletedRecipe, setDeletedRecipe] = React.useState<EncodingRecipeItem>(emptyRecipe)
    const [submitLoading, setSubmitLoading] = React.useState<boolean>(false);

    const editRecipe = (recipe: EncodingRecipeItem) => {
        setSelectedRecipe(recipe);
        setCreateRecipeStepperOpen(true);
    }

    const newRecipe = () => {
        setSelectedRecipe(emptyRecipe);
        setCreateRecipeStepperOpen(true);
    }

    const sortRecipes = (a: string, b: string) => {
        return recipeOrder.indexOf(a) - recipeOrder.indexOf(b)
    }

    const recipesHeaderElement = (newRecipe: () => void) => {
        return {data: [
            {cell: <Text key={'encodingRecipesPage_TableNameHeader'} size={14} weight="med">{t('dashboard_top_live_channels_widget_column_title_1')}</Text>},
            {cell: <Text key={'encodingRecipesPage_TableDefaultHeader'} size={14} weight="med">{t('paywall_theme_default')}</Text>},
            {cell: <Text key={'encodingRecipesPage_TableRenditionsHeader'} size={14} weight="med">{t('video_renditions_title')}</Text>},
            {cell: <Button key={'encodingRecipesPage_TableCreateRecipeButtonHeader'} className={"right mr2 sm-show"} typeButton="secondary" sizeButton="xs" onClick={() => newRecipe()}>{t('settings_encoding_table_create_button')}</Button>}
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
                value.recipePresets.sort(sortRecipes)
                return (
                    key === 0 ? 
                        {data: [<Text key={'encodingRecipesPage_dacastRecipe'} size={14} weight="reg">{value.name}</Text>,
                            <IconStyle key={'encodingRecipesPage_isDefaultIcon'} coloricon='green'>{value.isDefault ? "check" : null}</IconStyle>,
                            <div className="flex flex-row" key={"encodingRecipesPage_labelContainer_default"}>
                                {    value.recipePresets.map((recipe, key) => {
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

    const submitRecipe = (submittedRecipe: EncodingRecipeItem | false) => {
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
            setCreateRecipeStepperOpen(false)
        }
    }
    
    return(
        !props.encodingRecipeData? 
            <LoadingSpinner size='large' color='blue80' />
            :
            <Card className="col-12 clearfix p50">
                <HeaderStyle>
                    <Text size={20} weight="reg">{t('settings_encoding_page_title')}</Text>
                </HeaderStyle>
                <Text size={14} weight="reg">{t('settings_encoding_page_description')}</Text>
                <div className="flex col col-12 mt2 mb25">
                    <IconStyle style={{marginRight: "10px"}}>info_outlined</IconStyle>
                    <Text  size={14} weight="reg"><Trans i18nKey='settings_encoding_page_help_text'>Need help understanding Encoding Recipes? Visit the <a href={getKnowledgebaseLink("Encoding Recipes")} target="_blank" rel="noopener noreferrer">Knowledge Base</a></Trans></Text>
                </div>
                <Button key={'encodingRecipesPage_TableCreateRecipeButtonHeader'} className={"col col-12 xs-show"} typeButton="secondary" sizeButton="xs" onClick={() => newRecipe()}>{t('settings_encoding_table_create_button')}</Button>
                <RecipesTable isMobile={isMobile} className="col-12" headerBackgroundColor="gray-10" id='encodingRecipeList' header={recipesHeaderElement(newRecipe)} body={recipesBodyElement(editRecipe, setDeleteWarningModalOpen, setDeletedRecipe)} />
                <CustomStepper
                    opened={createRecipeStepperOpen}
                    stepperHeader={selectedRecipe === false || !selectedRecipe.id ? t('settings_encoding_table_create_button') : "Edit Recipe"}
                    stepList={stepList}
                    isLoading={submitLoading}
                    lastStepButton={selectedRecipe === false || !selectedRecipe.id ? t('common_button_text_create') : t('common_button_text_save')}
                    functionCancel={() => setCreateRecipeStepperOpen(false)}
                    stepperData={selectedRecipe}
                    updateStepperData={(value: EncodingRecipeItem) => {setSelectedRecipe(value)}}
                    encodingRecipeData={props.encodingRecipeData}
                    getUploadUrl={props.getWatermarkUrlForUploading}
                    uploadWatermark={props.uploadWatermark}
                    deleteWatermark={props.deleteWatermark}
                    finalFunction={() => {submitRecipe(selectedRecipe)}}
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