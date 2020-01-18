import React from 'react';
import { Text } from '../../../components/Typography/Text';
import { Icon } from '@material-ui/core';
import { WidgetHeader } from '../../../containers/Dashboard/DashboardStyles';
import { RenditionsWidget, RenditionsTable, ButtonContainer } from './RenditionsStyle';
import { Table } from '../../../components/Table/Table';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Label } from '../../../components/FormsComponents/Label/Label';

export const VodRenditionsPage = () => {

    const [selectedNotEncodedRendition, setSelectedNotEncodedRendition] = React.useState<string[]>([])
    const [selectedEncodedRendition, setSelectedEncodedRendition] = React.useState<string[]>([])


    var notEncodedRenditions = [
        {id: "4K", rendition: "4k-2160p", size: "3480", bitrateCap: "20"},
        {id: "2K", rendition: "2k-1440p", size: "2560", bitrateCap: "15"}
    ]

    var encodedRenditions = [
        {id: "SD", rendition: "SD-480p", size: "854", bitrateCap: "2.5", encoded: true},
        {id:"LD", rendition: "LD-360p", size: "640", bitrateCap: "1", encoded: false}
    ]

    const notEncodedRenditionsTableHeader = () => {
        return [
            <InputCheckbox className="inline-flex" id="globalCheckboxNotEncoded" indeterminate={selectedNotEncodedRendition.length >= 1 && selectedNotEncodedRendition.length < notEncodedRenditions.length} defaultChecked={selectedNotEncodedRendition.length === notEncodedRenditions.length}
            onChange={(event) => {
                if (event.currentTarget.checked) {
                    const editedSelectedRenditions = notEncodedRenditions.map(item => { return item.id })
                    setSelectedNotEncodedRendition(editedSelectedRenditions);
                } else if (event.currentTarget.indeterminate || !event.currentTarget.checked) {
                    setSelectedNotEncodedRendition([])
                }
            }
            } />,
            <Text size={14} weight="med">Rendition</Text>,
            <Text size={14} weight="med">Size (px)</Text>,
            <Text size={14} weight="med">Bitrate Cap (Mbps)</Text>
        ]
    }

    const notEncodedRenditionsTableBody = () => {
        return notEncodedRenditions.map((value) => {
            return [
                <InputCheckbox className="inline-flex" key={"checkbox" + value.id} id={"checkbox" + value.id}
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
        }
        )
    }

    const EncodedRenditionsTableHeader = () => {
        return [
            <InputCheckbox className="inline-flex" id="globalCheckboxEncoded" indeterminate={selectedEncodedRendition.length >= 1 && selectedEncodedRendition.length < encodedRenditions.length} defaultChecked={selectedEncodedRendition.length === encodedRenditions.length}
            onChange={(event) => {
                if (event.currentTarget.checked) {
                    const editedSelectedEncodedRendition = encodedRenditions.map(item => { return item.id })
                    setSelectedEncodedRendition(editedSelectedEncodedRendition);
                } else if (event.currentTarget.indeterminate || !event.currentTarget.checked) {
                    setSelectedEncodedRendition([])
                }
            }
            } />,
            <Text size={14} weight="med">Rendition</Text>,
            <Text size={14} weight="med">Size (px)</Text>,
            <Text size={14} weight="med">Bitrate Cap (Mbps)</Text>,
            <Text size={14} weight="med">Status</Text>
        ]
    }

    const EncodedRenditionsTableBody = () => {
        return encodedRenditions.map((value) => {
            return [
                <InputCheckbox className="inline-flex" key={"checkbox" + value.id} id={"checkbox" + value.id}
                defaultChecked={selectedEncodedRendition.includes(value.id)}
                onChange={(event) => {
                    if (event.currentTarget.checked && selectedEncodedRendition.length < encodedRenditions.length) {
                        setSelectedEncodedRendition([...selectedEncodedRendition, value.id])
                    } else {
                        const editedSelectedEncodedRendition = selectedEncodedRendition.filter(item => item !== value.id)
                        setSelectedEncodedRendition(editedSelectedEncodedRendition);
                    }
                }
                } />,
                <Text size={14} weight="reg">{value.rendition}</Text>,
                <Text size={14} weight="reg">{value.size}</Text>,
                <Text size={14} weight="reg">{value.bitrateCap}</Text>,
                value.encoded ? 
                <Label color={"green"} backgroundColor={"green20"} label="Encoded" />
                :
                <Label color={"gray-1"} backgroundColor={"gray-9"} label="Processing" />
                
                
            ]
        }
        )
    }

    return (
        <React.Fragment>
            <div className="mt25">
                <Text className="mt25" size={14} weight="reg">Add or delete transcoding options from your file. Please note that adding bitrates to your file requires encoding and also extra storage space.</Text>
            </div>
            <div className=" flex mt1">
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
                        <Table id="notEncodedRenditionsTable" header={notEncodedRenditionsTableHeader()} body={notEncodedRenditionsTableBody()} /> 
                    </RenditionsTable>
                     
                </div>
                <ButtonContainer className="col">
                    <Button className="mb2" type="button" typeButton="secondary" sizeButton="xs">Encode</Button>
                    <Button type="button" typeButton="secondary" sizeButton="xs">Delete</Button>
                </ButtonContainer>
                <div className="notEncodedTableContainer col col-5">
                    <div className="mb1">
                        <Text size={20} weight="med">Encoded</Text>
                    </div>
                    <RenditionsTable className="notEncodedTable ">
                        <Table id="EncodedRenditionsTable" header={EncodedRenditionsTableHeader()} body={EncodedRenditionsTableBody()} /> 
                    </RenditionsTable>
                     
                </div>
            </div>
            
        </React.Fragment>
    )
}