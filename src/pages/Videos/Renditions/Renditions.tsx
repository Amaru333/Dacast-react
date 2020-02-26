import React from 'react';
import { Text } from '../../../components/Typography/Text';
import { Icon } from '@material-ui/core';
import { RenditionsWidget, RenditionsTable, ButtonContainer } from './RenditionsStyle';
import { Table } from '../../../components/Table/Table';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Label } from '../../../components/FormsComponents/Label/Label';
import { RenditionsList, Rendition } from '../../../redux-flow/store/VOD/Renditions/types';
import { Modal, ModalContent, ModalFooter } from '../../../components/Modal/Modal';

interface VodRenditionsProps {
    renditions: RenditionsList;
    addVodRenditions: Function;
    deleteVodRenditions: Function;
}

export const VodRenditionsPage = (props: VodRenditionsProps) => {

    const [notEncodedRenditions, setNotEncodedRenditions] = React.useState<Rendition[]>([])
    const [selectedNotEncodedRendition, setSelectedNotEncodedRendition] = React.useState<string[]>([])
    const [selectedEncodedRendition, setSelectedEncodedRendition] = React.useState<string[]>([])
    const [encodeRenditionsModalOpen, setEncodeRenditionsModalOpen] = React.useState<boolean>(false)
    const [deleteRenditionsModalOpen, setDeleteRenditionsModalOpen] = React.useState<boolean>(false)
    const [replaceSourceModalOpen, setReplaceSourceModalOpen] = React.useState<boolean>(false)

    React.useEffect(() => {
        let renditionsId = props.renditions.encodedRenditions.map((renditions) => {return renditions.id})
        setNotEncodedRenditions(props.renditions.renditionsList.filter((rendition) => !renditionsId.includes(rendition.id)))
    }, [props.renditions.encodedRenditions])

    const notEncodedRenditionsTableHeader = () => {
        return [
            <InputCheckbox className="inline-flex" id="globalCheckboxNotEncoded" disabled={selectedEncodedRendition.length > 0} indeterminate={selectedNotEncodedRendition.length >= 1 && selectedNotEncodedRendition.length < notEncodedRenditions.length} defaultChecked={selectedNotEncodedRendition.length === notEncodedRenditions.length}
                onChange={(event) => {
                    if (event.currentTarget.checked) {
                        const editedSelectedRenditions = notEncodedRenditions.map(item => { return item.id })
                        setSelectedNotEncodedRendition(editedSelectedRenditions);
                    } else if (event.currentTarget.indeterminate || !event.currentTarget.checked) {
                        setSelectedNotEncodedRendition([])
                    }
                }} />,
            <Text size={14} weight="med">Rendition</Text>,
            <Text size={14} weight="med">Size (px)</Text>,
            <Text size={14} weight="med">Bitrate Cap (Mbps)</Text>
        ]
    }

    const notEncodedRenditionsTableBody = () => {
        return notEncodedRenditions.map((value) => {
            return [
                <InputCheckbox className="inline-flex" key={"checkbox" + value.id} id={"checkbox" + value.id} disabled={selectedEncodedRendition.length > 0}
                    defaultChecked={selectedNotEncodedRendition.includes(value.id)}
                    onChange={(event) => {
                        if (event.currentTarget.checked && selectedNotEncodedRendition.length < notEncodedRenditions.length) {
                            setSelectedNotEncodedRendition([...selectedNotEncodedRendition, value.id])
                        } else {
                            const editedSelectedRenditions = selectedNotEncodedRendition.filter(item => item !== value.id)
                            setSelectedNotEncodedRendition(editedSelectedRenditions);
                        }
                    }
                    } />,
                <Text key={value.rendition} size={14} weight="reg">{value.rendition}</Text>,
                <Text key={"size" + value.size} size={14} weight="reg">{value.size}</Text>,
                <Text key={"bitrate" + value.bitrateCap} size={14} weight="reg">{value.bitrateCap}</Text>,
            ]
        })
    }

    const EncodedRenditionsTableHeader = () => {
        return [
            <InputCheckbox className="inline-flex" id="globalCheckboxEncoded" disabled={selectedNotEncodedRendition.length > 0} indeterminate={selectedEncodedRendition.length >= 1 && selectedEncodedRendition.length < props.renditions.encodedRenditions.length} defaultChecked={selectedEncodedRendition.length === props.renditions.encodedRenditions.length}
                onChange={(event) => {
                    if (event.currentTarget.checked) {
                        const editedSelectedEncodedRendition = props.renditions.encodedRenditions.map(item => { return item.id })
                        setSelectedEncodedRendition(editedSelectedEncodedRendition);
                    } else if (event.currentTarget.indeterminate || !event.currentTarget.checked) {
                        setSelectedEncodedRendition([])
                    }
                }} />,
            <Text size={14} weight="med">Rendition</Text>,
            <Text size={14} weight="med">Size (px)</Text>,
            <Text size={14} weight="med">Bitrate Cap (Mbps)</Text>,
            <Text size={14} weight="med">Status</Text>
        ]
    }

    const EncodedRenditionsTableBody = () => {
        return props.renditions.encodedRenditions.map((value) => {
            return [
                <InputCheckbox className="inline-flex" key={"checkbox" + value.id} id={"checkbox" + value.id} disabled={selectedNotEncodedRendition.length > 0}
                    defaultChecked={selectedEncodedRendition.includes(value.id)}
                    onChange={(event) => {
                        if (event.currentTarget.checked && selectedEncodedRendition.length < props.renditions.encodedRenditions.length) {
                            setSelectedEncodedRendition([...selectedEncodedRendition, value.id])
                        } else {
                            const editedSelectedEncodedRendition = selectedEncodedRendition.filter(item => item !== value.id)
                            setSelectedEncodedRendition(editedSelectedEncodedRendition);
                        }
                    }} />,
                <Text size={14} weight="reg">{value.rendition}</Text>,
                <Text size={14} weight="reg">{value.size}</Text>,
                <Text size={14} weight="reg">{value.bitrateCap}</Text>,
                value.encoded ? 
                    <Label color={"green"} backgroundColor={"green20"} label="Encoded" />
                    :
                    <Label color={"gray-1"} backgroundColor={"gray-9"} label="Processing" />
            ]
        })
    }

    const encodeRenditions = () => {
        event.preventDefault();
        props.addVodRenditions(selectedNotEncodedRendition)
        setSelectedNotEncodedRendition([])
    }

    const deleteRenditions = () => {
        event.preventDefault();
        props.deleteVodRenditions(selectedEncodedRendition)
        setSelectedEncodedRendition([])
    }

    return (
        <React.Fragment>
            <div className="col col-12">
                <Button className="right mb2" sizeButton="xs" typeButton="secondary" onClick={() => setReplaceSourceModalOpen(true)}>Replace Source File</Button>
            </div>
            <div>
                <Text size={14} weight="reg">Add or delete transcoding options from your file. Please note that adding bitrates to your file requires encoding and also extra storage space.</Text>
            </div>
            <div className="flex mt1">
                <Icon style={{marginRight: "10px"}}>info_outlined</Icon>
                <Text  size={14} weight="reg">Need help understanding Renditions? Visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
            </div>
            <div className="widgets flex items-baseline mt25">
                <RenditionsWidget>
                    <div >
                        <Text size={24} weight="reg">1.30 MB</Text>
                    </div>
                    <div className="mt1">
                        <Text size={14} weight="reg">Source File Size</Text>
                    </div>
                </RenditionsWidget>
                <RenditionsWidget>
                    <div>
                        <Text size={24} weight="reg">57 Mbps</Text>
                    </div>
                    <div className="mt1">
                        <Text size={14} weight="reg">Source File Bitrate</Text>
                    </div>
                </RenditionsWidget>
                <RenditionsWidget>
                    <div>
                        <Text size={24} weight="reg">100 GB</Text>
                    </div>
                    <div className="mt1">
                        <Text size={14} weight="reg">Storage Remaining</Text>
                    </div>
                </RenditionsWidget>
                <RenditionsWidget>
                    <div>
                        <Text size={24} weight="reg">15 GB</Text>
                    </div>
                    <div className="mt1">
                        <Text size={14} weight="reg">Encoding Remaining</Text>
                    </div>
                </RenditionsWidget>
            </div>

            <div className="renditionsContainer mt25 col col-12">
                <div className="notEncodedTableContainer col col-5">
                    <div className="mb1">
                        <Text size={20} weight="med">Not Encoded</Text>
                    </div>
                    <RenditionsTable className="notEncodedTable ">
                        <Table hasContainer id="notEncodedRenditionsTable" header={notEncodedRenditionsTableHeader()} body={notEncodedRenditionsTableBody()} /> 
                    </RenditionsTable>
                     
                </div>
                <ButtonContainer className="col">
                    <Button className="mb2" type="button" typeButton="secondary" sizeButton="xs" disabled={selectedEncodedRendition.length > 0} 
                        onClick={() => setEncodeRenditionsModalOpen(true)}
                    >Encode ></Button>
                    <Button type="button" typeButton="secondary" sizeButton="xs" disabled={selectedNotEncodedRendition.length > 0} 
                        onClick={() => setDeleteRenditionsModalOpen(true)}
                    >&lt; Delete</Button>
                </ButtonContainer>
                <div className="notEncodedTableContainer col col-5">
                    <div className="mb1">
                        <Text size={20} weight="med">Encoded</Text>
                    </div>
                    <RenditionsTable className="notEncodedTable ">
                        <Table hasContainer id="EncodedRenditionsTable" header={EncodedRenditionsTableHeader()} body={EncodedRenditionsTableBody()} /> 
                    </RenditionsTable>
                     
                </div>
            </div>
            <Modal size="small" title="Encode Renditions" opened={encodeRenditionsModalOpen} toggle={() => setEncodeRenditionsModalOpen(false)} hasClose={false}>
                <ModalContent>
                    <Text size={14} weight="reg">Are you sure you want to encode the selected renditions? This will come at a cost</Text> 
                </ModalContent>
                <ModalFooter>
                    <Button onClick={() => {encodeRenditions();setEncodeRenditionsModalOpen(false)}}>Encode</Button>
                    <Button typeButton="tertiary" onClick={() => setEncodeRenditionsModalOpen(false)}>Cancel</Button>  
                </ModalFooter>
            </Modal>
            <Modal size="small" title="Delete Renditions" opened={deleteRenditionsModalOpen} toggle={() => setDeleteRenditionsModalOpen(false)} hasClose={false} icon={{name: "warning", color: "red"}}>
                <ModalContent>
                    <Text size={14} weight="reg">Are you sure you want to delete the selected renditions?</Text> 
                </ModalContent>
                <ModalFooter>
                    <Button onClick={() => {deleteRenditions();setDeleteRenditionsModalOpen(false)}}>Delete</Button>
                    <Button typeButton="tertiary" onClick={() => setDeleteRenditionsModalOpen(false)}>Cancel</Button>  
                </ModalFooter>
            </Modal>
            <Modal size="small" title="Replace Source File" opened={replaceSourceModalOpen} toggle={() => setReplaceSourceModalOpen(false)} hasClose={false}>
                <ModalContent>
                    <Text size={14} weight="reg">When a video is replaced, the previous version is completely updated and any existing links will lead to your new upload. </Text> 
                </ModalContent>
                <ModalFooter>
                    <Button onClick={() => {setReplaceSourceModalOpen(false)}}>Upload Replacement</Button>
                    <Button typeButton="tertiary" onClick={() => setReplaceSourceModalOpen(false)}>Cancel</Button>  
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )
}