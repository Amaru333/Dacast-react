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
import AddStreamModal from '../Navigation/AddStreamModal';
import { userToken } from '../../utils/services/token/tokenService';
import { getKnowledgebaseLink } from '../../constants/KnowledgbaseLinks';
import { useTranslation } from 'react-i18next';
const faqIcon = require('../../../../public/assets/support-faq.png');
const supportIcon = require('../../../../public/assets/support-widget.png');

interface ItemTodo { isChecked: boolean; name: string; href: string, isProfile?: boolean }


export const TrialAdditionalDashboard = () => {

    const [supportWidgetOpen, setSupportWidgetOpen] = React.useState<boolean>(true)
    const [trialFAQWidgetOpen, setTrialFAQWidgetOpen] = React.useState<boolean>(true)
    const [addStreamModalOpen, setAddStreamModalOpen] = React.useState<boolean>(false)

    let history = useHistory()
    const { t } = useTranslation()

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
            name: t('dashboard_free_trial_tutorial_widget_row_1'),
            href: getKnowledgebaseLink("OBS")

        },
        {
            isChecked: false,
            name: t('dashboard_free_trial_tutorial_widget_row_2'),
            href: getKnowledgebaseLink("Wirecast")

        },
        {
            isChecked: false,
            name: t('dashboard_free_trial_tutorial_widget_row_3'),
            href: getKnowledgebaseLink("Upload")

        },
        {
            isChecked: false,
            name: t('dashboard_free_trial_tutorial_widget_row_4'),
            href: getKnowledgebaseLink("Embed")

        },
        {
            isChecked: false,
            name: t('dashboard_free_trial_tutorial_widget_row_5'),
            href: getKnowledgebaseLink("Theme")

        },
        {
            isChecked: false,
            name: t('dashboard_free_trial_tutorial_widget_row_6'),
            href: getKnowledgebaseLink("Security")

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
                        <Text size={16} weight="med" color="gray-1"> {t('dashboard_free_trial_tutorial_widget_title')} </Text>
                        <Button onClick={() => window.open(getKnowledgebaseLink("Default"), '_blank')} sizeButton="xs" typeButton="secondary">{t('dashboard_free_trial_tutorial_widget_button_text')}</Button>
                    </WidgetHeader>
                    <div className="flex mb1">
                        <TodoList items={todoItems} />
                    </div>
                </WidgetElement>
                { supportWidgetOpen &&
                    <div className={classItemFullWidthContainer}>
                        <SupportCard className="dashboardCard col col-12">
                            <WidgetHeader className="flex">
                                <Text size={16} weight="med" color="gray-1">{t('dashboard_free_trial_support_widget_title')}</Text>
                                <IconStyle fontSize="small" coloricon='gray-3' className="ml-auto" onClick={() => setSupportWidgetOpen(false)}>close</IconStyle>
                            </WidgetHeader>
                            <div className=" flex row justify-between flex-start ">
                                <Text size={12} weight="reg" color="gray-1" className="inline-block mb2">{t('dashboard_free_trial_support_widget_description')}</Text><br />
                                <img src={supportIcon} />
                            </div>
                            <Button onClick={() => history.push('/help')} className="col col-4" sizeButton="xs" typeButton="secondary">{t('dashboard_free_trial_support_widget_button_text')}</Button>
                        </SupportCard>
                    </div>
                }
                {
                    trialFAQWidgetOpen &&
                        <WidgetElement className={classItemFullWidthContainer}>
                            <WidgetHeader className="flex">
                                <Text size={16} weight="med" color="gray-1">{t('dashboard_free_trial_faq_widget_title')}</Text>
                                <IconStyle fontSize="small" coloricon='gray-3' className="ml-auto" onClick={() => setTrialFAQWidgetOpen(false)}>close</IconStyle>
                            </WidgetHeader>
                            <div className="justify-between flex row flex-start">
                                <Text size={12} weight="reg" color="gray-1" className="inline-block mb2">{t('dashboard_free_trial_faq_widget_description')}</Text><br />
                                <img src={faqIcon} />
                            </div>
                            <Button className="col col-4" sizeButton="xs" typeButton="secondary" onClick={() => window.open("https://www.dacast.com/support/faq/")} >{t('dashboard_free_trial_faq_widget_button_text')}</Button>
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
