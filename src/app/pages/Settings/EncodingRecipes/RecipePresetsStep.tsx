import React from "react"
import { EncodingRecipeItem, EncodingRecipesData, RecipePreset } from "../../../redux-flow/store/Settings/EncodingRecipes/EncodingRecipesTypes"
import { Text } from "../../../../components/Typography/Text"
import { InputCheckbox } from "../../../../components/FormsComponents/Input/InputCheckbox"
import { Table } from "../../../../components/Table/Table"
import { IconStyle } from "../../../../shared/Common/Icon"
import { getKnowledgebaseLink } from "../../../constants/KnowledgbaseLinks"
import { Trans, useTranslation } from "react-i18next"

export const RecipePresetStep = (props: {stepperData: EncodingRecipeItem; updateStepperData: React.Dispatch<React.SetStateAction<EncodingRecipeItem>>; setStepValidated: React.Dispatch<React.SetStateAction<boolean>>; encodingRecipeData: EncodingRecipesData}) => {

    const { t } = useTranslation()
    const createRecipeHeaderElement = () => {
        return {data: [
            {cell: <Text key={'encodingRecipesPage_Present'} size={14} weight="med">{t('video_renditions_table_header_rendition')}</Text>},
            {cell: <Text key={'encodingRecipesPage_SizePx'} size={14} weight="med">{t('video_renditions_table_header_size')}</Text>},
            {cell: <Text key={'encodingRecipesPage_BitrateMbps'} size={14} weight="med">{t('video_renditions_table_header_bitrate')}</Text>},
        ]}
    }

    const createRecipeBodyElement = () => {

        React.useEffect(() => {
            props.setStepValidated(props.stepperData.recipePresets.length > 0)
        }, [])
        
        if(props.encodingRecipeData.defaultRecipePresets) {
            let presets: RecipePreset[] = props.encodingRecipeData.defaultRecipePresets
            return presets.map((value, key) => {
    
                return {data: [
                    <InputCheckbox key={key + value.name} label={value.description} defaultChecked={props.stepperData.recipePresets.includes(value.name)} id={value.name} onChange={(event) => {
                        if (event.currentTarget.checked && props.stepperData.recipePresets.length < 6) {
                            props.stepperData.recipePresets.push(value.name)
                            props.updateStepperData({ ...props.stepperData})
                            props.setStepValidated(props.stepperData.recipePresets.length >= 1)
                        } else {
                            const editedRecipePresets = props.stepperData.recipePresets.filter(item => item !== value.name)
                            props.setStepValidated(editedRecipePresets.length >= 1)
                            props.updateStepperData({ ...props.stepperData, recipePresets: editedRecipePresets })
                        }
                    }
                    } />,
                    <Text key={'encodingRecipesPage_' + value.size + key} size={14} weight="reg">{value.size.toString() !== '0' ? value.size : 'Auto'}</Text>,
                    <Text key={'encodingRecipesPage_' + value.bitrate + key} size={14} weight="reg">{value.bitrate ? value.bitrate / 1000 : null}</Text>,
                ]}
            })
        }
    
    }
    return (
        <div className="block clearfix">
            <Text weight='reg' size={14}>
                {t('settings_encoding_modal_preset_description')}
            </Text>
            <Table tableHeight={300} className="col col-12 mt2" headerBackgroundColor="gray-10" id="createRecipe" header={createRecipeHeaderElement()} body={createRecipeBodyElement()} />
            <div className="flex col col-12 mt3">
                <IconStyle style={{ marginRight: "10px" }}>info_outlined</IconStyle>
                <Text size={14} weight="reg"><Trans i18nKey='settings_encoding_modal_preset_help_text'>Need help choosing your presets? Visit the <a href={getKnowledgebaseLink("Encoding Recipes")} target="_blank" rel="noopener noreferrer">Knowledge Base</a></Trans></Text>
            </div>
        </div>
    )
}