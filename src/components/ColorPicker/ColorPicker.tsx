import React, { ReactHTMLElement } from 'react';
import { BlockPicker, Color } from 'react-color';
import { Text } from '../Typography/Text';
import { ColorPickerHeader, SelectedColor, ColorPickerBlock } from './ColorPickerStyle';
import { IconStyle } from '../../shared/Common/Icon';
import { useOutsideAlerter } from '../../app/utils/utils';

export const ColorPicker = (props: {defaultColor: string; callback?: Function; className?: string}) => {

    const [selectedColor, setSelectedColor] = React.useState<Color>(props.defaultColor ? props.defaultColor : '#000000');
    const [isOpened, setIsOpened] = React.useState<boolean>(false);
    const colorPickerRef = React.useRef<HTMLDivElement>(null);

    useOutsideAlerter(colorPickerRef, () => {
        if(props.callback) {
            props.callback(selectedColor);
        }
        setIsOpened(!isOpened)
    });

    React.useEffect(() => {
        props.callback(selectedColor.toString());
    }, [selectedColor])

    return (
        <div>
            <ColorPickerHeader className={props.className } onClick={() => setIsOpened(!isOpened)}>
                <div className="flex"><SelectedColor selectedColor={selectedColor.toString()} />
                    <Text size={14} weight='reg'>{selectedColor}</Text></div>
                
                <div><IconStyle coloricon="gray-5">{isOpened ?'arrow_drop_up' : 'arrow_drop_down'}</IconStyle></div>
            </ColorPickerHeader>
            <ColorPickerBlock ref={colorPickerRef} opened={isOpened}>
                <BlockPicker  color={selectedColor} onChangeComplete={(color) => setSelectedColor(color.hex)} colors={["#D14642", "#DE8536", "#FFB75D", "#1E874B", "#2899F6", "#7048E8", "#FC427B"]} triangle="hide" />
            </ColorPickerBlock>



        </div>
    )
}