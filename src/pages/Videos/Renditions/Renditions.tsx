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

    var notEncodedRenditions = [
        {rendition: "4k-2160p", size: "3480", bitrateCap: "20"},
        {rendition: "2k-1440p", size: "2560", bitrateCap: "15"}
    ]

    var encodedRenditions = [
        {rendition: "SD-480p", size: "854", bitrateCap: "2.5", encoded: true},
        {rendition: "LD-360p", size: "640", bitrateCap: "1", encoded: false}
    ]

    const notEncodedRenditionsTableHeader = () => {
        return [
            <InputCheckbox className="inline-flex" id="globalCheckboxNotEncoded" />,
            <Text size={14} weight="med">Rendition</Text>,
            <Text size={14} weight="med">Size (px)</Text>,
            <Text size={14} weight="med">Bitrate Cap (Mbps)</Text>
        ]
    }

    const notEncodedRenditionsTableBody = () => {
        return notEncodedRenditions.map((value) => {
            return [
                <InputCheckbox className="inline-flex" id="globalCheckboxNotEncoded" />,
                <Text size={14} weight="reg">{value.rendition}</Text>,
                <Text size={14} weight="reg">{value.size}</Text>,
                <Text size={14} weight="reg">{value.bitrateCap}</Text>,
            ]
        }
        )
    }

    const EncodedRenditionsTableHeader = () => {
        return [
            <InputCheckbox className="inline-flex" id="globalCheckboxNotEncoded" />,
            <Text size={14} weight="med">Rendition</Text>,
            <Text size={14} weight="med">Size (px)</Text>,
            <Text size={14} weight="med">Bitrate Cap (Mbps)</Text>,
            <Text size={14} weight="med">Status</Text>
        ]
    }

    const EncodedRenditionsTableBody = () => {
        return encodedRenditions.map((value) => {
            return [
                <InputCheckbox className="inline-flex" id="globalCheckboxNotEncoded" />,
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