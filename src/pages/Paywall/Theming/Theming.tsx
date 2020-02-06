import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { Icon } from '@material-ui/core';
import { Table } from '../../../components/Table/Table';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { Tab } from '../../../components/Tab/Tab';
import { Routes } from '../../../containers/Navigation/NavigationTypes';
import { ColorPicker } from '../../../components/ColorPicker/ColorPicker';
import { Toggle } from '../../../components/Toggle/toggle';
import { PaywallTheme } from '../../../redux-flow/store/Paywall/Theming';
import { PaywallThemingComponentProps } from '../../../containers/Paywall/Theming';
import { IconContainer } from '../../../shared/Theming/ThemingStyle';

export const PaywallThemingPage = (props: PaywallThemingComponentProps) => {

    const [currentPage, setCurrentPage] = React.useState<'list' | 'options'>('list');
    const newTheme: PaywallTheme = {
        id: '-1',
        name: '',
        isDefault: false,
        splashScreen: {
            buttonColor: '',
            buttonTextColor: ''
        },
        loginScreen: {
            buttonColor: '',
            primaryColor: '',
            headerColor: '',
            hasCompanyLogo: false
        }
    }
    const [selectedTheme, setSelectedTheme] = React.useState<PaywallTheme>(newTheme);
    const [selectedTab, setSelectedTab] = React.useState<string>('Splash Screen');

    const PaywallThemingList = () => {

        const paywallThemingTableHeader = () => {
            return [
                <Text key='paywallThemingTableHeaderName' size={14} weight='med'>Name</Text>,
                <Text key='paywallThemingTableHeaderDefault' size={14} weight='med'>Default</Text>,
                <Button key='paywallThemingTableHeaderButton' className='right mr2' onClick={() => {setSelectedTheme(newTheme);setCurrentPage('options')}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Paywall Theme</Button>
            ]
        }

        const paywallThemingTableBody = () => {
            return props.paywallThemes.themes.map((theme, key) => {
                return [
                    <Text key={'paywallThemingTableBodyNameCell' + key.toString()} size={14} weight='reg'>{theme.name}</Text>,
                    theme.isDefault ? <Icon key={'paywallThemingTableBodyDefaultCell' + key.toString()}>checked</Icon> : <></>,
                    <IconContainer className="iconAction" key={'paywallThemingTableBodyButtonsCell' + key.toString()}><Icon onClick={(event) => { event.preventDefault();props.deletePaywallTheme(theme)}} >delete</Icon><Icon onClick={(event) => { event.preventDefault(); setSelectedTheme(props.paywallThemes.themes.filter((item) => {return item.id === theme.id })[0]); setCurrentPage('options') }}>edit</Icon> </IconContainer>

                ]
            })
        }

        return (
            <div>
                <Card>
                    <Text size={20} weight='med'>Paywall Theming</Text>
                    <Text size={14} weight='reg'>configure the look and feel of your payment</Text>
                    <div className='flex item-center my2'>
                        <Icon>info_outlined</Icon>
                        <Text size={14} weight='reg'>Need help setting up a Paywall Theme? Visit the Knowledge Base</Text>
                    </div>
                    <Table className='col col-12 my2' id='paywallThemingTable' header={paywallThemingTableHeader()} body={paywallThemingTableBody()} />
                </Card>
            </div>
        )
    }
    let inPlayerPreviewIframeRef = React.useRef<any>(null);
    let inPlayerConnectionPreviewIframeRef = React.useRef<any>(null);

    const PaywallThemingInPlayerCustomization = () => {
        const tabsList: Routes[] = [
            {
                name: "Splash Screen",
                path: 'splahScreen'
            },
            {
                name: 'Login Screen',
                path: 'loginScreen'
            }

        ]

        return (
            <div className='flex flex-column col col-4 mr1'>
                <Card>
                    <Text size={20} weight='med'>New Paywall Theme</Text>
                    <Input className='my1' id='paywalThemeNameInput' label='Theme Name' defaultValue={selectedTheme.name} onChange={(event) => setSelectedTheme({...selectedTheme, name: event.currentTarget.value})} />
                    <InputCheckbox className='my1' id='paywallThemeDefaultInput' label='Make Default Theme' defaultChecked={selectedTheme.isDefault} onChange={() => {
                        setSelectedTheme({...selectedTheme, isDefault: !selectedTheme.isDefault})

                    }} />
                    <Tab className='col col-12 my1' orientation='horizontal' history={null} list={tabsList} callback={setSelectedTab} />
                    <div className={selectedTab !== 'Splash Screen' ? 'hide' : ''}>
                        <Text size={16} weight='med'>Button Colour</Text>
                        <ColorPicker 
                            className='my1' 
                            defaultColor={selectedTheme.splashScreen.buttonColor} 
                            callback={(color: string) => {
                                inPlayerPreviewIframeRef.current.contentWindow.postMessage({
                                    action: 'setButtonColor',
                                    value: { hex: color }
                                });
                                setSelectedTheme({...selectedTheme, splashScreen:{...selectedTheme.splashScreen, buttonColor: color}})
                            }
                            } 
                        />
                        <Text size={16} weight='med'>Button Text Colour</Text>
                        <ColorPicker 
                            className='my1' 
                            defaultColor={selectedTheme.splashScreen.buttonTextColor} 
                            callback={(color: string) => {
                                inPlayerPreviewIframeRef.current.contentWindow.postMessage({
                                    action: 'setButtonTextColor',
                                    value: { hex: color }
                                });
                                setSelectedTheme({...selectedTheme, splashScreen:{...selectedTheme.splashScreen, buttonTextColor: color}})

                            }
                            } 
                        />
                    </div>
                    <div className={selectedTab === 'Splash Screen' ? 'hide' : ''}>
                        <Text size={16} weight='med'>Button Colour</Text>
                        <ColorPicker 
                            className='my1' 
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
                        <Text size={16} weight='med'>Primary Colour</Text>
                        <ColorPicker 
                            className='my1' 
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
                        <Text size={16} weight='med'>Header Colour</Text>
                        <ColorPicker 
                            className='my1' 
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
                        <Toggle 
                            id='companyLogoToggle' 
                            label='Company Logo' 
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
            <div className='flex'>
                {PaywallThemingInPlayerCustomization()}
                <Card className='col col-8 ml1'>
                    <iframe className={selectedTab !== 'Splash Screen' ? 'hide' : ''} ref={inPlayerPreviewIframeRef} frameBorder="0" height="550px" scrolling="no" width="100%" src="../../../public/iframe/InPlayer/InPlayerPaywallPreview.html"
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
                    <iframe className={selectedTab === 'Splash Screen' ? 'hide' : ''} ref={inPlayerConnectionPreviewIframeRef} frameBorder="0" height="550px" scrolling="no" width="100%" src="../../../public/iframe/InPlayer/InPlayerConnectionPreview.html" 
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
                                value: !selectedTheme.loginScreen.hasCompanyLogo
                            });  
                        }}
                    />

                </Card>
            </div>
    )
}