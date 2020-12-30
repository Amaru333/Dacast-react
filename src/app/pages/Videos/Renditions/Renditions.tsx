import React from 'react';
import { Text } from '../../../../components/Typography/Text';
import { IconStyle } from '../../../../shared/Common/Icon';
import { RenditionsWidget, RenditionsTable, ButtonContainer } from './RenditionsStyle';
import { Table } from '../../../../components/Table/Table';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { RenditionsList, Rendition } from '../../../redux-flow/store/Content/Renditions/types';
import { Modal, ModalContent, ModalFooter } from '../../../../components/Modal/Modal';
import { useWebSocket } from '../../../utils/custom-hooks/webSocketHook';
import { UploadObject } from '../../../utils/services/uploader/uploaderService';
import { ProgressBar } from '../../../../components/FormsComponents/Progress/ProgressBar/ProgressBar';
import { VodRenditionsProps } from '../../../containers/Videos/Renditions';
import { getKnowledgebaseLink } from '../../../constants/KnowledgbaseLinks';

export const VodRenditionsPage = (props: VodRenditionsProps & {contentId: string; contentType: string}) => {

    const FILE_CHUNK_SIZE = 10000000 // 10MB
    const MAX_REQUEST_PER_BATCH = 100
    const NB_CONCURRENT_REQUESTS = 5

    const [notEncodedRenditions, setNotEncodedRenditions] = React.useState<Rendition[]>([])
    const [selectedNotEncodedRendition, setSelectedNotEncodedRendition] = React.useState<string[]>([])
    const [selectedEncodedRendition, setSelectedEncodedRendition] = React.useState<string[]>([])
    const [encodeRenditionsModalOpen, setEncodeRenditionsModalOpen] = React.useState<boolean>(false)
    const [deleteRenditionsModalOpen, setDeleteRenditionsModalOpen] = React.useState<boolean>(false)
    const [replaceSourceModalOpen, setReplaceSourceModalOpen] = React.useState<boolean>(false)
    const [newSourceFileUpload, setNewSourceFileUpload] = React.useState<UploadObject>(null)
    const [newSourceFileUploadProgress, setNewSourceFileUploadProgress] = React.useState<number>(0)
    const [uploadError, setUploadError] = React.useState<string>(null)
    // the data from the WS to know when the processing renditions are completed
    let wsData = useWebSocket()

    let replaceSourceFileBrowseButtonRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        if(!replaceSourceModalOpen) {
            setUploadError(null)
            setNewSourceFileUpload(null)
        }
    }, [replaceSourceModalOpen])

    
    React.useEffect(() => {
        if(wsData){
            setTimeout(() => {
                props.getContentRenditions(props.contentId, props.contentType)
            }, 10000)
        }  
    }, [wsData])

    React.useEffect(() => {
        let renditionName = props.renditions.encodedRenditions.map((renditions) => {return renditions.name})
        setNotEncodedRenditions(props.renditions.presets.filter((rendition) => !renditionName.includes(rendition.name)))
    }, [props.renditions.encodedRenditions])

    const notEncodedRenditionsTableHeader = () => {
        return {data: [
            {cell: 
                <InputCheckbox 
                    className="inline-flex" id="globalCheckboxNotEncoded" 
                    disabled={selectedEncodedRendition.length > 0} 
                    indeterminate={selectedNotEncodedRendition.length >= 1 && selectedNotEncodedRendition.length < notEncodedRenditions.length} 
                    defaultChecked={selectedNotEncodedRendition.length > 0 && selectedNotEncodedRendition.length === notEncodedRenditions.length}
                    onChange={(event) => {
                        if (event.currentTarget.checked && !(selectedNotEncodedRendition.length >= 1 && selectedNotEncodedRendition.length < notEncodedRenditions.length)) {
                            const editedSelectedRenditions = notEncodedRenditions.filter(item => { 
                                const disabledRendition = item.size > props.renditions.videoInfo.width;
                                if(!disabledRendition) {
                                    return true
                                } else {
                                    return false;
                                }
                            }).map( (renditions) => {return renditions.name} )
                            setSelectedNotEncodedRendition(editedSelectedRenditions);
                        } else {
                            setSelectedNotEncodedRendition([])
                        }
                    }} 
                />
            },
            {cell: <Text size={14} weight="med">Rendition</Text>},
            {cell: <Text size={14} weight="med">Size (px)</Text>},
            {cell: <Text size={14} weight="med">Bitrate Cap (Mbps)</Text>}
        ]}
    }

    const notEncodedRenditionsTableBody = () => {
        return notEncodedRenditions.map((value) => {
            const disabledRendition = value.size > props.renditions.videoInfo.width
            return {data: [
                <InputCheckbox className="inline-flex" key={"checkbox" + value.name} id={"checkbox" + value.name} disabled={selectedEncodedRendition.length > 0 || (value.size != null && disabledRendition)}
                    defaultChecked={selectedNotEncodedRendition.includes(value.name)}
                    onChange={(event) => {
                        if (event.currentTarget.checked && selectedNotEncodedRendition.length < notEncodedRenditions.length) {
                            setSelectedNotEncodedRendition([...selectedNotEncodedRendition, value.name])
                        } else {
                            const editedSelectedRenditions = selectedNotEncodedRendition.filter(item => item !== value.name)
                            setSelectedNotEncodedRendition(editedSelectedRenditions);
                        }
                    }
                    } />,
                <Text key={value.name} size={14} weight="reg" color={disabledRendition ? 'gray-6' : 'gray-1'}>{value.name}</Text>,
                <Text key={"size" + value.size} size={14} weight="reg" color={disabledRendition ? 'gray-6' : 'gray-1'}>{value.size}</Text>,
                <Text key={"bitrate" + value.bitrate} size={14} weight="reg" color={disabledRendition ? 'gray-6' : 'gray-1'}>{value.bitrate ? value.bitrate / 1000 : null}</Text>,
            ]}
        })
    }

    const EncodedRenditionsTableHeader = () => {
        return {data: [
            {cell: <InputCheckbox className="inline-flex" id="globalCheckboxEncoded" 
                disabled={selectedNotEncodedRendition.length > 0} 
                indeterminate={selectedEncodedRendition.length >= 1 && selectedEncodedRendition.length < props.renditions.encodedRenditions.length} 
                defaultChecked={selectedEncodedRendition.length > 0 && selectedEncodedRendition.length === props.renditions.encodedRenditions.length}
                onChange={(event) => {
                    if (event.currentTarget.checked) {
                        const editedSelectedEncodedRendition = props.renditions.encodedRenditions.map(item => { return item.name })
                        setSelectedEncodedRendition(editedSelectedEncodedRendition);
                    } else if (event.currentTarget.indeterminate || !event.currentTarget.checked) {
                        setSelectedEncodedRendition([])
                    }
                }} />},
            {cell: <Text size={14} weight="med">Rendition</Text>},
            {cell: <Text size={14} weight="med">Size (px)</Text>},
            {cell: <Text size={14} weight="med">Size (Mb)</Text>},
            {cell: <Text size={14} weight="med">Bitrate(Mbps)</Text>},
            {cell: <Text size={14} weight="med">Status</Text>}
        ]}
    }

    const EncodedRenditionsTableBody = () => {
        return props.renditions.encodedRenditions.map((value) => {
            return {data: [
                <InputCheckbox className="inline-flex" key={"checkbox" + value.name} id={"checkbox" + value.name} disabled={selectedNotEncodedRendition.length > 0 || (wsData && !wsData.data.completed)}
                    defaultChecked={selectedEncodedRendition.includes(value.name)}
                    onChange={(event) => {
                        if (event.currentTarget.checked && selectedEncodedRendition.length < props.renditions.encodedRenditions.length) {
                            setSelectedEncodedRendition([...selectedEncodedRendition, value.name])
                        } else {
                            const editedSelectedEncodedRendition = selectedEncodedRendition.filter(item => item !== value.name)
                            setSelectedEncodedRendition(editedSelectedEncodedRendition);
                        }
                    }} />,
                <Text size={14} weight="reg">{value.name}</Text>,
                <Text size={14} weight="reg">{value.width}</Text>,
                <Text size={14} weight="reg">{value.bitrate ? (value.bitrate / 1000000).toFixed(1) : null}</Text>,
                <Text size={14} weight="reg">{value.size ? (value.size / 1000000).toFixed(1) : null}</Text>,
                !value.transcodingJobID ? 
                    <Label color={"gray-1"} backgroundColor={"gray-9"} label="Processing" />
                    :
                    <Label color={"green"} backgroundColor={"green20"} label="Encoded" />
                    
            ]}
        })
    }

    const encodeRenditions = () => {
        event.preventDefault();
        props.addContentRenditions(selectedNotEncodedRendition, props.contentId, props.contentType)
        setSelectedNotEncodedRendition([])
    }

    const deleteRenditions = () => {
        event.preventDefault();
        let ids: string[] = []
        props.renditions.encodedRenditions.map(rendition => {
            if(selectedEncodedRendition.includes(rendition.name)) {
                ids.push(rendition.renditionID)
            }
        })
        props.deleteContentRenditions(ids, props.contentId, props.contentType)
        setSelectedEncodedRendition([])
    }

    const handleUploadProgress = (percent: number) => {
        if(percent === 100) {
            setNewSourceFileUpload(null)
            setReplaceSourceModalOpen(false)
        }
        setNewSourceFileUploadProgress(percent)
    }

    const handleUploadError = (err: any) => {
        if(err !== 'Cancel') {
            setUploadError('Upload failed, cancel and try again.')
        }
    }

    const handleDrop = (fileList: FileList) => {
        for (var i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            if (fileList.length > 0) {
                let newUpload = new UploadObject(
                    file,
                    MAX_REQUEST_PER_BATCH,
                    NB_CONCURRENT_REQUESTS,
                    FILE_CHUNK_SIZE,
                    (percent: number) => { handleUploadProgress(percent) },
                    (err: any) => { handleUploadError(err)},
                    null,
                    props.contentId
                )
                setNewSourceFileUpload(newUpload)
                newUpload.startUpload()
            }
        }
    }

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            handleDrop(e.target.files);
        }
    }

    const handleCancelReplaceSourceFile = () => {
        if(newSourceFileUpload) {
            newSourceFileUpload.cancelUpload()
        }
        setReplaceSourceModalOpen(false)
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
                <IconStyle style={{marginRight: "10px"}}>info_outlined</IconStyle>
                <Text  size={14} weight="reg">Need help understanding Renditions? Visit the <a href={getKnowledgebaseLink('Encoding Recipes')} target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
            </div>
            <div className="widgets flex items-baseline mt25">
                <RenditionsWidget>
                    <div >
                        <Text size={24} weight="reg">{props.renditions.videoInfo ? (props.renditions.videoInfo.fileSize / 1000000).toFixed(2) : ''} MB</Text>
                    </div>
                    <div className="mt1">
                        <Text color="gray-4" size={14} weight="reg">Source File Size</Text>
                    </div>
                </RenditionsWidget>
                <RenditionsWidget>
                    <div>
                        <Text size={24} weight="reg">{props.renditions.videoInfo ? (props.renditions.videoInfo.videoBitrateBytePerSec / 1000000).toFixed(0): ''} Mbps</Text>
                    </div>
                    <div className="mt1">
                        <Text color="gray-4" size={14} weight="reg">Source File Bitrate</Text>
                    </div>
                </RenditionsWidget>
                <RenditionsWidget>
                    <div>
                        <Text size={24} weight="reg">{(props.renditions.storageRemaining / 1000000000).toFixed(2)} GB</Text>
                    </div>
                    <div className="mt1">
                        <Text color="gray-4" size={14} weight="reg">Storage Remaining</Text>
                    </div>
                </RenditionsWidget>
            </div>

            <div className="renditionsContainer mt25 col col-12">
                <div className="notEncodedTableContainer col col-5">
                    <div className="mb1">
                        <Text size={20} weight="med">Not Encoded</Text>
                    </div>
                    <RenditionsTable className="notEncodedTable ">
                        <Table hasContainer id="notEncodedRenditionsTable" headerBackgroundColor="white" header={notEncodedRenditionsTableHeader()} body={notEncodedRenditionsTableBody()} /> 
                    </RenditionsTable>
                     
                </div>
                <ButtonContainer className="col">
                    <Button className="mb2" type="button" typeButton="secondary" sizeButton="xs" disabled={selectedNotEncodedRendition.length === 0} 
                        onClick={() => setEncodeRenditionsModalOpen(true)}
                    >Encode &gt;</Button>
                    <Button type="button" typeButton="secondary" sizeButton="xs" disabled={selectedEncodedRendition.length === 0} 
                        onClick={() => setDeleteRenditionsModalOpen(true)}
                    >&lt; Delete</Button>
                </ButtonContainer>
                <div className="notEncodedTableContainer col col-5">
                    <div className="mb1">
                        <Text size={20} weight="med">Encoded</Text>
                    </div>
                    <RenditionsTable className="notEncodedTable ">
                        <Table hasContainer id="EncodedRenditionsTable" headerBackgroundColor="white" header={EncodedRenditionsTableHeader()} body={EncodedRenditionsTableBody()} /> 
                    </RenditionsTable>
                     
                </div>
            </div>
            <Modal size="small" modalTitle="Encode Renditions" opened={encodeRenditionsModalOpen} toggle={() => setEncodeRenditionsModalOpen(false)} hasClose={false}>
                <ModalContent>
                    <Text size={14} weight="reg">Are you sure you want to encode the selected renditions? This will come at a cost</Text> 
                </ModalContent>
                <ModalFooter>
                    <Button onClick={() => {encodeRenditions();setEncodeRenditionsModalOpen(false)}}>Encode</Button>
                    <Button typeButton="tertiary" onClick={() => setEncodeRenditionsModalOpen(false)}>Cancel</Button>  
                </ModalFooter>
            </Modal>
            <Modal size="small" modalTitle="Delete Renditions" opened={deleteRenditionsModalOpen} toggle={() => setDeleteRenditionsModalOpen(false)} hasClose={false} icon={{name: "warning", color: "red"}}>
                <ModalContent>
                    <Text size={14} weight="reg">Are you sure you want to delete the selected renditions?</Text> 
                </ModalContent>
                <ModalFooter>
                    <Button onClick={() => {deleteRenditions();setDeleteRenditionsModalOpen(false)}}>Delete</Button>
                    <Button typeButton="tertiary" onClick={() => setDeleteRenditionsModalOpen(false)}>Cancel</Button>  
                </ModalFooter>
            </Modal>
            {
                replaceSourceModalOpen && 
                <Modal size="small" modalTitle="Replace Source File" opened={replaceSourceModalOpen} toggle={() => setReplaceSourceModalOpen(false)} hasClose={false}>
                    <ModalContent>
                        <Text size={14} weight="reg">When a video is replaced, the previous version is completely updated and any existing links will lead to your new upload. </Text> 
                        {
                            newSourceFileUpload && 
                                <ProgressBar static  size='large' color={uploadError ? 'red' : 'violet'} label='Upload Progress' startingValue={newSourceFileUploadProgress} />

                        }
                        {
                            uploadError && 
                            <div>
                                <Text weight='reg' color='red' size={10}>{uploadError}</Text>
                            </div>
                        }
                    </ModalContent>
                    <ModalFooter>
                        <input type='file' accept='video/mp4, video/mov' ref={replaceSourceFileBrowseButtonRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} style={{ display: 'none' }} id='replaceSourceFileBrowseButton' />
                        {
                            !newSourceFileUpload && 
                            <Button onClick={() => {replaceSourceFileBrowseButtonRef.current.click()}}>Upload Replacement</Button>
                        }
                        <Button typeButton={newSourceFileUpload ? 'primary' : "tertiary"} onClick={() => handleCancelReplaceSourceFile()}>Cancel</Button>  
                    </ModalFooter>
                </Modal>
            }
            
        </React.Fragment>
    )
}