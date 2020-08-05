import * as React from 'react'
import { Input } from '../../../../components/FormsComponents/Input/Input'
import { Button } from '../../../../components/FormsComponents/Button/Button'
import { ChapterMarker, ChapterMarkerInfosState } from '../../../redux-flow/store/VOD/Chapters/types'
import { dataToTimeVideo, inputTimeVideoToTs } from '../../../../utils/utils'

export const ChapterMarkerForm = (props: {vodId: string; item: ChapterMarker; chapters: ChapterMarker[]; toggle: Function; submit: Function; chapterState: ChapterMarkerInfosState}) => {

    const [chapterMarker, setChapterMarker] = React.useState<ChapterMarker>(null)
    const [enableSubmit, setEnableSubmit] = React.useState<boolean>(props.item.text.length > 0)
    const [createButtonLoading, setCreateButtonLoading] = React.useState<boolean>(false)

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

        console.log(newChapterMarker.start);

        newChapterMarker.start = typeof newChapterMarker.start !== 'string' ? Math.floor(newChapterMarker.start) :  inputTimeVideoToTs(newChapterMarker.start.toString()) ;
        if(props.item.text.length === 0) {
            submittedChapterMarkers.push({...newChapterMarker, id: newChapterMarker.text + newChapterMarker.start})
        } else {
            submittedChapterMarkers = submittedChapterMarkers.map((chapter) => {
                if(chapter.id === props.item.id) {
                    return {...newChapterMarker, id: props.item.id}
                } else {
                    return chapter
                }
            })
        }
        setCreateButtonLoading(true)
        event.preventDefault()
        props.submit(props.vodId, submittedChapterMarkers)   
    }

    React.useEffect(() => {
        if(createButtonLoading){
            setCreateButtonLoading(false)
            props.toggle(false)
        }
    }, [props.chapterState])

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
                    label='Title'
                    placeholder='Title'
                />

                <Input 
                    value={dataToTimeVideo(chapterMarker.start).toString()}
                    disabled={false}
                    onChange={(value) => setChapterMarker({...chapterMarker, start: value})}
                    id='chapterMarkerTime'
                    type='video-time'
                    placeholder='hh:mm:ss'
                    className='col col-12 pb1'
                    label='Start Time'
                />
                <div className='col col-12 py1'>
                    <Button isLoading={createButtonLoading} sizeButton="large" disabled={!enableSubmit} typeButton="primary" buttonColor="blue" >{props.item.text.length > 0 ? "Save" : "Create"}</Button>
                    <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
                </div>
            </form>
    )
}