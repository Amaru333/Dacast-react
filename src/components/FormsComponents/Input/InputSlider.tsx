import * as React from "react";
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';
import { Tooltip } from '../../Tooltip/Tooltip';

const customTooltip = (customProps: any) => {
    return (
        <Tooltip target={customProps.input}>{customProps.value}</Tooltip>
    )
}


export const InputSlider = (props: any) => {

    const [value, setValue] = React.useState<number[]>(props.value);
    let sliderRef = React.useRef<any>(null);
    const [input1Id, setInput1Id] = React.useState<string>("")
    const [input2Id, setInput2Id] = React.useState<string>("")
    let input1 = null;
    let input2 = null;
    const handleChange = (event: any, newValue: number | number[]) => {
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
        <div style={{position:'relative'}}>

            <SliderStyle ref={sliderRef} {...props} value={value} onChange={handleChange}/>
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

        </div>
        
        
    )

}

export const SliderStyle = styled(Slider)`
    & .MuiSlider-rail {
        color: ${props => props.theme.colors["violet40"]};
        opacity: 1;
    }
    & .MuiSlider-thumb, .MuiSlider-track{
        background-color: ${props => props.theme.colors["dark-violet"]}
    }
`