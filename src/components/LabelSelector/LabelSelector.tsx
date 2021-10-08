import React from 'react'
import styled, { css } from 'styled-components'
import { Text } from '../Typography/Text'

interface LabelItem {
    title: string
    data: string
}

interface LabelSelectorProps {
    labels: LabelItem[]
    callback: React.Dispatch<React.SetStateAction<string>>
    defaultSelectedLabel?: string
}

export const LabelSelector = (props: LabelSelectorProps & React.HTMLAttributes<HTMLDivElement>) => {

    const [selectedLabel, setSelectedLabel] = React.useState<string>(props.defaultSelectedLabel || props.labels[0].data)

    React.useEffect(() => props.callback(selectedLabel), [selectedLabel])

    const renderLabels = () => {
        return props.labels && props.labels.map(label => {
                return <SelectedLabel className='mx1' onClick={() => setSelectedLabel(label.data)} selected={label.data  === selectedLabel} color={label.data === selectedLabel ? 'dark-violet' : 'gray-4'} weight='reg' size={16}>{label.title}</SelectedLabel>
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