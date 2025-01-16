import "./schedule.scss";
import {useCallback, useEffect, useState} from "react";
import {Button, Collapse, Dropdown, Layout, Menu, Space} from "antd";
import {useDemeterDispatch} from "@D/core/store/demeter-hook.ts";
import {useDeleteSchedule} from "@D/components/schedule/common/hooks/use-delete-schedule.tsx";
import {ProjectService} from "@D/http/service/project-service.ts";
import {setProjects} from "@D/core/store/features/project-slice.ts";
import {CarryOutOutlined, HomeOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";
import {ConditionalRender} from "@D/components/common/conditional-render/conditional-render.tsx";
import {StarIcon01} from "@D/icons/star-icon/star-icon-01.tsx";
import {StarIcon02} from "@D/icons/star-icon/star-icon-02.tsx";
import {FavoritesEmptyIcon} from "@D/icons/favorites-empty/favorites-empty-icon.tsx";
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
import {SearchIcon01} from "@D/icons/search-icon/search-icon-01.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {CreateSchedule} from "@D/components/schedule/common/modals/create-schedule/create-schedule.tsx";
import {RenameSchedule} from "@D/components/schedule/common/modals/rename-schedule/rename-schedule.tsx";
import {useProjects} from "@D/components/schedule/common/hooks/use-projects.tsx";

export const Schedule = () => {
    const {Sider} = Layout;
    const projects = useProjects();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDemeterDispatch();
    const [marginInlineStart, setMarginInlineStart] = useState(200);
    const [selectedKeys, setSelectedKeys] = useState<Array<string>>(["schedule-home"]);
    const [siderActiveKeys, setSiderActiveKeys] = useState<Array<string>>([]);
    const {deleteScheduleHolderMessage, deleteSchedule} = useDeleteSchedule();

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
            <Sider className={"schedule-sider"} width={200} trigger={null} collapsedWidth={30} collapsible
                   collapsed={collapsed}>
                <div className={"schedule-sider-trigger"} onClick={() => {
                    setCollapsed(!collapsed);
                    setMarginInlineStart(collapsed ? 200 : 30);
                }}>
                    {collapsed ? <RightOutlined/> : <LeftOutlined/>}
                </div>
                <ConditionalRender isLoggedIn={collapsed} loggedInContent={null} loggedOutContent={
                    <>
                        <Menu className={"schedule-sider-menu"}
                              mode="inline"
                              selectedKeys={selectedKeys}
                              onClick={(e) => {
                                  setSelectedKeys([e.key]);
                                  switch (e.key) {
                                      case "schedule-home":
                                          navigate("/home-page/schedule");
                                          break;
                                      case "my-work":
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
                                      key: 'schedule-home',
                                      icon: <HomeOutlined/>,
                                      label: <div style={{textAlign: "left"}}>Schedule home</div>
                                  },
                                  {
                                      key: 'divider-2',
                                      type: 'divider',
                                  },
                                  {
                                      key: 'my-work',
                                      icon: <CarryOutOutlined/>,
                                      label: <div style={{textAlign: "left"}}>My work</div>
                                  },
                                  {
                                      key: 'divider-3',
                                      type: 'divider',
                                  },
                              ]}/>
                        <Collapse className={"schedule-sider-favorites-collapse"}
                                  expandIcon={(e) => e.isActive ?
                                      <StarIcon01 width={16} height={16} color={"#efce4a"}/> :
                                      <StarIcon02 width={16} height={16} color={"#2c2c2c"}/>}
                                  onChange={(key) => setSiderActiveKeys(key)}
                                  activeKey={siderActiveKeys}
                                  accordion
                                  ghost
                                  items={[
                                      {
                                          key: 'favorites',
                                          label: 'Favorites',
                                          children: <div
                                              className={"schedule-sider-favorites-collapse-empty-content"}>
                                              <div>
                                                  <FavoritesEmptyIcon/>
                                              </div>
                                              <div>
                                                  You have no favorites yet!
                                              </div>
                                              <div>
                                                  Add boards, docs, or dashboards to your favorites tab for quick and
                                                  easy
                                                  access.
                                              </div>
                                          </div>
                                      }
                                  ]}/>
                        <Collapse className={"schedule-sider-workspace-collapse"}
                                  expandIcon={() => <WorkspaceIcon01 width={15} height={15} color={"2c2c2c"}/>}
                                  onChange={(key) => setSiderActiveKeys(key)}
                                  activeKey={siderActiveKeys}
                                  accordion
                                  ghost
                                  items={[
                                      {
                                          key: "workspaces",
                                          label: 'Workspaces',
                                          extra: <Space size={"small"}>
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
                                              <Button type={"text"}
                                                      style={{width: 25, height: 25}}
                                                      onClick={(e) => e.stopPropagation()}
                                                      icon={<SearchIcon01 width={16} height={16} color={"#2c2c2c"}/>}/>
                                          </Space>,
                                          children: <Menu className={"schedule-sider-workspace-collapse-menu"}
                                                          mode="vertical"
                                                          selectedKeys={selectedKeys}
                                                          items={projects.map(project => ({
                                                              key: project.id,
                                                              label: <div className={`schedule-menu-item-title`}
                                                                          title={project.projectName}
                                                                          onClick={() => {
                                                                              setSelectedKeys([project.id]);
                                                                              navigate(`/home-page/schedule/maintenance/${project.id}`);
                                                                          }}>{truncateString(project.projectName, 14)}</div>,
                                                              children: [
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
                                                                  }
                                                              ]
                                                          }))}
                                                          onClick={(e) => {
                                                              const {key, keyPath, domEvent} = e;
                                                              domEvent.stopPropagation();
                                                              setSelectedKeys(keyPath);
                                                              const projectId = keyPath[keyPath.length - 1];
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
                                                          }}/>
                                      }
                                  ]}/>
                    </>
                }/>
            </Sider>
            <Layout className={"schedule-body"} style={{marginInlineStart: marginInlineStart}}>
                <Outlet/>
            </Layout>
            <CreateSchedule/>
            <RenameSchedule/>
        </Layout>
    )
}