import "./schedule-home.scss";
import {Button, Card, Collapse, Flex, Image, Layout} from "antd";
import {DateUtils} from "@D/utils/date-utils.ts";
import schedulerIllustrationSvg from "@D/assets/images/svg/scheduler-illustration.svg";
import {FeedbackIcon01} from "@D/icons/feedback-icon/feedback-icon-01";
import {QuickIcon01} from "@D/icons/quick-icon/quick-icon-01";
import {CaretRightOutlined} from "@ant-design/icons";
import scheduleTemplate from "@D/assets/images/svg/schedule_template.svg";
import fullScheduleDayPng from "@D/assets/images/png/full-schedule-day.png";
import getStartedSvg from "@D/assets/images/svg/get-started-svg.svg";
import helpCenterSvg from "@D/assets/images/svg/help-center-svg.svg";
import {useState} from "react";
import {useEmployeeName} from "@D/core/hooks/employee/use-employee-name";
import {useDemeterSelector} from "@D/core/store/demeter-hook.ts";
import {StarIcon02} from "@D/icons/star-icon/star-icon-02.tsx";

export const ScheduleHome = () => {
    const {Header, Content} = Layout;
    const username = useEmployeeName();
    const projects = useDemeterSelector(state => state.projectStore.projects);
    const [contentActiveKeys, setContentActiveKeys] = useState<Array<string>>(["recently-visited", "update-feed"]);
    return (
        <div className={`schedule-home`}>
            <Header className={"schedule-home-header"}>
                <Flex vertical={false} justify={"space-between"}>
                    <Flex vertical={false}>
                        <div className={"title"}>
                            <div>{DateUtils.getGreeting()}, {username} !</div>
                            <div>Quickly access your recent boards, Inbox and workspaces</div>
                        </div>
                        <div className={"background"}>
                            <img src={schedulerIllustrationSvg} alt={"background"}/>
                        </div>
                    </Flex>
                    <Flex vertical={false} gap={10}>
                        <div className={"feedback-button"}>
                            <Button type="text" icon={<FeedbackIcon01 width={20} height={20} color={"#2c2c2c"}/>}>Give
                                feedback </Button>
                        </div>
                        <div className={"search-button"}>
                            <Button type="primary" icon={<QuickIcon01 width={20} height={20} color={"#ffffff"}/>}>
                                Quick Search
                            </Button>
                        </div>
                    </Flex>
                </Flex>
            </Header>
            <Content className={"schedule-home-content"}>
                <Flex vertical={false} gap={20}>
                    <div className={"schedule-home-content-left"}>
                        <Collapse ghost
                                  activeKey={contentActiveKeys}
                                  onChange={(key) => setContentActiveKeys(key)}
                                  expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
                                  items={[
                                      {
                                          key: 'recently-visited',
                                          label: <div>Recently visited</div>,
                                          children: <div>
                                              {
                                                  projects.map(project => (
                                                      <Flex key={project.id} vertical={true} gap={5}>
                                                          <Flex justify={"center"}>
                                                              <img src={scheduleTemplate} alt={"schedule template"} style={{borderRadius: 5}}/>
                                                          </Flex>
                                                          <Flex justify={"space-between"}>
                                                              <div style={{
                                                                  fontSize: 16,
                                                                  fontWeight: 700,
                                                                  alignContent: "center",
                                                              }}>{project.projectName}</div>
                                                              <div style={{fontSize: 16}}>
                                                                  <Button type={"text"} style={{width: 20}} onClick={() => alert("收藏的逻辑")}>
                                                                      <StarIcon02 width={16} height={16} color={"#2c2c2c"}/>
                                                                  </Button>
                                                              </div>
                                                          </Flex>
                                                          <Flex justify={"space-between"}>
                                                              <div>
                                                                  {project.startDateTime}
                                                              </div>
                                                              <div>
                                                                  {project.endDateTime ? project.endDateTime : "No end date"}
                                                              </div>
                                                          </Flex>
                                                      </Flex>
                                                  ))
                                              }
                                          </div>,
                                      },
                                      {
                                          key: 'update-feed',
                                          label: <div
                                              style={{fontSize: 18, fontWeight: 700, color: "#323338"}}>Update feed
                                              (Inbox)</div>,
                                          children: <p>
                                              A dog is a type of domesticated animal.
                                              Known for its loyalty and faithfulness,
                                              it can be found as a welcome guest in many households across the
                                              world.
                                          </p>,
                                      }
                                  ]}/>
                    </div>
                    <div className={"schedule-home-content-right"}>
                        <Flex vertical={true} gap={"middle"}>
                            <Flex vertical={true}
                                  gap={15}>
                                <Image src={fullScheduleDayPng} preview={{src: fullScheduleDayPng}}/>
                                <p>
                                    Boost your workflow in minutes with ready-made templates
                                </p>
                                <Button>Explore templates</Button>
                            </Flex>
                            <div>
                                Learn & get inspired
                            </div>
                            <Card hoverable bordered={false}>
                                <Flex justify="space-between">
                                    <div>
                                        <img src={getStartedSvg} alt={"Getting started"}/>
                                    </div>
                                    <div className={"schedule-home-content-right-card-text"}>
                                        <h2>Getting started</h2>
                                        <h3>Learn how to create schedule</h3>
                                    </div>
                                </Flex>
                            </Card>
                            <Card hoverable bordered={false}>
                                <Flex justify="space-between">
                                    <div>
                                        <img src={helpCenterSvg} alt={"Help center"}/>
                                    </div>
                                    <div className={"schedule-home-content-right-card-text"}>
                                        <h2>Help center</h2>
                                        <h3>Learn and get support</h3>
                                    </div>
                                </Flex>
                            </Card>
                        </Flex>
                    </div>
                </Flex>
            </Content>
        </div>
    )
}