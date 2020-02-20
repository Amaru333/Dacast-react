import React from 'react';
import { Text } from '../../components/Typography/Text';
import { IconStyle } from './FoldersStyle';
import { useOutsideAlerter } from '../../utils/utils';
import { DropdownItem, DropdownItemText, DropdownList } from '../../components/FormsComponents/Dropdown/DropdownStyle';

export const Breadcrumb = (props: {options: string; callback: Function}) => {

    const [hiddenFoldersDropdownIsOpened, setHiddenFoldersDropdownIsOpened] = React.useState<boolean>(false)


    const hiddenFoldersDropdownListRef = React.useRef<HTMLUListElement>(null);

    useOutsideAlerter(hiddenFoldersDropdownListRef, () => {
        setHiddenFoldersDropdownIsOpened(!hiddenFoldersDropdownIsOpened)
    });

    const renderHiddenFoldersDropdownList = () => {
        const options = props.options.split('/');
        const filteredListLength = options.filter((value, i) => i !== 0 && i !== options.length - 2).length
        return (
            options.filter((value, i) => i !== 0 && i !== options.length - 2).map((name, i) => {
                return i < filteredListLength - 1 ? (
                    <DropdownItem 
                        isSingle
                        key={name + i} 
                        id={name + i} 
                        className="mt1"
                        isSelected={false} 
                        onClick={() => props.callback(props.options.split(name)[0] + name + '/')}> 
                        <DropdownItemText size={14} weight='reg' color='gray-1'>{name}</DropdownItemText>
                    </DropdownItem>
                ) : null               
            })
        )
    }

    const renderOptions = () => {
        if(props.options) {
            const optionsLength = props.options.split('/').length - 1; 
            if(optionsLength <= 3) {
                return props.options.split('/').map((option, i) => {
                    return i < optionsLength ? (
                        <div key={'breadcrumbOption' + option + i} className='flex items-center'>
                            <span onClick={() => props.callback(props.options.split(option)[0] + option + '/')}><Text size={14} weight={i === optionsLength - 1 ? 'reg' : 'med'} color={i === optionsLength - 1 ? 'gray-1' : 'dark-violet'}>{i === 0 ? 'All files' : option}</Text></span>
                            <IconStyle className={i >= optionsLength  - 1 ? 'hide' : ''} coloricon='gray-1'>keyboard_arrow_right</IconStyle>
                        </div>
                    )   : null
                })
            }
            else {
                const options = props.options.split('/');
                return ( 
                    <>
                        <div className='flex items-center'>
                            <span onClick={() => props.callback('/')}><Text size={14} weight='med' color='dark-violet'>All files</Text></span>
                            <IconStyle coloricon='gray-1'>keyboard_arrow_right</IconStyle>
                        </div>
                        <div className='relative pointer'>
                            <IconStyle onClick={() => setHiddenFoldersDropdownIsOpened(!hiddenFoldersDropdownIsOpened)} coloricon='dark-violet'>more_horiz</IconStyle> 
                            <DropdownList style={{width: '100px', top: '25px'}} isSingle isInModal={false} isNavigation={false} displayDropdown={hiddenFoldersDropdownIsOpened} ref={hiddenFoldersDropdownListRef}>
                                {renderHiddenFoldersDropdownList()}
                            </DropdownList>                       
                        </div>                         <div className='flex items-center'>
                            <IconStyle coloricon='gray-1'>keyboard_arrow_right</IconStyle>
                            <span onClick={() => props.callback(props.options.split(options[options.length - 2]) + options[options.length - 2] +'/')}><Text size={14} weight='med' color='dark-violet'>{options[options.length - 2]}</Text></span>
                            <IconStyle coloricon='gray-1'>keyboard_arrow_right</IconStyle>
                        </div>
                         <div className='flex items-center'>
                             <span onClick={() => props.callback(props.options)}><Text size={14} weight='reg' color='gray-1'>{options[options.length - 1]}</Text></span>
                         </div>
                    </>
                )
            }

        }

    }
    return (
        <div className='flex col col-12 my2'>
            {renderOptions()}
        </div>
    )
}