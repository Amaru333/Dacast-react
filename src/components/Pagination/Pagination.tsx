import React from 'react';
import { IconStyle } from '../../shared/Common/Icon';
import styled from 'styled-components';
import { Text } from '../Typography/Text';
import { isMobile } from 'react-device-detect'
import { DropdownButton } from '../FormsComponents/Dropdown/DropdownButton';
import { useMedia } from '../../utils/utils';
import { DropdownSingleListItem } from '../FormsComponents/Dropdown/DropdownTypes';

interface PaginationProps { 
    totalResults: number;
    displayedItemsOptions: number[];
    callback: Function;
    defaultDisplayedOption?: number;
    defaultPage?: number;
    className?: string;
    smallScreen?: boolean;
}

export const Pagination = (props: PaginationProps) => {

    const [currentPage, setCurrentPage] = React.useState<number>(props.defaultPage || 1);
    const [displayedOptions, setDisplayedOptions] = React.useState<number>(props.defaultDisplayedOption ? props.defaultDisplayedOption : props.displayedItemsOptions[0]);
    const [flag, setFlag] = React.useState<boolean>(false)

    const lastPage = Math.ceil(props.totalResults / displayedOptions)
    
    let smallScreen = props.smallScreen || useMedia('(max-width: 780px)')

    React.useEffect(() => {
        if(!flag) {
            setFlag(true)
        }
    }, [])

    React.useEffect(() => {
        if(flag) {
            props.callback(currentPage, displayedOptions)
        }
    }, [currentPage, displayedOptions])

    const renderPaginationButtons = () => {
        return Array.from(
            {length: props.totalResults / displayedOptions < 5 ? lastPage : 5 }, 
            (v, i) => {
                return currentPage > 5 ? currentPage - (4 - i) : i + 1
            }).map((page) => {
            return (
                <PaginationButton key={'paginationButtonPage' + page} onClick={() => {setCurrentPage(page)}} currentPage={page === currentPage}>{page}</PaginationButton>
            )
        })
    }

    return props.totalResults >= props.displayedItemsOptions[0] && (    
        <div className={(isMobile || smallScreen ? 'flex flex-column mx-auto ' : 'flex ') + (props.className ? props.className : '')}>
            <div className={'flex items-baseline flex-auto my2' + (isMobile || smallScreen ? ' order-1 mx-auto' : '')}>
                <Text size={14} weight='reg'>Showing </Text>
                <DropdownButton
                    className='mx1'
                    id='paginationDropdown'
                    dropdownDefaultSelect={props.defaultDisplayedOption ? {title: props.defaultDisplayedOption.toString()} : null}
                    list={props.displayedItemsOptions.map(item => {return {title: item.toString()}})}
                    callback={(value: DropdownSingleListItem) => {setDisplayedOptions(parseInt(value.title))}}
                />
                <Text size={14} weight='reg'>of {props.totalResults} results</Text>
            </div>
            <div className={'flex items-baseline my2' + (isMobile || smallScreen ? ' order-0 mx-auto' : '')}>
                <IconStyle coloricon={currentPage === 1 ? 'gray-7' : 'gray-3'} disabled={currentPage === 1} onClick={currentPage !== 1 ? () => {setCurrentPage(1)} : null}>first_page</IconStyle>
                <IconStyle coloricon={currentPage === 1 ? 'gray-7' : 'gray-3'} disabled={currentPage === 1} onClick={currentPage !== 1 ? () => {setCurrentPage(currentPage - 1)} : null}>keyboard_arrow_left</IconStyle>
                {renderPaginationButtons()}
                <IconStyle coloricon={currentPage === lastPage ? 'gray-7' : 'gray-3'} disabled={currentPage === lastPage} onClick={currentPage !== lastPage ? () => {setCurrentPage(currentPage + 1)} : null}>keyboard_arrow_right</IconStyle>
                <IconStyle coloricon={currentPage === lastPage ? 'gray-7' : 'gray-3'} disabled={currentPage === lastPage} onClick={currentPage !== lastPage ? () => {setCurrentPage(lastPage)}: null}>last_page</IconStyle>
            </div>
        </div>
    )
}

const PaginationButton = styled.button<{currentPage: boolean}>`
    width: 23px;
    height: 28px;
    margin-right: 4px;
    color: ${props => props.currentPage ? props.theme.colors['dark-violet'] : props.theme.colors['gray-1']};
    background-color: ${props => props.currentPage ? props.theme.colors['violet20'] : 'white' };
    border: 1px solid ${props => props.currentPage ? props.theme.colors['dark-violet'] :  props.theme.colors['gray-7']};
    border-radius: 4px;
    align-self: flex-start;
    cursor: pointer;
    padding: unset;
    text-align: center;
`