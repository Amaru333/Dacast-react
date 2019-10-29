import React from 'react'
import { Text } from '../../components/Typography/Text';
import { IconGray1, classContainer, classItemHalfWidthContainer, WidgetHeader, classItemFullWidth, TableListStyle } from "./DashboardStyles"
import { WidgetElement } from "../../components/Dashboard";


export const LiveDashboard = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <section className="col lg-col-6 sm-col-12 pr2">
            <div className="flex items-baseline mb1">
                <IconGray1 className="mr1 self-center">videocam</IconGray1>
                <Text size={24} weight="reg" className="mt0 inline-block">
                    Live Channels
                </Text>
            </div>

            <div className={classContainer}>
                <WidgetElement className={classItemHalfWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Active Channels </Text>
                    </WidgetHeader>
                    <div className="flex justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1"> 279<Text size={20} weight="reg" color="gray-4" >/500</Text></Text>
                    </div>
                </WidgetElement>

                <WidgetElement className={classItemHalfWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Live Viewers </Text>
                    </WidgetHeader>
                    <div className="flex justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">301</Text>
                    </div>
                </WidgetElement>

                <WidgetElement className={classItemFullWidth}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Top Live Channels </Text>
                    </WidgetHeader>
                    <div className="flex mb1">
                        <TableListStyle>
                            <thead>
                                <tr>
                                    <th className="col-2" ><Text size={14} weight="reg" ><b>#</b></Text></th>
                                    <th className="col-7"><Text size={14} weight="reg" ><b>Name</b></Text></th>
                                    <th className="col-3"><Text size={14} weight="reg" ><b>Viewers</b></Text></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="col-2"><Text size={14} weight="reg" >1</Text></td>
                                    <td className="col-7"><Text size={14} weight="reg" >Karmen likes Hello Kitty</Text></td>
                                    <td className="col-3"><Text size={14} weight="reg" >5,023</Text></td>
                                </tr>
                                <tr>
                                    <td className="col-2"><Text size={14} weight="reg" >2</Text></td>
                                    <td className="col-7"><Text size={14} weight="reg" >Lorem ipsum dolor sit amet.</Text></td>
                                    <td className="col-3"><Text size={14} weight="reg" >4,023</Text></td>
                                </tr>
                                <tr>
                                    <td className="col-2"><Text size={14} weight="reg" >3</Text></td>
                                    <td className="col-7"><Text size={14} weight="reg" >Neque porro quisquam est qui</Text></td>
                                    <td className="col-3"><Text size={14} weight="reg" >3,953</Text></td>
                                </tr>
                                <tr>
                                    <td className="col-2"><Text size={14} weight="reg" >4</Text></td>
                                    <td className="col-7"><Text size={14} weight="reg" >in voluptate velit esse cillum dolore</Text></td>
                                    <td className="col-3"><Text size={14} weight="reg" >1,343</Text></td>
                                </tr>
                            </tbody>

                        </TableListStyle>
                    </div>
                </WidgetElement>
            </div>
        </section>
    )
}