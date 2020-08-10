import * as React from 'react'
import { ContainerStyle, DropdownLabel, DropdownSelectList } from './DropdownStyle';
import { Text } from '../../Typography/Text';
import { DropdownSelectProps } from './DropdownTypes';

export const DropdownSelect: React.FC<DropdownSelectProps> = (props: DropdownSelectProps) => {
    return (
        <ContainerStyle className={props.className}>
            {
                props.dropdownTitle !== '' && 
                    <DropdownLabel>
                        <Text size={14} weight="med">
                            {props.dropdownTitle}
                        </Text>
                    </DropdownLabel>                
            }
            <DropdownSelectList data-recurly={props.dataRecurly} onChange={(event) => props.setValue(event.currentTarget.value)}>
                {props.children}
            </DropdownSelectList>    
        </ContainerStyle>
    )
}