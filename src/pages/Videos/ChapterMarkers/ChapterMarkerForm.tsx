import * as React from 'react';
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Button } from '../../../components/FormsComponents/Button/Button';
import { ChapterMarker } from '../../../redux-flow/store/VOD/Chapters/types';

export const ChapterMarkerForm = (props: {item: ChapterMarker; toggle: Function; submit: Function}) => {

    const [chapterMarker, setChapterMarker] = React.useState<ChapterMarker>(null);
    const [enableSubmit, setEnableSubmit] = React.useState<boolean>(props.item.name.length > 0);

    React.useEffect(() => {
        setChapterMarker(props.item);
    }, [props.item])

    React.useEffect(() => {
        if(chapterMarker) {
            setEnableSubmit(chapterMarker.name.length > 0)
        }
    }, [chapterMarker])

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.submit(chapterMarker);
        props.toggle(false);
    }
    return (
        chapterMarker ?

            <form onSubmit={event => submitForm(event)}>
                <Input 
                    defaultValue={chapterMarker.name.toString()}
                    disabled={false}
                    onChange={(event) => setChapterMarker({...chapterMarker, name: event.currentTarget.value})}
                    required={false}
                    id='chapterMarkername'
                    type='text'
                    className='col col-12 pb1'
                    label='Title'
                    pattern="[0-9]{2}:[0-9]{2}"
                    placeholder='Title'
                />

                <Input 
                    value={chapterMarker.time}
                    disabled={false}
                    onChange={(event) => setChapterMarker({...chapterMarker, time: event.currentTarget.value})}
                    id='chapterMarkerTime'
                    type='time'
                    step='2'
                    className='col col-12 pb1'
                    label='Start Time'
                />
                <div className='col col-12 py1'>
                    <Button sizeButton="large" disabled={!enableSubmit} typeButton="primary" buttonColor="blue" >{props.item.name.length > 0 ? "Save" : "Create"}</Button>
                    <Button sizeButton="large" onClick={()=> props.toggle(false)} type="button" className="ml2" typeButton="tertiary" buttonColor="blue" >Cancel</Button>
                </div>
            </form>
            : null
    )
}