import * as React from 'react'
import { Input } from '../../../../components/FormsComponents/Input/Input'
import { Button } from '../../../../components/FormsComponents/Button/Button'
import { ChapterMarker } from '../../../redux-flow/store/Content/Chapters/types'
import { dataToTimeVideo, inputTimeVideoToTs } from '../../../../utils/formatUtils'
import { ContentType } from '../../../redux-flow/store/Common/types'
import { useTranslation } from 'react-i18next'

export const ChapterMarkerForm = (props: {contentId: string; contentType: ContentType; item: ChapterMarker; chapters: ChapterMarker[]; toggle: (b: boolean) => void; submit: (contentId: string, contentType: ContentType, chapterMarkers: ChapterMarker[]) => Promise<void>;}) => {

    const [chapterMarker, setChapterMarker] = React.useState<ChapterMarker>(null)
    const [enableSubmit, setEnableSubmit] = React.useState<boolean>(props.item.text.length > 0)
    const [createButtonLoading, setCreateButtonLoading] = React.useState<boolean>(false)
    const { t } = useTranslation()

    React.useEffect(() => {
        setChapterMarker(props.item);
    }, [props.item])

    React.useEffect(() => {
        if(chapterMarker) {
            setEnableSubmit(chapterMarker.text.length > 0)
        }
    }, [chapterMarker])

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        let submittedChapterMarkers: ChapterMarker[] = props.chapters
        var newChapterMarker = {...chapterMarker};

        newChapterMarker.start = typeof newChapterMarker.start !== 'string' ? Math.floor(newChapterMarker.start) :  inputTimeVideoToTs(newChapterMarker.start.toString()) ;
        if(props.item.text.length === 0) {
            submittedChapterMarkers.push({...newChapterMarker, id: newChapterMarker.text + newChapterMarker.start})
        } else {
            submittedChapterMarkers = submittedChapterMarkers.map((chapter) => {
                if(chapter.id === props.item.id) {
                    return {...newChapterMarker, id: props.item.id}
                }
                return chapter
            })
        }
        setCreateButtonLoading(true)
        event.preventDefault()
        props.submit(props.contentId, props.contentType, submittedChapterMarkers).then(() => {
            setCreateButtonLoading(false)
            props.toggle(false)
        }).catch(() => setCreateButtonLoading(false))  
    }

    return (
        chapterMarker &&

            <form onSubmit={event => submitForm(event)}>
                <Input 
                    defaultValue={chapterMarker.text.toString()}
                    disabled={false}
                    onChange={(event) => setChapterMarker({...chapterMarker, text: event.currentTarget.value})}
                    required={false}
                    id='chapterMarkername'
                    type='text'
                    className='col col-12 pb1'
                    label={t('common_content_list_table_header_title')}
                    placeholder={t('common_content_list_table_header_title')}
                />

                <Input 
                    value={dataToTimeVideo(chapterMarker.start).toString()}
                    disabled={false}
                    onChange={(value) => setChapterMarker({...chapterMarker, start: value})}
                    id='chapterMarkerTime'
                    type='video-time'
                    placeholder='hh:mm:ss'
                    className='col col-12 pb1'
                    label={t('video_chapters_add_chapter_modal_start_time_input')}
                />
                <div className='col col-12 py1'>
                    <Button isLoading={createButtonLoading} sizeButton="large" disabled={!enableSubmit} typeButton="primary" buttonColor="blue" >{props.item.text.length > 0 ? t('common_button_text_save') : t('common_button_text_create')}</Button>
                    <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >{t('common_button_text_cancel')}</Button>
                </div>
            </form>
    )
}