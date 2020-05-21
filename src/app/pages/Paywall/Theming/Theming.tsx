import React from 'react';
import { Card } from '../../../../components/Card/Card';
import { Text } from '../../../../components/Typography/Text';
import { IconStyle, IconContainer, ActionIcon } from '../../../../shared/Common/Icon';
import { Table } from '../../../../components/Table/Table';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { Tab } from '../../../../components/Tab/Tab';
import { Routes } from '../../../containers/Navigation/NavigationTypes';
import { ColorPicker } from '../../../../components/ColorPicker/ColorPicker';
import { Toggle } from '../../../../components/Toggle/toggle';
import { PaywallTheme } from '../../../redux-flow/store/Paywall/Theming';
import { PaywallThemingComponentProps } from '../../../containers/Paywall/Theming';
import styled from 'styled-components';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';

export const PaywallThemingPage = (props: PaywallThemingComponentProps) => {

    const [currentPage, setCurrentPage] = React.useState<'list' | 'options'>('list');
    const newTheme: PaywallTheme = {
        id: '-1',
        name: '',
        isDefault: false,
        splashScreen: {
            buttonColor: '#2899F6',
            buttonTextColor: '#FFFFFF'
        },
        loginScreen: {
            buttonColor: '#2899F6',
            primaryColor: '#2899F6',
            headerColor: '#2899F6',
            hasCompanyLogo: true
        }
    }
    const [selectedTheme, setSelectedTheme] = React.useState<PaywallTheme>(newTheme);
    const [selectedTab, setSelectedTab] = React.useState<string>('Splash Screen');

    const PaywallThemingList = () => {

        const paywallThemingTableHeader = () => {
            return {data: [
                {cell: <Text key='paywallThemingTableHeaderName' size={14} weight='med'>Name</Text>},
                {cell: <Text key='paywallThemingTableHeaderDefault' size={14} weight='med'>Default</Text>},
                {cell: <Button key='paywallThemingTableHeaderButton' className='right mr2' onClick={() => {setSelectedTheme(newTheme);setCurrentPage('options')}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Paywall Theme</Button>}
            ]}
        }

        const paywallThemingTableBody = () => {
            return props.paywallThemes.themes.map((theme, key) => {
                return {data: [
                    <Text key={'paywallThemingTableBodyNameCell' + key.toString()} size={14} weight='reg'>{theme.name}</Text>,
                    theme.isDefault ? <IconStyle coloricon='green' key={'paywallThemingTableBodyDefaultCell' + key.toString()}>checked</IconStyle> : <></>,
                    <IconContainer className="iconAction" key={'paywallThemingTableBodyButtonsCell' + key.toString()}>
                        <ActionIcon>
                            <IconStyle id={"copyTooltip" + key}>file_copy</IconStyle>
                            <Tooltip target={"copyTooltip" + key}>Copy</Tooltip>
                        </ActionIcon>
                        <ActionIcon>
                            <IconStyle id={"deleteTooltip" + key} onClick={(event) => { event.preventDefault();props.deletePaywallTheme(theme)}} >delete</IconStyle>
                            <Tooltip target={"deleteTooltip" + key}>Delete</Tooltip>
                        </ActionIcon>
                        <ActionIcon>
                            <IconStyle id={"editTooltip" + key} onClick={(event) => { event.preventDefault(); setSelectedTheme(props.paywallThemes.themes.filter((item) => {return item.id === theme.id })[0]); setCurrentPage('options') }}>edit</IconStyle>
                            <Tooltip target={"editTooltip" + key}>Edit</Tooltip>
                        </ActionIcon>
                         
                    </IconContainer>

                ]}
            })
        }

        return (
            <div>
                <Card>
                    <Text size={20} weight='med'>Paywall Theming</Text>
                    <Text className="mt2" size={14} weight='reg'>Configure the look and feel of your payment</Text>
                    <div className='flex item-center mt2'>
                        <IconStyle style={{marginRight: 10}}>info_outlined</IconStyle>
                        <Text size={14} weight='reg'>Need help setting up a Paywall Theme? Visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                    </div>
                    <Table className='col col-12' id='paywallThemingTable' headerBackgroundColor="gray-10" header={paywallThemingTableHeader()} body={paywallThemingTableBody()} />
                </Card>
            </div>
        )
    }
    let inPlayerPreviewIframeRef = React.useRef<any>(null);
    let inPlayerConnectionPreviewIframeRef = React.useRef<any>(null);

    const PaywallThemingInPlayerCustomization = () => {
        const tabsList: Routes[] = [
            {
                name: 'Splash Screen',
                path: 'Splash Screen'
            },
            {
                name: 'Login Screen',
                path: 'Login Screen'
            }

        ]

        return (
            <div className='col col-12 sm-col-4 pr1'>
                <Card>
                    <Text size={20} weight='med'>{selectedTheme.id === '-1' ? "New Paywall Theme" : "Edit Paywall Theme"}</Text>
                    <Input className='mt2' id='paywalThemeNameInput' label='Theme Name' defaultValue={selectedTheme.name} onChange={(event) => setSelectedTheme({...selectedTheme, name: event.currentTarget.value})} />
                    <InputCheckbox className='mt1' id='paywallThemeDefaultInput' label='Make Default Theme' defaultChecked={selectedTheme.isDefault} onChange={() => {
                        setSelectedTheme({...selectedTheme, isDefault: !selectedTheme.isDefault})

                    }} />
                    <BorderStyle className='mt3 mb2' />
                    <Tab className='col col-12 my1' orientation='horizontal' history={null} list={tabsList} callback={setSelectedTab} />
                    <div className={selectedTab !== 'Splash Screen' ? 'hide' : 'mt2'}>
                        <div>
                            <ColorPickerLabel>
                                <Text size={14} weight='med'>Button Colour</Text>
                            </ColorPickerLabel>
                            <ColorPicker 
                                className='mb1' 
                                defaultColor={selectedTheme.splashScreen.buttonColor} 
                                callback={(color: string) => {
                                    inPlayerPreviewIframeRef.current.contentWindow.postMessage({
                                        action: 'setButtonColor',
                                        value: { hex: color }
                                    });
                                    setSelectedTheme({...selectedTheme, splashScreen:{...selectedTheme.splashScreen, buttonColor: color}})
                                }} 
                            />
                        </div>
                        <div className="mt2">
                            <ColorPickerLabel>
                                <Text className="mt2" size={14} weight='med'>Button Text Colour</Text>
                            </ColorPickerLabel>
                            <ColorPicker 
                                className='mb1' 
                                defaultColor={selectedTheme.splashScreen.buttonTextColor}
                                callback={(color: string) => {
                                    inPlayerPreviewIframeRef.current.contentWindow.postMessage({
                                        action: 'setButtonTextColor',
                                        value: { hex: color }
                                    });
                                    setSelectedTheme({...selectedTheme, splashScreen:{...selectedTheme.splashScreen, buttonTextColor: color}})
                                }} 
                            />
                        </div>
                        
                    </div>
                    <div className={selectedTab === 'Splash Screen' ? 'hide' : 'mt2'}>   
                        <div>        
                            <ColorPickerLabel>
                                <Text size={14} weight='med'>Button Colour</Text>
                            </ColorPickerLabel>
                            <ColorPicker 
                                className='mb1' 
                                defaultColor={selectedTheme.loginScreen.buttonColor} 
                                callback={(color: string) => {
                                    inPlayerConnectionPreviewIframeRef.current.contentWindow.postMessage({
                                        action: 'setButtonColor',
                                        value: { hex: color }
                                    });
                                    setSelectedTheme({...selectedTheme, loginScreen:{...selectedTheme.loginScreen, buttonColor: color}})

                                }
                                } 
                            />
                        </div>
                        <div className="mt2">
                            <ColorPickerLabel>
                                <Text size={14} weight='med'>Primary Colour</Text></ColorPickerLabel>
                            <ColorPicker 
                                className='mb1' 
                                defaultColor={selectedTheme.loginScreen.primaryColor} 
                                callback={(color: string) => {
                                    inPlayerConnectionPreviewIframeRef.current.contentWindow.postMessage({
                                        action: 'setPrimaryColor',
                                        value: { hex: color }
                                    });
                                    setSelectedTheme({...selectedTheme, loginScreen:{...selectedTheme.loginScreen, primaryColor: color}})

                                }
                                } 
                            />
                        </div>
                        <div className="mt2">
                            <ColorPickerLabel>
                                <Text size={14} weight='med'>Header Colour</Text>
                            </ColorPickerLabel>
                            <ColorPicker 
                                className='mb1' 
                                defaultColor={selectedTheme.loginScreen.headerColor} 
                                callback={(color: string) => {
                                    inPlayerConnectionPreviewIframeRef.current.contentWindow.postMessage({
                                        action: 'setHeaderColor',
                                        value: { hex: color }
                                    });
                                    setSelectedTheme({...selectedTheme, loginScreen:{...selectedTheme.loginScreen, headerColor: color}})
                                }
                                } 
                            />
                        </div>
                        <Toggle 
                            id='companyLogoToggle' 
                            label='Company Logo'
                            className="mt25" 
                            defaultChecked={selectedTheme.loginScreen.hasCompanyLogo} 
                            onChange={() => {
                                setSelectedTheme({...selectedTheme, loginScreen: {...selectedTheme.loginScreen, hasCompanyLogo: ! selectedTheme.loginScreen.hasCompanyLogo}})
                                inPlayerConnectionPreviewIframeRef.current.contentWindow.postMessage({
                                    action: 'setThemeLogo',
                                    value: !selectedTheme.loginScreen.hasCompanyLogo
                                });  
                            }}
                                
                        />
                    </div>
                </Card>
                <div className='flex mt2'>
                    <Button className='mr2' onClick={() => {setCurrentPage('list');selectedTheme.id === '-1' ? props.createPaywallTheme(selectedTheme) : props.savePaywallTheme(selectedTheme)}} sizeButton='large' typeButton='primary' buttonColor='blue'>Save</Button>
                    <Button onClick={() => setCurrentPage('list')} sizeButton='large' typeButton='tertiary' buttonColor='blue'>Cancel</Button>
                </div>
            </div>

        )
    }

    return (
        currentPage === 'list' ?
            PaywallThemingList()
            : 
            <div className='col col-12'>
                <Card className='col-12 sm-col-8 right pl1 xs-mb2'>
                    <iframe className={selectedTab !== 'Splash Screen' ? 'hide' : ''} ref={inPlayerPreviewIframeRef} frameBorder="0" height="550px" scrolling="no" width="100%" src="/public/iframe/InPlayerPaywallPreview.html"
                        onLoad={() => {
                            inPlayerPreviewIframeRef.current.contentWindow.postMessage({
                                action: 'setButtonColor',
                                value: { hex: selectedTheme.splashScreen.buttonColor }
                            });
                            inPlayerPreviewIframeRef.current.contentWindow.postMessage({
                                action: 'setButtonTextColor',
                                value: { hex: selectedTheme.splashScreen.buttonTextColor }
                            });
                        }}
                    />                   
                    <iframe className={selectedTab === 'Splash Screen' ? 'hide' : ''} ref={inPlayerConnectionPreviewIframeRef} frameBorder="0" height="550px" scrolling="no" width="100%" src="/public/iframe/InPlayerConnectionPreview.html" 
                        onLoad={() => {
                            inPlayerConnectionPreviewIframeRef.current.contentWindow.postMessage({
                                action: 'setButtonColor',
                                value: !selectedTheme.loginScreen.buttonColor
                            });  
                            inPlayerConnectionPreviewIframeRef.current.contentWindow.postMessage({
                                action: 'setPrimaryColor',
                                value: !selectedTheme.loginScreen.primaryColor
                            });  
                            inPlayerConnectionPreviewIframeRef.current.contentWindow.postMessage({
                                action: 'setHeaderColor',
                                value: !selectedTheme.loginScreen.headerColor
                            });  
                            inPlayerConnectionPreviewIframeRef.current.contentWindow.postMessage({
                                action: 'setThemeLogo',
                                value: selectedTheme.loginScreen.hasCompanyLogo
                            });
                            if(props.companyState.logoURL) {
                                inPlayerConnectionPreviewIframeRef.current.contentWindow.postMessage({
                                    action: 'setLogoSrc',
                                    value: props.companyState.logoURL 
                                });
                            }
                            
                        }}
                    />
                </Card>
                {PaywallThemingInPlayerCustomization()}
                
            </div>
    )
}

export const BorderStyle = styled.div<{}>`
    border-bottom: 1px solid ${props => props.theme.colors['gray-7']};
    display: flex;
`

export const ColorPickerLabel = styled.div`
    margin-bottom: 4px;
`