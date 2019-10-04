import * as React from "react";
import { Text } from '../Typography/Text';
import { TooltipProps } from './TooltipTypes';
import { StorybookInputContainerStyle } from './TooltipStyle';

export const Tooltip: React.FC<TooltipProps> = (props:TooltipProps) => {

    const [left, setLeft] = React.useState<number>(-9999)
    const [top, setTop] = React.useState<number>(-9999)
    const [visibility, setVisibility] = React.useState<boolean>(false)
    let tooltip = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        let target = document.getElementById(props.target);
        setTop(target!.offsetTop - (tooltip!.current!.clientHeight + 2) );
        setLeft(target!.offsetLeft + ((target!.clientWidth - tooltip!.current!.clientWidth) / 2) );

        if(!target!.onmouseleave) {
            target!.onmouseleave = () => {
                setVisibility(false);
            };
            target!.onmouseenter = () => {
                setVisibility(true);
            };
        }

    }, []);

    return (
        <StorybookInputContainerStyle ref={tooltip} top={top} left={left} visibility={visibility} {...props}>
            <Text className="noTransition" size={12} weight="reg" > { props.children } </Text>
        </StorybookInputContainerStyle>
    )
}

Tooltip.defaultProps = {};
