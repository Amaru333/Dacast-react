import * as React from 'react';
import { Text } from '../../components/Typography/Text';
import { IconGray1, WidgetHeader, TableListStyle, classContainer, classItemHalfWidthContainer, classItemFullWidth, classItemFullWidthContainer } from './DashboardStyles';
import { WidgetElement } from '../../components/Dashboard';

export const VodDashboard = (props: React.HTMLAttributes<HTMLDivElement> & {fullWidth: boolean}) => {

    var classTopContainer = "col "+(props.fullWidth?"lg-col-12" : "lg-col-6")+" sm-col-12 "+(props.fullWidth?"" : "pl2 right");

    var itemClass = props.fullWidth ? classItemFullWidthContainer : classItemHalfWidthContainer;
    return (
        <section className={classTopContainer}>
            <div className="flex items-baseline mb1">
                <IconGray1 className="mr1 self-center">play_arrow</IconGray1>
                <Text size={24} weight="reg" className="mt0 inline-block">
                    Video
                </Text>
            </div>

            <div className={classContainer}>
                <WidgetElement className={itemClass}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Total Videos </Text>
                        <IconGray1 className="ml-auto">error_outline</IconGray1>
                    </WidgetHeader>
                    <div className="flex justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1"> 3,567</Text>
                    </div>
                </WidgetElement>

                <WidgetElement className={itemClass}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Impressions </Text>
                        <IconGray1 className="ml-auto">error_outline</IconGray1>
                    </WidgetHeader>
                    <div className="flex justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">76,625</Text>
                    </div>
                </WidgetElement>

                <WidgetElement className={itemClass}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Video Plays </Text>
                    </WidgetHeader>
                    <div className="flex justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">48,790</Text>
                    </div>
                </WidgetElement>

                <WidgetElement className={itemClass}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Play Rate vs Impressions </Text>
                    </WidgetHeader>
                    <div className="flex justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">76,625</Text>
                    </div>
                </WidgetElement>
                <WidgetElement className={classItemFullWidth}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Top Videos </Text>
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