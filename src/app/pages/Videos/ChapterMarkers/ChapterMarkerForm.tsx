import * as React from 'react'
import { Input } from '../../../../components/FormsComponents/Input/Input'
import { Button } from '../../../../components/FormsComponents/Button/Button'
import { ChapterMarker, ChapterMarkerInfosState } from '../../../redux-flow/store/VOD/Chapters/types'

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
        if(props.item.text.length === 0) {
            submittedChapterMarkers.push({...chapterMarker, id: chapterMarker.text + chapterMarker.start})
        } else {
            submittedChapterMarkers = submittedChapterMarkers.map((chapter) => {
                if(chapter.id === props.item.id) {
                    return {...chapterMarker, id: props.item.id}
                }
                else {
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
        chapterMarker ?

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
                    value={chapterMarker.start.toString()}
                    disabled={false}
                    onChange={(event) => setChapterMarker({...chapterMarker, start: parseInt(event.currentTarget.value)})}
                    id='chapterMarkerTime'
                    type='number'
                    step='2'
                    className='col col-12 pb1'
                    label='Start Time'
                />
                <div className='col col-12 py1'>
                    <Button isLoading={createButtonLoading} sizeButton="large" disabled={!enableSubmit} typeButton="primary" buttonColor="blue" >{props.item.text.length > 0 ? "Save" : "Create"}</Button>
                    <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
                </div>
            </form>
            : null
    )
}