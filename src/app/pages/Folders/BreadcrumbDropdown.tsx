import React from 'react';
import { Text } from '../../../components/Typography/Text';
import { DropdownItem, DropdownItemText, DropdownList } from '../../../components/FormsComponents/Dropdown/DropdownStyle';
import { useOutsideAlerter } from '../../../utils/utils';
import { IconStyle } from '../../../shared/Common/Icon';

export const BreadcrumbDropdown = (props: {options: string; callback: Function; dropdownOptions: string[]; dropdownCallback: Function}) => {

    const [breadcrumbDropdownIsOpened, setBreadcrumbDropdownIsOpened] = React.useState<boolean>(false)
    const [hiddenFoldersDropdownIsOpened, setHiddenFoldersDropdownIsOpened] = React.useState<boolean>(false)

    const breadcrumbDropdownListRef = React.useRef<HTMLUListElement>(null);
    const hiddenFoldersDropdownListRef = React.useRef<HTMLUListElement>(null);

    useOutsideAlerter(breadcrumbDropdownListRef, () => {
        setBreadcrumbDropdownIsOpened(!breadcrumbDropdownIsOpened)
    });

    useOutsideAlerter(hiddenFoldersDropdownListRef, () => {
        setHiddenFoldersDropdownIsOpened(!hiddenFoldersDropdownIsOpened)
    });

    React.useEffect(() => {
        console.log(props.options)
    }, [props.options])


    const renderBreadcrumbDropdownList = () => {
        return (
            props.dropdownOptions.map((name, i) => {
                return (
                    <DropdownItem 
                        isSingle
                        key={name + i} 
                        id={name + i} 
                        className="mt1"
                        isSelected={false} 
                        onClick={() => props.dropdownCallback(name)}> 
                        <DropdownItemText size={14} weight='reg' color='gray-1'>{name}</DropdownItemText>
                    </DropdownItem>
                )                
            })
        )
    }

    const renderHiddenFoldersDropdownList = () => {
        const options = props.options.split('/');
        const filteredListLength = options.filter((value, i) => i !== 0 && i!== options.length - 2 && i !== options.length - 3).length
        return (
            options.filter((value, i) => i !== 0 && i!== options.length - 2 && i !== options.length - 3).map((name, i) => {
                return i < filteredListLength ? (
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
            const optionsLength = props.options.split('/').length -1; 
            if(optionsLength <= 3) {
                return props.options.split('/').map((option, i) => {
                    return i < optionsLength ? (
                        <div key={'breadcrumbOption' + option + i} className='flex items-center'>
                            { i < optionsLength - 1  || i === 0 ?
                                <>
                                    <span className='pointer' onClick={() => props.callback(props.options.split(option)[0] + option + '/')}>
                                        <Text size={14} weight={i === optionsLength - 1 ? 'reg' : 'med'} color={i === optionsLength - 1 ? 'gray-1' : 'dark-violet'}>{i === 0 ? 'All folders' : option}</Text>
                                    </span>
                                    <Text size={14} weight='reg'> &nbsp;/&nbsp; </Text>
                                </>
                                : 
                                <>
                                    <div className='relative flex items-center'>
                                        <div className='flex items-center pointer' onClick={() => setBreadcrumbDropdownIsOpened(!breadcrumbDropdownIsOpened)}>
                                            <Text size={14} weight='reg'>{option}</Text>
                                            <IconStyle coloricon='gray-1'>{breadcrumbDropdownIsOpened ? 'arrow_drop_up' : 'arrow_drop_down'}</IconStyle>
                                        </div>
                                        <DropdownList direction='up' hasSearch={false} style={{width: '128px', top: '25px'}} isSingle isInModal={false} isNavigation={false} displayDropdown={breadcrumbDropdownIsOpened} ref={breadcrumbDropdownListRef}>
                                            {renderBreadcrumbDropdownList()}
                                        </DropdownList>
                                    </div>
                                </>
                            }

                        </div>
                    )   : null
                })
            }
            else {
                const options = props.options.split('/');
                return ( 
                    <div className='flex'>
                        <div className='flex items-center'>
                            <span className='pointer' onClick={() => props.callback('/')}><Text size={14} weight='med' color='dark-violet'>All folders</Text></span>
                            <Text size={14} weight='reg'> &nbsp;/&nbsp; </Text>
                            <div className='relative pointer'>
                                <IconStyle onClick={() => setHiddenFoldersDropdownIsOpened(!hiddenFoldersDropdownIsOpened)} coloricon='dark-violet'>more_horiz</IconStyle> 
                                <DropdownList direction='up' hasSearch={false} style={{width: 'fit-content', top: '25px'}} isSingle isInModal={false} isNavigation={false} displayDropdown={hiddenFoldersDropdownIsOpened} ref={hiddenFoldersDropdownListRef}>
                                    {renderHiddenFoldersDropdownList()}
                                </DropdownList>                       
                            </div>
                                  
                        </div>
                      
                        <div className='flex items-center'>
                            <Text size={14} weight='reg'> &nbsp;/&nbsp; </Text>                            
                            <span className='pointer' onClick={() => {props.callback(props.options.split(options[options.length - 3])[0] + options[options.length - 3] +'/')}}><Text size={14} weight='med' color='dark-violet'>{options[options.length - 3]}</Text></span>
                            <Text size={14} weight='reg'> &nbsp;/&nbsp; </Text>
                        </div>
                        <div className='flex items-center relative'>
                            <div className='flex items-center pointer' onClick={() => setBreadcrumbDropdownIsOpened(!breadcrumbDropdownIsOpened)}>
                                <Text size={14} weight='reg'>{options[options.length - 2]}</Text>
                                <IconStyle coloricon='gray-1'>{breadcrumbDropdownIsOpened ? 'arrow_drop_up' : 'arrow_drop_down'}</IconStyle>
                            </div>
                            <DropdownList direction='up' hasSearch={false} style={{width: '100px', top: '25px'}} isSingle isInModal={false} isNavigation={false} displayDropdown={breadcrumbDropdownIsOpened} ref={breadcrumbDropdownListRef}>
                                {renderBreadcrumbDropdownList()}
                            </DropdownList>                         
                        </div>
                    </div>
                )
            }

        }

    }
    return (
        <div className='flex my2'>
            {renderOptions()}
        </div>
    )
}