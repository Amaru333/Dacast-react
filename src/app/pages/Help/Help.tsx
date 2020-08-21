import React from 'react';
import { Text } from '../../../components/Typography/Text';
import { SmallHelpCard, LargeHelpCard, HelpCardHeader, HelpCardContent, CardPlaceholder, HelpPageIcon, ButtonContainer } from "./HelpStyle"
import { Button } from '../../../components/FormsComponents/Button/Button';


export const HelpPage = () => {
    return (
        <React.Fragment>

            <div className=" col col-12 mt25">
                <Text size={20}>Resources</Text>
            </div>

            <div className="col col-12 flex mt2">
                <SmallHelpCard className="mr2 col col-4 flex p2">
                    <HelpCardHeader className="col col-12">
                        <Text size={16} weight="med">FAQ</Text>
                        <HelpPageIcon className="material-icons-two-tone ml2">live_help</HelpPageIcon>
                    </HelpCardHeader>
                    <div className="col col-12 flex mt2">
                        <HelpCardContent>
                            <Text size={12}>Have some questions relating to the free trial?</Text>
                        </HelpCardContent>
                        <CardPlaceholder /> 
                    </div>
                    <div className="col col-12 mt3">
                        <Button typeButton="secondary" sizeButton="xs" onClick={() => window.open("https://www.dacast.com/support/faq/")}>Visit FAQ</Button>
                    </div> 
                </SmallHelpCard>

                <SmallHelpCard className="mr2 col col-4 flex p2">
                    <HelpCardHeader className="col col-12">
                        <Text size={16} weight="med">Knowledge Base</Text>
                        <HelpPageIcon className="material-icons-two-tone ml2">find_in_page</HelpPageIcon>
                    </HelpCardHeader>
                    <div className="col col-12 flex mt2">
                        <HelpCardContent>
                            <Text size={12}>Have some questions relating to the free trial?</Text>
                        </HelpCardContent>
                        <CardPlaceholder /> 
                    </div>
                    <div className="col col-12 mt3">
                        <Button typeButton="secondary" sizeButton="xs" onClick={() => window.open("https://www.dacast.com/support/knowledgebase/")}>Knowledge Base</Button>
                    </div> 
                </SmallHelpCard>

                {/* <SmallHelpCard className="mr2 col col-3 flex p2">
                    <HelpCardHeader className="col col-12">
                        <Text size={16} weight="med">API Documentation</Text>
                        <HelpPageIcon className="material-icons-two-tone ml2">import_contacts</HelpPageIcon>
                    </HelpCardHeader>
                    <div className="col col-12 flex mt2">
                        <HelpCardContent>
                            <Text size={12}>Have some questions relating to the free trial?</Text>
                        </HelpCardContent>
                        <CardPlaceholder /> 
                    </div>
                    <div className="col col-12 mt3">
                        <Button typeButton="secondary" sizeButton="xs" onClick={() => window.open("https://www.dacast.com/player-api-documentation/")}>Read Documentation</Button>
                    </div> 
                </SmallHelpCard> */}

                <SmallHelpCard className="col col-4 flex p2">
                    <HelpCardHeader className="col col-12">
                        <Text size={16} weight="med">Blog</Text>
                        <HelpPageIcon className="material-icons-two-tone ml2">bookmark</HelpPageIcon>
                    </HelpCardHeader>
                    <div className="col col-12 flex mt2">
                        <HelpCardContent>
                            <Text size={12}>Have some questions relating to the free trial?</Text>
                        </HelpCardContent>
                        <CardPlaceholder /> 
                    </div>
                    <div className="col col-12 mt3">
                        <Button typeButton="secondary" sizeButton="xs" onClick={() => window.open("https://www.dacast.com/blog/")}>Visit Blog</Button>
                    </div> 
                </SmallHelpCard>
            </div>

            <div className="col col-12 mt3">
                <Text size={20}>Contact Us</Text>
            </div>

            <div className="col col-12 flex mt2">
                <LargeHelpCard className="mr2 col col-4 p2 flex">
                    <HelpCardContent className="col col-11">
                        <Text size={16} weight="med">Email</Text>
                        <Text className="mt2" size={12}>Don’t have access to our Phone Support? Why not contact our support agents by email and they will respond in a timely manner. </Text>
                        <ButtonContainer className="col col-12 mt2">
                            <Button typeButton="secondary" sizeButton="xs" onClick={() => window.open("https://www.dacast.com/contact/")}>Contact Us</Button>
                        </ButtonContainer>   
                    </HelpCardContent>
                    <CardPlaceholder className="flex col col-1 items-center">
                        <HelpPageIcon fontSize="large" className="material-icons-two-tone ml2">email</HelpPageIcon>
                    </CardPlaceholder>
                </LargeHelpCard>

                <LargeHelpCard className="mr2 col col-4 p2 flex">
                    <HelpCardContent className="col col-11">
                        <Text size={16} weight="med">Web Chat</Text>
                        <Text className="mt2" size={12}>Talk to one of our Support Agents using our Web Chat</Text>
                        <ButtonContainer className="col col-12 mt2 flex">
                            <Button typeButton="secondary" onClick={()=>{zE('webWidget', 'open');}} sizeButton="xs">Start a Chat</Button>
                        </ButtonContainer>   
                    </HelpCardContent>
                    <CardPlaceholder className="flex col col-1 items-center">
                        <HelpPageIcon fontSize="large" className="material-icons-two-tone ml2">chat</HelpPageIcon>
                    </CardPlaceholder>
                </LargeHelpCard>

                <LargeHelpCard className="col col-4 p2 flex">
                    <HelpCardContent className="col col-11">
                        <Text size={16} weight="med">Phone Support</Text>
                        <Text className="mt2" size={12}>Have a chat with one of our Support Agents over the phone. Only available to our Scale Customers.</Text>
                        <ButtonContainer className="col col-12 mt2">
                            <Button typeButton="secondary" sizeButton="xs" onClick={() => window.open("https://www.dacast.com/contact/")}>Call Us</Button>
                        </ButtonContainer>   
                    </HelpCardContent>
                    <CardPlaceholder className="flex col col-1 items-center">
                        <HelpPageIcon fontSize="large" className="material-icons-two-tone ml2">phone</HelpPageIcon>
                    </CardPlaceholder>
                </LargeHelpCard>
            </div>
        </React.Fragment>
    )
}