import React from 'react';
import { Text } from '../../../components/Typography/Text';
import { useOutsideAlerter } from '../../../utils/utils';
import { DropdownItem, DropdownItemText, DropdownList } from '../../../components/FormsComponents/Dropdown/DropdownStyle';
import { IconStyle } from '../../../shared/Common/Icon';

export const Breadcrumb = (props: {options: string; callback: Function; isNavigation?: boolean}) => {

    const [hiddenFoldersDropdownIsOpened, setHiddenFoldersDropdownIsOpened] = React.useState<boolean>(false)


    const hiddenFoldersDropdownListRef = React.useRef<HTMLUListElement>(null);

    useOutsideAlerter(hiddenFoldersDropdownListRef, () => {
        setHiddenFoldersDropdownIsOpened(!hiddenFoldersDropdownIsOpened)
    });

    const renderHiddenFoldersDropdownList = () => {
        const options = props.options.split('/').filter(f => f);
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
            const optionsLength = props.options.split('/').filter(f => f).length; 
            if(optionsLength <= 3) {
                return props.options.split('/').filter(f => f).map((option, i) => {
                    return i < optionsLength ? (
                        <div key={'breadcrumbOption' + option + i} className='flex items-center'>
                            <span onClick={() => props.callback(props.options.split(option)[0] + option + '/')}><Text size={14} weight={i === optionsLength - 1 ? 'reg' : 'med'} color={i === optionsLength - 1 ? 'gray-1' : 'dark-violet'}>{i === 0 && !props.isNavigation ? 'All folders' : option}</Text></span>
                            <Text className={i >= optionsLength  - 1 ? 'hide' : ''} size={14} weight='reg'> &nbsp;/&nbsp; </Text>
                        </div>
                    )   : null
                })
            }
            else {
                const options = props.options.split('/').filter(f => f);
                return ( 
                    <>
                        <div className='flex items-center'>
                            <span onClick={() => props.callback('/')}><Text size={14} weight='med' color='dark-violet'>{props.isNavigation ? options[0] : 'All folders'}</Text></span>
                            <Text size={14} weight='reg'> &nbsp;/&nbsp; </Text>
                        </div>
                        <div className='relative pointer'>
                            <IconStyle onClick={() => setHiddenFoldersDropdownIsOpened(!hiddenFoldersDropdownIsOpened)} coloricon='dark-violet'>more_horiz</IconStyle> 
                            <DropdownList hasSearch={false} style={{width: 'fit-content', top: '25px'}} isSingle isInModal={false} isNavigation={false} displayDropdown={hiddenFoldersDropdownIsOpened} ref={hiddenFoldersDropdownListRef}>
                                {renderHiddenFoldersDropdownList()}
                            </DropdownList>                       
                        </div>                         
                        <div className='flex items-center'>
                            <Text size={14} weight='reg'> &nbsp;/&nbsp; </Text>
                            <span onClick={() => props.callback(props.options.split(options[options.length - 2]) + options[options.length - 2] +'/')}><Text size={14} weight='med' color='dark-violet'>{options[options.length - 2]}</Text></span>
                            <Text size={14} weight='reg'> &nbsp;/&nbsp; </Text>
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