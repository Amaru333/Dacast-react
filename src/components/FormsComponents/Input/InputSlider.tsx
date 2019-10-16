import * as React from "react";
import { Tooltip } from '../../Tooltip/Tooltip';
import { SliderContainerStyle } from './InputStyle';
import { SliderContainerProps } from './InputTypes';
import Slider from '@material-ui/core/Slider';


export const InputSlider = (props: SliderContainerProps) => {

    const [value, setValue] = React.useState<number[]>(props.value);
    let sliderRef = React.useRef<any>(null);
    const [input1Id, setInput1Id] = React.useState<string>("")
    const [input2Id, setInput2Id] = React.useState<string>("")
    let input1 = null;
    let input2 = null;
    const handleChange = (event: React.FormEvent<HTMLInputElement>, newValue: number | number[]) => {
        setValue(newValue as number[]);
      };
      React.useEffect(() => {
          if(sliderRef.current) {
            console.log(sliderRef.current);
            input1 = sliderRef.current.children[3];
            input1.id = props.id +"sliderThumb1";
            input2 = sliderRef.current.children[4];
            input2.id = props.id +"sliderThumb2";
            console.log(input1)
            setInput1Id(input1.id)
            setInput2Id(input2.id)
          }
      }, [value])

    return (
        <SliderContainerStyle {...props} >
            <Slider ref={sliderRef}  value={value} onChange={handleChange} />
            {
                input1Id.length !== 0 ?
                <Tooltip target={input1Id}>{value[0]}</Tooltip>
                : null
            }
            {
                input2Id.length !== 0 ?
                <Tooltip target={input2Id}>{value[1]}</Tooltip>
                : null
            }
        </SliderContainerStyle>       
    )
}

