import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../../redux-flow/store";
import { Action } from '../../../redux-flow/store/VOD/Chapters/actions';
import { Icon } from '@material-ui/core';
import { tsToLocaleDate, readableBytes } from '../../../utils/utils';
import { IconContainer } from '../../Settings/ApiIntegration/ApiIntegration';
import { Table } from '../../../components/Table/Table';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { VodItem } from '../../../redux-flow/store/VOD/General/types';
import { Label } from '../../../components/FormsComponents/Label/Label';
import { getVodListAction, deleteVodAction } from '../../../redux-flow/store/VOD/General/actions';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";

interface VodListProps {
    items: VodItem[];
    getVodList: Function;
    deleteVodList: Function;
}

const VodList = (props: VodListProps) => {

    const [selectedVod, setSelectedVod] = React.useState<number[]>([]);
    var history = useHistory();

    React.useEffect(() => {
        if (!props.items) {
            props.getVodList();
        }
    }, [selectedVod])

    const vodListHeaderElement = () => {
        return [
            <InputCheckbox className="inline-flex" label="" key="checkboxVodListBulkAction" indeterminate={selectedVod.length >= 1 && selectedVod.length < props.items.length} defaultChecked={selectedVod.length === props.items.length} id="globalCheckboxVodList" onChange={(event) => {
                console.log(event.currentTarget.checked, "oco1");
                if (event.currentTarget.checked) {
                    const editedSelectedVod = props.items.map(item => { return item.id })
                    setSelectedVod(editedSelectedVod);
                } else if (event.currentTarget.indeterminate || !event.currentTarget.checked) {
                    setSelectedVod([])
                }
            }
            } />,
            <></>,
            <Text key="nameVodList" size={14} weight="med" color="gray-1">Name</Text>,
            <Text key="sizeVodList" size={14} weight="med" color="gray-1">Size</Text>,
            <Text key="viewsVodList" size={14} weight="med" color="gray-1">Views</Text>,
            <Text key="viewsVodList" size={14} weight="med" color="gray-1">Created</Text>,
            <Text key="statusVodList" size={14} weight="med" color="gray-1">Status</Text>,
            <Text key="statusVodList" size={14} weight="med" color="gray-1">Features</Text>,
            <div style={{width: "80px"}} ></div>,
        ]
    }

    const handleFeatures = (item: VodItem) => {
        var vodElement = []
        if (item.features.paywall) {
            vodElement.push(<IconGreyContainer className="mr1" ><IconStyle>attach_money</IconStyle></IconGreyContainer>)
        }
        if (item.features.folder) {
            vodElement.push(<IconGreyContainer className="mr1" ><IconStyle>folder</IconStyle></IconGreyContainer>)
        }
        if (item.features.playlist) {
            vodElement.push(<IconGreyContainer className="mr1" ><IconStyle>video_library</IconStyle></IconGreyContainer>)
        }
        return vodElement;
    }

    const vodListBodyElement = () => {
        console.log(selectedVod);
        if (props.items) {
            return props.items.map((value, key) => {
                debugger;
                return [
                    <InputCheckbox className="inline-flex" label="" key={"checkbox" + value.id} defaultChecked={selectedVod.includes(value.id)} id={"checkbox" + value.id.toString()} onChange={(event) => {
                        if (event.currentTarget.checked && selectedVod.length < props.items.length) {
                            setSelectedVod([...selectedVod, value.id])
                        } else {
                            const editedSelectedVod = selectedVod.filter(item => item !== value.id)
                            setSelectedVod(editedSelectedVod);
                        }
                    }
                    } />,
                    <img className="p2" key={"thumbnail" + value.id} width={70} height={42} src={value.thumbnail} ></img>,
                    <Text key={"title" + value.id} size={14} weight="reg" color="gray-1">{value.title}</Text>,
                    <Text key={"size" + value.id} size={14} weight="reg" color="gray-1">{readableBytes(value.size)}</Text>,
                    <Text key={"views" + value.id} size={14} weight="reg" color="gray-1">{value.views}</Text>,
                    <Text key={"created" + value.id} size={14} weight="reg" color="gray-1">{tsToLocaleDate(value.created)}</Text>,
                    <Text key={"status" + value.id} size={14} weight="reg" color="gray-1">{value.online ? <Label backgroundColor="green20" color="green" label="Online" /> : <Label backgroundColor="red20" color="red" label="Offline" />}</Text>,
                    <>{handleFeatures(value)}</>,
                    <div key={"more" + value.id} className="iconAction right mr2" ><Icon onClick={() => { history.push('/video/general') }} className="right mr1" >edit</Icon><Icon onClick={() => { props.deleteVodList(value.title) }} className="right mr1" >delete</Icon></div>,
                ]
            })
        }
    }


    if (!props.items) {
        return <LoadingSpinner className="mlauto mrauto" size="large" color="violet" />
    } else {
        return (
            <Table className="col-12" id="apiKeysTable" header={vodListHeaderElement()} body={vodListBodyElement()} />
        )
    }

}


export const IconStyle = styled(Icon)`
    margin: auto;
    font-size: 16px !important;
    
`

const IconGreyContainer = styled.div<{}>`
    position: relative;
    z-index: 1;
    color :  ${props => props.theme.colors["gray-3"]} ;
    display: inline-flex;
    height: 24px;
    width: 24px;
    align-items: center;
    &:before {
        content: '';
        display: inline-block;
        width: 24px;
        z-index: -1;
        height: 24px;
        position: absolute;
        border-radius: 12px;
        background-color: ${props => props.theme.colors["gray-8"]} ;
    }
`

export function mapStateToProps(state: ApplicationState) {
    return {
        items: state.vod.list
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodList: () => {
            dispatch(getVodListAction());
        },
        deleteVodList: (name: string) => {
            dispatch(deleteVodAction(name));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VodList);