import React from 'react'
import { Text } from '../../../components/Typography/Text';
import { ListItem, classContainer, classItemHalfWidthContainer, WidgetHeader, classItemFullWidthContainer, SupportCard, ListStyle } from "./DashboardStyles"
import { WidgetElement } from "./WidgetElement";
import { IconStyle } from '../../../shared/Common/Icon';
import { ProgressBar } from '../../../components/FormsComponents/Progress/ProgressBar/ProgressBar';
import { Card } from '../../../components/Card/Card';
import { Button } from '../../../components/FormsComponents/Button/Button';
import {useHistory} from 'react-router-dom'
const faqIcon = require('../../../../public/assets/support-faq.png');
const supportIcon = require('../../../../public/assets/support-widget.png');

interface ItemTodo { isChecked: boolean; name: string; href: string }


export const TrialAdditionalDashboard = (props: React.HTMLAttributes<HTMLDivElement>) => {

    const [supportWidgetOpen, setSupportWidgetOpen] = React.useState<boolean>(true)

    let history = useHistory()

    const todoProfileItems: ItemTodo[] = [
        {
            isChecked: true,
            name: "Create video",
            href: "https://dacast.com"
        },
        {
            isChecked: true,
            name: "Provide your personal details",
            href: "https://dacast.com"
        },
        {
            isChecked: false,
            name: "Provide your company details",
            href: "https://dacast.com"
        },
        {
            isChecked: false,
            name: "Sign up to Dacast",
            href: "https://dacast.com"
        },
    ]

    const todoItems: ItemTodo[] = [
        {
            isChecked: true,
            name: "How to start streaming with OBS",
            href: "https://dacast.com"

        },
        {
            isChecked: true,
            name: "How to start streaming with Wirecast",
            href: "https://dacast.com"

        },
        {
            isChecked: true,
            name: "How to upload a Video",
            href: "https://dacast.com"

        },
        {
            isChecked: false,
            name: "How to embed on your website",
            href: "https://dacast.com"

        },
        {
            isChecked: false,
            name: "How to customize the player theme",
            href: "https://dacast.com"

        },
        {
            isChecked: false,
            name: "How to add security to your video: password protection, geo and referencing",
            href: "https://dacast.com"

        }
    ]
    return (
        <section className="col lg-col-12 sm-col-12">
            <div className={classContainer}>

                <WidgetElement className={classItemHalfWidthContainer}>
                    <WidgetHeader style={{justifyContent: 'space-between'}} className="flex">
                        <Text size={16} weight="med" color="gray-1"> Tutorials </Text>
                        <Button onClick={() => location.href='https://www.dacast.com/support/knowledgebase/'} className="col col-2" sizeButton="xs" typeButton="secondary">See More</Button>
                    </WidgetHeader>
                    <div className="flex mb1">
                        <TodoList items={todoItems} />
                    </div>
                </WidgetElement>
                <div className={classItemFullWidthContainer}>
                    <Card className="dashboardCard mb1">
                        <WidgetHeader className="flex">
                            <Text size={16} weight="med" color="gray-1"> Profile Completion </Text>
                            <Text className="ml-auto" size={16} weight="med" color="gray-1">50%</Text>
                        </WidgetHeader>
                        <ProgressBar size="large" color="violet" startingValue={50} />
                        <div className="flex mb1">
                            <TodoList items={todoProfileItems} />
                        </div>
                    </Card>
                    <Button className="col-12 mb1" sizeButton="large" typeButton='secondary'> Upload a Video </Button>
                    <Button className="col-12" sizeButton="large" typeButton='secondary'> Create a Live Stream </Button>
                </div>
                <WidgetElement className={classItemFullWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-1"> Trial FAQ </Text>
                        <IconStyle fontSize="small" coloricon='gray-3' className="ml-auto">close</IconStyle>
                    </WidgetHeader>
                    <div className="justify-between flex row flex-start">
                        <Text size={12} weight="reg" color="gray-1" className="inline-block mb2">Have some questions relating to the free trial?</Text><br />
                        <img src={faqIcon} />
                    </div>
                    <Button className="col col-4" sizeButton="xs" typeButton="secondary">Visit FAQ</Button>
                </WidgetElement>
                { supportWidgetOpen ? 
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
                </div> : null
                }
                
            </div>
        </section>
    )
}

const TodoList = (props: { items: ItemTodo[] }) => {

    const renderList = () => {
        return props.items.map((value, key) => {
            return (
                <ListItem key={key+"_"+value} checked={value.isChecked} >
                    <a target="_blank" rel="noopener noreferrer" href={value.href} >
                        <IconStyle className='px1 py2' coloricon={value.isChecked ? 'violet' : 'gray-8'}>check</IconStyle>
                        <Text className='line-through' color={value.isChecked ? "gray-6" : "gray-1"} size={14} weight="reg" >{value.name}</Text>
                    </a>
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
