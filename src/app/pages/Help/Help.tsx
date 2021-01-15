import React from 'react';
import { Text } from '../../../components/Typography/Text';
import { SmallHelpCard, LargeHelpCard, HelpCardHeader, HelpCardContent, CardPlaceholder, HelpPageIcon, ButtonContainer } from "./HelpStyle"
import { Button } from '../../../components/FormsComponents/Button/Button';
import { getKnowledgebaseLink } from '../../constants/KnowledgbaseLinks';
import { userToken } from '../../utils/services/token/tokenService';
import { useHistory } from 'react-router';

export const HelpPage = () => {

    let history = useHistory()

    console.log('phone support', userToken.getPrivilege('privilege-phone-support'))

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
                            <Text size={12}>Find answers to common questions.</Text>
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
                            <Text size={12}>Browse our Help Videos and Documentation.</Text>
                        </HelpCardContent>
                        <CardPlaceholder /> 
                    </div>
                    <div className="col col-12 mt3">
                        <Button typeButton="secondary" sizeButton="xs" onClick={() => window.open(getKnowledgebaseLink("Default"))}>Knowledge Base</Button>
                    </div> 
                </SmallHelpCard>

                {/* <SmallHelpCard className="mr2 col col-3 flex p2">
                    <HelpCardHeader className="col col-12">
                        <Text size={16} weight="med">API Documentation</Text>
                        <HelpPageIcon className="material-icons-two-tone ml2">import_contacts</HelpPageIcon>
                    </HelpCardHeader>
                    <div className="col col-12 flex mt2">
                        <HelpCardContent>
                            <Text size={12}>Learn more about all the possible API calls with Dacast.</Text>
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
                            <Text size={12}>All you need to know about live streaming and video hosting.</Text>
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
                        <Text className="mt2" size={12}>Talk to one of our Support Agents by email.</Text>
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
                        <Text className="mt2" size={12}>Talk to one of our Support Agents using our Web Chat.</Text>
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
                        {
                            userToken.getPrivilege('privilege-phone-support') ? 
                                <div className="mt2">
                                    <Text size={12}>Talk to a Support Agent over the phone.</Text>
                                    <div className="col col-12 my2">
                                        <Button typeButton="secondary" sizeButton="xs" onClick={() => window.open("tel:+18558969300")}>+1 855 896 9300</Button>
                                    </div>
                                    <div>
                                        <Text size={12}>Dial Extension <strong>#787</strong> when prompted.</Text> 
                                    </div>
                                </div>
                            :
                                <div className="mt2">
                                    <Text size={12}>Buy the phone support add-on for an Event plan, or <a href="/account/upgrade">Upgrade</a> to a Scale or Custom plan</Text>
                                    <ButtonContainer className="col col-12 mt2">
                                        <Button typeButton="secondary" sizeButton="xs" onClick={() => history.push("/account/upgrade")}>Upgrade Now</Button>
                                    </ButtonContainer>  
                                </div>
                        } 
                    </HelpCardContent>
                    <CardPlaceholder className="flex col col-1 items-center">
                        <HelpPageIcon fontSize="large" className="material-icons-two-tone ml2">phone</HelpPageIcon>
                    </CardPlaceholder>
                </LargeHelpCard>
            </div>
        </React.Fragment>
    )
}