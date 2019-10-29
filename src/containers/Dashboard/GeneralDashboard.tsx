import React from 'react'
import { IconGray1, classContainer, WidgetHeader, classItemFullWidthContainer, SupportCard, CloseCross } from './DashboardStyles'
import { WidgetElement } from '../../components/Dashboard'
import { Text } from '../../components/Typography/Text';
import { ProgressBar } from '../../components/FormsComponents/Progress/ProgressBar/ProgressBar';
import { Button } from '../../components/FormsComponents/Button/Button';

export const GeneralDashboard = (props: React.HTMLAttributes<HTMLDivElement> & { profile: 1 | 2 | 3 | 4 | 5 | 6 }) => {
    return (
        <section className="col col-12">
            <div className="flex items-baseline mb1">
                <Text size={24} weight="reg" className="mt0 mb3 inline-block">
                    Dashboard
                </Text>
                <Text className="ml-auto" size={14} weight="reg" color="gray-2" ><b>For Billing Period</b> 06/30/2019-07/29/2019</Text>
            </div>

            <div className={classContainer}>
                <WidgetElement className={classItemFullWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Storage Remaining </Text>
                        <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <a href="javascript:alert('Go to purchase page')">Buy More</a> </Text>
                    </WidgetHeader>
                    <div className="flex flex-wrap items-baseline mb1">
                        <Text size={32} weight="reg" color="gray-1"> 10GB</Text><Text size={16} weight="reg" color="gray-4" >/20GB</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >50%</Text>
                    </div>
                    <ProgressBar size="large" color="violet" startingValue={50} />
                </WidgetElement>

                <WidgetElement className={classItemFullWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Data Remaining </Text>
                        <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <a href="javascript:alert('Go to purchase page')">Buy More</a> </Text>
                    </WidgetHeader>
                    <div className="flex flex-wrap items-baseline mb1">
                        <Text size={32} weight="reg" color="gray-1"> 20GB</Text><Text size={16} weight="reg" color="gray-4" >/100GB</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >20%</Text>
                    </div>
                    <ProgressBar size="large" color="red" startingValue={20} />
                    <Text size={12} weight="reg" color="red"> Upgrade before you run out of data</Text>
                </WidgetElement>

                <WidgetElement className={classItemFullWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Encoding Remaining </Text>
                        <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <Button buttonColor="red" sizeButton="xs" onClick={() => alert('Go to purchase page')}>Buy More</Button> </Text>
                    </WidgetHeader>
                    <div className="flex flex-wrap items-baseline mb1">
                        <Text size={32} weight="reg" color="gray-1"> 10GB</Text><Text size={16} weight="reg" color="gray-4" >/20GB</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >50%</Text>
                    </div>
                    <ProgressBar size="large" color="red" startingValue={50} />
                    <Text size={12} weight="reg" color="red"> Upgrade before you run out of data</Text>
                </WidgetElement>

                {
                    //REMOVE THIS SHIT AFTER DEMO
                    props.profile === 1 || props.profile === 2 ?
                        <WidgetElement className={classItemFullWidthContainer}>
                            <WidgetHeader className="flex">
                                <Text size={16} weight="med" color="gray-3"> 30 Day Trial </Text>
                                <Button className="ml-auto" typeButton='secondary' sizeButton="xs" >Upgrade </Button>
                            </WidgetHeader>
                            <div className="flex flex-wrap items-baseline mb1">
                                <Text className="mr1" size={32} weight="reg" color="gray-1">14 </Text><Text size={16} weight="reg" color="gray-4" > Days remaining</Text>
                            </div>
                            <Text size={12} weight="reg" color="gray-1">Upgrade to enable all features</Text>
                        </WidgetElement> :
                        <WidgetElement className={classItemFullWidthContainer}>
                            <WidgetHeader className="flex">
                                <Text size={16} weight="med" color="gray-3"> Monthly Custom Plan </Text>
                                <IconGray1 className="ml-auto">settings</IconGray1>
                            </WidgetHeader>
                            <Text className="inline-block mb1" size={14} weight="reg" color="gray-1">Next Bill due 09/17/2019</Text><br />
                            <Text size={32} weight="reg" color="gray-1">$612</Text>
                        </WidgetElement>
                }

            </div>
        </section>
    )

}