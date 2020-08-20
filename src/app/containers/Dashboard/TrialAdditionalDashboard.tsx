import React from 'react'
import { Text } from '../../../components/Typography/Text';
import { ListItem, classContainer, classItemHalfWidthContainer, WidgetHeader, classItemFullWidthContainer, SupportCard, ListStyle } from "./DashboardStyles"
import { WidgetElement } from "./WidgetElement";
import { IconStyle } from '../../../shared/Common/Icon';
import { ProgressBar } from '../../../components/FormsComponents/Progress/ProgressBar/ProgressBar';
import { Card } from '../../../components/Card/Card';
import { Button } from '../../../components/FormsComponents/Button/Button';
import {useHistory} from 'react-router-dom'
import styled from 'styled-components';
import { AddStreamModal } from '../Navigation/AddStreamModal';
import { userToken } from '../../utils/token';
const faqIcon = require('../../../../public/assets/support-faq.png');
const supportIcon = require('../../../../public/assets/support-widget.png');

interface ItemTodo { isChecked: boolean; name: string; href: string, isProfile?: boolean }


export const TrialAdditionalDashboard = (props: React.HTMLAttributes<HTMLDivElement>) => {

    const [supportWidgetOpen, setSupportWidgetOpen] = React.useState<boolean>(true)
    const [trialFAQWidgetOpen, setTrialFAQWidgetOpen] = React.useState<boolean>(true)
    const [addStreamModalOpen, setAddStreamModalOpen] = React.useState<boolean>(false)

    let history = useHistory()

    const todoProfileItems: ItemTodo[] = [
        {
            isChecked: false,
            name: "Create video",
            href: "https://dacast.com",
            isProfile: true
        },
        {
            isChecked: false,
            name: "Provide your personal details",
            href: "/account/profile",
            isProfile: true
        },
        {
            isChecked: false,
            name: "Provide your company details",
            href: "/account/company",
            isProfile: true
        },
        {
            isChecked: true,
            name: "Sign up to Dacast",
            href: "https://dacast.com",
            isProfile: true
        },
    ]

    const todoItems: ItemTodo[] = [
        {
            isChecked: false,
            name: "How to start streaming with OBS",
            href: "https://www.dacast.com/support/knowledgebase/quick-start-with-live-streaming-obs-studio/"

        },
        {
            isChecked: false,
            name: "How to start streaming with Wirecast",
            href: "https://www.dacast.com/support/knowledgebase/how-to-live-stream-with-wirecast/"

        },
        {
            isChecked: false,
            name: "How to upload a Video",
            href: "https://www.dacast.com/support/knowledgebase/video-guide-how-to-upload-videos-on-pc-mac/"

        },
        {
            isChecked: false,
            name: "How to embed on your website",
            href: "https://www.dacast.com/support/knowledgebase/how-can-i-embed-a-video-on-my-website/"

        },
        {
            isChecked: false,
            name: "How to customize the player theme",
            href: "https://www.dacast.com/support/knowledgebase/"

        },
        {
            isChecked: false,
            name: "How to add security to your video: password protection, geo and referencing",
            href: "https://www.dacast.com/support/knowledgebase/"

        }
    ]

    const handleCreateStream = () => {
        if (!userToken.getPrivilege('privilege-china') && !userToken.getPrivilege('privilege-unsecure-m3u8') && !userToken.getPrivilege('privilege-dvr') ) {
            history.push("/livestreams")
        } else {
            setAddStreamModalOpen(true)
        }
    }

    return (
        <section className="col lg-col-12 sm-col-12">
            <div className={classContainer}>

                <WidgetElement className={classItemHalfWidthContainer}>
                    <WidgetHeader style={{justifyContent: 'space-between'}} className="flex">
                        <Text size={16} weight="med" color="gray-1"> Tutorials </Text>
                        <Button onClick={() => window.open('https://www.dacast.com/support/knowledgebase/', '_blank')} className="col col-2" sizeButton="xs" typeButton="secondary">See More</Button>
                    </WidgetHeader>
                    <div className="flex mb1">
                        <TodoList items={todoItems} />
                    </div>
                </WidgetElement>
                {/* <div className={classItemFullWidthContainer}>
                    <Card className="dashboardCard mb1">
                        <WidgetHeader className="flex">
                            <Text size={16} weight="med" color="gray-1"> Profile Completion </Text>
                            <Text className="ml-auto" size={16} weight="med" color="gray-1">25%</Text>
                        </WidgetHeader>
                        <ProgressBar size="large" color="violet" startingValue={50} />
                        <div className="flex mb1">
                            <TodoList items={todoProfileItems} />
                        </div>
                    </Card>
                    <Button className="col-12 mb1" sizeButton="large" typeButton='secondary' onClick={() => history.push('/uploader')}> Upload a Video </Button>
                    <Button className="col-12" sizeButton="large" typeButton='secondary' onClick={() => handleCreateStream()}> Create a Live Stream </Button>
                </div> */}
                { supportWidgetOpen &&
                    <div className={classItemFullWidthContainer}>
                        <SupportCard className="dashboardCard col col-12">
                            <WidgetHeader className="flex">
                                <Text size={16} weight="med" color="gray-1"> 24/7 Support </Text>
                                <IconStyle fontSize="small" coloricon='gray-3' className="ml-auto" onClick={() => setSupportWidgetOpen(false)}>close</IconStyle>
                            </WidgetHeader>
                            <div className=" flex row justify-between flex-start ">
                                <Text size={12} weight="reg" color="gray-1" className="inline-block mb2">Need some help getting started?</Text><br />
                                <img src={supportIcon} />
                            </div>
                            <Button onClick={() => history.push('/help')} className="col col-4" sizeButton="xs" typeButton="secondary">Get Help</Button>
                        </SupportCard>
                    </div>
                }
                {
                    trialFAQWidgetOpen &&
                        <WidgetElement className={classItemFullWidthContainer}>
                            <WidgetHeader className="flex">
                                <Text size={16} weight="med" color="gray-1"> Trial FAQ </Text>
                                <IconStyle fontSize="small" coloricon='gray-3' className="ml-auto" onClick={() => setTrialFAQWidgetOpen(false)}>close</IconStyle>
                            </WidgetHeader>
                            <div className="justify-between flex row flex-start">
                                <Text size={12} weight="reg" color="gray-1" className="inline-block mb2">Have some questions relating to the free trial?</Text><br />
                                <img src={faqIcon} />
                            </div>
                            <Button className="col col-4" sizeButton="xs" typeButton="secondary">Visit FAQ</Button>
                        </WidgetElement>
                }
                
                
                
            </div>
            <AddStreamModal toggle={() => setAddStreamModalOpen(false)} opened={addStreamModalOpen === true} />
        </section>
    )
}

const TodoList = (props: { items: ItemTodo[] }) => {

    const renderList = () => {
        return props.items.map((value, key) => {
            return (
                <ListItem key={key+"_"+value} checked={value.isChecked} >
                    <LinkTag target={!value.isProfile && "_blank"} rel="noopener noreferrer" href={value.href} >
                        <IconStyle className='px1 py2' coloricon={value.isChecked ? 'violet' : 'gray-8'}>check</IconStyle>
                        <Text className='line-through hover-under' color={value.isChecked ? "gray-6" : "gray-1"} size={14} weight="reg" >{value.name}</Text>
                    </LinkTag>
                </ListItem>
            )
        })
    }

    return (
        <ListStyle>
            <>{renderList()}</>
        </ListStyle>
    )
}

const LinkTag = styled.a`
    text-decoration: none;
    :hover{
        text-decoration: none;
        > .hover-under {
            text-decoration:underline;
        }
    }
`