import React from 'react';
import { Text } from '../../components/Typography/Text';
import { IconStyle } from './FoldersStyle';

export const Breadcrumb = (props: {options: string; callback: Function}) => {

    const renderOptions = () => {
        if(props.options) {
            const optionsLength = props.options.split('/').length - 1;
            return props.options.split('/').map((option, i) => {
                return (
                    <div key={'breadcrumbOption' + option + i} className='flex items-center'>
                        <span onClick={() => props.callback(props.options.split(option)[0] + option + '/')}><Text size={14} weight={i === optionsLength ? 'reg' : 'med'} color={i === optionsLength ? 'gray-1' : 'dark-violet'}>{i === 0 ? 'All files' : option}</Text></span>
                        <IconStyle className={i === optionsLength ? 'hide' : ''} coloricon='gray-1'>keyboard_arrow_right</IconStyle>
                    </div>
                )
            })
        }

    }
    return (
        <div className='flex col col-12'>
            {renderOptions()}
        </div>
    )
}