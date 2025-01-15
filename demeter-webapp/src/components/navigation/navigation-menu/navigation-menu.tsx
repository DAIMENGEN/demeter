import "./navigation-menu.scss";
import React from "react";
import {Card, Flex} from "antd";
import {NavigationScheduleMenu} from "@D/components/navigation/navigation-schedule-menu/navigation-schedule-menu";

export const NavigationMenu: React.FC = () => {
    return (
        <Flex gap={20} vertical style={{padding: 20}}>
            <Card title="热门工具" bordered={false}>
                <div className={"navigation-menu-item-list"}>
                    <NavigationScheduleMenu/>
                    <NavigationScheduleMenu/>
                    <NavigationScheduleMenu/>
                    <NavigationScheduleMenu/>
                    <NavigationScheduleMenu/>
                    <NavigationScheduleMenu/>
                    <NavigationScheduleMenu/>
                    <NavigationScheduleMenu/>
                    <NavigationScheduleMenu/>
                    <NavigationScheduleMenu/>
                    <NavigationScheduleMenu/>
                    <NavigationScheduleMenu/>
                    <NavigationScheduleMenu/>
                </div>
            </Card>

            <Card title="内网平台" bordered={false}>
                <div className={"navigation-menu-item-list"}>
                    {Array.from({length: 10}, (_, i) => (
                        <Card key={i}>
                            <p>内网平台{i}</p>
                        </Card>
                    ))}
                </div>
            </Card>

            <Card title="学习平台" bordered={false}>
                <div className={"navigation-menu-item-list"}>
                    {Array.from({length: 10}, (_, i) => (
                        <Card key={i}>
                            <p>学习平台{i}</p>
                        </Card>
                    ))}
                </div>
            </Card>

            <Card title="技术社区" bordered={false}>
                <div className={"navigation-menu-item-list"}>
                    {Array.from({length: 10}, (_, i) => (
                        <Card key={i}>
                            <p>技术社区{i}</p>
                        </Card>
                    ))}
                </div>
            </Card>
        </Flex>
    )
}