import {useCallback, useEffect, useState} from "react";
import {Form, Input} from "antd";
import {FullDraggableModal} from "full-flex-ui";
import {
    useRenameSchedule
} from "@D/components/schedule/common/hooks/use-rename-schedule.tsx";
import {ProjectPayload} from "@D/http/payload/project-payload.ts";
import {ProjectService} from "@D/http/service/project-service.ts";

export const RenameSchedule = () => {
    const [form] = Form.useForm();
    const [project, setProject] = useState<ProjectPayload>();
    const {
        renameScheduleModalVisible,
        setRenameScheduleModalVisible,
        renameScheduleId,
        renameScheduleHolderMessage,
        renameSchedule
    } = useRenameSchedule();

    const onFinish = useCallback((values: { name: string }) => {
        if (project) {
            const projectService = ProjectService.getInstance();
            const updateProject = projectService.update(project, {projectName: values.name});
            renameSchedule(updateProject);
            setRenameScheduleModalVisible(false);
        } else {
            console.error("RenameSchedule: Project is undefined");
        }
    }, [project, renameSchedule, setRenameScheduleModalVisible]);

    useEffect(() => {
        if (renameScheduleModalVisible) {
            const projectService = ProjectService.getInstance();
            projectService.getProjectByIdRequest(renameScheduleId!, project => {
                setProject(project);
                form.setFieldValue("name", project.projectName);
            });
        }
    }, [form, renameScheduleId, renameScheduleModalVisible]);
    return (
        <FullDraggableModal classNames={{content: "rename-schedule-draggable-modal"}}
                            open={renameScheduleModalVisible}
                            title={"Rename schedule"}
                            closable={true}
                            onCancel={() => setRenameScheduleModalVisible(false)}
                            maskClosable={false}
                            cancelText={"Cancel"}
                            okText={"Rename"}
                            onOk={() => form.submit()}>
            {renameScheduleHolderMessage}
            <Form form={form} layout={"vertical"} onFinish={onFinish}>
                <Form.Item layout={"vertical"} name="name" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
            </Form>
        </FullDraggableModal>
    )
}