import "./schedule.scss";
import {useCallback, useEffect, useState} from "react";
import {Button, Dropdown, Layout, Menu, Space} from "antd";
import {useDemeterDispatch} from "@D/core/store/demeter-hook.ts";
import {useDeleteSchedule} from "@D/components/schedule/common/hooks/use-delete-schedule.tsx";
import {ProjectService} from "@D/http/service/project-service.ts";
import {setProjects} from "@D/core/store/features/project-slice.ts";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {StarIcon02} from "@D/icons/star-icon/star-icon-02.tsx";
import {WorkspaceIcon01} from "@D/icons/workspace-icon/workspace-icon-01.tsx";
import {AddIcon01} from "@D/icons/add-icon/add-icon-01.tsx";
import {SortIcon01} from "@D/icons/sort-icon/sort-icon-01.tsx";
import {ImportIcon01} from "@D/icons/import-icon/import-icon-01.tsx";
import {
    setCreateScheduleModalVisible,
    setRenameScheduleId,
    setRenameScheduleModalVisible
} from "@D/core/store/features/schedule-slice.ts";
import {MoreIcon01} from "@D/icons/more-icon/more-icon-01.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {CreateSchedule} from "@D/components/schedule/common/modals/create-schedule/create-schedule.tsx";
import {RenameSchedule} from "@D/components/schedule/common/modals/rename-schedule/rename-schedule.tsx";
import {useProjects} from "@D/components/schedule/common/hooks/use-projects.tsx";
import {HouseIcon01} from "@D/icons/house-icon/house-icon-01.tsx";
import {ScheduleIcon01} from "@D/icons/schedule-icon/schedule-icon-01.tsx";
import {PRIMARY_COLOR} from "@D/core/style/theme.ts";

export const Schedule = () => {
    const {Sider} = Layout;
    const projects = useProjects();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDemeterDispatch();
    const {deleteScheduleHolderMessage, deleteSchedule} = useDeleteSchedule();
    const [selectedKeys, setSelectedKeys] = useState<Array<string>>(["schedule-home"]);
    const truncateString = useCallback((str: string, maxLength: number) => {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + '...';
        } else {
            return str;
        }
    }, []);
    useEffect(() => {
        const projectService = ProjectService.getInstance();
        projectService.getProjectsByEmployeeIdRequest(projects => {
            dispatch(setProjects(projects));
        });
    }, [dispatch]);
    return (
        <Layout className={"schedule"} hasSider>
            {deleteScheduleHolderMessage}
            <Sider theme={"light"} className={"schedule-sider"} trigger={null} collapsible collapsed={collapsed}>
                <div className={"schedule-sider-trigger"} onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? <RightOutlined/> : <LeftOutlined/>}
                </div>
                <Menu className={"schedule-sider-menu"}
                      mode="inline"
                      selectedKeys={selectedKeys}
                      onClick={(e) => {
                          setSelectedKeys([e.key]);
                          switch (e.key) {
                              case "home":
                                  navigate("/home-page/schedule");
                                  break;
                              case "work":
                                  // navigate("/schedule-page/my-work");
                                  break;
                          }
                      }}
                      items={[
                          {
                              key: 'divider-1',
                              type: 'divider',
                          },
                          {
                              key: 'home',
                              icon: <HouseIcon01 width={16} height={16}
                                                 color={selectedKeys.includes("home") ? PRIMARY_COLOR : "#1d1d1d"}/>,
                              label: <div>Schedule home</div>
                          },
                          {
                              key: 'divider-2',
                              type: 'divider',
                          },
                          {
                              key: 'work',
                              icon: <ScheduleIcon01 width={16} height={16}
                                                    color={selectedKeys.includes("work") ? PRIMARY_COLOR : "#1d1d1d"}/>,
                              label: <div>My work</div>
                          },
                          {
                              key: 'divider-3',
                              type: 'divider',
                          },
                          {
                              key: 'favorites',
                              icon: <StarIcon02 width={16} height={16}
                                                color={selectedKeys.includes("favorites") ? PRIMARY_COLOR : "#1d1d1d"}/>,
                              label: 'Favorites',
                          },
                          {
                              key: 'divider-4',
                              type: 'divider',
                          },
                          {
                              key: 'workspace',
                              icon: <WorkspaceIcon01 width={16} height={16}
                                                     color={selectedKeys.includes("workspace") ? PRIMARY_COLOR : "#1d1d1d"}/>,
                              label: <Space size={"small"}>
                                  <div>Workspace</div>
                                  <Dropdown menu={{
                                      items: [
                                          {
                                              key: "add-new-schedule",
                                              label: <span>Add new schedule</span>,
                                              icon: <AddIcon01 width={15} height={15} color={"#2c2c2c"}/>
                                          },
                                          {
                                              key: "sort-schedule",
                                              label: <span>Sort schedule</span>,
                                              icon: <SortIcon01 width={15} height={15} color={"#2c2c2c"}/>,
                                          },
                                          {
                                              key: "import-schedule",
                                              label: <span>Import schedule</span>,
                                              icon: <ImportIcon01 width={15} height={15}
                                                                  color={"#2c2c2c"}/>,
                                          },
                                          {
                                              type: 'divider',
                                          },
                                          {
                                              key: '3',
                                              label: '3rd menu item',
                                          },
                                      ],
                                      onClick: (e) => {
                                          e.domEvent.stopPropagation();
                                          switch (e.key) {
                                              case "add-new-schedule":
                                                  dispatch(setCreateScheduleModalVisible(true));
                                                  break;
                                              case "sort-schedule":
                                                  break;
                                              case "import-schedule":
                                                  break;
                                              default:
                                                  break;
                                          }
                                      }
                                  }}>
                                      <Button type={"text"}
                                              style={{width: 25, height: 25}}
                                              onClick={(e) => e.stopPropagation()}
                                              icon={<MoreIcon01 width={16} height={16}
                                                                color={"#2c2c2c"}/>}/>
                                  </Dropdown>
                              </Space>,
                              children: projects.map(project => ({
                                  key: project.id,
                                  label: <Dropdown trigger={["contextMenu"]} menu={{
                                      items: [
                                          {
                                              key: `${project.id}-open-in-new-table`,
                                              label: 'Open in New Tab'
                                          },
                                          {key: `${project.id}-divider-1`, type: 'divider'},
                                          {
                                              key: `${project.id}-rename-schedule`,
                                              label: 'Rename Schedule'
                                          },
                                          {
                                              key: `${project.id}-add-to-favorites`,
                                              label: 'Add to Favorites'
                                          },
                                          {
                                              key: `${project.id}-save-as-a-template`,
                                              label: 'Save as a Template'
                                          },
                                          {key: `${project.id}-divider-2`, type: 'divider'},
                                          {
                                              key: `${project.id}-delete-schedule`,
                                              label: 'Delete Schedule'
                                          },
                                          {
                                              key: `${project.id}-export-schedule`,
                                              label: 'Export Schedule'
                                          },
                                          {
                                              key: `${project.id}-share-schedule`,
                                              label: 'Share Schedule'
                                          }],
                                      onClick: (e) => {
                                          const {key, keyPath, domEvent} = e;
                                          domEvent.stopPropagation();
                                          setSelectedKeys(keyPath);
                                          const projectId = key.split("-")[0];
                                          switch (key) {
                                              case `${projectId}-open-in-new-table`:
                                                  window.open(`http://127.0.0.1:3000/home-page/schedule/maintenance/${projectId}`, "_blank")
                                                  break;
                                              case `${projectId}-rename-schedule`:
                                                  dispatch(setRenameScheduleId(projectId));
                                                  dispatch(setRenameScheduleModalVisible(true));
                                                  break;
                                              case `${projectId}-add-to-favorites`:
                                                  break;
                                              case `${projectId}-save-as-a-template`:
                                                  break;
                                              case `${projectId}-delete-schedule`:
                                                  deleteSchedule(projectId);
                                                  break;
                                              case `${projectId}-export-schedule`:
                                                  break;
                                              case `${projectId}-share-schedule`:
                                                  break;
                                              default:
                                                  break;
                                          }
                                      }
                                  }}>
                                      <div onContextMenu={() => {
                                          setSelectedKeys([project.id]);
                                          navigate(`/home-page/schedule/maintenance/${project.id}`);
                                      }} onClick={() => navigate(`/home-page/schedule/maintenance/${project.id}`)}>
                                          {truncateString(project.projectName, 14)}
                                      </div>
                                  </Dropdown>,
                              })),
                          }
                      ]}/>
            </Sider>
            <Layout className={"schedule-body"}>
                <Outlet/>
            </Layout>
            <CreateSchedule/>
            <RenameSchedule/>
        </Layout>
    )
}