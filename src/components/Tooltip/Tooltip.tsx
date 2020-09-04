import * as React from "react";
import { Text } from '../Typography/Text';
import { TooltipProps } from './TooltipTypes';
import { ToolTipContainerStyle } from './TooltipStyle';

export const Tooltip: React.FC<TooltipProps> = (props: TooltipProps) => {

    const [left, setLeft] = React.useState<number>(-9999)
    const [top, setTop] = React.useState<number>(-9999)
    const [visibility, setVisibility] = React.useState<boolean>(false)
    let tooltip = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        let target = document.getElementById(props.target);
        if(target && tooltip.current) {

            setTop(target.offsetTop - (tooltip.current.clientHeight + 2) );
            setLeft(props.leftValueToZero ? 0: target.offsetLeft + ((target.clientWidth - tooltip.current.clientWidth) / 2) );
            console.log(target)
    
            if(!target.onmouseleave) {
                target.onmouseleave = () => {
                    setVisibility(false);
                };  
                target.onmouseenter = () => {
                    setVisibility(true);
                };
            }
        }
    }, [visibility]);

    return (
        <ToolTipContainerStyle ref={tooltip} top={top} left={left} visibilityProp={visibility} {...props}>
            <Text className="noTransition" size={12} weight="reg" > { props.children } </Text>
        </ToolTipContainerStyle>
    )
}

Tooltip.defaultProps = {};
