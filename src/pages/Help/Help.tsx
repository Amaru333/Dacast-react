import React from 'react';
import { Card } from '../../components/Card/Card';
import { Text } from '../../components/Typography/Text';
import { SmallHelpCard, LargeHelpCard, HelpCardHeader, HelpCardContent, CardPlaceholder, HelpPageIcon } from "./HelpStyle"
import { Button } from '../../components/FormsComponents/Button/Button';
import { Icon } from '@material-ui/core';

export const HelpPage = () => {
    return (
        <React.Fragment>

            <div className=" col col-12 mt25">
                <Text size={20}>Resources</Text>
            </div>
            <div className="col col-12 flex mt2">
                <SmallHelpCard className="mr2 col col-3 flex p2">
                    <HelpCardHeader className="col col-12">
                        <Text size={16}>FAQ</Text>
                        <HelpPageIcon color="inherit" className="material-icons-two-tone red ml2">live_help</HelpPageIcon>
                    </HelpCardHeader>
                    <div className="col col-12 flex mt2">
                        <HelpCardContent>
                            <Text size={12}>Have some questions relating to the free trial?</Text>
                        </HelpCardContent>
                        <CardPlaceholder /> 
                    </div>
                    <div className="col col-12 mt3">
                    <Button typeButton="secondary" sizeButton="xs">Visit FAQ</Button>
                    </div> 
                </SmallHelpCard>

                <SmallHelpCard className="mr2 col col-3 flex p2">
                    <HelpCardHeader className="col col-12">
                            <Text size={16}>Knowledge Base</Text>
                            <HelpPageIcon color="inherit" className="material-icons-two-tone red ml2">find_in_page</HelpPageIcon>
                        </HelpCardHeader>
                        <div className="col col-12 flex mt2">
                            <HelpCardContent>
                                <Text size={12}>Have some questions relating to the free trial?</Text>
                            </HelpCardContent>
                            <CardPlaceholder /> 
                        </div>
                        <div className="col col-12 mt3">
                        <Button typeButton="secondary" sizeButton="xs">Knowledge Base</Button>
                        </div> 
                </SmallHelpCard>

                <SmallHelpCard className="mr2 col col-3 flex p2">
                    <HelpCardHeader className="col col-12">
                                <Text size={16}>API Documentation</Text>
                                <HelpPageIcon color="inherit" className="material-icons-two-tone red ml2">import_contacts</HelpPageIcon>
                            </HelpCardHeader>
                            <div className="col col-12 flex mt2">
                                <HelpCardContent>
                                    <Text size={12}>Have some questions relating to the free trial?</Text>
                                </HelpCardContent>
                                <CardPlaceholder /> 
                            </div>
                            <div className="col col-12 mt3">
                            <Button typeButton="secondary" sizeButton="xs">Read Documentation</Button>
                            </div> 
                </SmallHelpCard>

                <SmallHelpCard className="col col-3 flex p2">
                    <HelpCardHeader className="col col-12">
                                    <Text size={16}>Blog</Text>
                                    <HelpPageIcon color="inherit" className="material-icons-two-tone red ml2">bookmark</HelpPageIcon>
                                </HelpCardHeader>
                                <div className="col col-12 flex mt2">
                                    <HelpCardContent>
                                        <Text size={12}>Have some questions relating to the free trial?</Text>
                                    </HelpCardContent>
                                    <CardPlaceholder /> 
                                </div>
                                <div className="col col-12 mt3">
                                <Button typeButton="secondary" sizeButton="xs">Visit Blog</Button>
                                </div> 
                    </SmallHelpCard>
            </div>

            <div className="col col-12 mt3">
                <Text size={20}>Contact Us</Text>
            </div>

            <div className="col col-12 flex mt2">
                <LargeHelpCard className="mr2 col col-4 p2">
                    <Text size={16}>Email</Text>
                </LargeHelpCard>
                <LargeHelpCard className="mr2 col col-4">
                    <Text size={16}>Web Chat</Text>
                </LargeHelpCard>
                <LargeHelpCard className="col col-4">
                   <Text size={16}>Phone Support</Text> 
                </LargeHelpCard>
            </div>
        </React.Fragment>
    )
}