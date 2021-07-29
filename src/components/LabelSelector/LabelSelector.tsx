import React from 'react'
import styled, { css } from 'styled-components'
import { Text } from '../Typography/Text'

interface LabelSelectorProps {
    labels: string[]
    callback: React.Dispatch<React.SetStateAction<string>>
    defaultSelectedLabel?: string
}

export const LabelSelector = (props: LabelSelectorProps & React.HTMLAttributes<HTMLDivElement>) => {

    const [selectedLabel, setSelectedLabel] = React.useState<string>(props.defaultSelectedLabel || props.labels[0])

    React.useEffect(() => props.callback(selectedLabel), [selectedLabel])

    const renderLabels = () => {
        return props.labels && props.labels.map(label => {
                return <SelectedLabel className='mx1' onClick={() => setSelectedLabel(label)} selected={label === selectedLabel} color={label === selectedLabel ? 'dark-violet' : 'gray-4'} weight='reg' size={16}>{label}</SelectedLabel>
        })
    }

    return (
        <div className={props.className}>
            {
                renderLabels()
            }
        </div>
    )
}

const SelectedLabel = styled(Text)<{selected: boolean}>`
    ${props => props.selected && css `
        border-bottom: 4px solid ${props.theme.colors['dark-violet']};
    `}
    &:hover {
        color: ${props => props.theme.colors['dark-violet']}
        cursor: pointer;
    }
`